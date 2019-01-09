<template>
    <div>
        <screen-wheel ref="screen"></screen-wheel>
    </div>
</template>

<script>
    import screenWheel from '../components/screenC/screenWheel';
    export default {
        data(){
            return{
                offsetTop: 0
            }
        },
        components:{
            screenWheel
        },
        beforeRouteEnter (to, from, next) {
           next(vm => {
               vm.offsetTop = vm.$store.state.scroll.top;
           });
        },
        beforeRouteLeave(to,from,next){
            this.$refs.screen.getOffset();
            next();
        },
        mounted(){
            document.body.style.overflow = 'hidden';
        }
    }
</script>

<style scoped>
/*    body{
        overflow: hidden!important;
    }*/
</style>