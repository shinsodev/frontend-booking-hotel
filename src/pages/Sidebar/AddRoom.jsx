import React, { useState, useContext, useEffect } from "react";
import { addRoom } from "../../services/RoomService";
import { Link } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const AddRoom = () => {
  const { fetchRoom } = useContext(RoomContext);
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = useState({
    roomType: "",
    roomSize: "",
    roomPrice: "",
    roomStatus: "",
    roomCapacity: "",
    roomAmount: "",
    roomDescription: "",
    roomPhotoURL: null,
    drinkInfo: false,
    gymInfo: false,
    breakfastInfo: false,
    poolInfo: false,
    parkingInfo: false,
    bathInfo: false,
    coffeeInfo: false,
    wifiInfo: false,
  });

  const [imageReview, setImageReview] = useState("");

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setNewRoom({ ...newRoom, roomPhotoURL: selectedImage });
    setImageReview(URL.createObjectURL(selectedImage));
  };

  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setNewRoom({ ...newRoom, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addRoom(newRoom);
    // console.log(success);
    if (success) {
      // Reset form

      // setNewRoom({
      //   roomType: "",
      //   roomSize: "",
      //   roomPrice: "",
      //   roomStatus: "",
      //   roomCapacity: "",
      //   roomAmount: "",
      //   roomDescription: "",
      //   roomPhotoURL: null,
      //   drinkInfo: false,
      //   gymInfo: false,
      //   breakfastInfo: false,
      //   poolInfo: false,
      //   parkingInfo: false,
      //   bathInfo: false,
      //   coffeeInfo: false,
      //   wifiInfo: false,
      // });
      // setImageReview("");

      await fetchRoom();
      navigate("/admin/roomlist");
      toast.success("Add room successfully!");
    } else {
      toast.error("Error adding room");
    }
  };

  return (
    <section className="p-8 relative">
      <div>
        <h2 className="font-medium text-3xl">Add New Room</h2>
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
                htmlFor="status"
                className="block text-gray-700 font-medium"
              >
                Room Status
              </label>
              <select
                name="roomStatus" // Thêm thuộc tính name
                value={newRoom.roomStatus}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select room status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium">
                Room Type
              </label>
              <select
                name="roomType" // Thêm thuộc tính name
                value={newRoom.roomType}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select room type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
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
                value={newRoom.roomAmount}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room amount"
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
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
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
                value={newRoom.roomSize}
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
                value={newRoom.roomCapacity}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room capacity"
                required
              ></input>
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
                value={newRoom.roomDescription}
                onChange={handleRoomInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room description"
                required
              />
            </div>

            <label
              htmlFor="roomCapacity"
              className="block text-gray-700 font-medium"
            >
              Room Facility
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <FaWifi className="text-2xl" />
                <label className="mt-2">Wifi</label>
                <input
                  type="checkbox"
                  name="wifiInfo"
                  checked={newRoom.wifiInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaCoffee className="text-2xl" />
                <label className="mt-2">Coffee</label>
                <input
                  type="checkbox"
                  name="coffeeInfo"
                  checked={newRoom.coffeeInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaBath className="text-2xl" />
                <label className="mt-2">Bath</label>
                <input
                  type="checkbox"
                  name="bathInfo"
                  checked={newRoom.bathInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaParking className="text-2xl" />
                <label className="mt-2">Parking</label>
                <input
                  type="checkbox"
                  name="parkingInfo"
                  checked={newRoom.parkingInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaSwimmingPool className="text-2xl" />
                <label className="mt-2">Pool</label>
                <input
                  type="checkbox"
                  name="poolInfo"
                  checked={newRoom.poolInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaHotdog className="text-2xl" />
                <label className="mt-2">Breakfast</label>
                <input
                  type="checkbox"
                  name="breakfastInfo"
                  checked={newRoom.breakfastInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaStopwatch className="text-2xl" />
                <label className="mt-2">Gym</label>
                <input
                  type="checkbox"
                  name="gymInfo"
                  checked={newRoom.gymInfo}
                  onChange={handleFacilityChange}
                />
              </div>
              <div className="flex flex-col items-center">
                <FaCocktail className="text-2xl" />
                <label className="mt-2">Drink</label>
                <input
                  type="checkbox"
                  name="drinkInfo"
                  checked={newRoom.drinkInfo}
                  onChange={handleFacilityChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="roomPhotoURL"
                className="block text-gray-700 font-medium"
              >
                Upload Image
              </label>
              <input
                name="roomPhotoURL"
                type="file"
                onChange={handleImageChange}
                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-6"
                accept="image/*"
                required
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
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
