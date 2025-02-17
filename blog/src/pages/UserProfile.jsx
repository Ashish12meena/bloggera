import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserByEmail } from "../services/userService";
import PostCard from "../components/post/PostCard";
import profileEmptyLogo from "../assets/images/No-Avtar.png";

const Profile = () => {
  const { email } = useSelector((state) => state.user);
  const [user, setUser] = useState(null); 
  const [posts, setPosts] = useState(null); 
  

  useEffect(() => {
    if (email) {
      getUserByEmail(email)
        .then((response) => {
          setUser(response.user);
          setPosts(response.posts);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [email]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" bg-opacity-25 py-6 " >
      <div className="lg:w-10/12 mx-auto mb-8 ">
        {/* Header Section */}
        <header className="flex flex-wrap items-center py-4 md:py-8">
          <div className="md:w-3/12">
            <img
              className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src={user.profilePicture === "" ? profileEmptyLogo : user.profilePicture}
              alt="Profile"
            />
          </div>

          {/* Profile Meta */}
          <div className="md:w-9/12 ml-4">
            <div className="flex flex-wrap items-center mb-4">
              <h2 className="text-3xl font-light md:mr-2 mb-2 sm:mb-0">{user.username}</h2>
              <span
                className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                aria-hidden="true"
              >
                <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
              </span>
              <a
                href="#"
                className="bg-blue-500 px-4 py-2 text-white font-semibold text-sm rounded block sm:inline-block"
              >
                Follow
              </a>
            </div>

            {/* Stats Section */}
            <ul className="hidden md:flex space-x-8 mb-4 text-sm text-gray-600">
              <li><span className="font-semibold">136</span> posts</li>
              <li><span className="font-semibold">40.5k</span> followers</li>
              <li><span className="font-semibold">302</span> following</li>
            </ul>

            {/* Bio Section */}
            <div className="hidden md:block">
              <h1 className="font-semibold text-gray-700">{user.bio}</h1>
            </div>
          </div>
        </header>

        {/* Post Navigation */}
        <div className="px-px md:px-3">
          <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
            <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
              <a className="inline-block p-3" href="#">
                <i className="fas fa-th-large text-xl md:text-xs"></i>
                <span className="hidden md:inline">Posts</span>
              </a>
            </li>
            <li>
              <a className="inline-block p-3" href="#">
                <i className="far fa-square text-xl md:text-xs"></i>
                <span className="hidden md:inline">IGTV</span>
              </a>
            </li>
            <li>
              <a className="inline-block p-3" href="#">
                <i className="fas fa-user border border-gray-500 px-1 pt-1 rounded text-xl md:text-xs"></i>
                <span className="hidden md:inline">Tagged</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Posts Section */}
        <div className=" p-6">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostCard
                    key={index}
                    postTitle={post.postTitle}
                    postContent={post.postContent}
                    postImage={post.postImage}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    postId={post.postId}
                    likeStatus={post.likeStatus}
                  />
                ))
              ) : (
                <div>No Post Available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
