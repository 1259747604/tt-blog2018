<template>
    <div>
        <div class="personal" v-if="role">
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
    import sidelNav from './personalComponents/Sidernav';

    export default {
        name: "personal",
        components:{
            sidelNav
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$router.push('/personal/artManage');
            })
        },
        computed:{
            role(){
                const role = this.$store.state.session.role;
                if(role === "666"){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>

</style>