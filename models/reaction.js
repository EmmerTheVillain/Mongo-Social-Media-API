const {Schema, Types} = require('mongoose');

//mongoose db for reactions
const reactionDB = new Schema({
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280
        },
        username:{
            type: String,
            required: true,
        },
    },  
    {toJSON:{getters: true}, id:false
});

module.exports = reactionDB