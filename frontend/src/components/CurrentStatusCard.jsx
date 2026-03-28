import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { getGradientColor } from "@/utils/colors";

export function CurrentStatusCard({ percent, isClosed, correction, onSubmitCorrection, loading, isLoggedIn, onLogin, trustScore }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportValue, setReportValue] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const intervalTime = duration / steps;
    const increment = percent / steps;

    const timer = setInterval(() => {
      setDisplayPercent((prev) => {
        if (prev + increment >= percent) {
          clearInterval(timer);
          return percent;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [percent]);

  const animatedValue = Math.round(displayPercent);
  const trafficLabel = animatedValue < 40 ? 'Low' : animatedValue < 70 ? 'Moderate' : 'High';

  const handleSubmit = async () => {
    await onSubmitCorrection(reportValue);
    setSubmitted(true);
    setShowReportForm(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Current Capacity</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 animate-pulse">
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mt-2" />
          </div>
        ) : isClosed ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-4" />
            <p className="text-4xl font-bold text-gray-400 dark:text-gray-500">CLOSED</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">The gym is currently closed</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                <p className="text-sm text-red-500 dark:text-red-400 font-semibold">Live Traffic</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 mr-4 text-gray-700 dark:text-gray-300" />
                <p className="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white">
                  {animatedValue}%
                </p>
              </div>
              <div
                className="inline-block px-6 py-2 rounded-full text-lg font-semibold text-white transition-colors duration-500"
                style={{ backgroundColor: getGradientColor(animatedValue) }}
              >
                {trafficLabel} Traffic
              </div>
            </div>

            <Progress value={animatedValue} className="w-full" />
            
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span>Empty</span>
              <span>Full</span>
            </div>

            {correction !== null && (
              <p className="text-sm text-center text-blue-500 dark:text-blue-400 mt-3">
                Community reports: <strong>{correction}%</strong>
              </p>
            )}

            <div className="mt-4">
              {!isLoggedIn ? (
                <button
                  onClick={onLogin}
                  className="w-full text-sm text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Sign in to report actual traffic
                </button>
              ) : !showReportForm ? (
                <button
                  onClick={() => { setShowReportForm(true); setSubmitted(false); }}
                  className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
                >
                  {submitted ? "Thanks for reporting!" : "Is this wrong? Report actual traffic"}
                </button>
              ) : (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">
                    What's the actual capacity? <strong>{reportValue}%</strong>
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={reportValue}
                    onChange={(e) => setReportValue(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1.5 rounded-lg"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowReportForm(false)}
                      className="flex-1 text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 py-1.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
