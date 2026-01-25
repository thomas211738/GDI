import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { getGradientColor } from "@/utils/colors";

export function CurrentStatusCard({ percent, isClosed }) {
  const [displayPercent, setDisplayPercent] = useState(0);

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

  return (
    <Card className="rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Current Capacity</h2>
        </div>

        {isClosed ? (
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
