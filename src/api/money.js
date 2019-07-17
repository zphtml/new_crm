import { fetch } from '@/utils/fetch';

export function renewinfo(id) {
    return fetch({
        url: '/api/renew-huikuan/renew-info?id='+id,
        method: 'get',
        params: ''
    });
}
//媒介退款详情
export function meijie_tuikuan_info(id) {
    return fetch({
        url: '/meijie_tuikuan_info/'+id,
        method: 'get',
        params: ''
    });
}


export function get_files(val,type) {
    return fetch({
        url: '/get_files/'+val+'/'+type,
        method: 'get',
        params: ''
    });
}
//退款审核
export function meijie_tuikuan_shenhe1(data,id) {
    return fetch({
        url: '/meijie_tuikuan_shenhe1/'+id,
        method: 'post',
        data: data
    });
}
//退款审核
export function meijie_tuikuan_shenhe2(data,id) {
  return fetch({
    url: '/meijie_tuikuan_shenhe2/'+id,
    method: 'post',
    data: data
  });
}
export function shenhe2(data,id) {
    return fetch({
        url: '/api/renew-huikuan/shenhe2?id='+id,
        method: 'post',
        data: data
    });
}
export function shenheapi(data,id,num) {
    return fetch({
        url: '/api/renew-huikuan/shenhe'+num+'?id='+id,
        method: 'post',
      data: data
    });
}
export function shenheapi_a(data,id,num) {
    return fetch({
        url: '/'+num+'/'+id,
        method: 'post',
        data: data
    });
}
export function shenheapi_b(data,id,num) {
    return fetch({
        url: '/api/renew-huikuan/'+num+'?id='+id,
        method: 'post',
        data: data
    });
}
//发票详情
export function invoice_info(id) {
    return fetch({
        url: '/invoice_info/'+id,
        method: 'get',
        data:''
    });
}
export function back_money_info(id) {
    return fetch({
        url: '/back_money_info/'+id,
        method: 'get',
        data:''
    });
}
//退款详情
export function refundmoney_info(id) {
    return fetch({
        url: '/refundmoney_info/'+id,
        method: 'get',
        data:''
    });
}
//补款详情
export function bukuan_info(id) {
    return fetch({
        url: '/bukuan_info/'+id,
        method: 'get',
        data:''
    });
}
//保证金详情
export function margin_info(id) {
    return fetch({
        url: '/margin_m_info/'+id,
        method: 'get',
        data:''
    });
}
//补款审核
export function bukuan_shenhe1(data,id) {
    return fetch({
        url: '/bukuan_shenhe1/'+id,
        method: 'post',
      data: data
    });
}
//发票修改
export function invoice_update_ru(data,id) {
    return fetch({
        url: '/invoice_update_ru/'+data,
        method: 'post',
      data: id
    });
}
//发票审核
export function invoice_shenhe2(data,id) {
    return fetch({
        url: '/invoice_shenhe2/'+id,
        method: 'post',
      data: data
    });
}
//发票审核
export function invoice_shenhe1(data,id) {
    return fetch({
        url: '/invoice_shenhe1/'+id,
        method: 'post',
      data: data
    });
}
//补款审核
export function bukuan_shenhe2(data,id) {
    return fetch({
        url: '/bukuan_shenhe2/'+id,
        method: 'post',
      data: data
    });
}
//退款审核
export function refundmoney_account_p(data,id) {
    return fetch({
        url: '/refundmoney_account_p/'+id,
        method: 'post',
      data: data
    });
}
//退款审核
export function refundmoney_account_z_shenhe1(data,id) {
    return fetch({
        url: '/refundmoney_account_z_shenhe1/'+id,
        method: 'post',
      data: data
    });
}
//退款审核
export function refundmoney_account_z_shenhe2(data,id) {
    return fetch({
        url: '/refundmoney_account_z_shenhe2/'+id,
        method: 'post',
      data: data
    });
}
//退款审核
export function refundmoney_kehu_shenhe1(data,id) {
    return fetch({
        url: '/refundmoney_kehu_shenhe1/'+id,
        method: 'post',
      data: data
    });
}
//退款审核
export function refundmoney_kehu_shenhe2(data,id) {
    return fetch({
        url: '/refundmoney_kehu_shenhe2/'+id,
        method: 'post',
      data: data
    });
}
//回款审核
export function back_money1(data,id) {
    return fetch({
        url: '/api/back-money/shenhe1?id='+id,
        method: 'post',
      data: data
    });
}
//回款审核
export function back_money2(data,id) {
    return fetch({
        url: '/api/back-money/shenhe2?id='+id,
        method: 'post',
      data: data
    });
}
//已回款逾期
export function yihuikuanyuqi(data) {
    return fetch({
        url: 'yihuikuanyuqi?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//未回款逾期  充值
export function weihuikuanyuqi(data) {
    return fetch({
        url: 'weihuikuanyuqi?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//未回款逾期  公司
export function weihuikuanyuqicu(data) {
    return fetch({
        url: 'weihuikuanyuqicu?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//充值列表
export function renew_list_caiwu(data) {
    return fetch({
        url: '/renew_list_caiwu?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//充值详情
export function caiwu_renew(id) {
    return fetch({
        url: '/api/renew-huikuan/renew-info_caiwu?id='+id,
        method: 'get',
        params: ''
    });
}
//财务总览 打款折线图
export function dakuan_huikuan_tu(data) {
    return fetch({
        url: 'dakuan_huikuan_tu/'+data.id,
        method: 'get',
        params: ''
    });
}
//财务总览 消耗折线图
export function xiaohaotj(data) {
    return fetch({
        url: 'xiaohaotj/'+data.start+"/"+data.end,
        method: 'get',
        params: data.data
    });
}
//财务总览 消耗饼图
export function xiaohaotjprlin(data) {
    return fetch({
        url: 'xiaohaotjprlin/'+data.id,
        method: 'get',
        params: ''
    });
}
//公司消耗排名
export function xiaohaorank(data) {
    return fetch({
        url: 'xiaohaorank',
        method: 'get',
        params: ''
    });
}
//财务充值-饼图
export function productlinrenewtj(data) {
    return fetch({
        url: 'productlinrenewtj/'+data.start+'/'+data.end,
        method: 'get',
        params: ''
    });
}
export function productlinadtj(data) {
    return fetch({
        url: 'productlinadtj/'+data.start+'/'+data.end,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function contract_date_sum(data,data1){
    return fetch({
        url: 'contract_date_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function xiaohao_date_sum(data,data1){
    return fetch({
        url: 'xiaohao_date_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}

//财务总揽

export function money_huikuan_sum(data,data1){
    return fetch({
        url: 'money_huikuan_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function diankuan_compare(data){
    return fetch({
        url: '/diankuan_compare',
        method: 'get',
        params: data
    });
}
//财务总揽

export function Find_market_week_counsumption_statistics(data){
    return fetch({
        url: 'Find_market_week_counsumption_statistics/'+data,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function money_bukuan_sum(data,data1){
    return fetch({
        url: 'money_bukuan_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function money_diankuan_sum(data,data1){
    return fetch({
        url: 'money_diankuan_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//财务总揽

export function money_fukuan_sum(data,data1){
    return fetch({
        url: 'money_fukuan_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//财务总览
export function money_kehubukuan_sum(data,data1){
    return fetch({
        url: 'money_kehubukuan_sum/'+data+'/'+data1,
        method: 'get',
        params: ''
    });
}
//金额排名
export function money_xh_rank(data,data1){
    return fetch({
        url: 'money_xh_rank',
        method: 'get',
        params: ''
    });
}
//充值金额
export function xufeirank(data,data1){
    return fetch({
        url: 'xufeirank',
        method: 'get',
        params: ''
    });
}
//充值金额
export function money_xufei_rank(data,data1){
    return fetch({
        url: 'money_xufei_rank',
        method: 'get',
        params: ''
    });
}

//销售提成
export function market_ticheng_all(data){
    return fetch({
        url: 'market_ticheng_all/'+data.start+"/"+data.end,
        method: 'get',
        params: ''
    });
}
//客户详情
export function market_ticheng(data){
    return fetch({
        url: 'market_ticheng/'+data.start+"/"+data.end+"/"+data.id+data.type+"?per-page="+data.perpage+"&page="+data.page,
        method: 'get',
        params: ''
    });
}
//销售提成-订单--饼图
export function market_ticheng_adstate(data){
    return fetch({
        url: 'market_ticheng_adstate/'+data.start+"/"+data.end+"/"+data.id,
        method: 'get',
        params: ''
    });
}
//销售提成-公司--表格
export function market_ad_ticheng(data){
    return fetch({
        url: 'market_ad_ticheng/'+data.start+"/"+data.end+"/"+data.id,
        method: 'get',
        params: ''
    });
}
//销售提成-公司--线
export function market_ad_ticheng_line(data){
    return fetch({
        url: 'market_ad_ticheng/'+data.start+"/"+data.end+"/"+data.id+"?order="+data.lirun,
        method: 'get',
        params: ''
    });
}

//销售提成-个人评估-客户数量
export function market_new_customer_cn(data){
    return fetch({
        url: 'market_new_customer_cn/'+data.id+"/"+data.date,
        method: 'get',
        params: ''
    });
}
//销售提成-客户详情-提成加法
export function market_ticheng_zongji(data){
    return fetch({
        url: 'market_ticheng_zongji/'+data.start+"/"+data.end+"/"+data.id,
        method: 'get',
        params: ''
    });
}
//销售提成-个人评估
export function market_lirun_money_zhexian(data){
    return fetch({
        url: 'market_lirun_money_zhexian/'+data.date+"/"+data.id,
        method: 'get',
        params: ''
    });
}
//各产品线-消耗
export function xiaohaomoneytjprlin(data) {
    return fetch({
        url: 'xiaohaomoneytjprlin/'+data.start+"/"+data.end,
        method: 'post',
        data:  data.prlin
    });
}
//各产品线-充值
export function renewmoneytjprlin(data) {
    return fetch({
        url: 'renewmoneytjprlin/'+data.start+"/"+data.end,
        method: 'post',
        data:  data.prlin
    });
}
//产品线 消耗占比
export function xiaohaoprzhanbi(data){
    return fetch({
        url: 'xiaohaoprzhanbi/'+data.state+"/"+data.end,
        method: 'post',
        data:  data.prlin
    });
}
//产品线 消耗占比
export function renewproduct(data){
    return fetch({
        url: 'renewproduct/'+data.state+"/"+data.end,
        method: 'post',
        data:  data.prlin
    });
}
//媒体总保证金
export function margin_mt_sum(data,data1){
    return fetch({
        url: '/api/meijie-margin/margin_mt_sum',
        method: 'get',
        params: ''
    });
}
//客户总保证金
export function margin_kh_sum(data,data1){
    return fetch({
        url: '/api/meijie-margin/margin_kh_sum',
        method: 'get',
        params: ''
    });
}
// 总垫付保证金
export function margin_kh_d_sum(data,data1){
    return fetch({
        url: '/api/meijie-margin/margin_kh_d_sum',
        method: 'get',
        params: ''
    });
}
//媒体保证金列表
export function margin_meijie_list(data,data1){
    return fetch({
        url: '/margin_meijie_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//客户保证金列表
export function margin_kehu_list(data,data1){
    return fetch({
        url: '/margin_kehu_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//垫款列表
export function margin_m_list(data,data1){
    return fetch({
        url: '/margin_m_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
export function renew_beikuan_account(data){
    return fetch({
        url: 'renew_beikuan_account/'+data.id,
        method: 'post',
        data:  data
    });
}
//申请盖章列表
export function gaizhang_list(data){
    return fetch({
        url: '/gaizhang_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
export function gaizhang_addru(data){
    return fetch({
        url: '/gaizhang_addru',
        method: 'post',
        data:  data.data
    });
}
//盖章基本信息
export function gaizhang_info(id) {
    return fetch({
        url: '/gaizhang_info/'+id,
        method: 'get',
        data:''
    });
}
//财务数据统计续费
export function renew_list(data){
    return fetch({
        url: '/tongji/financial/renew-list',
        method: 'get',
        params: data
    });
}
//财务数据统计备款
export function beikuan_accounts(data){
    return fetch({
        url: '/tongji/financial/beikuan-accounts',
        method: 'get',
        params: data
    });
}
//
export function check_kehu_data(data){
    return fetch({
        url: '/tongji/financial/check-kehu-data',
        method: 'get',
        params: data
    });
}

