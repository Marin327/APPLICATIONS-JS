import * as api from "../api/api.js";

const endpoints = {
    getAll: ':/data/fruits?sortBy=_createdOn%20desc',
    getById: '/data/fruits/',
    create: '/data/fruits/',
    update: '/data/fruits/',
    delete: '/data/fruits/',
}

export function getAll(name) {
    if (name) {
        return api.get(`:/data/fruits?sortBy=_createdOn%20desc${name}`);
    }

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
