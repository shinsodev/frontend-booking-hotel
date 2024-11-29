import { useState, useEffect } from "react";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../../services/RoomService";
import User1 from "../../assets/img/user1.png";
import { toast } from "react-toastify";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import ReactPaginate from "react-paginate";
import { FaHistory } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";

import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";

const Table = () => {
  const [rooms, setRoom] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null); // State to store room ID to delete
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const handleDeleteRoom = (id) => {
    setRoomToDelete(id); // Store the room ID to be deleted
    setModalOpen(true); // Open the modal
  };

  useEffect(() => {
    fetchRoom(page);
  }, [page]);

  const fetchRoom = async (page) => {
    try {
      const result = await getAllRooms(page);
      setRoom(result.roomList);
      setTotalPages(result.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      toast(error.message);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleDelete = async () => {
    if (!roomToDelete) return; // If no room is selected for deletion, exit

    try {
      const result = await deleteRoom(roomToDelete);
      if (result.statusCode === 200) {
        await fetchRoom(); // Re-fetch rooms after deletion
        toast.success(`Room No ${roomToDelete} was deleted`);
      } else {
        toast.error(`Error deleting room: ${roomToDelete}`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setModalOpen(false); // Close the modal after action
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <div className="flex justify-end mb-4">
          <Link
            to="/admin/addroom"
            className="bg-accent hover:opacity-60 transition-all text-white font-medium text-[17px] py-2 px-4 rounded-lg"
          >
            Add new room
          </Link>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-4 py-3">
                Size m²
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Facilities
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
                Reviews
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr
                  key={room.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{room.roomType}</td>
                  <td className="px-6 py-4">{room.roomSize}</td>
                  <td className="px-6 py-4">${room.roomPrice}</td>
                  <td className="px-6 py-4">
                    {room.roomDescription.length > 30
                      ? room.roomDescription.slice(0, 30) + "..."
                      : room.roomDescription}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          room.roomStatus === "Available"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } mr-2`}
                      ></div>
                      {room.roomStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">{room.roomCapacity}</td>
                  <td className="px-6 py-4">{room.roomAmount}</td>
                  <td className="px-6 py-4">
                    <img
                      className="w-100 h-100"
                      src={room.roomPhotoUrl}
                      alt="Room"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap justify-left gap-1">
                      {room.facility ? (
                        <>
                          {room.facility.drinkInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaCocktail
                                className="text-yellow-500"
                                title="Drink Available"
                              />
                            </div>
                          )}
                          {room.facility.gymInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaStopwatch
                                className="text-yellow-500"
                                title="Gym Available"
                              />
                            </div>
                          )}
                          {room.facility.breakfastInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaHotdog
                                className="text-yellow-500"
                                title="Breakfast Included"
                              />
                            </div>
                          )}
                          {room.facility.poolInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaSwimmingPool
                                className="text-yellow-500"
                                title="Pool Access"
                              />
                            </div>
                          )}
                          {room.facility.parkingInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaParking
                                className="text-yellow-500"
                                title="Parking Available"
                              />
                            </div>
                          )}
                          {room.facility.bathInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaBath
                                className="text-yellow-500"
                                title="Bath Included"
                              />
                            </div>
                          )}
                          {room.facility.coffeeInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaCoffee
                                className="text-yellow-500"
                                title="Coffee Available"
                              />
                            </div>
                          )}
                          {room.facility.wifiInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaWifi
                                className="text-yellow-500"
                                title="WiFi Included"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <span>No facilities</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink
                        to={`/rooms/${room.id}`}
                        className="font-medium text-indigo-500"
                      >
                        <FaEye size={20} />
                      </NavLink>

                      <NavLink
                        to={`/admin/roomlist/booking/${room.id}`}
                        className="font-medium text-blue-500"
                      >
                        <FaHistory size={20} />
                      </NavLink>

                      <NavLink
                        to={`/admin/roomlist/promotion/${room.id}`}
                        className="font-medium text-blue-500"
                      >
                        <BiSolidDiscount size={20} />
                      </NavLink>

                      <NavLink
                        to={`/admin/updateRoom/${room.id}`}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
                      </NavLink>
                      <button
                        className="font-medium text-red-500"
                        onClick={() => handleDeleteRoom(room.id)} // Pass room id to modal
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <NavLink
                        to={`/admin/get-review-by-room-id/${room.id}`}
                        className="font-medium text-green-500"
                      >
                        <button className="bg-accent hover:opacity-60 transition-all text-white font-medium text-[10px] py-2 px-3 rounded-lg">
                          View
                        </button>
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {"No rooms available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xác nhận xóa */}
      <ModalConfirm
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm delete?"
        message="Are you sure you want to delete this room?"
        onConfirm={handleDelete} // Call handleDelete when confirmed
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
    </>
  );
};

export default Table;
