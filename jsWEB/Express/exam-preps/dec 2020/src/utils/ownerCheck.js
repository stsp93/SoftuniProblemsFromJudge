module.exports = function isOwnerCheck(userId, ownerId) {;
    if(!userId.equals(ownerId)) throw new Error('You don\'t have permission to do that');
    return true
}