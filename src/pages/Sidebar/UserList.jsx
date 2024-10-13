import { NavLink } from "react-router-dom";
// import { h2, ProfileCard } from "../router";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import User1 from "../../assets/img/user1.png";

const UserList = () => {
  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">
          User Lists
        </h2>
      </div>
      <hr className="my-5" />

      {/* list */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                S.N
              </th>
              <th scope="col" className="px-6 py-5">
                Username
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Role
              </th>
              <th scope="col" className="px-6 py-5">
                Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4 capitalize">Sunil BK</td>
              <td className="px-6 py-4">example@gmail.com</td>
              <td className="px-6 py-4 capitalize">Admin</td>
              <td className="px-6 py-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full">
                  <img src={User1} alt="" />
                </div>
              </td>
              <td className="px-6 py-4">Dec 20 2024</td>
              
              {/* <td className="py-4 px-8">
                <NavLink to="#" type="button" className="font-medium text-indigo-500">
                  <TiEyeOutline size={25} />
                </NavLink>
              </td> */}

              <td className="px-6 py-4 text-center">
                <div className="flex items-center gap-3">
                  <NavLink to="#" type="button" className="font-medium text-indigo-500">
                    <TiEyeOutline size={25} />
                  </NavLink>
                  <NavLink to={`/category/update/1000`} className="font-medium text-green-500">
                    <CiEdit size={25} />
                  </NavLink>
                  <button className="font-medium text-red-500">
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList