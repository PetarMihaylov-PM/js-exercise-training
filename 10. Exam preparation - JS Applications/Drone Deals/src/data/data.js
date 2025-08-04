// TODO rename file according exam

import { del, get, post, put } from "./request.js";


//TODO modify endpoints according to description
const endpoints = {
  recent: '/data/drones?sortBy=_createdOn%20desc',
  create: '/data/drones/',
  byId: '/data/drones/',
}

export async function getAllDrones() {
  return get(endpoints.recent);
}

export async function getDroneById(id) {
  return get(endpoints.byId + id);
}


//TODO enter record properties
export async function createDrone(
  model, imageUrl, price, 
  condition, weight,
  phone, description ) {

  return post(endpoints.create, {
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
} 
);
}

export async function updateDrone(id, {
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
} ) {
  return put(endpoints.byId + id, {
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
} );
}

export async function deleteDrone(id) {
  return del(endpoints.byId + id);
}