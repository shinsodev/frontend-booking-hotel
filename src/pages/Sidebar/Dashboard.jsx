import React from "react";
// import { h1 } from "../../router";
import { CiMedal } from "react-icons/ci";
import { GiBarbedStar } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import imgDashboard from "../../assets/img/Rooms/room12.jpg";

const Dashboard = () => {
  const role = "admin";
  return (
    //     <>
    //       <section>
    //         <div className="shadow-s1 p-8 rounded-lg  mb-12">
    //           <h1 className=" font-normal">
    //             My Activity
    //           </h1>
    //           <hr className="my-5" />

    //           <div className="grid grid-cols-3 gap-8 mt-8">
    //             <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
    //               <BsCashCoin size={80} className="text-green" />
    //               <div>
    //                 <h1>500 </h1>
    //                 <h1>Balance</h1>
    //               </div>
    //             </div>
    //             <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
    //               <CiMedal size={80} className="text-green" />
    //               <div>
    //                 <h1>2</h1>
    //                 <h1>Items Won</h1>
    //               </div>
    //             </div>
    //             <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
    //               <GiBarbedStar size={80} className="text-green" />
    //               <div>
    //                 <h1>100</h1>
    //                 <h1>Your Products </h1>
    //               </div>
    //             </div>
    //             {role === "admin" && (
    //               <>
    //                 <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
    //                   <MdOutlineCategory size={80} className="text-green" />
    //                   <div>
    //                     <h1>50</h1>
    //                     <h1>All Products </h1>
    //                   </div>
    //                 </div>
    //                 <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl">
    //                   <HiOutlineUsers size={80} className="text-green" />
    //                   <div>
    //                     <h1>100</h1>
    //                     <h1>All Users </h1>
    //                   </div>
    //                 </div>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </section>
    //     </>
    //   );
    // };

    // export const UserProduct = () => {
    //   return (
    //     <>
    //       <div className="shadow-s1 p-8 rounded-lg">
    //         <h1 className=" font-normal">
    //           Purchasing
    //         </h1>
    //         <hr className="my-5" />
    //         <div className="relative overflow-x-auto rounded-lg">
    //           <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    //             <thead className="text-xs text-gray-700 uppercase bg-gray-100">
    //               <tr>
    //                 <th scope="col" className="px-6 py-5">
    //                   h1
    //                 </th>
    //                 <th scope="col" className="px-6 py-3">
    //                   Bidding ID
    //                 </th>
    //                 <th scope="col" className="px-6 py-3">
    //                   Bid Amount(USD)
    //                 </th>
    //                 <th scope="col" className="px-6 py-3">
    //                   Image
    //                 </th>
    //                 <th scope="col" className="px-6 py-3">
    //                   Status
    //                 </th>
    //                 <th scope="col" className="px-6 py-3">
    //                   Action
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr className="bg-white border-b hover:bg-gray-50">
    //                 <td className="px-6 py-4">Auction h1 01</td>
    //                 <td className="px-6 py-4">Bidding_HvO253gT</td>
    //                 <td className="px-6 py-4">1222.8955</td>
    //                 <td className="px-6 py-4">
    //                   <img className="w-10 h-10" src="https://bidout-react.vercel.app/images/bg/order1.png" alt="Jeseimage" />
    //                 </td>
    //                 <td className="px-6 py-4">
    //                   <div className="flex items-center">
    //                     <div className="h-2.5 w-2.5 rounded-full bg-green me-2"></div> Success
    //                   </div>
    //                 </td>
    //                 <td className="px-6 py-4 text-center">
    //                   <NavLink to="#" type="button" className="font-medium text-green">
    //                     <MdDashboard size={25} />
    //                   </NavLink>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </>

    <>
      <section className="bg-slate-400">
        <div className="h-screen overflow-hidden relative">
          <img
            src={imgDashboard}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 w-full h-full bg-black/40"></div>{" "}
          {/* Add position and size */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white h2 text-[100px]">Welcome</div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
