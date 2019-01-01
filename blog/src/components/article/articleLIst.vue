<template>
    <div class="container">
        <Row>
            <Col span="6">
                <div ref="typeList" class="typeList">
                    <ul>
                        <li @click="select(0)" :class="{'select':compareType(0)}">
                            <hr :class="{'select':compareType(0)}"/>
                            ALL
                        </li>
                        <li v-for="item of typeList" @click="select(item._id)" :class="{'select':compareType(item._id)}">
                            <hr :class="{'select':compareType(item._id)}"/>
                            {{item.type}}
                        </li>
                    </ul>
                </div>
            </Col>
            <Col span="18">
                <Row>
                    <Col span="16">
                        <ul class="artList">
                            <li v-for="(item,index) of data" @click="showContent(index)">
                                <div class="info">
                                    <p class="title">{{item.title}}</p>
                                    <span>{{item.type.type}}</span>
                                    <p class="content">{{item.synopsis}}</p>
                                </div>
                                <div class="time">
                                    <Time :time="item.created" :key="item._id"/>
                                </div>
                            </li>
                        </ul>
                    <div class="page">
                        <Page :total="total" :page-size="size" show-elevator @on-change="changePage" v-if="selectType === 0" key="0"/>
                        <Page :total="total" :page-size="size" show-elevator @on-change="changeTypePage" v-if="selectType !== 0" key="1"/>
                    </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Spin fix v-if="show">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <div class="full" v-if="showFull" :class="{'showit':showIt}">
            <div class="articleContent">
                <p class="title">{{content.title}}</p>
                <p class="content" v-html="content.content"  v-highlightjs></p>
            </div>
            <div class="btn" @click="clearContent">
                <Icon type="md-arrow-up" size="50"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[],
                typeList: [],
                show:true,
                total:0,
                size: 6,
                selectType:0,
                showFull:false,
                showIt:false,
                content:''
            }
        },
        watch:{
            data(v){
                if(v.length){
                    this.show = false;
                }
            },
            showFull(v){
                if(v){
                    this.timer1 = setTimeout(()=>{
                        this.showIt = true;
                    },0);
                }
            },
            showIt(v){
                if(!v){
                    this.timer2 = setTimeout(()=>{
                        this.showFull = false;
                    },500);
                }
            }
        },
        created(){
                this.getData();
                this.getType();
        },
        mounted(){
            this.$(this.$refs.typeList).height(window.innerHeight - 60);
            this.$(this.$refs.typeList)[0].style.width = '80%';
        },
        destroyed(){
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
        },
        methods:{
            getData(v){
                this.$axios.get(`/articleList/${v}`)
                    .then(data => {
                        this.data = data.data.data;
                        this.total = data.data.total;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getType(){
                this.$axios.get('/artTypeList')
                    .then(data => {
                        this.typeList = data.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            changePage(v){
                this.getData(v);
            },
            getTypeData(v,index){
                this.$axios.get(`/typeForArticleList/${v}/${index}`)
                    .then(data => {
                        this.data = data.data.data;
                        this.total = data.data.total;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            select(v){
                this.selectType = v;
                if(v === 0){
                    return this.getData();
                }
                this.getTypeData(v);
            },
            changeTypePage(index){
                this.getTypeData(this.selectType,index);
            },
            compareType(v){
                if(v === this.selectType){
                    return true
                }
                return false
            },
            showContent(v){
                this.content = this.data[v];
                this.showFull = true;
            },
            clearContent(){
                this.content = '';
                this.showIt = false;
            }
        },
    }
</script>

<style scoped>
    ul{
        list-style: none;
    }
    .container{
        position: relative;
    }
    .btn{
        position: absolute;
        right:50px;
        top:50%;
        transform: translate3d(0,-50%,0);
    }
    .typeList{
        overflow-y: auto;
        overflow-x: hidden;
    }
    .typeList ul{
        /*margin-top: 20px;*/
        transform: translateY(20px);
    }
    .typeList ul li{
        position: relative;
        transform: translateX(50px);
        margin-bottom: 20px;
        font-size: 16px;
        cursor: pointer;
    }
    .typeList ul li.select{
        color: #60b973;
    }
    .typeList ul li hr{
        position: absolute;
        top:0;
        left:-15px;
        width: 2px;
        height: 100%;
        background: #bbddf4;
        border: none;
    }
    .typeList ul li hr.select{
        background: #60b973;
    }
    .artList{
        padding: 15px;
    }
    .artList li{
        display: flex;
        margin-bottom: 15px;
        width: 100%;
        padding: 20px;
        border-left: 3px solid #dbe8f4;
        /*background: #dbe8f4;*/
    }
    .artList li:hover{
        /*background: #dbe8f4;*/
        border-left: 3px solid #60b973;
    }
    .artList li >div.info{
        flex:1;
        width: 70%;
    }
    .artList li p.title{
        font-size: 18px;
    }
    .artList li div.info span{
        padding:3px 5px;
        border-radius: 5px;
        background: #25374b;
        color: #00a1d6;
    }
    .artList li p.content{
        width: 70%;
        padding-top: 10px;
        overflow:hidden;
        white-space:nowrap;
        word-break:break-all;
        text-overflow:ellipsis;
    }
    .artList li div.time >>> span{
        padding: 3px 5px;
        /*background: #3fb0f3;*/
        /*color: #ffffff;*/
    }
    .page{
        padding-left: 20px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    /*详细内容*/
    .full{
        position: absolute;
        top:-100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        transition: 0.5s;
    }
    .full.showit{
        top:0;
    }
    .articleContent{
        margin: auto;
        padding: 20px;
        width: 60%;
        height: inherit;
        overflow-y: auto;
        /*background: #00a1d6;*/
    }
    .articleContent .title{
        margin-bottom: 15px;
        text-align: center;
        font-size: 22px;
    }
    .articleContent .content{
        font-size: 16px;
    }
    .articleContent .content >>> table {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
    .articleContent .content >>> table td,
    .articleContent .content >>> table th {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
    }
    .articleContent .content >>> table th {
        border-bottom: 2px solid #ccc;
        text-align: center;
    }

    /* blockquote 样式 */
    .articleContent .content >>> blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
    }
    /* ul ol 样式 */
    .articleContent .content >>> ul, ol {
        margin: 10px 0 10px 20px;
    }
</style>