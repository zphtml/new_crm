<template>
    <header class="crm_header">
        <div class="container">
            <div class="nav-logo-container">
                <h1 style="height: 20px;"> <a href="/index.html"><img src="http://test.myushan.com/ZPCRMlogo_p1.jpeg" alt="" style="width: 100%;height: 100%;"></a></h1>
            </div>
            <div class="left_btn" @click="show_left_Layout" v-show="$route.meta.title!='首页' && $route.meta.title!='公司公告'">
                <img src="http://dedaodl.yushan.mobi/831menu%20%281%29.png" alt="">
            </div>
            <menu1 :permissionRoutes="list1" :more="list2"></menu1>
            <ErrLog v-if="log.length>0" class="errLog-container" :logsList="log"></ErrLog>
            <el-dropdown trigger="click">
                <div class="avatar-wrapper">
                    <div class="logoImg">
                        <img :src=headerImg alt="">
                    </div>
                    <span style="color: #fff;">{{user.name}}</span>
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link  class='inlineBlock' to="/modify">
                        <el-dropdown-item>
                            个人设置
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="tishi" trigger="click" >
                     <el-badge :value="allval" :max="99" class="item" style="border: none;font-size: 12px">
                    <img src="../../assets/1221001.png" alt="" style="width: 25px">
                 </el-badge>
                    <el-dropdown-menu slot="dropdown"  class="header_tishi">
                        <el-dropdown-item v-for="(data,key) in daibanAll" :key="key">
                            <div  @click="jump(key)">
                                <el-badge :value="data" :max="99" class="item" style="border: none;font-size: 12px;color:white;" v-if="Number(data) != 0" >
                                    {{ key | filterName }}
                                </el-badge>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </div>
    </header>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'
    import { auditaction } from '@/api/kehu';
    import { getTo } from '@/api/contract';
    import ErrLog from '@/components/ErrLog';
    import menu1 from '@/components/menu/menu1';
    import errLogStore from '@/store/errLog';
    import { bus } from '@/store/eventBus'
    import permissionRoutes from '@/store/permission';
    let  daiban_list = {
        bukuan_daiban:{
            name:'补款',
            jump:'fillingList'
        },
        contract:{
            name:'合同',
            jump:'compactList'
        },
        fapiao:{
            name:'发票',
            jump:'InvoiceList'
        },
        huikuan_daiban:{
            name:'回款',
            jump:'receivedPayments'
        },
        kebao:{
            name:'客保',
            jump:'CustomerSupportSystem'
        },
        meijie_bukuan:{
            name:'媒介补款',
            jump:'MediaSupplementList'
        },
        meijie_dakuan:{
            name:'媒介打款',
            jump:'MediaAdvanceList'
        },
        meijie_huikuan:{
            name:'媒介回款',
            jump:'MediaCollectionList'
        },
        qddakuan:{
            name:'渠道打款',
            jump:'ChannelMoney'
        },
        qingjia:{
            name:'请假',
            jump:'ChannelMoney'
        },
        refund_account_p:{
            name:'退款到总账户拼框套壳',
            jump:'refundList'
        },
        refund_account_z:{
            name:'退款到总账户直开',
            jump:'refundList'
        },
        refund_kehu_daiban:{
            name:'退款到客户',
            jump:'refundList'
        },
        renew_daiban:{
            name:'充值',
            jump:'renewList'
        },
        xiadan:{
            name:'下单',
            jump:'orderList'
        },
        waichu:{
            name:'外出',
            jump:'goOut'
        },
        xieyi_daiban:{
            name:'执行框架',
            jump:'ProtocolList'
        },
        zhuankuan:{
            name:'转款列表',
            jump:'TransferOfFundsList'
        },
        meijiecontract:{
            name:'媒介合同待审核',
            jump:'MediaProtocolList'
        },
        beikuan:{
            name:'备款列表',
            jump:'ReserveList'
        },
        meijie_fakuan:{
            name:'罚款列表',
            jump:'MediafineList'
        },
        contract_accounts:{
            name:'结算单列表',
            jump:'backMoneyList'
        },

    };
    export default {
        components: {
            ErrLog,
            menu1,
            bus
        },
        data() {
            return {
                layout:false,
                clinwidth:0,
                headerImg:'',
                activeNav: '/reports',
                log: errLogStore.state.errLog,
                permissionRoutes: [],
                list1:[],
                list2:[],
                allval:'',
                daibanAll:[],
                sumNum:99999,
                auditaction:function(){
                    auditaction({
                    }).then(response => {
                        this.audit_action(response);
                    }). catch(() => {this.$message.error('获取失败');});
                },
                getTo:function(){
                    getTo({
                    }).then(response => {
                        this.allval = response.sum;
                        this.daibanAll = response.daiban;
                        if(Number(this.sumNum)< Number(response.sum)){
                            if(window.Notification && Notification.permission !== "denied") {
                                Notification.requestPermission(function() {
                                    var n = new Notification('通知', { body: '新增审核，请查看！'  ,icon: 'http://test.myushan.com//crm/logo.png'});
                                });
                            }
                        }
                        this.sumNum  = response.sum
                    }). catch(() => {this.$message.error('获取失败');});
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'LogOut',
            ])
        },
        watch: {
            $route() {
                let index = this.$route.path.indexOf('/',1);
                this.activeNav = this.$route.path.substring(0,index);
            },
            clinwidth(val){
                this.layout = true;
              this.list1=this.permissionRoutes;
                if(val>1300){
                    this.list1=this.permissionRoutes;
                    this.list2=[];
                }else if(val>1200){
                    this.list1=this.permissionRoutes.slice(0,4);
                    this.list2=this.permissionRoutes.slice(4,6);
                }else  if(val>1000){
                    this.list1=this.permissionRoutes.slice(0,3);
                    this.list2=this.permissionRoutes.slice(3,6);
                } else if(val>600) {
                    this.list1 = this.permissionRoutes.slice(0, 2);
                    this.list2 = this.permissionRoutes.slice(2, 6);
                }else  {
                    this.list1 = this.permissionRoutes.slice(0, 1);
                    this.list2 = this.permissionRoutes.slice(1, 6);
                    this.layout = false;
                }
                bus.$emit('layout',this.layout);
            }
        },
        mounted(){
            this.clinwidth = window.innerWidth;
            this.headerImg = this.user.image;
            this.auditaction();

          let data=permissionRoutes.getHeaderMenu();
          for(let i=0;i<data.length;i++){
            if(!data[i].hidden){
                this.permissionRoutes.push(data[i])
            }
          }
            this.getTo();
        },
        created(){
            let that=this;
            window.onresize = function(){
                that.clinwidth = window.innerWidth;
            };

            setInterval(function(){
                that.getTo();
            },120000);
        },
        methods: {
            ...mapActions([
                'audit_action'
            ]),
            show_left_Layout(){
                this.layout = !this.layout;
                bus.$emit('layout',this.layout);
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({ path: '/login' })
                });
            },
            jump(val){
                for(let a in  daiban_list){
                    if(a == val){
                        this.$router.push({ name: daiban_list[a].jump });
                    }
                }

            },
            color(){

            }
        },
        filters:{
            filterName(val){
                for(let a in  daiban_list){
                    if(a == val){
                        return  daiban_list[a].name
                    }
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .container {
        width:100%;
        height: 50px;
        position: fixed;
        padding-bottom: 10px;
        top:0;
        left: 0;
        z-index:1000;
        background: rgb(54,63,94);
        .avatar-wrapper {
            color: white;
        }
        .logoImg {
            width:33px;
            height:33px;
            display: inline-block;
            border-radius: 50%;
            background: white;
            vertical-align: middle;
            margin-right: 10px;
            overflow: hidden;
            img{
                width: 100%;
                height:100%;
            }
        }
    }
    .el-menu {
        border-radius: 2px;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background: rgb(54,63,94);
    }
    .el-menu .is-active{
        color: #20a0ff;
    }
    .avatar-container {
        float: right;
    }
    .el-menu li{
        width:110px;
        text-align: center;
        font-size: 14px;
        color: #bfcbd9;
        font-weight: 500;
    }
    .el-menu li:hover{
        background: #48576a;

    }
    .nav-logo-container {
        background: #435c73;
        width: 170px;
        height: 50px;
        float: left;
        z-index: 9999;
        position: relative;
    }
    .left_btn {
        width: 60px;
        height: 50px;
        line-height: 50px;
        float: left;
        color: white;
        padding: 10px;
        cursor: pointer;
        img{
            width: 30px;
        }
    }
    .nav-logo-container img {
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        margin: auto;
    }
    .nav-menu-container {
        float: left;
    }
    .el-dropdown{
        width: 135px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        float: right;
        .user-avatarp[data-v-c1bfb5ca] {
            width: 40px;
            height:40px;
        }
    }
    .el-dropdown-menu__item--divided:before {
        height:0;
    }
    .el-dropdown-menu {
        width:100px;
        text-align: center;
    }
    .tishi{
        display: inline-block;
        float: right;
        width: 25px;
        margin-top: 10px;
        cursor: pointer;
        margin-right: 15px;
        img{
            width: 100%;
        }
    }
    .header_tishi {
        width:180px;
        background: rgb(54,63,94);
        font-size: 12px;
        color: white;
        top:42px!important;
        .el-dropdown-menu__item:not(.is-disabled):hover{
            background-color: #585d6e;
            color: white;
        }
    }
    @media screen and (max-width:800px){
        .crm_header {
            .nav-logo-container{
                display: none;
            }
        }
        .logoImg{
            display: none!important;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss" >
    .el-badge__content{
        border: none!important;
    }
    .header_tishi {
        .item {
            .is-fixed {
                top: 10px!important;right: 1px!important;
            }
        }
    }
    .header_tishi[x-placement^=bottom] .popper__arrow::after{
        border-bottom-color: #363f5e!important;
    }

</style>
