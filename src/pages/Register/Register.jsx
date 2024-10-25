import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../../assets/img/Rooms/room12.jpg"; // Matching image with Login
import GoogleImg from "../../assets/img/google.svg"; // Matching the Google sign-up button
import { IoHome } from "react-icons/io5";


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Kiểm tra username không có khoảng trắng
    if (/\s/.test(username)) {
      setError('Username cannot contain spaces.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, username, phoneNumber }),
      });

      if (response.ok) {
        // console.log('Register successful!');
        navigate('/login');  // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
      } else {
        setError('Register failed. Username already exists.');
      }
    } catch (error) {
      setError('Failed to register');
      console.error('Error:', error);
    }
  };

  return (
    <section className="flex items-center justify-center bg-accent/30 h-screen">
      <Link to="/" className='absolute flex items-center left-10 top-10'><IoHome size={22}/><div className='px-1 text-[17px] font-medium hover:underline'>Home</div></Link>

      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center justify-center">
        <div className='hidden md:block h-[500px] w-[500px] overflow-hidden rounded-l-2xl'>
          <img src={Logo} alt="" className='h-full w-full object-cover'/>
        </div>

        <div className="w-[380px] px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">Register</h2>

          {/* Display error message */}
          {error && <p className="text-red-500 text-center">{error}</p>} 

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Input username */}
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            {/* Input phone number */}
            <input
              className="p-2 border-b border-black outline-none"
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            {/* Input email */}
            <input
              className="p-2 border-b border-black outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Input password */}
            <input
              className="p-2 w-full border-b border-black outline-none"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="bg-accent rounded-xl text-white py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>

          

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <div>Already have an account?</div>
            <button
              onClick={() => navigate('/login')}
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
