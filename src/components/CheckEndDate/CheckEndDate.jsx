import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../src/datepicker.css";
import { BsCalendar } from "react-icons/bs";
import { useState } from "react";

const CheckEndDate = ({ setCheckEndDate }) => {
  const [outDate, setOutDate] = useState(null);
  //   const today = new Date();

  const handleDateChange = (date) => {
    setOutDate(date);
    // Chuyển đổi ngày thành định dạng yyyy-mm-dd
    if (date) {
      // const formattedDate = date.toISOString().split("T")[0];
      // setCheckEndDate(formattedDate);

      const formattedDate = date.toLocaleDateString("en-CA"); // 'en-CA' giúp tạo ra định dạng yyyy-mm-dd
      setCheckEndDate(formattedDate);
    } else {
      setCheckEndDate(""); // Reset nếu không có ngày nào được chọn
    }
  };

  return (
    <div className="relative flex-1 items-center h-full">
      <div className="absolute pr-8 right-0 top-1/2 -translate-y-1/2">
        <BsCalendar className="text-accent text-base" />
      </div>

      <DatePicker
        className="w-full h-full rounded p-2"
        selected={outDate}
        placeholderText="End date"
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd" // Định dạng hiển thị ngày
        // minDate={today}
      />
    </div>
  );
};

export default CheckEndDate;
