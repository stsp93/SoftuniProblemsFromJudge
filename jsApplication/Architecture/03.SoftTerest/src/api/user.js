import * as api from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}

export async function register(email, password) {
    const res = await api.post(endpoints.register, { email, password });
    sessionStorage.setItem('user', JSON.stringify(res))
}

export async function login(email, password) {
    const res = await api.post(endpoints.login, { email, password });
    sessionStorage.setItem('user', JSON.stringify(res))
}

export function logout() {
    const res = api.get(endpoints.logout);
    sessionStorage.removeItem('user')
}