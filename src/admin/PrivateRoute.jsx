import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import { SpinnerDotted } from 'spinners-react';

const PrivateRoute = ({ children, adminOnly, userOnly }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally, display a loading screen while user data is being fetched
    // return <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
    //         <SpinnerDotted color="white" />
    //       </div>;

    return <div>Loading...</div>
  }

  // const user = localStorage.getItem('user');

  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    // If user is not an admin, show the ForbiddenPage
    return <ForbiddenPage />;
  }

  if (userOnly && user.role !== 'USER') {
    
    return <ForbiddenPage />;
  }

  return children;
};

export default PrivateRoute;
