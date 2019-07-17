<template>
       <el-row style="" class="replenishment">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   回款列表>
               </span>
                回款详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24" v-for="(item,index) in headerInfor" :key="index">
                   <span style="font-size: 22px;vertical-align: middle">{{item.advertiser0 | curr}}-回款详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                   <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.submituser0 |  curr1 }}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.advertiser0.business0 | curr1}}</b>
                   </span>


               </el-col>


           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="12">
                       <!--基本信息横条-->
                       <huikuanment :item="data"></huikuanment>
                       <!--基本信息横条结束-->

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
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import { back_money_info,get_files,back_money1,back_money2,shenheapi_a} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import order from '@/components/money/order';
    import huikuanment from '@/components/money/huikuanment';
    import contractmessage from '@/components/contract/contractmessage';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import {mapGetters} from 'vuex';
    export default {
      name: 'dashboard',
      components: {
          accounticon,
        huikuanment,
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
          which:'',
          account:true,
          star:3,
          input:'',
          current:{},
          enclo:[],
          data:{},
          id:"",
          addFormVisibleReceive: false,
          flag: 0,
          textarea2: '',
            audit_countAll:'',
            audit:'',
            audit_count:'',
            headerInfor:[],
            shenhe:[],
            shenheapi_a:function(audit,id,num){
                shenheapi_a(audit,id,num).then(response => {
                    this.addFormVisibleReceive=false
                    if(audit.audit==1){
                        this.current.ershen=true;
                        this.current.eryu=true;
                    }else if(audit.audit==2){
                        this.current.ershen=true;
                        this.current.eryu=false;
                    }
                    this.back_money_info();
                }).catch(error => {
                    this.back_money_info();
                });
            },
            audit_history:function(){
                audit_history({
                    id: this.routeId,
                    gongneng:'backmoney',
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
            back_money_info(){
                back_money_info( this.routeId).then(response => {
                    this.data=response.data;
                    this.id=response.data.id;
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;
                    this.headerInfor = [];
                    this.headerInfor.push(response.data);
                   this.audit_history();
                    this.get_files()
                }).catch(error => {

                });
            },
            get_files: function (val) {
                get_files( this.routeId,'3').then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid: this.routeId,
                        type:3
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
                if(this.audit_action[i].action_name == 'backmoney'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.back_money_info();
        },

      methods: {
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor, this.routeId,'back_money_shenhe'+val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        newcontact(val){
            this.back_money_info();
        },
        huitui(){
          this.$router.go(-1)
        },

      },
      watch: {

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
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";

</style>
