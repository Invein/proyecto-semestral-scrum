const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const schema = Schema({
    fullName: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date
    },
    curp: {
        type: String
    },
    rfc: {
        type: String
    },
    address: {
        type: String
    },
    skills: {
        type: [{
            name: {
                type: String,                
            },
            rank: {
                type: String,
                enum: ['junior', 'senior', 'master']
            }
        }]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);