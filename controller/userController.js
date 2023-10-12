const {User, Thought} = require('../models');

const userController = {
    //get all users
    async getAllUsers(req, res) { 
        try {
            const userDBData = await User.find()
            .select('-__v') 
            res.json(userDBData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //get one user
    async getSingleUser(req, res) { 
        try {
        const userDBData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
  
        if (!userDBData) {
            return res.status(404).json({        message: 'user not found' });
            }  
            res.json(userDBData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //create new user
    async createUser(req, res) { 
        try {
            const userDBData = await User.create   (req.body);
            res.json(userDBData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        } 
    },

    //update user
    async updateUser(req, res) { 
        try {
            const userDBData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        );
  
        if (!userDBData) {
            return res.status(404).json({ message: 'user not found' });
        }
  
            res.json(userDBData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
  
module.exports = userController;
