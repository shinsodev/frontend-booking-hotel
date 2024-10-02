// import React from 'react'
import Rooms from "../../components/Rooms/Rooms";
import BookForm from "../../components/BookForm/BookForm";
import HeroSlider from "../../components/HeroSlider/HeroSlider";

import img1 from "../../assets/img/HomePage/1.webp";
import img2 from "../../assets/img/HomePage/2.webp";
import img3 from "../../assets/img/HomePage/3.webp";

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

                <p className="text-[#444]">
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

      <section className="py-10 bg-accent/90">
        <div className="container mx-auto lg:px-0 flex justify-center">
          <h3 className="h3 text-[30px] mb-4 text-white">
            Get in the mood with our gallery
          </h3>
          
          <div className=""></div>

        
        </div>
        
      </section>
    </>
  );
};

export default Home;
