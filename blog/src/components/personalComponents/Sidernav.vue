<template>
    <div class="sidernav">
        <Menu :theme="theme3" active-name="1" width="auto">
            <MenuGroup title="个人中心">
                <MenuItem name="1" :to="{name:'artList'}">
                    <Icon type="md-document" />
                    文章管理
                </MenuItem>
                <MenuItem name="2" :to="{name:'article'}">
                    <Icon type="md-brush" />
                    写文章
                </MenuItem>
                <MenuItem name="3" :to="{name:'artType'}">
                    <Icon type="ios-albums" />
                    文章类型
                </MenuItem>
                <MenuItem name="4" :to="{name:'avatar'}">
                    <Icon type="logo-instagram" />
                    更换头像
                </MenuItem>
                <MenuItem name="5" :to="{name:'pwd'}">
                    <Icon type="md-key" />
                    重设密码
                </MenuItem>
            </MenuGroup>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "siderNav",
        data () {
            return {
                theme3: 'dark'
            }
        }
    }
</script>

<style scoped>
    .sidernav{
        height: 870px;
    }
</style>