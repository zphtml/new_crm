/**
 * Created by jy on 2017/1/17.
 */
/*eslint-disable */
import store from '../store';

export const roleType = {
    'customer_contract_list':'/api/contract/contractlist',//执行框架列表
    'contractlistNew':'/api/contract-new/contractlist',//合同列表
    'customer_list':'/api/customer/customer_list',//客户列表
    'renew_list':'/api/renew-huikuan/indexlist',//充值列表，下单列表
    'refund_account_list':'/api/refund-money/list_zongzhnaghu',//退款到总账户列表
    'bukuan_list':'/api/bukuan/list',//补款列表
    'invoice_list':'/api/invoice/list',//发票列表
    'yihuikuanxufei_list':'/api/yihuikuanxufei/list',//充值回款
    'huikuan_list':'/api/back-money/list',//回款列表
    'market_kebao_list':'/api/customerb/market_kebao_list',//客保
    'market_kehuchi_list':'/api/customerb/market_kebao_list',//客户池
    'meijie_customer_list':'/api/meijie-customer/customer_list',//媒介列表
    'meijie_customer_contract_list':'/api/meijie-contract/contractlist',//媒介合同
    'meijie_renew_list':'/api/meijie-renew-huikuan/indexlist',//媒介充值列表
    'meijie_bukuan_list':'/api/meijie-bukuan/list',//补款列表
    'meijie_dakuan_list':'/api/mback-money/list',//媒介打款列表
    'meijie_huikuan_list':'/api/meijie-huikuan/list',//回款列表
    'meijie_tuikuan_list':'/api/meijie-refund-money/list',//媒介退款列表
    'caiwu':'/tongji/*',//财务
    'weihuikuanyuqi':'/api/renew-huikuan/weihuikuanyuqi',
    'yihuikuanyuqi':'/api/renew-huikuan/yihuikuanyuqi',
    'renew_list_meijie':'/api/renew-huikuan/indexlist_meijie', //媒介充值审核列表
    'renew_list_meijieInfor':'/api/renew-huikuan/renew-info_meijie' ,//媒介充值审核详情
    'renew_list_caiwu':'/api/renew-huikuan/indexlist_caiwu', //财务充值审核列表
    'renew_info_caiwu':'/api/renew-huikuan/renew-info_caiwu' ,//财务充值审核详情
    'account_list':'/api/account/account_list', //媒介账户
    'cost_list':'/api/account/cost_list',//消耗列表
    'prlin_list':'/api/productlinemin/prlinlist',//产品线列表
    'qddakuan_list':'/api/qd-dakuan/list',//给渠道打款列表
    'agent_company_list':'/api/agent-company/daililist',//代理公司列表
    'piaotype_list':'/api/piaotype/piaotypelist',//开票类型列表
    'waichu_list':'/api/waichu/list',//外出列表
    'qingjia_list':'/api/qingjia/list',//请假列表
    'users_to_bumen':'/api/user/userss_to_bumen',//给用户分配部门
     'market_ticheng':'/api/renew-huikuan/market_ticheng',//销售提成
     'acccount_money':'/api/account/acccount_money',//金额列表
    'tui_list':'/api/margin/tui_list',//  客户退保证金列表
    'list_margin_m':'/api/margin/list_margin_m',//  客户打保证金列表
    'meijietui_list':'/api/meijie-margin/tui_list',//  媒介退保证金列表
    'meijieda_list':'/api/meijie-margin/da_list',//  媒介保证金列表
    'yfk_list':'/api/mback-money/yfk_list',//应付款
    'beikuan_list':'/api/beikuan/list',//备款列表
     'fakuan': '/api/meijie-fakuan/list',//媒介补款
    'contractlist':'/api/contract-accounts/contractlist',//结算单列表
    'get_huikuan_plan_group':'/api/huikuan-plan/get-plan-group',//回款计划
    'accountCost':'/api/account/account-cost',//回款计划
    'gaizhang':'/api/gaizhang/list',//盖章申请
    'log_list':'/api/action-log/log-list', // 日志查看
    'caiwu_renew_list':'/tongji/financial/renew-list' // 日志查看

};


