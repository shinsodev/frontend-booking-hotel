// import React from 'react'
import Rooms from "../../components/Rooms/Rooms";
import BookForm from "../../components/BookForm/BookForm";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

import img1 from "../../assets/img/HomePage/1.webp";
import img2 from "../../assets/img/HomePage/2.webp";
import img3 from "../../assets/img/HomePage/3.webp";
import food from "../../assets/img/HomePage/food.jpg";
import spa from "../../assets/img/HomePage/spa.jpg";
import party from "../../assets/img/HomePage/party.jpg";
import pool from "../../assets/img/HomePage/pool.jpg";
import fitness from "../../assets/img/HomePage/fitness.jpg";
import img9  from "../../assets/img/HomePage/9.webp"
import Sidebar from "../../components/Sidebar/Sidebar";
import Rating from "../../components/Rating/Rating"
import { RiDoubleQuotesR } from "react-icons/ri";
import User1 from "../../assets/img/user1.png"

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
              <img src={img1} alt="" className="object-cover h-[370px] w-full" />
            </div>
          </div>

          {/* intro continue */}
          <div className="flex flex-col lg:flex-row h-[full]">
            {/* left  */}
            <div className="w-full h-full lg:w-[65%]">
              <img src={img2} alt="" className="object-cover h-[370px] w-full" />
            </div>

            {/* right  */}
            <div className="w-full h-full lg:w-[35%]">
              <img src={img3} alt="" className="object-cover h-[370px] w-full" />
            </div>
          </div>
        </div>
      </section>

        {/* services */}
      <section className="py-10 bg-accent/90">
        <h3 className="h3 text-[40px] text-white text-center pb-12 pt-2">
          Our services
        </h3>

        <div className="container mx-auto lg:px-0">
          <div className="grid lg:grid-cols-3 gap-5 text-center">
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={img9} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Rooms</h3>
                <p className="px-5 text-gray-500">Aurora Grand’s rooms offer comfort and luxury, featuring elegant designs, premium amenities, and breathtaking views for a perfect stay.</p>
              </div>
            </div>

            
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={pool} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Pool</h3>
                <p className="px-5 text-gray-500">Our expansive, crystal-clear pool is the ideal place to unwind, have fun, and enjoy relaxing moments under the sun.</p>
              </div>
            </div>
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={food} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Dining</h3>
                <p className="px-5 text-gray-500">Enjoy exquisite dining at Aurora Grand with a diverse menu that blends local flavors and international cuisine, served in an elegant setting.</p>
              </div>
            </div>
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={party} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Events & party</h3>
                <p className="px-5 text-gray-500">Aurora Grand is the perfect venue for hosting events and parties. With flexible spaces and a professional team, every event is crafted to be truly special.</p>
              </div>
            </div>
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={spa} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Spa</h3>
                <p className="px-5 text-gray-500">Indulge in ultimate relaxation at Aurora Grand’s spa, offering rejuvenating treatments and therapies designed to revitalize your body and mind in a tranquil atmosphere.</p>
              </div>
            </div>
            <div className="bg-white min-h-[420px] rounded-2xl shadow-2xl group">
              <div className="overflow-hidden flex items-center justify-center py-8">
                <img src={fitness} alt="" className="w-[80%] h-48 object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300"/>
              </div>
              <div className="text-center">
                <h3 className="h3">Fitness</h3>
                <p className="px-5 text-gray-500">Maintain your healthy lifestyle at our state-of-the-art fitness center, fully equipped with modern machines and facilities to keep you active during your stay.</p>
              </div>
            </div>


          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <h3 className="h3 text-[40px] text-center pb-12 pt-2">
          Sale off
        </h3>
      </section>
      
      <section className="py-10 bg-accent/90">
        <h3 className="h3 text-[40px] text-white text-center pb-12 pt-2">
          Rating
        </h3>

        <div className="container mx-auto lg:px-0">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-2xl">
              <div className="flex flex-row items-center">
                <div><img src={User1} alt="" className="w-10 h-10"/></div>
                <div className="pl-2">
                  <div className="text-[20px] font-medium font-primary">Jeanne</div>
                  <Rating/>
                </div>
              </div>
              <p className="text-gray-500 pt-4">trai nghiem tuyet voi</p>

            </div>






            {/* test  */}
            <div className="bg-white rounded-xl p-4 shadow-2xl">
              <div className="flex flex-row items-center">
                <div><img src={User1} alt="" className="w-10 h-10"/></div>
                <div className="pl-2">
                  <div className="text-[20px] font-medium font-primary">Jeanne</div>
                  <Rating/>
                </div>
              </div>
              <p className="text-gray-500 pt-4">trai nghiem tuyet voi</p>

            </div><div className="bg-white rounded-xl p-4 shadow-2xl">
              <div className="flex flex-row items-center">
                <div><img src={User1} alt="" className="w-10 h-10"/></div>
                <div className="pl-2">
                  <div className="text-[20px] font-medium font-primary">Jeanne</div>
                  <Rating/>
                </div>
              </div>
              <p className="text-gray-500 pt-4">trai nghiem tuyet voi</p>

            </div><div className="bg-white rounded-xl p-4 shadow-2xl">
              <div className="flex flex-row items-center">
                <div><img src={User1} alt="" className="w-10 h-10"/></div>
                <div className="pl-2">
                  <div className="text-[20px] font-medium font-primary">Jeanne</div>
                  <Rating/>
                </div>
              </div>
              <p className="text-gray-500 pt-4">trai nghiem tuyet voi</p>

            </div>


          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <h3 className="h3 text-[40px] text-center pb-12 pt-2">
          Location
        </h3>
      </section>
    </>
  );
};

export default Home;
