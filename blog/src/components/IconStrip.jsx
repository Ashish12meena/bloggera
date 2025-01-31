import React from 'react';
import { FaRegHeart, FaCommentDots, FaRegBookmark, FaEllipsisH } from 'react-icons/fa';

const IconStrip = ({ likes, comments, saves }) => {
    console.log(likes, "Likes are here");
    
  return (
    <div className="flex justify-between items-center mt-4 px-4 py-2">
      {/* Left section (Like and Comment icons) */}
      <div className="flex items-center space-x-6">
        {/* Like Icon */}
        <div className="flex items-center space-x-2">
          <FaRegHeart className="text-xl cursor-pointer hover:text-red-500" />
          <span className="text-sm">{likes}</span>
        </div>

        {/* Comment Icon */}
        <div className="flex items-center space-x-2">
          <FaCommentDots className="text-xl cursor-pointer hover:text-blue-500" />
          <span className="text-sm">{comments}</span>
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
