<template>
    <div class="artType">
        <!--新增-->
        <div class="new">
            <Button type="primary" shape="circle" icon="md-add" v-if="!show" @click="changeShow"></Button>
            <div v-if="show">
                <Button type="warning" shape="circle" icon="md-close" @click="changeShow"></Button>
                <Input v-model="text" placeholder="类型名称" style="width: 300px"/>
                <Button type="success" @click="submitIt">提交</Button>
            </div>
        </div>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    export default {
        name: "artType",
        data () {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: '_id',
                    },
                    {
                        title: 'Type',
                        key: 'type'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data: this.$store.state.artType,
                text:'',
                show:false
            }
        },
        created(){
            /*创建完成时请求数据*/
            this.getData();
        },
        methods: {
            changeShow(){
                this.show = !this.show;
            },
            getData(){
                this.$axios.get('/artType')
                    .then(data => {
                        const status = data.data.status;
                        if(status){
                            this.data = data.data.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            submitIt(){
                /*提交类型*/
                const val = this.text.trim();
                if(!val){
                    return this.$Message.error({
                        content:'请填写类型'
                    })
                }
                this.$axios.put('/newType',{type:val})
                    .then(data => {
                        const status = data.data.status;
                        const _this = this;
                        if(status){
                            this.changeShow();
                            this.$Message.success({
                                content: '新增成功',
                                onClose(){
                                    _this.getData();
                                }
                            })
                        }
                        else{
                            this.changeShow();
                            this.$Message.error({
                                content: '新增失败'
                            })
                        }
                    })
                    .catch(err => {
                        this.changeShow();
                        this.$Message.error({
                            content: '新增失败'
                        })
                    })
            },
            removeAxios(id){
                const _this = this;
                this.$axios({
                    url:'/arType',
                    method:'delete',
                    data:{id}
                })
                    .then(data => {
                        const status = data.data.status;
                        if(status){
                            return this.$Message.success({
                                content: '删除成功',
                                onClose(){
                                    _this.getData();
                                }
                            })
                        }
                        else{
                            this.changeShow();
                            this.$Message.error({
                                content: '删除失败'
                            })
                        }
                    })
                    .catch(err => console.log(err));
            },
            remove (data) {
                /*删除*/
                const id = data._id;
                const _this = this;
                this.$Modal.confirm({
                    title:`删除${data.type}`,
                    content:'删除后将不可恢复',
                    width:'300px',
                    onOk(){
                        _this.removeAxios(id);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .artType{
        padding: 20px;
    }
    .new{
        margin-bottom: 20px;
    }
    thead{
        background-color: #2db7f5;
        color: #fff;
    }
</style>