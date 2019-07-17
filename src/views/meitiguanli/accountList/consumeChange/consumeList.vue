<template>
    <el-row class="consumeList" >
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="公司消耗" name="first" ></el-tab-pane>
            <el-tab-pane label="账户消耗" name="last"> </el-tab-pane>
            <div >
                <el-date-picker
                        v-model="consumeDate"
                        type="date"
                        size="mini"
                        style="width: 180px;"
                        :clearable="false"
                        @change="dateCahneg"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                </el-date-picker>
                <span v-if="activeName == 'first'">
                         <span style="font-size: 13px;margin:0 10px">
                    用户:
                </span>
                <el-select v-model="customer_type" size="mini" placeholder="请选择" @change="userChange">
                    <el-option
                            v-for="(item,index) in userOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                </span>
                <span  >
                         <span style="font-size: 13px;margin:0 10px">
                    产品线:
                </span>
                       <el-select v-model="linevalue" style="width:160px;" size="mini" placeholder="产品线" @change="dateCahneg" >
                    <el-option-group
                            v-for="(item,key) in selectLineData"
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
                </span>



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
    import { get_account_cost_zf } from '@/api/account';
    import company from './company/company';
    import  account from './account/account';
    import statistics from './statistics/statistics';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {
        data() {
            return {
                consumeDate:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//不算今天往后禁止
                    },
                },
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
                //产品线
                linevalue:"",
                selectLineData:[],
                search:{},
                activeName:'first',
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
            // 产品线
            criteria.productline().then(response => {
                this.selectLineData = response;
            });
        },
        methods: {
            handleClick(){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.companyclick( this.consumeDate,this.linevalue);
                }else{
                    this.$refs.accountListData.accountClick(this.consumeDate,this.linevalue);
                }
            },
            //获取日期
            getDate(val){
                this.consumeDate = val;
                this.$refs.statistics.statisticsList( this.consumeDate,this.linevalue);
            },
            //日期选择 产品线
            dateCahneg(){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.dateCahneg(this.consumeDate,this.customer_type,this.linevalue);

                }else{
                    this.$refs.accountListData.dateCahneg(this.consumeDate,this.linevalue);
                }
                this.$refs.statistics.statisticsList(  moment(this.consumeDate).format('YYYY-MM-DD'),this.linevalue);
            },
 //用户设置
            userChange(val){
                if(this.activeName == 'first'){
                    this.$refs.companyListData.dateCahneg(this.consumeDate,this.customer_type,this.linevalue);
                    this.$refs.statistics.statisticsList(  moment(this.consumeDate).format('YYYY-MM-DD'),this.linevalue,this.customer_type);
                }
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
</style>

