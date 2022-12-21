import * as api from './api.js';

const endpoints = {
    getAll:'/data/offers?sortBy=_createdOn%20desc',
    create:'/data/offers',
    getById : '/data/offers/',
    addApp: '/data/applications',
    totalApps: (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    userApp: (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllOffers() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function createOffer(offer) {
    const res = await api.post(endpoints.create, offer);
    return res;
}

export async function getOfferDetails(offerId) {
    const res = await api.get(endpoints.getById+ offerId);
    return res;
}

export async function editOffer(offerId, offer) {
    const res = await api.put(endpoints.getById+ offerId, offer);
    return res;
}

export async function deleteOffer(offerId) {
    const res = await api.del(endpoints.getById+ offerId);
    return res;
}

export async function applyForOffer(application) {
    const res = await api.post(endpoints.addApp, application);
    return res;
}

export async function getAllApplications(offerId) {
    const res = await api.get(endpoints.totalApps(offerId));
    return res;
}

export async function getSpecUserApp(offerId,userId) {
    const res = await api.get(endpoints.userApp(offerId, userId));
    return res;
}