import { useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom'; // Dùng để điều hướng
// import { AuthContext } from '../../contexts/AuthContext'; // Lấy context từ AuthProvider
import Logo from "../../assets/img/room.jpg";
import GoogleImg from "../../assets/img/google.svg";

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Để lưu thông báo lỗi
  // const { setUser } = useContext(AuthContext); // Lấy hàm setUser từ context
  // const history = useHistory(); // Dùng để điều hướng sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!', data);

        // Lưu token vào localStorage
        localStorage.setItem('token', data.token);

        // Lưu thông tin người dùng vào context
        // setUser(data.user);

        // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
        // history.push('/dashboard');
      } else {
        const errorMessage = await response.text(); // Lấy thông báo lỗi từ backend
        setError(errorMessage); // Hiển thị lỗi cho người dùng
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi đăng nhập.');
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-accent/50 flex items-center justify-center pt-28 pb-6">
      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center">
        <div className="md:w-1/2 px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">Login</h2>

          {/* {error && <p className="text-red-500 text-center">{error}</p>} Hiển thị lỗi nếu có */}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 border-b border-black outline-none"
              type="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 w-full border-b border-black outline-none"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
            <p>{"Don't have an account?"}</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400">
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2 overflow-hidden pr-10">
          <img className="rounded-2xl object-cover w-full h-full" src={Logo} alt="Login Background" />
        </div>
      </div>
    </section>
  );
};

export default Login;