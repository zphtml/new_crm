<template>
    <el-row class="consumeList" >
        <el-row class="consumeList" >
            <el-col :span="24" style="font-size: 14px;margin: 10px 0">

                <el-col :spna="24" v-for="(data,index) in allcost" :key="index">
                     <span style="font-weight: bold">
                            统计:
                      </span>
                        <span style="margin:0 20px;">
                        <span style="font-weight: bold">
                             总增幅%:
                        </span>
                            {{data.zuoriRate| currency('')}} %
                   </span>
                    <span>
                            <span style="font-weight: bold">
                             总增幅绝对值: :
                        </span>
                     {{data.zuoriValue | currency('')}}
                    </span>

                </el-col>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
    import {xiaohaotj} from '@/api/money';
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
        },
        methods: {
            statisticsList(val){
                this.allcost =[val];
                // this.start = moment(val).subtract(14, 'days').format('YYYY-MM-DD');
                // this.end = val;
                // xiaohaotj({start:this.start,end:this.end}).then(resp => this.dailyCost = resp);
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

