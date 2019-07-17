<template>
    <el-row class="consumeList" >
        <div class="statistics"  style="height: 300px;">
            <line_caiwu  :screen_line="dailyCost"></line_caiwu>
        </div>
    </el-row>
</template>
<script>

    import {xiaohaotj} from '@/api/money';
    import line_caiwu from '@/components/Charts/line_caiwu';
    import moment from "moment"
    export default {
        data() {
            return {
                start: '',
                end: '',
                dailyCost: [],
                allcost:[],
                accountLevels: [],
            }
        },
        components: {
            line_caiwu
        },
        methods: {
            statisticsList(val,line,customer_type){
                this.start = moment(val).subtract(14, 'days').format('YYYY-MM-DD');
                this.end = val;
                xiaohaotj({start:this.start,end:this.end,data:{pr_lin:line,customer_type:customer_type}}).then(resp => this.dailyCost = resp);
            }

        },


    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .consumeList {
        .statistics {
            font-size: 14px;
            margin-bottom: 10px;
            .title {
                font-weight: bold;
            }
        }

    }

</style>

