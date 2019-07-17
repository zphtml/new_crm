<template>
    <div>
        <el-row>
            <el-col :span="24" class="date" style="width: 100%;height: 40px;text-align: right;position: relative">
                <el-date-picker
                        style="position: absolute;z-index: 1;right: 0;margin-bottom:10px;"
                        v-model="dateInfor"
                        @change="dateChange"
                        type="daterange"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" class="title">
                <el-card class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <span>日均消耗</span>
                    </div>
                    <div class="text item">
                        {{ dailyAvg.d_avg | currency('')}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="title" >
                <el-card class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <span>日最高消耗</span>
                    </div>
                    <div class="text item">
                        {{ dailyAvg.m_cost | currency('')}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="title">
                <el-card class="box-card" shadow="always">
                    <div slot="header" class="clearfix">
                        <span>有消耗账户数量</span>
                    </div>
                    <div class="text item">
                        {{accountNum}}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div style="margin-top: 30px;padding-bottom: 30px;height:350px;position: relative">
                    <line_caiwu  :screen_line="dailyCost"></line_caiwu>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="title">
                各消耗量级账户数量
                <bar-stack chartId="al-barstack"  :datas="accountLevels" nameProperty="name" valueProperty="num" x_valueProperty="date"></bar-stack>
            </el-col>
        </el-row>
        <el-row>
            大于5w消耗客户
            <el-col :span="24" class="title" >
                <bar-stack chartId="topcompany-barstack"  :datas="topCompany" nameProperty="advertiser" valueProperty="d_cost" x_valueProperty="date"></bar-stack>
            </el-col>
        </el-row>
        <el-row>
            大于5w消耗账户
            <el-col :span="24" class="title" >
                <bar-stack chartId="topAccounts-barstack"  :datas="topAccounts" nameProperty="account_name" valueProperty="cost" x_valueProperty="date"></bar-stack>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import moment from "moment"
    import {getXiaohaoAccountNum,getXiaohaoDailyAvg,getXiaohaoAccountPercent,getXiaohaoTopCompany,getXiaohaoTopAccount} from '@/api/meitiaccount';
    import {xiaohaotj} from '@/api/money';
    import line_caiwu from '@/components/Charts/line_caiwu';
    import barStack from './component/barStack'
    export default {
        components:{
          line_caiwu,
          barStack,
        },
        data() {
            return {
                start: moment().subtract(60, 'days').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
                dateInfor: [moment().subtract(60, 'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                dailyAvg: {d_avg:0,m_cost:0},
                accountNum: 0,
                dailyCost: [],
                accountLevels: [],
                topCompany: [],
                topAccounts:[],

            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
        },
        methods: {
            dateChange(index){
                this.start = moment(index[0]).format('YYYY-MM-DD');
                this.end = moment(index[1]).format('YYYY-MM-DD');
                this.getDatas();
            },
            getDatas(){
                getXiaohaoDailyAvg(this.start,this.end).then(resp => this.dailyAvg = resp);
                getXiaohaoAccountNum(this.start,this.end).then(resp => this.accountNum = resp.num);
                xiaohaotj({start:this.start,end:this.end}).then(resp => this.dailyCost = resp);
                getXiaohaoAccountPercent(this.start,this.end).then(resp => this.accountLevels = resp);
                getXiaohaoTopCompany(this.start,this.end).then(resp => this.topCompany = resp);
                getXiaohaoTopAccount(this.start,this.end).then(resp => this.topAccounts = resp);
            }
        },
        mounted() {
            this.getDatas();
        }
    }
</script>

