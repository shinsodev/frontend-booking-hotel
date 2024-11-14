import { createContext, useState, useEffect, useContext } from "react";
import { fetchUserInfo } from "../services/UserService";
import { fetchAllUsers } from "../services/UserService";
import { RoomContext } from "./RoomContext";
import axios from "axios";

// Tạo context để quản lý thông tin người dùng
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null); // Store userList if the user is admin
  const [loading, setLoading] = useState(true); // Add loading state
  // const [intervalId, setIntervalId] = useState(null); // Store polling interval ID
  const { fetchRoom, fetchAvailableRooms, setRoom } = useContext(RoomContext);
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, page);
      fetchRoom();
    } else {
      setLoading(false); // Stop loading if there's no token
    }

    // Cleanup interval when component unmounts
    // return () => {
    //   if (intervalId) clearInterval(intervalId);
    // };
  }, [page]);

  const fetchUserData = async (token, page) => {
    try {
      const response = await fetchUserInfo(token);
      // console.log(response);

      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // If the user is an admin, fetch the userList and start polling every 3 seconds
        if (userData.role === "ADMIN") {
          await fetchAllUsersData(token, page);
          await fetchRoom();
          // const id = setInterval(async () => {
          //   await fetchAllUsersData(token, page);
          //   await fetchRoom();
          // }, 3000);

          // setIntervalId(id);
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading once user data is fetched
    }
  };

  const fetchAllUsersData = async (token, page) => {
    try {
      const response = await fetchAllUsers(token, page);
      // console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setUserList(data.userList);
        setTotalPages(data.totalPages);
        localStorage.setItem("userList", JSON.stringify(data.userList));
      } else {
        console.error("Failed to fetch userList");
      }
    } catch (error) {
      console.error("Error fetching userList:", error);
    }
  };

  // Hàm để xử lý đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userList");
    localStorage.removeItem("roomlist");
    setUser(null);
    setUserList(null); // Reset userList when logging out
    setRoom(null);
    // if (intervalId) clearInterval(intervalId); // Clear polling interval on logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userList,
        setUser,
        logout,
        loading,
        fetchUserData,
        fetchAllUsersData,
        setUserList,
        page,
        setPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
