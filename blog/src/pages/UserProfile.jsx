import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserByEmail } from "../services/userService";
import PostCard from "../components/post/PostCard";
import profileEmptyLogo from "../assets/images/No-Avtar.png";
import ProfileSkeleton from "../components/Skeleton/ProfileSkeleton";

const Profile = () => {
  const { email } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [activeTab,setActiveTab] = useState("posts");

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return <ProfileSkeleton />;
  }
  
  

  return (
    <main className="bg-opacity-25 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mb-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center py-4 md:py-8 text-center sm:text-left">
          <div className="w-32 h-32 sm:w-40 sm:h-40">
            <img
              className="w-full h-full object-cover rounded-full border-2 border-pink-600 p-1"
              src={user.profilePicture === "" ? profileEmptyLogo : user.profilePicture}
              alt="Profile"
            />
          </div>

          {/* Profile Meta */}
          <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
            <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-2 mb-4">
              <h2 className="text-2xl sm:text-3xl font-light">{user.username}</h2>
              <span className="text-blue-500 text-xl relative">
                <i className="fas fa-check-circle"></i>
              </span>
              <button className="bg-blue-500 px-4 py-2 text-white font-semibold text-sm rounded mt-2 sm:mt-0">
                Follow
              </button>
            </div>

            {/* Stats Section */}
            <ul className="flex justify-center sm:justify-start space-x-6 text-sm text-gray-600">
              <li><span className="font-semibold">136</span> posts</li>
              <li><span className="font-semibold">40.5k</span> followers</li>
              <li><span className="font-semibold">302</span> following</li>
            </ul>

            {/* Bio Section */}
            <p className="mt-2 text-gray-700 text-sm sm:text-base">{user.bio}</p>
          </div>
        </header>

        {/* Post Navigation */}
        <div className="border-t mt-4">
          <ul className="flex justify-center space-x-6 text-xs sm:text-sm font-semibold text-gray-600 py-3">
            <li>
              <a  className={`pb-1 cursor-pointer ${activeTab === "posts" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
              onClick={() => setActiveTab("posts")}>Posts</a>
            </li>
            <li>
              <a className={`pb-1 cursor-pointer ${activeTab === "saved" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
              onClick={() => setActiveTab("saved")}>Saved</a>
            </li>
            <li>
              <a className={`pb-1 cursor-pointer ${activeTab === "tagged" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
              onClick={() => setActiveTab("tagged")}>Tagged</a>
            </li>
          </ul>
        </div>

        {/* Posts Section */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
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
              <div className="text-center col-span-full">No Post Available</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
