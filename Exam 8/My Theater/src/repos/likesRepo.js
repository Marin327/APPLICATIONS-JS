import * as api from "../api/api.js";

const endpoints = {
    create: '/data/likes',
    totalLikesByTheater: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    countLikesByTheaterAndUser: (theaterId,userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export function like(theaterId) {
    return api.post(endpoints.create, {theaterId});
}

export function totalLikesByTheater(theaterId) {
    return api.get(endpoints.totalLikesByTheater(theaterId));
}

export function totalLikesByTheaterAndUser(theaterId, userId) {
    return api.get(endpoints.countLikesByTheaterAndUser(theaterId, userId));
}
