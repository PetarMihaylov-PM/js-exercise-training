// TODO rename file according exam

import { del, get, post, put } from "./request.js";


//TODO modify endpoints according to description
const endpoints = {
  all: '/data/drones',
  byId: '/data/drones/',
}

export async function getAll() {
  return get(endpoints.all);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}


//TODO enter record properties
export async function create(prop1, prop2) {
  return post(endpoints.all, {prop1, prop2});
}

export async function update(id, record) {
  return put(endpoints.byId + id, record);
}

export async function deleteById(id) {
  return del(endpoints.byId + id);
}