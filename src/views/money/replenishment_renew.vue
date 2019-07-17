<template>
       <el-col>
           <el-col style="width: 100%;height: 5px;border-top: 1px dashed #947f7f;    margin: 30px 0 10px 10px;position:relative;">
               <span style="font-size:14px;position: absolute;left: 0; top: -11px;right: 0; bottom: 0;margin: auto;width: 100px;background: white;text-align: center">相关充值审核</span>
           </el-col>
           <shenheInfor  :screen="xufei_screen"  @shenheInfor = shenheInfor @history =history_renew></shenheInfor>
       </el-col>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { shenheapi,renewinfo} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import shenheInfor from '@/components/shenhe/index';
    export default {
      data() {
        return {
            //续费审核
            xufei_screen:{},

            data_renew:{},
            relevance_id:'',
            audit_countAll_renew:'',
            audit_renew:'',
            audit_count_renew:'',
            shenhe_renew:[],
            xf_monet:'',
            a_users_renew:'',
            shenheapi:function(audit,id,num){
                shenheapi(audit,id,num).then(response => {
                    this.renewinfo();
                }).catch(error => {
                    this.renewinfo();
                });
            },

            audit_history:function(name){
                audit_history({
                    id:this.relevance_id,
                    gongneng:name,
                }).then(response => {
                    this.xufei_screen ={
                        audit_countAll:this.audit_countAll_renew,
                        audit:this.audit_renew,
                        audit_count:this.audit_count_renew,
                        hisData:[],
                        a_users:this.a_users_renew,
                        shenhe:this.shenhe_renew,
                        xufei:'isxufei',
                        isHtml:'renew',
                        xf_monet:this.xf_monet,
                        dataInfor: this.data_renew,
                    }
                    this.xufei_screen.hisData = response;
                }).catch(error => {

                });
            },
            //续费
            renewinfo:function(){
                renewinfo(this.relevance_id).then(response => {
                    this.audit_renew = response.data.contract.audit;

                    this.audit_count_renew = response.data.contract.audit_count;
                    this.data_renew=response.data.contract;
                    this.xf_monet = response.data.contract.xf_cost;
                    this.a_users_renew = response.data.contract.account0.a_users;
                    this.audit_history('renew');

                }).catch(error => {
                });
            },
        }
      },
        components: {
            shenheInfor
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
      methods: {
          shenheInfor_renew(id){
            this.relevance_id = id;
              for(let i = 0;i<this.audit_action.length;i++){
                  if(this.audit_action[i].action_name == 'renew'){
                      this.audit_countAll_renew = this.audit_action[i].audit_count;
                      this.shenhe_renew =this.audit_action[i].shenhe;
                  }
              }
            this.renewinfo();
          },
          history_renew(){
              this.audit_history('renew')
          },
          shenheInfor(val){
              this.shenheapi(val.shenheInfor,this.relevance_id,val.shenheInfor.shenhe)
          },




      },
      watch:{

      },
      created() {


      }
    }
</script>
