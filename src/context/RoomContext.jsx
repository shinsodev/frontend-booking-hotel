import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAllRooms, deleteRoom } from "../services/RoomService";
import { getAvailableRooms } from "../services/BookingService";

import { useContext } from "react";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  // const [rooms, setRooms] = useState(roomData);
  // const [adults, setAdults] = useState("1 Adult");
  // const [kids, setKids] = useState("0 Kid");
  // const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rooms, setRoom] = useState([]);
  const [roomsAvailable, setRoomAvailable] = useState(null);
  const [page, setPage] = useState(0); // Số trang hiện tại
  const [pageAvailable, setPageAvailable] = useState(0); // Số trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  // useEffect(() => {
  //   setTotal(Number(adults[0]) + Number(kids[0]));
  // });

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const newRooms = roomData.filter((room) => {
  //     return total <= room.maxPerson;
  //   });

  //   setTimeout(() => {
  //     setRooms(newRooms);
  //     setLoading(false);
  //   }, 3000);
  // };

  const fetchRoom = async (page) => {
    try {
      const result = await getAllRooms(page);
      setRoom(result.roomList);
      setTotalPages(result.totalPages);
      // console.log(result.roomList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAvailableRooms = async (
    checkInDate,
    checkOutDate,
    totalGuest,
    pageAvailable
  ) => {
    try {
      const result = await getAvailableRooms(
        checkInDate,
        checkOutDate,
        totalGuest,
        pageAvailable
      );

      setRoomAvailable(result.roomList);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRoom,
        roomsAvailable,
        setRoomAvailable,
        page,
        setPage,
        pageAvailable,
        setPageAvailable,
        totalPages,
        setTotalPages,
        fetchRoom,
        loading,
        fetchAvailableRooms,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoomProvider;
