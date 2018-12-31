<template>
    <div id="container">
        <div v-if="!loadShow">
            <audio :src="src" id="aa" ref="audio"></audio>
            <div class="lrc one">
                <p ref="oneP">{{one|fText(regArr[6])}}</p>
            </div>
            <div class="lrc two">
                <p ref="twoP">{{two|fText(regArr[6])}}</p>
            </div>
            <div class="play" @click="show = !show">
                <div v-if="show" @click="play"><Icon type="md-play" size="70"/></div>
                <div v-else @click="pause" class="musicP"><Icon type="logo-playstation" size="70"/></div>
            </div>
        </div>
        <Spin size="large" fix v-if="loadShow"></Spin>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                selectId:'',//选中音乐的id
                url: '/indexMusic',//请求地址
                show: true,//播放按钮的切换
                src: '',//当前播放的src
                loadShow: true,//页面加载且src无值
                lrc: [],//歌词
                time: [],//时间
                one: '',//第一行显示的歌词
                two: '',//第二行显示的歌词
                currentTime: 0,//当前播放时间
                oldIndex1: 0,//上一句的序号
                oldIndex2: 0,//上一句的序号
                isEnd: false,//是否播放结束
                isPause: false,//是否暂停
                speed: 1.0,//播放速度
                regArr: [/\[\d{2}:\d{2}\.\d+\]/,
                    /^\r\n$/,
                    /\r\n/g,
                    /\[\d{2}:\d{2}\.\d+\]/g,
                    /(\[|\])/g,
                    /\|\|/,
                    /^(\d)+\.{3}/,
                    /^(\d)+/,
                    /^\n$/,
                    /\n/g],
                //正则[qq音乐歌词,QQ音乐空行是\r\n,匹配\r\n,用于切QQ音乐时间,
                // 匹配[或],匹配||,过滤歌词序号,得到当前序号,网易云的空行是\n,匹配\n]
            }
        },
        created(){
            this.getName();
        },
        destroyed(){
            clearInterval(this.timer1);
            clearInterval(this.timer2);
        },
        watch:{
            src(v){
                if(v){
                    this.loadShow = false;
                }
            },
            currentTime(v){
                this.currentTChange(v);
            },
            one(v){
                const index = Number(v.match(this.regArr[7])[0]);//得到当前歌词序号
                this.oldIndex1 = index;//相对于下一句是上一句的序号

                const one = this.$refs.oneP;

                this.$nextTick(()=>{
                    const textWidth = this.$(one).width();//得到文本长度
                    this.textChangeAnimate(index,this.oldIndex2,one,textWidth);
                })
            },
            two(v){
                if(v){
                    const index = Number(v.match(this.regArr[7])[0]);//得到当前歌词序号
                    this.oldIndex2 = index;//相对于下一句是上一句的序号

                    const two = this.$refs.twoP;

                    this.$nextTick(()=>{
                        const textWidth = this.$(two).width();//得到文本长度
                        this.textChangeAnimate(index,this.oldIndex1,two,textWidth);
                    })
                }
            },
            isEnd(v){
                if(v){
                    clearInterval(this.timer2);
                    this.isPause = false;
                    this.play();
                }
            }
        },
        methods:{
            getName(){
                this.$axios.get('/indexMusicName')
                    .then(data => {
                        if(data.data.data.length !== 0){
                            this.selectId = data.data.data[0].selectName._id;

                            //得到id 获取数据
                            this.getData();
                        }
                    });
            },
            getData(){
                this.$axios.get(`${this.url}/${this.selectId}`)
                    .then(data => {
                        data = data.data;
                        this.lrc = data.lrc;
                        let buffer = data.music.data;
                        const lrcSource = data.lrcSource;

                        this.getAudio(buffer);
                        if(lrcSource === 'qq'){
                            this.QQ_filter();
                        }
                        else if(lrcSource === '网易'){
                            this.WY_filter();
                        }
                    });
            },
            //qq音乐过滤出歌词和时间
            QQ_filter(){
                const initD = this.lrc;

                /*切歌词*/
                const arr = initD.split(this.regArr[0]);
                arr.shift();
                /*将空行\r\n换成||*/
                for(let i = 0; i < arr.length; i++){
                    if(this.regArr[1].test(arr[i])){
                        arr[i] = '||'
                    }
                    else{
                        arr[i] = arr[i].replace(this.regArr[2],'')
                    }
                }
                //加序号
                //为了防止隔句重复导致颜色不能变化的方案
                for(let i = 0; i<arr.length; i++){
                    arr[i] = `${i}...${arr[i]}`;
                }

                this.lrc = arr;

                /*切时间*/
                const arr1 = initD.match(this.regArr[3]);
                /*将字符串转换成数字*/
                for(let i = 0; i < arr1.length; i++){
                    arr1[i] = arr1[i].replace(this.regArr[4],"");
                    let min = Number(arr1[i].slice(0,2))*60;
                    let second = Number(arr1[i].slice(3));
                    arr1[i] = min+second;
                }
                this.time = arr1;
            },
            //网易云音乐歌词和时间过滤
            WY_filter(){
                const initD = this.lrc;

                const arr1 = initD.split(this.regArr[0]);
                arr1.shift();

                for(let i = 0; i < arr1.length; i++){
                    if(this.regArr[8].test(arr1[i])){
                        arr1[i] = '||'
                    }
                    else{
                        arr1[i] = arr1[i].replace(this.regArr[9],'')
                    }
                }
                for(let i = 0; i<arr1.length; i++){
                    arr1[i] = `${i}...${arr1[i]}`;
                }
                this.lrc = arr1;

                /*切时间*/
                const arr2 = initD.match(this.regArr[3]);
                /*将字符串转换成数字*/
                for(let i = 0; i < arr2.length; i++){
                    arr2[i] = arr2[i].replace(this.regArr[4],"");
                    let min = Number(arr2[i].slice(0,2))*60;
                    let second = Number(arr2[i].slice(3));
                    arr2[i] = min+second;
                }
                this.time = arr2;
            },
            //将数组中的||过滤
            filterspace(){
                //因为是引用类型 所以我先转一下
                const arr1 = JSON.parse(JSON.stringify(this.lrc));
                const arr2 = JSON.parse(JSON.stringify(this.time));

                for(let i = 0; i<arr1.length; i++){
                    if(this.regArr[5].test(arr1[i])){
                        arr1.splice(i,1);
                        arr2.splice(i,1);
                        i--;
                    }
                }
                return [arr1, arr2];
            },
            //将buffer转换成arraybuffer audio src赋值
            getAudio(b){
                //将buffer转换成arraybuffer
                const ab = new ArrayBuffer(b.length);
                const view = new Uint8Array(ab);
                for (let i = 0; i < b.length; i++) {
                    view[i] = b[i];
                }
                const blob = new Blob([ab],{type:"application/octet-stream"});
                const url = window.URL.createObjectURL(blob);//得到一个链接

                this.src = url;
            },
            //播放
            play(){
                //判断是否是由暂停转播放
                if(this.isPause){
                    this.textChangeAnimateFromPause();
                }

                //播放 播放速度
                this.$refs.audio.play();
                this.$refs.audio.playbackRate = this.speed;

                //播放歌词显示
                this.showlrc();
                //定时器检测
                this.ended();
            },
            //暂停
            pause(){
                this.isPause = true;

                this.$refs.audio.pause();
                clearInterval(this.timer1);
                this.$(this.$refs.oneP).stop(true,false);
                this.$(this.$refs.twoP).stop(true,false);
            },
            //定时器检测是否播放结束
            ended(){
                this.timer2 = setInterval(()=>{
                    if(this.$refs.audio){
                        this.isEnd = this.$refs.audio.ended;
                    }
                },1000)
            },
            //歌词替换
            showlrc(){
                //监听当前时间变化即可
                this.timer1 = setInterval(() => {
                    this.currentTime = this.$refs.audio.currentTime;//当前播放时间
                },1000)
            },
            //当前时间变化后的文字
            currentTChange(v){
                //执行过滤空格
                const [lrcArr,timeArr] = this.filterspace();

                const len = timeArr.length;

                for(let i = 0; i < len; i++){
                    if(v > timeArr[i] && v < timeArr[i+1]){
                        this.one = lrcArr[i];
                        this.two = lrcArr[i+1];
                        if(!lrcArr[i+2]){
                            return clearInterval(this.timer1);
                        }
                    }
                    if(v > timeArr[i+1]-1){
                        if(!lrcArr[i+3]){
                            this.two = '';
                            return clearInterval(this.timer1);
                        }
                        this.one = lrcArr[i+2];
                    }
                    i++;
                }
            },
            //文字变色动画
            textChangeAnimate(v,o,ref,textWidth){
                const delayT = (this.time[v]- this.time[o])*1000 || 0;//延迟时间
                const aT = (this.time[v+1]- this.time[v])*1000;//动画时间 存在最后一句bug 懒得管

                this.$(ref).css({'backgroundPositionX':`${-textWidth}px`}).stop(true,false).delay(delayT).animate({
                    'backgroundPositionX':0
                },aT);
            },
            //由暂停转播放的文字动画
            textChangeAnimateFromPause(){
                const curTime = this.$refs.audio.currentTime;//当前时间
                const index1 = this.oldIndex1;//在此处相当于当前第一句序号
                const index2 = this.oldIndex2;//在此处相当于当前第二句序号
                let [delayT1,delayT2,aT1,aT2] = [0,0,0,0];//分别是第一句和第二句的延迟时间 动画时间

                if(index1 < index2){
                    delayT2 = (this.time[index2]- curTime)*1000;//延迟时间
                    aT1 = (this.time[index1+1]- curTime)*1000;//动画时间
                    aT2 = (this.time[index2+1]- this.time[index2])*1000;//动画时间
                }
                else{
                    delayT1 = (this.time[index1] - curTime)*1000;//延迟时间
                    aT1 = (this.time[index1+1] - this.time[index1])*1000;//动画时间
                    aT2 = (this.time[index2+1] - curTime)*1000;//动画时间
                }
                this.$(this.$refs.oneP).stop(true,false).delay(delayT1).animate({
                    'backgroundPositionX':0
                },aT1);
                this.$(this.$refs.twoP).stop(true,false).delay(delayT2).animate({
                    'backgroundPositionX':0
                },aT2);
            }
        },
        filters:{
            //过滤文本 去掉序号
            fText(v,reg){
                //不能直接使用this 这里的this指向window;
                return v.replace(reg,"");
            },
        }
    }
</script>

<style scoped>
    #container{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .play{
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate3d(-50%,-50%,0);
    }
    .lrc{
        position: absolute;
        width: 800px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        text-align: center;
    }
    .one{
        left: 0;
        top: 40%;
    }
    .two{
        right: 0;
        top: 60%;
    }
    p{
        display: inline-block;
        text-align: center;
        color: transparent;
        background: url("../../assets/bg/lrcbg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color:#3ca4d8;
        -webkit-background-clip: text;
    }
    .musicP{
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 95px;
        border: 1px solid;
        border-radius: 50%;
        animation:music 5s linear infinite;
        transform-origin: center;
    }
    @keyframes music {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
            transform: rotateZ(360deg);
        }
    }
</style>