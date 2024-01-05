import {BlogModel} from "../../models/BlogModel";
import axios, {AxiosResponse} from "axios";
import AuthHeader from "../auth/authHeader";
class BlogService {
    baseUrl: string = process.env.REACT_APP_BASE_API_URL + 'blogs';

    async getAllBlogs() {
        try {
            const response: AxiosResponse<BlogModel[]> = await axios.get(this.baseUrl, {headers: AuthHeader()});
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

    async editBlog(id: string, updatedBlogData: Partial<BlogModel>) {
        try {
            const response: AxiosResponse<BlogModel> = await axios.put(`${this.baseUrl}/${id}`, updatedBlogData, {
                headers: AuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            console.log('Error when editing the blog', err.message);
        }
    }
}

export default new BlogService();