
/*
*
*
*
*
*
* 跟换路由请全局替换，防止其他页面判断路由
* */

import Router from 'vue-router';
import {roleType} from '../utils/constant'; //权限部分

export default new Router({

    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/login', component:  resolve => require(['@/views/login/index'],resolve), hidden: true ,name:'Login'},
        { path: '/wechat_login', component:  resolve => require(['@/views/login/wxlogin'],resolve), hidden: true ,name:'wxlogin'},

        { path: '/404', component:  resolve => require(['@/views/error/404'],resolve), hidden: true },
        { path: '/401', component:  resolve => require(['@/views/error/401'],resolve), hidden: true },
        {
            path: '/',
            component:  resolve => require(['@/views/login/index'],resolve),
            hidden: true,
            name: 'index',
            meta: {title: '首页'},
        },
        {
            path: '/modify',
            hidden: true,
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/modify/modifymove/companymodifymove',
            meta: {title: '个人中心'},
            children: [
                {
                    path: 'modifymove',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/modifymove/companymodifymove',
                    meta: {title: '基本信息'},
                    noDropdown:true,
                    name:'modifymove',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'companymodifymove', component: resolve => require(['@/views/login/personalInfor'],resolve), meta: {title: 'modifymove'}, name:'modifymove' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'movepassword',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/movepassword/movepasswords',
                    meta: {title: '修改密码'},
                    noDropdown:true,

                    name:'movepassword',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'movepasswords', component: resolve => require(['@/views/login/password'],resolve), meta: {title: 'compline'}, name:'movepasswords' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'accounthang',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/accounthang/accounthangs',
                    meta: {title: '账号绑定'},
                    noDropdown:true,

                    name:'accounthang',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'accounthangs', component:  resolve => require(['@/views/login/email'],resolve), meta: {title: 'compline'}, name:'accounthangs' ,noDropdown:true,hidden:true},
                    ]
                },
            ]
        },
        {
            path: '/account',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/account/adtools/homePage',
            meta: {title: '首页'},
            children: [
                {
                    path: 'adtools',
                    component: resolve => require(['@/views/layout/Layoutbai'],resolve),
                    redirect: '/adtools/homePage',
                    meta: {title: '公司公告'},
                    noDropdown:true,

                    name:'shenpi',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'homePage', component: resolve => require(['@/views/homePage/shouye'],resolve), meta: {title: '首页'}, name:'homePage' ,noDropdown:true,hidden:true},
                        { path: 'homePage/announcement', component: resolve => require(['@/views/homePage/announcement'],resolve), meta: {title: '公司公告'}, name:'announcement' ,noDropdown:true,hidden:true},

                    ]
                },
            ]
        },
        {
            path: '/customer',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/customer/cusList/list',
            meta: {title: '客户管理',role:[roleType.contractlistNew,roleType.customer_contract_list,roleType.customer_list,roleType.renew_list,roleType.renew_list,roleType.bukuan_list,roleType.refund_account_list,roleType.invoice_list,roleType.market_kebao_list,roleType.market_kehuchi_list]},
            children: [
                {
                    path: 'cusList',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/cusListcusList/list',
                    meta: {title: '客户列表',role:[roleType.customer_list]},
                    noDropdown:true,

                    name:'kehuliebiao',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'list', component: resolve => require(['@/views/kehuguanli/accountList/customerList'],resolve), meta: {title: 'kehulist',role:[roleType.customer_list]}, name:'kehuliebiao' ,noDropdown:true,hidden:true},
                        { path: 'kehuliebiao/fenpeishangwu', component: resolve => require(['@/views/kehuguanli/accountList/fenpeishangwu'],resolve), meta: {title: 'fenpeishangwu'}, name:'fenpeishangwu' ,hidden:true},
                        { path: 'kehuliebiao/customermessage', component: resolve => require(['@/views/kehuguanli/accountList/kehuxinxi'],resolve), meta: {title: 'customermessage'}, name:'customermessage' ,hidden:true},
                        { path: 'kehuliebiao/console', component:  resolve => require(['@/views/kehuguanli/accountList/console'],resolve), meta: {title: 'console'}, name:'console' ,hidden:true},
                        { path: 'kehuliebiao/huikuan', component: resolve => require(['@/views/kehuguanli/accountList/huikuan'],resolve), meta: {title: 'huikuan'}, name:'huikuan' ,hidden:true},
                        { path: 'kehuliebiao/companyCostList', component:  resolve => require(['@/views/kehuguanli/accountList/companyCostList'],resolve), meta: {title: 'companyCostList'}, name:'companyCostList' ,hidden:true},
                        { path: 'kehuliebiao/fenpeiBalance', component: resolve => require(['@/views/kehuguanli/accountList/fenpei_balance'],resolve), meta: {title: 'fenpeiBalance'}, name:'fenpeiBalance' ,hidden:true},
                        { path: 'ProtocolList/renewal', component: resolve => require(['@/views/kehuguanli/accountList/xufei'],resolve), meta: {title: '新增充值'}, name:'renewal' ,hidden:true},
                        { path: 'ProtocolList/accountList', component: resolve => require(['@/views/kehuguanli/accountList/accountList'],resolve), meta: {title: '账户列表'}, name:'accountList' ,hidden:true},
                        { path: 'ProtocolList/orders', component: resolve => require(['@/views/kehuguanli/accountList/xiadan'],resolve), meta: {title: '新增下单'}, name:'orders' ,hidden:true},
                        { path: 'ProtocolList/refund', component:  resolve => require(['@/views/kehuguanli/accountList/tuikuan'],resolve), meta: {title: '新增退款'}, name:'refund' ,hidden:true},
                        { path: 'ProtocolList/filling', component: resolve => require(['@/views/kehuguanli/accountList/bukuan'],resolve), meta: {title: '新增补款'}, name:'filling' ,hidden:true},
                        { path: 'ProtocolList/invoice', component: resolve => require(['@/views/kehuguanli/accountList/fapiao'],resolve), meta: {title: '新增发票'}, name:'invoice' ,hidden:true},
                        { path: 'ProtocolList/modifyAccount', component: resolve => require(['@/views/kehuguanli/accountList/accountdetail'],resolve), meta: {title: '修改账户'}, name:'modifyAccount' ,hidden:true},
                        { path: 'ProtocolList/addReceivable', component: resolve => require(['@/views/kehuguanli/accountList/addhuikuan'],resolve), meta: {title: '新增回款'}, name:'addReceivable' ,hidden:true},
                        { path: 'ProtocolList/newAccount', component: resolve => require(['@/views/kehuguanli/accountList/addaccount'],resolve), meta: {title: '查看发票'}, name:'newAccount' ,hidden:true},
                        { path: 'kehuliebiao/addTheContract_xy', component: resolve => require(['@/views/kehuguanli/accountList/addxy_hetong'],resolve), meta: {title: '新加合同'}, name:'addTheContract_xy' ,hidden:true},
                        { path: 'kehuliebiao/addbackMoney', component: resolve => require(['@/views/kehuguanli/accountList/addbackMoney'],resolve), meta: {title: '新加结算单'}, name:'addbackMoney' ,hidden:true},
                        { path: 'kehuliebiao/credit', component: resolve => require(['@/views/kehuguanli/accountList/credit'],resolve), meta: {title: '经纬信用'}, name:'credit' ,hidden:true},
                        { path: 'kehuliebiao/invoiceList', component: resolve => require(['@/views/kehuguanli/accountList/allFapiao'],resolve), meta: {title: '查看发票'}, name:'invoiceList' ,hidden:true},
                        { path: 'kehuliebiao/Consoel_fillingList', component: resolve => require(['@/views/kehuguanli/accountList/bukuanList'],resolve), meta: {title: '补款列表'}, name:'Consoel_fillingList' ,hidden:true},
                        { path: 'kehuliebiao/Consoel_renewal', component: resolve => require(['@/views/kehuguanli/accountList/xufeiList'],resolve), meta: {title: '充值列表'}, name:'Consoel_renewal' ,hidden:true},
                        { path: 'kehuliebiao/AddChannelsMoney', component: resolve => require(['@/views/kehuguanli/accountList/add_qudao_dakuan'],resolve), meta: {title: '渠道打款'}, name:'AddChannelsMoney' ,hidden:true},
                        { path: 'kehuliebiao/Contractlist', component: resolve => require(['@/views/kehuguanli/accountList/hetongList'],resolve), meta: {title: '合同列表'}, name:'Contractlist' ,hidden:true},
                        { path: 'kehuliebiao/addTheContract_customer', component: resolve => require(['@/views/kehuguanli/accountList/addhetong'],resolve), meta: {title: '新加合同'}, name:'addTheContract_customer' ,hidden:true},
                        { path: 'kehuliebiao/Advertiser', component: resolve => require(['@/views/kehuguanli/accountList/advertiser'],resolve), meta: {title: '广告主'}, name:'Advertiser' ,hidden:true},
                        { path: 'ProtocolList/TransferOfFunds', component: resolve => require(['@/views/kehuguanli/accountList/TransferOfFunds'],resolve), meta: {title: '转款详情',role:[roleType.market_kebao_list]}, name:'TransferOfFunds' ,noDropdown:true},
                        { path: 'kehuliebiao/AddAdvertisement', component:  resolve => require(['@/views/kehuguanli/accountList/add_Advertisement'],resolve), meta: {title: '添加广告主'}, name:'AddAdvertisement' ,noDropdown:true},
                        { path: 'kehuliebiao/advertisementInfor', component: resolve => require(['@/views/kehuguanli/accountList/advertisementInfor'],resolve), meta: {title: '广告主详情'}, name:'advertisementInfor' ,noDropdown:true},
                        { path: 'kehuliebiao/addBond', component: resolve => require(['@/views/kehuguanli/accountList/addBond'],resolve), meta: {title: '打保证金'}, name:'addBond' ,noDropdown:true},
                        { path: 'kehuliebiao/dataStatistics', component: resolve => require(['@/views/kehuguanli/accountList/dataStatistics'],resolve), meta: {title: '客户数据统计'}, name:'dataStatistics' ,hidden:true},
                        { path: 'kehuliebiao/fillingaccountMoney', component: resolve => require(['@/views/kehuguanli/accountList/bukuan_AccountMoney'],resolve), meta: {title: '补账户币'}, name:'fillingaccountMoney' ,hidden:true},
                    ]
                },
                {
                    path: 'contractManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/contractManagement/ContractList',
                    meta: {title: '合同管理',role:[roleType.customer_contract_list,roleType.contractlistNew]},

                    name:'contractManagement',
                    icon: 'yingxiaoguanli',
                    children: [

                        { path: 'compactList', component: resolve => require(['@/views/kehuguanli/hetong/compactList'],resolve), meta: {title: '合同列表',role:[roleType.contractlistNew]}, name:'compactList' ,noDropdown:true},
                        { path: 'compactList/viewcontract', component: resolve => require(['@/views/kehuguanli/viewcontract'],resolve), meta: {title: '合同详情'}, name:'viewcontract' ,noDropdown:true,hidden:true},
                        { path: 'backMoneyList', component: resolve => require(['@/views/kehuguanli/hetong/backMoneyList'],resolve), meta: {title: '结算单列表',role:[roleType.contractlist]}, name:'backMoneyList' ,noDropdown:true},
                        { path: 'backMoneyList/backMoneyInfor', component: resolve => require(['@/views/kehuguanli/hetong/backMoneyInfor'],resolve), meta: {title: '结算单详情',role:[roleType.contractlist]}, name:'backMoneyInfor' ,noDropdown:true,hidden:true},

                        { path: 'compactList/addTheContract', component: resolve => require(['@/views/kehuguanli/accountList/addhetong'],resolve), meta: {title: '新加合同'}, name:'addTheContract' ,hidden:true},
                        { path: 'ProtocolList', component: resolve => require(['@/views/kehuguanli/hetong/xieyi_List'],resolve), meta: {title: '执行框架列表',role:[roleType.customer_contract_list]}, name:'ProtocolList' ,noDropdown:true},
                        { path: 'ProtocolList/agreementDetails', component: resolve => require(['@/views/kehuguanli/hetong/xieyi_details'],resolve), meta: {title: '协议详情'}, name:'agreementDetails' ,noDropdown:true,hidden:true},
                        { path: 'viewncontract/newContrac', component: resolve => require(['@/views/kehuguanli/hetong/newContrac'],resolve), meta: {title: '新增合同'}, name:'newContrac' ,noDropdown:true,hidden:true},


                    ]
                },
                {
                    path: 'FundManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/FundManagement/RenewTheList',
                    meta: {title: '款项管理',role:[roleType.renew_list,roleType.bukuan_list,roleType.refund_account_list,roleType.invoice_list]},

                    name:'FundManagement',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'renewList', component: resolve => require(['@/views/kehuguanli/kuanxiang/xufei'],resolve), meta: {title: '充值列表',role:[roleType.renew_list]}, name:'renewList' ,noDropdown:true},
                        { path: 'renewList/renew', component: resolve => require(['@/views/money/renew'],resolve), meta: {title: '充值详情'}, name:'renew' ,noDropdown:true,hidden:true},
                        { path: 'bondList', component:  resolve => require(['@/views/kehuguanli/kuanxiang/bond'],resolve), meta: {title: '保证金列表',role:[roleType.list_margin_m]}, name:'bondList' ,noDropdown:true},
                        { path: 'bondList/bondListInfor', component: resolve => require(['@/views/kehuguanli/kuanxiang/bond_infor'],resolve), meta: {title: '保证金详情',role:[roleType.list_margin_m]}, name:'bondListInfor' ,noDropdown:true,hidden:true},
                        { path: 'bondList/kh_refund_listInfor', component:  resolve => require(['@/views/kehuguanli/kuanxiang/refund_listInfor'],resolve), meta: {title: '保证金退款详情',role:[roleType.tui_list]}, name:'kh_refund_listInfor' ,noDropdown:true,hidden:true},
                        { path: 'orderList', component: resolve => require(['@/views/kehuguanli/hetong/orderList'],resolve), meta: {title: '下单列表',role:[roleType.renew_list]}, name:'orderList' ,noDropdown:true},
                        { path: 'orderList/orderdetails', component: resolve => require(['@/views/kehuguanli/hetong/orderdetails'],resolve), meta: {title: '下单列表'}, name:'orderdetails' ,noDropdown:true,hidden:true},
                        { path: 'fillingList', component: resolve => require(['@/views/kehuguanli/kuanxiang/bukuan'],resolve), meta: {title: '补款列表',role:[roleType.bukuan_list]}, name:'fillingList' ,noDropdown:true},
                        { path: 'fillingList/replenishment', component: resolve => require(['@/views/money/replenishment'],resolve), meta: {title: '补款列表'}, name:'replenishment' ,noDropdown:true,hidden:true},
                        { path: 'refundALLaccount', component:  resolve => require(['@/views/kehuguanli/kuanxiang/refundALLaccount'],resolve), meta: {title: '退款到总账户',role:[roleType.refund_account_list]} , name:'refundALLaccount' ,noDropdown:true},
                        { path: 'refundClient', component: resolve => require(['@/views/kehuguanli/kuanxiang/refundClient'],resolve), meta: {title: '退款到客户',role:[roleType.refund_account_list]} , name:'refundClient' ,noDropdown:true},
                        { path: 'refundList/tuikuan', component: resolve => require(['@/views/money/tuikuan'],resolve), meta: {title: '退款列表'}, name:'tuikuanlist' ,noDropdown:true,hidden:true},
                        { path: 'TransferOfFundsList', component: resolve => require(['@/views/kehuguanli/kuanxiang/TransferOfFundsList'],resolve), meta: {title: '转款列表'}, name:'TransferOfFundsList' ,noDropdown:true},
                        { path: 'TransferOfFundsList/TransferOfFundsInfor', component: resolve => require(['@/views/kehuguanli/kuanxiang/TransferOfFundsInfor'],resolve), meta: {title: '转款详情'}, name:'TransferOfFundsInfor' ,noDropdown:true,hidden:true},
                        { path: 'InvoiceList', component: resolve => require(['@/views/kehuguanli/kuanxiang/fapiao'],resolve), meta: {title: '发票列表',role:[roleType.invoice_list]}, name:'InvoiceList' ,noDropdown:true},
                        { path: 'InvoiceList/fapiao', component: resolve => require(['@/views/money/fapiao'],resolve), meta: {title: '发票列表'}, name:'fapiao' ,noDropdown:true,hidden:true},
                        { path: 'ChannelMoney', component: resolve => require(['@/views/kehuguanli/kuanxiang/qudao_dakuan'],resolve), meta: {title: '渠道打款列表'}, name:'ChannelMoney' ,noDropdown:true},
                        { path: 'ChannelMoney/ChannelMoneyInfor', component: resolve => require(['@/views/kehuguanli/kuanxiang/qudao_dakuan_Infor'],resolve), meta: {title: '渠道打款列表详情'}, name:'ChannelMoneyInfor' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'NotCompleted',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/NotCompleted/CustomerSupportSystem',
                    meta: {title: '未成单',role:[roleType.market_kebao_list,roleType.market_kehuchi_list]},

                    name:'NotCompleted',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'CustomerSupportSystem', component: resolve => require(['@/views/kehuguanli/weichengdan/kebaoList'],resolve), meta: {title: '客保系统',role:[roleType.market_kebao_list]}, name:'CustomerSupportSystem' ,noDropdown:true},
                        { path: 'newCustomer', component:  resolve => require(['@/views/kehuguanli/weichengdan/addClient'],resolve), meta: {title: '新增客户'}, name:'newCustomer' ,noDropdown:true,hidden:true},
                        { path: 'customerPool', component:  resolve => require(['@/views/kehuguanli/weichengdan/kehuchi'],resolve), meta: {title: '客户池',role:[roleType.market_kehuchi_list]}, name:'customerPool' ,noDropdown:true},
                        { path: 'CustomerSupportSystem/AddCustomerInformation', component: resolve => require(['@/views/kehuguanli/weichengdan/addKehuInfor'],resolve), meta: {title: '新加客户信息'}, name:'AddCustomerInformation' ,noDropdown:true,hidden:true},
                        { path: 'CustomerSupportSystem/AddCustomerInformationNext', component: resolve => require(['@/views/kehuguanli/weichengdan/addKehuInforNext'],resolve), meta: {title: '新加客户信息'}, name:'AddCustomerInformationNext' ,noDropdown:true,hidden:true},
                    ]
                },
            ]
        },
        {
            path: '/MediaManagement',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/MediaManagement/MediaList/Mlist',
            meta: {title: '媒体管理',role:[roleType.prlin_list,roleType.meijie_customer_list,roleType.meijie_customer_contract_list,roleType.meijie_renew_list,roleType.meijie_bukuan_list,roleType.meijie_dakuan_list,roleType.meijie_huikuan_list,roleType.meijie_tuikuan_list,roleType.account_list
                ]},
            children: [
                {
                    path: 'MediaList',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/MediaList/Mlist',
                    meta: {title: '媒体列表',role:[roleType.meijie_customer_list]},
                    noDropdown:true,

                    name:'MediaList',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'Mlist', component: resolve => require(['@/views/meitiguanli/meitiList/meitiList'],resolve), meta: {title: 'MediaList'}, name:'MediaList' ,noDropdown:true},
                        { path: 'MediaList/MediacompactList', component: resolve => require(['@/views/meitiguanli/meitiList/hetongList'],resolve), meta: {title: '合同列表',role:[roleType.meijie_customer_contract_list]}, name:'MediacompactList' ,noDropdown:true},
                        { path: 'MediaList/MediaaddTheContract', component:  resolve => require(['@/views/meitiguanli/account/addhetong'],resolve), meta: {title: '新增合同合同列表',role:[roleType.meijie_customer_contract_list]}, name:'MediaaddTheContract' ,noDropdown:true},

                        { path: 'MediaList/addMediaList', component: resolve => require(['@/views/meitiguanli/meitiList/addmeitiContract'],resolve), meta: {title: '添加合同'}, name:'newContract' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/addMedia', component:  resolve => require(['@/views/meitiguanli/meitiList/addmeiti'],resolve), meta: {title: '添加媒体'}, name:'addMedia' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/mediaConsole', component: resolve => require(['@/views/meitiguanli/meitiList/meiti_console'],resolve), meta: {title: '媒体控制台'}, name:'mediaConsole' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/MediaFilling', component: resolve => require(['@/views/meitiguanli/meitiList/bukuan'],resolve), meta: {title: '媒体补款'}, name:'MediaFilling' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/Mediafakuan', component: resolve => require(['@/views/meitiguanli/meitiList/fakuan'],resolve), meta: {title: '罚款'}, name:'Mediafakuan' ,noDropdown:true,hidden:true},

                        { path: 'MediaList/Reserve', component:  resolve => require(['@/views/meitiguanli/meitiList/beikuan/beikuan'],resolve), meta: {title: '添加备款'}, name:'Reserve' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/Provisionoffset', component: resolve => require(['@/views/meitiguanli/meitiList/beikuan/beikuandikou'],resolve), meta: {title: '备款抵扣'}, name:'Provisionoffset' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/meadi_beikuanList', component: resolve => require(['@/views/meitiguanli/meitiList/beikuan/meadi_beikuanList'],resolve), meta: {title: '备款列表'}, name:'meadi_beikuanList' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/refund_beikuan', component: resolve => require(['@/views/meitiguanli/meitiList/beikuan/refund_beikuan'],resolve), meta: {title: '备款退款'}, name:'refund_beikuan' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/beikuanAccountHistory', component:  resolve => require(['@/views/meitiguanli/meitiList/beikuan/beikuanAccountHistory'],resolve), meta: {title: '备款详情'}, name:'beikuanAccountHistory' ,noDropdown:true,hidden:true},

                        { path: 'MediaList/mediakehuxinxi', component: resolve => require(['@/views/meitiguanli/meitiList/kehuxinxi'],resolve), meta: {title: '客户信息'}, name:'mediakehuxinxi' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/MediaenpeiBalance', component:  resolve => require(['@/views/meitiguanli/meitiList/fenpei_balance'],resolve), meta: {title: '分配余额'}, name:'MediaenpeiBalance' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/Mediainvoice', component: resolve => require(['@/views/meitiguanli/meitiList/fapiao'],resolve), meta: {title: '添加发票'}, name:'Mediainvoice' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/MediaaddReceivable', component: resolve => require(['@/views/meitiguanli/meitiList/addhuikuan'],resolve), meta: {title: '添加回款'}, name:'MediaaddReceivable' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/console_SupplementList', component: resolve => require(['@/views/meitiguanli/meitiList/bukuanList'],resolve), meta: {title: '媒体补款列表'}, name:'console_SupplementList' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/console_addBondDakuan', component:  resolve => require([ '@/views/meitiguanli/meitiList/addBondDakuan'],resolve), meta: {title: '保证金打款'}, name:'console_addBondDakuan' ,noDropdown:true,hidden:true},

                    ]
                },
                {
                    path: 'MediacontractManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/MediacontractManagement/MediaaccounttList',
                    meta: {title: '合同管理',role:[roleType.meijie_customer_contract_list]},

                    name:'MediacontractManagement',
                    icon: 'yingxiaoguanli',
                    children: [

                        { path: 'MediaaccounttList', component:  resolve => require(['@/views/meitiguanli/hetong/compactList'],resolve), meta: {title: '合同列表',role:[roleType.meijie_customer_contract_list]}, name:'MediaaccounttList' ,noDropdown:true},
                        { path: 'MediaaccounttList/Mediaviewcontract', component: resolve => require(['@/views/meitiguanli/hetong/viewcontract'],resolve), meta: {title: '合同详情',role:[roleType.meijie_customer_contract_list]}, name:'Mediaviewcontract' ,noDropdown:true,hidden:true},
                        { path: 'MediaProtocolList', component: resolve => require(['@/views/meitiguanli/hetong/MediaProtocolList'],resolve), meta: {title: '执行框架列表',role:[roleType.meijie_customer_contract_list]}, name:'MediaProtocolList' ,noDropdown:true},
                        { path: 'MediaProtocolList/mediaviewcontract', component: resolve => require(['@/views/meitiguanli/hetong/xieyi_details'],resolve), meta: {title: '执行框架详情'}, name:'mediaviewcontract' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'MediaFundManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/MediaFundManagement/MediaRenewTheList',
                    meta: {title: '款项管理',role:[roleType.meijie_renew_list,roleType.meijie_bukuan_list,roleType.meijie_dakuan_list,roleType.meijie_huikuan_list,roleType.meijie_tuikuan_list,]},

                    name:'MediaFundManagement',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'MediaAdvanceList', component:  resolve => require(['@/views/meitiguanli/account/dakuan/dakuanList'],resolve), meta: {title: '打款列表',role:[roleType.meijie_dakuan_list]}, name:'MediaAdvanceList' ,noDropdown:true},
                        { path: 'MediaAdvanceList/dakuan', component: resolve => require(['@/views/meitiguanli/account/dakuan/dakuan'],resolve), meta: {title: '打款列表'}, name:'dakuan' ,noDropdown:true,hidden:true},
                        { path: 'media_refund_List', component: resolve => require(['@/views/meitiguanli/account/moneyList'],resolve), meta: {title: '媒体退款列表'}, name:'media_refund_List' ,noDropdown:true,},
                        { path: 'media_refund_List/media_refund_ListInfor', component: resolve => require(['@/views/meitiguanli/account/moneyListInfor'],resolve), meta: {title: '媒体退款列表详情'}, name:'media_refund_ListInfor' ,noDropdown:true,hidden:true},
                        { path: 'mediaAddBond', component: resolve => require(['@/views/meitiguanli/account/addbondList'],resolve), meta: {title: '打保证金列表',role:[roleType.meijieda_list]}, name:'mediaAddBond' ,noDropdown:true},
                        { path: 'refund_list', component: resolve => require(['@/views/meitiguanli/account/refund_list'],resolve), meta: {title: '保证金退款列表',role:[roleType.meijietui_list]}, name:'refund_list' ,noDropdown:true},
                        { path: 'refund_list/refund_listInfor', component:  resolve => require(['@/views/meitiguanli/account/refund_listInfor'],resolve), meta: {title: '保证金退款列表详情',role:[roleType.meijietui_list]}, name:'refund_listInfor' ,noDropdown:true,hidden:true},
                        { path: 'MediaSupplementList', component:  resolve => require(['@/views/meitiguanli/account/bukuanList'],resolve), meta: {title: '媒体补款列表',role:[roleType.meijie_bukuan_list]}, name:'MediaSupplementList' ,noDropdown:true},
                        { path: 'MediaSupplementList/mediareplenishment', component: resolve => require(['@/views/meitiguanli/account/replenishment'],resolve), meta: {title: '媒体补款详情'}, name:'mediareplenishment' ,noDropdown:true,hidden:true},
                        { path: 'MediafineList', component: resolve => require(['@/views/meitiguanli/account/fakuanList'],resolve), meta: {title: '罚款列表',role:[roleType.fakuan]}, name:'MediafineList' ,noDropdown:true},
                        { path: 'MediafineList/mediafineInfor', component:  resolve => require(['@/views/meitiguanli/account/fakuanInfor'],resolve), meta: {title: '罚款详情'}, name:'mediafineInfor' ,noDropdown:true,hidden:true},
                        { path: 'ReserveList', component: resolve => require(['@/views/meitiguanli/account/beikuanList'],resolve), meta: {title: '备款列表',role:[roleType.beikuan_list]}, name:'ReserveList' ,noDropdown:true},
                        { path: 'refund_beikuanList', component: resolve => require(['@/views/meitiguanli/meitiList/beikuan/refund_beikuanList'],resolve), meta: {title: '备款退款列表',role:[roleType.beikuan_list]}, name:'refund_beikuanList' ,noDropdown:true},
                        { path: 'refund_beikuanInfor', component: resolve => require(['@/views/meitiguanli/meitiList/beikuan/refund_beikuanInfor'],resolve), meta: {title: '备款退款列表详情',role:[roleType.beikuan_list]}, name:'refund_beikuanInfor' ,noDropdown:true,hidden:true},

                        { path: 'ReserveList/mediaReserve', component: resolve => require(['@/views/meitiguanli/account/ReserveInfor'],resolve), meta: {title: '补款详情'}, name:'mediaReserve' ,noDropdown:true,hidden:true},
                        { path: 'MediaList/adddakuan', component: resolve => require(['@/views/meitiguanli/account/dakuan/adddakuan'],resolve), meta: {title: '添加打款'}, name:'adddakuan' ,noDropdown:true,hidden:true},
                        { path: 'Media_InvoiceList', component: resolve => require(['@/views/meitiguanli/account/fapiaoList'],resolve), meta: {title: '发票列表',role:[roleType.invoice_list]  }, name:'Media_InvoiceList' ,noDropdown:true},
                        { path: 'Media_InvoiceList/fapiaoInfor', component: resolve => require(['@/views/money/fapiao'],resolve), meta: {title: '发票详情'}, name:'fapiaoInfor' ,noDropdown:true,hidden:true},
                        { path: 'PayableList', component:  resolve => require(['@/views/meitiguanli/accountList/fk_MoneyList'],resolve), meta: {title: '应付款列表',role:[roleType.yfk_list] }, name:'PayableList' ,noDropdown:true,},
                    ]
                },
                {
                    path: 'AccountManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/AccountManagement/AccountManagementlis',
                    meta: {title: '账户管理',role:[roleType.account_list]},

                    name:'AccountManagement',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'AccountManagementlist', component: resolve => require(['@/views/meitiguanli/accountList/accountiList'],resolve), meta: {title: '账户列表',role:[roleType.account_list]} , name:'AccountManagementlist' ,noDropdown:true},
                        { path: 'AccountManagementlist/AccountManagementlist1', component: resolve => require(['@/views/meitiguanli/account/accountdetail'],resolve), meta: {title: 'AccountManagement1'}, name:'AccountManagement1' ,noDropdown:true,hidden:true},
                        { path: 'ConsumeList', component: resolve => require(['@/views/meitiguanli/accountList/xiaohaoList'],resolve), meta: {title: '消耗列表',role:[roleType.cost_list]}, name:'ConsumeList' ,noDropdown:true},
                        { path: 'accountCostDashboard', component: resolve => require(['@/views/meitiguanli/accountList/dashboard/overview'],resolve), meta:{title:'消耗统计',role:[roleType.account_list]}, name:'accountCostDashboard', noDropdown:true},
                        { path: 'MoneyInfor', component: resolve => require(['@/views/meitiguanli/accountList/MoneyListInfor'],resolve), meta: {title: '金额列表详情'}, name:'MoneyInfor' ,noDropdown:true,hidden:true},
                        { path: 'consumeChange', component: resolve => require(['@/views/meitiguanli/accountList/consumeChange/consumeList'],resolve), meta:{title:'消耗涨跌',role:[roleType.accountCost]}, name:'consumeChange', noDropdown:true},
                        { path: 'consumeTimeChange', component:  resolve => require(['@/views/meitiguanli/accountList/consumeTimeChange/consumeList'],resolve), meta:{title:'消耗时段涨跌',role:[roleType.accountCost]}, name:'consumeTimeChange', noDropdown:true},
                    ]
                },
                {
                    path: 'productLine',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/productLine/productLineLis',
                    meta: {title: '产品线',role:[roleType.prlin_list]},
                    noDropdown:true,

                    name:'productLine',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'productLine', component: resolve => require(['@/views/meitiguanli/chanpin_line/chanpinxian'],resolve), meta: {title: 'productLine',role:[roleType.prlin_list]}, name:'productLine' ,noDropdown:true,hidden:true},
                    ]
                },
            ]
        },
        {
            path: '/financialManagement',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/financialManagement/FinancialOverview/FinancialOverviewList',
            meta: {title: '财务管理',role:[roleType.gaizhang,roleType.caiwu,roleType.renew_list,roleType.huikuan_list,roleType.yihuikuanxufei_list,roleType.yihuikuanyuqi,roleType.weihuikuanyuqi]},
            children: [
                {
                    path: 'FinancialOverview',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/FinancialOverview/FinancialOverviewList',
                    meta: {title: '财务总览',role:[roleType.caiwu]},
                    noDropdown:true,

                    name:'FinancialOverview',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'FinancialOverviewList', component: resolve => require(['@/views/caiwu/homePage/index'],resolve), meta: {title: 'FinancialOverview'}, name:'FinancialOverview' ,noDropdown:true,hidden:true},
                        { path: 'FinancialOverviewList/FinancialBond', component: resolve => require(['@/views/caiwu/homePage/bondList'],resolve), meta: {title: 'FinancialBond'}, name:'FinancialBond' ,noDropdown:true,hidden:true},
                        { path: 'Financialdiankuan', component: resolve => require(['@/views/caiwu/homePage/diankuan'],resolve), meta: {title: 'Financialdiankuan'}, name:'Financialdiankuan' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'NonBackPayment',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/NonBackPayment/NonBackPaymentData',
                    meta: {title: '未回款逾期',role:[roleType.weihuikuanyuqi]},
                    noDropdown:true,

                    name:'NonBackPayment',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'NonBackPaymentData', component:  resolve => require(['@/views/caiwu/yuqi/weihuikuan'],resolve), meta: {title: 'NonBackPayment'}, name:'NonBackPayment' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'dataStatistics',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/dataStatistics/CustomerRenewals',
                    meta: {title: '数据统计',role:[roleType.caiwu]},

                    name:'dataStatistics',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'customerRenew', component: resolve => require(['@/views/caiwu/shujutongji/xufei_paiming'],resolve), meta: {title: '客户充值排名',role:[roleType.caiwu]}, name:'customerRenew' ,noDropdown:true},
                        { path: 'customerRenew/customerRenewNext', component:  resolve => require(['@/views/caiwu/shujutongji/xufei_next'],resolve),meta: {title: 'customerRenewNext'}, name: 'customerRenewNext',noDropdown:true,hidden:true },
                        { path: 'customerProfit', component: resolve => require(['@/views/caiwu/shujutongji/lirun_paiming'],resolve), meta: {title: '客户利润排名',role:[roleType.caiwu]}, name:'customerProfit' ,noDropdown:true},
                        { path: 'customerProfit/customerProfitNext', component: resolve => require(['@/views/caiwu/shujutongji/lirun_next'],resolve), meta: {title: 'customerProfitNext'}, name:'customerProfitNext' ,noDropdown:true,hidden:true},
                        { path: 'mediaStreaming', component: resolve => require(['@/views/caiwu/shujutongji/meiti_liushui'],resolve), meta: {title: '媒体流水',role:[roleType.caiwu]}, name:'mediaStreaming' ,noDropdown:true},
                        { path: 'Commission', component: resolve => require(['@/views/caiwu/shujutongji/Commission'],resolve), meta: {title: '销售提成',role:[roleType.market_ticheng]}, name:'Commission' ,noDropdown:true,},
                        { path: 'Commission/CommissionInfor', component: resolve => require(['@/views/caiwu/shujutongji/CommissionInfor'],resolve), meta: {title: 'CommissionInfor'}, name:'CommissionInfor' ,noDropdown:true,hidden:true},
                        { path: 'Finance_productLine', component:  resolve => require(['@/views/caiwu/shujutongji/productLine'],resolve), meta: {title: '各产品线'}, name:'Finance_productLine' ,noDropdown:true},

                    ]
                },
                {
                    path: 'FundManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/FundManagement/RenewTheList',
                    meta: {title: '款项管理',role:[roleType.renew_list,roleType.huikuan_list,roleType.yihuikuanxufei_list,roleType.renew_list_caiwu]},

                    name:'FundManagement',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'advancesList', component:  resolve => require(['@/views/kehuguanli/kuanxiang/diankuan'],resolve), meta: {title: '垫款列表',role:[roleType.renew_list]}, name:'advancesList' ,noDropdown:true},
                        { path: 'advancesList/advances', component: resolve => require(['@/views/money/advances'],resolve), meta: {title: '垫款列表'}, name:'advances' ,noDropdown:true,hidden:true},
                        { path: 'receivedPayments', component:  resolve => require(['@/views/kehuguanli/kuanxiang/huikuan'],resolve), meta: {title: '回款列表',role:[roleType.huikuan_list]}, name:'receivedPayments' ,noDropdown:true,},
                        { path: 'receivedPayments/huikuan', component: resolve => require(['@/views/money/huikuan'],resolve), meta: {title: '回款列表'}, name:'huikuan1' ,noDropdown:true,hidden:true},
                        { path: 'outstanding', component: resolve => require(['@/views/kehuguanli/kuanxiang/huikuanxufei/huikuanxufei'],resolve), meta: {title: '已充值回款',role:[roleType.yihuikuanxufei_list]}, name:'outstanding' ,noDropdown:true},
                        { path: 'backMoneyPlan', component: resolve => require(['@/views/caiwu/kuanxiang/backMoneyPlan'],resolve), meta: {title: '回款计划' ,role:[roleType.get_huikuan_plan_group]}, name:'backMoneyPlan' ,noDropdown:true},



                    ]
                },
                {
                    path: 'FundManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/FundManagement/stampApply',
                    meta: {title: '财务申请',role:[roleType.gaizhang]},

                    name:'stampApply',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'stampList', component: resolve => require(['@/views/caiwu/stampApply/stampList'],resolve), meta: {title: '申请盖章列表',role:[roleType.gaizhang]}, name:'stampList' ,noDropdown:true},
                        { path: 'addStamp', component: resolve => require(['@/views/caiwu/stampApply/addStamp'],resolve), meta: {title: '申请盖章',role:[roleType.gaizhang]}, name:'addStamp' ,noDropdown:true,hidden:true},
                        { path: 'stampInfor', component:  resolve => require(['@/views/caiwu/stampApply/stampInfor'],resolve), meta: {title: '申请盖章列表',role:[roleType.gaizhang]}, name:'stampInfor' ,noDropdown:true,hidden:true},

                        //
                    ]
                },
                {
                    path: 'financialStatistics',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/allData/allData',
                    meta: {title: '财务统计',role:[roleType.caiwu_renew_list]},
                    noDropdown:true,
                    name:'allData',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'allData', component:  resolve => require(['@/views/caiwu/allData/index'],resolve), meta: {title: '财务统计'}, name:'allData' ,noDropdown:true,hidden:true},
                    ]
                },
            ]
        },
        {
            path: '/personnelManagement',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/personnelManagement/EmployeeAttendance/leave',
            meta: {title: '人事管理',role:[roleType.qingjia_list,roleType.waichu_list,roleType.users_to_bumen]},

            children: [
                {
                    path: 'EmployeeAttendance',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/EmployeeAttendance/leave',
                    meta: {title: '员工考勤',role:[roleType.qingjia_list,roleType.waichu_list]},

                    name:'EmployeeAttendance',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'leave', component: resolve => require(['@/views/renshi/kaoqing/qingjia'],resolve), meta: {title: '请假',role:[roleType.qingjia_list]}, name:'leave' ,noDropdown:true},
                        { path: 'leave/qingjiashenhe', component:  resolve => require(['@/views/renshi/qingjiashenhe'],resolve), meta: {title: '请假审核'}, name:'qingjiashenhe' ,noDropdown:true,hidden:true},
                        { path: 'goOut', component:  resolve => require(['@/views/renshi/kaoqing/waichu'],resolve), meta: {title: '外出',role:[roleType.waichu_list]}, name:'goOut' ,noDropdown:true},
                        { path: 'goOut/waichushenhe', component:  resolve => require(['@/views/renshi/waichushenhe'],resolve), meta: {title: '外出审核'}, name:'waichushenhe' ,noDropdown:true,hidden:true},
                        { path: 'leave/qingjiatetail', component:  resolve => require(['@/views/renshi/qingjiadetail'],resolve), meta: {title: '请假'}, name:'qingjiatetail' ,noDropdown:true,hidden:true},
                        { path: 'goOut/waichudetail', component:  resolve => require(['@/views/renshi/waichudetail'],resolve), meta: {title: '外出'}, name:'waichudetail' ,noDropdown:true,hidden:true},

                    ]
                },
                {
                    path: 'StaffManagement',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/StaffManagement/NewAccount',
                    meta: {title: '员工管理',role:[roleType.users_to_bumen]},

                    name:'StaffManagement',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'userslist', component:  resolve => require(['@/views/renshi/user'],resolve), meta: {title: '用户列表',role:[roleType.users_to_bumen]}, name:'userslist' ,noDropdown:true},
                        { path: 'NewAccount', component: resolve => require(['@/views/renshi/adduser'],resolve), meta: {title: '新建用户'}, name:'NewAccount' ,noDropdown:true,hidden:true},
                    ]
                },
                {
                    path: 'logList',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/logList/logList',
                    meta: {title: '日志查看',role:[roleType.log_list]},
                    noDropdown:true,
                    name:'logList',
                    children: [
                        { path: 'logList', component: resolve => require(['@/views/renshi/log_list/log_list'],resolve), meta: {title: '日志查看'}, name:'logList' ,noDropdown:true,hidden:true},
                    ]
                },
            ]
        },
        {
            path: '/SuperManagement',
            component: resolve => require(['@/views/layout/LayoutWithHader'],resolve),
            redirect: '/SuperManagement/SystemSettings/AgencyCompany',
            meta: {title: '超级管理'},
            children: [
                {
                    path: 'SystemSettings',
                    component: resolve => require(['@/views/layout/Layout'],resolve),
                    redirect: '/SystemSettings/AgencyCompany',
                    meta: {title: '系统设置'},
                    name:'SystemSettings',
                    icon: 'yingxiaoguanli',
                    children: [
                        { path: 'AgencyCompany', component: resolve => require(['@/views/system/agencyList'],resolve), meta: {title: '公司主体'}, name:'AgencyCompany' ,noDropdown:true},
                        { path: 'BillingType', component: resolve => require(['@/views/system/invoiceType'],resolve), meta: {title: '开票类型'}, name:'BillingType' ,noDropdown:true},
                    ]
                },

            ]
        },
        { path: '*', redirect: '/404', hidden: true }
    ]
});
