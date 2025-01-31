import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { clearUser } from '../../redux/userSlice';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.user.email);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    // Get email from Redux state (this will determine if the user is authenticated)


    const handleLogOut = () => {
        // Remove authToken from localStorage
        localStorage.removeItem('authToken');

        dispatch(clearUser())
        // Redirect to the login page
        navigate('/start'); // Using navigate instead of history.push
    };


    useEffect(() => {
        if (email) {
            setIsAuthenticated(true);  // If email exists, user is authenticated
        } else {
            setIsAuthenticated(false); // If email doesn't exist, user is not authenticated
        }
    }, [email]);  // Trigger effect when the email changes

    if (isAuthenticated === null) {
        // If the authentication state is still loading, you can show a loading indicator
        return <div>Loading...</div>;
    }
    return (
        <>
            <div>
                {isAuthenticated ?
                    <div>
                        <Disclosure as="nav" className="bg-purple-100 shadow-md">
                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}
                                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-600 focus:outline-hidden focus:ring-inset">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                        </DisclosureButton>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex shrink-0 items-center">
                                            <div className="text-gray-900 font-bold text-lg">
                                                Bloggera
                                            </div>
                                        </div>
                                        <div className="hidden sm:ml-6 sm:block">
                                            <div className="flex space-x-4">
                                                <a
                                                    href="#"
                                                    aria-current="page"
                                                    className="bg-gray-100 text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Dashboard
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Team
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Projects
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Calendar
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        <button
                                            type="button"
                                            className="relative cursor-pointer rounded-full bg-white p-1 text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-hidden"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon aria-hidden="true" className="size-6" />
                                        </button>

                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative cursor-pointer flex rounded-full bg-white text-sm focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-hidden">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    {/* Image removed, highlight area */}
                                                    <div className="w-8 h-8 rounded-full  overflow-hidden">
                                                        <img
                                                            src="https://images.pexels.com/photos/30237034/pexels-photo-30237034/free-photo-of-chateau-de-le-lude-in-golden-hour.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                                            alt="User"
                                                            className="w-full h-full object-cover "
                                                        />
                                                    </div>
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-gray-300 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            >
                                                <MenuItem>
                                                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"><CgProfile /> profile</Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"><SlSettings /><span>Settings</span></Link>
                                                </MenuItem>
                                                <MenuItem>

                                                    <button className='flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all' onClick={handleLogOut}>
                                                        <TbLogout />
                                                        <span>Log out</span>
                                                    </button>

                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <DisclosurePanel className="sm:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3">
                                    {/* Removed map and added navigation items manually */}
                                    <DisclosureButton
                                        as="a"
                                        href="#"
                                        aria-current="page"
                                        className="bg-gray-100 text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
                                    >
                                        Dashboard
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        href="#"
                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
                                    >
                                        Team
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        href="#"
                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
                                    >
                                        Projects
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        href="#"
                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
                                    >
                                        Calendar
                                    </DisclosureButton>
                                </div>
                            </DisclosurePanel>
                        </Disclosure>
                    </div>
                    :
                    <div>
                        <div>
                            <Disclosure as="nav" className="bg-purple-100 shadow-md">
                                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                    <div className="relative flex h-16 items-center justify-between">
                                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                            {/* Mobile menu button */}
                                            <DisclosureButton
                                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-600 focus:outline-hidden focus:ring-inset"
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Open main menu</span>
                                                <Bars3Icon
                                                    aria-hidden="true"
                                                    className={`block size-6 ${isMenuOpen ? 'hidden' : 'group-data-open:hidden'}`}
                                                />
                                                <XMarkIcon
                                                    aria-hidden="true"
                                                    className={`hidden size-6 ${isMenuOpen ? 'group-data-open:block' : ''}`}
                                                />
                                            </DisclosureButton>
                                        </div>
                                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                            <div className="flex shrink-0 items-center">
                                                <div className="text-gray-900 font-bold text-lg">
                                                    Bloggera
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                            <div className="hidden sm:ml-6 sm:block">
                                                <div className="flex space-x-4">
                                                    <a
                                                        href="#"
                                                        className=" text-gray-900 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-200 hover:text-gray-900 hover:scale-105"
                                                    >
                                                        Dashboard
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                                    >
                                                        Team
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                                    >
                                                        Projects
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                                    >
                                                        Calendar
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Show "Get Started" only on larger screens */}
                                        <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <button
                                                type="button"
                                                className="bg-black text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 cursor-pointer"
                                            >
                                                SignIn
                                            </button>

                                        </div>
                                        <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <button
                                                type="button"
                                                className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105 cursor-pointer"
                                            >
                                                SignUp
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <DisclosurePanel className="sm:hidden">
                                    <div className="space-y-1 px-2 pt-2 pb-3">
                                        <DisclosureButton
                                            as="a"
                                            href="#"
                                            className="bg-gray-100 text-gray-900 block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:bg-gray-200 hover:text-gray-900 hover:scale-105"
                                        >
                                            Dashboard
                                        </DisclosureButton>
                                        <DisclosureButton
                                            as="a"
                                            href="#"
                                            className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Team
                                        </DisclosureButton>
                                        <DisclosureButton
                                            as="a"
                                            href="#"
                                            className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Projects
                                        </DisclosureButton>
                                        <DisclosureButton
                                            as="a"
                                            href="#"
                                            className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Calendar
                                        </DisclosureButton>
                                        {/* Move "Get Started" inside the dropdown when menu is open */}
                                        {isMenuOpen && (
                                            <DisclosureButton
                                                as="button"
                                                className="bg-gray-600 text-white block w-full rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                                            >
                                                Sign in
                                            </DisclosureButton>
                                        )}
                                        {isMenuOpen && (
                                            <DisclosureButton
                                                as="button"
                                                className="bg-gray-600 text-white block w-full rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                                            >
                                                Sign up
                                            </DisclosureButton>
                                        )}

                                    </div>
                                </DisclosurePanel>
                            </Disclosure>

                        </div>

                    </div>
                }
            </div>
        </>
    )
}
