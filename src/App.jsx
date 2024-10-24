import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import RoomPage from './pages/RoomPage/RoomPage';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Sidebar/Dashboard';
import DashboardLayout from './components/Layout/DashBoardLayout';
import UserList from './pages/Sidebar/UserList';
import UserProfile from './pages/Sidebar/UserProfile';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminRoomList from './components/AdminRoomList/AdminRoomList';
import PrivateRoute from './admin/PrivateRoute'; 
import PublicRoute from './public/PublicRoute'; // Import PublicRoute
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'; // Import NotFoundPage

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Các route khác */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Route cho RoomPage và RoomDetails */}
        <Route
          path="rooms"
          element={
            <Layout>
              <RoomPage />
            </Layout>
          }
        >
          <Route path=":id" element={<RoomDetails />} />
        </Route>

        {/* Route cho Login và Register */}
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Route cho Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho Profile */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <UserProfile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho Admin */}
        <Route
          path="/admin/userlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <UserList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/roomlist"
          element={
            <PrivateRoute adminOnly={true}>
              <DashboardLayout>
                <AdminRoomList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Route cho 404 - Bất kỳ đường dẫn nào không khớp */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
