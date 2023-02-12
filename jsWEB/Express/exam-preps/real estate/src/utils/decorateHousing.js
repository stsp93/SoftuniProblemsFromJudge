const isOwnerCheck = require('../utils/ownerCheck')

module.exports = (housing, userId) => {
    housing = housing.toObject()
    housing.isRented = housing.usersRenting.some(u => u._id.equals(userId));
    housing.isOwner = isOwnerCheck(housing.owner?._id, userId);

    return housing
}