<template>
    <div>
        <screen-wheel></screen-wheel>
    </div>
</template>

<script>
    import screenWheel from '../components/screenC/screenWheel';
    export default {
        name: "",
        components:{
            screenWheel
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