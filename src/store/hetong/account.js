/**
 * Created by wang on 2017/5/13.
 */
import Cookies from 'js-cookie';

const accountt = {
  state: {
      accounts: JSON.parse(localStorage.getItem('accounts') || '{}'),
  },

  mutations: {
    SET_USER_ACCOUNTS: (state, accounts) => {
      state.accounts = accounts;
      localStorage.setItem('accounts', JSON.stringify(accounts));
    },
  },

  actions: {
    Account({ commit }, userInfo){
      commit('SET_USER_ACCOUNTS', userInfo);
    },
  }
};

export default accountt;
