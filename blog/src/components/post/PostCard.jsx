import React from 'react';
import IconStrip from '../IconStrip';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ username, profilePicture, postTitle, postContent, postImage, likeCount, commentCount, isFullPost,postId }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/post?postId=${encodeURIComponent(postId)}`);

  };

  return (
    <div className='rounded-lg shadow-md border border-gray-100 bg-white mx-4 md:mx-8 p-4'>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Content Section */}
        <div className="flex flex-col flex-1 " onClick={handleReadMore}>
          {/* User Info */}
          {(profilePicture || username) && (
            <div className="flex items-center gap-2 mb-2">
              <img
                src={profilePicture || "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
                alt={username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800">{username}</span>
            </div>
          )}
          <div className='flex flex-col justify-center md:text-start text-center' onClick={handleReadMore}>
            <h2 className="text-lg font-medium text-gray-900">{postTitle}</h2>
            <p className="text-sm text-gray-600">
              {isFullPost ? postContent : postContent.slice(0, 100) }

              {!isFullPost && postContent.length>100 && (
                <button className="text-sm text-gray-600" onClick={handleReadMore}>
                  ...read More
                </button>
              )}
            </p>  
          </div>
        </div>

        {postImage && (
          <div className="flex justify-center m-2">
            <img
              src={postImage}
              alt="Post"
              className="w-full max-w-60 sm:max-w-96 md:w-48 max-h-60 md:max-h-40 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      <IconStrip likes={likeCount} comments={commentCount} />
    </div>
  );
};

export default PostCard;
