import Vue from 'vue';
import Vuex from 'vuex';
import app from './hetong/app';
import user from './hetong/user';
import account from './hetong/account';
import audit_action from './hetong/audit_action';
import search_list from './hetong/search_list';
import getters from './getters';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    account,
    audit_action,
    search_list
  },
  getters
});

export default store