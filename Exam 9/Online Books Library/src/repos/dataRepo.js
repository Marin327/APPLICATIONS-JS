import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/books?sortBy=_createdOn%20desc',
    getAllByUserId: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getById: '/data/books/',
    create: '/data/books',
    update: '/data/books/',
    delete: '/data/books/',
}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getAllByUserId(userId) {
    return api.get(endpoints.getAllByUserId(userId));
}

export function getById(id) {
    return api.get(endpoints.getById + id);

}

export function create(data) {
    return api.post(endpoints.create, data);
}

export function update(id, data) {
    return api.put(endpoints.update + id, data);
}

export function del(id) {
    return api.del(endpoints.delete + id);
}
