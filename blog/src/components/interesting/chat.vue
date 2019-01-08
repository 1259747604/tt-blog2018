<template>
    <div class="container">
        {{session}}
        <div class="inpName" v-if="!show">
            <p>输入一个昵称可进入聊天室:</p>
            <input type="text" v-model="name">
            <Button @click="submitName">→</Button>
        </div>
        <div class="chat" v-if="show">
            <ul id="messages"></ul>
            <input id="m" autocomplete="off" /><button id="send">Send</button>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    export default {
        data() {
            return {
                show: false,
                name: '',
                session: ''
            }
        },
        mounted(){
            this.getSession();

        },
        methods:{
            getSession(){
                /*得到session*/
                this.$axios.get('/sessionChatName')
                    .then(data => {
                        if(data.data.status){
                            this.session = data.data.session.chatName;
                            this.show = true;

                            this.$nextTick(()=>{
                                this.handshake();
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            submitName(){
                const name = this.name.trim();
                if(!name){
                    return this.$Message.warning({
                        content: '没有输入昵称'
                    })
                }
                this.$axios.post('/chatName',{name})
                    .then(data => {
                        this.session = data.data.session.chatName;
                        this.show = true;

                        this.$nextTick(()=>{
                            this.handshake();
                        })
                    });
            },
            async isStatus(){
                /*获取session是否过期*/
                const status =await this.$axios.get('/sessionChatName')
                    .then(data => {
                        return data.data.status
                    })
                    .catch(err => {
                        console.log(err);
                    });

                return status;
            },
            handshake(){
                const socket = io('http://localhost:3000',{
                    path:'/chat',
                });
                /*发送数据*/
                this.$('#send').click(async () => {
                    const status = await this.isStatus();
                    /*session没过期可发送*/
                    if(status){
                        const data = {
                            msg: this.$('#m').val(),
                            name: this.session
                        };
                        socket.emit('chat message', data);
                        this.$('#m').val('');
                    }
                    else{
                        console.log('过期')
                        /*过期后续操作暂不完成*/
                    }
                    return false;
                });
                /*接收广播*/
                socket.on('chat message', (msg) => {
                    const name = msg.name === this.session ? '我' : msg.name;
                    this.$('#messages').append(this.$('<li>').text(`${name}:${msg.msg}`));
                });
            }
        }
    }
</script>

<style scoped>
    .container{
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        /*width: 800px;*/
        /*height: 500px;*/
        /*border: 1px solid;*/
    }
    .inpName p{
        margin-bottom: 70px;
        /*text-align: center;*/
        font-size: 20px;
    }
    .inpName input{
        margin-right: 15px;
        width: 300px;
        border: none;
        border-bottom: 1px solid #375e6f;
        outline: none;
        font-size: 18px;
    }
    .inpName button{
        width: 90px;
        height: 35px;
        padding: 0;
        line-height: 35px;
        vertical-align: bottom;
        background: #ffffff;
        outline: none;
        font-size: 23px;
    }
    .inpName button >>> span{
        vertical-align: initial;
    }
</style>