import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        sessionIsNew: true,
        session:{},
    },
    mutations: {
        getSession(state,s){
            state.session = s;
        },
        changeSessionIsNew(state,s){
            state.sessionIsNew = s;
        }
    }
});

export default store