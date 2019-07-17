<template>
    <el-row style="" class="replenishment">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span style="cursor: pointer" @click="huitui">
                   垫款列表>
               </span>
            垫款详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24" v-for="(item,index) in headerInfor" :key="index">
                <span style="font-size: 22px;vertical-align: middle">{{item.advertiser0 | currname}}-垫款详情</span>
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
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <contractmessage :item="data"></contractmessage>

                    <!--基本信息横条结束-->
                    <!--垫款信息信息-->
                    <el-col :span="24" class="ct_InforBox">
                        <el-col :span="24" class="ct_left_box">
                            <el-col :span="24" class="topInfor">
                                <div class="titleInfor">
                                    <span class="listStyle"></span>
                                    <span class="listText">垫款信息</span>
                                </div>
                                <div class="titleBox">
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" style="font-size: 16px;color:#669fe4;font-weight: 550">
                                                金额
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 16px;color:#669fe4;font-weight: 550">
                                   {{data.money| currency('')}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>

                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                {{ $t('titles.fandian') }}
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                   {{data.rebates_proportion}}%
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                显示金额
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.show_money | currency('')}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                账户名称
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span >
                                          {{data.advertiser0 | currname}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                APP名称
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                     {{data.appname}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>

                                </div>
                            </el-col>
                        </el-col>
                    </el-col>

                    <!--垫款信息信息结束-->
                    <!--付款信息-->
                    <el-col :span="24" class="ct_InforBox">
                        <el-col :span="24" class="ct_left_box">
                            <el-col :span="24" class="topInfor">
                                <div class="titleInfor">
                                    <span class="listStyle"></span>
                                    <span class="listText">付款信息</span>
                                </div>
                                <div class="titleBox">
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                付款方式
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.payment_type | curr}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <div style="height: 23px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                付款日期
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                    <span >
                                         {{data.payment_time | cur}}
                                    </span>
                                            </el-col>
                                        </el-col>
                                    </div>
                                </div>
                            </el-col>
                        </el-col>
                    </el-col>
                    <!--付款信息-->
                </el-col>
                <el-col :lg="12" style="padding-top: 10px">
                    <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <remarks style="margin-top: 14px;" :item="data"></remarks>

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact} from '@/api/kehu';
    import { renewinfo,get_files,shenheapi} from '@/api/money';
    import { contractinfo,contract_shenhe1,contract_shenhe2,audit_history} from '@/api/contract';
    import order from '@/components/money/order';
    import replenishment from '@/components/money/replenishment';
    import contractmessage from '@/components/money/contractmessage';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
      name: 'dashboard',
      components: {
        accounticon,
        replenishment,
        contractmessage,
        enclosure,
        remarks,
        order,
        shenheInfor,
      },
      data() {
        return {
            routeId:'',
            customer_Data_type:'',
            screen:{},
          star: 3,
          input: '',
          id:'',
          enclo:[],
          addFormVisibleReceive:false,
          flag:0,
          textarea2:'',
          current:{},
          data:{},
          textarea2:'',
            audit_countAll:'',
            audit:'',
            audit_count:'',
            headerInfor:[],
            shenhe:[],
          matnum:function (str){
            if(str) {
              var newStr = "";
              var count = 0;

              if(str.indexOf(".")==-1){
                for(var i=str.length-1;i>=0;i--){
                  if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                  }else{
                    newStr = str.charAt(i) + newStr;
                  }
                  count++;
                }
                str = newStr + ".00"; //自动补小数点后两位
              }else{
                for(var i = str.indexOf(".")-1;i>=0;i--){
                  if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                  }else{
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                  }
                  count++;
                }
                str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
              }
              return str;
            }else{
              return 0;
            }

          },
            shenheapi:function(audit,id,num){
                shenheapi(audit,id,num).then(response => {
                    this.addFormVisibleReceive=false
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
                    id: this.routeId,
                    gongneng:'renew',
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
            renewinfo(){
                renewinfo( this.routeId).then(response => {
                    this.data=response.data.contract;
                    this.id=response.data.contract.id;
                    this.headerInfor = [];
                    this.headerInfor.push(response.data.contract);
                    this.audit = response.data.contract.audit;
                    this.audit_count = response.data.contract.audit_count;
                    this.audit_history();
                    this.get_files();
                }).catch(error => {

                });
            },
            get_files:function(val){
                get_files( this.routeId,31).then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid: this.routeId,
                        type:31
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
            'audit_action'
        ])
      },
        mounted(){
            this.routeId = this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'renew'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.renewinfo();
        },
      methods: {
          shenheInfor(val){
              this.shenheapi(val.shenheInfor, this.routeId,val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        newcontact(val){
            this.get_files();
        },
        huitui(){
          this.$router.go(-1)
        },
        sango(val){
          this.addFormVisibleReceive=true
          this.flag=3
          audit=val;
        },

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
            currname: function (value) {
                if (value) {
                    return value.advertiser
                } else {
                    return '--'
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
        watch:{

        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/crmStyle/title.scss";
</style>
