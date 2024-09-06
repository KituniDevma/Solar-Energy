import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importing Chart.js
import Papa from 'papaparse';
import 'chartjs-adapter-date-fns'; // Importing date adapter
import './LineChart.css'

const SolarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [duration, setDuration] = useState(24);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/data/');
        const reader = response.body.getReader();
        const result = await reader.read(); // Raw array
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value); // CSV text
        const results = Papa.parse(csv, { header: true });

        const parsedData = results.data.map(row => ({
          x: new Date(row.date),
          y: parseFloat(row.OT)
        }));

        setChartData({
          datasets: [
            {
              label: 'Solar Radiation',
              data: parsedData,
              borderColor: 'balck',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching or parsing the CSV file', error);
      }
    };

    fetchData();
  }, [duration]); // Fetch data when duration changes

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update(); // Update chart with new data
    }
  }, [chartData]); // Update chart when data changes

  if (!chartData) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  }

  return (
    <div className='solar-chart-container'>
        <div>
        <h2>Solar Energy Generation</h2>
        {/* <div>
            <label>Enter duration (days): </label>
            <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            />
        </div> */}
        <div className='solar-chart'>
            <Line
                ref={chartRef}
                data={chartData}
                options={{
                scales: {
                    x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                    },
                    title: {
                        display: true,
                        text: 'Date/Time',
                    },
                    },
                    y: {
                    title: {
                        display: true,
                        text: 'OT (Output Temperature)',
                    },
                    },
                },
                }}
            />
        </div>
        </div>
    </div>
  );
};

export default SolarChart;