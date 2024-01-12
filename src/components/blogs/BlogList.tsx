import {useEffect, useState} from "react";
import {BlogModel} from "../../models/BlogModel";
import BlogService from "../../services/blogs/blogService";
import BlogCard from "./BlogCard";
import { useLocation } from 'react-router-dom';
export default function BlogList() {
    const [blogs, setBlogs] = useState<BlogModel[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let location: any = useLocation();
    const pageSize = 6;
    const getItemProps = (index) =>
        ({
            className: `px-3 py-1 rounded-md focus:outline-none ${
                pageNumber === index
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
            }`,
            onClick: () => setPageNumber(index),
        } as any);

    const fetchTotalPages = async () => {
        try {
            const totalBlogs = await BlogService.getTotalBlogCount();
            const calculatedTotalPages = Math.ceil(totalBlogs / pageSize);
            setTotalPages(calculatedTotalPages);
        } catch (err: any) {
            console.log("Error fetching total pages: ", err.message);
        }
    };
    const fetchBlogs = async (page) => {
        try {
            const fetchedBlogs = await BlogService.getAllBlogs(page);
            if (fetchedBlogs) {
                setBlogs(fetchedBlogs);
            }
        } catch (err: any) {
            console.log("Error happened when fetching blogs", err.message);
        }
    };

    useEffect(() => {
        fetchTotalPages();
        fetchBlogs(pageNumber);
    }, [pageNumber]);

    useEffect(() => {
        const lastCreatedBlog = location?.state?.blog;
        if (lastCreatedBlog) {
            let blogList = [lastCreatedBlog,...blogs];
            blogList = blogList.slice(0, -1);
            setBlogs(blogList);
        }
    }, [location?.state]);

    const changePage = async (page) => {
        setPageNumber(page);

        try {
            const fetchedBlogs = await BlogService.getAllBlogs(page);
            if (fetchedBlogs) {
                setBlogs(fetchedBlogs);
            }
        } catch (err) {
            console.log("Error fetching blogs: ", err.message);
        }
    };

    const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={"p-8 py-12 flex flex-col items-center"}>
            {/*<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>*/}
            <div className={"h-[600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-24"}>
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        username={blog.username}
                        title={blog.title}
                        content={blog.content}
                    />
                ))}
            </div>

            <div className="flex gap-4 mt-20">
                <button
                    className={`flex items-center gap-2 text-gray-900 ${
                        pageNumber === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }`}
                    onClick={() => changePage(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >
                    Prev
                </button>

                <div className="flex gap-2">
                    {pageButtons.map((page) => (
                        <button
                            key={page}
                            {...getItemProps(page)}
                            onClick={() => changePage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className={`flex items-center gap-2 text-gray-900 ${
                        pageNumber === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }`}
                    onClick={() => changePage(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}