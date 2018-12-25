<template>
    <div class="sidernav">
        <Menu :theme="theme" :active-name="active" :open-names="['1']" width="auto">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    文章
                </template>
                <MenuItem :name="name[0].key" :to="{name:name[0].n}">
                    <Icon type="md-analytics" />
                    文章分析
                </MenuItem>
                <MenuItem :name="name[1].key" :to="{name:name[1].n}">
                    <Icon type="md-document" />
                    文章管理
                </MenuItem>
                <MenuItem :name="name[2].key" :to="{name:name[2].n}">
                    <Icon type="md-brush" />
                    写文章
                </MenuItem>
                <MenuItem :name="name[3].key" :to="{name:name[3].n}">
                    <Icon type="ios-albums" />
                    文章类型
                </MenuItem>
            </Submenu>
            <MenuItem :name="name[4].key" :to="{name:name[4].n}">
                <Icon type="ios-musical-note" />
                更换音乐
            </MenuItem>
            <MenuItem :name="name[5].key" :to="{name:name[5].n}">
                <Icon type="logo-instagram" />
                更换头像
            </MenuItem>
            <MenuItem :name="name[6].key" :to="{name:name[6].n}">
                <Icon type="md-key" />
                重设密码
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "siderNav",
        data () {
            return {
                theme: 'dark',
                name:[{n:'analyses',key:'1-1'},{n:'artManage',key:'1-2'}
                    ,{n:'article',key:'1-3'},{n:'artType',key:'1-4'},
                    {n:'musicManage',key:'2'},
                    {n:'avatar',key:'3'},
                    {n:'pwd',key:'4'}],
                active:'1-1'
            }
        },
        created(){
            this.select();
        },
        methods:{
            select(){
                const path = location.pathname;
                const len = this.name.length;
                for(let i = 0; i < len; i++){
                    if(new RegExp(this.name[i].n).test(path)){
                        this.active = this.name[i].key;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .sidernav{
        height: 875px;
    }
</style>