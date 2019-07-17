import { fetch } from '@/utils/fetch';

export function contractinfo(id) {
    return fetch({
        url: '/contract_info/'+id,
        method: 'get',
        params: ''
    });
}
//合同详情
export function contractinfo_new(id) {
    return fetch({
        url: '/contract_info_new/'+id,
        method: 'get',
        params: ''
    });
}
// 结算单详情
export function contract_accounts_info(id) {
    return fetch({
        url: '/contract_accounts_info/'+id,
        method: 'get',
        params: ''
    });
}
export function contract_addru1(data) {
    return fetch({
        url: '/contract_addru',
        method: 'post',
        data: data
    });
}
export function contract_account(id) {
    return fetch({
        url: '/contract_account/'+id,
        method: 'get',
        params: ''
    });
}
//一审
export function contract_shenhe1(data,id) {
    return fetch({
        url: '/contract_shenhe1/'+id,
        method: 'post',
        data: data
    });
}
//二审
export function contract_shenhe2(data,id) {
    return fetch({
        url: '/contract_shenhe2/'+id,
        method: 'post',
        data: data
    });
}
//历史
export function audit_history(data) {
    return fetch({
        url: '/audit_history/'+data.id+'/'+data.gongneng,
        method: 'get',
        params: ''
    });
}

export function renewhuikuan(data) {
    return fetch({
        url: '/api/renew-huikuan/order_upaccount',
        method: 'post',
        data: data
    });
}
//删除图片
export function delete_file(data) {
    return fetch({
        url: 'delete_file/'+data.id,
        method: 'get',
        params: ''
    });
}
//通知
export function getTo(data) {
    return fetch({
        url: 'to-do',
        method: 'get',
        params: ''
    });
}
