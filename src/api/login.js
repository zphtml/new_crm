import { fetch } from '@/utils/fetch';

export function LoginByEmail(tok) {
    return fetch({
        url: '/login',
        method: 'post',
        data:  tok
    });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

//修改头像
export function uptouxiang(id,data) {
  return fetch({
    url: 'uptouxiang/'+id,
    method: 'post',
    data:  data
  });
}


//修改个人信息
export function upusersinfo(id,data) {
  return fetch({
    url: 'upusersinfo/'+id,
    method: 'post',
    data:  data
  });
}


export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
//修改密码
export function uppassword(data) {
    return fetch({
        url: 'uppassword/'+data.id,
        method: 'post',
        data:  data.data
    });
}
//微信
export function wxlogin(tok) {

    return fetch({
        url: '/wechat_login',
        method: 'get',
        params: tok
    });
}
