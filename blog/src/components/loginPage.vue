<template>
    <div class="loginpage">
        <Row>
            <Col span="6" offset="9">
            <Card>
                <p slot="title" class="title">登录</p>
                <div class="input">
                    用户：
                    <Input prefix="ios-contact" placeholder="请输入用户名" v-model="username" @on-enter="enterit" style="width: auto"/>
                </div>
                <div class="input">
                    密码：
                    <Input prefix="logo-wordpress" placeholder="请输入密码" type="password" v-model="password" @on-enter="enterit" style="width: auto" />
                </div>
                <div class="input">
                    <Button type="primary" shape="circle" style="width: 120px" @click="clickit">登录</Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "loginpage",
        data(){
            return{
                username:"",
                password:"",
            }
        },
        methods:{
            clickit(){
                if(this.username === ""){
                    return this.$Message.error({
                        content:"用户名不能为空"
                    });
                }
                else if(this.password === ""){
                    return this.$Message.error({
                        content:"密码不能为空"
                    });
                }
                /*都不为空提交数据*/
                this.$axios.post(`/login`,{
                    username:this.username,
                    password:this.password
                })
                    .then(data => {
                        if(data.data.status){
                            /*获取值 设置session到vuex*/
                            const session = data.data.session;

                            this.$store.commit('getSession',session);
                            this.$store.commit('changeStatus',true);
                            this.$router.push('/');
                        }else{
                            this.$Message.error({
                                content: data.data.msg
                            });
                        }
                    })
                    .catch(err => {
                        this.$Message.error({
                            content:"登录失败"
                        });
                    });
            },
            enterit(){
                this.clickit();
            }
        }
    }
</script>

<style scoped>
    .loginpage{
        margin-top: 200px;
    }
    p{
        text-align: center;
    }
    .input{
        margin-bottom: 20px;
        text-align: center;
    }
    .title{
        font-size: 20px;
        color: #2db7f5;
    }
</style>