import { fetch } from '@/utils/fetch';
//查看账户详情
export function account_info(userId) {
    return fetch({
        url: '/account_info/'+userId,
        method: 'get',
        params: ''
    });
}
//账户详情账户记录
export function account_historyApi(userId) {
    return fetch({
        url: '/account_history/'+userId,
        method: 'get',
        params: ''
    });
}
//媒体添加打款
export function meijie_dakuan_add(userId) {
    return fetch({
        url: '/meijie_dakuan_add/'+userId,
        method: 'get',
        params: ''
    });
}
//新增媒介打款返回
export function meijie_dakuan_add_ru(data) {
    return fetch({
        url: '/meijie_dakuan_add_ru',
        method: 'post',
        data:data
    });
}
//媒体合同
export function mcont_renew_list(data) {
    return fetch({
        url: '/mcont_renew_list',
        method: 'post',
        data:data
    });
}
//媒介打款 --退
export function mcont_tuikuan_list(data) {
    return fetch({
        url: '/mcont_tuikuan_list',
        method: 'get',
        params: data
    });
}
export function account_updataru(userId,data) {
    return fetch({
        url: '/account_updataru/'+userId,
        method: 'post',
        data:data
    });
}
//账户修改二级域名

export function add_jiexi_url(data) {
    return fetch({
        url: 'api/account/add_jiexi_url',
        method: 'post',
        data:data
    });
}

export function account_add(id) {
    return fetch({
        url: '/account_add/'+id,
        method: 'get',
        params: ''
    });
}
export function checkaccount_add(id) {
    return fetch({
        url: '/checkaccount_add/'+id,
        method: 'get',
        params: ''
    });
}

export function account_add_ru(data) {
    return fetch({
        url: '/account_add_ru',
        method: 'post',
        data:data
    });
}

export function meijie_renew_info(id) {
    return fetch({
        url: '/meijie_renew_info/'+id,
        method: 'get',
        params: ''
    });
}
export function mejierenewinfo(id) {
    return fetch({
        url: '/api/renew-huikuan/renew-info_meijie?id='+id,
        method: 'get',
        params: ''
    });
}

export function meijie_dakuan_info(id) {
    return fetch({
        url: '/meijie_dakuan_info/'+id,
        method: 'get',
        params: ''
    });
}
//媒介打保证金
export function meijie_margin_info(id) {
    return fetch({
        url: '/meijie_margin_info/'+id,
        method: 'get',
        params: ''
    });
}


//媒介补款详情
export function meijie_bukuan_info(id) {
  return fetch({
    url: '/meijie_bukuan_info/'+id,
    method: 'get',
    params: ''
  });
}
//媒介补款详情
export function meijie_fakuan_info(id) {
    return fetch({
        url: '/meijie_fakuan_info/'+id,
        method: 'get',
        params: ''
    });
}

//媒介回款详情
export function meijie_back_money_info(id) {
  return fetch({
    url: '/meijie_back_money_info/'+id,
    method: 'get',
    params: ''
  });
}
//媒介合同详情
export function meijie_contract_info(id) {
  return fetch({
    url: '/meijie_contract_info/'+id,
    method: 'get',
    params: ''
  });
}

//回款审核
export function meijie_huikuan_shenhe1(data,id) {
  return fetch({
    url: '/meijie_huikuan_shenhe1/'+id,
    method: 'post',
    data: data
  });
}
//回款审核
export function meijie_huikuan_shenhe2(data,id) {
  return fetch({
    url: '/meijie_huikuan_shenhe2/'+id,
    method: 'post',
    data: data
  });
}
//补款审核
export function meijie_bukuan_shenhe1(data,id) {
  return fetch({
    url: '/meijie_bukuan_shenhe1/'+id,
    method: 'post',
    data: data
  });
}
//补款审核
export function meijie_bukuan_shenhe2(data,id) {
  return fetch({
    url: '/meijie_bukuan_shenhe2/'+id,
    method: 'post',
    data: data
  });
}

//打款审核
export function meijie_dakuan_shenhe1(data,id) {
  return fetch({
    url: '/meijie_dakuan_shenhe1/'+id,
    method: 'post',
    data: data
  });
}

//打款审核
export function meijie_dakuan_shenhe2(data,id) {
  return fetch({
    url: '/meijie_dakuan_shenhe2/'+id,
    method: 'post',
    data: data
  });
}
//备款详情
export function beikuan_info(data){
    return fetch({
        url: '/beikuan_info/'+data,
        method: 'get',
    });
}
//备款退款详情
export function refund_money_beikuan_info(data){
    return fetch({
        url: '/refund_money_beikuan_info/'+data,
        method: 'get',
    });
}
//子流程
export function flow_fz_show(data){
    return fetch({
        url: '/flow_fz_show/'+data.name+"/"+data.id,
        method: 'get',
    });
}
//结束二级域
export function updemainstatus(data) {
    return fetch({
        url: '/updemainstatus/'+data.id,
        method: 'post',
        data: data
    });
}
//添加二级域
export function upaccount_tags(data) {
    return fetch({
        url: '/upaccount_tags/'+data.id,
        method: 'post',
        data: data
    });
}
//获取标签类型
export function account_tags_list(data){
    return fetch({
        url: '/account_tags_list',
        method: 'get',
    });
}

//获取时间范围内有消耗的账户数
export function getXiaohaoAccountNum(start,end){
    return fetch({
       url: '/tongji/mrenew/xiaohao_accounts',
       method: 'get',
       params: { start,end }
    });
}

//获取时间范围内日消耗平均值和最大值
export function getXiaohaoDailyAvg(start,end){
    return fetch({
        url: '/tongji/mrenew/xiaohao_daily-avg',
        method: 'get',
        params: { start,end }
    });
}

//获取时间范围内账户各个量级变化
export function getXiaohaoAccountPercent(start,end){
    return fetch({
        url: '/tongji/mrenew/xiaohao_account-percent',
        method: 'get',
        params: { start,end }
    });
}

//获取时间范围内top客户消耗变化
export function getXiaohaoTopCompany(start,end){
    return fetch({
        url: '/tongji/mrenew/xiaohao_top-company',
        method: 'get',
        params: { start,end }
    });
}

//获取时间范围内top账户消耗变化
export function getXiaohaoTopAccount(start,end){
    return fetch({
        url: '/tongji/mrenew/xiaohao_top-account',
        method: 'get',
        params: { start,end }
    });
}
//获取账户下二级域
export function account_name_for_doman_list(data){
    return fetch({
        url: 'account_name_for_doman_list',
        method: 'get',
        params: data
    });
}
//账户添加域名
export function manual_add_domain(data){
    return fetch({
        url: 'manual_add_domain',
        method: 'post',
        data: data
    });
}

