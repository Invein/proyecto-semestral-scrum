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
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});

const schema = Schema({
    name: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    description: {
        type: String
    },
    teamMembers: {
        type: [projectMemberSchema]
    },
    scrum: {
        type: {
            productBacklog: {
                type: {
                    histories: [historySchema]
                }
            },
            releaseBacklog: {
                type: {
                    histories: [String]
                }
            },
            sprints: {
                type: [{
                    sprintBacklog: {
                        type: {
                            histories: [String]
                        }
                    },
                    todo: {
                        type: {
                            histories: [String]
                        }
                    },
                    doing: {
                        type: {
                            histories: [String]
                        }
                    },
                    done: {
                        type: {
                            histories: [String]
                        }
                    }
                }]
            }
        }
    }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', schema);