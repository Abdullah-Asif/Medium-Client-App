import axios from "axios";
import {SignUpModel} from "../../models/SignUpModel";
import {SignInModel} from "../../models/signInModel";
class AuthService {

     isLoggedIn : boolean = false;
     private baseUrl: string = process.env.REACT_APP_BASE_API_URL + 'auth/'
     public register(signUpModel: SignUpModel) {
          return axios.post(this.baseUrl + "sign-up", {
               username: signUpModel.username,
               name: signUpModel.name,
               email: signUpModel.email,
               password: signUpModel.password
          });
     }

     public async login(signInModel: SignInModel) {
          return axios.post(this.baseUrl + "sign-in", {
               username: signInModel.username,
               password: signInModel.password
          })
              .then((response) => {
                   if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                   }
                   this.isLoggedIn = true;
                   return response.data;
              });
     }

     public logOut() {
          localStorage.removeItem("user");
          this.isLoggedIn = false;
     }

     public getCurrentUser() {
          const user = localStorage.getItem("user");
          if (user) {
               return JSON.parse(user);
          }
          return null;
     }
}

export default new AuthService()
