import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../services/RoomService";
import { toast } from "react-toastify";
import AdultsDropdown from "../../components/AdultsDropdown/AdultsDropdown";
import KidsDropdown from "../../components/KidsDropdown/KidsDropdown";
import CheckIn from "../../components/CheckIn/CheckIn";
import CheckOut from "../../components/CheckOut/CheckOut";
import {
  checkAvailableRooms,
  userBooking,
} from "../../services/BookingService";
import {
  FaWifi,
  FaCheck,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfAdults, setNumOfAdults] = useState(2);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [checkAvailable, setCheckAvailable] = useState(false);

  // Sử dụng useEffect để lấy dữ liệu phòng khi component được mount
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(id);
        setRoom(roomData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phòng:", error);
      }
    };

    fetchRoomData();
  }, [id]);

  const handleChecking = async () => {
    try {
      const totalGuests = numOfAdults + numOfChildren;
      const result = await checkAvailableRooms(
        checkInDate,
        checkOutDate,
        totalGuests,
        room.id
      );

      if (result.status === 200) {
        setCheckAvailable(true);
        toast.success("Còn phòng");
      }
    } catch (error) {
      toast.error("Hết phòng");
    }
  };

  const handleBooking = async () => {
    try {
      const totalNumOfGuest = numOfAdults + numOfChildren;
      const result = await userBooking(
        checkInDate,
        checkOutDate,
        numOfChildren,
        numOfAdults,
        totalNumOfGuest,
        room.id
      );
      console.log(result);
      if (result.status === 200) {
        toast.success("Book thành công");
      }
    } catch (error) {
      toast.error("Lỗi booking");
    }
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full pb-24 pt-32">
          {/* left  */}
          <div className="w-full h-full lg:w-[60%] px-6">
            <h2 className="h2">Room Detail - {room?.roomType}</h2>
            <p className="mb-8">{room?.roomDescription}</p>
            <img className="mb-8" src={room?.roomPhotoUrl} alt="" />

            {/* facilities */}
            <div className="mt-12">
              <h3 className="h3 mb-3">Room Facilities</h3>
              <p className="mb-12">
                You are welcome to see the rooms, whose luxury and comfort will
                help you rest and relax after a whole day of sightseeing and
                admiring the capital city of Wielkopolska.
              </p>
            </div>

            {/* grid */}
            <div className="flex flex-wrap">
              {room?.facility ? (
                <>
                  {room.facility.drinkInfo && (
                    <div className="w-1/4 mb-8">
                      <FaCocktail
                        className="text-yellow-500 text-3xl"
                        title="Drink Available"
                      />
                    </div>
                  )}
                  {room.facility.gymInfo && (
                    <div className="w-1/4 mb-8">
                      <FaStopwatch
                        className="text-yellow-500 text-3xl"
                        title="Gym Available"
                      />
                    </div>
                  )}
                  {room.facility.breakfastInfo && (
                    <div className="w-1/4 mb-8">
                      <FaHotdog
                        className="text-yellow-500 text-3xl"
                        title="Breakfast Included"
                      />
                    </div>
                  )}
                  {room.facility.poolInfo && (
                    <div className="w-1/4 mb-8">
                      <FaSwimmingPool
                        className="text-yellow-500 text-3xl"
                        title="Pool Access"
                      />
                    </div>
                  )}
                  {room.facility.parkingInfo && (
                    <div className="w-1/4 mb-8">
                      <FaParking
                        className="text-yellow-500 text-3xl"
                        title="Parking Available"
                      />
                    </div>
                  )}
                  {room.facility.bathInfo && (
                    <div className="w-1/4 mb-8">
                      <FaBath
                        className="text-yellow-500 text-3xl"
                        title="Bath Included"
                      />
                    </div>
                  )}
                  {room.facility.coffeeInfo && (
                    <div className="w-1/4 mb-8">
                      <FaCoffee
                        className="text-yellow-500 text-3xl"
                        title="Coffee Available"
                      />
                    </div>
                  )}
                  {room.facility.wifiInfo && (
                    <div className="w-1/4 mb-8">
                      <FaWifi
                        className="text-yellow-500 text-3xl"
                        title="WiFi Included"
                      />
                    </div>
                  )}
                </>
              ) : (
                <span>No facilities</span>
              )}
            </div>
          </div>

          {/* right  */}
          <div className="w-full h-full lg:w-[40%]">
            {/* reservation  */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h3>Your Reservation</h3>
                <div className="h-[60px]">
                  <CheckIn setCheckInDate={setCheckInDate} />
                </div>
                <div className="h-[60px]">
                  <CheckOut setCheckOutDate={setCheckOutDate} />
                </div>
                <div className="h-[60px]">
                  <AdultsDropdown setNumOfAdults={setNumOfAdults} />
                </div>
                <div className="h-[60px]">
                  <KidsDropdown setNumOfChildren={setNumOfChildren} />
                </div>
              </div>
              <button
                className="btn btn-lg btn-primary w-full"
                onClick={handleChecking}
              >
                {/* book now for {room?.roomPrice}$ */}
                Check
              </button>

              {checkAvailable && (
                <button
                  className="btn btn-lg btn-secondary w-full mt-4 transition-all"
                  onClick={handleBooking}
                >
                  book now for {room?.roomPrice}$
                </button>
              )}
            </div>

            {/* rules */}
            <div>
              <h3 className="h3">Hotel Rules</h3>
              <p className="mb-6">
                Hotel management will highly appreciate your collaboration in
                abiding by these rules and regulations, whose aim is to ensure
                peaceful and safe stay for our Guests.
              </p>

              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-in: 3:00 PM - 9:00 PM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  Check-out: 10:30 AM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  No Pets
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck className="text-accent" />
                  No Smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
