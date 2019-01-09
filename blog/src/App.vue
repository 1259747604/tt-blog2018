<template>
    <div id="app">
        <div class="affix">
            <Affix>
                <Row>
                    <Col span="20">
                    <h-nav></h-nav>
                    </Col>
                    <Col span="4">
                    <l-btn v-if="showBtn"></l-btn>
                    <per-btn v-else></per-btn>
                    </Col>
                </Row>
            </Affix>
        </div>
        <router-view/>
    </div>
</template>

<script>
    /*头部导航*/
    import hNav from "./components/nav/hnva";
    /*登录按钮*/
    import lBtn from './components/btn/loginbtn';
    /*个人中心 退出按钮*/
    import perBtn from './components/btn/personalbtn';

    export default {
        name: 'App',
        components:{
            hNav,
            lBtn,
            perBtn
        },
        created(){
            /*获取session*/
            this.getsession();
        },
        methods:{
            getsession(){
                this.$axios.post('/loginstatus')
                    .then(data => {
                        /*获取状态*/
                        const status = data.data.keepStatus;

                        if(status === 200){
                            const session = data.data.session;
                            this.$store.commit('getSession',session);
                            this.$store.commit('changeSessionIsNew',false);
                        }
                        else{
                            this.$store.commit('changeSessionIsNew',true);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        computed:{
            showBtn(){
                if(!this.$store.state.sessionIsNew && this.$store.state.session.role === '666'){
                    return false;
                }
                return true;
                // return this.$store.state.sessionIsNew;
            },
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .affix > div > div:nth-child(1){
        z-index: 1000;
    }
</style>
