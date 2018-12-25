<template>
    <div class="upload">
        <Poptip trigger="hover" placement="bottom" title="选择音乐文件" :content="file.name">
            <Upload
                    :before-upload="handleUploadMusic"
                    action=""
                    accept=".mp3">
                <Button icon="ios-cloud-upload-outline">上传mp3</Button>
            </Upload>
        </Poptip>
        <Poptip trigger="hover" placement="bottom" title="选择歌词文件" :content="lrcFile.name">
            <Upload
                    :before-upload="handleUploadLrc"
                    action=""
                    accept=".lrc , .json">
                <Button icon="ios-cloud-upload-outline">上传歌词</Button>
            </Upload>
        </Poptip>
        <Select v-model="selectV" style="width:200px" placeholder="选择歌词来源">
            <Option v-for="item in lrcList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div>
            <Button @click="upload" icon="md-send" :loading="loadingStatus">上传</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            /*音乐文件 歌词文件 音乐上传状态 歌词上传状态 选择歌词来源 歌词来源列表 上传按钮加载状态*/
            return{
                file : '',
                lrcFile : '',
                musicStatus:0,
                lrcStatus:0,
                selectV:'',
                lrcList:[
                    {value:'qq',label:'qq'},
                    {value:'网易',label:'网易'}
                ],
                loadingStatus: false
            }
        },
        watch:{
            musicStatus(v){
                if(this.lrcStatus && v === 1){
                    const _this = this;
                    this.$Message.success({
                        content:'上传成功',
                        onClose(){
                            _this.$parent.$refs.music.data = _this.$parent.$refs.music.getData();
                        }
                    });
                    this.uploadSuccess();
                }
            },
            lrcStatus(v){
                if(this.musicStatus && v === 1){
                    this.uploadSuccess();
                }
            }
        },
        methods:{
            handleUploadMusic(f){
                //阻止直接上传
                this.file = f;
                return false;
            },
            handleUploadLrc(f){
                //阻止直接上传
                this.lrcFile = f;
                return false;
            },
            upload(){
                if(this.file === '' || this.lrcFile === '' || this.selectV === ''){
                    return this.$Message.warning({
                        content:'音乐,歌词,歌词来源存在没有选择'
                    })
                }
                this.loadingStatus = true;

                //上传音乐
                this.musicAxios();

                //上传歌词
                this.lrcAxios();
            },
            musicAxios(){
                const formData = new FormData();
                formData.append('name',this.file.name);
                formData.append(this.file.name,this.file);
                this.$axios.post('/musicUp',formData)
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        this.musicStatus =  data.data.status;
                        if(this.musicStatus){
                            this.file = ''
                        }
                    });
            },
            lrcAxios(){
                const formData = new FormData();
                formData.append('name',this.file.name);
                formData.append('lrcSource',this.selectV);
                formData.append(this.file.name,this.lrcFile);
                this.$axios.post('/lrcUp',formData)
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        this.lrcStatus =  data.data.status;
                        if(this.lrcStatus){
                            this.lrcFile = '';
                            this.selectV = '';
                        }
                    });
            },
            uploadSuccess(){
                this.loadingStatus = false;
                this.musicStatus = 0;
                this.lrcStatus = 0;
            }
        }
    }
</script>

<style scoped>

    .upload > div{
        display: inline-block;
    }
</style>