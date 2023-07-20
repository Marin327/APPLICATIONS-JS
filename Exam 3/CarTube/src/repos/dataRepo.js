import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/cars?sortBy=_createdOn%20desc',
    getAllByUserId: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    getAllByYear: (year) => `/data/cars?where=year%3D${year}`,
    getById: '/data/cars/',
    create: '/data/cars',
    update: '/data/cars/',
    delete: '/data/cars/',
}

export function getAll() {
    return api.get(endpoints.getAll);
}

export function getAllByUserId(userId) {
    return api.get(endpoints.getAllByUserId(userId));
}

export function getAllByYear(year) {
    return api.get(endpoints.getAllByYear(year));
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
