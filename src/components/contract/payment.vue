<template>
    <el-col :span="24" class="payment">
        <!--充值详情-->
        <el-col :span="24" class="ct_InforBox" style="padding: 0;"
                v-if="this.$route.path =='/customer/FundManagement/renewList/renew'||
                 this.$route.path =='/customer/FundManagement/orderList/orderdetails'||
                 this.$route.path =='/MediaManagement/MediaFundManagement/MediaRenewTheList/mediaxufei'||
                  this.$route.path =='/financialManagement/FundManagement/FinanceRenewTheList/Financexufei'">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 付费信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData" :key="index">
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                               <span style="width: 120px;display: inline-block"     class="title">
                                    付款方式
                                </span>
                                 <span        class="input_search">
                                    {{data.payment_type | curr}}
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                            <span style="width: 120px;display: inline-block"     class="title">
                                    付款日期
                            </span>
                                 <span    class="input_search">
                                    {{data.payment_time | cur}}
                                </span>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>
        </el-col>
        <!--合同详情-->
        <el-col :span="24" class="ct_InforBox" style="padding: 0;"
                v-if="this.$route.path =='/customer/contractManagement/compactList/viewcontract'|| this.$route.path =='/MediaManagement/MediacontractManagement/MediaaccounttList/Mediaviewcontract'" >
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 付费信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData" :key="index">
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <span style="width: 120px;display: inline-block"     class="title">
                                    付款方式
                                </span>
                                 <span    class="input_search">
                                       <span v-if="data.payment_type == 1">
                                            预付
                                        </span>
                                    <span v-if="data.payment_type ==2">
                                        垫付
                                    </span>
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                 <span style="width: 120px;display: inline-block"     class="title">
                                    回款周期
                                </span>
                                 <span      class="input_search">
                                    {{data.zhouqi}}天
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <span style="width: 120px;display: inline-block"     class="title">
                                    合同有效期
                                </span>
                                 <span      class="input_search">
                                    {{data.contract_start | start}} 至 {{data.contract_end | end}}
                                </span>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>
        </el-col>
        <!--协议详情-->
        <el-col :span="24" class="ct_InforBox" style="padding: 0;"  v-if="this.$route.path =='/customer/contractManagement/ProtocolList/agreementDetails'" >
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 付费信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData" :key="index">
                        <div  style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    付款方式
                              </span>
                                 <span     class="input_search">
                                    <span v-if="data.payment_type == 1">
                                        预付
                                    </span>
                                    <span v-if="data.payment_type ==2">
                                        垫付
                                    </span>
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;"  v-if="data.payment_type ==2 ">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    结算方式
                              </span>
                                <span      class="input_search">
                                    <span v-if="data.clearing_form == 1">
                                        每月结算
                                    </span>
                                    <span v-if="data.clearing_form ==2">
                                        每笔充值结算
                                    </span>
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    结算类型
                              </span>
                                <span      class="input_search">
                                     <span v-if="data.is_jstype == 0">
                                        充值
                                    </span>
                                    <span v-if="data.is_jstype ==1">
                                        消耗
                                    </span>
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    结算日
                              </span>
                                <span   class="input_search"  v-if="data.jiesuan_day == 0">
                                        自然月
                                </span>
                                <span class="input_search" v-else>
                                      {{data.jiesuan_day}}号
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    付款日
                              </span>
                                <span      class="input_search">
                                    {{data.pay_day}}号
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;" v-if="data.payment_type ==2 && data.clearing_form == 1">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    付款范围
                              </span>
                                <span      class="input_search">
                                     付款日前{{data.pay_scope}}月
                                </span>
                            </el-col>
                        </div>
                        <div  style="height: 23px;margin-bottom: 5px;" v-if="data.payment_type ==2 && data.clearing_form == 2">
                            <el-col :span="24"  class="infor_a">
                              <span style="width: 120px;display: inline-block"     class="title">
                                    回款周期
                              </span>
                                 <span      class="input_search">
                                    {{data.zhouqi}}天
                                </span>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                inforData:[],
            }
        },
          watch:{
              item(val){
                  this.inforData = [];
                  this.inforData.push(val);
            },
          },
        methods:{

        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
      created() {

      },
        filters: {
            current: function (value) {
                if(value=='' || value==null){
                    return '--'
                }else{
                    return value
                }
            },
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
            start:function (val) {
                return   moment(val*1000).format('YYYY-MM-DD')
            },
            end:function (val) {
                if(val<=0){
                    return '消费结束'
                }else{
                    return moment(val*1000).format('YYYY-MM-DD')
                }
            }
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "../../styles/crmStyle/infor";
    .payment{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }

    }

</style>
