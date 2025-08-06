import { clearUserData, getUserData } from "../utils/utils.js";



const hostname = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {}
  };

  if(data != undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  //todo add authorization

  const userData = getUserData();

  if(userData) {
    options.headers['X-Authorization'] = userData.accessToken;
  }


  const response = await fetch(hostname + url, options);

  if(!response.ok) {
    const error = await response.json();
    console.log(error.message);

    if(error.message == 'Invalid access token') {
      clearUserData();
    }

    throw error;
  }


  if(response.status == 204) {
    return response;
  }

  return response.json();
}


export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);