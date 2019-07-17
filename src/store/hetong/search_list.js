/**
 * Created by wang on 2017/5/13.
 */
import Cookies from 'js-cookie';

const accountt = {
    state: {
        search_list: JSON.parse(localStorage.getItem('search_list') || '{}'),
    },

    mutations: {
        SEARCH_LIST: (state, search_list) => {
            state.search_list = search_list;
            localStorage.setItem('search_list', JSON.stringify(search_list));
        },
    },

    actions: {
        searchData({ commit }, userInfo){

            commit('SEARCH_LIST', userInfo);
        },
    }
};

export default accountt;
