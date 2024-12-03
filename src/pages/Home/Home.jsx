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
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import introImg from "../../assets/img/Rooms/room6.jpg";
import introImg1 from "../../assets/img/Rooms/room2.jpg";
import { getLatestPromotions } from "../../services/PromotionService";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
const ScrollAnimation = ({ children, direction }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    // Kiểm tra kích thước màn hình và cập nhật isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Kiểm tra lần đầu khi render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    // Nếu là thiết bị di động, không áp dụng hiệu ứng, chỉ hiển thị nội dung
    return <div>{children}</div>;
  }

  // Nếu không phải là thiết bị di động, áp dụng hiệu ứng cuộn
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const result = await getLatestPromotions(page);

        setPromotions(result.data.promotionList);
        setTotalPages(result.data.totalPages); // Giả sử API trả về totalPages
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

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

              <Link
                to="/rooms"
                className="btn btn-lg btn-primary mx-auto mb-8 w-48"
              >
                See our rooms
              </Link>
            </div>

            {/* right  */}
            <div className="w-full h-full lg:w-[35%]">
              <img
                src={introImg}
                alt=""
                className="object-cover h-[370px] w-full"
              />
            </div>
          </div>

          {/* intro continue */}
          <div className="h-[700px] overflow-hidden mt-12 shadow-lg">
            <img
              src={introImg1}
              alt=""
              className="w-full h-full object-cover"
            />
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
                      <img
                        src={img9}
                        alt="Rooms"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Rooms</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Aurora Grand’s rooms offer comfort and luxury, featuring
                        elegant designs, premium amenities, and breathtaking
                        views for a perfect stay.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Pool service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={pool}
                        alt="Pool"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Pool</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Our expansive, crystal-clear pool is the ideal place to
                        unwind, have fun, and enjoy relaxing moments under the
                        sun.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Dining service */}
                <ScrollAnimation direction="left">
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={food}
                        alt="Dining"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Dining</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Enjoy exquisite dining at Aurora Grand with a diverse
                        menu that blends local flavors and international
                        cuisine, served in an elegant setting.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Events and party service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={party}
                        alt="Events & party"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Events & Party</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Aurora Grand is the perfect venue for hosting events and
                        parties. With flexible spaces and a professional team,
                        every event is crafted to be truly special.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Spa service */}
                <ScrollAnimation direction="left">
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={spa}
                        alt="Spa"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Spa</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Indulge in ultimate relaxation at Aurora Grand’s spa,
                        offering rejuvenating treatments and therapies designed
                        to revitalize your body and mind in a tranquil
                        atmosphere.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Fitness service */}
                <ScrollAnimation direction="right">
                  <div className="flex flex-col lg:flex-row-reverse items-center lg:space-x-10 lg:space-x-reverse">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={fitness}
                        alt="Fitness"
                        className="w-[90%] mb-4 lg:mb-0 h-72 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <h3 className="h3 text-[30px]">Fitness Center</h3>
                      <p className="px-5 text-gray-500 text-[18px]">
                        Stay fit and healthy in our well-equipped fitness
                        center, offering a variety of machines and workout
                        spaces to cater to your fitness routine.
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
      <section className="bg-gradient-to-r from-slate-400 to-slate-500 py-14">
        <div className="container mx-auto lg:px-0">
          <h3 className="h3 text-[45px] text-white text-center py-12">
            Promotions
          </h3>
          {/* Promotion List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-8">
            {promotions.length > 0 ? (
              promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="rounded-lg p-0 shadow-2xl bg-white flex flex-col"
                >
                  {/* Promotion Image - Chiếm nửa phần trên */}
                  <div className="w-full h-52">
                    <img
                      src={promotion.promotionPhotoUrl}
                      alt={promotion.description}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>

                  {/* Promotion Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-4xl font-semibold font-primary mb-4">
                      {promotion.promotionTitle} -{" "}
                      <span className="text-red-700">
                        {promotion.percentOfDiscount}%
                      </span>
                    </h3>
                    <p className="text-gray-600">{promotion.description}</p>
                    <p className="text-sm">
                      Room Types:{" "}
                      <span className="font-medium">
                        {promotion.listRoomTypes.join(", ")}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Time: {promotion.startDate} to {promotion.endDate}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex justify-end space-x-4 mb-4 px-8">
                    <Link
                      to={`/admin/promotion/update/${promotion.id}`}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                      onClick={() => handleDelete(promotion.id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div> */}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No promotions available.
              </p>
            )}
          </div>
        </div>
        {/* Pagination */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="NEXT →"
          onPageChange={handlePageClick}
          forcePage={page}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="← PREVIOUS"
          className="flex space-x-2 items-center justify-center my-8"
          pageClassName="page-item text-white"
          pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
          activeLinkClassName="active bg-white text-black"
          previousClassName="page-item text-white"
          previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
          nextClassName="page-item text-white"
          nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          disabledLinkClassName="text-gray-400 cursor-not-allowed"
          containerClassName="pagination"
        />
      </section>

      {/* Ratings Section */}
      {/* <section className="py-14">
        <div className="container mx-auto lg:px-0">
          <h3 className="h3 text-[45px] text-center mb-12">
            What Our Guests Say
          </h3>
          <div className="flex flex-col space-y-8">
            Sample Review 1
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img
                src={User1}
                alt="User 1"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">John Doe</h4>
                <div className="flex space-x-1">
                  <Rating rating={5} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" />
                  An unforgettable stay! The service was exceptional, and the
                  facilities were top-notch.
                </p>
              </div>
            </div>

            Sample Review 2
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img
                src={User1}
                alt="User 2"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">Jane Smith</h4>
                <div className="flex space-x-1">
                  <Rating rating={4} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" />
                  Great experience! The room was clean and cozy, but I wish the
                  pool was open longer.
                </p>
              </div>
            </div>

            Sample Review 3
            <div className="flex items-start bg-white rounded-lg shadow-md p-6">
              <img
                src={User1}
                alt="User 3"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">Michael Lee</h4>
                <div className="flex space-x-1">
                  <Rating rating={5} />
                </div>
                <p className="text-gray-600 mt-2">
                  <RiDoubleQuotesR className="inline-block text-gray-400" />I
                  had a wonderful time! Highly recommend the spa and dining
                  options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
