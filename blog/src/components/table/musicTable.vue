<template>
    <div>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: 'MusicName',
                        key: 'name',
                    },
                    {
                        title: 'Source',
                        key: 'lrcSource',
                    },
                    {
                        title: 'Switch',
                        key:'switch',
                        width:200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        size: 'large',
                                        value: this.selectV === params.row.name
                                    },
                                    on: {
                                        'on-change': (e) => {
                                            this.select(params,e);
                                        }
                                    }
                                })
                            ]);
                        }
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
                                            this.remove(params)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data: [],
                selectV:''
            }
        },
        created(){
            //得到数据
            this.getData();

            //得到选中的音乐
            this.getName();
        },
        watch:{
            selectV(v,o){
                //如果为空 则不允许取消
                this.forbidClose(v,o);
            }
        },
        methods: {
            getData(){
                this.$axios({
                    method: 'post',
                    url: 'musicList',
                })
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        if(data.data.status){
                            this.data = data.data.data
                        }
                    });
            },
            getName(){
                this.$axios.get('/musicName')
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                        if(data.data.data.length !== 0){
                            this.selectV = data.data.data[0].selectName.name;
                        }
                    });
            },
            remove (params) {
                const name = params.row.name;
                const _this = this;
                if(name === this.selectV){
                    return this.$Message.warning({
                        content: '选中的音乐不可删除'
                    })
                }

                this.$Modal.confirm({
                    title:`删除${name}`,
                    content:'删除了就没了',
                    onOk(){
                        _this.$axios({
                            method:'delete',
                            url:`/music`,
                            data:{
                                name
                            }
                        })
                            .then(data => {
                                if(data.data.status){
                                    _this.$Message.success({
                                        content: '删除成功',
                                        onClose(){
                                            _this.data = _this.getData();
                                        }
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                })
            },
            select(params,e){
                //e为boolean值 为真是选中
                if(e){
                    this.selectV = params.row.name;

                    //更新数据库
                    this.updateSelect(params.row._id);
                }
                else{
                    this.selectV = '';
                }
            },
            updateSelect(id){
                this.$axios({
                    method:'post',
                    url:'/musicSelectOne',
                    data:{
                        id
                    }
                })
                    .then(data => {
                        if(data.data.keepStatus === 408){
                            return this.$store.commit('changeSessionIsNew',true);
                        }
                    })
            },
            forbidClose(v,o){
                if(v === ''){
                    this.$Message.warning({
                        content:'不允许取消',
                    });
                    this.$nextTick(()=>{
                        this.selectV = o;
                    })
                }
            }
        }
    }
</script>

<style scoped>
    div >>> span.ivu-switch-checked{
        background: #4dd28b;
        border: 1px solid #4dd28b;
    }
</style>