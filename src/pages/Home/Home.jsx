// import React from 'react'
import Rooms from "../../components/Rooms/Rooms";
import BookForm from "../../components/BookForm/BookForm";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

import img1 from "../../assets/img/HomePage/1.webp";
import img2 from "../../assets/img/HomePage/2.webp";
import img3 from "../../assets/img/HomePage/3.webp";
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
import introImg from "../../assets/img/Rooms/room6.jpg"
import introImg1 from "../../assets/img/Rooms/room2.jpg"


const ScrollAnimation = ({ children, direction }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // chỉ kích hoạt một lần
    threshold: 1, // kích hoạt khi 50% phần tử xuất hiện trong viewport
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
            <img src={introImg1} alt="" className="w-full h-full object-cover"/>
          </div>

          
          {/* <div className="flex flex-col lg:flex-row h-full">
            left 
            <div className="w-full h-full lg:w-[65%]">
              <img src={img2} alt="" className="object-cover h-[370px] w-full" />
            </div>

            right 
            <div className="w-full h-full lg:w-[35%]">
              <img src={img3} alt="" className="object-cover h-[370px] w-full" />
            </div>
          </div> */}
        </div>
      </section>

      {/* services */}
      <section className="pb-10">

          <h3 className="h3 text-[45px] text-white text-center py-12 mb-12 bg-accent"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Rooms</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Pool</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Dining</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Events & Party</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Spa</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
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
                  <h3 className="h3 text-[30px]">Fitness</h3> {/* Thay đổi kích thước chữ ở đây */}
                  <p className="px-5 text-gray-500 text-[18px]"> {/* Thay đổi kích thước chữ ở đây */}
                    Maintain your healthy lifestyle at our state-of-the-art fitness center, fully equipped with modern machines and facilities to keep you active during your stay.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
