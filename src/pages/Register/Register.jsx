import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/img/Rooms/room12.jpg";
import { IoHome } from "react-icons/io5";
import { apiUserRegister } from "../../services/UserService";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icon mắt

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để kiểm soát hiện/ẩn mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await apiUserRegister(
        email,
        password,
        name,
        phoneNumber
      );

      if (response.status === 200) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error("Register failed. Email already exists.");
      }
    } catch (error) {
      toast.error("Email already exists.");
    }
  };

  return (
    <section className="flex items-center justify-center bg-accent/30 h-screen">
      <Link to="/" className="absolute flex items-center left-10 top-10">
        <IoHome size={22} />
        <div className="px-1 text-[17px] font-medium hover:underline">Home</div>
      </Link>

      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center justify-center">
        <div className="hidden md:block h-[500px] w-[500px] overflow-hidden rounded-l-2xl">
          <img src={Logo} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">
            Register
          </h2>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="p-2 border-b border-black outline-none appearance-none"
              type="tel"
              pattern="[0-9]*" // Chỉ cho phép nhập số
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                // Chỉ cho phép nhập số
                if (/^\d*$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              inputMode="numeric" // Hiển thị bàn phím số trên thiết bị di động
              required
            />

            <input
              className="p-2 border-b border-black outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                className="p-2 w-full border-b border-black outline-none"
                type={showPassword ? "text" : "password"} // Kiểm tra showPassword để đổi type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Thay đổi showPassword khi click
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>

            <div className="relative">
              <input
                className="p-2 w-full border-b border-black outline-none"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>

            <button className="bg-accent rounded-xl text-white py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <div>Already have an account?</div>
            <button
              onClick={() => navigate("/login")}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
