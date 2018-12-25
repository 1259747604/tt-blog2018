<template>
    <div>
        打字机
        <h1>{{selectV}}</h1>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                selectV: ''
            }
        },
        created(){
            this.getName();
        },
        methods:{
            getName(){
                this.$axios.get('/musicName')
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        if(data.data.data.length !== 0){
                            this.selectV = data.data.data[0].selectName.name;
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    div{
        font-size: 30px;
        font-family: '华文行楷';
    }
</style>