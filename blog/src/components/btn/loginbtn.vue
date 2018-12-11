<template>
    <div class="login">
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                <Button type="primary" ghost style="width: 70px;" :to="{name:'login'}">登录</Button>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "loginbtn",
        data () {
            return {
                theme1: 'light'
            }
        }
    }
</script>

<style scoped>
    .login li{
        float: right;
    }
</style>