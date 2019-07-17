import { fetch } from '@/utils/fetch';


export function customer_list(data,data1) {
    return fetch({
        url: '/customer_list/'+data.id+'?per-page='+data1.per_page+'&page='+data1.page,
        method: 'post',
        data:data1
    });
}
export function customer_list1(data,data1,a,b) {
    return fetch({
        url: '/customer_list?per-page='+b+'&page='+a,
        method: 'post',
        data:data1
    });
}
//客户联系人列表

export function custmobercontact(token) {
    return fetch({
        url: '/custmober_contact/'+token,
        method: 'get',
        params: ''
    });
}
//客户信息
export function apicustomers(data) {
    return fetch({
        url: '/api/customers/'+data+'?expand=business0,submituser0,contact',
        method: 'get',
    });
}
//获取公司联系人
export function contact_list(data) {
    return fetch({
        url: '/api/contact/contact-list',
        method: 'get',
        params: data
    });
}
//新增合同
export function contract_add(data) {
    return fetch({
        url: 'contract_add/'+data.id,
        method: 'get',
    });
}
//新增合同
export function contract_num(data) {
    return fetch({
        url: 'contract_num',
        method: 'get',
    });
}


//删除联系人信息
export function contacts(data) {
    return fetch({
        url: '/api/contact/delete-contact',
        method: 'get',
        params: data
    });
}

//新建联系人信息
export function addcontacts(data) {
    return fetch({
        url: '/api/contact/add-contact',
        method: 'post',
        data:data
    });
}


//更改基本信息
export function changecustomers(data,data1) {
    return fetch({
        url: '/api/customers/'+data,
        method: 'put',
        data:data1
    });
}


export function Roler_users(data,name) {
    return fetch({
        url: '/Roler_users?role_name='+name,
        method: 'get',
        params:''
    });
}
//新增合同提交

export function hetongAddru(data) {
    return fetch({
        url: '/contract_addru',
        method: 'post',
        data:  data.data
    });
}
export function customers(data,comp) {
    return fetch({
        url: '/api/customers/'+comp,
        method: 'put',
        data:data
    });
}

export function Upmarket(a,b,c) {
    return fetch({
        url: '/Upmarket/'+a+'/'+b+'/'+c,
        method: 'put',
        data:''
    });
}


export function getInfo(token) {
    return fetch({
        url: '/user/info',
        method: 'get',
        params: { token }
    });
}
export function auditaction() {
    return fetch({
        url: '/api/audit-action/h',
        method: 'get',
        params: ''
    });
}

export function customerList(data) {
    return fetch({
        url: '/customer_list?&per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
export function customer_listPost(data) {
    return fetch({
        url: '/customer_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
export function customersConsole(data) {
    return fetch({
        url: '/api/customers/'+data.id+'?expand=business0,submituser0',
        method: 'get',
    });
}
//客户控制台
export function customer_contract_list(data) {
    return fetch({
        url: '/customer_contract_list/'+data.data+'?per-page=9999&page=1',
        method: 'post',
        data:  data.val
    });
}
//归档
export function contract_guidang(data) {
    return fetch({
        url: '/contract_guidang/'+data.data,
        method: 'get',
    });
}
//媒体归档
export function meijie_contract_guidang(data) {
    return fetch({
        url: '/meijie_contract_guidang/'+data.data,
        method: 'get',
    });
}

//作废
export function contract_zuofei(data) {
    return fetch({
        url: '/contract_zuofei/'+data.data,
        method: 'get',
    });
}
//结束
export function contract_jieshu(data) {
    return fetch({
        url: '/contract_jieshu/'+data.data,
        method: 'get',
    });
}
//客保列表
export function market_kebao_list(data) {
    return fetch({
        url: '/market_kebao_list/'+data.id+'?per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
//客保列表筛选

export function market_kebao_list_post(data) {
    return fetch({
        url: '/market_kebao_list/'+data.id+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//客保放弃,续保,客户池认领
export function customerbs(data) {
    return fetch({
        url: '/kebao_renling/'+data.id+'/'+data.id_x,
        method: 'get'
    });
}
//客保放弃，续保

export function kh_customerbs(data) {
    return fetch({
        url: '/api/customerbs/'+data.id,
        method: 'put',
        data:data.data
    });
}
//判断公司是否重复
export function kebao_is_conflict(data) {
    return fetch({
        url: '/kebao_is_conflict?weburl='+data.url+'&appname='+data.name+'&advertiser='+data.advertiser+'&true_advertiser='+data.true_advertiser,
        method: 'get',
    });
}
//创建客保
export function Addcustomerbs(data) {
    return fetch({
        url: '/api/customerbs',
        method: 'post',
        data:data.data
    });
}
//客户池
export function market_kehuchi_list(data) {
    return fetch({
        url: '/market_kehuchi_list?per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
//客户池筛选
export function market_kehuchi_listPost(data) {
    return fetch({
        url: '/market_kehuchi_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//充值列表
export function renew_list(data) {
    return fetch({
        url: '/renew_list?per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
//充值详情--判断媒体审核
export function account_upkuan(data) {
    return fetch({
        url: '/account_upkuan?accountid='+data.accountid+'&type='+data.payment_type+'&dk_date='+data.dk_date+"&dk_zhouqi="+data.dk_zhouqi,
        method: 'get',
        data:data
    });
}
//充值列表筛选
export function renew_list_post(data){
    return fetch({
        url: '/renew_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//合同列表
export function contract_list(data) {
    return fetch({
        url: 'customer_contract_list?per-page='+data.page+'&page='+data.num,
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
//产品线
export function productlineId(data) {
    return fetch({
        url: '/api/productline?customerid='+data.id,
        method: 'get',
    });
}
//合同列表筛选

export function contract_listPost(data){
    return fetch({
        url: 'customer_contract_list/All?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//协议列表
export function xieyiList_Infor(data){
    return fetch({
        url: 'customer_contract_list/All?per-page=9999&page=1',
        method: 'post',
        data:  data.data
    });
}
//回款
export function huikuan_listPost(data){
    return fetch({
        url: '/huikuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//新增充值
export function add_renew(data) {
    return fetch({
        url: 'add_renew/'+data.id,
        method: 'get',
    });
}
//新增充值提交
export function renewHuikuan(data){
    return fetch({
        url: '/api/renew-huikuan/addru?contract_id='+data.id,
        method: 'post',
        data:  data.data
    });
}
//新增回款
export function add_huikuan(data) {
    return fetch({
        url: 'add_huikuan/'+data.id,
        method: 'get',
    });
}
//新增回款
export function addhuikuanru(data) {
    return fetch({
        url: 'addhuikuanru',
        method: 'post',
        data:  data.data
    });
}
//新增创建账户
export function account_add_ru(data) {
    return fetch({
        url: 'account_add_ru',
        method: 'post',
        data:  data.data
    });
}
//新增创建用户
export function account_add_pi_ru(data) {
    return fetch({
        url: 'account_add_pi_ru',
        method: 'post',
        data:  data
    });
}


//分配回款
export function fphuikuan(data) {
    return fetch({
        url: 'fphuikuan/'+data.id,
        method: 'post',
        data:  data.data
    });
}
export function fphuikuanru(data) {
    return fetch({
        url: 'fphuikuanru',
        method: 'post',
        data:  data.data
    });
}
//退款到总账户
export function refund_account_listPost(data){
    return fetch({
        url: '/refund_account_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//退款到客户列表
export function refund_kehu_listPost(data){
    return fetch({
        url: '/refund_kehu_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//退款
export function add_refundmoney_z(data) {
    return fetch({
        url: 'add_refundmoney/'+data.id,
        method: 'get',
    });
}
// 退款提交
export function add_refundmoney_ru_z(data) {
    return fetch({
        url: 'add_refundmoney_ru',
        method: 'post',
        data:  data.data
    });
}
//分配回款
export function fphuikuanConsole(data) {
    return fetch({
        url: 'fphuikuan/'+data.data+'?contractid='+data.id,
        method: 'get',
    });
}
//补款列表
export function bukuan_listPost(data){
    return fetch({
        url: '/bukuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//新增补款信息      /合同id
export function add_bukuanGet(data){
    return fetch({
        url: 'add_bukuan/'+data.id,
        method: 'get',
    });
}
//新增补款上传信息      /合同id
export function add_bukuan_ru(data){
    return fetch({
        url: 'add_bukuan_ru',
        method: 'post',
        data:  data.data

    });
}
//发票列表
export function fapiaoPost(data){
    return fetch({
        url: '/invoice_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//新增发票信息
export function invoice_addInfor(data){
    return fetch({
        url: 'invoice_add/'+data.id,
        method: 'get',
    });
}
//新增发票税目
export function invoice_typeInfor(data){
    return fetch({
        url: 'invoice_type/'+data.id,
        method: 'get',
    });
}

//添加发票

export function invoice_addruPost(data){
    return fetch({
        url: 'invoice_addru',
        method: 'post',
        data:  data.data
    });
}
//转出
export function zhuankuan(data){
    return fetch({
        url: 'zhuankuan/'+data.id,
        method: 'get',
    });
}
export function zhuankuanruPost(data){
    return fetch({
        url: 'zhuankuanru',
        method: 'post',
        data:  data.data
    });
}
//历史记录
export function contract_history(data){
    return fetch({
        url: 'contract_history/'+data.id+'?time_start='+data.time_start+"&time_end="+data.time_end+'&per-page='+data.page+'&page='+data.num,
        method: 'get',
    });
}
//客保系统 转正
export function customerbsInfor(data){
    return fetch({
        url: 'api/customerbs/'+data.id,
        method: 'get',
    });
}
//d代理公司
export function agent_company(data){
    return fetch({
        url: 'api/agent-company/',
        method: 'get',
    });
}
//媒介合同
export function contract_meijie_list(data){
    return fetch({
        url: 'contract_meijie_list',
        method: 'get',
    });
}
// 客保创建合同
export function customer_addru(data){
    return fetch({
        url: 'customer_addru',
        method: 'post',
        data:  data.data
    });
}
//已回款充值
export function yihuikuanxufei_list(data){
    return fetch({
        url: '/yihuikuanxufei_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//修改返点
export function upgerenfandian(data){
    return fetch({
        url: 'upgerenfandian/'+data.id+'/'+data.data,
        method: 'get',
    });
}
export function meijie_customer_listPost(data){
    return fetch({
        url: '/meijie_customer_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
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

//客户控制台-》延期
export function contract_yanqi(data){
    return fetch({
        url: 'contract_yanqi/'+data.id+"/"+data.date,
        method: 'get',
    });
}
//渠道打款
export function qddakuan_list(data){
    return fetch({
        url: '/qddakuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//渠道打款信息
export function qddakuan_info(data){
    return fetch({
        url: 'qddakuan_info/'+data.id,
        method: 'get',
    });
}
//添加渠道打款信息
export function add_qddakuan(data){
    return fetch({
        url: 'add_qddakuan/'+data.id,
        method: 'get',
    });
}
//添加渠道打款
export function add_qddakuan_ru(data){
    return fetch({
        url: 'add_qddakuan_ru',
        method: 'post',
        data:  data.data
    });
}

//合同 --》合同列表
export function customer_contract_list_new(data){
    return fetch({
        url: 'customer_contract_list_new/'+data.data+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//合同 --》协议列表
export function xieyicustomer_contract_list(data){
    return fetch({
        url: 'customer_contract_list/'+data.data+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//新增合同
export function contract_addru_new(data){
    return fetch({
        url: 'contract_addru_new',
        method: 'post',
        data:  data.data
    });
}
//添加合同信息
export function contract_add_new(data){
    return fetch({
        url: 'contract_add_new/'+data.id,
        method: 'get',
    });
}
//新增分期充值提交
export function renewHuikuanpici(data){
    return fetch({
        url: '/api/renew-huikuan/addrupici?contract_id='+data.id,
        method: 'post',
        data:  data.data
    });
}
//新增分期
export function add_picifile(data) {
    return fetch({
        url: 'add_picifile/'+data.id,
        method: 'get',
    });
}
//合同归档
export function contract_guidang_new(data) {
    return fetch({
        url: 'contract_guidang_new/'+data.id+'?guidang_no='+data.guidang_no,
        method: 'get',
    });
}
//请求账户
export function contract_account(data) {
    return fetch({
        url: 'contract_account/'+data.id,
        method: 'get',
    });
}
//分配账户
export function copy_account(data){
    return fetch({
        url: 'copy_account/'+data.id,
        method: 'post',
        data:  data.data
    });
}
//广告主列表
export function customer_advertiser_list(data) {
    return fetch({
        url: 'customer_advertiser_list/'+data.id,
        method: 'get',
    });
}
//广告主选账户
export function adtoaccount(data) {
    return fetch({
        url: 'adtoaccount/'+data.id+"?contractid="+data.contractid,
        method: 'get',
    });
}

//添加广告主
export function customer_advertiser_addru(data){
    return fetch({
        url: 'customer_advertiser_addru',
        method: 'post',
        data:  data.data
    });
}
//添加产品
export function products(data){
    return fetch({
        url: '/api/products',
        method: 'post',
        data:  data.data
    });
}
//新增消耗
export function addaccountcoust(data){
    return fetch({
        url: 'api/account/addaccountcoust',
        method: 'post',
        data:  data.data
    });
}
//充值对应的回款
export function renew_to_huikuan(data){
    return fetch({
        url: 'renew_to_huikuan/'+data.id,
        method: 'get',
    });
}
//新增产品
export function advertiser_to_product(data){
    return fetch({
        url: 'advertiser_to_product/'+data.id,
        method: 'get',
    });
}
//广告主
export function account_to_product(data){
    return fetch({
        url: 'account_to_product/'+data.id,
        method: 'get',
    });
}
//转款列表
export function zhuankuan_list(data){
    return fetch({
        url: 'zhuankuan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
export function zhuankuan_info(data){
    return fetch({
        url: 'zhuankuan_info/'+data.id,
        method: 'get',
    });
}
export function add_zhuankuan(data){
    return fetch({
        url: 'add_zhuankuan/'+data.id,
        method: 'get',
    });
}
export function contract_to_account(data){
    return fetch({
        url: 'contract_to_account/'+data.id,
        method: 'get',
    });
}
export function add_zhuankuan_ru(data){
    return fetch({
        url: 'add_zhuankuan_ru',
        method: 'post',
        data:  data.data
    });
}
//广告主详情
export function customer_advertiser_info(data){
    return fetch({
        url: 'customer_advertiser_info/'+data.id,
        method: 'get',
    });
}
//修改广告主信息
export function customer_advertiser_upadvertiser(data){
    return fetch({
        url: 'customer_advertiser_upadvertiser/'+data.id,
        method: 'post',
        data:data.data
    });
}
//客户数据统计
export function renew_huikuan_tu(data){
    return fetch({
        url: 'renew_huikuan_tu/'+data.date+"/"+data.id,
        method: 'get',
    });
}
//客户数据统计
export function productlinrenew(data){
    return fetch({
        url: 'productlinrenew/'+data.id,
        method: 'get',
    });
}
//客户数据统计
// /公司id/开始时间/结束时间
export function cost_ad_tongji(data){
    return fetch({
        url: 'cost_ad_tongji/'+data.id+'/'+data.state+'/'+data.end+"?prlin="+data.prlin,
        method: 'get',
    });
}
//利润统计
export function lirun_ad_product_tu(data){
    return fetch({
        url: 'lirun_ad_product_tu/'+data.id+'/'+data.date,
        method: 'get',
    });
}
//合同编号
export function contract_no_num(data){
    return fetch({
        url: 'contract_no_num/'+data.id,
        method: 'get',
    });
}
//客户数据统计
export function zhouqi_kehu(data){
    return fetch({
        url: 'zhouqi_kehu/'+data.id,
        method: 'get',
    });
}
//客户数据统计 -欠费金额
export function qiankuan_ad(data){
    return fetch({
        url: 'qiankuan_ad/'+data.id,
        method: 'get',
    });
}
//根据产品线选媒介合同
export function productmcontract(data){
    return fetch({
        url: 'productmcontract/'+data.id,
        method: 'get',
    });
}
//添加关联账户列表
export function ad_account_gl(data){
    return fetch({
        url: 'ad_account_gl/'+data.id,
        method: 'get',
    });
}
//添加关联
export function account_upalias(data){
    return fetch({
        url: 'account_upalias',
        method: 'post',
        data:data.data
    });
}
//保证金列表
export function margin_m_list(data){
    return fetch({
        url: '/margin_m_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//提交保证金打款
export function add_margin_to_media_ru(data){
    return fetch({
        url: 'add_margin_to_media_ru',
        method: 'post',
        data:data.data
    });
}
//保证金退款
export function ktuimargin(data){
    return fetch({
        url: 'ktuimargin/'+data.id,
        method: 'get',
    });
}
//退保证金列表
export function kehu_margin_tui_list(data){
    return fetch({
        url: '/kehu_margin_tui_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//退保证金详情
export function kehu_margin_tui_info(data){
    return fetch({
        url: 'kehu_margin_tui_info/'+data,
        method: 'get',
    });
}
//转保证金
export function zhuankuan_marigin(data){
    return fetch({
        url: 'zhuankuan_marigin/'+data.id,
        method: 'get',
    });
}
//转保证金款返回
export function zhuankuan_marginru(data){
    return fetch({
        url: 'zhuankuan_marginru',
        method: 'post',
        data:  data.data
    });
}
//数据统计
export function customer_money_history(data){
    return fetch({
        url: 'customer_money_history/'+data.id+"?type="+data.type+'&time_start='+data.state+'&time_end='+data.end+"&order="+data.asc,
        method: 'get',
    });
}
//合同结束
export function end_account(data){
    return fetch({
        url: 'end_account/'+data.id,
        method: 'get',
    });
}
//补账户币
export function addbukuanbi(data){
    return fetch({
        url: 'addbukuanbi',
        method: 'post',
        data:  data.data
    });
}
//自该当前媒介合同
export function updateaccountrenew(data){
    return fetch({
        url: 'updateaccountrenew/'+data.id+"/"+data.account+'/'+data.mhtid+"?iszhuankuan="+data.iszhuankuan,
        method: 'get',
    });
}
//保证金审核
export function upmarginmht(data){
    return fetch({
        url: 'upmarginmht/'+data.bondId+"/"+data.id,
        method: 'get',
    });
}
//结算单
export function contract_accounts_list(data){
    return fetch({
        url: 'contract_accounts_list/'+data.data+'?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:  data.search.search
    });
}
//添加结算单
export function contract_accounts_addru(data){
    return fetch({
        url: 'contract_accounts_addru',
        method: 'post',
        data:  data.data
    });
}
//结算单归档
export function contract_accounts_guidang(data) {
    return fetch({
        url: 'contract_accounts_guidang/'+data.id+'?guidang_no='+data.guidang_no,
        method: 'get',
    });
}
//回款计划
export function huikuan_plan_addru(data) {
    return fetch({
        url: '/huikuan_plan_addru',
        method: 'post',
        data:data
    });
}
//计划还款
export function get_huikuan_plan_group(data) {
    return fetch({
        url: '/get_huikuan_plan_group',
        method: 'post',
        data:data
    });
}
//本月还款总额与应还款金额
export function get_huikuan_plan_cost(data) {
    return fetch({
        url: '/get_huikuan_plan_cost',
        method: 'post',
        data:data
    });
}
//点击日期后的回款列表
export function huikuan_plan_list(data) {
    return fetch({
        url: '/huikuan_plan_list?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:data
    });
}
//回款记录
export function get_overdue_ad(data) {
    return fetch({
        url: '/get_overdue_ad?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:data
    });
}
//修改汇款时间
export function up_pla(data) {
    return fetch({
        url: '/up_plan/'+data.id,
        method: 'post',
        data:data
    });
}
//回款计划公司视图
export function huikuan_plan_list_ad(data) {
    return fetch({
        url: '/huikuan_plan_list_ad?per-page='+data.page+'&page='+data.num,
        method: 'post',
        data:data
    });
}
export function huikuan_ad_plan_list(data) {
    return fetch({
        url: '/huikuan_ad_plan_list',
        method: 'post',
        data:data
    });
}
//公司总充值 和余额
export function adcost(data) {
    return fetch({
        url: '/adcost',
        method: 'get',
        params: data
    });
}
//公司产品线 充值 和余额
export function adcost_product_lin(data) {
    return fetch({
        url: '/adcost_product_lin',
        method: 'get',
        params: data
    });
}
//
// adcost_product_lin_up
export function adcost_product_lin_up(data) {
    return fetch({
        url: '/adcost_product_lin_up',
        method: 'get',
        params: data
    });
}
//充值详情 备款账户
export function beikuan_use_info(data) {
    return fetch({
        url: 'api/beikuan/beikuan-use-info',
        method: 'get',
        params: data
    });
}
//退款详情 备款账户
export function tuikuan_to_beikuan_info(data) {
    return fetch({
        url: 'api/beikuan/tuikuan-to-beikuan-info',
        method: 'get',
        params: data
    });
}
//获取当前账户下所有媒介合同
export function company_productline_contracts(data) {
    return fetch({
        url: 'api/contract/company-productline-contracts',
        method: 'get',
        params: data
    });
}
//获取当前产品线下的媒介
export function product_line_company(data) {
    return fetch({
        url: 'api/customer/product-line-company',
        method: 'get',
        params: data
    });
}
