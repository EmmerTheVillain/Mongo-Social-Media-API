// routes for user
const router = require('express').Router();
const { userController } = require('../../controllers');

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:userId').get(userController.getSingleUser).put(userController.updateUser).delete(userController.deleteUser);

module.exports = router;