module.exports = function isOwnerCheck(ownerId = 'id1', userId = 'id2') {
    return ownerId.toString() === userId.toString()
}