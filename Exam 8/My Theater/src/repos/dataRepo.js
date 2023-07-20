import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    getAllByUserId: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getById: '/data/theaters/',
    create: '/data/theaters',
    update: '/data/theaters/',
    delete: '/data/theaters/',
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
