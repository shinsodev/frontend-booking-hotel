import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../context/RoomContext";
import { AuthContext } from "../../context/AuthContext";
import BookForm from "../../components/BookForm/BookForm";
import { SpinnerDotted } from "spinners-react";
import introRoomPage from "../../assets/img/Rooms/room11.jpg";
import { Link } from "react-router-dom";
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Rating from "@mui/material/Rating";

const Rooms = () => {
  const {
    roomsAvailable,
    rooms,
    loading,
    fetchAvailableRooms,
    fetchRoom,
    page,
    setPage,
    pageAvailable,
    setPageAvailable,
    totalPages,
  } = useContext(RoomContext);
  const { user } = useContext(AuthContext);

  // State để lưu trữ ngày check-in và check-out
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfAdults, setNumOfAdults] = useState(2);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [checkRoom, setCheckRoom] = useState(false);
  // const [page, setPage] = useState(0); // Số trang hiện tại
  // const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const handlePageClick = (event) => {
    if (checkRoom) {
      setPageAvailable(event.selected);
    } else {
      setPage(event.selected);
    }
  };

  // Gọi hàm fetchAvailableRooms khi ngày check-in hoặc check-out thay đổi
  const handleFetchAvailable = () => {
    if (checkInDate && checkOutDate) {
      if (new Date(checkOutDate) > new Date(checkInDate)) {
        const totalGuest = numOfAdults + numOfChildren;
        fetchAvailableRooms(
          checkInDate,
          checkOutDate,
          totalGuest,
          pageAvailable
        );
        setCheckRoom(true);
      } else {
        toast.error("Check-out date must be later than check-in date.");
      }
    } else {
      toast.error("Please select both check-in and check-out dates.");
    }
  };

  const handleFetchAvailableRooms = () => {
    setCheckRoom(true);
  };

  // Fetch tất cả các phòng nếu user
  useEffect(() => {
    if (user) {
      // if (checkInDate && checkOutDate) {
      //   const totalGuest = numOfAdults + numOfChildren;
      //   fetchAvailableRooms(checkInDate, checkOutDate, totalGuest, page);
      // }

      if (checkRoom) {
        handleFetchAvailable();
      } else {
        fetchRoom(page);
      }
    }
  }, [
    page,
    pageAvailable,
    checkRoom,
    checkInDate,
    checkOutDate,
    numOfAdults,
    numOfChildren,
  ]);

  return (
    <section className="pb-20">
      {/* loading */}
      {loading && (
        <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
          <SpinnerDotted color="white" />
        </div>
      )}

      <div className="h-[600px] overflow-hidden relative">
        <img
          src={introRoomPage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Aurora Grand
          </div>
          <h2 className="font-primary text-[45px] mb-4">Room & Suites</h2>
        </div>
      </div>

      <div className="container mx-auto relative mb-32">
        <div
          className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12"
        >
          <BookForm
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            numOfChildren={numOfChildren}
            setNumOfChildren={setNumOfChildren}
            numOfAdults={numOfAdults}
            setNumOfAdults={setNumOfAdults}
            handleFetchAvailableRooms={handleFetchAvailableRooms}
          />
        </div>
      </div>

      <div className="container mx-auto lg:px-0">
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {/* Hiển thị các phòng tùy thuộc vào vai trò người dùng và ngày check-in/check-out */}
          {checkRoom && roomsAvailable ? (
            // Nếu có check-in/check-out, hiển thị roomsAvailable
            roomsAvailable.length === 0 ? (
              <div className="text-center col-span-3">No rooms available.</div>
            ) : (
              roomsAvailable.map((room, index) => (
                <div
                  key={index}
                  className="bg-white shadow-2xl min-h-[550px] group"
                >
                  <div className="overflow-hidden">
                    <img
                      className="group-hover:scale-110 transition-all duration-300 h-[250px] w-full"
                      src={room.roomPhotoUrl}
                      alt=""
                    />
                  </div>
                  <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
                    <div className="flex justify-between w-[80%]">
                      <div className="flex items-center gap-x-2">
                        <div className="text-accent">
                          <BsArrowsFullscreen className="text-[15px]" />
                        </div>
                        <div className="flex gap-x-1">
                          <div>size</div>
                          <div>{room.roomSize}m²</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <div className="text-accent">
                          <BsPeople className="text-[18px]" />
                        </div>
                        <div className="flex gap-x-1">
                          <div>max people</div>
                          <div>{room.roomCapacity}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {checkRoom && (
                    <div className="flex justify-end px-6 pb-4">
                      <div className="p-2 font-semibold bg-green-600 text-white rounded-lg">
                        Remain: {room.remain}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <Link to={`/rooms/${room.id}`}>
                      <h3 className="h3">{room.roomType}</h3>
                    </Link>
                    <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
                      {room.roomDescription.length > 100
                        ? room.roomDescription.slice(0, 100) + "..."
                        : room.roomDescription}
                    </p>
                    <div className="flex justify-center items-center gap-2 text-lg font-semibold">
                      {room.percentOfDiscount > 0 && (
                        <>
                          {/* Giá gốc với gạch ngang */}
                          <span className="text-gray-500 line-through mt-2">
                            {room.roomPrice.toLocaleString("en-US")}₫
                          </span>
                          {room.percentOfDiscount > 0 && (
                            <div className=" text-sm flex flex-col items-center">
                              <div className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold mt-2">
                                -{room.percentOfDiscount}% Off
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {room.percentOfDiscount === 0 && (
                        <span className="text-black">
                          {room.roomPrice.toLocaleString("en-US")}₫
                        </span>
                      )}
                    </div>
                    {/* Giá sau khi giảm */}
                    {room.percentOfDiscount > 0 && (
                      <span className="text-red-500 text-2xl">
                        {room.newPrice.toLocaleString("en-US")}₫
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/rooms/${room.id}`}
                    className="btn btn-secondary btn-sm max-w-[240px] mx-auto mb-8 mt-1"
                  >
                    Book now
                  </Link>
                </div>
              ))
            )
          ) : rooms?.length > 0 ? (
            // Nếu không có check-in/check-out hoặc là ADMIN, hiển thị rooms
            rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white shadow-2xl min-h-[500px] group"
              >
                <div className="overflow-hidden">
                  <img
                    className="group-hover:scale-110 transition-all duration-300 h-[250px] w-full"
                    src={room.roomPhotoUrl}
                    alt=""
                  />
                </div>
                <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
                  <div className="flex justify-between w-[80%]">
                    <div className="flex items-center gap-x-2">
                      <div className="text-accent">
                        <BsArrowsFullscreen className="text-[15px]" />
                      </div>
                      <div className="flex gap-x-1">
                        <div>size</div>
                        <div>{room.roomSize}m²</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <div className="text-accent">
                        <BsPeople className="text-[18px]" />
                      </div>
                      <div className="flex gap-x-1">
                        <div>max people</div>
                        <div>{room.roomCapacity}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Link to={`/rooms/${room.id}`}>
                    <h3 className="h3">{room.roomType}</h3>
                  </Link>
                  <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
                    {room.roomDescription.length > 100
                      ? room.roomDescription.slice(0, 100) + "..."
                      : room.roomDescription}
                  </p>
                  <div className="flex justify-center items-center gap-2 text-lg font-semibold">
                    {room.percentOfDiscount > 0 && (
                      <>
                        {/* Giá gốc với gạch ngang */}
                        <span className="text-gray-500 line-through mt-2">
                          {room.roomPrice.toLocaleString("en-US")}₫
                        </span>
                        {room.percentOfDiscount > 0 && (
                          <div className=" text-sm flex flex-col items-center">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold mt-2">
                              -{room.percentOfDiscount}% Off
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {room.percentOfDiscount === 0 && (
                      <span className="text-black">
                        {room.roomPrice.toLocaleString("en-US")}₫
                      </span>
                    )}
                  </div>
                  {/* Giá sau khi giảm */}
                  {room.percentOfDiscount > 0 && (
                    <span className="text-red-500 text-2xl">
                      {room.newPrice.toLocaleString("en-US")}₫
                    </span>
                  )}
                </div>
                <Link
                  to={`/rooms/${room.id}`}
                  className="btn btn-secondary btn-sm max-w-[240px] mx-auto mb-8 mt-5"
                >
                  Book now
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No rooms available.</p>
          )}
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        forcePage={checkRoom ? pageAvailable : page} // Đảm bảo phản ánh đúng trạng thái trang hiện tại
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
    </section>
  );
};

export default Rooms;
