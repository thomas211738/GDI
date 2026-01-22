
import { useGymTraffic } from "@/hooks/useGymTraffic";
import { CurrentStatusCard } from "@/components/CurrentStatusCard";
import { TrafficChart } from "@/components/TrafficChart";
import { ProTipsCard } from "@/components/ProTipsCard";

export default function GymTrafficDashboard() {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">BU Fitrec Traffic</h1>
            <p className="text-sm sm:text-base text-gray-500">
              Plan your workout around crowd density
            </p>
          </div>
        </div>

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
          isLoggedIn={false}
        />

        <ProTipsCard />
      </div>
    </div>
  );
}