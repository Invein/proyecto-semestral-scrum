const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const projectMemberSchema = Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['developer', 'tester', 'executive', 'scrum-master', 'product-owner']
    }
});

const historySchema = Schema({
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
        type: String
    },
    priority: {
        type: String
    }
});

const schema = Schema({
    name: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teamMembers: {
        type: [projectMemberSchema]
    },
    productBacklog: {
        type: [historySchema]

    },
    releaseBacklog: {
        type: [historySchema]
    },
    sprints: {
        type: [{
            sprintBacklog: {
                type: {
                    histories: [historySchema]
                }
            },
            todo: {
                type: {
                    histories: [historySchema]
                }
            },
            doing: {
                type: {
                    histories: [historySchema]
                }
            },
            done: {
                type: {
                    histories: [historySchema]
                }
            }
        }]
    }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', schema);