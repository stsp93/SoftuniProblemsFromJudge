const parseError = (error) => error?.message || error
const handleMongooseError = (error) => {
    if (error.code === 11000) {
        const path = Object.keys(error.keyPattern)[0]
        const normalizedPath = path.slice(0,1).toUpperCase() + path.slice(1);
        throw new Error(`${normalizedPath} already exist`);
    }
    if(error.errors) {
        throw new Error(Object.values(error.errors).join('<br>'));
    }

    throw new Error(error.message)
}

module.exports = {
    parseError,
    handleMongooseError
}

