import React from "react";
import AdultDropdown from "../AdultsDropdown/AdultsDropdown";
import KidsDropdown from "../KidsDropdown/KidsDropdown";
import CheckIn from "../CheckIn/CheckIn";
import CheckOut from "../CheckOut/CheckOut";
import { RoomContext } from "../../context/RoomContext";

const BookForm = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  numOfChildren,
  setNumOfChildren,
  numOfAdults,
  setNumOfAdults,
  handleFetchAvailableRooms,
}) => {
  return (
    <form className="h-[300px] w-full lg:h-[70px]">
      <div className="flex flex-col w-full h-full lg:flex-row">
        <div className="flex-1 border-r">
          <CheckIn setCheckInDate={setCheckInDate} />
        </div>
        <div className="flex-1 border-r">
          <CheckOut setCheckOutDate={setCheckOutDate} />
        </div>
        <div className="flex-1 border-r">
          <AdultDropdown setNumOfAdults={setNumOfAdults} />
        </div>
        <div className="flex-1 border-r">
          <KidsDropdown setNumOfChildren={setNumOfChildren} />
        </div>

        {/* btn */}
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleFetchAvailableRooms}
        >
          Check now
        </button>
      </div>
    </form>
  );
};

export default BookForm;
