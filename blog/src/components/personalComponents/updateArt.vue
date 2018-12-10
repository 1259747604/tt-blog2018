<template>
    <div class="article">
        <!--选择类型-->
        <div class="type">
            <span>文章类型:</span>
            <Select v-model="selectV" style="width:200px">
                <Option v-for="(item,index) in artType" :value="item.type" :key="index">{{ item.type }}</Option>
            </Select>
        </div>
        <!--文章标题-->
        <div class="artTitle">
            <span>文章标题:</span>
            <Input v-model="title" size="large" placeholder="文章标题" style="width:400px"/>
        </div>
        <!--富文本-->
        <div class="editor">
            <Divider orientation="left">文章编辑</Divider>
            <div id="toolbar" class="toolbar"></div>
            <div style="padding: 5px 0; color: #ccc"></div>
            <div id="text" style="min-height: 500px"></div>
        </div>
        <div class="btn">
            <Button type="info" @click="submitArt">更新文章</Button>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';//富文本编辑器
    export default {
        name: "updateArticle",
        data () {
            return {
                artType: [],
                selectV:'',
                title:'',
                editor:''
            }
        },
        created(){
            /*获取类型*/
            this.$axios.get('/artType')
                .then(data => {
                    const status = data.data.status;
                    if(status){
                        this.artType = data.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.getData();
        },
        mounted(){
            this.uploadConfig();
        },
        methods:{
            getData(){
                /*获取文章数据*/
                this.$axios.get(`/article/up/${this.$route.params.id}`)
                    .then(data => {
                        const status = data.data.status;
                        if(status){
                            const art = data.data.data[0];
                            this.selectV = art.type.type;
                            this.title = art.title;
                            this.editor.txt.html(art.content);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            submitArt(){
                /*发送数据*/
                const data = this.getContent();
                if(data){
                    this.$axios({
                        method:'post',
                        url:'/articleUp',
                        data,
                    })
                        .then(data => {
                            const _this = this;
                            const status = data.data.status;
                            if(status){
                                this.$Notice.success({
                                    title:'Success',
                                    desc:'恭喜 你已经更新成功',
                                    duration:3,
                                    onClose(){
                                        _this.$router.push('/personal/artManage/artList');
                                        /*_this.selectV = '';
                                        _this.title = '';
                                        _this.editor.txt.clear();*/
                                    }
                                })
                            }
                            else{
                                this.$Notice.error({
                                    title:'Error',
                                    desc:'因为不可抗力 你的文章没有更新成功',
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            getTypeId(type){
                /*获取选择的文章类型ID*/
                const newaarr = this.artType.filter(item=>{
                    return item.type === type;
                });
                const id = newaarr[0]._id;
                return id;
            },
            getContent(){
                /*获取文章内容*/
                const selectV = this.selectV;
                const title = this.title;
                const content = this.editor.txt.html();

                if(!selectV){
                    this.$Message.warning({
                        content:'请选择文章类型'
                    });
                    return false;
                }
                else if(!title){
                    this.$Message.warning({
                        content:'请确定文章名'
                    });
                    return false;
                }
                else if(content === '<p><br></p>' || content === '' || content === null){
                    this.$Message.warning({
                        content:'搞啥子 你还没写文章呢！'
                    });
                    return false;
                }
                const typeId = this.getTypeId(selectV);
                return {
                    selectV,
                    title,
                    content,
                    typeId,
                    id:this.$route.params.id
                };
            },
            uploadUrl(){
                return 'http://localhost:3000/upload/artImg';
            },
            uploadConfig(){
                const _this = this;
                this.editor = new Editor("#toolbar","#text");
                this.editor.customConfig.zIndex = 0;//这个富文本作者思想出问题了z-index设个10000也是醉了
                this.editor.customConfig.uploadImgServer = this.uploadUrl();
                this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
                this.editor.customConfig.uploadImgMaxLength = 1;
                this.editor.customConfig.withCredentials = true;
                this.editor.customConfig.customAlert = function (info) {
                    // info 是需要提示的内容
                    _this.$Message.error({
                        content:info
                    });
                };
                this.editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                        _this.$Loading.start();
                    },
                    success: function (xhr, editor, result) {
                        _this.$Loading.finish();
                        // console.log(result);
                    },
                };
                this.editor.create();
            },
        }
    }
</script>

<style scoped>
    .article{
        padding: 10px;
    }
    .type{
        margin-bottom: 30px;
    }
    .type span,.artTitle span{
        display: inline-block;
        height: inherit;
        font-size: 20px;
        font-family: 华文楷体;
        vertical-align: middle;
    }
    .artTitle{
        margin-bottom: 30px;
    }
    .btn{
        margin-top: 20px;
    }
</style>