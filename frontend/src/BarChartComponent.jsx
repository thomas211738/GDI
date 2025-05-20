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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const [hourlyCounts, setHourlyCounts] = useState(Array(24).fill(0));

  useEffect(() => {
    fetch('/bu_gym_entries_spring.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data }) => {
            const counts = Array(24).fill(0);
            const today = new Date().toISOString().split('T')[0];

            data.forEach(row => {
              if (!row.timestamp) return;

              const timestamp = new Date(row.timestamp);
              const dateStr = timestamp.toISOString().split('T')[0];

              if (dateStr === today) {
                const hour = timestamp.getHours();
                counts[hour]++;
              }
            });

            setHourlyCounts(counts);
          },
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  const currentHour = new Date().getHours();

  const labels = Array.from({ length: 24 }, (_, hour) =>
    new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: 'numeric',
      hour12: true,
    })
  );

  const backgroundColors = Array.from({ length: 24 }, (_, i) =>
    i === currentHour ? 'rgba(255, 99, 132, 0.9)' : 'rgba(54, 162, 235, 0.7)'
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Entries per Hour Today',
        data: hourlyCounts,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Hourly Gym Entries (Today)' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '2rem auto' }}>
      <h2>BU Gym Entries (Live for Today)</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};


export default BarChartComponent;
