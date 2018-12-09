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
            <Button type="info">发表文章</Button>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';//富文本编辑器
    export default {
        name: "perarticle",
        data () {
            return {
                artType: [],
                selectV:'',
                title:''
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
        },
        mounted(){
            const editor = new Editor("#toolbar","#text");
            editor.customConfig.zIndex = 0;//这个富文本作者思想出问题了z-index设个10000也是醉了
            editor.create();
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