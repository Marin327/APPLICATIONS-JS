import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    getById: '/data/pets/',
    create: '/data/pets',
    update: '/data/pets/',
    delete: '/data/pets/',
}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getById(id) {
    return api.get(endpoints.getById + id);
}

export function create(pet) {
    return api.post(endpoints.create, pet);
}

export function update(id, pet) {
    return api.put(endpoints.update + id, pet);
}

export function del(id) {
    return api.del(endpoints.delete + id);
}
