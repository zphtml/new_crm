/**
 * Created by wang on 2017/5/13.
 */
import Cookies from 'js-cookie';

const accountt = {
    state: {
        audit_action: JSON.parse(localStorage.getItem('audit_action') || '{}'),
    },

    mutations: {
        AUDIT_ACTION: (state, audit_action) => {
            state.audit_action = audit_action;
            localStorage.setItem('audit_action', JSON.stringify(audit_action));
        },
    },

    actions: {
        audit_action({ commit }, userInfo){
            commit('AUDIT_ACTION', userInfo);
        },
    }
};

export default accountt;
