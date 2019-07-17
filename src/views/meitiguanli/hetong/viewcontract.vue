<template>
       <el-row  >
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   返回>
               </span>
                查看合同
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24" v-for="(item,index) in headerInfor"  :key="index">
                   <span style="font-size: 22px;vertical-align: middle">{{item.advertiser0 | curr}}</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                   <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.submituser0 |  curr1 }}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.advertiser0.business0 | curr1}}</b>
                   </span>
               </el-col>
           </el-col>

           <el-col :span="24" style="margin-top:10px" >
                   <el-col :lg="16" style="padding-right: 10px">
                           <!--基本信息-->
                           <contracttable :item="data"></contracttable>
                           <!--购买产品信息-->
                           <product :item="data"></product>

                           <payment :item="data"></payment>
                       <!--协议列表-->
                       <xieyi_table :xieyiData="xieyiData"></xieyi_table>
                   </el-col>
                   <el-col :lg="8" style="padding-top: 10px;position: relative">
                       <guidangInfor :item="data" @puu_yes="puu_yes"></guidangInfor>
                       <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>

                       <!--附件-->
                       <enclosure :item="enclo" @newcontact="newcontact" style="padding-left: 10px"></enclosure>
                       <remarks :item="data"></remarks>
                   </el-col>
           </el-col>
           <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive" @close="addFormVisibleReceive = false"  size="tiny" >

               <div style="margin-top: 20px;margin-bottom: 20px;">
                   <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">审核备注</span>
                   <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </span>
               </div>
               <div style="text-align: right">
                   <el-button type="primary" @click="tbn">确定</el-button>
                   <el-button @click="addFormVisibleReceive=false">取消</el-button>
               </div>
           </el-dialog>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { contractinfo_new,contract_shenhe1,contract_shenhe2,audit_history} from '@/api/contract';
    import { customer_list ,Roler_users,customers,contract_guidang_new,xieyiList_Infor} from '@/api/kehu';
    import { shenheapi_a,get_files} from '@/api/money';
    import remarks from '@/components/contract/remarks';
    import contracttable from '@/components/contract/contract';
    import product from '@/components/contract/product';
    import payment from '@/components/contract/payment';
    import xieyi_table from '@/components/contract/xieyi_table';
    import guidangInfor from '@/components/contract/guidang';
    import accounticon from '@/components/cusmessage/accountIcon';
    import shenheInfor from '@/components/shenhe/index';
    import {mapGetters} from 'vuex';
    import enclosure from '@/components/contract/enclosure';
    import moment from "moment"
    let audit={};
    export default {
      name: 'ct',
      components: {
            accounticon,
            remarks,
            payment,
            xieyi_table,
            product,
            contracttable,
            shenheInfor,
            enclosure,
          guidangInfor
      },
      data() {
        return {
            routeQuery:'',
          screen:{},
            headerInfor:[],
            enclo:[],
            xieyiData:[],
          flag:0,
          star:3,
          textarea2:'',
          addFormVisibleReceive:false,
          input:'',
          which:'',
          data:{},
          Billing:true,
          current:{},
          setcontact:true,
          contact:[1,2,3],
          goornot:false,
          sangoornot:false,
          yishen:false,
          ershen:'',
          sanji:false,
          sanshen:false,
          customer:true,
          eryu:'',
            audit_countAll:'',
            audit:'',
            audit_count:'',
            shenhe:[],
            contractinfo_new:function(){
                contractinfo_new(  this.routeQuery).then(response => {
                    this.data=response.data;
                    this.headerInfor = [];
                    this.headerInfor.push(response.data);
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;
                    this.audit_history();
                    this.audit_count = response.data.audit_count;
                    this.audit = response.data.audit;
                    this.get_files();
                }).catch(error => {

                });
            },
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
                    this.contractinfo_new();
                }).catch(error => {
                    this.contractinfo_new();
                });
            },
            audit_history:function(){
                audit_history({
                    id:  this.routeQuery,
                    gongneng:'contract_new',
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
            xieyiList_Infor:function(){
                xieyiList_Infor({
                    data:{
                        htid:  this.routeQuery
                    },
                }).then(response => {
                    this.xieyiData = response.list;
                }).catch(error => {

                });
            },
            get_files:function(){
                get_files(  this.routeQuery,1006).then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid:  this.routeQuery,
                        type:1006,
                        name:'hetong'
                    }];
                }).catch(error => {

                });
            },
            contract_guidang_new:function(val){
                contract_guidang_new({
                    id:  this.routeQuery,
                    guidang_no:val
                }).then(response => {
                    if(response.code == 200){
                        this.$message({
                            message: '归档成功',
                            type: 'success'
                        });
                        this.contractinfo_new();
                    }else{
                        this.$message.error('归档失败');
                    }
                }).catch(error => {

                });
            },
        }
      },
      filters: {
          curr: function (value) {
              if (value) {
                  return value.advertiser
              } else {
                  return '--'
              }
          },
          curr1: function (value) {
              if(value){
                  return value.name
              }else {
                  return '--'
              }
          },
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
      computed: {
        ...mapGetters([
          'user',
          'roles',
            'audit_action'
        ])
      },
        mounted(){
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'contract_new'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.routeQuery = this.$route.query.id;
            this.contractinfo_new();
            this.xieyiList_Infor();
        },
      methods: {
          history(){
              this.audit_history()
          },
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor,  this.routeQuery,'contract_new_shenhe'+val.shenheInfor.shenhe)
          },
          newcontact(val){
              this.contractinfo_new();
          },
        huitui(){
          this.$router.go(-1)
        },
        puu_yes(){
            this.$prompt('请输入归档编号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:  /\S/,
                inputErrorMessage: '编号不能为空',
            }).then((data) => {
                this.contract_guidang_new(data.value);
                this.$message('归档中....');
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消归档'
                });
            });

          },
        tbn(){
          audit.note=this.textarea2;
          if(this.flag==1){
            contract_shenhe1(audit,  this.routeQuery).then(response => {
              this.addFormVisibleReceive=false
              if(audit.audit==1){
                this.current.yishen=true;
                this.current.goornot=true;
              }else if(audit.audit==2){
                this.current.yishen=true;
                this.current.goornot=false;
              }
            }).catch(error => {

            });
          }else if(this.flag==2){
            contract_shenhe2(audit,  this.routeQuery).then(response => {
              this.addFormVisibleReceive=false
              if(audit.goin==1){
                this.current.ershen='shen';
                this.current.eryu=true;

              }else if(audit.goin==2){
                this.current.ershen='shen';
                this.current.eryu=false;

              }else if(audit.goin==3){
                this.current.ershen='yushen';
                this.current.eryu=true;
                this.current.sanji=true;

              }else if(audit.goin==4){
                this.current.sanshen=true;
                this.current.sangoornot=true

              }else if(audit.goin==5){
                this.current.sanshen=true;
                this.current.sangoornot=false

              }
            }).catch(error => {

            });
          }


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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
