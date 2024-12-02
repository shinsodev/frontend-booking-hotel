import React, { useState, useEffect, useContext } from "react";
import { bookingHistory } from "../../services/BookingService";
import { FaEye } from "react-icons/fa";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import ReactPaginate from "react-paginate";
import HoverRating from "./HoverRating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import {
  FaTimes,
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
import { addReview } from "../../services/ReviewService";
import { AuthContext } from "../../context/AuthContext";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Lưu thông tin đặt phòng đã chọn
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const [isReviewModalOpen, setReviewModalOpen] = useState(false); // Review modal
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const result = await bookingHistory(page);
        setHistory(result.bookingList);
        setTotalPages(result.totalPages); // Cập nhật tổng số trang
      } catch (error) {
        toast.error(error);
      }
    };

    fetchBookingHistory();
  }, [page, selectedBooking]);

  const handlePageClick = (event) => {
    setPage(event.selected);
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

  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setReviewRate(0);
    setReviewComment("");
    setSelectedBooking(null);
  };

  const handleSubmitReview = async () => {
    if (reviewRate > 0 && reviewComment.trim()) {
      try {
        const roomId = selectedBooking.room.id;
        // Dữ liệu review cần gửi lên
        const reviewData = {
          reviewRate,
          comment: reviewComment,
          createdTime: new Date().toISOString(),
          roomId: selectedBooking.room.id, // Thêm roomId
          userId: user.id, // Thêm userId
        };
        // Gửi dữ liệu review tới API
        await addReview(roomId, reviewData);
        toast.success("Add review successfully!");
        handleCloseReviewModal(); // Đóng modal sau khi thành công
      } catch (error) {
        toast.error("Error adding review:", error);
      }
    } else {
      toast.error("Please fill in both the rating and the comment.");
    }
  };

  // const handleSubmitReview = () => {
  //   if (reviewRate > 0 && reviewComment.trim()) {
  //     console.log({
  //       reviewRate,
  //       comment: reviewComment,
  //     });
  //     handleCloseReviewModal();
  //   } else {
  //     alert("Please fill in both the rating and the comment.");
  //   }
  // };

  return (
    <section>
      <div className="container mx-auto px-8">
        <h3 className="h3 text-[45px] text-center py-12">Booking History</h3>
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
                  <th scope="col" className="px-6 py-3">
                    Review
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
                    <td className="px-6 py-4">{item.paymentStatus}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="font-medium text-indigo-500"
                          onClick={() => handleViewDetails(item)}
                        >
                          <FaEye size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="bg-accent hover:opacity-60 transition-all text-white font-medium text-[10px] py-2 px-2 rounded-lg"
                          onClick={() => handleOpenReviewModal(item)}
                        >
                          Rating
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

      {/* Modal Đánh giá */}
      <Modal open={isReviewModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <div
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={handleCloseReviewModal}
          >
            <FaTimes size={24} color="gray" />
          </div>
          <h2 className="text-center mb-4 h3 text-[20px] text-center">
            REVIEW ROOM
          </h2>
          <HoverRating
            value={reviewRate}
            onChange={(event, newValue) => setReviewRate(newValue)}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#A37D4C", // Màu bạn muốn
              color: "white",
              "&:hover": {
                backgroundColor: "#C5AF92", // Màu hover
              },
            }}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>

      {/* Phân trang */}
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

export default BookingHistory;
