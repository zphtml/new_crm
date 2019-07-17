<template>
    <el-col :span="24" style="padding: 0" class="contractmessage">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                合同基本信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;border: 1px solid rgb(225, 223, 220);" v-for="(data,index) in inforData" :key="index">
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">付款方式</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.payment_type === 1">
                    预付
                </span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.payment_type === 2">
                    垫付
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">合同类型</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                        {{data.type | current}}
                                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">合同编号</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                         {{data.contract_no  | curr}}
                                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">{{ $t('titles.advertiser') }}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                         {{data.advertiser0.advertiser  | curr}}
                                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">{{ $t('titles.agent') }}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                         {{data.agent_company | curr }}
                                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">产品线</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                         {{data.contractproduct[0].name}}
                                </span>
            </el-col>
             <el-col :span="24" v-if="data.payment_type ==2 ">
                          <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                结算方式
                          </span>
                    <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                        <span v-if="data.clearing_form == 1">
                            每月结算
                        </span>
                        <span v-if="data.clearing_form ==2">
                            每笔充值结算
                        </span>
                     </span>
                </el-col>

            <el-col :span="24"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                            <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                    结算类型
                              </span>
                <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                     <span v-if="data.is_jstype == 0">
                                        充值
                                    </span>
                                    <span v-if="data.is_jstype ==1">
                                        消耗
                                    </span>
                                </span>
            </el-col>

            <el-col :span="24" v-if="data.payment_type ==2 && data.clearing_form == 1">
                                     <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                    结算日
                              </span>
                <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <span   class="input_search"  v-if="data.jiesuan_day == 0">
                                        自然月
                                </span>
                <span class="input_search" v-else>
                                      {{data.jiesuan_day}}号
                                </span>
                </span>
            </el-col>
            <el-col :span="24"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                                       <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                    付款日
                              </span>
                <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                    {{data.pay_day}}号
                                </span>
            </el-col>

            <el-col :span="24"  v-if="data.payment_type ==2 && data.clearing_form == 1">
                                      <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                    付款范围
                              </span>
                <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                     付款日前{{data.pay_scope}}月
                                </span>
            </el-col>

            <el-col :span="24"  v-if="data.payment_type ==2 && data.clearing_form == 2">
                                     <span style="display: inline-block;width: 85px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">
                                    回款周期
                              </span>
                <span  style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                    {{data.zhouqi}}天
                                </span>
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
                account:true,
            }
        },
        filters: {
            current: function (value) {
                if(value==1){
                    return '普通合同'
                }else{
                    return '框架合同'
                }
            },
            curr:function (val) {
                if(val){
                    return val
                }else{
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
            plane_fil(val){
                if(val){
                    return val.prlin.name
                }else{
                    return '--'
                }
            },
        },
        watch:{
            item(val){
                this.inforData = [];
                this.inforData.push(val);
            },
        },
        methods:{
            set(){
                this.$emit('newcontact', [this.item1,this.contact]);
            },
            del(val){
                this.$emit('del', [val,this.item1.id]);
            }
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        created() {

        },
        props: {
            item:{
                type: Object,
                default: function () {
                    return {advertiser0:{},mht:{prlin:{}}}
                }
            },
            xf_qiane:[Number,String]
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .contractmessage{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .el-select .el-input {
            width: 110px;
        }
        .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 180px;
        }
        .el-input__inner {
            height: 24px !important;
            line-height: 24px !important;
        }
        .el-input-group {
            width: 250px;
        }

        .el-button--primary {
            /*margin-left: 14px;*/
            font-size: 12px;
            width: 43px;
            height: 23px;
            color: #fff;
            background-color: #20a0ff;
            border-color: #20a0ff;
        }
        .el-button--default{
            font-size: 12px;
            width: 43px;
            height: 23px;
        }
        .el-button {
            padding: 0;
        }
        .el-button--text {
            margin-left: 8px;
            border: none;
            color: #000;
            background: 0 0;
            font-size: 12px;
            padding-left: 0;
            padding-right: 0;
        }

    }

</style>
