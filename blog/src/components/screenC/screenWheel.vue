<template>
    <div>
        <ul ref="list" id="list">
            <li>
                <h1>{{$store.state.session}}</h1>
                <v-njzy></v-njzy>
            </li>
            <li>
                <n-one></n-one>
            </li>
            <li>
                <d-zj></d-zj>
            </li>
            <li style="font-size: 100px">4</li>
        </ul>
    </div>
</template>

<script>
    import njzy from '../interesting/njzy';
    import dZj from '../interesting/Typewriter';
    import nOne from '../article/newOne';
    export default {
        name: "",
        components:{
            vNjzy:njzy,
            dZj,
            nOne
        },
        mounted(){
            this.setHeight();
            this.scrollUl();
            window.onresize = ()=>{
                this.setHeight();
            }
        },
        beforeDestroy(){
            window.onresize = null;
        },
        methods:{
            setHeight(){
                const len = this.$refs.list.children.length;
                for(let i = 0; i < len; i++){
                    this.$refs.list.children[i].style.height = `${window.innerHeight -60}px`;
                }
            },
            scrollUl(){
                let index = 0;
                let lastTime = 0;
                let len = this.$refs.list.children.length;

                this.$("#list").mousewheel((e,d)=>{
                    if(new Date - lastTime > 500){
                        const height = window.innerHeight-60;
                        if ( d < 0 ){
                            index++;
                            index %= len
                        }else{
                            index--;
                            if(index < 0)index = len - 1;
                        }
                        this.$("#list").css({'transform': `translate3d(0,${-height*index}px,0)`});
                        lastTime = new Date();
                    }
                });
                /*使用了jq 废弃手写滚动*/
                /*mouseWheel(document,function (e,d) {
                    if(new Date - lastTime > 800){
                        const height = window.innerHeight-60;
                        if ( d < 0 ){
                            index++;
                            index %= len
                        }else{
                            index--;
                            if(index < 0)index = len - 1;
                        }
                        window.scrollTo(0,height*index);
                        lastTime = new Date();
                    }
                    return false;
                });
                function mouseWheel(obj,fn) {
                    function wheel(e) {
                        e = e || window.event;
                        if ( fn.call(this,e,e.wheelDelta/120||-e.detail/3) === false )
                            e.preventDefault();
                    }
                    const eName = document.onmousewheel === null?'mousewheel':'DOMMouseScroll';
                    document.addEventListener?obj.addEventListener(eName,wheel,false):obj.attachEvent("onmousewheel",wheel);
                }*/
            }
        }
    }
</script>

<style scoped>
    ul{
        transition: 500ms;
    }
    ul > li{
        width: 100%;
    }
    ul > li {
        position: relative;
        border-bottom:1px solid #e8eaec;
        background-attachment: fixed;
    }
</style>