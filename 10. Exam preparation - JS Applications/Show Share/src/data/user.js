import { get, post } from '.request.js';
import { clearUserData, setUserData } from '../utils/utils.js';

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout',
}


export async function login(email, password) {
  const result = await post(endpoints.login, { email, password });

  const userData = {
    id: result._id,
    accessToken: result.accessToken,
  }

  setUserData(userData);
}

export async function register(email, password) {
  const result = await post(endpoints.register, { email, password });

  const userData = {
    id: result._id,
    accessToken: result.accessToken,
  }

  setUserData(userData);
}


export async function logout() {
  get(endpoints.logout);
  clearUserData();
}