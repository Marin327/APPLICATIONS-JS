import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/posts?sortBy=_createdOn%20desc',
    getById: '/data/posts/',
    create: '/data/posts',
    update: '/data/posts/',
    delete: '/data/posts/',
    usersPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getMy(userId) {
    return api.get(endpoints.usersPosts(userId));
}

export function getById(id) {
    return api.get(endpoints.getById + id);

}

export function create(data) {
    return api.post(endpoints.create, data);
}

export function update(id, shoes) {
    return api.put(endpoints.update + id, shoes);
}

export function del(id) {
    return api.del(endpoints.delete + id);
}
