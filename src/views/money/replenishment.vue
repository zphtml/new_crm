<template>
       <el-row >
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
                补款详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24">
                   <span style="font-size: 22px;vertical-align: middle">
                             {{data.advertiser0 | curr1}}
                       -补款详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>

                   <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       <!--负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{data.contractinfo.market0 | curr}}</b>-->
                       <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                       <!--负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{data.contractinfo.business}}</b>-->
                   </span>
                   <el-tooltip content="跳转客户控制台" placement="top" effect="light" v-if="btn_show">
                       <i class="el-icon-menu" @click="jumpconsole"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                   </el-tooltip>
               </el-col>
           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="12">
                       <!--基本信息横条-->
                       <replenishment :item="data"></replenishment>
                       <!--媒介基本合同-->
                       <el-col :span="24" style="position: relative;" v-if="$route.query.payment_type == 311">
                           <el-button v-if="metaccount"  style="padding: 5px 15px;height: auto;width: auto;position: absolute;right: 18px;top: 14px;" type="primary" @click="meijie_htclick">修改账户当前媒介合同</el-button>
                           <add_meijie_account :item="meida_account"  @media_account_Infor = media_account_Infor></add_meijie_account>
                           <mediacontract :item="data.contractinfo"></mediacontract>
                       </el-col>
                       <!--基本信息横条结束-->
                       <remarks style="margin-top: 14px;" :item="data"></remarks>

                   </el-col>
                   <el-col :lg="12" style="padding-top: 15px">
                       <shenheInfor :screen="screen"  @shenheInfor = shenheInfor @history =history></shenheInfor>
                       <!--相关充值-->
                       <replenishment_renew v-show="xufei_shenhe" ref="shenheInfor_renew"></replenishment_renew>
                       <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                   </el-col>

               </el-row>

           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { bukuan_info,get_files,shenheapi_a,renewinfo} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import replenishment from '@/components/money/replenishment';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import mediacontract from '@/components/contract/mediacontract';
    import add_meijie_account from '@/components/cusmessage/media_account';
    import replenishment_renew from './replenishment_renew';

    import Vue from 'vue';
    import moment from "moment"
    export default {
      name: 'dashboard',
      components: {
          add_meijie_account,
          mediacontract,
          accounticon,
        replenishment,
        enclosure,
        remarks,
        shenheInfor,
          replenishment_renew,

      },
      data() {
        return {
            btn_show:false,
            routeId:'',
            xf_contractid:'',
            screen:{},
            meida_account:{},
            metaccount:false,
          which:'',
          star:3,
          id:'',
          enclo:[],
          flag:0,
            //补款审核
            audit_countAll:'',
            audit:'',
            audit_count:'',
            current:{},
            data:{},
            a_users:'',
            account_show:false,
            shenhe:[],
            relevance_id:'',//续费id
            xufei_shenhe:false,
            shenheapi_a:function(audit,id,num){
                shenheapi_a(audit,id,num).then(response => {
                    this.bukuan_info();
                }).catch(error => {
                    this.bukuan_info();
                });
            },

            audit_history:function(name){
                audit_history({
                    id: this.routeId,
                    gongneng:name,
                }).then(response => {
                        if(this.data.payment_type == 311){
                            this.screen = {
                                audit_countAll:this.audit_countAll,
                                audit: this.audit,
                                audit_count:this.audit_count ,
                                hisData:[],
                                a_users:this.a_users,
                                shenhe:this.shenhe,
                                xufei:'bukuan',
                                dataInfor: this.data,
                            };
                            this.screen.hisData = response;
                        }else{
                            this.screen = {
                                audit_countAll:this.audit_countAll,
                                audit: this.audit,
                                hisData:[],
                                audit_count:this.audit_count ,
                                shenhe:this.shenhe,
                            };
                            this.screen.hisData = response;
                        }
                }).catch(error => {

                });
            },
            //补款
            bukuan_info:function(){
                bukuan_info( this.routeId).then(response => {
                    this.data=response.data;

                    this.Account({
                        id:response.data.advertiser,
                        name:response.data.advertiser0.advertiser
                    });
                    this.relevance_id = response.data.relevance_id
                    this.btn_show = true;
                    this.xf_contractid = response.data.xf_contractid;
                    this.id=response.data.id;
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;
                    if(this.data.payment_type == 311){
                        this.a_users = response.data.account0.a_users;
                    }
                    if(response.data.account0 =='null'){
                        this.account_show = false;
                    }else{
                        this.account_show = true
                    }
                    let Name = "";
                    if(this.$route.query.payment_type == 311){
                        Name = "bukuanbi";
                    }else{
                        Name = "bukuan";
                    }
                    this.audit_history(Name);
                    this.get_files();
                    if(response.data.audit_count ==  Object.keys( this.shenhe).length && response.data.payment_type != 3){
                        this.xufei_shenhe = true;
                        this.$refs.shenheInfor_renew.shenheInfor_renew(this.relevance_id);
                    }
                }).catch(error => {

                });
            },
            get_files:function(val){
                let dataID = "";
                if(this.$route.query.payment_type == 311){
                    dataID = 165;
                }else{
                    dataID = 31;
                }
                get_files( this.routeId,dataID).then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid: this.routeId,
                        type:dataID
                    }];
                }).catch(error => {

                });
            },
        }
      },
      computed: {
        ...mapGetters([
          'user',
          'roles',
           'audit_action',
        ])
      },
        mounted(){
            this.routeId = this.$route.query.id;
            this.mountedData();
            let _this = this;
            this.roles.filter(function(item){
                if(item == "/api/meijie-contract/add-contract"){
                    _this.metaccount = true;
                }
            });
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
// 跳转到控制台
          jumpconsole(){
              this.$router.push({ name: 'console' ,query: { type:1} });

          },
          mountedData(){
              this.bukuan_info();
              if(this.$route.query.payment_type == 311){
                  for(let i = 0;i<this.audit_action.length;i++){
                      if(this.audit_action[i].action_name == 'bukuanbi'){
                          this.audit_countAll = this.audit_action[i].audit_count;
                          this.shenhe =this.audit_action[i].shenhe;
                      }else if(this.audit_action[i].action_name == 'renew'){
                          this.audit_countAll_renew = this.audit_action[i].audit_count;
                          this.shenhe_renew =this.audit_action[i].shenhe;
                      }
                  }

              }else{
                  for(let i = 0;i<this.audit_action.length;i++){
                      if(this.audit_action[i].action_name == 'bukuan'){
                          this.audit_countAll = this.audit_action[i].audit_count;
                          this.shenhe =this.audit_action[i].shenhe;
                      }
                  }
              }
          },
          history(){
              let Name = "";
              if(this.$route.query.payment_type == 311){
                  Name = "bukuanbi";
              }else{
                  Name = "bukuan";
              }
              this.audit_history(Name)
          },

          shenheInfor(val){
              if(this.$route.query.payment_type == 311){
                  this.shenheapi_a(val.shenheInfor, this.routeId,'bukuanbi_shenhe'+val.shenheInfor.shenhe)

              }else{
                  this.shenheapi_a(val.shenheInfor, this.routeId,'bukuan_shenhe'+val.shenheInfor.shenhe)
              }
          },
          //修改账户当前媒介合同
          meijie_htclick(){
              this.meida_account = {
                  isTan:true,
                  data:this.data,
                  istype:"xufei",
                  accountData:[this.a_users],
                  dataInfor:this.data
              }
          },
          media_account_Infor(){
              this.mountedData()
          },
        newcontact(val){
            this.bukuan_info();
        },
        huitui(){
          this.$router.go(-1)
        },
      },
      watch:{

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
      created() {


      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";

</style>
