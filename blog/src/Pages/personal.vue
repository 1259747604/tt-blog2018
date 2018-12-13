<template>
    <div>
        <div class="personal" v-if="roleAndStatus">
            <Layout>
                <Sider hide-trigger breakpoint="md">
                    <sidel-nav></sidel-nav>
                </Sider>
                <Layout>
                    <Content>
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </div>
        <div v-else>
            <Alert type="error">
                当前权限不足
                <span slot="desc">
                    请联系管理员.
                </span>
            </Alert>
        </div>
    </div>
</template>

<script>
    /*侧边导航*/
    import sidelNav from '../components/nav/Sidernav';

    export default {
        name: "personal",
        data(){
            return {
                status:1
            }
        },
        components:{
            sidelNav
        },
        created(){
            this.getStatus();
        },
        methods:{
            getStatus(){
                /*得到当前用户状态*/
                this.$axios.get('/status')
                    .then(data => {
                        this.status = data.data.keepStatus;
                        if(this.status === 200){
                            return this.$store.commit('changeSessionIsNew',false);
                        }
                        return this.$store.commit('changeSessionIsNew',true);
                    })
                    .catch(err => {
                        return this.$store.commit('changeSessionIsNew',true);
                    });
            }
        },
        computed:{
            roleAndStatus(){
                const role = this.$store.state.session.role;
                if(role === "666" && !this.$store.state.sessionIsNew){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>

</style>