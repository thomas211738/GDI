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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const [hourlyCounts, setHourlyCounts] = useState(Array(24).fill(0));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [predictionRange, setPredictionRange] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [viewingDate, setViewingDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch and parse CSV data for a specific date
  const fetchAndParseCSV = async (dateStr) => {
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
            const rowDateStr = timestamp.toISOString().split('T')[0];

            if (rowDateStr === dateStr) {
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

  // Calculate prediction range for selected hour and day of week
  const calculatePredictionRange = async (targetDate) => {
    const hour = targetDate.getHours();
    const dayOfWeek = targetDate.getDay();

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
            if (ts.getHours() === hour && ts.getDay() === dayOfWeek) {
              const day = ts.toISOString().split('T')[0];
              if (!entries[day]) entries[day] = 0;
              entries[day]++;
            }
          });

          const values = Object.values(entries);
          if (values.length > 0) {
            const min = Math.min(...values);
            const max = Math.max(...values);
            setPredictionRange({ min, max });
          } else {
            setPredictionRange(null);
          }
        },
      });
    } catch (error) {
      console.error('Error calculating range:', error);
    }
  };

  // Load today's data on initial render
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchAndParseCSV(today);
    calculatePredictionRange(new Date());
  }, []);

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.toISOString().split('T')[0];
    setViewingDate(dateStr);
    fetchAndParseCSV(dateStr);
    calculatePredictionRange(date);
  };

  const selectedHour = selectedDate.getHours();

  // Chart configuration
  const labels = Array.from({ length: 24 }, (_, hour) =>
    new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: 'numeric',
      hour12: true,
    })
  );

  const backgroundColors = Array(24).fill('rgba(59, 130, 246, 0.7)').map((color, i) =>
    i === selectedHour ? 'rgba(255, 99, 132, 0.9)' : color
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: `Entries on ${viewingDate}`,
        data: hourlyCounts,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => color.replace('0.7', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Gym Entries on ${viewingDate}`,
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gym Traffic Dashboard</h2>
      
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          showTimeSelect
          timeIntervals={60}
          dateFormat="Pp"
          className="p-2 border rounded"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : noData ? (
        <p>No data available for this date</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}

      {predictionRange && (
        <div className="mt-4 text-center">
          <p>
            Expected entries for selected time: {predictionRange.min} - {predictionRange.max}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarChartComponent;