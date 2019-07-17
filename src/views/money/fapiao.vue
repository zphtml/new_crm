<template>
       <el-row style="" class="tuikuan">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
                发票详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24">
                   <span style="font-size: 22px;vertical-align: middle">
                   <span @click="jumpxieyi" style="cursor: pointer">
                        {{data.advertiser0 | curr1}}
                       </span>
                       -发票详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                   <el-tooltip content="跳转客户控制台" placement="top" effect="light" v-if="btn_show">
                       <i class="el-icon-menu" @click="jumpconsole"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                   </el-tooltip>
               </el-col>

           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="12">
                       <!--基本信息横条-->
                       <fapiao :item="data" @visible="visible"></fapiao>

                       <!--基本信息横条结束-->

                       <!--开票信息信息-->
                       <billing :item="data"></billing>
                       <!--开票信息信息结束-->

                   </el-col>
                   <el-col :lg="12" style="margin-top: 15px">
                       <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                       <remarks style="margin-top: 14px;" :item="data"></remarks>

                   </el-col>
               </el-row>

               <el-dialog title="开票信息修改" class="tan_fp"  :visible.sync="VisibleReceive" @close="close" size="tiny" >

                   <div style="margin-bottom: 20px;">
                       <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">发票号</span>
                       <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                        <el-input v-model="phao"></el-input>
                      </span>
                   </div>
                   <div style="margin-top: 20px;margin-bottom: 20px;">
                       <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">发票时间</span>
                       <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                        <el-date-picker  :clearable='false'
                                v-model="ptime"
                                type="date"
                                placeholder="选择日期">
                         </el-date-picker>
                      </span>
                   </div>
                   <div style="text-align: right">
                       <el-button type="primary" @click="changepiao">确定</el-button>
                       <el-button @click="VisibleReceive=false">取消</el-button>
                   </div>
               </el-dialog>
           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact} from '@/api/kehu';
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import { invoice_info,invoice_shenhe1,invoice_shenhe2,invoice_update_ru,shenheapi_a} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import order from '@/components/money/order';
    import fapiao from '@/components/money/fapiao';
    import billing from '@/components/money/billingnew';
    import contractmessage from '@/components/contract/contractmessage';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import Vue from 'vue';
    import moment from "moment"
    export default {
      name: 'dashboard',
      data() {
        return {
            btn_show:false,
            routeId:'',
            xf_contractid:'',
            screen:{},
          which:'',
          VisibleReceive:false,
          account:true,
          phao:'',
          ptime:'',
          star:3,
          addFormVisibleReceive:false,
          flag:0,
          textarea2:'',
          current:{},
          data:{},
            audit_countAll:'',
            audit:'',
            audit_count:'',
            shenhe:[],
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
                    this.invoice_info();
                }).catch(error => {
                    this.invoice_info();
                });
            },
            audit_history:function(){
                audit_history({
                    id: this.routeId,
                    gongneng:'invoice',
                }).then(response => {
                    this.screen = {
                        audit_countAll:this.audit_countAll,
                        audit:this.audit,
                        audit_count:this.audit_count,
                        hisData:[],
                        shenhe:this.shenhe,
                    };
                    this.screen.hisData = response;
                }).catch(error => {

                });
            },
            invoice_info:function(){
                invoice_info( this.routeId).then(response => {
                    this.data=response.data;
                    this.Account({
                        id:response.data.invoice_head,
                        name:response.data.advertiser0.advertiser
                    });
                    this.btn_show = true;
                    this.xf_contractid = response.data.xf_contractid;
                    this.phao=response.data.fp_on;
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;
                    if(response.data.kp_time==null || response.data.kp_time=='' || response.data.kp_time==0){
                        this.ptime=moment().format('YYYY-MM-DD')
                    }else{
                        this.ptime=moment(response.data.kp_time).format('YYYY-MM-DD')
                    }
                    this.audit_history();

                }).catch(error => {

                });
            },
        }
      },
        components: {
            accounticon,
            fapiao,
            billing,
            contractmessage,
            enclosure,
            remarks,
            order,
            shenheInfor
        },
        filters: {
            curr: function (value) {
                if(value==1){
                    return '预付'
                }else if(value==2){
                    return '垫付'
                }else{
                    return '--'
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
      computed: {
        ...mapGetters([
          'user',
          'roles',
            'audit_action'
        ])
      },
        mounted(){
            this.routeId = this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'Invoice'){
                    this.audit_countAll= this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.invoice_info();

        },
      methods: {
          ...mapActions([
              'searchData',
              'Account',
          ]),
// 跳转到协议
          jumpxieyi(){
              this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

          },
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor, this.routeId,'invoice_shenhe'+val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        //修改发票号弹框
        visible(data){
          this.VisibleReceive=true;

        },
          close(){
            this.VisibleReceive = false;
          },
        changepiao(){
          let data={};
          data.fp_on=this.phao;
          data.kp_time=moment(this.ptime).format('YYYY-MM-DD');

          invoice_update_ru( this.routeId,data).then(response => {
            this.VisibleReceive=false;
              this.invoice_info();
          }).catch(error => {

          });
        },
        huitui(){
          this.$router.go(-1)
        },
  // 跳转控制台
          jumpconsole(){
              this.$router.push({ name: 'console' ,query: { type:1} });
          },
      },

      watch:{
        customer:function(val){

        },
      },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";

</style>
