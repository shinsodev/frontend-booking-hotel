import React, { useState, useEffect } from "react";
import {
  deletePromotion,
  getPromotionByRoomId,
} from "../../services/PromotionService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PromotionByRoomId = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [promotions, setPromotions] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isModalDelete, setModalDelete] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const result = await getPromotionByRoomId(id, page);
        console.log(result);
        setPromotions(result.data.promotionList);
        setTotalPages(result.data.totalPages); // Giả sử API trả về totalPages
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, [id, page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setModalDelete(true);
  };

  const handleDeletePromotion = async () => {
    try {
      const result = await deletePromotion(deleteID);

      if (result.status === 200) {
        toast.success("Promotion deleted successfully");

        // Fetch updated promotion list after deletion
        const updatedResult = await getPromotionByRoomId(id, page);
        setPromotions(updatedResult.data.promotionList);
        setTotalPages(updatedResult.data.totalPages);
      } else {
        toast.error("Error deleting promotion");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setModalDelete(false);
    }
  };

  return (
    <section>
      <div className="p-8">
        <div className="mt-4 flex items-center">
          <Link
            to="/admin/roomlist"
            className="font-semibold hover:underline transition-all flex items-center space-x-2 px-3 py-2 bg-accent text-white rounded-md"
          >
            <FaArrowLeft size={15} />
            <div>Go back</div>
          </Link>
        </div>
        <h3 className="h3 text-[45px] text-center py-12">
          Promotion - Room {id}
        </h3>
        <hr className="my-5" />

        {/* Promotion List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-8">
          {promotions.length > 0 ? (
            promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="rounded-lg p-0 shadow-2xl bg-white flex flex-col"
              >
                {/* Promotion Image - Chiếm nửa phần trên */}
                <div className="w-full h-52">
                  <img
                    src={promotion.promotionPhotoUrl}
                    alt={promotion.description}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                {/* Promotion Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-4xl font-semibold font-primary mb-4">
                    {promotion.promotionTitle} -{" "}
                    <span className="text-red-700">
                      {promotion.percentOfDiscount}%
                    </span>
                  </h3>
                  <p className="text-gray-600">{promotion.description}</p>
                  {/* <p className="text-sm">
                    Room Types:{" "}
                    <span className="font-medium">
                      {promotion.listRoomTypes.join(", ")}
                    </span>
                  </p> */}
                  <p className="text-sm text-gray-500">
                    Time: {promotion.startDate} to {promotion.endDate}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mb-4 px-8">
                  <Link
                    to={`/admin/promotion/update/${promotion.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                    onClick={() => handleDelete(promotion.id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No promotions available.
            </p>
          )}
        </div>
      </div>

      {/* Modal Confirm Delete */}
      <ModalConfirm
        open={isModalDelete}
        onClose={() => setModalDelete(false)}
        title="Confirm Delete?"
        message="Are you sure you want to delete this promotion?"
        onConfirm={handleDeletePromotion}
      />

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white"
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

export default PromotionByRoomId;
