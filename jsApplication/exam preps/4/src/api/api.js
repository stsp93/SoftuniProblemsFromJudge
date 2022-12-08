import { getUser,removeUserSession } from "./auth.js"

const host = 'http://localhost:3030'

async function request(method, url, payload) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(getUser()) {
        const token = getUser().accessToken;
        options.headers['X-Authorization'] = token
    }
    if(payload !== undefined) {
        options['body'] = JSON.stringify(payload)
    }

    try {
        const res = await fetch(host+url,options);

        if(!res.ok) {
            const error = await res.json();
            if(res.status === 403) {
                removeUserSession();
            }
            throw new Error(error.message)
        }

        if(res.status === 204) {
            return res;
        } 

        return await res.json()

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del
}