<template>
    <div class="hnav">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1" :to="{name:'home'}">
                <Icon type="md-home" size="24"/>
                首页
            </MenuItem>
            <MenuItem name="2" :to="{name:'articleList'}">
                <Icon type="md-bookmarks" size="24"/>
                文章
            </MenuItem>
            <MenuItem name="4">
                <Icon type="logo-buffer" size="24"/>
                <a href="http://www.ttistt.com/htdocs/index1.html" style="color: black" target="_blank">个人案例</a>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "hNav",
        data () {
            return {
                theme1: 'light',
            }
        }
    }
</script>

<style scoped>
</style>