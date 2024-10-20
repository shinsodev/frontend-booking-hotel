import React, { useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
import Room from "../Room/Room";
import { SpinnerDotted } from 'spinners-react';
import introRoomPage from "../../assets/img/Rooms/room11.jpg";
import BookForm from "../../components/BookForm/BookForm";


const Rooms = () => {
  const { rooms, loading } = useContext(RoomContext);

  return (
    <section className="pb-20">
      {/* loading */}
      {loading && (
        <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center">
          <SpinnerDotted color="white" />
        </div>
      )}

        <div className="h-[600px] overflow-hidden relative">
            <img src={introRoomPage} alt="" className="w-full h-full object-cover" />
            
            {/* z-index để đảm bảo lớp phủ nằm trên ảnh */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            
            {/* Nội dung bên trên */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white">
                <div className="font-tertiary uppercase text-[15px] tracking-[6px]">
                Aurora Grand
                </div>
                <h2 className="font-primary text-[45px] mb-4">Room & Suites</h2>
            </div>
        </div>

      <div className="container mx-auto relative mb-32">
        <div className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
          <BookForm />
        </div>
      </div>


      <div className="container mx-auto lg:px-0">
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {rooms.map((room) => {
            return <Room room={room} key={room.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
