// src/pages/Report.jsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Report = () => {
  // Dữ liệu biểu đồ doanh thu
  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 2000, 4000, 5000, 6000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Dữ liệu biểu đồ tần số đăng nhập
  const loginFrequencyData = {
    labels: ['User 1', 'User 2', 'User 3', 'User 4'],
    datasets: [
      {
        label: 'Login Frequency',
        data: [5, 3, 8, 2],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Dữ liệu biểu đồ xu hướng đặt phòng
  const bookingTrendData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Booking Trend',
        data: [20, 25, 15, 30],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Report</h2>
      </div>
      
      <hr className="my-5" />

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Revenue</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Bar data={revenueData} />
        </div>
      </section>

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Login Frequency</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Bar data={loginFrequencyData} />
        </div>
      </section>

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Booking Trend</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Line data={bookingTrendData} />
        </div>
      </section>
    </div>
  );
};

export default Report;
