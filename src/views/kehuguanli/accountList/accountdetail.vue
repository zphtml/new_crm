<template>
       <el-row style="" class="accountmessage1">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>修改信息</span>
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24">
                   <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | ad}}-修改信息</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
               </el-col>

           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="16">
                       <!--基本信息横条-->
                       <account :item="data" :qudaolist="qudaolist" @account_updataru="account_updataru" :account="account"></account>
                       <!--基本信息横条结束-->
                       <!--购买产品信息-->
                       <state :item="data" @account_updataru="account_updataru" :account="account"></state>
                       <!--二级域名-->
                       <yuming :yuming="yuminglist" @yuming_click="yuming_click"></yuming>
                       <!--媒介付款信息-->
                       <fk_infor :item="data" @fk_inforClick="fk_inforClick" :account="account"></fk_infor>
                       <remark :item="data" @account_updataru="account_updataru" :account="account"></remark>

                   </el-col>
               </el-row>


           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { account_info,account_updataru} from '@/api/meitiaccount';
    import { account_upkuan } from '@/api/kehu';
    import accounticon from '@/components/cusmessage/accountIcon';
    import account from '@/components/meitiaccount/account';
    import state from '@/components/meitiaccount/state';
    import yuming from '@/components/meitiaccount/yuming';
    import remark from '@/components/meitiaccount/remark';
    import fk_infor from '@/components/meitiaccount/fk_infor';


    import {mapGetters} from 'vuex';
    import moment from "moment"
    export default {
      name: 'ct',
      components: {
          accounticon,
        account,
        state,
        yuming,
        remark,
          fk_infor
      },
      data() {
        return {
           companyId:'',
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
            account_info:function(){
                account_info(this.$route.query.id).then(response => {
                    this.data=response.data;
                    response.newId =  this.companyId ;
                    this.yuminglist = response;
                    this.qudaolist=response.qudaolist
                }).catch(error => {

                });
            },
        }
      },
        mounted(){
          this.companyId = this.$route.query.id;
          this.account_info();
        },
      computed: {
        ...mapGetters([
          'user',
          'roles'
        ])
      },
      methods: {
          //跳转
          jumpxieyiList(){
              this.$router.push({ name: 'ProtocolList' });
          },
          jump_xy_infor(){
              this.$router.push({ name: 'agreementDetails' , query: { id:this.$route.query.accountId}});
          },
          jumpaccount(){
              this.$router.go(-1)
          },
        account_updataru(item){
            let url=location.href.split('?')[1];
            let ref=url.split('&');
          account_updataru(decodeURI(ref[0].split('=')[1]),item).then(response => {
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
        this.account_info();
    },
    fk_inforClick(val){
              this.$confirm('是否提交?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  val.accountid = this.$route.query.id;
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
