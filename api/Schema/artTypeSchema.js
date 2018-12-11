const {Schema} = require('./config');

/*文章类型Schema 类型 类型数量*/
const artTypeSchema = new Schema({
    type:String,
    count:{
        type: Number,
        default: 0
    }
},{
    versionKey:false
});

module.exports = artTypeSchema;