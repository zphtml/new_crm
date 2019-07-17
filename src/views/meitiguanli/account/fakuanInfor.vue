<template>
       <el-row style="" class="replenishment ">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   罚款列表>
               </span>
                罚款详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24"  v-for="(item,index) in headerInfor" :key="index">
                   <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-罚款详情</span>
                   <accounticon :customer_Data_type="data.advertiser0"></accounticon>

               </el-col>


           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :span="12" class="kh_InforBox">
                       <!--基本信息横条-->
                       <replenishment :item="data"></replenishment>
                       <!--基本信息横条结束-->

                   </el-col>
                   <el-col :span="12" style="margin-top: 15px">
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
    import { get_files,shenheapi_a} from '@/api/money';
    import { meijie_fakuan_info} from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import replenishment from '@/components/money/fakuan';
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
      data() {
        return {
            routeId:'',
            screen:{},
          which:'',
            headerInfor:[],
          star:3,
          id:'',
          enclo:[],
          addFormVisibleReceive:false,
          flag:0,
          textarea2:'',
          current:{},
            a_users:'',
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
                    this.meijie_fakuan_info();
                }).catch(error => {
                    this.meijie_fakuan_info();
                });
            },
            audit_history:function(){
                audit_history({
                    id: this.routeId,
                    gongneng:'meijie_fakuan',
                }).then(response => {
                    this.screen = {
                        audit_countAll:this.audit_countAll,
                        audit:this.audit,
                        audit_count:this.audit_count,
                        hisData:[],
                        shenhe:this.shenhe,
                        a_users:this.a_users,
                    };
                    this.screen.hisData = response;
                }).catch(error => {

                });
            },
            meijie_fakuan_info(){

                meijie_fakuan_info( this.routeId).then(response => {

                    this.data=response.data;
                    this.id=response.data.id;
                    this.headerInfor = [];
                    this.headerInfor.push(response.data);
                    this.audit = response.data.audit;
                    this.audit_count = response.data.audit_count;

                    this.audit_history();
                    this.get_files()
                }).catch(error => {

                });
            },
            get_files:function(val){
                get_files( this.routeId,1007).then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid: this.routeId,
                        type:1007
                    }];
                }).catch(error => {

                });
            },
        }
      },
        components: {
            accounticon,
            replenishment,
            enclosure,
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
                if(this.audit_action[i].action_name == 'meijie_fakuan'){
                    this.audit_countAll= this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.meijie_fakuan_info();
        },
      methods: {
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor, this.routeId,'meijie_fakuan_shenhe'+val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        newcontact(val){
            this.meijie_fakuan_info();
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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
</style>
