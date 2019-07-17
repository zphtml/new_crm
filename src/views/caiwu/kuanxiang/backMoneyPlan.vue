<template>
    <el-row style="" class="backmoney_plan">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" >
                   回款计划
               </span>
        </p>
        <div>
            <div style="margin-top: 20px">
                <calendar  ></calendar>
            </div>

        </div>
    </el-row>
</template>

<script>
    import calendar from './calendar/calendar';
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
                            this.prictical = val.data.huikuan;
                            this.percentage =Number( ( this.prictical /this.plan_money).toFixed(3));

                    }). catch(err => {this.$message.error('获取失败');});
                },
            }
        },
        components: {
            calendar
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
    .crm_title {
    }
</style>
