import {BlogModel} from "../../models/BlogModel";
import { Link } from 'react-router-dom';

export default function BlogCard(blog: BlogModel) {
    const trimmedContent = blog.content.substring(0, 150);

    return (
        <div className="mt-12">
            {/* Adjust marginLeft to the amount of space you desire */}
            <div className="max-w-sm w-[300px] h-[250px] relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                <Link to={`/blogs/${blog.id}`} state={blog} className="block h-full">
                    <div className="p-6">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{trimmedContent}</p>
                    </div>
                </Link>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-blue-700 dark:bg-violet-800">
                    <Link to={`/blogs/${blog.id}`} state={blog} className="text-sm font-medium text-white hover:text-gray-100 focus:outline-none">
                        Read post
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}