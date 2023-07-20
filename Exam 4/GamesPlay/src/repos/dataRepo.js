import * as api from "../api/api.js";

const endpoints = {
    getAllHome: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    getAllCatalog: '/data/games?sortBy=_createdOn%20desc',
    getById: '/data/games/',
    create: '/data/games',
    update: '/data/games/',
    delete: '/data/games/',
}

export function getAllHome() {
    return api.get(endpoints.getAllHome);
}

export function getAllCatalog() {
    return api.get(endpoints.getAllHome);
}

export function getById(id) {
    return api.get(endpoints.getById + id);

}

export function create(shoes) {
    return api.post(endpoints.create, shoes);
}

export function update(id, shoes) {
    return api.put(endpoints.update + id, shoes);
}

export function del(id) {
    return api.del(endpoints.delete + id);
}
