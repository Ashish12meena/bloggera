import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaCommentDots, FaRegBookmark, FaEllipsisH, FaThumbsUp, FaHeart } from 'react-icons/fa';
import { addLike, checkIfLiked, LikeCommentCount, removeLike } from '../services/likeService';
import { useSelector } from 'react-redux';



const IconStrip = ({saves, postId }) => {
  const [liked, setLiked] = useState(false)
  const [likeCounts, setLikeCounts] = useState(0);
  const [commentCounts,setCommentCounts] = useState(0);
  const {userId} = useSelector((state) => state.user);
  
  

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const isLiked = await checkIfLiked(userId,postId);
        
        
        setLiked(isLiked.data);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };
    const fetchCountStatus = async () => {
      try {
        const countDetail = await LikeCommentCount(postId);
        
        setLikeCounts(countDetail.data.likeCount);
        setCommentCounts(countDetail.data.commentCount);
        
      } catch (error) {
        // console.error('Error checking like status:', error);
      }
    };
    fetchCountStatus();
    fetchLikeStatus();
  }, [postId, userId])

  const handleLike = async () => {
    try {
      if (liked) {
        // Remove the like from the database
        await removeLike(userId,postId);
        setLikeCounts(likeCounts - 1);
      } else {
        // Add the like to the database
        await addLike(userId,postId);
        setLikeCounts(likeCounts + 1);
      }
      setLiked(!liked);  // Toggle the liked state
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 px-4 py-2">
      {/* Left section (Like and Comment icons) */}
      <div className="flex items-center space-x-6">
        {/* Like Icon */}
        <button onClick={handleLike} className="flex items-center space-x-2">
          <FaHeart
            className="transition duration-200 cursor-pointer text-xl  hover:text-red-500"
            color={liked ? "red" : "gray"}  // Heart turns red when liked
          />
          <span className={`text-sm `}> {likeCounts}</span>
        </button>

        {/* Comment Icon */}
        <div className="flex items-center space-x-2">
          <FaCommentDots className="text-xl cursor-pointer hover:text-blue-500" />


          <span className="text-sm">{commentCounts}</span>
        </div>
      </div>

      {/* Right section (Save and More icons) */}
      <div className="flex items-center space-x-6">
        {/* Save Icon */}
        <div className="flex items-center space-x-2">
          <FaRegBookmark className="text-xl cursor-pointer hover:text-yellow-500" />
          <span className="text-sm">{saves}</span>
        </div>

        {/* More (three dots) Icon */}
        <div className="flex items-center">
          <FaEllipsisH className="text-xl cursor-pointer hover:text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default IconStrip;
