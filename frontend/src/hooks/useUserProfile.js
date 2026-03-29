import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { computeTrustScore, parseSlotTime, weightedAverage } from "@/lib/trust";

/**
 * Manages the user's profile document in Firestore.
 * Creates it on first login, evaluates pending reports for trust score updates,
 * and exposes the computed trust score.
 */
export function useUserProfile(user) {
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserDoc(null);
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const init = async () => {
      let snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          totalReports: 0,
          confirmedReports: 0,
          deniedReports: 0,
        });
        snap = await getDoc(userRef);
      }

      const data = snap.data();
      setUserDoc(data);

      // Lazily evaluate pending reports from past hours
      await evaluatePendingReports(user.uid, userRef, data, setUserDoc);
      setLoading(false);
    };

    init();
  }, [user?.uid]);

  const trustScore = computeTrustScore(userDoc);

  return { userDoc, trustScore, loading };
}

async function evaluatePendingReports(uid, userRef, currentUserDoc, setUserDoc) {
  const historyRef = collection(db, "user_report_history", uid, "reports");
  const pending = await getDocs(query(historyRef, where("evaluated", "==", false)));
  if (pending.empty) return;

  const now = new Date();
  let confirmedDelta = 0;
  let deniedDelta = 0;
  const updates = [];

  for (const reportDoc of pending.docs) {
    const { value, correctionKey, reportedAt } = reportDoc.data();
    const slotTime = parseSlotTime(correctionKey);

    // Only evaluate slots that ended at least 30 min ago
    if (now - slotTime < 90 * 60 * 1000) continue;

    const correctionSnap = await getDoc(doc(db, "gym_corrections", correctionKey));
    if (!correctionSnap.exists()) continue;

    const reports = correctionSnap.data().reports;
    if (!reports || Object.keys(reports).length < 2) continue; // need at least 2 reports

    const communityAvg = weightedAverage(reports);
    if (communityAvg === null) continue;

    // Confirmed if user's direction (less/more) matches community consensus
    const isConfirmed = Math.sign(value) === Math.sign(communityAvg);

    if (isConfirmed) confirmedDelta++;
    else deniedDelta++;

    updates.push(updateDoc(reportDoc.ref, { evaluated: true }));
  }

  if (confirmedDelta > 0 || deniedDelta > 0) {
    updates.push(
      updateDoc(userRef, {
        confirmedReports: increment(confirmedDelta),
        deniedReports: increment(deniedDelta),
        totalReports: increment(confirmedDelta + deniedDelta),
      })
    );
    await Promise.all(updates);

    // Refresh local userDoc so trustScore updates immediately
    const fresh = await getDoc(userRef);
    setUserDoc(fresh.data());
  } else {
    await Promise.all(updates);
  }
}
