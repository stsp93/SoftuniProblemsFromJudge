function reqValidator(obj) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const uriPattern = /^[\w.]+$/g;
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0']
    const specChars = `<>\\&'"`.split('');

    if (!methods.includes(obj.method)) {
        throw Error('Invalid request header: Invalid Method');
    };
    if (!obj.hasOwnProperty('uri')) {
        throw Error('Invalid request header: Invalid URI');
    };
    if (obj.uri !== '*' && !obj.uri.match(uriPattern)) {
        throw Error('Invalid request header: Invalid URI');
    };
    if (!versions.includes(obj.version)) {
        throw Error('Invalid request header: Invalid Version');
    };
    if (!obj.hasOwnProperty('message')) {
        throw Error('Invalid request header: Invalid Message');
    };
    for (let char of specChars) {
        if (obj.message.includes(char)) {
            throw Error('Invalid request header: Invalid Message');
        };
    };
    return obj;
}
console.log(reqValidator({
    method: 'GET',
    uri: 'asdasd',
    version: 'HTTP/1.1',
    message: ''
}



));
