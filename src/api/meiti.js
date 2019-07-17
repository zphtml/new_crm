import { fetch } from '@/utils/fetch';

//媒体账户列表

export function meijie_customer_listPost(data){
    return fetch({
        url: '/meijie_customer_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//媒体控制台
export function mcustomer_info(data){
    return fetch({
        url: 'mcustomer_info/'+data.id,
        method: 'get',
    });
}
//添加媒体合同
export function meijie_contract_add(data){
    return fetch({
        url: 'meijie_contract_add/'+data.id,
        method: 'get',
    });
}
//新增合同
export function meijie_contract_num(data) {
    return fetch({
        url: 'meijie_contract_num',
        method: 'get',
    });
}
//产品线
export function productline(data) {
    return fetch({
        url: '/api/productline',
        method: 'get',
    });
}

export function meijie_contract_addru(data){
    return fetch({
        url: 'meijie_contract_addru',
        method: 'post',
        data:  data.data
    });
}
//新增媒体
export function meijie_customer_addru(data){
    return fetch({
        url: 'meijie_customer_addru',
        method: 'post',
        data:  data.data
    });
}
//媒介合同列表
export function meijie_customer_contract_list(data) {
    return fetch({
        url: 'meijie_customer_contract_list/All?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//打款列表
export function meijie_dakuan_list(data) {
    return fetch({
        url: '/meijie_dakuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//充值列表
export function meijie_renew_list(data) {
    return fetch({
        url: '/meijie_renew_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//充值列表
export function renew_list_meijie(data) {
    return fetch({
        url: '/renew_list_meijie?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}

//充值产品线
export function pr_lin_id(data) {
    return fetch({
        url: '/api/productline',
        method: 'get',
    });
}
//补款列表
export function meijie_bukuan_list(data) {
    return fetch({
        url: '/meijie_bukuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//补款列表
export function meijie_fakuan_list(data) {
    return fetch({
        url: '/meijie_fakuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}

//回款列表
export function meijie_huikuan_list(data) {
    return fetch({
        url: '/meijie_huikuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//退款列表
export function meijie_tuikuan_list(data) {
    return fetch({
        url: '/meijie_tuikuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//媒介
export function meijie_customer_contract_listConsole(data) {
    return fetch({
        url: 'meijie_customer_contract_list/'+data.id+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.data
    });
}
//打款
export function fpdakuan(data) {
    return fetch({
        url: 'fpdakuan/'+data.id+'?contractid='+data.data,
        method: 'get',
    });
}
export function fpdakuanAll(data) {
    return fetch({
        url: 'fpdakuan/'+data.id,
        method: 'get',
    });
}
//提交打款
export function fpdakuanru(data) {
    return fetch({
        url: 'fpdakuanru',
        method: 'post',
        data:  data.data
    });
}
//转出
export function meijie_zhuankuan(data) {
    return fetch({
        url: 'meijie_zhuankuan/'+data.id,
        method: 'get',
    });
}
export function meijie_zhuankuanruPost(data){
    return fetch({
        url: 'meijie_zhuankuanru',
        method: 'post',
        data:  data.data
    });
}
//归档
export function meijie_contract_guidang(data) {
    return fetch({
        url: '/meijie_contract_guidang/'+data.data,
        method: 'get',
    });
}
//作废
export function meijie_contract_zuofei(data) {
    return fetch({
        url: '/meijie_contract_zuofei/'+data.data,
        method: 'get',
    });
}
//结束
export function meijie_contract_jieshu(data) {
    return fetch({
        url: '/meijie_contract_jieshu/'+data.data,
        method: 'get',
    });
}
export function account_listAllPost(data) {
    return fetch({
        url: '/account_list/'+data.id+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//历史记录
export function meijie_contract_history (data){
    return fetch({
        url: 'meijie_contract_history/'+data.id+'?time_start='+data.time_start+"&time_end="+data.time_end+'&per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
//退款
export function meijie_add_refundmoney(data) {
    return fetch({
        url: 'meijie_add_refundmoney/'+data.id,
        method: 'get',
    });
}
// 退款提交
export function meijie_add_refundmoney_ru(data) {
    return fetch({
        url: 'meijie_add_refundmoney_ru',
        method: 'post',
        data:  data.data
    });
}
//新增补款信息      /合同id
export function add_bukuanGet(data){
    return fetch({
        url: 'meijie_add_bukuan/'+data.id,
        method: 'get',
    });
}
//新增补款上传信息      /合同id
export function add_bukuan_ru(data){
    return fetch({
        url: 'meijie_add_bukuan_ru',
        method: 'post',
        data:  data.data

    });
}

//新增补款信息
export function meijie_add_fakuan(data){
    return fetch({
        url: 'meijie_add_fakuan/'+data.id,
        method: 'get',
    });
}
//新增补款上传信息      /合同id
export function meijie_add_fakuan_ru(data){
    return fetch({
        url: 'meijie_add_fakuan_ru',
        method: 'post',
        data:  data.data

    });
}

//新增回款
export function add_huikuan(data) {
    return fetch({
        url: 'meijie_add_huikuan/'+data.id,
        method: 'get',
    });
}
//新增回款
export function addhuikuanru(data) {
    return fetch({
        url: 'meijie_addhuikuanru',
        method: 'post',
        data:  data.data
    });
}
//客户控制台-》总回款待
export function dshenhehk(data){
    return fetch({
        url: 'dshenhehk/'+data.id,
        method: 'get',
    });
}
//客户控制台-》总补款款待
export function dshenhebk(data){
    return fetch({
        url: 'dshenhebk/'+data.id,
        method: 'get',
    });
}
//消耗列表
export function cost_list(data) {
    return fetch({
        url: '/cost_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//上传文件
export function importxiaohao(data) {
    return fetch({
        url: 'importxiaohao?file='+data.url,
        method: 'get',
    });
}
//客户控制台-》总补款款待
export function meijie_dshenhedk(data){
    return fetch({
        url: 'meijie_dshenhedk/'+data.id,
        method: 'get',
    });
}
//产品线
export function meijie_prlin_list(data){
    return fetch({
        url: '/prlin_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//修改产品线
export function prlin_up(data){
    return fetch({
        url: 'prlin_up/'+data.id,
        method: 'post',
        data:  data.data
    });
}
//新增产品线
export function prlin_addru(data){
    return fetch({
        url: '/prlin_addru',
        method: 'post',
        data:  data.data
    });
}
//修改媒介返点
export function up_meijie_markey_fandian(data){
    return fetch({
        url: 'up_meijie_markey_fandian/'+data.id+'/'+data.fandian,
        method: 'get',
    });
}
//消耗列表
export function acccount_money(data){
    return fetch({
        url: '/acccount_money/'+data.start+'/'+data.end+'?page='+data.page,
        method: 'post',
        data:  data.data
    });
}
//金额列表详情
export function acccount_money_info(data){
    return fetch({
        url: 'acccount_money_info/'+data.start+'/'+data.end,
        method: 'post',
        data:  data.data
    });
}
//金额列表图标详情
export function acccount_money_info_day(data){
    return fetch({
        url: 'acccount_money_info_day/'+data.start+'/'+data.end,
        method: 'post',
        data:  data.data
    });
}
//媒介打保证金列表
export function meijie_margin_list(data){
    return fetch({
        url: '/meijie_margin_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//媒介保证金列表
export function meijie_margin_da_list(data){
    return fetch({
        url: '/meijie_margin_da_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//媒介打保证金列表
export function mcont_margin_list(data){
    return fetch({
        url: 'mcont_margin_list',
        method: 'post',
        data:  data.data
    });
}
//媒介打保证金
export function meijie_margin_add(data){
    return fetch({
        url: 'meijie_margin_add/'+data.id,
        method: 'get',
    });
}
//媒介保证金提交打款
export function meijie_margin_add_ru(data){
    return fetch({
        url: 'meijie_margin_add_ru',
        method: 'post',
        data:  data.data
    });
}
//媒体保证金退款
export function tuimargin(data){
    return fetch({
        url: 'tuimargin/'+data.id,
        method: 'post',
        data:  data.data
    });
}
//保证金退款列表
export function meijie_margin_tui_list(data){
    return fetch({
        url: '/meijie_margin_tui_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//保证金退款详情
export function meijie_margin_tui_info(data){
    return fetch({
        url: '/meijie_margin_tui_info/'+data,
        method: 'get',
    });
}
//应付款列表
export function yfk_list(data){
    return fetch({
        url: '/yfk_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//新增备款详情
export function add_beikuan(data){
    return fetch({
        url: '/add_beikuan/'+data.id,
        method: 'get',
    });
}
//获取备款
export function beikuan_account_info(data){
    return fetch({
        url: '/beikuan_account_info/'+data.id,
        method: 'get',
    });
}
//新增备款账户退款
export function refund_money_add_ru_beikuan(data){
    return fetch({
        url: '/refund_money_add_ru_beikuan',
        method: 'post',
        data:data.data
    });
}
//新增备款
export function add_beikuan_ru(data){
    return fetch({
        url: '/add_beikuan_ru',
        method: 'post',
        data:  data.data
    });
}
//账户添加
export function beikuan_account_add_ru(data){
    return fetch({
        url: '/beikuan_account_add_ru',
        method: 'post',
        data:  data.data
    });
}
//备款列表
export function beikuan_list(data){
    return fetch({
        url: '/beikuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//备款详情
export function beikuanAccountHistory(data){
    return fetch({
        url: 'api/beikuan/beikuan-account-history',
        method: 'get',
        params: data
    });
}

//备款退款列表
export function refund_money_list_beikuan(data){
    return fetch({
        url: '/refund_money_list_beikuan?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search
    });
}

//备款抵扣
export function beikuan_account_renewlist(data){
    return fetch({
        url: '/beikuan_account_renewlist',
        method: 'post',
        data:  data
    });
}
//备款抵扣提交
export function beikuan_account_renew_binding(data){
    return fetch({
        url: '/beikuan_account_renew_binding',
        method: 'post',
        data:  data
    });
}
//媒介转出账户
export function account_list_m(data){
    return fetch({
        url: '/account_list_m/'+data.id,
        method: 'get',
    });
}
//媒介转出账户
export function copyaccount(data){
    return fetch({
        url: '/copyaccount',
        method: 'post',
        data:  data
    });
}
//媒介备款
export function beikuan_account_list(data) {
    return fetch({
        url: '/beikuan_account_list/'+data.id+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//结束备款账户
export function beikuanAccountStatus(data) {
    return fetch({
        url: '/beikuanAccountStatus/'+data.id+'/'+data.state,
        method: 'get',
    });
}
//媒体退款列表
export function meitituikuan_list(data) {
    return fetch({
        url: '/meitituikuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//媒体退款
export function meitituikuan_info(data){
    return fetch({
        url: '/meitituikuan_info/'+data,
        method: 'get',
    });
}
//获取最近消耗日期
export function account_last_date(data){
    return fetch({
        url: '/account_last_date',
        method: 'get',
        params:data
    });
}
//按账户消耗涨跌
export function account_cost_zf(data){
    return fetch({
        url: '/account_cost_zf',
        method: 'get',
        params:data
    });
}
//按公司消耗涨跌
export function account_cost_zf_ad(data){
    return fetch({
        url: '/account_cost_zf_ad',
        method: 'get',
        params:data
    });
}
//按公司消耗涨跌
export function account_cost_zf_all(data){
    return fetch({
        url: '/account_cost_zf_all',
        method: 'get',
        params:data
    });
}
//按公司时段涨跌
export function account_cost_zf_ad_choosable(data){
    return fetch({
        url: '/account_cost_zf_ad_choosable',
        method: 'get',
        params:data
    });
}
//按账户时段涨跌
export function account_cost_zf_choosable(data){
    return fetch({
        url: '/account_cost_zf_choosable',
        method: 'get',
        params:data
    });
}
//总时段消耗涨跌
export function account_cost_zf_all_choosable(data){
    return fetch({
        url: '/account_cost_zf_all_choosable',
        method: 'get',
        params:data
    });
}
