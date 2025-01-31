import { useState } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi"; // Close icon for mobile menu
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openRegisterModal = () => setIsRegisterOpen(true);
    const closeRegisterModal = () => setIsRegisterOpen(false);

    const openLoginModal = () => setIsLoginOpen(true);
    const closeLoginModal = () => setIsLoginOpen(false);

    const toggleDropdown = (menu) => {
        setDropdownOpen(dropdownOpen === menu ? null : menu);
    };

    return (
        <div className="font-sans">
            {/* Header */}
            <header className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 md:p-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="text-2xl md:text-3xl font-bold">Bloggera</div>
                    <nav className="hidden md:flex space-x-6">
                        {(["Product", "Company", "Connect"].map((menu, index) => (
                            <div key={index} className="relative">
                                <button
                                    className="flex items-center space-x-1 hover:text-gray-200"
                                    onClick={() => toggleDropdown(menu)}
                                >
                                    <span>{menu}</span>
                                    <FiChevronDown className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen === menu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute bg-white text-gray-900 mt-2 p-4 rounded-lg shadow-lg w-40"
                                        >
                                            <ul className="space-y-2">
                                                {["Option 1", "Option 2", "Option 3"].map((link, i) => (
                                                    <li key={i}><a href="#" className="hover:text-red-500">{link}</a></li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )))}
                    </nav>
                    <div className="hidden md:flex space-x-4">
                        <button onClick={() => setIsLoginOpen(true)} className="text-white px-4 py-2 rounded-full">
                            Login
                        </button>
                        <button onClick={() => setIsRegisterOpen(true)} className="bg-white text-red-500 px-4 py-2 rounded-full">
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Modals */}
            <AnimatePresence>
                {isRegisterOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <Register open={isRegisterOpen} closeModal={closeRegisterModal} openLoginModal={openLoginModal} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isLoginOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <Login open={isLoginOpen} closeModal={closeLoginModal} />
                    </motion.div>
                )}
            </AnimatePresence>
            <section className="text-center py-20 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-bl-4xl">
                <h1 className="text-4xl md:text-6xl font-bold">A modern publishing platform</h1>
                <p className="mt-4 text-lg">Grow your audience and build your online brand</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={openRegisterModal}
                        className="bg-white cursor-pointer  text-red-500 text-lg px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
                    >
                        Get Started
                    </button>
                    <a href="#" className="border border-white px-6 py-3 rounded-full">Learn More</a>
                </div>
            </section>
            <section className="flex max-w-6xl mx-auto py-20 px-6 flex-col md:grid-cols-2 gap-10 items-center">
                <h2 className="text-3xl text-center font-bold">Designed for the future</h2>
                <div className="flex flex-row">
                    <div className="m-10">
                        <h3 className="mt-6 text-xl font-semibold">Introducing an extensible editor</h3>
                        <p className="mt-2 text-gray-600">Blogr features an intuitive interface focused on content creation...</p>
                    </div>
                    <div className="m-10">
                        <h3 className="mt-6 text-xl font-semibold">Robust content management</h3>
                        <p className="mt-2 text-gray-600">Move through posts effortlessly with flexible content management...</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10 px-6 rounded-tr-4xl">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
                    <div>
                        <div className="text-3xl">Bloggera</div>
                    </div>
                    {["Product", "Company", "Connect"].map((category, index) => (
                        <div key={index}>
                            <h6 className="text-lg font-semibold">{category}</h6>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-red-500">Link 1</a></li>
                                <li><a href="#" className="hover:text-red-500">Link 2</a></li>
                                <li><a href="#" className="hover:text-red-500">Link 3</a></li>
                            </ul>
                        </div>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
