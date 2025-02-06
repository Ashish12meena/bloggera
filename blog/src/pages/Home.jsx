import React, { useEffect, useState } from 'react';
import PostCard from '../components/post/PostCard';
import { getCardDetails } from '../services/PostService';
import { useSelector } from 'react-redux';

const Home = () => {
  const [cardDetails,setCardDetails]=useState([])
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const data = await getCardDetails(); // Fetch data from the API
        setCardDetails(data); // Update state with the fetched data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching card details:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-6" style={{margin:"10px"}}>
      {cardDetails.map((post, index) => (
        <div key={index} >
          <PostCard
            postId={post.postId}
            username={post.username}
            profilePicture={post.profilePicture}
            postTitle={post.postTitle}
            postContent={post.postContent}
            postImage={post.postImage}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </div>
      ))} 
    </div>
  );
};

export default Home;
