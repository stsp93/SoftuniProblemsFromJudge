import * as api from './api.js';

const endpoints = {
    getAll:'/data/posts?sortBy=_createdOn%20desc',
    create:'/data/posts',
    getById:'/data/posts/',
    myPosts:(userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    makeDonation:'/data/donations',
    totalDonations: (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    
    userDonation:(postId,userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllPosts() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function createPost(newPost) {
    const res = await api.post(endpoints.create, newPost);
    return res;
}

export async function getDetails(postId) {
    const res = await api.get(endpoints.getById + postId);
    return res;
}

export async function editPost(postId, newPost) {
    const res = await api.put(endpoints.getById + postId,newPost);
    return res;
}

export async function deletePost(postId) {
    const res = await api.del(endpoints.getById + postId);
    return res;
}

export async function getMyPosts(userId) {
    const res = await api.get(endpoints.myPosts(userId));
    return res;
}

export async function addDonation(donation) {
    const res = await api.post(endpoints.makeDonation,donation);
    return res;
}

export async function getTotalDonations(postId) {
    const res = await api.get(endpoints.totalDonations(postId));
    return res;
}

export async function getUserDonation(postId, userId) {
    const res = await api.get(endpoints.userDonation(postId, userId));
    return res;
}