const host = 'http://localhost:3030'

async function request(method, url, payload) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (payload !== undefined) {
        options['body'] = JSON.stringify(payload)
    }

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const res = await fetch(host + url, options);

        if(!res.ok) {
            if(res.status === 403) {
                sessionStorage.removeItem('user');
            }
            const error = await res.json()
            throw new Error(error.message)
        }

        if(res.status === 204){
            return res
        } else {
            const data = await res.json()
            return data;
        }


    } catch (err) {
        alert(err)
        throw err;
    }


}
const get = request.bind(null,'GET')
const post = request.bind(null,'POST')
const put = request.bind(null,'PUT')
const del = request.bind(null,'DELETE')

export {
    get,
    post,
    put,
    del
}