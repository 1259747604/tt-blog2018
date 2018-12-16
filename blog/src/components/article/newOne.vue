<template>
    <div>
        <div class="cardNEW">
            <Card style="max-height:800px;overflow: hidden;">
                <div slot="title" class="title">
                    <h1>{{title}}</h1>
                    <span>{{type}}</span>
                </div>
                <p v-html="content" class="content" v-highlightjs></p>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
            return{
                title:'暂无数据',
                content:'',
                type:''
            }
        },
        created(){
            this.$axios.get('/newOne')
                .then(data => {
                    if(data.data.status){
                        const list = data.data.data[0];
                        this.title = list.title;
                        this.content = list.content;
                        this.type = list.type.type;
                    }
                })
                .catch(err =>{
                    console.log(err);
                });
        },
        mounted(){
            this.scrollC();
        },
        methods:{
            //鼠标进入可滚动文章
            scrollC(){
                let x = 0;
                this.$('.cardNEW').eq(0).hover((e)=>{
                    let len = this.$('.content').outerHeight();
                    let oHeight = this.$('.cardNEW').eq(0).outerHeight() - 58 - 30;//包裹内容的高度
                    //可滚动
                    this.$('.cardNEW').on('mousewheel',(e,d)=>{
                        e.cancelBubble = true;
                        if(d < 0){
                            if(x >= len - oHeight){
                                x = len - oHeight;
                            }
                            else{
                                x += 90;
                            }
                        }
                        else{
                            if(x <= 0){
                                x = 0;
                            }
                            else{
                                x -= 90;
                            }
                        }
                        this.$('.content').eq(0).css({'transform':`translate3d(0,${-x}px,0)`});
                        return false;
                    })
                },()=>{
                    this.$('.cardNEW').off('mousewheel');
                });
            },
        }
    }
</script>

<style scoped>
    .cardNEW{
        position: relative;
        margin:auto;
        width: 1200px;
        transform: translate3d(0,50px,0);
    }
    .cardNEW > div >>> div.ivu-card-head{
        padding: 0;
    }
    .title{
        position:relative;
        width:100%;
        height:100%;
        padding: 16px;
        z-index: 100;
        background: #ffffff;
        text-align: center;
    }
    .title h1{
        display: inline-block;
        vertical-align: bottom;
        font-size: 25px;
        font-family: "微软雅黑 Light";
    }
    .title span{
        position: absolute;
        top:0;
        left:0;
        padding: 5px;
        border-radius: 5px;
        color: #3ca4d8;
        background: #25374b;
    }
    .content{
        position: relative;
        transition: 500ms;
        /*z-index: -1;*/
    }
    .content >>> pre{
        /*width: 800px;*/
    }
    .content >>> table {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
    .content >>> table td,
    .content >>> table th {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
    }
    .content >>> table th {
        border-bottom: 2px solid #ccc;
        text-align: center;
    }

    /* blockquote 样式 */
    .content >>> blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
    }
    /* ul ol 样式 */
    .content >>> ul, ol {
        margin: 10px 0 10px 20px;
    }
</style>