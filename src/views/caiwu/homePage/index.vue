<template>
       <el-row style="" class="bossBox" >
           <div class="backgrountColor" style="  width: 110%;height: 100%;position: absolute;background: #faf9f8;top: -50px;right:-30px;z-index: -1;"></div>
           <p class="crm_title" style="background: #faf9f8" id="anchor">
               <i class="crm_line"></i>
                   财务总览
           </p>
           <el-col :span="24" class="caiwu_head">
               <el-col :span="6"  class="page_box">
                   <el-card class="box-card">
                       <div class="boxList">
                           <div class="top">
                               <div class="name active" @click="diankuan">总垫款</div>
                               <div class="num">{{dian1 | currency('')}}</div>
                           </div>
                           <div class="bottom" @click="jumpBackmonry">
                               <span class="active" >逾期&nbsp;&nbsp;</span>
                               {{ NobackMoney | currency('')}}
                           </div>
                       </div>
                   </el-card>

               </el-col>
               <el-col :span="6"  class="page_box">
                   <el-card class="box-card">
                       <div class="boxList">
                           <div class="top">
                               <div class="name active" @click="huikuan('h1')">本月回款</div>
                               <div class="num"> {{shou1 | currency('')}}</div>
                           </div>
                           <div class="bottom" @click="huikuan('h')">
                                   <span class="active">今日回款&nbsp;&nbsp; </span>
                               {{shou | currency('')}}
                           </div>
                       </div>
                   </el-card>
               </el-col>
               <el-col :span="6"  class="page_box">
                   <el-card class="box-card">
                       <div class="boxList">
                           <div class="top">
                               <div class="name active"  @click="dakuan('h1')">本月付款</div>
                               <div class="num"> {{fu1 | currency('')}}</div>
                           </div>
                           <div class="bottom" @click="dakuan('h')">
                               <span class="active">今日付款&nbsp;&nbsp;</span>
                               {{fu | currency('')}}
                           </div>
                       </div>
                   </el-card>
               </el-col>
               <el-col :span="6" class="page_box">
                   <el-card class="box-card">
                       <div class="boxList">
                           <div class="top">
                               <div class="name active" @click="margin_sum_Click('mt')">媒体保证金</div>
                               <div class="num"> {{ margin_mt_sum_Num | currency('')}}</div>
                           </div>
                           <div class="bottom " @click="margin_sum_Click('kh')">
                                  <span class="active" >客户保证金&nbsp;&nbsp;</span>
                                {{ margin_kh_sum_Num  | currency('')}}
                           </div>
                       </div>
                   </el-card>
               </el-col>
           </el-col>






           <el-col :span="24" class="echarts_backMoney" style="padding: 10px 20px;margin: 20px 0;" id="anchor_a">
               <el-col :span="24" class="title" >
                   打款与回款
               </el-col>
               <el-col :span="24" style="text-align: right">
                   <el-date-picker
                           size="mini"
                           v-model="yearData"
                           align="right"
                           type="year"
                           @change="yearchange"
                           placeholder="选择年">
                   </el-date-picker>
               </el-col>
              <bar_caiwu  :screen_bar="screen_bar"></bar_caiwu>
           </el-col>
           <el-col :span="24" class="echarts_backMoney" style="padding: 10px 20px;margin: 20px 0 0;">
               <el-col :span="24" class="title" id="anchor_b">
                   消耗
               </el-col>
               <el-col :span="24" class="date" style="width: 100%;height: 40px;text-align: right;position: relative">
                   <el-date-picker
                           style="position: absolute;z-index: 1;right: 0;"
                           size="mini"
                           v-model="dateInfor"
                           @change="dateChange"
                           type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
                   </el-date-picker>
               </el-col>
               <div style="margin-top: 30px;padding-bottom: 30px;height:350px;position: relative">
                   <line_caiwu  :screen_line="screen_line"></line_caiwu>
               </div>

           </el-col>


       </el-row>
</template>

<script>
    /*eslint-disable */
    import { dakuan_huikuan_tu,xiaohaotj ,money_fukuan_sum,
        contract_date_sum,xiaohao_date_sum,money_huikuan_sum,money_diankuan_sum,
        Find_market_week_counsumption_statistics, weihuikuanyuqi,
        margin_mt_sum, margin_kh_sum } from '@/api/money';

    import permissionRoutes from '@/store/permission';
    import bar_caiwu from '@/components/Charts/bar_caiwu';
    import line_caiwu from '@/components/Charts/line_caiwu';

    import {mapGetters} from 'vuex';
    import moment from "moment"
    export default {
      data() {
        return {

            dataInfor_a:{
                search:{
                    date: moment().format('YYYY-MM-DD'),
                },
            },


            //打款于回款
            screen_bar:[],
            yearData:moment().format('YYYY'),
            dakuan_huikuan_tu:function (date) {
                dakuan_huikuan_tu({
                    id:date
                }).then(response => {
                    this.screen_bar = response;
                }).catch(error => {

                });
            },
            //消耗
            screen_line:'',
            dateInfor:[moment().subtract(14, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
            xiaohaotj:function(start,end){
                xiaohaotj({
                    start:start,
                    end:end,
                }).then(response => {
                    this.screen_line = response;
                }).catch(error => {

                });
            },


     //媒体保证金
            margin_mt_sum_Num:'',
            margin_mt_sum(){
                margin_mt_sum().then(response => {
                    this.margin_mt_sum_Num = response.sum;
                }).catch(error => {

                });
            },
            //客户保证金
            margin_kh_sum_Num:'',

            margin_kh_sum(){
                margin_kh_sum().then(response => {
                    this.margin_kh_sum_Num = response.sum;
                }).catch(error => {

                });
            },
            //未回款逾期
            NobackMoney:'Loading...',
            weihuikuanyuqi(){
                weihuikuanyuqi({
                    page:1,
                    num:1,
                    search:this.dataInfor_a
                }).then(response => {
                    if(response.sum_money){
                        this.NobackMoney = response.sum_qiane;
                    }else{
                        this.NobackMoney = '0.00';
                    }

                }). catch(err => {this.$message.error('获取失败');});
            },
            //垫款
            dian1:'Loading...',
            money_diankuan_sum(){
                money_diankuan_sum('2000-01-01','10000-01-01').then(response => {
                    this.dian1=response.sum
                }).catch(error => {

                });

            },
            //今日回款
            shou:'Loading...',
            money_huikuan_sum(){
                money_huikuan_sum(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')).then(response => {
                    this.shou=response.sum
                }).catch(error => {

                });
            },
            //本月回款
            shou1:'Loading...',
            money_huikuan_sum_month(){
                money_huikuan_sum(moment().format('YYYY-MM-01'),moment().add(1, 'months').format('YYYY-MM-01')).then(response => {
                    this.shou1=response.sum
                }).catch(error => {

                });
            },
            fu:'Loading...',
            fu1:'Loading...',
// =====================================================================================================
           permissionRoutes: permissionRoutes.get(this.$route),
          slei:'',
          note:'',

          //本日付款
          fu:'Loading...',
            money_fukuan_sum(){

                money_fukuan_sum(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')).then(response => {
                    this.fu=response.sum
                }).catch(error => {

                });
            },
            //本月付款
            fu1:'Loading...',
            money_fukuan_sum_month(){
                money_fukuan_sum(moment().format('YYYY-MM-01'),moment().add(1, 'months').format('YYYY-MM-01')).then(response => {
                    this.fu1=response.sum
                }).catch(error => {

                });
            },
          start:'',
          end:'',
        }
      },
        components: {
            bar_caiwu,
            line_caiwu,
        },
      computed: {
        ...mapGetters([
          'user',
          'roles'
        ]),

      },
        mounted(){
            let data = '';
            for(var i = 0;i<this.permissionRoutes.length;i++){
                if(this.permissionRoutes[i].name == this.$route.name){
                    data = 'true';
                    break;
                }else{
                    data = 'false';
                }
            }
            if(data == 'false'){
                this.$router.push({ name: this.permissionRoutes[0].children[0].name, });
            }else{
                this.xiaohaotj(moment(this.dateInfor[0]).format('YYYY-MM-DD'),moment(this.dateInfor[1]).format('YYYY-MM-DD'));
                this.dakuan_huikuan_tu(moment().format('YYYY'));
                this.money_huikuan_sum();
                this.money_huikuan_sum_month();
                this.money_diankuan_sum()
                this.weihuikuanyuqi();
                this.margin_mt_sum();
                this.margin_kh_sum();
                this.money_fukuan_sum();
                this.money_fukuan_sum_month();
            }


        },

        methods: {
 //===============================================
          yearchange(index){
              this.dakuan_huikuan_tu(moment(index).format('YYYY'))
          },

          dateChange(index){
              this.xiaohaotj(moment(index[0]).format('YYYY-MM-DD'),moment(index[1]).format('YYYY-MM-DD'));
          },



//===============================================
        //跳转合同列表
        huikuan(a){
          if(a=='h'){
            this.$router.push({ name: 'receivedPayments', query: { start: moment().format('YYYY-MM-DD'),end:moment().format('YYYY-MM-DD')}});
          }else if(a=='h1'){
            this.$router.push({ name: 'receivedPayments', query: { start: moment().format('YYYY-MM-01'),end:moment().add(1, 'months').format('YYYY-MM-01')}});

          }
        },
          margin_sum_Click(val){
            if(val == 'kh'){
                this.$router.push({ name: 'FinancialBond', query:{type:"kh"}});
            }else if(val == 'mt'){
                this.$router.push({ name: 'FinancialBond', query:{type:"mt"}});
            }else{
                this.$router.push({ name: 'FinancialBond', query:{type:"df"}});
            }
          },

        diankuan(){

            this.$router.push({ name: 'Financialdiankuan'});

        },
          jumpBackmonry(){
              this.$router.push({ name: 'NonBackPayment'});
          },
        dakuan(a){
            if(a=='h'){
                this.$router.push({ name: 'MediaAdvanceList', query: { start:  moment().format('YYYY-MM-DD'),end: moment().format('YYYY-MM-DD')}});
            }else if(a=='h1'){
                this.$router.push({ name: 'MediaAdvanceList', query: { start:  moment().format('YYYY-MM-01'),end:moment().add(1, 'months').format('YYYY-MM-01')}});

            }

        },
      },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    .bossBox  {
        .caiwu_head {
            margin-top: 10px;
            .page_box {
                padding: 0 10px;
                .boxList {
                    height: 110px;
                    background: white;
                    padding: 0 5px;
                    .active {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                    .top{
                        height: 60px;
                        border-bottom: 1px solid #CCCCCC;
                        .name{
                            font-size: 14px;
                            margin-bottom: 2px;
                        }
                        .num{
                            font-size: 24px;
                            font-weight: bold;
                        }

                    }
                    .bottom{
                        padding-top: 20px;
                        font-size: 13px;
                    }
                }

            }
        }
        .echarts_backMoney {
            width: 100%;
            background: white;
            padding: 10px 20px;
            .title {
                height:30px;
                font-size: 16px;
                font-weight: bold;
            }
            .date {
            }
        }
    }

    @media(max-width: 1280px) {
        .bossBox {
            .caiwu_head {
                .num{
                    font-size: 14px!important;
                }
                .active {
                    display: block;
                }
                .name{
                    font-size: 14px!important;
                }
            }

        }

    }

</style>
