import { useState, useMemo, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { weightedAverage } from "@/lib/trust";

const hours = [
  "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm",
  "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"
];

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

export function useGymTraffic({ user, trustScore } = {}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState(new Array(24).fill(0));
  const [currentDayData, setCurrentDayData] = useState(new Array(24).fill(0));
  const [correction, setCorrection] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Define Date Bounds
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const min = new Date(today);
    min.setDate(min.getDate() - 1);
    const max = new Date(today);
    max.setMonth(max.getMonth() + 3);
    return { minDate: min, maxDate: max };
  }, []);

  // 2. Fetch selected date data from Firestore
  useEffect(() => {
    const dateKey = formatDate(selectedDate);
    setLoading(true);
    getDoc(doc(db, "gym_occupancy", dateKey)).then((snap) => {
      setDailyData(snap.exists() ? snap.data().hours : new Array(24).fill(0));
      setLoading(false);
    });
  }, [selectedDate]);

  // 3. Fetch today's data from Firestore (for current status)
  useEffect(() => {
    const todayKey = formatDate(new Date());
    getDoc(doc(db, "gym_occupancy", todayKey)).then((snap) => {
      setCurrentDayData(snap.exists() ? snap.data().hours : new Array(24).fill(0));
    });
  }, []);

  // 4. Fetch community correction for current hour
  useEffect(() => {
    const todayKey = formatDate(new Date());
    const hour = new Date().getHours();
    const correctionKey = `${todayKey}_${hour}`;
    getDoc(doc(db, "gym_corrections", correctionKey)).then((snap) => {
      if (!snap.exists()) return;
      setCorrection(weightedAverage(snap.data().reports));
    });
  }, []);

  // 5. Calculate Chart Data
  const trafficData = useMemo(() => {
    return hours.map((time, i) => ({
      time,
      capacity: dailyData[i + 5],
    }));
  }, [dailyData]);

  // 6. Calculate Current Status
  const currentStatus = useMemo(() => {
    const currentHour = new Date().getHours();
    const percent = currentDayData[currentHour];
    return { percent, isClosed: percent === 0 };
  }, [currentDayData]);

  const submitCorrection = async (value) => {
    if (!user) return;

    const todayKey = formatDate(new Date());
    const hour = new Date().getHours();
    const correctionKey = `${todayKey}_${hour}`;
    const correctionRef = doc(db, "gym_corrections", correctionKey);

    const existing = await getDoc(correctionRef);
    const reportEntry = { value, weight: trustScore, reportedAt: serverTimestamp() };

    if (!existing.exists()) {
      // Create new document with only this user's entry
      await setDoc(correctionRef, {
        lastUpdatedAt: serverTimestamp(),
        reports: { [user.uid]: reportEntry },
      });
    } else {
      // Update only this user's specific field — dot notation leaves other entries untouched
      await updateDoc(correctionRef, {
        lastUpdatedAt: serverTimestamp(),
        [`reports.${user.uid}`]: reportEntry,
      });
    }

    // Log to user's report history for future trust score evaluation
    await setDoc(
      doc(db, "user_report_history", user.uid, "reports", correctionKey),
      { value, correctionKey, reportedAt: serverTimestamp(), evaluated: false }
    );

    // Refetch to get the full updated reports map for accurate weighted average
    const updated = await getDoc(correctionRef);
    if (updated.exists()) setCorrection(weightedAverage(updated.data().reports));
  };

  return {
    selectedDate,
    setSelectedDate,
    minDate,
    maxDate,
    trafficData,
    currentStatus,
    correction,
    submitCorrection,
    loading,
  };
}
