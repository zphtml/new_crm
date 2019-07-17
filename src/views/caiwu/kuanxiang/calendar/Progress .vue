<template>
    <el-row class="progress_box">
        <div style="font-size: 13px;margin: 10px 0;width: 100%;display: inline-block;display: inline-block;position: relative">
            <div style="text-align: right;">
               <div style="float: left;font-size: 14px">
                    <span>
                    总回款：{{huikuan| currency('') }}
                </span>
               </div>
                <div style="float: right">
                      <span style="color: rgb(255, 136, 23);font-size: 15px;">
                 ￥     {{prictical | currency('') }}
               </span> <span style="color: #409eff;margin-right: 25px;font-size: 17px;">
                 / {{plan_money| currency('') }}
                </span>
                </div>

            </div>
            <el-progress :text-inside="true" color=" rgb(255, 136, 23)" :stroke-width="30" :percentage="percentage"></el-progress>
            <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>-->
        </div>
    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {get_huikuan_plan_cost} from '@/api/kehu';
    import moment from "moment"

    export default {
        name: 'dashboard',
        data() {
            return {
//计划还款实际还款
                plan_money:'',
                prictical:'',
                huikuan:'',
                percentage:0,

 //计划回款和实际回款
                month:'',
                this_date:'',
                get_huikuan_plan_cost:function () {
                    get_huikuan_plan_cost({
                        start_date:moment(this.month).format('YYYY-MM-DD'),
                        end_date:moment(this.month).format('YYYY-MM-'+moment(this.this_date).daysInMonth()),
                    }).then(val => {
                        this.plan_money = val.data.plan;
                        this.prictical = val.data.planhuikuantoad;
                        this.huikuan = val.data.huikuan;
                        this.percentage = this.plan_money!=0?Number( ((this.prictical /this.plan_money) *100).toFixed(2)):0;

                    }). catch(err => {this.$message.error('获取失败');});
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        mounted(){
        },
        methods: {
//获取本月全部回款计划
            get_money(val){
                this.month = val;
                this.this_date =  moment(this.month).format('YYYY-MM-DD');
                this.get_huikuan_plan_cost()
            },
        },
        watch:{

        },
        filters: {},

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    .progress_box {

    }
</style>
