import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importing Chart.js
import Papa from 'papaparse';
import 'chartjs-adapter-date-fns'; // Importing date adapter
import './LineChart.css';
import api from '../api';

const SolarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [duration, setDuration] = useState(24);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/data/');
        const csv = response.data; // CSV text
        const results = Papa.parse(csv, { header: true });

        const parsedData = results.data.map(row => ({
          x: new Date(row.date),
          y: parseFloat(row.SE),
        }));

        const anotherParsedData = results.data.map(row => ({
          x: new Date(row.date),
          y: parseFloat(row.OT), // Assuming 'OT' is another value you want to plot
        }));

        setChartData({
          datasets: [
            {
              label: 'Solar Energy (Wh)',
              data: parsedData,
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: if you want to show some fill color
              fill: false,
            },
            {
              label: 'Solar Radiation (W/m²)',
              data: anotherParsedData, // New data for the second line
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
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
    <div className="solar-chart-container">
      <div>
        <h2>Solar Radiation</h2>
        <div className="solar-chart">
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
                    font: {
                      size: 15, // Change font size
                      family: 'raleway', // Change font family
                      weight: 'bold', // Font weight
                    },
                    color: 'black',
                  },
                  ticks: {
                    font: {
                      family: 'Raleway',
                      weight: 'normal',
                      size: 11, // Tick font size
                    },
                    color: 'black',
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Solar Radiation (W/m²) / Solar Energy (Wh)',
                    font: {
                      size: 15,
                      family: 'Raleway',
                      weight: 'bold',
                      colour: 'black',
                    },
                    color: 'black',
                  },
                  ticks: {
                    font: {
                      family: 'Raleway',
                      weight: 'normal',
                      size: 11, // Tick font size
                    },
                    color: 'black',
                  }
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      family: 'Raleway',
                      weight: 'bold',
                      size: 14, // Legend font size
                    },
                    color: 'black',
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

export default SolarChart;
