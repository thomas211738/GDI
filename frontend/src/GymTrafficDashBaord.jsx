
import { useState, useEffect } from "react"; 
import { useAuth } from "@/lib/firebase.js";
import { useGymTraffic } from "@/hooks/useGymTraffic";
import { CurrentStatusCard } from "@/components/CurrentStatusCard";
import { TrafficChart } from "@/components/TrafficChart";
import { ProTipsCard } from "@/components/ProTipsCard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer.jsx";

export default function GymTrafficDashboard() {
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
   // Change bg-gray-50 to support dark mode
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
    
    {/* Main Content Wrapper (Grows to push footer down) */}
    <div className="flex-grow p-4 sm:p-8">
      {/* Width Restrictor (Only for the dashboard content) */}
      <div className="max-w-6xl mx-auto grid gap-6">
        
        <Header />

        <CurrentStatusCard 
          percent={currentStatus.percent} 
          isClosed={currentStatus.isClosed} 
        />

        <TrafficChart 
          data={trafficData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          isLoggedIn={!!user} 
          onLogin={login}
        />

        <ProTipsCard />
        
      </div> 
      {/* ⬆️ max-w-6xl ends here */}
    </div> 
    {/* ⬆️ padding container ends here */}

    {/* Footer is now OUTSIDE the width restrictions */}
    <Footer />
    
    </div>
  );
}