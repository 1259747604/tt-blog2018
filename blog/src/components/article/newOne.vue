<template>
    <div>
        <h1>{{title}}</h1>
        <span>{{type}}</span>
        <p v-html="content" class="content"></p>
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
                })
        }
    }
</script>

<style scoped>
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

    /* code 样式 */
    .content >>> code {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 3px 5px;
        margin: 0 3px;
    }
    .content >>> pre code {
        display: block;
    }

    /* ul ol 样式 */
    .content >>> ul, ol {
        margin: 10px 0 10px 20px;
    }
</style>