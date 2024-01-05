import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import AuthService from "../../services/auth/authService";
import Delete from "../common/Delete";
export default function BlogDetails() {
    const [currentUser, setCurrentUser] = useState<{accessToken: string} | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const location = useLocation();
    const blog = location.state;


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
    }, []);
    const canEditOrDelete = () => {
        if (currentUser && currentUser.accessToken) {
            const decodedToken = jwtDecode<MyJwtPayload>(currentUser.accessToken);
            return decodedToken.username === blog.username;
        }
        return false;
    }
    const handleDelete = async () => {
        if (canEditOrDelete()) {
            setConfirmationOpen(true);
        }
    };

    const handleEdit = () => {
        if (canEditOrDelete()) {

        }
    };
    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-100 font-semibold mb-2">{blog.title}</h1>
                <p className="text-gray-50">Written by {blog.username}</p>
            </div>
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

        </div>
    );
}

interface MyJwtPayload {
    username: string;
}