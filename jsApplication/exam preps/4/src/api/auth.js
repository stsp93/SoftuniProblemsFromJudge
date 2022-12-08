export function saveUserSession(user) {
    sessionStorage.setItem('user',JSON.stringify(user))
}

export function getUser() {
    const user = JSON.parse(sessionStorage.getItem('user')) 
    return user
}

export function removeUserSession() {
    sessionStorage.removeItem('user');
}