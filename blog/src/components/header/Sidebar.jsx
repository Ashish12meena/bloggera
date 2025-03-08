import React, { useEffect, useState } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";
import logo from "../../assets/images/Bloggera.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profileEmptyLogo from "../../assets/images/No-Avtar.png";
import { clearUser } from '../../redux/userSlice';
import { IoAdd, IoLogOut } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { GoPerson } from "react-icons/go";
import SidebarSkleton from '../Skeleton/SidebarSkleton';
import { setNotification } from '../../redux/notificationSlice';
import { getNotification, markReadNotification } from '../../services/notificationService';




export default function Layout() {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.user);
    const { notificationCount } = useSelector((state) => state.notification);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { email, profilePicture, username } = useSelector((state) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false); // Manage pop-up visibility
    const [activeIcon, setActiveIcon] = useState(null)

    useEffect(() => {
        if (!userId) return;
        const fetchNotifications = async () => {
            try {
                const response = await getNotification(userId) || []; // Fetch notifications
                dispatch(setNotification({
                    notificationCount: response.data.length,
                    notificationData: response.data
                }));
                if (response.data.length > 0) {
                    await markReadNotification(userId); // Mark notifications as read
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    const menuItems = [
        { icons: <IoHomeOutline size={30} />, label: 'Home', path: '/' },
        { icons: <IoSearchOutline size={30} />, label: 'Explore', path: '/explore' },
        {
            icons: (
                <div className="relative">
                    <IoIosNotificationsOutline size={30} className="stroke-3 drop-shadow-md" />
                    {notificationCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {notificationCount}
                        </span>
                    )}
                </div>
            ),
            label: 'Notification',
            path: '/notification'
        },
        // { icons: <MdOutlineDashboard size={30} />, label: 'Dashboard', path: '/dashboard' },
        { icons: <TfiWrite size={30} />, label: 'Write', path: '/write/post' },
        { icons: <CiSettings size={30} />, label: 'Setting', path: '/settings' },
        { icons: <GoPerson size={30} />, label: 'Profile', path: '/profile' }
    ];


    const handleScrollOnclick = () => {
        const scrollPosition = window.scrollY;
    }


    const handleLogOut = () => {
        localStorage.removeItem('authToken');
        dispatch(clearUser())
        navigate('/start');
        setShowProfileMenu(false); // Close pop-up after logout
    };

    const handleAddAccount = () => {
        alert('Add Existing Account');
        setShowProfileMenu(false); // Close pop-up after action
    };

    useEffect(() => {
        if (email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

    }, [email]);
    const handleMenuClick = (path) => {

        sessionStorage.setItem(`scrollPosition-${window.location.pathname}`, window.scrollY);
        setActiveIcon(path)
        navigate(path);
    };

    if (isAuthenticated === null) {
        return <div><SidebarSkleton></SidebarSkleton></div>;
    }
    return (
        <>

            {isAuthenticated && (
                <div className={`flex h-screen p-4 ${open ? 'md:ml-52 ml-10' : 'md:ml-10 ml-10'}`}>
                    {/* Sidebar */}
                    <nav className={`shadow-md h-screen z-50 p-2 flex flex-col bg-gray-100 text-black fixed top-0 left-0 ${open ? 'w-60' : 'w-16'} duration-500`}>

                        <div className='px-3 py-2 h-20 flex justify-between items-center'>
                            <img src={logo} alt="Logo" className={`${open ? 'w-30' : 'w-0'} rounded-md`} />
                            <MdMenuOpen size={34} className={`cursor-pointer duration-500 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
                        </div>

                        {/* Body */}
                        <ul className='flex-1'>
                            {menuItems.map((item, index) => (
                                <li key={index}
                                    className={`px-3 py-2 my-2 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group 
                                    ${activeIcon === item.path ? 'shadow-md bg-gray-300' : 'hover:bg-gray-500'}`}
                                    onClick={() => handleMenuClick(item.path)}
                                >
                                    <div>{item.icons}</div>
                                    <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                                    <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>{item.label}</p>
                                </li>
                            ))}
                        </ul>

                        {/* Footer */}
                        <div className='flex items-center gap-2 px-3 py-2 relative'>
                            <button className='flex cursor-pointer hover:bg-gray-200 rounded-full' onClick={() => setShowProfileMenu(!showProfileMenu)}>
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                        src={profilePicture ? profilePicture : profileEmptyLogo}
                                        alt="User"
                                        className="w-full h-full object-cover "
                                    />
                                </div>
                                <div className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
                                    <span className='text-gray-500 m-1.5'>{username}</span>
                                </div>
                            </button>

                            {/* Profile Menu Pop-up beside the button */}
                            {showProfileMenu && (
                                <div className="absolute border border-gray-400 left-full  bottom-0 ml-2 bg-white shadow-lg rounded-md p-3 w-48 transition-all transform scale-95 duration-300">
                                    <div className="flex flex-col items-start">
                                        <button
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all "
                                            onClick={handleAddAccount}
                                        >
                                            <IoAdd size={18} className="inline mr-2" />
                                            Add account
                                        </button>
                                        <button
                                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all "
                                            onClick={handleLogOut}
                                        >
                                            {/* <IoLogOut size={18} className="inline mr-2" />  */}
                                            <TbLogout size={18}  ></TbLogout>
                                            <span>Log out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
