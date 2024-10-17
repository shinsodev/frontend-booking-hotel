import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState(null);
  // const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, username, phoneNumber }),
      });

      if (response.ok) {
        console.log('Signup successful!');
        // history.push('/login');  // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Signup failed:', errorMessage);
      }
    } catch (error) {
      setError('Đã xảy ra lỗi khi đăng ký.');
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-accent/50 flex items-center justify-center pt-28 pb-6">
      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center">
        <div className="md:w-1/2 px-10">
          <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">Signup</h2>

          {/* {error && <p className="text-red-500 text-center">{error}</p>} Hiển thị lỗi nếu có */}

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
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              className="p-2 border-b border-black outline-none"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              className="p-2 border-b border-black outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              Signup
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <p>Already have an account?</p>
            <button
              // onClick={() => history.push('/login')}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400"
            >
              Login
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2 overflow-hidden pr-10">
          <img className="rounded-2xl object-cover w-full h-full" src="../../assets/img/room.jpg" alt="Signup Background" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
