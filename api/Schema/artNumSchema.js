const {Schema} = require('./config');

const artNumSchema = new Schema({
    year:Number,
    count:{
        type:[Number],
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
}
,{
    versionKey:false,
    });

module.exports = artNumSchema;