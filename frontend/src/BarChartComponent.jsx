import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Activity, CalendarDays } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const mockTrafficData = [
  { time: "6 AM", crowd: 20 },
  { time: "8 AM", crowd: 55 },
  { time: "10 AM", crowd: 40 },
  { time: "12 PM", crowd: 75 },
  { time: "3 PM", crowd: 60 },
  { time: "6 PM", crowd: 90 },
  { time: "9 PM", crowd: 35 },
];

export default function GymTrafficDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const currentCrowdPercent = 32;
  const currentPeople = 214;
  const maxCapacity = 320;

  // Function to interpolate between two colors
  const interpolateColor = (color1, color2, factor) => {
    const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
    return result;
  };

  // Function to get color based on percentage
  const getGradientColor = (percent) => {
    const green = [34, 197, 94];   // rgb(34, 197, 94) - green-500
    const yellow = [234, 179, 8];  // rgb(234, 179, 8) - yellow-500
    const red = [239, 68, 68];     // rgb(239, 68, 68) - red-500

    let color;
    if (percent <= 50) {
      // Interpolate between green and yellow (0-50%)
      const factor = percent / 50;
      color = interpolateColor(green, yellow, factor);
    } else {
      // Interpolate between yellow and red (50-100%)
      const factor = (percent - 50) / 50;
      color = interpolateColor(yellow, red, factor);
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Campus Gym Traffic</h1>
                <p className="text-gray-500">Plan your workout around crowd density</p>
              </div>
            </div>
        {/* Current Status Card */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Capacity</h2>
            </div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                <p className="text-sm text-red-500 font-semibold">Live Traffic</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12 mr-4 text-gray-700" />
                <p className="text-7xl font-bold text-gray-900">{currentCrowdPercent}%</p>
              </div>
              <div 
                className="inline-block px-6 py-2 rounded-full text-lg font-semibold text-white"
                style={{ backgroundColor: getGradientColor(currentCrowdPercent) }}
              >
                {currentCrowdPercent < 40 ? 'Low' : currentCrowdPercent < 70 ? 'Moderate' : 'High'} Traffic
              </div>
            </div>

            <Progress value={currentCrowdPercent} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Empty</span>
              <span>Full</span>
            </div>
            </CardContent>
          </Card>

          {/* Traffic Chart */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Crowd Forecast</h2>
                <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {selectedDate.toLocaleDateString()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => date < minDate || date > maxDate}
                initialFocus
              />
            </PopoverContent>
                </Popover>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrafficData}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="crowd" strokeWidth={3} />
            </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Early morning (6-8 AM) is consistently the quietest time</li>
              <li>• Weekends are generally less crowded than weekdays</li>
              <li>• Avoid lunch hours and right after classes (5-7 PM)</li>
              <li>• Late evening (8-9 PM) is a good alternative to mornings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}