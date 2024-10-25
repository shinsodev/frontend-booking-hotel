import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Notification from '../components/Notification/Notification'; // Đảm bảo import đúng đường dẫn

const PublicRoute = ({ children }) => {
  // const user = localStorage.getItem('user');
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [showNotification, setShowNotification] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (user) {
      setShowNotification(true); // Hiển thị thông báo
    //   setRedirect(true); // Đánh dấu để chuyển hướng
    }
  }, [user]); // Chạy effect khi user thay đổi

  // Kiểm tra xem có cần chuyển hướng không
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {showNotification && (
        <Notification
          message="You are logged in"
          onClose={() => {
            setShowNotification(false); // Đóng notification
            setRedirect(true); // Đặt lại redirect để tránh vòng lặp
          }}
        />
      )}
      {children} {/* Nếu người dùng chưa đăng nhập, hiển thị trang đăng nhập hoặc đăng ký */}
    </>
  );
};

export default PublicRoute;
