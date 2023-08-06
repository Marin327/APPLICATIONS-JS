import { del, get, post, put } from "./api.js";

//1
const endpoints = {
    'facts': '/data/facts', // /data/albums си го виждаме от нашето условие като може да сменим и първото име
    'getAllFacts' : "/data/facts?sortBy=_createdOn%20desc",
    "singleFact": "/data/facts/",
    // "search": "/data/albums?where=name"
}

export async function createFacts(data) {
    return post(endpoints.facts, data)
};

export async function getAllFacts() {
    return get(endpoints.getAllFacts)
};

export async function getDetailsById(id) {
    return get(endpoints.singleFact + id);
}

export async function deleteFactById(id) {
    return del(endpoints.singleFact + id);
}

export async function updateFact(id, data) {
    return put(endpoints.singleFact + id, data)
};

export async function likeFact(factId) {
    return post(`/data/likes`, {
        factId
    })
}

export async function getLikesByFactId(factId) {
    return get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`)
}

export async function getMyLikeFactId(factId, userId) {
    return get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
