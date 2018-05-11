const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const projectMemberSchema = Schema({
    developer: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['developer', 'tester', 'executive', 'scrum-master', 'product-owner']
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
                    histories: [{ type: Schema.Types.ObjectId, ref: "History" }]
                }
            },
            releaseBacklog: {
                type: {
                    histories: [{ type: Schema.Types.ObjectId, ref: "History" }]
                }
            },
            sprints: {
                type: [{
                    sprintBacklog: {
                        type: [{ type: Schema.Types.ObjectId, ref: "History" }]
                    },
                    todo: {
                        type: [{ type: Schema.Types.ObjectId, ref: "History" }]
                    },
                    doing: {
                        type: [{ type: Schema.Types.ObjectId, ref: "History" }]
                    },
                    done: {
                        type: [{ type: Schema.Types.ObjectId, ref: "History" }]
                    },
                   
                }]
            }
        }
    }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', schema);