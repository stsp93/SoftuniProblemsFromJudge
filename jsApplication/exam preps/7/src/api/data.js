import * as api from './api.js';

const endpoints = {
    getAll: '/data/memes?sortBy=_createdOn%20desc',
    getById: '/data/memes/',
    getUser:(userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes'
}


export async function createMeme(meme) {
    const res = await api.post(endpoints.create, meme);
    return res;
}

export async function getAllMemes(meme) {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function getDetails(memeId) {
    const res = await api.get(endpoints.getById + memeId);
    return res;
}

export async function editMeme(memeId, meme) {
    const res = await api.put(endpoints.getById + memeId,meme);
    return res;
}

export async function deleteMeme(memeId) {
    const res = await api.del(endpoints.getById + memeId);
    return res;
}

export async function getUserMemes(userId) {
    const res = await api.get(endpoints.getUser(userId));
    return res;
}