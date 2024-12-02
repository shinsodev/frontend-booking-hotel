import React, { useState, useEffect } from "react";
import { recentBooking, cancelBooking } from "../../services/BookingService";
import { userPay } from "../../services/PaymentService";
import { FaEye, FaTrash } from "react-icons/fa";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { MdPayment } from "react-icons/md";

import {
  FaWifi,
  FaCheck,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";

const RecentBooking = () => {
  const [history, setHistory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Lưu thông tin đặt phòng đã chọn
  const [cancelID, setCancelID] = useState(null);
  const [isModalCancel, setModalCancel] = useState(false);
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const URL = "https://hotelbooking-pk94.onrender.com/payments/confirm";

  useEffect(() => {
    const fetchRecentBooking = async () => {
      try {
        const result = await recentBooking(page);
        setHistory(result.bookingList);
        setTotalPages(result.totalPages); // Cập nhật tổng số trang
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentBooking();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleCancel = (id) => {
    setCancelID(id);
    setModalCancel(true);
  };

  const handleCancelBooking = async () => {
    try {
      const result = await cancelBooking(cancelID);
      if (result.statusCode === 200) {
        const fetchRecentBooking = async () => {
          try {
            const result = await recentBooking();
            setHistory(result.bookingList);
          } catch (error) {
            console.error(error);
          }
        };

        fetchRecentBooking();
        toast.success(`Booking was cancelled`);
      } else {
        toast.error(`Error cancel booking`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setModalCancel(false); // Close the modal after action
    }
  };

  const handlePay = async (item) => {
    try {
      // console.log(item.room.roomType);
      // console.log(item.bookingCode);
      // console.log(item.finalPrice.toString());
      // console.log(URL);
      // console.log(URL);
      const result = await userPay(
        item.room.roomType,
        item.bookingCode,
        item.finalPrice,
        URL,
        URL
      );
      // console.log(result);
      // Kiểm tra nếu kết quả trả về status là 200 và có checkoutUrl
      if (result.status === 200 && result.data.data.checkoutUrl) {
        // Chuyển hướng người dùng đến checkoutUrl
        window.location.href = result.data.data.checkoutUrl;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Xử lý mở modal khi nhấn FaEye
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null); // Reset thông tin khi đóng modal
  };

  return (
    <section>
      <div className="container mx-auto px-8">
        <h3 className="h3 text-[45px] text-center py-12">Recent Booking</h3>
        {history.length === 0 ? (
          <p className="text-center text-lg text-white">
            You have no booking history.
          </p>
        ) : (
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check-in Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check-out Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adults
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Children
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.room.roomType}</td>
                    <td className="px-6 py-4">{item.room.id}</td>
                    <td className="px-6 py-4">{item.bookingCode}</td>
                    <td className="px-6 py-4">{item.checkInDate}</td>
                    <td className="px-6 py-4">{item.checkOutDate}</td>
                    <td className="px-6 py-4">{item.numOfAdults}</td>
                    <td className="px-6 py-4">{item.numOfChildren}</td>
                    <td className="px-6 py-4">${item.finalPrice}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-x-1 items-center justify-center">
                        {item.paymentStatus}
                        {item.paymentStatus === "UNPAID" && (
                          <button
                            className="font-medium text-green-700"
                            onClick={() => handlePay(item)}
                          >
                            <MdPayment size={22} />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center flex items-center gap-3">
                        <button
                          className="font-medium text-indigo-500"
                          onClick={() => handleViewDetails(item)}
                        >
                          <FaEye size={20} />
                        </button>

                        <button
                          className="font-medium text-red-500"
                          onClick={() => handleCancel(item.id)}
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal hiển thị chi tiết đặt phòng */}
      {selectedBooking && (
        <ModalConfirm
          open={isModalOpen}
          onClose={handleCloseModal} // Đảm bảo đóng modal đúng cách
          title={`Booking Details - ${selectedBooking.room.roomType}`}
          message={
            <div className="text-gray-700">
              <div className="overflow-hidden w-[400px] h-[300px] my-4">
                <img
                  src={selectedBooking.room.roomPhotoUrl}
                  alt="Room"
                  className="w-full object-cover"
                />
              </div>
              <p>
                <strong>Room ID:</strong> {selectedBooking.room.id}
              </p>
              <p>
                <strong>Check-in:</strong> {selectedBooking.checkInDate}
              </p>
              <p>
                <strong>Check-out:</strong> {selectedBooking.checkOutDate}
              </p>
              <p className="flex space-x-4">
                <strong>Adults:</strong> {selectedBooking.numOfAdults}{" "}
                <strong>-</strong> <strong>Children:</strong>{" "}
                {selectedBooking.numOfChildren}
              </p>
              <p>
                <strong>Booking Code:</strong> {selectedBooking.bookingCode}
              </p>
              <p>
                <strong>Price:</strong> ${selectedBooking.finalPrice}
              </p>
              <p>
                <strong>Facilities:</strong>
              </p>
              {/* Render facilities if they exist */}
              <div className="flex flex-wrap mt-4 ml-10">
                {selectedBooking.room?.facility ? (
                  <>
                    {selectedBooking.room.facility.drinkInfo && (
                      <div className="w-1/4 mb-8">
                        <FaCocktail
                          className="text-yellow-500 text-2xl"
                          title="Drink Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.gymInfo && (
                      <div className="w-1/4 mb-8">
                        <FaStopwatch
                          className="text-yellow-500 text-2xl"
                          title="Gym Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.breakfastInfo && (
                      <div className="w-1/4 mb-8">
                        <FaHotdog
                          className="text-yellow-500 text-2xl"
                          title="Breakfast Included"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.poolInfo && (
                      <div className="w-1/4 mb-8">
                        <FaSwimmingPool
                          className="text-yellow-500 text-2xl"
                          title="Pool Access"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.parkingInfo && (
                      <div className="w-1/4 mb-8">
                        <FaParking
                          className="text-yellow-500 text-2xl"
                          title="Parking Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.bathInfo && (
                      <div className="w-1/4 mb-8">
                        <FaBath
                          className="text-yellow-500 text-2xl"
                          title="Bath Included"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.coffeeInfo && (
                      <div className="w-1/4 mb-8">
                        <FaCoffee
                          className="text-yellow-500 text-2xl"
                          title="Coffee Available"
                        />
                      </div>
                    )}
                    {selectedBooking.room.facility.wifiInfo && (
                      <div className="w-1/4 mb-8">
                        <FaWifi
                          className="text-yellow-500 text-2xl"
                          title="WiFi Included"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <span>No facilities</span>
                )}
              </div>
            </div>
          }
        />
      )}

      <ModalConfirm
        open={isModalCancel}
        onClose={() => setModalCancel(false)}
        title="Confirm cancel?"
        message="Are you sure you want to cancel this booking?"
        onConfirm={handleCancelBooking} // Call handleDelete when confirmed
      />

      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white" // Active page style
        previousClassName="page-item"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextClassName="page-item"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
        containerClassName="pagination"
      />
    </section>
  );
};

export default RecentBooking;
