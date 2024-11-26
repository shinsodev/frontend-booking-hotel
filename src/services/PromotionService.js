import axios from "./customize-axios";
export async function createPromotion(promotion, imageFile) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("promotion", JSON.stringify(promotion)); // Upload cấu hình in dưới dạng JSON
    formData.append("imageFile", imageFile);
    // Kiểm tra nội dung của formData bằng cách duyệt qua nó
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const result = await axios.post("/promotions/create-promotion", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return result; // Trả về kết quả của API
  } catch (error) {
    console.error(error);
  }
}
