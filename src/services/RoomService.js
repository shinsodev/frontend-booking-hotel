import axios from "axios";

const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL: "https://hotelbooking-pk94.onrender.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function addRoom(roomData) {
  const formData = new FormData();

  // Thêm dữ liệu RoomDTO
  formData.append(
    "room",
    new Blob(
      [
        JSON.stringify({
          roomType: roomData.roomType,
          roomSize: roomData.roomSize,
          roomPrice: roomData.roomPrice,
          roomDescription: roomData.roomDescription,
          roomStatus: roomData.roomStatus,
          roomCapacity: roomData.roomCapacity,
          roomAmount: roomData.roomAmount,
        }),
      ],
      { type: "application/json" }
    )
  );

  // Thêm dữ liệu FacilityDTO
  const facilityData = {
    drinkInfo: roomData.drinkInfo,
    gymInfo: roomData.gymInfo,
    breakfastInfo: roomData.breakfastInfo,
    poolInfo: roomData.poolInfo,
    parkingInfo: roomData.parkingInfo,
    bathInfo: roomData.bathInfo,
    coffeeInfo: roomData.coffeeInfo,
    wifiInfo: roomData.wifiInfo,
  };

  formData.append(
    "facility",
    new Blob([JSON.stringify(facilityData)], { type: "application/json" })
  );

  // Thêm file ảnh nếu có
  if (roomData.roomPhotoUrl) {
    // console.log("roomPhotoUrl:", roomData.roomPhotoUrl); // Kiểm tra giá trị
    if (roomData.roomPhotoUrl instanceof File) {
      formData.append("file", roomData.roomPhotoUrl);
    } else {
      console.warn("roomPhotoUrl is not a valid file.");
    }
  }

  // Gửi yêu cầu
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/rooms", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error(
      "Error adding room:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
}

export async function getAllRooms(page) {
  try {
    const token = localStorage.getItem("token");
    const result = await api.get("/rooms/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page },
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Authorization error: Access denied (403)");
    }
    throw new Error("Error fetching rooms");
  }
}

export async function deleteRoom(id) {
  try {
    const token = localStorage.getItem("token");
    const result = await api.delete(`/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();

  // Thêm dữ liệu RoomDTO
  formData.append(
    "room",
    new Blob(
      [
        JSON.stringify({
          roomType: roomData.roomType,
          roomSize: roomData.roomSize,
          roomPrice: roomData.roomPrice,
          roomDescription: roomData.roomDescription,
          roomStatus: roomData.roomStatus,
          roomCapacity: roomData.roomCapacity,
          roomAmount: roomData.roomAmount,
        }),
      ],
      { type: "application/json" }
    )
  );

  // Thêm dữ liệu FacilityDTO
  const facilityData = {
    drinkInfo: roomData.facility.drinkInfo,
    gymInfo: roomData.facility.gymInfo,
    breakfastInfo: roomData.facility.breakfastInfo,
    poolInfo: roomData.facility.poolInfo,
    parkingInfo: roomData.facility.parkingInfo,
    bathInfo: roomData.facility.bathInfo,
    coffeeInfo: roomData.facility.coffeeInfo,
    wifiInfo: roomData.facility.wifiInfo,
  };
  formData.append(
    "facility",
    new Blob([JSON.stringify(facilityData)], { type: "application/json" })
  );

  // Thêm file ảnh nếu có
  if (roomData.roomPhotoUrl) {
    formData.append("file", roomData.roomPhotoUrl);
  }

  // Gửi yêu cầu
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/rooms/${roomId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Error updating room:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error updating room: ${error.message}`);
  }
}

export async function getRoomById(roomId) {
  try {
    const token = localStorage.getItem("token");
    const result = await api.get(`/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data.room;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}
