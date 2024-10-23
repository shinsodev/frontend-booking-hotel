import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Đảm bảo đường dẫn này đúng
import User1 from "../../assets/img/user1.png";

const commonClassNameOfInput = "w-full p-4 text-sm text-gray-900 border border-gray-200";

const UserProfile = () => {
  // Sử dụng useContext để lấy dữ liệu từ AuthContext
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="py-8 px-20">
        <div className="flex items-center gap-8">
          <img src={User1} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div>
            {/* Hiển thị tên và email từ context */}
            <div className="text-[30px] font-mediu capitalize">{user?.name}</div>
            <div className="text-gray-500">{user?.email}</div>
          </div>
        </div>

        {/* Form */}
        <form>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-full">
              <div className="mb-2">Full Name </div>
              {/* Hiển thị dữ liệu từ context */}
              <input
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
                placeholder={user?.name}
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
                placeholder={user?.phoneNumber}
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2">Email</div>
              <input
                type="email"
                className={commonClassNameOfInput}
                placeholder={user?.email}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <div className="mb-2">Role</div>
              <input
                type="text"
                className={commonClassNameOfInput}
                placeholder={user?.role}
                disabled
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2">ID</div>
              <input
                type="number"
                className={commonClassNameOfInput}
                placeholder={user?.id}
                disabled
              />
            </div>
          </div>
          <div className="my-8">
            <div className="mb-2">Profile Picture</div>
            <input type="file" className={commonClassNameOfInput} />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-secondary btn-sm max-w-[240px] mx-auto rounded-lg">
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
