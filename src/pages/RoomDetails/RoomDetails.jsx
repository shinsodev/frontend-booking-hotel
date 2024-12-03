import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../services/RoomService";
import { toast } from "react-toastify";
import { getReviewByRoomId } from "../../services/ReviewService";
import AdultsDropdown from "../../components/AdultsDropdown/AdultsDropdown";
import KidsDropdown from "../../components/KidsDropdown/KidsDropdown";
import CheckIn from "../../components/CheckIn/CheckIn";
import CheckOut from "../../components/CheckOut/CheckOut";
import { AuthContext } from "../../context/AuthContext";
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
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { FaStar, FaSuitcase } from "react-icons/fa";
import moment from "moment";
import ReactPaginate from "react-paginate";

function RatingDisplay({ averageRating }) {
  const roundedRating = averageRating ? averageRating.toFixed(1) : 0;
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1px" }}>
      <Box
        sx={{
          fontWeight: "bold",
          textDecoration: "underline",
          marginRight: "8px",
        }}
      >
        {roundedRating}
      </Box>
      <Rating
        name="read-only"
        value={Number(roundedRating)}
        precision={0.5}
        readOnly
        getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{}</Box>
    </Box>
  );
}

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [reviews, setReviews] = useState([]);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfAdults, setNumOfAdults] = useState(2);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [checkAvailable, setCheckAvailable] = useState(false);
  const { user } = useContext(AuthContext);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  // Sử dụng useEffect để lấy dữ liệu phòng khi component được mount
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(id);
        setRoom(roomData);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const result = await getReviewByRoomId(id, page); // Lấy page đầu tiên
        setReviews(result.reviewList);
        console.log(result.reviewList);
        setTotalPages(result.totalPages);
      } catch (error) {
        toast.error("Failed to fetch reviews.");
      }
    };
    fetchReviews();

    fetchRoomData();
  }, [id, page]);

  const handleChecking = async () => {
    if (user.role === "USER") {
      if (checkInDate && checkOutDate) {
        if (new Date(checkOutDate) > new Date(checkInDate)) {
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
              toast.success("Available Rooms");
            }
          } catch (error) {
            toast.error("No room available");
          }
        } else {
          toast.error("Check-out date must be later than check-in date.");
        }
      } else {
        toast.error("Please select both check-in and check-out dates.");
      }
    } else {
      toast.error("Only user can check");
    }
  };

  const handleBooking = async () => {
    try {
      setCheckAvailable(false);
      const totalNumOfGuest = numOfAdults + numOfChildren;
      const result = await userBooking(
        checkInDate,
        checkOutDate,
        numOfChildren,
        numOfAdults,
        totalNumOfGuest,
        room.id
      );

      if (result.status === 200) {
        toast.success("Booking successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const countNumberOfNights = () => {
    const start = moment(checkInDate);
    const end = moment(checkOutDate);
    const numberOfNights = end.diff(start, "days"); // Số ngày giữa checkIn và checkOut

    return numberOfNights;
  };

  // Hàm tính giá phòng sau giảm giá
  const calculatePrice = () => {
    if (checkInDate && checkOutDate) {
      const start = moment(checkInDate);
      const end = moment(checkOutDate);
      const numberOfNights = end.diff(start, "days"); // Số ngày giữa checkIn và checkOut

      if (numberOfNights > 0) {
        // Tính giá sau giảm giá
        const priceAfterDiscount =
          room?.roomPrice * (1 - room?.percentOfDiscount / 100);
        return priceAfterDiscount * numberOfNights; // Giá phòng nhân số ngày
      }
    }
    return room?.roomPrice * (1 - room?.percentOfDiscount / 100); // Trả về giá gốc nếu không có ngày đặt
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
            <div className="mb-8 flex items-center">
              <RatingDisplay averageRating={room?.averageRating || 0} />
              <span className="mx-4">|</span>
              <span className="mr-4 flex items-center gap-2">
                <FaSuitcase className="text-accent" />{" "}
                {/* Icon cho đặt phòng */}
                Booked: {room?.numberOfBooking}
              </span>
              <span className="mx-4">|</span>
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-500" /> {/* Icon cho đánh giá */}
                Reviews: {room?.numberOfRating}
              </span>
              <span className="mx-4">|</span>
              {room?.percentOfDiscount > 0 && (
                <div className=" text-sm flex flex-col items-center">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold mt-2 mx-4 mb-2">
                    -{room?.percentOfDiscount}% Off
                  </div>
                </div>
              )}
            </div>

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

              {checkAvailable && user.role === "USER" && (
                <button
                  className="btn btn-lg btn-secondary w-full mt-4 transition-all"
                  onClick={handleBooking}
                >
                  <div>
                    {room?.percentOfDiscount > 0 ? (
                      <>
                        <span className="text-lg font-semibold text-grey-500">
                          Book now - {calculatePrice()?.toLocaleString()}₫
                        </span>
                        <span className="ml-4 text-sm line-through text-gray-500">
                          {(
                            room?.roomPrice * countNumberOfNights()
                          ).toLocaleString()}
                          ₫
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold">
                        Book now - {room?.roomPrice.toLocaleString()}₫
                      </span>
                    )}
                  </div>
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
            <div className="mt-8">
              <h3 className="h3">Reviews</h3>
              {reviews.length > 0 ? (
                <>
                  {/* Hiển thị danh sách reviews */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-100 bg-opacity-90 rounded-lg shadow-lg p-4 flex items-start space-x-4"
                      >
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          {review.user.imageUrl ? (
                            <img
                              src={review.user.imageUrl}
                              alt={review.user.name || "User Avatar"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-500 text-sm">
                              No Image
                            </span>
                          )}
                        </div>
                        {/* Nội dung review */}
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-semibold">
                              {review.user.name}
                            </h4>
                            <span className="ml-auto text-yellow-500">
                              <Rating
                                name="read-only"
                                value={review.reviewRate}
                                precision={0.5}
                                readOnly
                              />
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-gray-500 text-sm">
                            {moment(review.createdTime).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ReactPaginate */}
                </>
              ) : (
                <p>No reviews available for this room.</p>
              )}
              <ReactPaginate
                breakLabel="..."
                nextLabel="NEXT →"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="← PREVIOUS"
                className="flex space-x-2 items-center justify-center my-8"
                pageClassName="page-item"
                pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
                activeLinkClassName="active bg-black text-white" // Active page style
                previousClassName="page-item"
                previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
                nextClassName="page-item"
                nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                disabledLinkClassName="text-gray-400 cursor-not-allowed"
                containerClassName="pagination"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
