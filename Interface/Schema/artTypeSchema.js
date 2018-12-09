const {Schema} = require('./config');

/*文章类型Schema type：类型*/
const artTypeSchema = new Schema({
    type:String
},{
    versionKey:false
});

module.exports = artTypeSchema;