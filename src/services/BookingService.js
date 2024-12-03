import axios from "./customize-axios";

export async function userBooking(
  checkInDate,
  checkOutDate,
  numOfChildren,
  numOfAdults,
  totalNumOfGuest,
  id
) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `/bookings/create-booking/${id}`,
      {
        checkInDate,
        checkOutDate,
        numOfChildren,
        numOfAdults,
        totalNumOfGuest,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
  }
}

export async function getAvailableRooms(
  checkInDate,
  checkOutDate,
  totalGuest,
  page
) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get("/rooms/get-available-rooms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        checkInDate,
        checkOutDate,
        totalGuest,
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Authorization error: Access denied (403)");
    }
    throw new Error("Error fetching rooms");
  }
}

export async function checkAvailableRooms(
  checkInDate,
  checkOutDate,
  totalGuest,
  id
) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/rooms/check-available/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        checkInDate,
        checkOutDate,
        totalGuest,
      },
    });

    return result; // Trả về dữ liệu từ kết quả
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Authorization error: Access denied (403)");
    }
    throw new Error("Error fetching rooms");
  }
}

export async function bookingHistory(page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get("/bookings/booking-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error check booking history", error);
  }
}

export async function recentBooking(page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get("/bookings/recent-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error check recent booking history", error);
  }
}

export async function cancelBooking(id) {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.delete(`/bookings/cancel-booking/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error cancel recent booking", error);
  }
}

// admin server
export async function adminGetAllBooking(page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get("/bookings/get-all-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error get all booking", error);
  }
}

export async function adminGetBookingByRoom(id, page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/bookings/get-by-room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        id,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error get all booking by room", error);
  }
}

export async function adminGetBookingByUserId(id, page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/bookings/get-by-user-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error get all booking by userId", error);
  }
}

export async function adminGetBookingByDateType(
  startDate,
  endDate,
  roomType,
  page
) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(`/bookings/get-by-date-type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        startDate,
        endDate,
        roomType,
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error get all booking by date", error);
  }
}

export async function adminGetBookingLatePayment(page) {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get("/bookings/late-payment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return result.data; // Trả về dữ liệu từ kết quả
  } catch (error) {
    console.error("Error get all booking", error);
  }
}

export async function cancelBookingLatePayment(id) {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.delete(`/bookings/delete-booking/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error cancel recent booking", error);
  }
}
