import { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý thông tin người dùng
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserData(token);
      }
    }, []);
  
    const fetchUserData = async (token) => {
      try {
        const response = await fetch('http://localhost:8080/api/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    // Hàm để xử lý đăng xuất
    const logout = () => {
      localStorage.removeItem('token');
      setUser(null);  // Reset lại user về null
    };
  
    return (
      <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  