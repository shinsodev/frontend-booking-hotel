import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { roomData } from "../data";
import { getAllRooms, deleteRoom } from "../services/RoomService";
import { useContext } from "react";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  // const [rooms, setRooms] = useState(roomData);
  const [adults, setAdults] = useState("1 Adult");
  const [kids, setKids] = useState("0 Kid");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rooms, setRoom] = useState([]);

  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  });

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

  const fetchRoom = async () => {
    try {
      const result = await getAllRooms();
      setRoom(result.roomList);
      console.log(result.roomList);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <RoomContext.Provider
      value={{ rooms, adults, setAdults, kids, setKids, fetchRoom, loading }}
    >
      {children}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoomProvider;
