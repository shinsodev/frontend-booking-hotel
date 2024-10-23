import { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý thông tin người dùng
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserData(token);
        // console.log(token);
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
          const userData = data.user;  // Chỉ lấy phần 'user'
          setUser(userData);
          // console.log(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Hàm để xử lý đăng xuất
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);  // Reset lại user về null
    };
  
    return (
      <AuthContext.Provider value={{ user, setUser, logout, fetchUserData }}>
        {children}
      </AuthContext.Provider>
    );
    
  };
  
  export default AuthProvider  