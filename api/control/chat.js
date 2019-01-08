const nameArr = [];

exports.chatName = async (ctx) => {
    const data = ctx.request.body;
    /*控制名字不重复 暂时不完成*/
    nameArr.push(data.name);
    ctx.session.chatName = data.name;
    ctx.body = {
        session:ctx.session
    }
};

exports.sessionChatName = async (ctx) => {
    if(ctx.session.isNew){
        return ctx.body = {
            status : 0,
        }
    }
    ctx.body = {
        status : 1,
        session:ctx.session
    }
};

exports.newChat = class {
    constructor(){
        const server = require('../app');

        this.io = require('socket.io')(server,{
            path: '/chat',
        });
    }
    chat(){
        this.io.on('connection', socket => {
            socket.on('chat message', msg => {
                this.io.emit('chat message',msg);
            });
        });
    }
};