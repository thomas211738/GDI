import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, User } from "lucide-react";
import { getGradientColor } from "@/utils/colors";
import { correctionLabel } from "@/lib/trust";

const REPORT_OPTIONS = [
  {
    value: -2, count: 1, label: "Much less",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 hover:border-emerald-500",
  },
  {
    value: -1, count: 2, label: "Less",
    color: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-100 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700 hover:bg-lime-200 dark:hover:bg-lime-800/60 hover:border-lime-500",
  },
  {
    value: 1, count: 3, label: "More",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700 hover:bg-orange-200 dark:hover:bg-orange-800/60 hover:border-orange-500",
  },
  {
    value: 2, count: 4, label: "Much more",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/60 hover:border-red-500",
  },
];

export function CurrentStatusCard({ percent, isClosed, correction, onSubmitCorrection, loading, isLoggedIn, onLogin, trustScore }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportValue, setReportValue] = useState(null);
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

  const handleSubmit = async (value) => {
    await onSubmitCorrection(value);
    setSubmitted(true);
    setShowReportForm(false);
    setReportValue(null);
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
                Community reports: <strong>{correctionLabel(correction)}</strong>
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
                  {submitted ? "Thanks for reporting!" : "Traffic doesn't feel right?"}
                </button>
              ) : (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 text-center">
                    How busy is it compared to the prediction?
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 text-center">
                    Your reports help improve future predictions.
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {REPORT_OPTIONS.map(({ value, count, label, color, bg }) => (
                      <button
                        key={value}
                        onClick={() => handleSubmit(value)}
                        className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition-colors ${bg}`}
                      >
                        <div className="flex -space-x-2 h-6 items-center justify-center">
                          {Array.from({ length: count }).map((_, i) => (
                            <User key={i} className={`w-4 h-4 ${color}`} />
                          ))}
                        </div>
                        <span className={`text-xs font-medium ${color}`}>{label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="w-full mt-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
