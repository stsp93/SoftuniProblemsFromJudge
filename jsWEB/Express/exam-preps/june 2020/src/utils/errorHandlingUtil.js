const handleError = (error) => ({error: error.message})
const handleMongooseError = (error) => {throw new Error(Object.values(error.errors).join('<br>'))}

module.exports = {
    handleError,
    handleMongooseError
}