import axios from "axios";
import {SignUpModel} from "../../models/SignUpModel";
import {SignInModel} from "../../models/signInModel";
import { jwtDecode} from "jwt-decode";

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

     public getCurrentUserLoggedInStatus() {
          const user: any = localStorage.getItem("user");
          if (user == null) {
               return false;
          }
          if (user) {
               const userObj = JSON.parse(user);
               const accessToken = userObj.accessToken;
               const decodedToken = jwtDecode(accessToken);
               const currentTime = Math.floor(Date.now()/1000);
               if (decodedToken.exp) {
                    if (decodedToken.exp < currentTime) {
                         return false
                    }
               }
               return true;
          }
          return false;
     }

     public getCurrentUserName(): string|null {
          const user: any = localStorage.getItem("user");
          if (user == null) {
               return null;
          }
          if (user) {
               const userObj = JSON.parse(user);
               const accessToken = userObj.accessToken;
               const decodedToken = jwtDecode<MyJwtPayload>(accessToken);
               const currentTime = Math.floor(Date.now()/1000);
               if (decodedToken.exp) {
                    if (decodedToken.exp > currentTime) {
                         return decodedToken.username;
                    }
               }
          }
          return null;
     }
}

export default new AuthService()

export interface MyJwtPayload {
     username: string;
     exp: number;
}