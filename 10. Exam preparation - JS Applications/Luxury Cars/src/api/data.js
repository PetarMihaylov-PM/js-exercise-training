import { del, get, post, put } from "./api.js";


const endpoints = {
  getAll: '/data/cars?sortBy=_createdOn%20desc',
  getById: '/data/cars/',
  create: '/data/cars',
  edit: '/data/cars/',
  delete: '/data/cars/',
  query: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`,
};

export async function getAllCars() {
  return get(endpoints.getAll);
}

export async function getCarById(id) {
  return get(endpoints.getById + id);
}

export async function createCar(data) {
  return post(endpoints.create, data);
}

export async function editCar(id, data) {
  return put(endpoints.edit + id, data);
}

export async function deleteCar(id) {
  return del(endpoints.delete + id);
}

export async function getAllCarsByQuery(query) {
  return get(endpoints.query(query));
}