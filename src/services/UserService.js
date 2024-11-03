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
const fetchAllUsers = (token) => {
  return axios.get("/users/get-all-customers", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

const updateMyInfo = (token, userInfo) => {
  return axios.put("/users/update-info", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

export {
  apiUserRegister,
  apiLogin,
  fetchUserInfo,
  fetchAllUsers,
  updateMyInfo,
};
