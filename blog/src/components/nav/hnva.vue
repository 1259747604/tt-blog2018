<template>
    <div class="hnav">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1" :to="{name:'home'}">
                <Icon type="md-home" size="24"/>
                首页
            </MenuItem>
            <MenuItem name="2">
                <Icon type="md-bookmarks" size="24"/>
                文章
            </MenuItem>
            <MenuItem name="4">
                <Icon type="logo-buffer" size="24"/>
                个人案例
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