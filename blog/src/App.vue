<template>
    <div id="app">
        <Row>
            <Col span="20">
                <h-nav></h-nav>
            </Col>
            <Col span="4">
                <l-btn v-if="showBtn"></l-btn>
                <per-btn v-if="showperbtn"></per-btn>
            </Col>
        </Row>
        <router-view/>
    </div>
</template>

<script>
    /*头部导航*/
    import hNav from "./components/hnva";
    /*登录按钮*/
    import lBtn from './components/loginbtn';
    /*个人中心 退出按钮*/
    import perBtn from './components/personalbtn';

    export default {
        name: 'App',
        components:{
            hNav,
            lBtn,
            perBtn
        },
        created(){
            /*获取session*/
            this.$axios.post('/loginstatus')
                .then(data => {
                    /*获取状态*/
                    const status = data.data.status;

                    if(status){
                        const session = data.data.session;
                        this.$store.commit('getSession',session);
                        this.$store.commit('changeStatus',true);
                    }
                    else{
                        this.$store.commit('changeStatus',false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        computed:{
            showBtn(){
                return !this.$store.state.status;
            },
            showperbtn(){
                return this.$store.state.status;
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
