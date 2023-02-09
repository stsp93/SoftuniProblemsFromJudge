const isOwnerCheck = function (ownerId, userId) {
    return ownerId.toString() === userId.toString()
}

module.exports = isOwnerCheck