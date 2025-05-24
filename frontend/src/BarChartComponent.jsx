import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaQuestionCircle } from 'react-icons/fa';
import "./CustomDatePicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const [hourlyCounts, setHourlyCounts] = useState(Array(24).fill(0));
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // 0-6 (Sun-Sat)
  const [predictionRange, setPredictionRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [stripePatternUrl, setStripePatternUrl] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  // Days of the week for selection
  const daysOfWeek = [
    'Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 
    'Thursdays', 'Fridays', 'Saturdays'
  ];

  // Function to create diagonal stripe pattern for chart
  const createDiagonalPattern = (color) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 10;
    canvas.height = 10;

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(-5, 15);
    context.lineTo(15, -5);
    context.stroke();

    return context.createPattern(canvas, 'repeat');
  };

  // Function to create diagonal stripe image for legend
  const createDiagonalPatternImage = (color) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;

    context.fillStyle = 'transparent';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(-5, 21);
    context.lineTo(21, -5);
    context.stroke();

    return canvas.toDataURL();
  };

  // Set stripe pattern URL on component mount
  useEffect(() => {
    setStripePatternUrl(createDiagonalPatternImage('rgba(59, 130, 246, 0.7)'));
  }, []);

  // Fetch and parse CSV data for a specific day of the week
  const fetchAndParseCSV = async (dayOfWeek) => {
    setLoading(true);
    try {
      const response = await fetch('/bu_gym_entries_spring.csv');
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          const counts = Array(24).fill(0);
          let hasData = false;

          data.forEach((row) => {
            if (!row.timestamp) return;
            const timestamp = new Date(row.timestamp);
            if (timestamp.getDay() === dayOfWeek) {
              const hour = timestamp.getHours();
              counts[hour]++;
              hasData = true;
            }
          });

          setHourlyCounts(counts);
          setNoData(!hasData);
          setLoading(false);
        },
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      setLoading(false);
    }
  };

  // Calculate prediction range for the selected day of the week
  const calculatePredictionRange = async (targetDay) => {
    try {
      const response = await fetch('/bu_gym_entries_spring.csv');
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          const entries = [];

          data.forEach((row) => {
            if (!row.timestamp) return;
            const ts = new Date(row.timestamp);
            if (ts.getDay() === targetDay) {
              const day = ts.toISOString().split('T')[0];
              if (!entries[day]) entries[day] = 0;
              entries[day]++;
            }
          });

          const values = Object.values(entries);
          if (values.length > 0) {
            values.sort((a, b) => a - b);
            const median = values[Math.floor(values.length / 2)];
            const p20 = values[Math.floor(values.length * 0.2)] || 0;
            const p40 = values[Math.floor(values.length * 0.4)] || p20;
            const p60 = values[Math.floor(values.length * 0.6)] || p40;
            const p80 = values[Math.floor(values.length * 0.8)] || p60;

            let bucket;
            if (median <= p20) {
              bucket = 'Very Empty';
            } else if (median <= p40) {
              bucket = 'Slightly Empty';
            } else if (median <= p60) {
              bucket = 'Moderately Crowded';
            } else if (median <= p80) {
              bucket = 'Crowded';
            } else {
              bucket = 'Very Crowded';
            }

            setPredictionRange({ bucket });
          } else {
            setPredictionRange(null);
          }
        },
      });
    } catch (error) {
      console.error('Error calculating range:', error);
      setPredictionRange(null);
    }
  };

  // Load data for current day of week on initial render
  useEffect(() => {
    const currentDay = new Date().getDay();
    setSelectedDay(currentDay);
    fetchAndParseCSV(currentDay);
    calculatePredictionRange(currentDay);
  }, []);

  // Handle day selection
  const handleDaySelect = (dayIndex) => {
    setSelectedDay(dayIndex);
    fetchAndParseCSV(dayIndex);
    calculatePredictionRange(dayIndex);
  };

  const currentDate = new Date('2025-05-24T13:51:00-04:00');
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();
  const isFutureDay = selectedDay > currentDay;
  const isCurrentDay = selectedDay === currentDay;

  // Chart configuration
  const labels = Array.from({ length: 24 }, (_, hour) =>
    new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: 'numeric',
      hour12: true,
    })
  );

  // Filter labels and counts to only include hours with data
  const filteredData = labels
    .map((label, index) => ({
      label,
      count: hourlyCounts[index],
      originalIndex: index,
    }))
    .filter((item) => item.count > 0);

  const filteredLabels = filteredData.map((item) => item.label);
  const filteredCounts = filteredData.map((item) => item.count);

  // Dynamically assign colors based on day and hour
  const filteredBackgroundColors = filteredData.map((item) => {
    if (isCurrentDay && item.originalIndex === currentHour) {
      return 'rgba(255, 99, 132, 0.9)';
    } else if (!isCurrentDay && item.originalIndex === currentHour) {
      return 'rgba(12, 66, 148, 0.9)';
    }
    return 'rgba(59, 130, 246, 0.7)';
  });

  const filteredBorderColors = filteredBackgroundColors.map((color) =>
    typeof color === 'string' ? color.replace('0.7', '1').replace('0.9', '1') : 'rgba(59, 130, 246, 1)'
  );

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: `Average Entries on ${daysOfWeek[selectedDay]}`,
        data: filteredCounts,
        backgroundColor: filteredBackgroundColors,
        borderColor: filteredBorderColors,
        borderWidth: 1,
        borderRadius: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: { display: false },
        ticks: {
          callback: function (value, index) {
            return filteredLabels[index].replace('AM', 'am').replace('PM', 'pm');
          },
        },
      },
    },
  };

  return (
    <div className="container mt-5 mx-auto p-4 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold my-3 sm:my-4 md:my-3 text-center flex items-center space-x-2">
        <span>Gym Traffic</span>
        <select
          value={selectedDay}
          onChange={(e) => handleDaySelect(Number(e.target.value))}
          className="
            text-sm p-2 text-gray-800 bg-white border border-gray-300 
            rounded-lg shadow-sm focus:outline-none focus:ring-2 
            focus:ring-black focus:border-black transition duration-200
          "
        >
          {daysOfWeek.map((day, index) => (
            <option key={index} value={index}>{day}</option>
          ))}
        </select>
      </h2>
  
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {loading ? (
          <p className="text-center my-3 sm:my-4">Loading...</p>
        ) : noData ? (
          <p className="text-center my-3 sm:my-4">No data available for this day</p>
        ) : (
          <div className="flex flex-col items-start w-full space-y-3 sm:space-y-4 md:space-y-3">
            {isCurrentDay && predictionRange && predictionRange.bucket && (
              <div className="flex items-center space-x-2 sm:mb-3">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  LIVE
                </div>
                <em>{predictionRange.bucket}</em>
              </div>
            )}
            <div className="ml-auto relative">
              <FaQuestionCircle
                size={24}
                style={{ marginRight: '8px', color: 'grey', cursor: 'pointer', marginBottom: '2px' }}
                onClick={toggleTooltip}
              />
              {isTooltipVisible && (
                <div className="absolute top-6 right-0 z-10 w-60 p-2 text-sm text-white bg-black rounded shadow-lg transition-opacity duration-200">
                  Based on past visits to Fitrec.
                </div>
              )}
            </div>
  
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChartComponent;