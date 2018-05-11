const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const mongoosePaginate = require('mongoose-paginate');

const schema = Schema({
    narrative: {
        how: {
            type: String
        },
        want: {
            type: String
        },
        way: {
            type: String
        }
    },
    criteria: {
        given: {
            type: String
        },
        when: {
            type: String
        },
        then: {
            type: String
        }
    },
    size: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});

//schema.plugin(mongoosePaginate);

module.exports = mongoose.model('History', schema);