
const mongoose = require('mongoose');

const codeBlockData = mongoose.model('codeblocks', {
    title: {
        type: String
    },
    code: {
        type: String 
    },
    answer: {
        type: String
    },
    codeId: {
        type: String
    },
    guildLines: {
        type: String 
    }
},'codeblocks');

module.exports = codeBlockData;