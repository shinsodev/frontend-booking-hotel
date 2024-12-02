import axios from "axios";

export const api = axios.create({
  baseURL: "https://hotelbooking-pk94.onrender.com",
});

export const addReview = async (roomId, reviewData) => {
  try {
    const token = localStorage.getItem("token");
    const result = await api.post(
      `/reviews/create-review/${roomId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Erro creating review:", error);
  }
};

export const updateReview = async (reviewId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const result = await api.put(
      `/reviews/update-review/${reviewId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error updating review:", error);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");
    const result = await api.delete(`/reviews/delete-review/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const result = await api.get(`/reviews/get-review-by-id/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching review by id:", error);
  }
};

export const getReviewByUserId = async (userId, page) => {
  try {
    const token = localStorage.getItem("token");
    const result = await api.get(`/reviews/get-review-by-user-id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        userId,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching review by user id", error);
  }
};

export const getReviewByRoomId = async (roomId, page) => {
  try {
    const token = localStorage.getItem("token");
    const result = await api.get(`/reviews/get-review-by-room-id/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        roomId,
        page,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching review by user id and room id", error);
  }
};
