import * as api from "../api/api.js";

const endpoints = {
    getCount: '/data/applications?',
    create: '/data/applications',
}

export function getCountByOfferId(offerId) {
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function didUserApplied(offerId, userId) {
    return await api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function create(offer) {
    return api.post(endpoints.create, offer);
}
