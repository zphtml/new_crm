<template>
    <el-row class="dakuan">
        <el-col :span="24">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">媒体列表</span>><span @click="jumpConsole">客户控制台</span>><span>添加公司打款</span>
            </p>
        </el-col>
        <el-col :span="24" style="margin: 20px 0">
            <div style="width: 70%;margin:0 auto">
                <el-steps :active="active" finish-status="success">
                    <el-step title="选择充值"></el-step>
                    <el-step title="选择抵扣"></el-step>
                    <el-step title="确定金额"></el-step>
                </el-steps>
            </div>

        </el-col>

        <el-col :span="24" v-show="active == 0">
            <!--选择金额-->
            <pay_dakuan @steps="steps"></pay_dakuan>
        </el-col>
        <el-col :span="24" v-show="active == 1">
            <!--确定抵扣-->
            <deduction @steps="steps"  ref="deductionData"></deduction>
        </el-col>
        <el-col :span="24"  v-show="active == 2">
            <!--结束-->
            <finish @steps="steps" ref="finishData"></finish>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import pay_dakuan from './adddakuan/pay_dakuan';
    import deduction from './adddakuan/deduction';
    import finish from './adddakuan/finish';

    import {mapGetters} from 'vuex';

    import moment from "moment"
    export default {
        name: 'dashboard',
        components: {
            pay_dakuan,
            deduction,
            finish
        },
        data() {
            return{
                active: 0,
                dakuan:[],
                dikou:[],
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
        },
        methods: {
            //打款步骤
            steps(val){
                if(val.type == 1){
                    this.dakuan = val;
                    this.$refs.deductionData.deductionData( this.dakuan  );
                }else if(val.type == 2){
                    this.dikou = val;
                    this.$refs.finishData.finishData( val, this.dakuan,this.dikou);
                }
                this.active = val.type;

            },
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            jumpConsole(){
                this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
            },
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
        .dakuan{
            .el-step__head.is-process{
                color: #285bcc;
                border-color: #285bcc;
            }
            .el-step__title.is-process{
                color: #285bcc;
            }
        }
</style>
