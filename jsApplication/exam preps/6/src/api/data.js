import * as api from './api.js';

const endpoints = {
    getAll: '/data/games?sortBy=_createdOn%20desc',
    getRecent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    create:'/data/games',
    getById: '/data/games/',
    loadComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    createComment: '/data/comments',

}

export async function getAllGames() {
    const res = await api.get(endpoints.getAll);
    return res;
}

export async function getRecentGames() {
    const res = await api.get(endpoints.getRecent);
    return res;
}

export async function createGame(newGame) {
    const res = await api.post(endpoints.create, newGame);
    return res;
}

export async function getDetails(gameId) {
    const res = await api.get(endpoints.getById + gameId);
    return res;
}

export async function editGame(gameId,newGame) {
    const res = await api.put(endpoints.getById + gameId, newGame);
    return res;
}

export async function deleteGame(gameId) {
    const res = await api.del(endpoints.getById + gameId);
    return res;
}

export async function getAllComments(gameId) {
    const res = await api.get(endpoints.loadComments(gameId));
    return res;
}

export async function postNewComment(newComment) {
    const res = await api.post(endpoints.createComment, newComment);
    return res;
}