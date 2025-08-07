// TODO rename file according exam

import { del, get, post, put } from "./request.js";


//TODO modify endpoints according to description
const endpoints = {
  all: '/data/shows?sortBy=_createdOn%20desc',
  byId: '/data/shows/',
  create: '/data/shows',
}

export async function getAll() {
  return get(endpoints.all);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function searchShow(query) {
  return get(`/data/shows?where=title%20LIKE%20%22${query}%22`);
}

//TODO enter record properties
export async function create(data) {
  return post(endpoints.create, data);
}

export async function update(id, record) {
  return put(endpoints.byId + id, record);
}

export async function deleteById(id) {
  return del(endpoints.byId + id);
}