<template>
    <div class="container">
        <div class="step">
            <Steps :current="current">
                <Step title="原密码" content="这里是输入原密码"></Step>
                <Step title="新密码" content="这里是输入新密码"></Step>
                <Step title="确认密码" content="这里再次输入新密码"></Step>
            </Steps>
        </div>
        <div class="inp" v-if="current === 0">
            <span>原始密码:</span>
            <Input type="password" v-model="initV" placeholder="Enter ..." style="width: 300px" @on-enter="nextOne"/><br/>
            <Button @click="nextOne">下一步</Button>
        </div>
        <div class="inp" v-else-if="current === 1">
            <span>新密码:</span>
            <Input type="password" v-model="newV" placeholder="Enter ..." style="width: 300px" @on-enter="nextTwo"/><br/>
            <Button @click="nextTwo">下一步</Button>
            <Button type="info" @click="preOne">上一步</Button>
        </div>
        <div class="inp" v-else>
            <span>确认密码:</span>
            <Input type="password" v-model="conV" placeholder="Enter ..." style="width: 300px" @on-enter="submit"/><br/>
            <Button type="success" @click="submit">确 认</Button>
            <Button type="info" @click="preOne">上一步</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
            return {
                current:0,
                initV:'',
                newV:'',
                conV:''
            }
        },
        methods:{
            nextOne(){
                const v = this.initV.trim();
                if(!v){
                    return this.$Message.error({
                        content:'你还没输密码！'
                    })
                }
                this.$axios({
                    url: '/initPwd',
                    method: 'post',
                    data:{pwd:v}
                })
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        const status = data.data.status;
                        if(status){
                            return this.current = 1
                        }
                        return this.$Message.error({
                            content:'输入密码不正确！'
                        })
                    })
                    .catch(err => console.log(err));
            },
            preOne(){
                this.current--;
            },
            nextTwo(){
                const pwd = /^.*(?=.{6,16})(?=.*\d+)(?=.*[a-z]+).*$/;
                const v = this.newV.trim();
                if(!v){
                    return this.$Message.error({
                        content: '你没输密码啊'
                    })
                }
                else if(!pwd.test(v)){
                    return this.$Message.error({
                        content: '输入密码不合规'
                    })
                }
                this.current = 2;
            },
            submit(){
                const v = this.conV.trim();
                if(!v){
                    return this.$Message.error({
                        content: '你还没输入密码'
                    })
                }
                else if(v !== this.newV){
                    return this.$Message.error({
                        content: '两次输入密码不相同'
                    })
                }
                this.$axios.post('/newPwd',{v})
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        const status = data.data.status;
                        if(status){
                            const _this = this;
                            this.$Message.success({
                                content: '密码更新成功',
                                onClose(){
                                    _this.current = 0;
                                    _this.initV = '';
                                    _this.newV = '';
                                    _this.conV = '';
                                }
                            })
                        }
                        else{
                            this.$Message.error({
                                content: '更新失败'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>
    .container{
        padding: 20px;
    }
    /*深度选择器*/
    .container > .step > div >>> span{
        color: #00a1d6;
    }
    .step > div > div >>> div{
        background: #f5f7f9!important;
    }
    .step{
        margin-left: 260px;
    }
    .inp{
        margin: 200px;
        text-align: center;
    }
    .inp span{
        font-size: 18px;
        vertical-align: middle;
    }
    .inp button{
        margin-top: 20px;
    }
    .inp button:nth-of-type(2){
        margin-left: 20px;
    }
</style>