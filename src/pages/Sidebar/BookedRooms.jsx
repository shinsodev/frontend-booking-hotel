import React, { useState, useEffect } from 'react';

// Sample data for booked rooms
const bookedRoomsData = [
  {
    id: 1,
    roomType: 'Deluxe Room',
    checkInDate: '2024-10-25',
    checkOutDate: '2024-10-30',
    price: 150,
  },
  {
    id: 2,
    roomType: 'Suite Room',
    checkInDate: '2024-11-01',
    checkOutDate: '2024-11-05',
    price: 250,
  },
];

const BookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    // Load booked rooms data (in a real application, this would come from an API)
    setBookedRooms(bookedRoomsData);
  }, []);

  const handleCheckOut = (id) => {
    // Handle check-out logic (in a real application, this would include API call)
    setBookedRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    alert(`Checked out from room with ID: ${id}`);
  };

  const handleCancelBooking = (id) => {
    // Handle booking cancellation logic (in a real application, this would include API call)
    setBookedRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    alert(`Booking cancelled for room with ID: ${id}`);
  };

  return (
    <section className="bg-slate-500 min-h-screen">
      <div className="container mx-auto px-8">
        <h3 className="h3 text-[45px] text-white text-center py-12">My Booked Rooms</h3>
        {bookedRooms.length === 0 ? (
          <p className="text-center text-lg text-white">You have no booked rooms.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h4 className="text-lg font-semibold">{room.roomType}</h4>
                  <p className="text-gray-600">Check-in: {room.checkInDate}</p>
                  <p className="text-gray-600">Check-out: {room.checkOutDate}</p>
                  <p className="text-accent font-bold">Price: ${room.price}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleCheckOut(room.id)}
                      className="bg-accent text-white py-2 px-4 rounded hover:bg-opacity-80"
                    >
                      Check Out
                    </button>
                    <button
                      onClick={() => handleCancelBooking(room.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-opacity-80"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookedRooms;
