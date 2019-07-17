<template>
       <el-row>
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
                备款退款详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24"  v-for="(item,index) in headerInfor" :key="index">
                   <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-退款详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                   <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{data.contractinfo.market0 | curr}}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{data.contractinfo.business}}</b>
                   </span>

               </el-col>


           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="12" class="kh_InforBox">
                       <!--基本信息横条-->
                       <replenishment :item="data"></replenishment>
                       <!--基本信息横条结束-->

                   </el-col>
                   <el-col :lg="12" style="margin-top: 20px">
                       <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                       <remarks style="margin-top: 14px;" :item="data"></remarks>

                   </el-col>

               </el-row>
           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { shenheapi_a} from '@/api/money';
    import { refund_money_beikuan_info} from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import replenishment from '@/components/money/refund_beikuan';
    import remarks from '@/components/contract/remarks';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';

    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
      name: 'dashboard',
      data() {
        return {
            routeId:'',
            screen:{},
          which:'',
            headerInfor:[],
          star:3,
          id:'',
          addFormVisibleReceive:false,
          flag:0,
          textarea2:'',
          current:{},
          data:{},
            audit_countAll:'',
            audit:'',
            audit_count:'',
            shenhe:[],
            hisData:[],
            shenheapi_a:function(audit,id,num){
                shenheapi_a(audit,id,num).then(response => {
                    this.addFormVisibleReceive=false;
                    if(audit.audit==1){
                        this.current.ershen=true;
                        this.current.eryu=true;
                    }else if(audit.audit==2){
                        this.current.ershen=true;
                        this.current.eryu=false;
                    }
                    this.refund_money_beikuan_info();
                }).catch(error => {
                    this.refund_money_beikuan_info();
                });
            },
            audit_history:function(){
                audit_history({
                    id: this.routeId,
                    gongneng:'beikuan_account_tuikuan',
                }).then(response => {
                    this.hisData = response;
                    this.screen = {
                        audit_countAll:this.audit_countAll,
                        audit:this.audit,
                        audit_count:this.audit_count,
                        isHtml:'dikou',
                        hisData:this.hisData,
                        shenhe:this.shenhe,
                    };
                }).catch(error => {

                });
            },
            refund_money_beikuan_info(){
                refund_money_beikuan_info( this.routeId).then(response => {
                    this.data=response.data;
                    this.id=response.data.id;
                    this.headerInfor = [];
                    this.headerInfor.push(response.data);
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;
                    this.audit_history();

                }).catch(error => {

                });
            },

        }
      },
        components: {
            accounticon,
            replenishment,
            remarks,
            shenheInfor,
        },
      computed: {
        ...mapGetters([
          'user',
          'roles',
            'audit_action',
        ])
      },
        mounted(){
            this.routeId =  this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'beikuan_account_tuikuan'){
                    this.audit_countAll= this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.refund_money_beikuan_info();
        },
      methods: {
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor, this.routeId,'beikuan_account_tuikuan_shenhe'+val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },

        huitui(){
          this.$router.go(-1)
        },
      },
      watch:{

      },
      filters: {
        curr: function (value) {
          if(value.name){
            return value.name
          }else{
              return "--"
          }
        },
        cur: function (value) {
          return moment(value*1000).format('YYYY-MM-DD')
        },
        curr1: function (value) {
          if (value == '' || value == null) {
            return '--'
          } else {
            return value.advertiser
          }
        },
      },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
