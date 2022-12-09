import * as api from './api.js';
import { getUser } from './auth.js';

const endpoints = {
    getAll:'/data/books?sortBy=_createdOn%20desc',
    add:'/data/books',
    getById: '/data/books/',
    getMy:(userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    postLike:'/data/likes',
    getLikeCount:(bookId)  => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    getSpecLike : (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllBooks() {
    const res = await api.get(endpoints.getAll);
    return res
}

export async function getDetails(id) {
    const res = await api.get(endpoints.getById + id);
    return res
}

export async function editBook(id, newItem) {
    const res = await api.put(endpoints.getById + id,newItem);
    return res
}

export async function addBook(newItem) {
    const res = await api.post(endpoints.add ,newItem);
    return res
}

export async function deleteBook(id) {
    const res = await api.del(endpoints.getById + id);
    return res
}

export async function getMyBooks(id) {
    const res = await api.get(endpoints.getMy(id));
    return res
}

export async function addLike(like) {
    const res = fetch(endpoints.postLike, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': getUser().accessToken
        },
        body: JSON.stringify(like) ,
    })
    return res
}

export async function getTotalLikes(bookId) {
    const res = await api.get(endpoints.getLikeCount(bookId));
    return res
}

export async function getUserLike(bookId,userId) {
    const res = await api.get(endpoints.getSpecLike(bookId,userId));
    return res
}



