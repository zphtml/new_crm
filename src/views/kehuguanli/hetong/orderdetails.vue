<template>
       <el-row style="" class="order_details">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   下单列表>
               </span>
               下单详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24" v-for="(item,index) in headerInfor" :key="index">
                   <span style="font-size: 22px;vertical-align: middle">
                          {{item.advertiser0 | currname}}
                            <!--<span @click="jumpxieyi" style="cursor: pointer">-->
                       <!---->
                    <!--</span>-->

                       -下单详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                   <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.contractinfo |  curr1 }}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.contractinfo.business}}</b>
                   </span>
               </el-col>
           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="16">
                       <!--基本信息横条-->
                       <order :item="data"></order>
                       <!--相关回款-->
                       <backMoney :item="backMoney_infor"></backMoney>
                       <el-col :span="24" style="position: relative;">
                           <el-tooltip content="跳转媒介合同" placement="top" effect="light" v-if="metaccount &&mht_id!=null&&mht_id!=''" >
                               <i class="el-icon-menu"  @click="jump_mj_xieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 17px;cursor: pointer"></i>
                           </el-tooltip>
                            <mediacontract :item="data.contractinfo"></mediacontract>
                        </el-col>
                       <el-col :span="24" style="position: relative;">
                           <el-tooltip content="跳转协议合同" placement="top" effect="light">
                               <i class="el-icon-menu" @click="jumpxieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                           </el-tooltip>
                          <contractmessage :item="data.contractinfo" :xf_qiane="data.xf_qiane"></contractmessage>
                      </el-col>

                   </el-col>
                   <el-col :lg="8" style="padding-top: 10px">
                       <accountmessage :item="data.account0" :item1="data.account0" @setin="setin"></accountmessage>
                       <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                       <!--购买产品信息结束-->
                       <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                       <remarks :item="data"></remarks>
                       <!--媒介付款基本信息-->
                       <fk_money :item="data"></fk_money>
                   </el-col>
               </el-row>


           </el-col>
           <!--弹窗 媒介付款详情-->
           <el-dialog title="媒介付款详情" :visible.sync="addFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false"  class="tan_shiftTo" >
               <ul class="shiftTo"  v-for="(data,index) in formData" :key="index">
                   <li>
                       <p  class="first_p">客户URL</p>
                       <p class="last_p">
                           <a :href=URLdata  target="_blank">{{URLdata}}</a>
                       </p>
                   </li>
                   <li>
                       <p  class="first_p">付款方式</p>
                       <p class="last_p">
                           <el-radio-group v-model="data.payment_type">
                               <el-radio   :label="1" >预付</el-radio>
                               <el-radio   :label="2" >垫付</el-radio>
                           </el-radio-group>
                       </p>
                   </li>
                   <li v-if="data.payment_type == 2" style="margin-bottom: 10px">
                       <p class="first_p">周期</p>
                       <p class="last_p">
                           <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; padding-left:27px;outline: none;z-index:9"
                                  type="number" v-model="data.dk_zhouqi"
                                  name="mouse2"
                                  placeholder="周期"
                                  v-on:input="change_data"
                                  onmousewheel="return false;">
                           <span>
                            天
                        </span>
                       </p>
                   </li>
                   <li v-if="data.payment_type == 2">
                       <p class="first_p">付款日</p>
                       <p class="last_p">
                           <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; ;padding-left:27px;outline: none;z-index:9"
                                  type="number" v-model="data.dk_date"
                                  name="mouse2"
                                  v-on:input="change_day"
                                  placeholder="付款日"
                                  onmousewheel="return false;">
                           <span>
                            号（1-31号）
                        </span>
                       </p>
                   </li>
               </ul>
               <span slot="footer" class="dialog-footer" style="text-align: center">
						<el-button type="primary" @click="pull_xh" >确 定</el-button>

			</span>
           </el-dialog>
       </el-row>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    /*eslint-disable */
    import { changecustomers ,apicustomers,contacts,addcontacts,renew_to_huikuan,account_upkuan} from '@/api/kehu';
    import { renewinfo,get_files,shenheapi_b} from '@/api/money';
    import { contractinfo,contract_shenhe1,contract_shenhe2,renewhuikuan} from '@/api/contract';
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import { audit_history} from '@/api/contract';
    import order from '@/components/contract/order';
    import mediacontract from '@/components/contract/mediacontract';
    import contractmessage from '@/components/contract/contractmessage';
    import accountmessage from '@/components/contract/accountmessage';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import backMoney from '@/components/contract/backMoney';
    import accounticon from '@/components/cusmessage/accountIcon';
    import fk_money from '@/components/contract/fk_money';

    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
      name: 'dashboard',
      data() {
        return {
            mht_id:'',
            metaccount:false,
            xf_contractid:'',
            headerInfor:[],
            routerid:'',
            screen:{},
            which: '',
            account: true,
            star: 3,
            input: '',
            setcontact: true,
            contact: [1, 2, 3],
            customer: true,
            audit_countAll:'',
            audit:'',
            audit_count:'',
            addFormVisibleReceive: false,
            flag: 0,
            textarea2: '',
            id: '',
            current:{},
            data:{},
            enclo: [],
            backMoney_infor:[],
            shenhe:[],
            addFormVisible:false, //消耗
            URLdata:"",
            orderMoney:'',
            a_users:'',
            formData:[{
                accountid:'',
                dk_zhouqi:'1',
                payment_type:1,
                dk_date:1,
            }],
            shenheapi_b:function(audit,id,num){
                shenheapi_b(audit,id,num).then(response => {
            this.addFormVisibleReceive=false;
            if(audit.audit==1){
                this.current.ershen=true;
                this.current.eryu=true;
            }else if(audit.audit==2){
                this.current.ershen=true;
                this.current.eryu=false;
            }
            this.renewinfo();
            }).catch(error => {
            this.renewinfo();
            });
            },
            audit_history:function(){
            audit_history({
            id:this.routerid,
            gongneng:'xiadan',
            }).then(response => {
            this.screen = {
                audit_countAll:this.audit_countAll,
                audit:this.audit,
                audit_count:this.audit_count,
                hisData:[],
                shenhe:this.shenhe,
                xufei:'isxufei',
                a_users:this.a_users,
                orderMoney:this.orderMoney,
                dataInfor: this.data,
                isHtml:'xiadan',
            };
            this.screen.hisData = response;
            }).catch(error => {

            });
            },
            renewinfo:function(){
            renewinfo(this.routerid).then(response => {
                this.data=response.data.contract;
                this.mht_id = response.data.contract.account0.mht_id;
                this.xf_contractid = response.data.contract.xf_contractid;
                this.Account(response.data.contract)
                this.URLdata = response.data.contract.xiadan.url;
                this.id=response.data.contract.id;
                this.audit = response.data.contract.audit;
                this.audit_count = response.data.contract.audit_count;
                this.orderMoney = response.data.contract.money;
                this.a_users = response.data.contract.account0.a_users;
                this.audit_history();
                this.headerInfor = [];
                this.headerInfor.push(response.data.contract);
                this.get_files();
                let _this = this;
                this.formData[0].accountid = response.data.contract.account0.id;
                this.roles.filter(function(item){
                    if(item == "/api/meijie-contract/add-contract"){
                        if(response.data.contract.account0.mt_payment_type == null   ){
                            if( _this.orderMoney>0){
                                _this.addFormVisible = true;
                            }
                        }
                    }
                });
            }).catch(error => {

            });
            },
            get_files: function () {
            get_files(this.routerid,'4').then(response => {
            this.enclo = [{
                data:response.data,
                audit_count:this.audit_count,
                audit:this.audit,
                yid:this.routerid,
                type:4
            }];
            }).catch(error => {

            });
            },
            renew_to_huikuan:function(){
            renew_to_huikuan({
            id:this.routerid,
            }).then(response => {
            this.backMoney_infor = response.data
            }).catch(error => {

            });
            },
            account_upkuan:function () {
                let data = {};
                if(this.formData[0].payment_type == 1){
                    data = {
                        accountid:this.formData[0].accountid,
                        payment_type:this.formData[0].payment_type,
                        dk_zhouqi:'',
                        dk_date:'',
                    }
                }else{
                    data ={
                        accountid:this.formData[0].accountid,
                        payment_type:this.formData[0].payment_type,
                        dk_zhouqi:this.formData[0].dk_zhouqi,
                        dk_date:this.formData[0].dk_date,
                    }
                }

                account_upkuan(data).then(response => {
                    if(response.msg == "修改账户成功"){
                        this.addFormVisible = false;
                        this.$message({
                            message: '修改账户成功',
                            type: 'success'
                        });
                        this.renewinfo();
                        this.renew_to_huikuan();
                    }else{
                        this.$message.error('修改账户失败');
                    }
                }).catch(error => {

                });
            },
        }
      },
        components: {
            accounticon,
            mediacontract,
            contractmessage,
            accountmessage,
            enclosure,
            remarks,
            order,
            shenheInfor,
            backMoney,
            fk_money
        },
      computed: {
        ...mapGetters([
          'user',
          'roles',
          'audit_action'
        ])
      },
      filters: {
          currname: function (value) {
              if (value) {
                  return value.advertiser
              } else {
                  return '--'
              }
          },
        curr: function (value) {
          if (value == '' || value == null) {
            return '--'
          } else {
            return value.name
          }
        },
          curr1: function (value) {
              if(value){
                  if(value.market0){
                      return value.market0.name
                  }else{
                      return '--'
                  }
              }else {
                  return '--'
              }
          },
      },
      methods: {
          ...mapActions([
              'searchData',
              'Account',
          ]),
          change_data(){
              if(Number(this.formData[0].dk_zhouqi)<1){
                  this.formData[0].dk_zhouqi = 1;
              }
              this.formData[0].dk_zhouqi =Math.round(this.formData[0].dk_zhouqi)
          },
          change_day(){
              if(Number(this.formData[0].dk_date)>31){
                  this.formData[0].dk_date = 31;
              }else if(Number(this.formData[0].dk_date)<1){
                  this.formData[0].dk_date = 1;
              }
              this.formData[0].dk_date =Math.round(this.formData[0].dk_date)
          },
 //跳转媒介合同
          jump_mj_xieyi(){
              this.$router.push({ name: 'mediaviewcontract' ,query: { id:this.mht_id}});
          },
// 跳转到协议
          jumpxieyi(){
              this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

          },
        newcontact(val){
            this.renewinfo();
        },
          shenheInfor(val){
              this.shenheapi_b(val.shenheInfor,this.routerid,'xiadan-shenhe'+ val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        //更改账户信息
        setin(item){
          item.id=this.routerid
          renewhuikuan(item).then(response => {
            if(response.code == '500'){
              this.$message.error(response.msg);
            }else{
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }

          }).catch(error => {

          });
        },
        huitui(){
          this.$router.go(-1)
        },
          close(){
              this.addFormVisible = false;
          },
          pull_xh(){
              this.$confirm('是否提交?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.account_upkuan();
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消'
                  });
              });

          },
      },
     mounted(){
         for(let i = 0;i<this.audit_action.length;i++){
             if(this.audit_action[i].action_name == 'xiadan'){
                 this.audit_countAll= this.audit_action[i].audit_count;
                 this.shenhe =this.audit_action[i].shenhe;
             }
         }
         let _this = this;
         this.roles.filter(function(item){
             if(item == "/api/meijie-contract/add-contract"){
                 _this.metaccount = true;
             }
         });
         this.routerid = this.$route.query.id;
            this.renewinfo();
            this.renew_to_huikuan();
        },
      watch: {

      },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .order_details {
        .tan_shiftTo {
            .el-dialog {
                width:360px;
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }
                .el-dialog__body {
                    padding: 10px 20px;
                    .shiftTo {
                        margin:0;
                        padding:0;
                        list-style: none;
                        .el-date-editor.el-input {
                            width:150px;
                        }
                        p{
                            font-size: 12px;
                            display: inline-block;
                            margin:0;
                        }
                        li{
                            margin: 5px 0;
                            .first_p {
                                width:90px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .last_p{
                                width:170px;
                                position: relative;
                                a{
                                    text-decoration: none;
                                    color: #000;
                                    outline: none;
                                    width: 100%;
                                    display: inline-block;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    vertical-align: top;
                                    height: 100%;
                                }
                                a:hover{
                                    color: #66b1ff;
                                    text-decoration: underline;
                                }
                                .el-select {
                                    height:30px;
                                    input{
                                        height: 30px !important;
                                        line-height: 30px!important;
                                    }
                                }
                            }
                            p{
                                .right_span{
                                    width:40px;
                                    height:25px;
                                    border-radius: 3px;
                                    background: #f0f2f5;
                                    text-align: center;
                                    line-height: 25px;
                                    font-size: 12px;
                                    display: inline-block;
                                    border:1px solid #bbbbbb;
                                    float: right;
                                    margin-top: 2.5px;
                                    cursor: pointer;
                                }
                                .tan_input,.yanqi {
                                    height:30px;
                                    width:100%;
                                    input{
                                        height: 30px!important;
                                        line-height:29px!important;
                                    }
                                    .el-input__icon {
                                        vertical-align: top;
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                    }

                }
                .dialog-footer {
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .el-input__icon {
                line-height: 20px!important;
            }
        }
    }

</style>
