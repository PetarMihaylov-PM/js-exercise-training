import { get, post, put, del } from './request.js';

const endpoints = {
  all: '/data/shows?sortBy=_createdOn%20desc',
  collection: '/data/shows',
  byId: '/data/shows',
  search: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`
}

export async function getAll() {
  return get(endpoints.all);
}

export async function getById(id) {
  return get(endpoints.byId + id);
}

export async function create(prop1, prop2) {
  return post(endpoints.all, {prop1, prop2});
}

export async function update(id, record) {
  return put(endpoints.byId + id, record);
}

export async function deleteById(id) {
  return del(endpoints.byId + id);
}