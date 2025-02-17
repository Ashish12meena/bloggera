import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { clearUser } from '../../redux/userSlice';
import profileEmptyLogo from "../../assets/images/No-Avtar.png";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {email,profilePicture}= useSelector((state) => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0); // Track previous scroll position
    const [isScrollingDown, setIsScrollingDown] = useState(false); // Track scroll direction
    
        const handleLogOut = () => {
            localStorage.removeItem('authToken');
            dispatch(clearUser())
            navigate('/start');
        };

    useEffect(() => {
        if (email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [email]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > prevScrollY) {
                setIsScrollingDown(true); // User is scrolling down
            } else {
                setIsScrollingDown(false); // User is scrolling up
            }
            setPrevScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollY]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={`sticky top-0 z-50 ${isScrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'} transition-transform duration-300`}>
                {isAuthenticated && (
                    <div>
                        <Disclosure as="nav" className="bg-gradient-to-r from-gray-200 to-gray-300 text-black p-4 md:p-6 ">
                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-600 focus:outline-hidden focus:ring-inset">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                        </DisclosureButton>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex shrink-0 items-center">
                                            <Link to="/">
                                                <div className="text-gray-900 font-bold text-lg cursor-pointer">
                                                    Bloggera
                                                </div>
                                            </Link>
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
                                            <span className="sr-only">Write</span>
                                            <TfiWrite aria-hidden= "true" className="size-6" />
                                        </button>
                                        <button
                                            type="button"
                                            className="relative cursor-pointer rounded-full bg-white p-1 text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-hidden"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Write</span>
                                            <BellIcon aria-hidden="true" className="size-6" />
                                        </button>

                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative cursor-pointer flex rounded-full bg-white text-sm focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-hidden">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                                        <img
                                                            src={profilePicture ? profilePicture : profileEmptyLogo}
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
                )}
            </div>
        </>
    )
}
