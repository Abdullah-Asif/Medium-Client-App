import {useEffect, useState} from "react";
import {BlogModel} from "../../models/BlogModel";
import BlogService from "../../services/blogs/blogService";
import BlogCard from "./BlogCard";


export default function BlogList() {
    const [blogs, setBlogs] = useState<BlogModel[]>([]);

    const fetchBlogs = async () => {
        try {
            const fethchedBlogs = await BlogService.getAllBlogs();
            if (fethchedBlogs) {
                setBlogs(fethchedBlogs);
            }
        }
        catch (err: any) {
            console.log("Error happened when fetching blogs", err.message);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, []);
    return(
        <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {blogs.map((blog) => (
                    <BlogCard id={blog.id} username={blog.username} title={blog.title} content={blog.content} />
                ))}
            </div>
        </>
    );
}