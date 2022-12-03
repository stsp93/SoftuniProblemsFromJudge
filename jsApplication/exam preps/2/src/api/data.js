import * as api from './api.js';

const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    getDetails: '/data/albums/',
    edit: '/data/albums/',
    delete: '/data/albums/',
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
}

export async function getAllRecords() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function createNew(newItem) {
    const res = await api.post(endpoints.create, newItem);
    return res;
}

export async function getAlbumDetails(id) {
    const res = await api.get(endpoints.getDetails + id);
    return res;
}

export async function editItem(id,newItem) {
    const res = await api.put(endpoints.edit + id, newItem);
    return res;
}

export async function deleteItem(id) {
    const res = await api.del(endpoints.delete + id);
    return res;
}

export async function searchItems(query) {
    const res = await api.get(endpoints.search(query));
    return res;
}