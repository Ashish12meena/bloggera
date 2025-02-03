import React, { useEffect, useState } from 'react';
import { getCommentDetailsById } from '../../services/CommentService';
import moment from 'moment'; // Import moment.js

const CommentCard = ({ commentId }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [commentDetails, setCommentDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCommentDetailsById({ commentId }); // Fetch data from the API
                setCommentDetails(data); // Update state with the fetched data
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching card details:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [commentId]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to calculate time difference in hours, days, or months
    const getTimeDifference = (dateString) => {
        const now = moment();
        const commentTime = moment(dateString);
        const diffInHours = now.diff(commentTime, 'hours');

        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        }

        const diffInDays = now.diff(commentTime, 'days');
        if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }

        const diffInMonths = now.diff(commentTime, 'months');
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    };

    return (
        <>
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={commentDetails.profilePicture || "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
                                alt="Michael Gough"
                            />
                            {commentDetails.username}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time pubdate="pubdate" dateTime={commentDetails.localDateTime}>
                                {/* Display the custom time difference */}
                                {commentDetails.localDateTime ? getTimeDifference(commentDetails.localDateTime) : 'Loading...'}
                            </time>
                        </p>
                    </div>
                    {/* Dropdown container */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                            >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-36 bg-white rounded-md shadow-lg divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Remove
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Report
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                    {commentDetails.message}
                </p>
            </article>
        </>
    );
}

export default CommentCard;
