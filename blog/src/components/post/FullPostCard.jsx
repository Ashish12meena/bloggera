import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";
import { getFullPostDetail } from "../../services/PostService";

const FullPostCard = () => {
    const [cardDetails, setCardDetails] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const postId = params.get("postId");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFullPostDetail({postId}); // Fetch data from the API
                setCardDetails(data); // Update state with the fetched data
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching card details:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (!cardDetails) return <p>No Post Found</p>;


    return (
        <>
            <div>
                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                    <div className="max-w-2xl mx-auto px-4">
                        <PostCard username={cardDetails.username} postTitle={cardDetails.postTitle} commentCount={cardDetails.commentCount} profilePicture={cardDetails.profilePicture} likeCount={cardDetails.likeCount} postImage={cardDetails.postImage} postContent={cardDetails.postContent} isFullPost={true}></PostCard>

                        <form className="mb-6 mx-4 md:mx-8">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows="6"
                                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-red-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Post comment
                            </button>
                        </form>
                         {/* Render Multiple Comments Dynamically */}
                         {cardDetails.comments && cardDetails.comments.length > 0 ? (
                            cardDetails.comments.map((commentId) => (
                                <CommentCard key={commentId} commentId={commentId} />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center">No comments yet</p>
                        )}
                    </div>
                </section>

            </div>
        </>
    );
};

export default FullPostCard;
