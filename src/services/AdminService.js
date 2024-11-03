import axios from "./customize-axios";

const apiAdminRegister = (email, password, fullName) => {
  return axios.post("/ssps/admin/register", { email, password, fullName });
};

const fetchAdminInfo = () => {
  return axios.get("/ssps/admin/my-info");
};

const fetchAllUsers = () => {
  return axios.get("/ssps/admin/get-all-students");
};

export { apiAdminRegister, fetchAdminInfo, fetchAllUsers };
