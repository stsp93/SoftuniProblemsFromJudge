import * as api from './api.js';

const endpoints = {
    allSorted: '/data/shoes?sortBy=_createdOn%20desc',
    addNew: '/data/shoes',
    details: '/data/shoes/',
    searchShoes: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
}

export async function getAllShoes() {
    const data = await api.get(endpoints.allSorted);
    return data;
}

export async function addNewItem(newItem) {
    const data = await api.post(endpoints.addNew, newItem);
    return data;
}

export async function getDetails(id) {
    const data = await api.get(endpoints.details + id);
    return data;
}

export async function editItem(id, editedItem) {
    const data = await api.put(endpoints.details + id, editedItem);
    return data;
}

export async function deleteItem(id) {
    const data = await api.del(endpoints.details + id);
    return data;
}

export async function getSearch(query) {
    const data = await api.get(endpoints.searchShoes(query));
    return data;
}