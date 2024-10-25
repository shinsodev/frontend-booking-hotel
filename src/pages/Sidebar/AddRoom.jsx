import React, { useState } from "react";
import { Link } from "react-router-dom"; // Điều hướng quay lại danh sách phòng nếu cần

const AddRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState(""); // Thay đổi tên biến cho maxPeople
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Thêm state cho hình ảnh

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      roomName,
      roomType,
      price,
      maxPeople, // Thêm maxPeople vào đối tượng newRoom
      description,
      image,
    };
    console.log(newRoom);
    // Thêm logic xử lý gửi dữ liệu lên server
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Cập nhật state cho hình ảnh
    }
  };

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">Add New Room</h2>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg"> {/* Thêm shadow cho khung chứa form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg"
          >
            <div>
              <label className="block text-gray-700 font-medium">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
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
              <label className="block text-gray-700 font-medium">Price (per night)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Max people</label>
              <input
                type="number"
                value={maxPeople} // Cập nhật thành maxPeople
                onChange={(e) => setMaxPeople(e.target.value)} // Cập nhật thành setMaxPeople
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter people"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room description"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Upload Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-6" // Thêm padding cho khung input
                accept="image/*" // Chỉ cho phép chọn file hình ảnh
                required
              />
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
