
import { useState, useMemo } from "react";
import gymData from "@/data/gym_occupancy_2026.json";

export function useGymTraffic() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 1. Define Date Bounds
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const min = new Date(today);
    min.setDate(min.getDate() - 1);
    const max = new Date(today);
    max.setMonth(max.getMonth() + 3);
    return { minDate: min, maxDate: max };
  }, []);

  // 2. Helper: Format Date
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // 3. Calculate Chart Data
  const trafficData = useMemo(() => {
    const dateKey = formatDate(selectedDate);
    const dailyData = gymData[dateKey] || new Array(24).fill(0);
    
    const hours = [
      "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", 
      "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"
    ];

    // Map starting from index 5 (5am)
    return hours.map((time, i) => ({
      time,
      capacity: dailyData[i + 5],
    }));
  }, [selectedDate]);

  // 4. Calculate Current Status
  const currentStatus = useMemo(() => {
    const now = new Date();
    const currentDateKey = formatDate(now);
    const currentHour = now.getHours();
    
    const currentDayData = gymData[currentDateKey] || new Array(24).fill(0);
    const percent = currentDayData[currentHour];
    
    return {
      percent,
      isClosed: percent === 0
    };
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    minDate,
    maxDate,
    trafficData,
    currentStatus
  };
}