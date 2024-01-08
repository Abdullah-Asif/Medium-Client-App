// Modal.js
import React, { useState } from "react";
import BlogService from "../../services/blogs/blogService";


export default function EditBlogModal({ blog, setShowModal, updateBlogData }: any) {
    const [editedBlog, setEditedBlog] = useState({ ...blog });
    const handleTitleChange = (e: any) => {
        setEditedBlog({ ...editedBlog, title: e.target.value });
    };

    const handleContentChange = (e: any) => {
        setEditedBlog({ ...editedBlog, content: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            await BlogService.updateBlog(blog.id, editedBlog);
            const updatedBlog = await BlogService.getBlogById(blog.id);
            updateBlogData(updatedBlog);
            setShowModal(false);
        }
        catch (error: any) {
            console.error('Error when editing the blog', error.message);
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full my-6 mx-auto max-w-4xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Edit Blog</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <input
                                type="text"
                                value={editedBlog.title}
                                onChange={handleTitleChange}
                                className="w-full border rounded-md p-2 mb-4"
                            />
                            <textarea
                                value={editedBlog.content}
                                onChange={handleContentChange}
                                className="w-full border rounded-md p-2"
                                rows={8}
                            />
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </>
    );
}
