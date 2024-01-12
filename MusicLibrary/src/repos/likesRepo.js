import * as api from "../api/api.js";

const endpoints = {
    create: '/data/likes',
    likesCount: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    likesPerUser: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export function like(data) {
    return api.post(endpoints.create, data);
}

export function getLikes(albumId) {
    return api.get(endpoints.likesCount(albumId));
}

export function getLikesPerUser(albumId, userId) {
    return api.get(endpoints.likesPerUser(albumId, userId));
}
