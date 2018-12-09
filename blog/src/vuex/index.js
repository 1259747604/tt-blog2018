import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        status:false,
        session:{},
    },
    mutations: {
        changeStatus(state,s){
            state.status = s;
        },
        getSession(state,s){
            state.session = s;
        },
    }
});

export default store