// import React from 'react'
import Rooms from "../../components/Rooms/Rooms";
import BookForm from "../../components/BookForm/BookForm";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

import img1 from "../../assets/img/Rooms/room1.jpg";
import img2 from "../../assets/img/Rooms/room3.jpg";
import img3 from "../../assets/img/Rooms/room14.jpg";
import food from "../../assets/img/HomePage/food.jpg";
import spa from "../../assets/img/HomePage/spa.jpg";
import party from "../../assets/img/HomePage/partyImg.jpg";
import pool from "../../assets/img/HomePage/pool3.jpg";
import fitness from "../../assets/img/HomePage/fitness.jpg";
import img9 from "../../assets/img/Rooms/room13.jpg";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rating from "../../components/Rating/Rating";
import { RiDoubleQuotesR } from "react-icons/ri";
import User1 from "../../assets/img/user1.png";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import introImg from "../../assets/img/Rooms/room6.jpg";
import introImg1 from "../../assets/img/Rooms/room2.jpg";


const ScrollAnimation = ({ children, direction }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
};


const Home = () => {
  return (
    <>
      <HeroSlider />
      {/* <div className="container mx-auto relative">
        <div className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
          <BookForm />
        </div>
      </div> */}
      {/* <Rooms /> */}

      <section className="py-14">
        <div className="container mx-auto lg:px-0">
          <div className="text-center">
            <h2 className="font-primary text-[65px]">Aurora Grand</h2>
            <div className="font-tertiary uppercase text-[15px] tracking-[6px]">
              - Welcome to Aurora Grand Hotel -
            </div>
          </div>

          {/* intro  */}
          <div className="flex flex-col lg:flex-row h-full mt-12">
            {/* left  */}
            <div className="w-full h-full lg:w-[65%] px-8">
              <div className="py-8">
                <h3 className="h3 text-[30px] mb-4">
                  Experience Elegance at Aurora Grand
                </h3>

                <p className="text-gray-600">
                  At Aurora Grand, we offer more than just a place to stay; we
                  provide an unforgettable experience. With modern architecture,
                  attentive service, and luxurious surroundings, our hotel is
                  the perfect choice for both leisure travelers and business
                  professionals. Ideally located near popular attractions and
                  bustling shopping districts, Aurora Grand makes it easy for
                  you to explore the beauty of the city. Let us pamper you with
                  top-notch services and warm hospitality, creating cherished
                  memories that will last a lifetime.
                </p>
              </div>

              <button className="btn btn-lg btn-primary mx-auto mb-8">
                See our rooms
              </button>
            </div>

            {/* right  */}
            <div className="w-full h-full lg:w-[35%]">
              <img src={introImg} alt="" className="object-cover h-[370px] w-full" />
            </div>
          </div>

          {/* intro continue */}
          <div className="h-[700px] overflow-hidden mt-12 shadow-lg">
            <img src={introImg1} alt="" className="w-full h-full object-cover" />
          </div>

          {/* services */}
          <section className="pb-10">

            <h3 className="h3 text-[45px] text-white text-center py-12 mb-12 bg-accent">
              Our Services
            </h3>


            <div className="container mx-auto lg:px-0">
              <div className="space-y-12">
                {/* Room service */}
                <ScrollAnimation direction="left">
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                      <img src={img9} alt="Rooms" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Rooms</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Aurora Grand’s rooms offer comfort and luxury, featuring elegant designs, premium amenities, and breathtaking views for a perfect stay.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Pool service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img src={pool} alt="Pool" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Pool</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Our expansive, crystal-clear pool is the ideal place to unwind, have fun, and enjoy relaxing moments under the sun.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Dining service */}
                <ScrollAnimation direction="left">
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                      <img src={food} alt="Dining" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Dining</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Enjoy exquisite dining at Aurora Grand with a diverse menu that blends local flavors and international cuisine, served in an elegant setting.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Events and party service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img src={party} alt="Events & party" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Events & Party</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Aurora Grand is the perfect venue for hosting events and parties. With flexible spaces and a professional team, every event is crafted to be truly special.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Spa service */}
                <ScrollAnimation direction="left">
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                      <img src={spa} alt="Spa" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Spa</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Indulge in ultimate relaxation at Aurora Grand’s spa, offering rejuvenating treatments and therapies designed to revitalize your body and mind in a tranquil atmosphere.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Fitness service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img src={fitness} alt="Fitness" className="w-[90%] h-72 object-cover rounded-2xl shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Fitness Center</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Stay fit and healthy in our well-equipped fitness center, offering a variety of machines and workout spaces to cater to your fitness routine.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Discount Events Section */}
      <section className="bg-slate-500 py-14">
        <div className="container mx-auto lg:px-0">
          <h3 className="h3 text-[45px] text-white text-center py-12">
            Discount on Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Event 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img1} alt="Room Discount 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-lg font-semibold">Valentine's Day Special</h4>
                <p className="text-gray-600">Enjoy a romantic getaway in our premium room with a 20% discount.</p>
                <p className="text-accent font-bold">Price: $80</p>
              </div>
            </div>
            {/* Sample Event 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img2} alt="Room Discount 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-lg font-semibold">Relaxation Package</h4>
                <p className="text-gray-600">Book a room for the weekend and get 15% off your stay.</p>
                <p className="text-accent font-bold">Price: $100</p>
              </div>
            </div>
            {/* Sample Event 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img3} alt="Room Discount 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-lg font-semibold">Birthday Bash Room Package</h4>
                <p className="text-gray-600">Book a room for your birthday and get a complimentary decoration.</p>
                <p className="text-accent font-bold">Price: $300</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Ratings Section */}
      <section className="py-14">
        <div className="container mx-auto lg:px-0">
          <h3 className="h3 text-[45px] text-center mb-12">
            What Our Guests Say
          </h3>
          <div className="flex flex-col space-y-8">
            {/* Sample Review 1 */}
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img src={User1} alt="User 1" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h4 className="text-lg font-semibold">John Doe</h4>
                <div className="flex space-x-1">
                  <Rating rating={5} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" /> 
                  An unforgettable stay! The service was exceptional, and the facilities were top-notch.
                </p>
              </div>
            </div>

            {/* Sample Review 2 */}
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img src={User1} alt="User 2" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Jane Smith</h4>
                <div className="flex space-x-1">
                  <Rating rating={4} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" /> 
                  Great experience! The room was clean and cozy, but I wish the pool was open longer.
                </p>
              </div>
            </div>

            {/* Sample Review 3 */}
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img src={User1} alt="User 3" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Michael Lee</h4>
                <div className="flex space-x-1">
                  <Rating rating={5} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" /> 
                  I had a wonderful time! Highly recommend the spa and dining options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
