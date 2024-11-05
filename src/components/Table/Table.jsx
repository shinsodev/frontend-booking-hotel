import { useState, useEffect } from "react";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { getAllRooms, deleteRoom } from "../../services/RoomService";
import User1 from '../../assets/img/user1.png';
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from 'react-icons/fa';

const Table = () => {
  const [rooms, setRoom] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetchRoom()
  }, [])

  useEffect(() => {
    if (successMessage) {
      console.log("Success Message:", successMessage);
    }
  }, [successMessage]);

  const fetchRoom = async () => {
    try {
      const result = await getAllRooms()
      console.log("Fetched rooms:", result);
      setRoom(result.roomList)
      console.log("KKKKKKKKK", result)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await deleteRoom(id)
      console.log(result)
      if (result.statusCode === 200) {
        setSuccessMessage(`Room No ${id} was delete`)
        console.log("Success Message:", successMessage);
        fetchRoom()
      } else {
        console.log(`Error deleting room: ${id}`);
      }
    } catch (error) {
      setErrorMessage(error)
    }
    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        {/* Hiển thị thông báo thành công */}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {/* Hiển thị thông báo lỗi */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <div className="flex justify-end mb-4">
          {/* Nút Thêm Phòng Mới */}
          <Link to="/admin/addroom"
            // onClick={() => setIsAddRoomOpen(true)}
            className="bg-accent hover:opacity-60 transition-all text-white font-medium text-[17px] py-2 px-4 rounded-lg"
          >
            Add new room
          </Link>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Size m²</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Capacity</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Facilities</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={room.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{room.roomType}</td>
                  <td className="px-6 py-4">{room.roomSize}</td>
                  <td className="px-6 py-4">${room.roomPrice}</td>
                  <td className="px-6 py-4">{room.roomDescription}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full ${room.roomStatus === 'Available' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                      {room.roomStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">{room.roomCapacity}</td>
                  <td className="px-6 py-4">{room.roomAmount}</td>
                  <td className="px-6 py-4">
                    <img className="w-100 h-100" src={room.roomPhotoUrl} alt="Room" />
                  </td>
                  <td className="px-6 py-4">
                    {/* Hiển thị tiện nghi */}
                    <div className="flex flex-wrap justify-left">
                      {room.facility ? (
                        <>
                          {room.facility.drinkInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaCocktail className="text-yellow-500" title="Drink Available" />
                            </div>
                          )}
                          {room.facility.gymInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaStopwatch className="text-yellow-500" title="Gym Available" />
                            </div>
                          )}
                          {room.facility.breakfastInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaHotdog className="text-yellow-500" title="Breakfast Included" />
                            </div>
                          )}
                          {room.facility.poolInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaSwimmingPool className="text-yellow-500" title="Pool Access" />
                            </div>
                          )}
                          {room.facility.parkingInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaParking className="text-yellow-500" title="Parking Available" />
                            </div>
                          )}
                          {room.facility.bathInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaBath className="text-yellow-500" title="Bath Included" />
                            </div>
                          )}
                          {room.facility.coffeeInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaCoffee className="text-yellow-500" title="Coffee Available" />
                            </div>
                          )}
                          {room.facility.wifiInfo && (
                            <div className="flex items-center justify-center w-1/4">
                              <FaWifi className="text-yellow-500" title="WiFi Included" />
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
                      <NavLink to="/admin/viewRoom" className="font-medium text-indigo-500">
                        <TiEyeOutline size={25} />
                      </NavLink>
                      <NavLink to={`/admin/updateRoom/${room.id}`} className="font-medium text-green-500">
                        <CiEdit size={25} />
                      </NavLink>
                      <button
                        className="font-medium text-red-500"
                        onClick={() => handleDelete(room.id)}
                      >
                        <MdOutlineDeleteOutline size={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                  {errorMessage || "No rooms available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table