import * as api from "../api/api.js";

const endpoints = {
    getAll: '/data/shoes?sortBy=_createdOn%20desc',
    getById: '/data/shoes/',
    create: '/data/shoes',
    update: '/data/shoes/',
    delete: '/data/shoes/',
}

export function getAll(search) {
    if (search) {
        return api.get(`/data/shoes?where=brand%20LIKE%20%22${search}%22`)
    }

    return api.get(endpoints.getAll);
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
