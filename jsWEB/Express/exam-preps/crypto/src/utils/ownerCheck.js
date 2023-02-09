module.exports = function isOwnerCheck(ownerId, userId = '') {
    return ownerId.toString() === userId.toString()
}