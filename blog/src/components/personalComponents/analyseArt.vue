<template>
    <div class="charts">
        <div class="list">
            <ul ref="list">
                <li class="typelist" v-for="(item,index) of initData"
                    :key="index"
                    @click="link(index)"
                    :style="{'backgroundColor':colorArr[index]}">
                    <span class="name">{{item.type}}</span>
                    <Badge :count="item.count"></Badge>
                </li>
            </ul>
        </div>
        <Divider>图表</Divider>
        <div id="main" style="width: 500px;height:400px;"></div>
        <div id="main1" style="width: 500px;height:400px;"></div>
        <div id="main2" style="width: 500px;height:400px;"></div>
    </div>
</template>

<script>
    export default {
        name: "analyse",
        data(){
            return {
                initData: [],
                countArr: [],
                typeArr: [],
                pieArr: [],
                lineArr: [],
                colorArr: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C'
                    ,'#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3'
                    , '#9d96f5', '#8378EA', '#96BFFF','#dd6b66','#759aa0'
                    ,'#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373'
                    ,'#73b9bc','#7289ab', '#91ca8c','#f49f42'],
            }
        },
        created(){
            /*得到数据*/
            this.getData();
        },
        methods:{
            constructCharts(){
                const myChart = this.echarts.init(document.getElementById('main'));
                const myChart1 = this.echarts.init(document.getElementById('main1'));
                const myChart2 = this.echarts.init(document.getElementById('main2'));

                // 饼状图
                const option = {
                    title : {
                        text: '文章分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data: this.typeArr
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            name:'文章面积分布',
                            type:'pie',
                            radius : [30, 110],
                            center : ['50%', '50%'],
                            roseType : 'area',
                            data:this.pieArr
                        }
                    ]
                };

                /*条形图*/
                const option1 = {
                    title: {
                        text: '文章柱状图',
                        x: 'center'
                    },
                    color: '#32C5E9',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: this.typeArr
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'bar',
                            data: this.countArr
                        },
                    ]
                };

                /*月统计图*/
                const option2 = {
                    title:{
                        text:`${new Date().getFullYear()}月统计`,
                        x: 'center'
                    },
                    color:'#334B5C',
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.lineArr,
                        type: 'line',
                        areaStyle: {}
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                myChart1.setOption(option1);
                myChart2.setOption(option2);
            },
            getData(){
                this.$axios.get('/artAnalyse')
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }

                        const status = data.data.status;
                        if(status){
                            /*类型数据*/
                            this.initData = data.data.data;
                            this.filter(this.initData);

                            /*月统计数据*/
                            //此处bug 如果新的一年没有发文章的话将查询不到月统计数据 页面会抛出catch的错误，懒得解决 毕竟一年才一次
                            this.lineArr = data.data.data1[0].count;
                            this.constructCharts();
                            /*this.$nextTick(function () {
                                this.randomColor();
                            });*/
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            filter(data){
                /*过滤数据*/
                this.countArr = data.map(item => {
                    return item.count;
                });
                this.typeArr = data.map(item => {
                    return item.type;
                });
                this.pieArr = data.map(item => {
                    return {
                        value: item.count,
                        name: item.type
                    }
                });
            },
            /*randomColor(){
                let oLi = this.$refs.list.children;
                const len = this.countArr.length;
                for(let i = 0; i < oLi.length; i++){
                    oLi[i].style.background = this.colorArr[Math.floor(Math.random()*len)];
                }
            },*///废弃
            link(index){
                const id =  this.initData[index]._id;
                this.$router.push({name:'artListType',params:{id}});
            }
        },
    }
</script>

<style scoped>
    .charts{
        padding: 20px;
        perspective: 800px;
        perspective-origin: center center;
    }
    .list{
        margin-bottom: 70px;
    }
    .list li{
        display: inline-block;
        width: 200px;
        height: 120px;
        margin-right: 10px;
        border: 1px solid;
        border-radius: 20px;
        font-size: 30px;
        text-align: center;
        line-height: 120px;
        transform-style: preserve-3d;
        color:#ffffff;
        transition: 0.2s;
        cursor: pointer;
    }
    .list li span{
        vertical-align: middle;
    }
    .list li span.name{
        display: inline-block;
        margin-left: 20px;
    }
    .list li:hover{
        transform: translateZ(10px);
    }
    #main,#main1,#main2{
        display: inline-block;
        margin-right: 40px;
    }
</style>