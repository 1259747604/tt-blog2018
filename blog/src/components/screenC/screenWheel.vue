<template>
    <div>
        <ul ref="list" id="list">
            <li>
                <v-njzy></v-njzy>
            </li>
            <li>
                <n-one></n-one>
            </li>
            <li>
                <d-zj v-if="showMusic"></d-zj>
            </li>
            <li>
                <v-chat></v-chat>
            </li>
        </ul>
    </div>
</template>

<script>
    /*存在bug */
    import njzy from '../interesting/njzy';
    import dZj from '../interesting/Typewriter';
    import nOne from '../article/newOne';
    import vChat from '../interesting/chat';
    export default {
        data(){
            return{
                showMusic: false,
                scrollTop:0
            }
        },
        components:{
            vNjzy:njzy,
            dZj,
            nOne,
            vChat
        },
        mounted(){
            this.setHeight();
            this.scrollUl();
            this.getScrollTop();

            this.$nextTick(() => {
                //回到首页定位
                this.setOffset();
            });
            window.onresize = ()=>{
                this.setHeight();
            }
        },
        beforeDestroy(){
            window.onresize = null;
        },
        watch:{
            scrollTop(v){
                if(v <= (-2*window.innerHeight + 180)){
                    this.showMusic = true
                }
            },
            showMusic(v){
                if(v){
                    clearInterval(this.timer1);
                }
            }
        },
        destroyed(){
            clearInterval(this.timer1);
        },
        methods:{
            setHeight(){
                const len = this.$refs.list.children.length;
                for(let i = 0; i < len; i++){
                    this.$refs.list.children[i].style.height = `${window.innerHeight -60}px`;
                }
            },
            scrollUl(i){
                let index = i || 0;
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
            },
            getScrollTop(){
                this.timer1 = setInterval(()=>{
                    this.scrollTop = this.$('#list').offset().top;
                },1000)
            },
            getOffset(){
                //路由改变时得到首页滚动量
                this.$store.commit('changeScroll',this.$(this.$refs.list).offset());
            },
            setOffset(){
                /*存在bug 当页面高度变化例如打开f12 暂不予解决 */
                const height = window.innerHeight - 60;
                this.$("#list").css({'transform': `translate3d(0,${this.$parent.offsetTop - 60}px,0)`});
                const index = 0 - Number((this.$parent.offsetTop - 60)/height);//获取当前是第几屏
                this.scrollUl(index);
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
        overflow: hidden;
    }
    ul > li {
        position: relative;
        border-bottom:1px solid #e8eaec;
        background-attachment: fixed;
    }
</style>