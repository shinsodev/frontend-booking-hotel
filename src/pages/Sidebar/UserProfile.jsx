import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // Đảm bảo đường dẫn này đúng
import User1 from "../../assets/img/user1.png";
import UserIcon from "../../assets/img/userIcon.png";
import { updateMyInfo, uploadImage } from "../../services/UserService";
import { toast } from "react-toastify";

const commonClassNameOfInput =
  "w-full p-4 text-sm text-gray-900 border border-gray-200";

const UserProfile = () => {
  // Sử dụng useContext để lấy dữ liệu từ AuthContext
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || ""); // Khởi tạo state cho tên
  const [email, setEmail] = useState(user?.email || ""); // Khởi tạo state cho email
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || ""); // Khởi tạo state cho số điện thoại
  const [image, setImage] = useState(user?.imageUrl || null); // Khởi tạo state cho hình ảnh đại diện
  const { fetchUserData } = useContext(AuthContext);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Ngăn chặn việc reload trang

    const token = localStorage.getItem("token"); // Thay thế bằng token thực tế

    // Tạo đối tượng userInfo với các trường cần cập nhật
    const userInfo = {
      email, // Sử dụng email từ state
      name, // Sử dụng tên từ state
      phoneNumber,
    };

    try {
      const response = await updateMyInfo(token, userInfo);

      if (image instanceof File) {
        const result = await uploadImage(image);
      }

      if (response.status === 200) {
        await fetchUserData(token);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  return (
    <>
      <section className="py-8 px-20">
        <div className="flex items-center gap-8">
          <img
            src={user?.imageUrl || UserIcon}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            {/* Hiển thị tên và email từ context */}
            <div className="text-[30px] font-medium capitalize">
              {user?.name}
            </div>
            <div className="text-gray-500">{user?.email}</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate}>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <div className="mb-2">Full Name</div>
              <input
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
                value={name} // Gán giá trị từ state
                onChange={(e) => setName(e.target.value)} // Cập nhật state khi người dùng nhập
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2">Role</div>
              <input
                type="text"
                className={commonClassNameOfInput}
                value={user?.role}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <div className="mb-2">Contact Number</div>
              <input
                type="tel"
                className={commonClassNameOfInput}
                value={phoneNumber} // Gán giá trị từ state
                onChange={(e) => {
                  const value = e.target.value;
                  // Chỉ cho phép nhập số
                  if (/^\d*$/.test(value)) {
                    setPhoneNumber(value);
                  }
                }}
                pattern="[0-9]*" // Giới hạn chỉ nhập ký tự số
                inputMode="numeric" // Hiển thị bàn phím số trên thiết bị di động
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2">Email</div>
              <input
                type="email"
                className={commonClassNameOfInput}
                value={email} // Gán giá trị từ state
                onChange={(e) => setEmail(e.target.value)} // Cập nhật state khi người dùng nhập
              />
            </div>
          </div>
          <div className="my-8">
            <div className="mb-2">Profile Picture</div>
            <input
              type="file"
              className={commonClassNameOfInput}
              onChange={(e) => setImage(e.target.files[0])} // Cập nhật hình ảnh khi người dùng chọn
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-secondary btn-sm max-w-[240px] mx-auto rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
