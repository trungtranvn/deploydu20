import axios from "axios";
import {BACKEND_URL, AUTH_API} from "../constant";

class AuthService {
  register(username, email, password) {
    return axios.post(BACKEND_URL + AUTH_API + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();