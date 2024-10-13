// import React from 'react'

import { Outlet, useParams } from "react-router-dom"
import Rooms from "../../components/Rooms/Rooms"

const RoomPage = () => {
  // Lấy tham số 'id' từ URL
  const { id } = useParams();

  return (
    <>
      {/* Nếu có 'id' trong URL, hiển thị Outlet (cho RoomDetails), ngược lại hiển thị Rooms */}
      {id ? <Outlet /> : <Rooms />}
    </>
  );
}

export default RoomPage