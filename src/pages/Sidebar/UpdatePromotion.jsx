import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPromotionById,
  updatePromotion,
} from "../../services/PromotionService";
import { toast } from "react-toastify";

const UpdatePromotion = () => {
  const { id } = useParams(); // Get promotion ID from the URL
  const navigate = useNavigate();

  const [promotion, setPromotion] = useState({
    promotionTitle: "",
    percentOfDiscount: 0,
    description: "",
    startDate: "",
    endDate: "",
    listRoomTypes: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageReview, setImageReview] = useState("");

  // Fetch promotion data by ID
  useEffect(() => {
    const fetchPromotionData = async () => {
      try {
        const response = await getPromotionById(id);

        if (response && response.data.promotion) {
          setPromotion({
            promotionTitle: response.data.promotion.promotionTitle,
            percentOfDiscount: response.data.promotion.percentOfDiscount,
            description: response.data.promotion.description,
            startDate: response.data.promotion.startDate,
            endDate: response.data.promotion.endDate,
            listRoomTypes: response.data.promotion.listRoomTypes || [],
          });
          setImageReview(response.data.promotion.promotionPhotoUrl); // Assuming the API returns image URL
        }
      } catch (error) {
        toast.error("Failed to load promotion details");
      }
    };
    fetchPromotionData();
  }, [id]);

  // Get current date in yyyy-mm-dd format
  // const getCurrentDate = () => {
  //   const today = new Date();
  //   return today.toLocaleDateString("en-CA");
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    const { value, checked } = e.target;
    setPromotion((prevState) => {
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageFile(selectedImage);
    setImageReview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = promotion;

    // if (new Date(startDate) < new Date(getCurrentDate())) {
    //   toast.error("Start date must be today or later.");
    //   return;
    // }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be greater than start date.");
      return;
    }

    try {
      // Assuming you have an updatePromotion API that works similarly to createPromotion

      const result = await updatePromotion(id, promotion, imageFile);

      if (result.status === 200) {
        toast.success("Promotion updated successfully!");
        navigate("/admin/promotion");
      } else {
        toast.error("Error updating promotion.");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="p-8 relative">
      <div>
        <h2 className="font-medium text-3xl">Update Promotion</h2>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg"
          >
            {/* Promotion Title */}
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
                value={promotion.promotionTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter promotion title"
                required
              />
            </div>

            {/* Discount Percentage */}
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
                value={promotion.percentOfDiscount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount percentage"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                value={promotion.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Start Date */}
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
                value={promotion.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={promotion.startDate}
                required
              />
            </div>

            {/* End Date */}
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
                value={promotion.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={promotion.startDate}
                required
              />
            </div>

            {/* Room Types */}
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
                      checked={promotion.listRoomTypes.includes(roomType)}
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

            {/* Image Upload */}
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

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/admin/promotion")}
                className="text-accent hover:underline transition-all"
              >
                Back to Promotion List
              </button>
              <button
                type="submit"
                className="bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:opacity-60 transition-all"
              >
                Update Promotion
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePromotion;
