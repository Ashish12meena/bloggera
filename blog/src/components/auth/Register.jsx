import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsers } from '../../services/authService';

export default function Register({ open, closeModal, openLoginModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Define loading state here

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setError("");
    setLoading(true); // Set loading to true when form is submitted
    const userData = { username, email, password, dateOfBirth };

    try {
      const response = await createUsers(userData);
      if (response.message.status === "error") {
        setError(response.message.message);
      } else {
        // Reset fields on successful registration
        setUsername("");
        setEmail("");
        setPassword("");
        setDateOfBirth("");
        if (closeModal) closeModal(); // Close the modal
        navigate("/home"); // Redirect to home
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-indigo-600 text-white cursor-pointer rounded-md relative overflow-hidden"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-center text-red-500">{error}</p>}
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
