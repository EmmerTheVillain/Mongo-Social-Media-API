const {Schema, model} = require('mongoose');

//userDB mongoose database
const userDB = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Must be an Email address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
        
    },
    { toJSON:{virtuals: true}, id: false,
});

userDB.virtual('friendCount').get(function (){
    return this.friends.length;
});

const User = model('User', userDB);
module.exports = User;