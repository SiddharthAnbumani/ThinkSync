const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now,
        required: true
    },
    content:{
        type: String,
        required:true
    },
    author:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Entry = mongoose.model('Entry', EntrySchema)
module.exports = Entry;
