
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  const [day, setDay] = useState("Today");
  const currentCrowdPercent = 68;
  const currentPeople = 214;
  const maxCapacity = 320;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Campus Gym Traffic</h1>
            <p className="text-gray-500">Plan your workout around crowd density</p>
          </div>
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Tomorrow">Tomorrow</SelectItem>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <Users className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Current Crowd</p>
                <p className="text-2xl font-semibold">{currentPeople} / {maxCapacity}</p>
                <p className="text-xs text-gray-400">people in gym</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <Clock className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Best Time to Go</p>
                <p className="text-2xl font-semibold">9:00 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <Activity className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-500">Avg Daily Peak</p>
                <p className="text-2xl font-semibold">6:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crowd Progress */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between mb-2">
              <p className="font-medium">Live Crowd Density</p>
              <span className="text-sm text-gray-500">{currentCrowdPercent}% capacity</span>
            </div>
            <Progress value={currentCrowdPercent} />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Empty</span>
              <span>Moderate</span>
              <span>Packed</span>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Chart */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Crowd Forecast</h2>
              <Button variant="outline">Set Workout Reminder</Button>
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

        {/* CTA */}
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold">Want notifications when it's empty?</h3>
              <p className="text-gray-500">Get alerted when crowd drops below your comfort level.</p>
            </div>
            <Button className="rounded-xl">Enable Alerts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
