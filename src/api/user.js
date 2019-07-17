/**
 * Created by wang on 2017/5/27.
 */
import { fetch } from '@/utils/fetch';

export function getUserById(id) {
  return fetch({
    url: '/user/userId',
    method: 'get',
    params: { id }
  });
}

export function getUserList(data) {
    return fetch({
        url: '/userslist?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search
    })
}

//获取七牛token
export function gettoken (data){
    return fetch({
        url: '/upfile/gettoken',
        method: 'get',
        params:data
    });
}
