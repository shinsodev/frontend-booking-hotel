import React, { useState } from "react";
import { createPromotion } from "../../services/PromotionService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePromotion = () => {
  const navigate = useNavigate();

  const [newPromotion, setNewPromotion] = useState({
    promotionTitle: "",
    percentOfDiscount: 0,
    description: "",
    startDate: "",
    endDate: "",
    listRoomTypes: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageReview, setImageReview] = useState("");

  // Lấy ngày hiện tại ở định dạng yyyy-mm-dd
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-CA");
  };

  // Xử lý thay đổi dữ liệu đầu vào
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý thay đổi danh sách các loại phòng
  const handleRoomTypeChange = (e) => {
    const { value, checked } = e.target;

    setNewPromotion((prevState) => {
      const { listRoomTypes } = prevState;
      if (checked) {
        return {
          ...prevState,
          listRoomTypes: [...listRoomTypes, value],
        };
      } else {
        return {
          ...prevState,
          listRoomTypes: listRoomTypes.filter((type) => type !== value),
        };
      }
    });
  };

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageFile(selectedImage);
    setImageReview(URL.createObjectURL(selectedImage));
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = newPromotion;

    // Kiểm tra điều kiện ngày
    if (new Date(startDate) < new Date(getCurrentDate())) {
      toast.error("Start date must be today or later.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be greater than start date.");
      return;
    }

    try {
      const success = await createPromotion(newPromotion, imageFile);
      if (success) {
        toast.success("Create promotion successfully!");

        navigate("/admin/promotion");
      } else {
        toast.error("Error adding promotion.");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="p-8 relative">
      <div>
        <h2 className="font-medium text-3xl">Create New Promotion</h2>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg"
          >
            {/* Tiêu đề */}
            <div>
              <label
                htmlFor="promotionTitle"
                className="block text-gray-700 font-medium"
              >
                Promotion Title
              </label>
              <input
                name="promotionTitle"
                type="text"
                value={newPromotion.promotionTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter promotion title"
                required
              />
            </div>

            {/* Phần trăm giảm giá */}
            <div>
              <label
                htmlFor="percentOfDiscount"
                className="block text-gray-700 font-medium"
              >
                Discount Percentage
              </label>
              <input
                name="percentOfDiscount"
                type="number"
                value={newPromotion.percentOfDiscount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Mô tả */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                value={newPromotion.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Ngày bắt đầu */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-medium"
              >
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                value={newPromotion.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={getCurrentDate()} // Đặt ngày tối thiểu là hôm nay
                required
              />
            </div>

            {/* Ngày kết thúc */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-gray-700 font-medium"
              >
                End Date
              </label>
              <input
                name="endDate"
                type="date"
                value={newPromotion.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={newPromotion.startDate || getCurrentDate()} // Ngày tối thiểu là startDate
                required
              />
            </div>

            {/* Loại phòng */}
            <div>
              <label
                htmlFor="listRoomTypes"
                className="block text-gray-700 font-medium"
              >
                Applicable Room Types
              </label>
              <div className="space-y-2">
                {[
                  "Single",
                  "Double",
                  "Suite",
                  "Deluxe",
                  "Triple",
                  "Quadruple",
                ].map((roomType) => (
                  <div key={roomType} className="flex items-center">
                    <input
                      type="checkbox"
                      id={roomType}
                      value={roomType}
                      checked={newPromotion.listRoomTypes.includes(roomType)}
                      onChange={handleRoomTypeChange}
                      className="mr-2"
                    />
                    <label htmlFor={roomType} className="text-gray-700">
                      {roomType}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tải ảnh */}
            <div>
              <label
                htmlFor="imageFile"
                className="block text-gray-700 font-medium"
              >
                Upload Image
              </label>
              <input
                name="imageFile"
                type="file"
                onChange={handleImageChange}
                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-6"
                accept="image/*"
                required
              />
              {imageReview && (
                <img
                  src={imageReview}
                  alt="Promotion preview"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mt-3"
                />
              )}
            </div>

            {/* Điều hướng */}
            <div className="flex justify-between items-center">
              <Link
                to="/admin/promotion"
                className="text-accent hover:underline transition-all"
              >
                Back to Promotion List
              </Link>
              <button
                type="submit"
                className="bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:opacity-60 transition-all"
              >
                Create Promotion
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatePromotion;
