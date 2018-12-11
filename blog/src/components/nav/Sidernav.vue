<template>
    <div class="sidernav">
        <Menu :theme="theme" active-name="1-1" :open-names="['1']" width="auto">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    文章
                </template>
                <MenuItem name="1-1" :to="{name:'analyses'}">
                    <Icon type="md-analytics" />
                    文章分析
                </MenuItem>
                <MenuItem name="1-2" :to="{name:'artManage'}">
                    <Icon type="md-document" />
                    文章管理
                </MenuItem>
                <MenuItem name="1-3" :to="{name:'article'}">
                    <Icon type="md-brush" />
                    写文章
                </MenuItem>
                <MenuItem name="1-4" :to="{name:'artType'}">
                    <Icon type="ios-albums" />
                    文章类型
                </MenuItem>
            </Submenu>
            <MenuItem name="2" :to="{name:'avatar'}">
                <Icon type="logo-instagram" />
                更换头像
            </MenuItem>
            <MenuItem name="3" :to="{name:'pwd'}">
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
                theme: 'dark'
            }
        }
    }
</script>

<style scoped>
    .sidernav{
        height: 870px;
    }
</style>