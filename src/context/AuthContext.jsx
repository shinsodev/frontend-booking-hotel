import { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý thông tin người dùng
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null); // Store userList if the user is admin
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false); // Stop loading if there's no token
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/users/get_info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // If the user is an admin, fetch the userList
        if (userData.role === 'ADMIN') {
          await fetchAllUsersData(token);
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Stop loading once user data is fetched
    }
  };

  const fetchAllUsersData = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/users/get_all_customers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserList(data.userList);
        localStorage.setItem('userList', JSON.stringify(data.userList));
      } else {
        console.error('Failed to fetch userList');
      }
    } catch (error) {
      console.error('Error fetching userList:', error);
    }
  };

  // Hàm để xử lý đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userList');
    setUser(null);
    setUserList(null); // Reset userList when logging out
  };

  return (
    <AuthContext.Provider value={{ user, userList, setUser, logout, loading, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
