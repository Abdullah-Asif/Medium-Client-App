import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import AuthService from "../../services/auth/authService";
import Delete from "../common/Delete";
import EditBlogModal from "./EditBlogModal";
import BlogService from "../../services/blogs/blogService"
export default function BlogDetails() {
    const [currentUserNameName, setCurrentUser] = useState<string | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditAlertMessage, setEditAlertMessage] = useState(false);

    const location = useLocation();
    const [blog, setBlog] = useState(location.state);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (showEditAlertMessage) {
            timer = setTimeout(() => {
                setEditAlertMessage(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showEditAlertMessage]);

    useEffect(() => {
        const user = AuthService.getCurrentUserName();
        setCurrentUser(user);
    }, []);
    const canEditOrDelete = () => {
        return currentUserNameName === blog.username;
    }
    const handleDelete = async () => {
        if (canEditOrDelete()) {
            setConfirmationOpen(true);
        }
    };

    const handleEdit = () => {
        if (canEditOrDelete()) {
            setShowModal(true);
        }
    };
    const handleDownload = (id: string) => {
        BlogService.downloadBlogAsPDF(id);
    };

    const updateBlogData = (updatedBlog: any) => {
        setBlog(updatedBlog);
        setEditAlertMessage(true);
    };


    return (
        <>
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-100 font-semibold mb-2">{blog.title}</h1>
                <p className="text-gray-50">Written by {blog.username}</p>
            </div>
            <button
                type="button"
                onClick={() => handleDownload(blog.id)}
                className="px-3 py-2 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex items-center"
            >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                <span className="text-xs">Download</span>
            </button>
            <div className="mb-4">
                <p className="text-gray-100">{blog.content}</p>
            </div>
            <div className="flex justify-between">
                {canEditOrDelete() && (
                    <>
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {confirmationOpen && (
                <Delete
                    blog={blog}
                    setOpen={setConfirmationOpen}
                />
            )}
            {showModal && (
                <EditBlogModal
                    blog={blog}
                    setShowModal={setShowModal}
                    updateBlogData={updateBlogData}
                />
            )}
        </div>
            {showEditAlertMessage &&
                <div className="fixed bottom-10 right-6">
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                        <p className="font-bold">Blog edited successfully</p>
                    </div>
                </div>
            </div>
                </div>}
        </>

    );
}

