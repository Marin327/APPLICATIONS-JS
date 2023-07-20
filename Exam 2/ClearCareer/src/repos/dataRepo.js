import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/offers?sortBy=_createdOn%20desc',
    getById: '/data/offers/',
    create: '/data/offers',
    update: '/data/offers/',
    delete: '/data/offers/',
}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getById(id) {
    return api.get(endpoints.getById + id);
}

export function create(offer) {
    return api.post(endpoints.create, offer);
}

export function update(id, offer) {
    return api.put(endpoints.update + id, offer);
}

export function del(id) {
    return api.del(endpoints.delete + id);
}
