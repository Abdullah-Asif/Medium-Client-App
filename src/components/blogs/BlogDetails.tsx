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

    const location = useLocation();
    const [blog, setBlog] = useState(location.state);

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
    };


    return (
        <>
        <div className="flex flex-col gap-y-4 max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className={"flex justify-between mb-4"}>
                <div>
                    <h1 className="text-3xl text-gray-100 font-semibold">{blog.title}</h1>
                    <p className="text-gray-50">Written by {blog.username}</p>
                </div>
                <div>
                <button
                    type="button"
                    onClick={() => handleDownload(blog.id)}
                    className="px-3 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform flex items-center"
                >
                    <div className={"flex gap-x-2"}>
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                    <span className="text-xs">Download</span>
                    </div>
                </button>
                </div>
            </div>

                <p className="text-gray-100">{blog.content}</p>

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
        </>

    );
}

