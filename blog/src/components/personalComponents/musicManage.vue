<template>
    <div class="manage">
        <div>
            <v-musicLoad></v-musicLoad>
        </div>
        <div>
            <v-MusicT ref="music"></v-MusicT>
        </div>
    </div>
</template>

<script>
    //上传音乐
    import vMusicLoad from '../upload/musicUpload'
    import vMusicT from '../table/musicTable'
    export default {
        components:{
            vMusicLoad,
            vMusicT
        }
    }
</script>

<style scoped>
    .manage{
        padding: 20px;
    }
</style>