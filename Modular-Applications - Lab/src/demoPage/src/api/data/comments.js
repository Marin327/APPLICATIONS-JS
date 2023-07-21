import * as api from "../api.js";

const endpoints = {
    byCarId: carId => '/data/comments?where=' + encodeURIComponent(`carId="${carId}"`) + '&load=' + encodeURIComponent('author=ownerId:users'),
    createComment: '/data/comments',
}

export  async function getCommentsByCarId(carId) {
    return api.get(endpoints.byCarId(carId));
}

export async function createComment(carId, content) {
    return api.post(endpoints.createComment, {carId, content});
}
