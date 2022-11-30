import * as api from './api.js';

const endpoints = {
    'allFurniture': '/data/catalog',
    'byId': '/data/catalog/'
}

export async function create(payload) {
    const data = await api.post(endpoints.allFurniture, payload)
    return data;
}

export async function getAll() {
    const data = await api.get(endpoints.allFurniture)
    return data;
}

export async function getById(id) {
    const data = await api.get(endpoints.byId + id)
    return data;
}

export async function edit(id, payload) {
    const data = await api.put(endpoints.byId + id, payload)
    return data;
}

export async function deleteItem(id) {
    const data = await api.del(endpoints.byId + id);
    console.log(data);
    return data;
}