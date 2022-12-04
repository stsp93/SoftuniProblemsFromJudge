import * as api from './api.js';
import { getUser } from './auth.js';

const endpoints = {
    getAll:'/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create:'/data/theaters',
    details:'/data/theaters/',
    edit:'/data/theaters/',
    delete:'/data/theaters/',
    profile: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    addLike:'/data/likes',
    totalLikes:(theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    specLike: (theaterId, userId) =>`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllTheaters() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function createTheater(newItem) {
    const res = await api.post(endpoints.create, newItem);
    return res;
}

export async function getById(id) {
    const res = await api.get(endpoints.details + id);
    return res;
}

export async function editTheater(id,newItem) {
    const res = await api.put(endpoints.edit + id,newItem);
    return res;
}

export async function deleteTheater(id) {
    const res = await api.del(endpoints.delete + id);
    return res;
}

export async function getProfile(userId) {
    const res = await api.get(endpoints.profile(userId));
    return res;
}

export async function addLikeTheater(like) {
    const res = await fetch(endpoints.addLike , {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': getUser().accessToken,
        },
        body: like
    });
    return res;
}

export async function getLikeCount(theaterId) {
    const res = await api.get(endpoints.totalLikes(theaterId));
    return res;
}

export async function getUserLike(theaterId,userId) {
    const res = await api.get(endpoints.specLike(theaterId,userId));

    return res;
}