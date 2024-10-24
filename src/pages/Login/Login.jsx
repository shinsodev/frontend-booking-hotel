import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/Rooms/room.jpg";
import GoogleImg from "../../assets/img/google.svg";
import { IoHome } from "react-icons/io5";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { fetchUserData } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Kiểm tra username không có khoảng trắng
    if (/\s/.test(username)) {
      setError('Username cannot contain spaces.');
      return;
    }
  
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
        localStorage.setItem('token', data.token);
  
        // Fetch user data after login and wait for it to finish
        await fetchUserData(data.token);
  
        navigate('/dashboard'); // Chuyển hướng sau khi lấy xong thông tin người dùng
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setError('Failed to login');
      console.error('Error:', error);
    }
  };
  

  return (
    <section className="flex items-center justify-center bg-accent/30 h-screen relative">
      <Link to="/" className='absolute flex items-center left-10 top-10'><IoHome size={22}/><div className='px-1 text-[17px] font-medium hover:underline'>Home</div></Link>
      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center justify-center">
        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            
            <Link to="/" className="text-xs text-gray-500">
              <div className='hover:underline'>Forgot password?</div>
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
              onClick={() => navigate('/register')}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Register
            </button>
          </div>
        </div>

        {/* Image only visible on medium screens and larger */}
        <div className='hidden md:block h-[500px] w-[500px] overflow-hidden rounded-r-2xl'>
          <img src={Logo} alt="" className='h-full w-full object-cover'/>
        </div>
      </div>
    </section>
  );
};

export default Login;
