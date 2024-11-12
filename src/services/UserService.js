import axios from "./customize-axios";

const apiUserRegister = (email, password, name, phoneNumber) => {
  return axios.post("/auth/register", {
    email,
    password,
    name,
    phoneNumber,
  });
};

const apiLogin = (email, password) => {
  return axios.post("/auth/login", {
    email,
    password,
  });
};

// Tùy chỉnh lại hàm fetchUserInfo
const fetchUserInfo = (token) => {
  return axios.get("/users/get_info", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

// Tùy chỉnh lại hàm fetchAllUsers
const fetchAllUsers = (token, page) => {
  return axios.get("/users/get-all-customers", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
    params: { page },
  });
};

const updateMyInfo = (token, userInfo) => {
  return axios.put("/users/update-info", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

// export async function uploadImage(image) {
//   try {
//     const token = localStorage.getItem("token");

//     const result = await axios.post("/users/upload-avatar", image, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error upload image:", error);
//   }
// }

export async function uploadImage(image) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Chuẩn bị dữ liệu upload
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/users/upload-avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message || error };
  }
}

export {
  apiUserRegister,
  apiLogin,
  fetchUserInfo,
  fetchAllUsers,
  updateMyInfo,
};
