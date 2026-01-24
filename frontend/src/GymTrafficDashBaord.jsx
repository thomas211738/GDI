
import { useAuth } from "@/lib/firebase.js";
import { useGymTraffic } from "@/hooks/useGymTraffic";
import { CurrentStatusCard } from "@/components/CurrentStatusCard";
import { TrafficChart } from "@/components/TrafficChart";
import { ProTipsCard } from "@/components/ProTipsCard";
import { Button } from "@/components/ui/button";

export default function GymTrafficDashboard() {
  // 1. Get Auth State
  const { user, login, logout } = useAuth();
  
  const { 
    selectedDate, 
    setSelectedDate, 
    trafficData, 
    currentStatus, 
    minDate, 
    maxDate 
  } = useGymTraffic();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto grid gap-6">
        
        {/* Header with User Info */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">BU Fitrec Traffic</h1>
            <p className="text-sm sm:text-base text-gray-500">
              Plan your workout around crowd density
            </p>
          </div>
          
          {/* Optional: Show user avatar if logged in */}
          {user && (
             <div className="flex items-center gap-3">
               <span className="text-sm font-medium hidden sm:inline">
                 Hi, {user.displayName.split(' ')[0]}
               </span>
               <img 
                 src={user.photoURL} 
                 alt="Profile" 
                 className="w-8 h-8 rounded-full border border-gray-200"
               />
               <Button variant="ghost" size="sm" onClick={logout}>Sign Out</Button>
             </div>
          )}
        </div>

        <CurrentStatusCard 
          percent={currentStatus.percent} 
          isClosed={currentStatus.isClosed} 
        />

        {/* Pass auth props to the chart */}
        <TrafficChart 
          data={trafficData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          isLoggedIn={!!user} // Converts object to boolean
          onLogin={login}     // Pass the login function
        />

        <ProTipsCard />
      </div>
    </div>
  );
}