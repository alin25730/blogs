import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const actions = {
    audpdateInfo(context, payload) {
        return new Promise((reslove, reject) => {
            context.commit('ADDUSER', payload);
        })
    }
}
const mutations = {
    inBgSrc(state, src) {
        state.srcs = src;
    },
    ADDUSER(state, usr) {
        state.user = usr;
    },
    COLOR(state, color) {
        state.color = color;
    },
    Mkdown(state, Me) {
      
        state.Ecreat = true;
        state.Meditor = Me;
    }
}
const state = {
    srcs: {
        src: "",
        isShow: false,
    },
    user: {},
    color: '#F06292',
    Meditor: {},
    // 是编辑 还是创建
    Ecreat:false

}
const getters = {
  
}
export default new Vuex.Store({

    actions, mutations, state, getters
})