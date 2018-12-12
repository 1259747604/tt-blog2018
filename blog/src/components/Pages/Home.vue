<template>
    <div>
        <h1>{{$store.state.session}}</h1>
        <canvas width="700" height="500"></canvas>
        <video autoplay = "autoplay" loop controls src="blob:https://www.bilibili.com/42bc2494-c4c2-4131-9b65-9c86c5c65ba4"></video>
    </div>
</template>

<script>
    export default {
        name: "",
        mounted(){
            const cxt = document.getElementsByTagName("canvas")[0].getContext("2d");
            const ov = document.querySelector("video");

            play();
            function play() {
                cxt.drawImage(ov,0,0,700,500);
                requestAnimationFrame(play);
            }
        }
    }
</script>

<style scoped>
    canvas{
        display: block;
        margin: 200px auto;
        border: 1px solid #ddd;
    }
</style>