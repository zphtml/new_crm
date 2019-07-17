<template>
       <el-row style="" class="accountmessage1">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   账户管理>
               </span>
                修改信息
           </p>
           <el-col :span="24" style="margin-top:10px;position: relative">
               <el-col :sm="24">
                   <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | ad}}</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
               </el-col>
                <el-col :span="24" style="border: 1px solid #f5f5f5;margin-top: 20px"></el-col>
           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="24">
                   <el-col :span="24">
                       <el-col :span="12">
                           <state :item="data" @account_updataru="account_updataru" :account="account"></state>
                       </el-col>
                   </el-col>
                   <el-col :span="24">
                       <!--账号信息-->
                       <account_history @getContractInfor="getContractInfor" :item="account_history"  @yuming_click="yuming_click" @account_updataru="account_updataru"></account_history>
                   </el-col>
                   <el-col :span="12">
                       <!--<account_history :item="account_history"></account_history>-->
                       <!--二级域名-->
                       <yuming :yuming="yuminglist" @yuming_click="yuming_click"  style="margin: 15px 0"></yuming>
                       <!--媒介付款信息-->
                       <fk_infor :item="data"  @fk_inforClick="fk_inforClick"  :account="account"></fk_infor>
                   </el-col>
                   <el-col :span="12">
                       <!--基本信息横条-->
                       <account :item="data" style="margin: 15px 0" :qudaolist="qudaolist" @account_updataru="account_updataru" :account="account"></account>
                       <remark :item="data" @account_updataru="account_updataru" :account="account"></remark>
                   </el-col>

               </el-row>


           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { account_info,account_updataru,account_historyApi} from '@/api/meitiaccount';
    import { account_upkuan } from '@/api/kehu';
    import accounticon from '@/components/cusmessage/accountIcon';
    import account from '@/components/meitiaccount/account';
    import account_history from '@/components/meitiaccount/account_history';
    import state from '@/components/meitiaccount/state';
    import remark from '@/components/meitiaccount/remark';
    import fk_infor from '@/components/meitiaccount/fk_infor';
    import yuming from '@/components/meitiaccount/yuming';
    import {mapGetters} from 'vuex';
    export default {
        name: 'ct',
        components: {
            accounticon,
            account,
            state,
            remark,
            yuming,
            account_history,
            fk_infor
        },
        data() {
            return {
                routeId:'',
                flag:0,
                star:3,
                account:true,
                input:'',
                which:'',
                data:{},
                yuminglist:[],
                Billing:true,
                current:{},
                setcontact:true,
                qudaolist:[],
                customer:true,
                account_history:[],
                account_upkuan:function (data) {
                    account_upkuan(data).then(response => {
                        if(response.msg == "修改账户成功"){
                            this.addFormVisible = false;
                            this.$message({
                                message: '修改账户成功',
                                type: 'success'
                            });
                            this.account_info();
                        }else{
                            this.$message.error('修改账户失败');
                        }
                    }).catch(error => {

                    });
                },
                account_historyApi(){
                    account_historyApi(this.routeId).then(response => {
                        this.account_history = response.account_history;
                        this.routeId = response.account_history[0].id;
                        this.account_info()
                    }).catch(error => {

                    });
                },
                account_info:function(){
                    account_info(this.routeId).then(response => {
                        response.newId = this.routeId;
                        this.data=response.data;
                        this.yuminglist = response;
                        this.qudaolist=response.qudaolist
                    }).catch(error => {

                    });
                },
            }
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.account_historyApi();
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ])
        },
        methods: {
            //跳转
            jumpCustomerList(){
                this.$router.push({ name: 'kehuliebiao' });
            },
            jumpConsole(){
                this.$router.push({ name: 'console' ,query: { type:1} });
            },
            jumpaccount(){
                this.$router.go(-1)
            },
            //账户历史记录详情
            getContractInfor(val){
                this.routeId = val.id;
                this.account_info()
            },
            account_updataru(item){
                account_updataru(this.routeId,item).then(response => {
                    if(response.msg == "修改成功"){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.data=response.data;
                        this.account=true;
                    }else{
                        this.$message.error('修改失败');
                    }
                }).catch(error => {

                });
            },
            //二级域名
            yuming_click(val){
                this.routeId = val;
                this.account_info();
            },
            fk_inforClick(val){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    val.accountid = this.routeId;
                    let data = {};
                    if(val.payment_type == 1){
                        data = {
                            accountid:val.accountid,
                            payment_type:val.payment_type,
                            dk_zhouqi:'',
                            dk_date:'',
                        }
                    }else{
                        data ={
                            accountid:val.accountid,
                            payment_type:val.payment_type,
                            dk_zhouqi:val.dk_zhouqi,
                            dk_date:val.dk_date,
                        }
                    }
                    this.account_upkuan(val);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            huitui(){
                this.$router.go(-1)
            },

            del(val){
                this.contact.splice(val, 1);

            },
            /*新建联系人*/
            xinnew(){
                this.contact.push(this.contact.length)
            }
        },
        watch:{
            customer:function(val){

            },
        },
        filters: {
            cur: function (value) {
                if(value){
                    return value.name
                }else{
                    return '--'
                }
            },
            ad:function (value) {
                if(value){
                    return value.advertiser
                }else{
                    return '--'
                }
            },

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
</style>
