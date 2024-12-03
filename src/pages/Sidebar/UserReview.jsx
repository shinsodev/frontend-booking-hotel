import React, { useState, useEffect, useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import { toast } from "react-toastify";
import {
  deleteReview,
  getReviewById,
  getReviewByUserId,
  updateReview,
} from "../../services/ReviewService";
import ReactPaginate from "react-paginate";
import HoverRating from "./HoverRating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

const UserReview = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);
  const [reviewData, setReviewData] = useState([]);

  const [reviewByUserID, setReviewByUserID] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useContext(AuthContext);

  // Mở modal cập nhật review và tải dữ liệu review
  const handleUpdateReview = async (id) => {
    try {
      const result = await getReviewById(id);
      setReviewData(result.review);
      setReviewToUpdate(id);
      setModalUpdateOpen(true);
    } catch (error) {
      toast.error("Error fetching review data");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateReview(reviewToUpdate, reviewData);
      toast.success("Review updated successfully.");
      setModalUpdateOpen(false);

      fetchReviewByUserID(user.id, page);
    } catch (error) {
      toast.error("Error updating review");
    }
  };

  const handleDeleteReview = (id) => {
    setReviewToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await deleteReview(reviewToDelete);
      toast.success("Delete successfully review.");
    } catch (error) {
      toast.error("Error delete review");
    } finally {
      setModalOpen(false);
      fetchReviewByUserID(user.id, page);
    }
  };

  useEffect(() => {
    fetchReviewByUserID(user.id, page);
  }, [user.id, page]);

  const fetchReviewByUserID = async (userId, page) => {
    try {
      const result = await getReviewByUserId(userId, page);
      console.log(result.reviewList);
      setReviewByUserID(result.reviewList);
      setTotalPages(result.totalPages);
    } catch (error) {
      toast.error("Error fetching review data get by user id", error);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating); // Làm tròn rating để lấy số sao
    const totalStars = 5; // Tổng số sao tối đa
    let stars = "";

    for (let i = 0; i < totalStars; i++) {
      stars += i < filledStars ? "★" : "☆"; // Thêm sao đổ đầy (★) hoặc sao rỗng (☆)
    }

    return stars;
  };

  return (
    <section className="py-14">
      <div className="container mx-auto lg:px-0">
        <h3 className="h3 text-[45px] text-center py-6">Review History</h3>
        {/* Reviews Section */}
        {reviewByUserID.length > 0 ? (
          reviewByUserID.map((item, index) => (
            <div className="space-y-8 py-5" key={item.id || index}>
              <div className="bg-gray-100 bg-opacity-90 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-300">
                      {item.user.imageUrl ? (
                        <img
                          src={item.user.imageUrl}
                          alt={`${item.user.name}'s avatar`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">
                        {item.user.name}
                      </h4>
                      <div className="flex space-x-1">
                        <span className="text-yellow-500">
                          {renderStars(item.reviewRate)}
                        </span>{" "}
                        {/* Rating */}
                      </div>
                    </div>
                  </div>
                  {/* Update and Delete Buttons - Aligned Right */}
                  <div className="ml-auto flex space-x-2">
                    <button
                      className="flex items-center px-4 py-2 text-white bg-accent hover:opacity-60 rounded-lg"
                      onClick={() => handleUpdateReview(item.id)}
                    >
                      <FaEdit className="mr-1" />
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                      onClick={() => handleDeleteReview(item.id)}
                    >
                      <FaTrash className="mr-1" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">{item.comment}</p>
                  <p className="text-gray-500 mt-2">
                    Room Type: {item.room.roomType}
                  </p>
                  <p className="text-gray-400 mt-2">
                    Created on:{" "}
                    {moment(item.createdTime).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                    {/* Định dạng thời gian */}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No review</span>
        )}
      </div>

      {isModalOpen && (
        <ModalConfirm
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm delete?"
          message="Are you sure you want to delete this room?"
          onConfirm={handleDelete} // Call handleDelete when confirmed
        />
      )}

      {/* Modal cập nhật review */}
      <Modal open={isModalUpdateOpen} onClose={() => setModalUpdateOpen(false)}>
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
            onClick={() => setModalUpdateOpen(false)}
          >
            <FaTimes size={24} color="gray" />
          </div>
          <h2 className="text-center mb-4 h3 text-[20px] text-center">
            UPDATE REVIEW
          </h2>
          <HoverRating
            value={reviewData.reviewRate}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, reviewRate: newValue })
            }
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#A37D4C",
              color: "white",
              "&:hover": {
                backgroundColor: "#C5AF92",
              },
            }}
          >
            Save updating
          </Button>
        </Box>
      </Modal>

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

export default UserReview;
