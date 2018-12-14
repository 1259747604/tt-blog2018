<template>
    <div>
        <!--<h1>{{$store.state.session}}</h1>-->
        <ul ref="list">
            <li>
                <v-njzy></v-njzy>
            </li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
    import njzy from '../components/interesting/njzy';
    export default {
        name: "",
        components:{
            vNjzy:njzy
        },
        created(){

        },
        mounted(){
            this.setHeight();
        },
        methods:{
            setHeight(){
                const len = this.$refs.list.children.length;
                for(let i = 0; i < len; i++){
                    this.$refs.list.children[i].style.height = `${window.innerHeight}px`;
                }
            }
        }
    }
</script>

<style scoped>
    ul > li{
        width: 100%;
    }
    ul > li {
        position: relative;
        border-bottom:1px solid #e8eaec;
    }
</style>