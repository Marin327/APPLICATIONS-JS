import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/memes?sortBy=_createdOn%20desc/data/memes?sortBy=_createdOn%20desc',
    getByOwnerId: '/data/memes?where=',
    getById: '/data/memes/',
    create: '/data/memes',
    update: '/data/memes/',
    delete: '/data/memes/',
}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getAllByOwnerId(ownerId) {
    return api.get(endpoints.getByOwnerId + encodeURIComponent(`_ownerId="${ownerId}"`) + '&sortBy=' + encodeURIComponent('_createdOn desc'));
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
