import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsers } from '../../services/authService';

export default function Register({ open, closeModal, openLoginModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true); 
    const userData = { username, email, password, dateOfBirth };

    try {
      const response = await createUsers(userData);
      if (response.message.status === "error") {
        setError(response.message.message);
      } else {
        
        setUsername("");
        setEmail("");
        setPassword("");
        setDateOfBirth("");
        if (closeModal) closeModal(); 
        navigate("/home"); 
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const handleSignInClick = () => {
    if (openLoginModal) {
      openLoginModal(); // Open the login modal
      if (closeModal) closeModal(); // Close the register modal
    }
  };

  return (
    open && (  // This ensures the modal is only visible when 'open' is true
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 relative">  {/* Reduced padding and width */}
          {/* Close Button */}
          <button
            className="absolute top-2 text-2xl cursor-pointer right-2 text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform duration-150 ease-in-out"
            onClick={closeModal}
          >
            &times;
          </button>

          <h2 className="text-center text-xl font-bold text-gray-900">Sign Up</h2> {/* Slightly smaller text */}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4"> {/* Reduced space between form elements */}
            {/* Full Name Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">Full Name</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full mt-2 p-2 border rounded-md"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mt-2 p-2 border rounded-md"
                placeholder="Enter your email"
              />
            </div>

            {/* Date of Birth Field */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-900">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="block w-full mt-2 p-2 border rounded-md"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full mt-2 p-2 border rounded-md"
                placeholder="Enter your password"
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                {loading ? (
                  <>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Sign Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
          </form>

          {/* Login Button */}
          <div className="text-center mt-4">
            Already have an account?
            <button onClick={handleSignInClick}>
              <span className='cursor-pointer text-blue-500 hover:text-blue-700'> Log In</span>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
