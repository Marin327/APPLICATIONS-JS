import * as api from "../api/api.js";

const endpoints = {
    donate: `/data/donation`,
    donationCount: (petId)=>`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    donationByUser:(petId, userId) =>`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export function getTotalDonationCount(petId) {
    return api.get(endpoints.donationCount(petId));
}

export function getDonationCountByUser(petId, userId) {
    return api.get(endpoints.donationByUser(petId, userId));
}

export function donate(donation) {
    return api.post(endpoints.donate, donation);
}
