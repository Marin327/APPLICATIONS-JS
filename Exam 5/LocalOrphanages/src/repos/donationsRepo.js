import * as api from "../api/api.js";

const endpoints = {
    donate: '/data/donations',
    postDonations: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    userDonationsForPost: (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export function donate(postId) {
    return api.post(endpoints.donate, {postId});
}

export function donationsForPost(postId) {
    return api.get(endpoints.postDonations(postId));
}

export function usersDonationsForPost(postId, userId) {
    return api.get(endpoints.userDonationsForPost(postId, userId));
}
