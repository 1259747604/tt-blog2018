<template>
    <div class="container" style="font-size: 20px">
        建设中.......
        <!--<div class="inpName" v-if="!show">
            <p>输入一个昵称可进入聊天室:</p>
            <input type="text" v-model="name">
            <Button @click="submitName">→</Button>
        </div>
        <div class="chat" v-if="show">
            <ul id="messages"></ul>
            <textarea  id="m" cols="80" rows="1"></textarea>
            <button id="send">
                <Icon type="ios-paper-plane-outline" />
                <span>Send</span>
            </button>
        </div>-->
    </div>
</template>

<script>
    /*存在bug 管理员和聊天session会冲突 暂不予解决*/
    import io from 'socket.io-client';
    export default {
        data() {
            return {
                show: false,
                name: '',
                session: '',
                socket: ''
            }
        },
        created(){
            // this.getSession();

        },
        destroyed(){
            /*销毁时关闭*/
            /*if(this.socket.close){
                this.socket.close();
            }*/
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
            handshake: function () {
                this.socket = io('http://localhost:3000', {
                    path: '/chat',
                });
                this.send();
                this.receive();
            },
            send(){
                /*发送数据*/
                this.$('#send').click(async () => {
                    const status = await this.isStatus();
                    /*session没过期可发送*/
                    if (status) {
                        if (this.$('#m').val().trim() !== "") {
                            const data = {
                                msg: this.$('#m').val(),
                                name: this.session
                            };
                            this.socket.emit('chat message', data);
                            this.$('#m').val('');
                        }
                    }
                    else {
                        console.log('过期')
                        /*过期后续操作暂不完成*/
                    }
                    return false;
                });
            },
            cssOne(name,msg){
                /*聊天样式*/
                const oLi = document.createElement('li');
                const oP = document.createElement('p');
                const oSpan = document.createElement('span');
                const oI = document.createElement('i');
                oP.innerHTML = `${msg.msg}`;
                oSpan.innerHTML = `${name}`;
                this.$(oP).css({
                    position: 'relative',
                    display:'inline-block',
                    marginLeft: '5px',
                    padding: '3px 15px',
                    maxWidth:'300px',
                    background:'rgba(189,202,212,0.5)',
                    borderRadius: '5px',
                    verticalAlign: 'top',
                    fontSize: '15px',
                    wordBreak: 'normal',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-warp',
                });
                this.$(oI).css({
                    position: 'absolute',
                    top:'2px',
                    left: '-9px',
                    border: '5px solid transparent',
                    borderRight: '5px solid rgba(189,202,212,0.5)',
                });
                this.$(oSpan).css({fontSize:'16px'});
                this.$(oLi).css({padding:'15px 0 0 15px'});
                oLi.appendChild(oSpan);
                oP.appendChild(oI);
                oLi.appendChild(oP);
                return oLi;
            },
            cssTwo(name,msg){
                /*聊天样式*/
                const oLi = document.createElement('li');
                const oP = document.createElement('p');
                const oSpan = document.createElement('span');
                const oI = document.createElement('i');
                oP.innerHTML = `${msg.msg}`;
                oSpan.innerHTML = `${name}`;
                this.$(oP).css({
                    position: 'relative',
                    display:'inline-block',
                    marginRight: '5px',
                    padding: '3px 15px',
                    maxWidth:'300px',
                    background:'#49afcf',
                    borderRadius: '5px',
                    verticalAlign: 'top',
                    fontSize: '15px',
                    wordBreak: 'normal',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-warp',
                    textAlign: 'left'
                });
                this.$(oI).css({
                    position: 'absolute',
                    top:'2px',
                    right: '-9px',
                    border: '5px solid transparent',
                    borderLeft: '5px solid #49afcf',
                });
                this.$(oSpan).css({fontSize:'16px'});
                this.$(oLi).css({padding:'15px 15px 0 15px',
                    textAlign: 'right'
                });
                oP.appendChild(oI);
                oLi.appendChild(oP);
                oLi.appendChild(oSpan);
                return oLi;
            },
            receive(){
                /*接收广播*/
                this.socket.on('chat message', (msg) => {
                    const name = msg.name === this.session ? '我' : msg.name;
                    let oLi;
                    if(name === '我'){
                        oLi = this.cssTwo(name,msg);
                    }
                    else{
                        oLi = this.cssOne(name,msg);
                    }

                    this.$('#messages')[0].appendChild(oLi);
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
    textarea{
        margin-left: 5px;
        height: 40px;
        resize: none;
        vertical-align: middle;
        font-size: 18px;
        border: none;
        outline: none;
    }
    #send{
        margin-left: 15px;
        width: 120px;
        height: 40px;
        border: 1px solid #49afcf;
        background: none;
        outline: none;
        font-size: 18px;
        transform: translateY(5px);
        transition: 500ms;
    }
    #send:hover{
        box-shadow: 0 0 30px #49afcf inset;
    }
    .chat{
        width: 900px;
        height: 600px;
        border: 1px solid #dbe8f4;
    }
    .chat ul{
        padding-bottom: 10px;
        width: 100%;
        height: 550px;
        border-bottom: 1px solid #dbe8f4;
        list-style: none;
        /*overflow-y: auto;*/
    }
</style>