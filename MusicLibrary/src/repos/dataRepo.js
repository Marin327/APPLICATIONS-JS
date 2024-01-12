import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc',
    getById: '/data/albums/',
    create: '/data/albums',
    update: '/data/albums/',
    delete: '/data/albums/',
}

export function getAll(search) {
    return api.get(endpoints.getAll);
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
