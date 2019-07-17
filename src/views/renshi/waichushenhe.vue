<template>
       <el-row style="" class="waichu_shenhe">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   外出列表>
               </span>
                我要外出
           </p>
           <el-col :span="24" style="margin-top:10px">
                   <el-col :lg="14" style="padding-right: 10px;">
                       <el-col :span="24" style="padding: 0">
                           <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                               <el-col :span="24" style="padding-left: 0">
                                   <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                   外出信息
                               </el-col>
                           </el-col>
                           <el-col :span="24" style="margin-top: 10px;padding: 0">
                               <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出公司
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出联系人
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出公司地址
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出时间
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                       外出事由
                                   </el-col>
                               </el-col>
                               <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <span>{{data.gongsi}}</span>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <span>{{data.lianxiren}}</span>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <span>{{data.dizhi}}</span>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <span>{{data.starttime | ctimeData}}</span>
                                       ~
                                       <span>{{data.endtime | ctimeData}}</span>

                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b;border-bottom: none">
                                       <span>{{data.shiyou}}</span>
                                   </el-col>
                               </el-col>
                           </el-col>
                       </el-col>
                   </el-col>
                   <el-col :lg="10" style="padding-left: 10px;">
                       <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                   </el-col>
           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { shenheapi_a} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import { waichu_shenhe2,waichu_shenhe1,waichu_info} from '@/api/renshi';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import shenheInfor from '@/components/shenhe/index';
    import moment from "moment"
    let audit;
    export default {
      name: 'dashboard',
      data() {
        return {
            routeId:'',
            screen:{},
          which:'',
          current:{},
          addFormVisibleReceive: false,
          flag: 0,
          textarea2: '',
          data:{},
            audit_countAll:'',
            audit:'',
            audit_count:'',
            shenhe:[],
            waichu_info:function(){
                waichu_info( this.routeId).then(response => {
                    this.data=response.data.data;
                    this.audit = response.data.data.audit;
                    this.audit_count = response.data.data.audit_count;
                   this.audit_history()
                }).catch(error => {

                });
            },
            audit_history:function(){
                audit_history({
                    id: this.routeId,
                    gongneng:'waichu',
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
                    this.$notify({
                        title: '审核已完成',
                        message: '此页面将跳转到--外出列表',
                        type: 'success'
                    });
                    this.$router.push({ name: 'goOut' });
                }).catch(error => {
                    this.qingjia_info();
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
            this.routeId =  this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'waichu'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.waichu_info();
        },
      components: {
        shenheInfor,
      },
      filters:{
        ctimeData(val){
          var time=new Date(parseInt(val) * 1000);
          return   moment(time).format('YYYY-MM-DD')
        },

      },
      methods: {
        newcontact(val){

          this.enclo[val].showImg=true;
        },
        huitui(){
          this.$router.go(-1)
        },
          history(){
              this.audit_history()
          },
          shenheInfor(val){
              this.shenheapi_a(val.shenheInfor, this.routeId,'waichu_shenhe'+val.shenheInfor.shenhe)
          },
      },
      watch: {
        id: function (val) {
        },
      },
      created() {
      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    .waichu_shenhe {
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid rgb(230,230,230);

        }
    }
</style>
