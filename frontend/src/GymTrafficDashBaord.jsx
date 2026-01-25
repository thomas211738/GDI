import { useState, useEffect } from "react"; // <--- Added missing imports
import { useAuth } from "@/lib/firebase.js";
import { useGymTraffic } from "@/hooks/useGymTraffic";
import { CurrentStatusCard } from "@/components/CurrentStatusCard";
import { TrafficChart } from "@/components/TrafficChart";
import { ProTipsCard } from "@/components/ProTipsCard";
import { Header } from "@/components/header";
import {Footer} from "@/components/footer.jsx";

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
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
        
        <Footer />
      </div>
    </div>
  );
}