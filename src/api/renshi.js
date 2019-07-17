import { fetch } from '@/utils/fetch';
//退款列表
export function qingjiaList(data) {
    return fetch({
        url: '/qingjia_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });}
//外出
export function waichu_list(data) {
    return fetch({
        url: '/waichu_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}

//我要外出
export function waichu_addru(data) {
    return fetch({
        url: '/waichu_addru',
        method: 'post',
        data:  data
    });
}

//新建账号
export function addusers(data) {
    return fetch({
        url: '/addusers',
        method: 'post',
        data:  data
    });
}

//媒体账户列表

export function qingjia_addru(data){
    return fetch({
        url: '/qingjia_addru',
        method: 'post',
        data:  data
    });
}

//请假详情
export function qingjia_info(id) {
  return fetch({
    url: '/qingjia_info/'+id,
    method: 'get',
    params: ''
  });
}

//请假审核
export function qingjia_shenhe1(data,id) {
  return fetch({
    url: '/qingjia_shenhe1/'+id,
    method: 'post',
    data: data
  });
}
//请假审核
export function qingjia_shenhe2(data,id) {
  return fetch({
    url: '/qingjia_shenhe2/'+id,
    method: 'post',
    data: data
  });
}
//外出详情
export function waichu_info(id) {
  return fetch({
    url: '/waichu_info/'+id,
    method: 'get',
    params: ''
  });
}

//外出审核
export function waichu_shenhe1(data,id) {
  return fetch({
    url: '/waichu_shenhe1/'+id,
    method: 'post',
    data: data
  });
}
//外出审核
export function waichu_shenhe2(data,id) {
  return fetch({
    url: '/waichu_shenhe2/'+id,
    method: 'post',
    data: data
  });
}
//用户列表
export function bumenlist() {
  return fetch({
    url: '/bumenlist',
    method: 'get',
    params: ''
  });
}
//用户列表
export function bumenusers(id) {
  return fetch({
    url: '/bumenusers/'+id,
    method: 'get',
    params: ''
  });
}
//用户列表
export function delete_bumen(id) {
  return fetch({
    url: '/delete_bumen/'+id,
    method: 'get',
    params: ''
  });
}
//用户列表
export function add_bumen(data) {
  return fetch({
    url: '/add_bumen',
    method: 'post',
    data: data
  });
}

//分配用户
export function users_to_bumen(data) {
    return fetch({
        url: '/users_to_bumen',
        method: 'post',
        data: data
    });
}
//角色
export function get_roles() {
    return fetch({
        url: '/get_roles',
        method: 'get',
        params: ''
    });
}
//修改信息
export function usersinfo(data) {
    return fetch({
        url: '/usersinfo/'+data.id,
        method: 'get',
    });
}
//上传
export function upusersinfo(data) {
    return fetch({
        url: '/upusersinfo/'+data.id,
        method: 'post',
        data: data.search
    });
}
//删除
export function user_delete(data) {
    return fetch({
        url: '/user_delete/'+data.id,
        method: 'get',
    });
}
//修改部门名称
export function up_bumen(data) {
    return fetch({
        url: '/up_bumen/'+data.id,
        method: 'post',
        data: data.data
    });
}

//首页公告
export function article_class_list(data) {
    return fetch({
        url: '/article_class_list',
        method: 'get',
    });
}
//添加标题
export function add_article_class(data) {
    return fetch({
        url: '/add_article_class',
        method: 'post',
        data: data.data
    });
}
//删除标题
export function delete_ar_class(data) {
    return fetch({
        url: '/delete_ar_class/'+data.id,
        method: 'get',
    });
}
//修改标题
export function up_ar_class(data) {
    return fetch({
        url: '/up_ar_class/'+data.id,
        method: 'post',
        data: data.data
    });
}
//上传标题附件
export function article_addru(data) {
    return fetch({
        url: '/article_addru',
        method: 'post',
        data: data.data
    });
}
//上传标题附件
export function article_list(data) {
    return fetch({
        url: '/article_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data: data.data
    });
}
//删除上传
export function article_delete(data) {
    return fetch({
        url: '/article_delete/'+data.id,
        method: 'get',
    });
}
//日志查看
export function log_list(data) {
    return fetch({
        url: '/api/action-log/log-list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}

