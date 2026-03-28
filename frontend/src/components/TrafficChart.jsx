import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CalendarDays } from "lucide-react"; 
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// 1. New Custom Tooltip Component to handle Dark Mode
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
        <p className="text-blue-600 dark:text-blue-400 font-bold">
          {payload[0].value}% <span className="text-gray-500 dark:text-gray-400 font-normal text-xs">Capacity</span>
        </p>
      </div>
    );
  }
  return null;
};

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function TrafficChart({
  data,
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
  isLoggedIn,
  onLogin,
  loading,
}) {
  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden relative dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-4 sm:p-6">
        
        {/* Blur Wrapper */}
        <div className={!isLoggedIn ? "blur-md pointer-events-none select-none filter transition-all duration-500" : ""}>
          {loading && (
            <div className="h-64 sm:h-72 flex flex-col gap-3 animate-pulse justify-end pb-4">
              {[60, 80, 45, 90, 55, 70, 40, 85, 65, 50].map((h, i) => (
                <div
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 rounded"
                  style={{ height: `${h}%`, flex: "1" }}
                />
              ))}
            </div>
          )}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Crowd Forecast</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based off past swipe data</p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
                    <CalendarDays className="w-4 h-4" />
                    <span className="truncate">{selectedDate.toLocaleDateString()}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-gray-900 dark:border-gray-800" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && onDateChange(date)}
                    disabled={(date) => date < minDate || date > maxDate}
                    initialFocus
                    className="dark:bg-gray-900 dark:text-gray-200"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {!loading && (
              <div className="h-64 sm:h-72 -mx-2 sm:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ left: 0, right: 10 }}>
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} interval="preserveStartEnd" stroke="#888888" />
                    <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} width={40} stroke="#888888" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="capacity" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
        </div>

        {/* Locked Overlay - UPDATED FOR DARK MODE */}
        {!isLoggedIn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/40 dark:bg-black/60 backdrop-blur-[2px]">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center border border-gray-100 dark:border-gray-700 max-w-sm mx-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Unlock Forecasts</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                See future crowd trends to plan your perfect workout time.
              </p>
              
              <Button 
                onClick={onLogin}
                className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center h-11"
              >
                <GoogleIcon />
                Sign in with Google
              </Button>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}