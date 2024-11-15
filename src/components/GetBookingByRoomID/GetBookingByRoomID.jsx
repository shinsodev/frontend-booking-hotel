import React, { useState, useEffect } from 'react'
import { adminGetBookingByRoom } from '../../services/BookingService'
import { toast } from "react-toastify";
import { Link, NavLink } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";


const GetBookingByRoomID = () => {
    const [bookingByRoom, setBookingByRoom] = useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { roomId } = useParams();

    useEffect(() => {
        GetBookingByRoom(roomId, page);
    }, [roomId, page]);

    const GetBookingByRoom = async (roomId, page) => {
        try {
            const result = await adminGetBookingByRoom(roomId, page);
            setBookingByRoom(result.bookingList)
            setTotalPages(result.totalPages);
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl">Bookings Lists</h2>
            </div>
            <hr className="my-5" />

            <div className="relative overflow-x-auto rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Check In
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Date Check Out
                            </th>
                            <th scope="col" className="px-6 py-3">
                                NumOfChild
                            </th>
                            <th scope="col" className="px-6 py-3">
                                NumOfAdults
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TotalNumOfGuest
                            </th>
                            <th scope="col" className="px-6 py-3">
                                BookingCode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Room
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingByRoom.length > 0 ? (
                            bookingByRoom.map((booking, index) => (
                                <tr
                                    key={booking.id}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{booking.checkInDate}</td>
                                    <td className="px-6 py-4">{booking.checkOutDate}</td>
                                    <td className="px-6 py-4">{booking.numOfChildren}</td>
                                    <td className="px-6 py-4">{booking.numOfAdults}</td>
                                    <td className="px-6 py-4">{booking.totalNumOfGuest}</td>
                                    <td className="px-6 py-4">{booking.bookingCode}</td>
                                    <td className="px-6 py-4">{booking.room.id}</td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <NavLink
                                                to="/admin/viewRoom"
                                                className="font-medium text-indigo-500"
                                            >
                                                <FaEye size={20} />
                                            </NavLink>
                                            <NavLink
                                                // to={`/admin/updateRoom/${room.id}`}
                                                className="font-medium text-green-500"
                                            >
                                                <FaEdit size={20} />
                                            </NavLink>
                                            <button
                                                className="font-medium text-red-500"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    {"No rooms available"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="NEXT →"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="← PREVIOUS"
                className="flex space-x-2 items-center justify-center my-8"
                pageClassName="page-item"
                pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
                activeLinkClassName="active bg-black text-white" // Active page style
                previousClassName="page-item"
                previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
                nextClassName="page-item"
                nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                disabledLinkClassName="text-gray-400 cursor-not-allowed"
                containerClassName="pagination"
            />

            <div className="flex justify-between items-center">
                <Link
                    to="/admin/roomlist"
                    className="text-accent hover:underline transition-all"
                >
                    Back to room list
                </Link>
            </div>
        </section>
    )
}

export default GetBookingByRoomID