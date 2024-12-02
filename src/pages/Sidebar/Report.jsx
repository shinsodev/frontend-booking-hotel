// src/pages/Report.jsx
import { React, useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { getReport } from '../../services/ReportService';
import { toast } from "react-toastify";

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
  const [reports, setReport] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    // Tạo danh sách các năm từ năm hiện tại trở về trước (6 năm gần nhất)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
    setAvailableYears(years);
    const fetchReports = async () => {
      try {
        const result = await getReport(year);
        setReport(result.report);
        console.log(result.report);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchReports();
  }, [year]);
  // Dữ liệu biểu đồ doanh thu
  const revenueData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Revenue',
        data: reports?.revenuePerMonth || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Dữ liệu biểu đồ tần số đăng nhập
  const bookingData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total Bookings',
        data: reports?.totalBookingsPerMonth || [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Dữ liệu biểu đồ xu hướng đặt phòng
  const trendingRoomsData = {
    labels: reports?.trendingRooms || [],
    datasets: [
      {
        label: 'Trending Room Bookings',
        data: reports?.trendingRoomBookingsPerMonth || [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start">
        <h2 className="font-medium text-3xl">Report for {year}</h2>
        {/* Thanh chọn năm dạng thu gọn */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 border rounded-md bg-accent text-white"
          >
            Select Year
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-32 max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg">
              {availableYears.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 ${year === y ? 'bg-accent text-white' : 'bg-white text-black'
                    } hover:bg-accent-hover`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="my-5" />

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Revenue per Month</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Bar data={revenueData} />
        </div>
      </section>

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Total Bookings per Month</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Bar data={bookingData} />
        </div>
      </section>

      <section className="my-16 flex flex-col items-center">
        <h2 className="text-xl">Trending Rooms</h2>
        <div style={{ width: '80%', height: '300px' }} className="flex justify-center">
          <Line data={trendingRoomsData} />
        </div>
      </section>
    </div>
  );
};

export default Report;
