const {Schema} = require("./config");

const userSchema = new Schema({
    username:String,
    password:String,
    avatar:{
        type:String,
        default:"/avatar/1.jpeg"
    },
    role:{
        type:String,
        default:"1"
    },
    articleNum:{
        type:Number,
        default:0
    },
},{
    versionKey:false
});

module.exports = userSchema;