import React, { useState, useRef, useMemo } from 'react';
import { Button, Input } from '@headlessui/react';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import { addPost } from '../../services/PostService';

const categoriesList = ["Technology", "Education", "Health", "Science", "Finance", "Sports", "Entertainment"];

const AddPost = ({ placeholder }) => {
  const { userId } = useSelector(state => state.user);
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start typing...'
  }), [placeholder]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const resetPost = () => {
    setTitle('');
    setContent('');
    setCategory([]);
    setImage(null);
  };

  const contentFieldChanged = (newContent) => {
    setContent(newContent);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    // Add category if not already selected, remove if it exists
    setCategory((prevCategories) =>
      prevCategories.includes(selectedCategory)
        ? prevCategories.filter(cat => cat !== selectedCategory)
        : [...prevCategories, selectedCategory]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("content", content);

    // Append each category separately
    category.forEach(cat => formData.append("category", cat));

    if (image) {
      formData.append("postImage", image);
    }

    try {
      const response = await addPost(formData);
      if (response.status === 200) {
        resetPost();
      }
      console.log('Post created:', response);
    } catch (error) {
      console.error('Error while adding post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={createPost}>
        <div className="my-3">
          <label htmlFor="title" className="font-semibold text-lg">Post title</label>
          <Input
            type="text"
            id="title"
            placeholder="Enter here"
            className="rounded-md border border-gray-300 w-full p-2 mt-2"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="my-3">
          <label htmlFor="content" className="font-semibold text-lg">Post Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={contentFieldChanged}
          />
        </div>

        <div className="my-3">
          <label htmlFor="category" className="font-semibold text-lg">Select Category</label>
          <select
            id="category"
            multiple
            value={category}
            onChange={handleCategoryChange}
            className="rounded-md border border-gray-300 w-full p-2 mt-2"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <p className="mt-2 text-gray-600">Selected Categories: {category.join(", ")}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="image" className="font-semibold text-lg">Select Post banner</label>
          <Input id="image" type="file" onChange={handleFileChange} className="mt-2" />
        </div>

        <div className="text-center mt-6">
          <Button type="submit" className="rounded-md py-2 px-4 bg-blue-500 text-white hover:bg-blue-600">
            Create Post
          </Button>
          <Button
            type="button"
            className="rounded-md py-2 px-4 bg-red-500 text-white hover:bg-red-600 ms-2"
            onClick={resetPost}
          >
            Reset Content
          </Button>
        </div>
      </form>

      {/* Debugging */}
      <div>{title}</div>
      <div>{content}</div>
      <div>{category.join(", ")}</div>
    </div>
  );
};

export default AddPost;
