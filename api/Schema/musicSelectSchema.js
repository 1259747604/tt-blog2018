const {Schema} = require('./config');
const ObjectId = Schema.Types.ObjectId;

const musicSSchema = new Schema({
    selectName: {
        type: ObjectId,
        ref: 'musics'
    }
},{
    versionKey: false
});

module.exports = musicSSchema;