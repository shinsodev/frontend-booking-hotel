import axios from "./customize-axios";
import { toast } from "react-toastify";
export async function createPromotion(promotion, imageFile) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append(
      "promotion",
      new Blob([JSON.stringify(promotion)], { type: "application/json" })
    );
    formData.append("imageFile", imageFile);

    const result = await axios.post("/promotions/create-promotion", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return result; // Trả về kết quả của API
  } catch (error) {
    console.error(error);
    if (error.status === 404) toast.error("This room type does not exist yet.");
    else toast.error("An error occurred. Please try again.");
  }
}

export async function getAllPromotions(page) {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get("/promotions/get-all-promotions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePromotion(id) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `/promotions/delete-promotion/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getPromotionById(id) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/promotions/get-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePromotion(id, promotion, imageFile) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append(
      "promotion",
      new Blob([JSON.stringify(promotion)], { type: "application/json" })
    );
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const response = await axios.put(
      `/promotions/update-promotion/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    if (error.status === 404) toast.error("This room type does not exist yet.");
    else toast.error("An error occurred. Please try again.");
  }
}

export async function getPromotionByRoomId(id, page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/promotions/get-promotion-by-room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getLatestPromotions(page) {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get("/promotions/get-latest-promotion", {
      params: { page },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
