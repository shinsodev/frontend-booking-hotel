import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Rooms/room.jpg";
import GoogleImg from "../../assets/img/google.svg";
import { IoHome } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icon mắt
import { AuthContext } from "../../context/AuthContext";
import { apiLogin } from "../../services/UserService";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để kiểm soát hiện/ẩn mật khẩu
  const navigate = useNavigate();
  const { fetchUserData } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiLogin(email, password);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        await fetchUserData(data.token);

        toast.success(data.message);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <section className="flex items-center justify-center bg-accent/30 h-screen relative">
      <Link to="/" className="absolute flex items-center left-10 top-10">
        <IoHome size={22} />
        <div className="px-1 text-[17px] font-medium hover:underline">Home</div>
      </Link>
      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center justify-center">
        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

            <Link to="/" className="text-xs text-gray-500">
              <div className="hover:underline">Forgot password?</div>
            </Link>

            <button className="bg-accent rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="my-5 grid grid-cols-1 items-center text-gray-400">
            <p className="text-center text-sm">OR</p>
          </div>

          <button className="bg-white border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 text-primary border-gray-400">
            <img src={GoogleImg} alt="" className="h-6 pr-2" />
            Login with Google
          </button>

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <div>{"Don't have an account?"}</div>
            <button
              onClick={() => navigate("/register")}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Register
            </button>
          </div>
        </div>

        {/* Image only visible on medium screens and larger */}
        <div className="hidden md:block h-[500px] w-[500px] overflow-hidden rounded-r-2xl">
          <img src={Logo} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Login;
