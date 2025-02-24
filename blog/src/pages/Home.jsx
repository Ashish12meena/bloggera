import React, { useEffect, useState } from "react";
import PostCard from "../components/post/PostCard";
import { getCardDetails } from "../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, appendPosts } from "../redux/postSlice";
import { saveScrollPosition } from "../redux/scrollSlice";
import HomePageSkeleton from "../components/Skeleton/HomePageSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const { userId } = useSelector((state) => state.user);
  const scrollPosition = useSelector((state) => state.scroll.position);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("foryou");

  // ✅ Restore Scroll Position on Mount
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
        console.log("Restored Scroll Position:", scrollPosition);
      });
    }
  }, [loading]);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        console.log("Scroll position:", window.scrollY);
        dispatch(saveScrollPosition(window.scrollY));
      });
    };
  
 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (posts.length === 0) {
          const data = await getCardDetails({ userId, excludedIds: [] });
          dispatch(setPosts(data));
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, dispatch]);

  // ✅ Load More Posts
  const loadMorePosts = async () => {
    try {
      const postIds = posts.map((post) => post.postId);
      const newPosts = await getCardDetails({ userId, excludedIds: postIds });

      if (newPosts.length > 0) {
        dispatch(appendPosts(newPosts));
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  if (loading) return <HomePageSkeleton />;

  return (
    <>
      <div >
        <ul className="flex justify-center space-x-6 text-xs sm:text-xl font-semibold text-gray-600 py-3">
          <button
            className={`cursor-pointer ${activeTab === "foryou" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
            onClick={() => setActiveTab("foryou")}
          >
            For You
          </button>
          <button
            className={`cursor-pointer ${activeTab === "following" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
          <button
            className={`cursor-pointer ${activeTab === "category" ? "border-b-2 border-gray-700 text-gray-700" : ""}`}
            onClick={() => setActiveTab("category")}
          >
            Category
          </button>
        </ul>
      </div>

      <div className="p-8 flex flex-col gap-6" style={{ margin: "10px" }} onClick={handleScroll}>
        {posts.map((post, index) => (
          <PostCard
            key={index}
            postId={post.postId}
            username={post.username}
            profilePicture={post.profilePicture}
            postTitle={post.postTitle}
            postContent={post.postContent}
            postImage={post.postImage}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            likeStatus={post.likeStatus}
          />
        ))}
        <button
          onClick={loadMorePosts}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Load More...
        </button>
      </div>
    </>
  );
};

export default Home;
