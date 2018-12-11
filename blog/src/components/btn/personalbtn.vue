<template>
    <div class="perBtn">
        <Row>
            <Col span="12">
                <Button :to="{name:'personal'}">个人中心</Button>
            </Col>
            <Col span="12">
                <Button @click="signOut">退出</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "perBtn",
        data () {
            return {
                theme1: 'light'
            }
        },
        methods:{
            signOut(){
                this.$axios.post("/out")
                    .then(data => {
                        /*获取状态*/
                        const status = data.data.status;
                        /*退出成功*/
                        if(status){
                            this.$store.commit('getSession',{});
                            this.$store.commit('changeSessionIsNew',true);
                            this.$router.push('/');
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .perBtn{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #dcdee2;
    }
</style>