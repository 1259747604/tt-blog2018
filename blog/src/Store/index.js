import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        sessionIsNew: true,
        session:{},
        scroll:{top:60}//首页滚动
    },
    mutations: {
        getSession(state,s){
            state.session = s;
        },
        changeSessionIsNew(state,s){
            state.sessionIsNew = s;
        },
        changeScroll(state,s){
            state.scroll = s;
        }
    }
});

export default store