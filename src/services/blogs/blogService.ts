import {BlogModel} from "../../models/BlogModel";
import axios, {AxiosResponse} from "axios";
import AuthHeader from "../auth/authHeader";
class BlogService {
    baseUrl: string = import.meta.env.VITE_APP_BASE_API_URL + 'blogs';

    async getAllBlogs() {
        try {
            const response: AxiosResponse<BlogModel[]> = await axios.get(this.baseUrl);
            return response.data;
        }
        catch (err: any) {
            console.log('Error fetching blogs', err.message)
        }
    }

    async getBlogById(id: string) {
        try {
            const response: AxiosResponse<BlogModel> = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        }
        catch (err: any) {
            console.log('Error fetching blogs', err.message)
        }
    }

    async createBlog(newBlogData: Partial<BlogModel>) {
        try {
            const response: AxiosResponse<BlogModel> = await axios.post(this.baseUrl, newBlogData, {
                headers: AuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            console.log('Error when creating the blog', err.message);
        }
    }
    async deleteBlogById(id: string) {
        try {
            await axios.delete(`${this.baseUrl}/${id}`, { headers: AuthHeader() });
        } catch (err: any) {
            console.log('Error when deleting the blog', err.message);
        }
    }

    async updateBlog(id: string, updatedBlogData: Partial<BlogModel>) {
        try {
            const response: AxiosResponse<BlogModel> = await axios.put(`${this.baseUrl}/${id}`, updatedBlogData, {
                headers: AuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            console.log('Error when editing the blog', err.message);
        }
    }

    async downloadBlogAsPDF(id: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}/download`, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `blog_${id}.pdf`); // Set the filename as desired
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.log('Error downloading the blog as PDF:', err.message);
        }
    }
}

export default new BlogService();