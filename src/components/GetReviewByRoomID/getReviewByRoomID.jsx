import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { getReviewByRoomId } from "../../services/ReviewService"
import moment from 'moment';
import ReactPaginate from "react-paginate";
import { Link, NavLink } from "react-router-dom";


const GetReviewByRoomID = () => {
    const [reviewByRoomID, setReviewByRoomID] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { roomId } = useParams();

    useEffect(() => {
        fetchReviewByRoomID(roomId, page);
    }, [roomId, page]);

    const fetchReviewByRoomID = async (roomId, page) => {
        try {
            const result = await getReviewByRoomId(roomId, page)
            console.log(result.reviewList)
            setReviewByRoomID(result.reviewList)
            setTotalPages(result.totalPages);
        } catch (error) {
            toast.error("Error fetching review by room", error)
        }
    }

    const renderStars = (rating) => {
        const filledStars = Math.round(rating); // Làm tròn rating để lấy số sao
        const totalStars = 5; // Tổng số sao tối đa
        let stars = '';

        for (let i = 0; i < totalStars; i++) {
            stars += i < filledStars ? '★' : '☆'; // Thêm sao đổ đầy (★) hoặc sao rỗng (☆)
        }

        return stars;
    };

    const handlePageClick = (event) => {
        setPage(event.selected);
    };


    return (
        <section className="py-14">
            <div className="container mx-auto lg:px-0">
                <h3 className="h3 text-[40px] text-center py-6">Review History</h3>
                {reviewByRoomID.length > 0 ? (
                    reviewByRoomID.map((item, index) => (
                        <div className="space-y-8 py-5" key={item.id || index}>
                            <div className="bg-gray-100 bg-opacity-90 rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 rounded-full bg-gray-300">
                                            {item.user.imageUrl ? (
                                                <img
                                                    src={item.user.imageUrl}
                                                    alt={`${item.user.name}'s avatar`}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-semibold">{item.user.name}</h4>
                                            <div className="flex space-x-1">
                                                <span className="text-yellow-500">
                                                    {renderStars(item.reviewRate)} {/* Hiển thị số sao */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-gray-600">{item.comment}</p>
                                    <p className="text-gray-500 mt-2">Room Type: {item.room.roomType}</p>
                                    <p className="text-gray-400 mt-2">
                                        Created on: {moment(item.createdTime).format('MMMM Do YYYY, h:mm:ss a')} {/* Định dạng thời gian */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span>No review</span>
                )}
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

            <div className="flex justify-end mt-8 px-10">
                <Link
                    to="/admin/roomlist"
                    className="px-6 py-3 text-white bg-accent rounded-lg shadow-md hover:bg-accent-dark transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Back to Room List
                </Link>
            </div>
        </section>
    );
};


export default GetReviewByRoomID