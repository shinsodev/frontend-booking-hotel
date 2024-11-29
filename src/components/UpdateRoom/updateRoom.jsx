import React, { useState, useEffect, useContext } from "react";
import { getRoomById, updateRoom } from "../../services/RoomService";
import { useParams } from "react-router-dom";
import User1 from "../../assets/img/user1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RoomContext } from "../../context/RoomContext";
import { toast } from "react-toastify";
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

const facilities = [
  { name: "drinkInfo", label: "Drink Available", icon: <FaCocktail /> },
  { name: "gymInfo", label: "Gym Available", icon: <FaStopwatch /> },
  { name: "breakfastInfo", label: "Breakfast Included", icon: <FaHotdog /> },
  { name: "poolInfo", label: "Pool Access", icon: <FaSwimmingPool /> },
  { name: "parkingInfo", label: "Parking Available", icon: <FaParking /> },
  { name: "bathInfo", label: "Bath Included", icon: <FaBath /> },
  { name: "coffeeInfo", label: "Coffee Available", icon: <FaCoffee /> },
  { name: "wifiInfo", label: "WiFi Included", icon: <FaWifi /> },
];

const UpdateRoom = () => {
  const { fetchRoom } = useContext(RoomContext);
  const [room, setRoom] = useState({
    roomType: "",
    roomSize: "",
    roomPrice: "",
    roomStatus: "",
    roomCapacity: "",
    roomAmount: "",
    roomDescription: "",
    roomPhotoUrl: "",
    facility: {
      drinkInfo: false,
      gymInfo: false,
      breakfastInfo: false,
      poolInfo: false,
      parkingInfo: false,
      bathInfo: false,
      coffeeInfo: false,
      wifiInfo: false,
    },
  });

  const [imageReview, setImageReview] = useState("");
  const navigate = useNavigate();

  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, roomPhotoUrl: selectedImage });
    setImageReview(URL.createObjectURL(selectedImage));
  };

  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      facility: {
        ...prevRoom.facility,
        [name]: checked,
      },
    }));
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ input
    setRoom({ ...room, [name]: value }); // Cập nhật giá trị trong state room
  };

  useEffect(() => {
    const fetchRoomID = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImageReview(roomData.roomPhotoUrl);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRoomID();
  }, [roomId]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);

        setImageReview(updatedRoomData.roomPhotoUrl);

        await fetchRoom();
        navigate("/admin/roomlist");
        toast.success("Room updated successfully!");
      } else {
        toast.error("Error updating room");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Update Room</h2>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg"
          >
            <div>
              <label
                htmlFor="roomStatus"
                className="block text-gray-700 font-medium"
              >
                Room Status
              </label>
              <select
                name="roomStatus" // Thêm thuộc tính name
                value={room.roomStatus}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={room.roomStatus}
                required
              >
                <option value="">Select room status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="roomDescription"
                className="block text-gray-700 font-medium"
              >
                Room Description
              </label>
              <input
                name="roomDescription" // Thêm thuộc tính name
                type="text"
                value={room.roomDescription}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={room.roomDescription}
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium">
                Room Type
              </label>
              <select
                name="roomType" // Thêm thuộc tính name
                value={room.roomType}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select room type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Triple">Triple</option>
                <option value="Quadruple">Quadruple</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="roomAmount"
                className="block text-gray-700 font-medium"
              >
                Room Amount
              </label>
              <input
                name="roomAmount" // Thêm thuộc tính name
                type="number"
                value={room.roomAmount}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter id"
                required
              />
            </div>

            <div>
              <label
                htmlFor="roomPrice"
                className="block text-gray-700 font-medium"
              >
                Price (per night)
              </label>
              <input
                name="roomPrice" // Thêm thuộc tính name
                type="number"
                value={room.roomPrice}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={room.roomPrice || "Enter price"}
                required
              />
            </div>

            <div>
              <label
                htmlFor="roomSize"
                className="block text-gray-700 font-medium"
              >
                Room Size
              </label>
              <input
                name="roomSize"
                type="text"
                value={room.roomSize}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter size"
                required
              />
            </div>

            <div>
              <label
                htmlFor="roomCapacity"
                className="block text-gray-700 font-medium"
              >
                Room capacity
              </label>
              <input
                name="roomCapacity" // Thêm thuộc tính name
                type="text"
                value={room.roomCapacity}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room capacity"
                required
              ></input>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Facilities
              </label>
              <div className="grid grid-cols-4 gap-4">
                {facilities.map((facility) => (
                  <label
                    key={facility.name}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      name={facility.name}
                      checked={room.facility[facility.name]}
                      onChange={handleFacilityChange}
                    />
                    <span className="flex items-center space-x-2">
                      {facility.icon}
                      <span>{facility.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="roomPhotoUrl"
                className="block text-gray-700 font-medium"
              >
                Upload Image
              </label>
              <input
                name="roomPhotoUrl"
                type="file"
                onChange={handleImageChange}
                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-6"
                accept="image/*"
              />

              {imageReview && (
                <img
                  src={imageReview}
                  alt="Room preview"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mt-3"
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/admin/roomlist"
                className="text-accent hover:underline transition-all"
              >
                Back to room list
              </Link>
              <button
                type="submit"
                className="bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:opacity-60 transition-all"
              >
                Update Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateRoom;
