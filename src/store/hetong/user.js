import { LoginByEmail, logout, getInfo } from '@/api/login';
import permission from '@/store/permission';
import router from '../../router';
import Cookies from 'js-cookie';

const user = {
  state: {
      user: JSON.parse(localStorage.getItem('CRM-User') || '{}'),
      token: Cookies.get('CRM-Token'),
      roles:JSON.parse(localStorage.getItem('SET_ROLES') || '{}'),
      jobTitle:JSON.parse(localStorage.getItem('SET_JOBTITLE') || '{}'),
  },

  mutations: {
      SET_TOKEN: (state, roles) => {
          Cookies.set('CRM-Token', roles);
          state.token = roles;
      },
    SET_USER: (state, user) => {
      localStorage.setItem('CRM-User', JSON.stringify(user));
      state.user = user;
    },
      SET_ROLES: (state, roles) => {
          localStorage.setItem('SET_ROLES', JSON.stringify(roles));
          state.roles = roles;
      },
      SET_JOBTITLE: (state, roles) => {
         localStorage.setItem('SET_JOBTITLE', JSON.stringify(roles));
         state.jobTitle = roles;
       }
  },

  actions: {
    // 登录
    LoginByEmail({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginByEmail(userInfo).then(response => {
          if(response.code == 200){
              let userInfoData = response.data;
              commit('SET_USER', userInfoData);
              commit('SET_JOBTITLE', response.roles);


              commit('SET_TOKEN', userInfoData.auth_key);
              const roles = response.auth;
              commit('SET_ROLES',roles);
              permission.state = {
                  hasInit: false,
                  headerMenu: [],
                  sidebarMenus: {}
              };
              permission.init({ // 初始化权限
                  roles: roles,
                  router: router.options.routes,
              });
              resolve('true');
              if(userInfo.checked == true){
                  localStorage.setItem('accountNumber', JSON.stringify(userInfo));
              }else{
                  localStorage.removeItem('accountNumber');
              }

          }else{
              resolve('false');
          }

        }).catch(error => {
          reject(error);
        });
      });
    },
      //微信登录
      weixinLogin({ commit, state }, userInfo) {
          let dataInfor = userInfo;
          return new Promise((resolve, reject) => {
              let userInfoData = dataInfor.data;
              commit('SET_USER', userInfoData);
              commit('SET_JOBTITLE', dataInfor.roles);


              commit('SET_TOKEN', userInfoData.auth_key);
              const roles = dataInfor.auth;
              commit('SET_ROLES',roles);
              permission.state = {
                  hasInit: false,
                  headerMenu: [],
                  sidebarMenus: {}
              };
              permission.init({ // 初始化权限
                  roles: roles,
                  router: router.options.routes
              });
              resolve();
          });
      },
      // 登出
      LogOut({ commit, state }) {
          commit('SET_TOKEN', '');
          Cookies.remove('CRM-Token');
          localStorage.removeItem('SET_ROLES');
          return new Promise((resolve, reject) => {
              resolve()
          });
      },
  }
};

export default user;
