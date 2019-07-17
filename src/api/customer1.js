/**
 * Created by wang on 2017/7/6.
 */
import { fetch } from '@/utils/fetch';

export function customers(data) {
    return fetch({
        url:'customerList',
        method: 'get',
        params:  ''
    });
}

export function profitsTrend(data) {
    return fetch({
        url:'profitsTrend/12/default?cuid='+data.id,
        method: 'get',
        params:  ''
    });
}

export function profitsTrueTrend(data) {
    return fetch({
        url:'profitsTrueTrend/12/default?cuid='+data.id,
        method: 'get',
        params:  ''
    });
}

export function getRankList(data) {
    return fetch({
        url:''+ 'renewRank/'+data.num+'/'+ data.data+ 'default',
        method: 'get',
        params:  ''
    });
}
export function getMonthline(data) {
    return fetch({
        url:''+ 'renewTrend/12/default',
        method: 'post',
        data:data.date
    });
}

export function market_renew_money_zhexian(data) {
    return fetch({
        url:''+ 'market_renew_money_zhexian/'+data.date,
        method: 'get',
        params:  ''
    });
}
export function getProfitsRankList(data) {
    return fetch({
        url: ''+data.data+'/'+data.num+'/'+data.date+'default',
        method: 'get',
        params:  ''
    });
}
export function getProfitsMonthline(data) {
    return fetch({
        url: ''+data.data+'/12/default',
        method: 'post',
        data:data.date
    });
}
//媒体饼图
export function getmedia(data) {
    return fetch({
        url: ''+'mediaProductStatistical/'+data.data,
        method: 'get',
        params:  ''
    });
}
//媒体线
export function getmedialine(data) {
    return fetch({
        url: ''+'mediaRunning/12'+data.prlinid+'year='+data.year,
        method: 'get',
        params:  ''
    });
}

//销售新增客户排行
export function getcontractAddRank(data) {
    return fetch({
        url: ''+'contractAddRank/'+data.default+'/'+data.data,
        method: 'get',
        params:  ''
    });
}
//销售新增客户
export function contractMarketAddList(data) {

    return fetch({
        url: ''+'contractMarketAddList/'+data.default+'/'+data.data,
        method: 'get',
        params:  ''
    });
}
//销售毛利
export function getcontractprofitRank(data) {
    return fetch({
        url: ''+'marketProfitsRank/'+data.default+'/'+data.data,
        method: 'get',
        params:  ''
    });
}
//销售毛利合同
export function marketProfitsList(data) {
    return fetch({
        url: ''+'marketProfitsList/'+data.id+'/'+data.data,
        method: 'get',
        params:  ''
    });
}
//新增合同
export function getcontractContract(data) {
    return fetch({
        url:''+ 'contractAddList/'+data.data,
        method: 'get',
        params:  ''
    });
}
//sem排名
export function getSemRank(data) {
    return fetch({
        url: ''+'semRank/'+data.data,
        method: 'get',
        params:  ''
    });
}
//sem个人
export function semCost(data) {
    return fetch({
        url: ''+'semCost/'+data.name+'/'+data.data,
        method: 'get',
        params:  ''
    });
}
//产品线
export function customer_prlin(data) {
    return fetch({
        url: ''+'customer_prlin/'+data.id,
        method: 'get',
        params:  ''
    });
}
//公司12月 实际充值情况
export function actualRenewals(data) {
    return fetch({
        url: ''+'profitsTrend/12/default?cuid='+data.id+'&prlin='+data.prlin,
        method: 'post',
        data:data.date
    });
}
export function market_renew_money_zhexian_xf(data) {
    return fetch({
        url: ''+'market_renew_money_zhexian/'+data.date+'?adid='+data.id+data.data+data.prlin,
        method: 'get',
        params:  ''
    });
}




//月 已回款充值利润情况
export function backPayment(data) {
    return fetch({
        url: ''+'profitsTrueTrend/12/default?cuid='+data.id+'&prlin='+data.prlin,
        method: 'post',
        data:data.date
    });
}
//获取排名产品
export function product_linlist(data) {
    return fetch({
        url: ''+'/product_linlist',
        method: 'get',
        params:  ''
    });
}
//公司12月 排名产品 实际充值利润情况与已回款充值利润情况
export function getProfitsRankListAll(data) {
    return fetch({
        url: ''+data.data+'/'+data.num+'/'+data.date+'default?prlin='+data.id,
        method: 'get',
        params:  ''
    });
}
//充值排名
export function customer_profits_rank_xf(data) {
    return fetch({
        url:''+ 'customer_profits_rank/'+ data.data+ 'order='+data.name,
        method: 'get',
        params:  ''
    });
}
//利润排名
export function customer_profits_rank(data) {
    return fetch({
        url:''+ 'customer_profits_rank/'+ data.date+ 'order='+data.name+data.data,
        method: 'get',
        params:  ''
    });
}
//利润 折线
export function lirun_money_zhexian(data) {
    return fetch({
        url:''+ 'lirun_money_zhexian/'+ data.date+data.data,
        method: 'get',
        params:  ''
    });
}

//产品线
export function mediaRunning(data) {
    return fetch({
        url:''+ 'mediaRunning/12?year='+ data.date+ '&prlinid='+data.prlinid,
        method: 'get',
        params:  ''
    });
}
