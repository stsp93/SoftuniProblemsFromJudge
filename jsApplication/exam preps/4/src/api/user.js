import * as api from './api.js';
import { removeUserSession,saveUserSession } from './auth.js';

const endpoints = {
    'register' : '/users/register',
    'login' : '/users/login',
    'logout' : '/users/logout',
}

export async function login(username, password) {
    const res = await api.post(endpoints.login,{username, password});
    saveUserSession(res)
    return res;
}

export async function register(username, password) {
    const res = await api.post(endpoints.register,{username, password});
    saveUserSession(res)
    return res;
}

export async function logout() {
    const res = await api.get(endpoints.logout);
    removeUserSession();
    return res;
}