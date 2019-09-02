<template>
    <div class="container">
        <ul>
            <li>
                <span>我</span>
            </li>
            <li>
                <div>
                    <!--<canvas class="one"></canvas>-->
                想
                </div>
            </li>
            <li>
                <span>静</span>
            </li>
            <li style="border-bottom-right-radius: 42em 81em;">
                <span>静</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import njzy from '../../assets/njzy';
    export default {
        name: "",
        mounted(){
            this.one();
        },
        methods:{
            one(){
                njzy();
            }
        }
    }
</script>

<style scoped>
    ul{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        display: flex;
        width: 530px;
        height: 430px;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        list-style: none;
    }
    ul >li {
        position: relative;
        width: 240px;
        height: 200px;
        /*background: #00a1d6;*/
        border: 1px solid #c6d2c9;
        border-radius: 15px;
        line-height: 230px;
        text-align: center;
        overflow: hidden;
    }
    ul >li span{
        font-family: 华文行楷;
        font-size:17.5em;
    }
</style>