// routes for user
const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
} = require('../../controller/userController');

    router.route('/').get(getAllUsers).post(createUser);
    router.route('/:userId').get(getSingleUser).put(updateUser);
module.exports = router;
