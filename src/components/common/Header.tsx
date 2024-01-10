import { Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useAuth} from "../../contexts/authContext";
import BlogService from "../../services/blogs/blogService";
import AuthService from "../../services/auth/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("You've successfully logged out !", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate('/auth/sign-in');
    };

    const handleOpenCreatModal = () => {
        if (!AuthService.getCurrentUserLoggedInStatus()) {
            setShowCreateModal(false);
            toast.info("You need to login first !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            navigate("/auth/sign-in");
        }
        else {
            setShowCreateModal(true);
        }
    }
    const handleSaveChanges = async () => {
        try {
            await BlogService.createBlog({title: blogTitle,content: blogContent})
            setShowCreateModal(false);
            setBlogTitle('');
            setBlogContent('');
            toast.success("Blog created successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            navigate('/blogs')
        }
        catch (error) {
            setBlogTitle('');
            setBlogContent('');
            setShowCreateModal(false);
            if (error.response && error.response.status === 401) {
                toast.info("You need to login first !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            navigate("/auth/sign-in");
        }

    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setBlogTitle('');
        setBlogContent('');
    };
    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            <div>
                                                <Link
                                                    to="/"
                                                    className="bg-grey-500 hover:bg-gray-700 text-white font-normal py-2 px-4 rounded"
                                                >Home</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            <div>
                                                <Link
                                                    to="/blogs"
                                                    className="bg-grey-500 hover:bg-gray-700 text-white font-normal py-2 px-4 rounded"
                                                >Blogs</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button className="bg-gray-700 hover:bg-blue-700 text-white font-normal py-2 px-4 mr-8 border border-blue-700 rounded " onClick={() => handleOpenCreatModal()}>
                                        Write Blog
                                    </button>
                                    {showCreateModal ? (
                                        <>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-full my-6 mx-auto max-w-4xl">
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">
                                                                Create Blog
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowCreateModal(false)}
                                                            >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                                            </button>
                                                        </div>
                                                        <div className="relative p-6 flex-auto">
                                                            <input
                                                                type="text"
                                                                placeholder="Title"
                                                                value={blogTitle}
                                                                onChange={(e) => setBlogTitle(e.target.value)}
                                                                className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                                                            />
                                                            <textarea
                                                                placeholder="Content"
                                                                value={blogContent}
                                                                onChange={(e) => setBlogContent(e.target.value)}
                                                                className="border border-gray-300 rounded-md p-2 mt-2 w-full h-32 resize-none"
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={handleCloseModal}
                                                            >
                                                                Close
                                                            </button>
                                                            <button
                                                                disabled={!blogTitle.trim() || !blogContent.trim()}
                                                                className={`bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                                                                    (!blogTitle.trim() || !blogContent.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                                                                }`}
                                                                type="button"
                                                                onClick={handleSaveChanges}

                                                            >
                                                                Create
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : null}
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-gray-100 mt-2 ml-2">{AuthService.getCurrentUserName()}</p>
                                                    {/* Replace 'John Doe' with your dynamic username variable */}
                                                    {/* You can add other user-related information here */}
                                                </div>
                                            </Menu.Button>

                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {/*<Menu.Item>*/}
                                                {/*    {({ active }) => (*/}
                                                {/*        <a*/}
                                                {/*            href="#"*/}
                                                {/*            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                                {/*        >*/}
                                                {/*            Your Profile*/}
                                                {/*        </a>*/}
                                                {/*    )}*/}
                                                {/*</Menu.Item>*/}
                                                {!isLoggedIn &&
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link to= "auth/sign-in"

                                                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign in
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                {!isLoggedIn &&
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link to= "auth/sign-up"
                                                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign up
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                {isLoggedIn &&
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={handleLogout}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Logout
                                                            </button>
                                                        )}
                                                    </Menu.Item>}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <ToastContainer/>
                        {/*<Disclosure.Panel className="sm:hidden">*/}
                        {/*    <div className="space-y-1 px-2 pb-3 pt-2">*/}
                        {/*        {navigation.map((item) => (*/}
                        {/*            <Disclosure.Button*/}
                        {/*                key={item.name}*/}
                        {/*                as="a"*/}
                        {/*                href={item.href}*/}
                        {/*                className={classNames(*/}
                        {/*                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
                        {/*                    'block rounded-md px-3 py-2 text-base font-medium'*/}
                        {/*                )}*/}
                        {/*                aria-current={item.current ? 'page' : undefined}*/}
                        {/*            >*/}
                        {/*                {item.name}*/}
                        {/*            </Disclosure.Button>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</Disclosure.Panel>*/}
                    </>
                )}
            </Disclosure>
        </>
    )
}
