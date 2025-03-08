import React from "react";
import profileEmptyLogo from "../assets/images/No-Avtar.png";
import { Navigate, useNavigate } from "react-router-dom";

const NotificationCard = ({ userImage, username, postImage, type, commentText ,postId}) => {
    const navigate = useNavigate();
    const getMessage = (notificationType) => {
        switch (notificationType) {
            case 0:
                return "liked your post";
            case 1:
                return ` ${commentText ? commentText.split(" ").slice(0, 10).join(" ") : ""}`;
            case 2:
                return "started following you";
            default:
                return "";
        }
    };
    const handleClick = () => {
        navigate(`/post?postId=${encodeURIComponent(postId)}`, { state: { postId } });
    };
    return (
        <div className="flex items-center p-3 bg-white shadow-md rounded-2xl w-full max-w-sm border border-gray-200 hover:shadow-lg transition-shadow" onClick={handleClick}>
          <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center overflow-hidden mr-3" >
            <img 
              src={userImage || profileEmptyLogo} 
              alt="User" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <p className="font-bold  mr-2">{username}</p>
            <p className="text-gray-600 text-sm break-words whitespace-normal">{getMessage(type)}</p>
          </div>
          {postImage && postImage !== "" && postImage !== null && (
            <img
              src={postImage}
              alt="Post"
              className="w-20 h-20 object-cover border border-gray-300 flex-shrink-0"
            />
          )}
        </div>
      );
};

export default NotificationCard;
