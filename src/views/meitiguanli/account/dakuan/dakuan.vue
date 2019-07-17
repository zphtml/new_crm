<template>
       <el-row style="" class="orderdetails">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
                查看详情
           </p>
           <el-col :span="24" style="margin-top:10px">
               <el-col :sm="24">
                   <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-打款详情</span>

               </el-col>

           </el-col>
           <el-col :span="24" style="margin-top:10px">
               <el-row :gutter="20">
                   <el-col :lg="14">
                       <dakuanjiben :item="data"></dakuanjiben>
                       <template >
                           <baohanxufei :item="renew" ></baohanxufei>
                       </template>
                   </el-col>
                   <el-col :lg="10" style="padding-top: 10px;">
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
    import { meijie_dakuan_info,meijie_dakuan_shenhe1,meijie_dakuan_shenhe2} from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import enclosure from '@/components/contract/enclosure';
    import dakuanjiben from '@/components/meitiaccount/dakuanjiben';
    import baohanxufei from '@/components/meitiaccount/baohanxufei';
    import shenheInfor from '@/components/shenhe/index';
    import remarks from '@/components/meitiaccount/remarks';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    export default {
      name: 'dashboard',
      components: {
        remarks,
        dakuanjiben,
        baohanxufei,
          enclosure,
        shenheInfor,
      },
      data() {
        return {
            routeId:'',
            screen:{},
          star:3,
          bi:0,
          fu:0,
          id:'',
          enclo:[],
          renew:[],
          current:{},
          data:{},
          addFormVisibleReceive:false,
          flag:0,
          textarea2:'',
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
                    this.meijie_dakuan_info()
                }).catch(error => {
                    this.meijie_dakuan_info()
                });
            },
            audit_history:function(){
                audit_history({
                    id:this.routeId,
                    gongneng:'meijie-dakuan',
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
            meijie_dakuan_info(){
                meijie_dakuan_info(this.routeId).then(response => {
                    this.data=response.data.data;
                    this.renew=response.data;
                    this.id=response.data.data.id;
                    this.audit = response.data.data.audit;
                    this.audit_count = response.data.data.audit_count;
                    this.audit_history();
                    this.get_files()
                }).catch(error => {

                });
            },
            get_files:function(val){
                get_files(this.routeId,33).then(response => {
                    this.enclo = [{
                        data:response.data,
                        audit_count:this.audit_count,
                        audit:this.audit,
                        yid:this.routeId,
                        type:33,
                        name:'hetong'
                    }];
                }).catch(error => {

                });
            },
        }
      },
      filters: {
        curr: function (value) {
          if (value == '' || value == null) {
            return '--'
          } else {
            return value.name
          }
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
                if(this.audit_action[i].action_name == 'meijie-dakuan'){
                    this.audit_countAll= this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.meijie_dakuan_info();
        },
      methods: {
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor,this.routeId,'meijie_dakuan_shenhe'+val.shenheInfor.shenhe)
          },
          history(){
              this.audit_history()
          },
        newcontact(val){
            this.meijie_dakuan_info();
        },
        huitui(){
          this.$router.go(-1)
        },
        del(val){
          this.contact.splice(val, 1);
        },
      },
      watch:{

      },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
