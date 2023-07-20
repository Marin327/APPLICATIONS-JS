import * as api from "../api/api.js";

const endpoints = {
    create: '/data/comments',
    getComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`
}

export function create(comments) {
    return api.post(endpoints.create, comments);
}

export function getComments(gameId) {
    return api.get(endpoints.getComments(gameId));
}
