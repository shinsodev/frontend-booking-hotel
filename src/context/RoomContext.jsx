import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { roomData } from '../data';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState(roomData);
    const [adults, setAdults] = useState('1 Adult');
    const [kids, setKids] = useState('0 Kid');
    const [total, setTotal] = useState(0);

  return (
    <RoomContext.Provider value={{ rooms, adults, setAdults, kids, setKids }}>
      {children}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoomProvider;
