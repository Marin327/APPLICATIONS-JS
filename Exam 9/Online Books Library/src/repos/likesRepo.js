import * as api from "../api/api.js";

const endpoints = {

    create: '/data/likes',
    totalLikesByBook: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    totalLikesByBookAndUser: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export function like(data) {
    return api.post(endpoints.create, data);
}

export function getLikesForBook(bookId) {
    return api.get(endpoints.totalLikesByBook(bookId));
}

export function getLikesForBookByUser(bookId, userId) {
    if (userId) {
        return api.get(endpoints.totalLikesByBookAndUser(bookId, userId))
    }
}
