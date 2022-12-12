import * as api from './api.js';

const endpoints = {
    getAll: `/data/pets?sortBy=_createdOn%20desc&distinct=name`,
    create: '/data/pets',
    getById: '/data/pets/',
    donate: '/data/donation',
    getAllDonations: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    getUserDonation: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export async function getAllPets() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function create(newPet) {
    const res = await api.post(endpoints.create, newPet);
    return res;
}

export async function getDetails(petId) {
    const res = await api.get(endpoints.getById + petId);
    return res;
}

export async function editPet(petId, newPet) {
    const res = await api.put(endpoints.getById + petId, newPet);
    return res;
}

export async function deletePet(petId) {
    const res = await api.del(endpoints.getById + petId);
    return res;
}

export async function addDonation(donation) {
    const res = await api.post(endpoints.donate, donation);
    return res;
}

export async function getDonationCount(petId) {
    const res = await api.get(endpoints.getAllDonations(petId));
    return res;
}

export async function getUserSpecDonation(petId,userId) {
    const res = await api.get(endpoints.getUserDonation(petId,userId));
    return res;
}