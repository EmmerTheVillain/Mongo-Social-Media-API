const {Schema, model} = require('mongoose');
const reactionDB = require('./reaction');

//create thought mongo DB
const thoughtDB = new Schema({
    thoughtText: {
            type: String,
            required: 'Input required!',
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionDB]
    },
    {toJSON:{getters: true}, id: false
});

thoughtDB.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtDB);
module.exports = Thought;