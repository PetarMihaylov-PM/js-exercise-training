import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const { _id, email: responseEmail, accessToken } = await post(endpoints.login, { email, password });

  setUserData({
    id: _id,
    email: responseEmail,
    accessToken
  });
}

export async function register(email, password) {
  const { _id, email: responseEmail, accessToken } = await post(endpoints.register, { email, password });

  setUserData({
    id: _id,
    email: responseEmail,
    accessToken
  });
}

export function logout() {
  get(endpoints.logout);
  clearUserData();
}

