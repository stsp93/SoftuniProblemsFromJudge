import * as api from './api.js';
import { removeUserSession,saveUserSession } from './auth.js';

const endpoints = {
    'register' : '/users/register',
    'login' : '/users/login',
    'logout' : '/users/logout',
}

export async function login(email, password) {
    const res = await api.post(endpoints.login,{email, password});
    saveUserSession(res)
    return res;
}

export async function register(email, password) {
    const res = await api.post(endpoints.register,{email, password});
    saveUserSession(res)
    return res;
}

export async function logout() {
    const res = await api.get(endpoints.logout);
    removeUserSession();
    return res;
}