import * as api from './api.js';

const endpoints = {
    getAllSorted: '/data/cars?sortBy=_createdOn%20desc',
    createCar: '/data/cars',
    getDetails: '/data/cars/',
    getMyListings: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    search: '/data/cars?where=year%3D'
};


export async function getAllCars() {
    const res = await api.get(endpoints.getAllSorted);
    return res;
}

export async function createCar(car) {
    const res = await api.post(endpoints.createCar, car);
    return res;
}

export async function getDetails(id) {
    const res = await api.get(endpoints.getDetails + id);
    return res;
}

export async function editCar(id, newCar) {
    const res = await api.put(endpoints.getDetails + id, newCar);
    return res;
}

export async function deleteCar(id) {
    const res = await api.del(endpoints.getDetails + id);
    return res;
}

export async function getMyCars(id) {
    const res = await api.get(endpoints.getMyListings(id));
    return res;
}

export async function getSearch(query) {
    const res = await api.get(endpoints.search + query);
    return res;
}


