import React from 'react';
import IconStrip from './IconStrip';

const   PostCard = ({ username, profilePicture, postTitle, postContent, postImage,likeCount ,commentCount}) => {
  console.log(likeCount, "Likes Counts are here");
  
  console.log(postImage, "Image is here");
  console.log("username ", username, " profilePicture ", profilePicture);


  return (
    <>
    <div className='rounded-lg shadow-md border border-gray-100 bg-white mx-4 md:mx-8'>
      <div className="flex flex-col md:flex-row gap-4 ">
        {/* Content Section */}
        <div className="flex flex-col flex-1">
          {/* User Info */}
          {(profilePicture || username) && (<div className="flex items-center gap-2 mb-2">
            <img
              src={profilePicture && profilePicture !== "" ? postImage : "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
              alt={username}
              className="w-10 h-10 rounded-full object-cover"
              style={{ margin: "3px" }}
            />
            <span className="font-semibold text-gray-800">{username}</span>
          </div>)}
          <div className='flex flex-col justify-center md:text-start text-center' style={{ margin: "3px" }}>

            <h2 className="text-lg font-medium text-gray-900 line-clamp-2">{postTitle}</h2>
            <p className="text-sm text-gray-600 line-clamp-3 mt-col justify-">{postContent}</p>
          </div>
        </div>

        {postImage && postImage !== "" && (
          <div className="flex justify-center m-2">
            <img
              src={postImage}
              alt="Post"
              className="w-full max-w-60 sm:max-w-96 md:w-48 max-h-60 md:max-h-40 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
        <div>
          <IconStrip 
            likes = {likeCount}
            comments={commentCount}
          />
        </div>
      </div>
    </>
  );
};

export default PostCard;
