<template>
    <el-row class="consumeList" >
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="公司消耗" name="first" ></el-tab-pane>
            <el-tab-pane label="账户消耗" name="last"> </el-tab-pane>
            <div style="margin-bottom: 10px">
                <el-date-picker
                        v-model="fistConsumeDate"
                        type="daterange"
                        size="mini"
                        style="width: 200px;"
                        :clearable="false"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                </el-date-picker>
                <span style="margin: 0 10px;font-size: 12px">
                    增幅对比日期:
                </span>
                <el-date-picker
                        v-model="lsatDate"
                        class="lastDateClass"
                        type="date"
                        size="mini"
                        style="width: 130px;"
                        :clearable="false"
                        @change="getLsatdate"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                </el-date-picker>
                <span>
                    -
                </span>
                <el-date-picker
                        v-model="lsatNextDate"
                        class="lastDateNextClass"
                        type="date"
                        size="mini"
                        disabled
                        style="width: 130px;"
                        :clearable="false"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                </el-date-picker>
                <span v-if="activeName == 'first'">
                         <span style="font-size: 12px;margin:0 5px">
                    用户:
                </span>
                <el-select   style="width: 130px;" v-model="customer_type" size="mini" placeholder="请选择" >
                    <el-option
                            v-for="(item,index) in userOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </span>

                <el-select v-model="linevalue" style="width:160px;" size="mini" placeholder="产品线" >
                    <el-option-group
                            v-for="(item,key) in lineoptions"
                            :key="item.name"
                            :label="item.name">
                        <el-option
                                v-for="(item,index) in item.zi"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-option-group>
                </el-select>

                <el-button type="primary" size="mini"  @click="search_list">查看</el-button>

            </div>
            <div style="height: 30px;width: 100%;">
                <el-button type="primary" size="mini" style="float: right" @click="export2Excel">导出Excel</el-button>
            </div>
            <statistics ref="statistics"></statistics>

            <company v-show="activeName == 'first'" @getDate="getDate" ref="companyListData"></company>
            <account  v-show="activeName == 'last'"  ref="accountListData"  @getDate="getDate"> </account>
        </el-tabs>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { meijie_prlin_list } from '@/api/meiti';
    import { account_cost_zf_all_choosable } from '@/api/meiti';
    import company from './company/company';
    import  account from './account/account';
    import statistics from './statistics/statistics';
    import moment from "moment"
    export default {
        data() {
            return {
                fistConsumeDate:[],
                lastConsumeDate:[],
                lsatDate:'',
                lsatNextDate:'',
                customer_type:'',
                userOptions:[{
                    id:'',
                    name:'全部',
                },{
                    id:1,
                    name:'直客',
                },{
                    id:2,
                    name:'渠道',
                }],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//不算今天往后禁止
                    },
                },
                activeName:'first',
                //产品线
                linevalue:'',
                lineoptions:[],
                search:{},
                meijie_prlin_list:function(page,num,val){
                    meijie_prlin_list({
                        page:1,
                        num:1,
                        search:this.search
                    }).then(response => {
                        response.unshift({
                            name:'全部产品线',
                            zi:[{
                                id:'',
                                name:'全部产品线',
                            }]
                        });
                        this.lineoptions = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //统计
                account_cost_zf_all_choosable:function(){
                    account_cost_zf_all_choosable({
                        start_date1: this.fistConsumeDate[0],
                        end_date1:this.fistConsumeDate[1],
                        start_date2: this.lastConsumeDate[0],
                        end_date2:this.lastConsumeDate[1],
                        customer_type:this.customer_type,
                        pr_lin:this.linevalue
                    }).then(response => {
                        if(response.code == '200'){
                            this.$refs.statistics.statisticsList( response.data);
                        }
                    }).catch(err => {
                        this.loading = false;
                        this.$message.error(err);
                    });
                },
            }
        },
        components: {
            company,
            account,
            statistics
        },
        computed: {
            ...mapGetters([
                'curaccount',
                'user',
                'roles',
                'allSem',
                'semNameId'
            ]),
        },
        mounted(){
            this.activeName = 'first';
            this.meijie_prlin_list()
        },
        methods: {

            handleClick(){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.companyclick( this.customer_type,this.linevalue);
                }else{
                    this.$refs.accountListData.accountClick(this.fistConsumeDate,this.linevalue);
                }
            },
            //获取日期
            getDate(val){
                this.fistConsumeDate = val.fistTime;
                this.lastConsumeDate = val.lastTime;
                this.lsatDate = val.lastTime[0];
                this.lsatNextDate = val.lastTime[1];
                this.account_cost_zf_all_choosable(this.fistConsumeDate, this.lastConsumeDate);

            },
            getLsatdate(){
                let num = moment(this.fistConsumeDate[1]).diff(moment(this.fistConsumeDate[0]), 'days');
                this.lsatNextDate =moment(this.lsatDate).add(num, 'days').format('YYYY-MM-DD');
                this.lastConsumeDate = [moment(this.lsatDate).format('YYYY-MM-DD'),moment(this.lsatDate).add(num, 'days').format('YYYY-MM-DD')]
            },
            //日期选择
            search_list(){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.dateCahneg({
                        fist:this.fistConsumeDate,
                        last:this.lastConsumeDate
                    },this.customer_type,this.linevalue);

                }else{
                    this.$refs.accountListData.dateCahneg({
                        fist:this.fistConsumeDate,
                        last:this.lastConsumeDate
                    },this.customer_type,this.linevalue);
                }

                this.account_cost_zf_all_choosable(this.fistConsumeDate, this.lastConsumeDate);
            },
            //导出
            export2Excel(){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.getExcel();

                }else{
                    this.$refs.accountListData.getExcel();
                }

            },
        }

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    .consumeList {

    }

</style>

