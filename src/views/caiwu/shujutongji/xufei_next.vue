<template>
    <div class=" piamingInfor " >
        <el-row class="caiwu_line">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="back_xf">客户充值排名</span>><span>详情</span>
            </p>
        </el-row>
        <el-col :span="24"   v-loading="loading">
            <el-col :span="24" class="title">
                <div class="radio">
                    <span class="f_1" :class="{border_bottom:border_bottom_1}" @click="radioData_a(border_bottom_1)">实际</span>
                    <span class="f_2" :class="{border_bottom:border_bottom_2}" @click="radioData_b(border_bottom_2)">已回款</span>
                </div>
        </el-col>
            <el-col :span="24" class="shiji">
                <el-col :span="24" class="top_year">
                    <el-date-picker
                            v-model="yearData"
                            align="right"
                            type="year"
                            size="mini"
                            style="width: 180px;"
                            @change="yearChange"
                            :clearable="false"
                            placeholder="选择年">
                    </el-date-picker>
                    <el-select v-model="gs_value" filterable   size="mini" placeholder="请选择" @change="ccompine($event)" class="select_gs">
                        <el-option
                                v-for="(item,index) in gs_options"
                                :key="item.id"
                                :label="item.advertiser"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div class="allMoney" style="background: #fff0f7">
                        全年总充值：{{ lirun | currency('') }}
                    </div>
                    <div class="allMoney">
                        全年总利润：{{ consumption | currency('') }}
                    </div>

                </el-col>
                <el-col :span="24">
                    <lineMarker1 :monthData="monthData" style="width: 100%;height:300px;"></lineMarker1>
                </el-col>
                <el-col :span="24">
                    <div>
                        <el-table
                                highlight-current-row v-loading="listLoading"
                                :data="TableData"
                                class="vue-table"
                                height="550"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                @row-click="clickTr($event)"
                                style="width: 100%">
                            <el-table-column
                                    label="月份">
                                <template slot-scope="scope">
                                    <div>
                                        {{ scope.row.startTime | FunTime}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="充值">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{ scope.row.money | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="利润">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{ scope.row.lirun | currency('') }}
                                    </div>

                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-col>

        </el-col>
    </div>
</template>

<script>

    import lineMarker1 from './Charts/lineMarker1';
    import lineMarker2 from './Charts/lineMarker2';

    import { customers ,profitsTrueTrend,market_renew_money_zhexian_xf,backPayment} from '@/api/customer1';
    import moment from "moment"
    export default {
        data(){
            return {
                loading:false,
              activeName: 'first',
                yearData:moment().format("YYYY"),
                border_bottom_1:true,
                border_bottom_2:false,
                consumption:0,
                listLoading:false,
                num:0,
                lirun:0,
                gs_value:'',
                gs_options:[],
                monthData:{},
                huID:'',
                TableData:[],
                customers:function(){
                    customers().then(response => {
                        this.loading = false;
                        this.gs_options=response.data;
                    }).catch(error => {
                        this.$message.error("error");
                    });
                },
                actualRenewals(){
                    if(this.border_bottom_1){
                        market_renew_money_zhexian_xf({
                            id:this.huID,
                            date:moment(this.yearData).format("YYYY"),
                            data:'',
                            prlin:'',
                        }).then(response => {
                            this.loading = false;
                            this.TableData = response;
                            let MonthLine = [];
                            let MonthLine1 = [];
                            for(var n = 0;n<response.length;n++) {
                                MonthLine.push(response[n].money.toFixed(2));
                                MonthLine1.push(response[n].lirun.toFixed(2));
                                response[n].lirun= response[n].lirun==null ? 0 : response[n].lirun;
                                response[n].money= response[n].money==null ? 0 : response[n].money;
                                this.consumption+=Number(response[n].lirun);
                                this.lirun+=Number(response[n].money)
                            }
                            this.monthData = {
                                monthData :MonthLine1,
                                monthData1:MonthLine,
                                name:'line1',
                            };
                        })
                    }else{
                        market_renew_money_zhexian_xf({
                            id:this.huID,
                            data:'&yihuikuan=1',
                            date:moment(this.yearData).format("YYYY-01-01"),
                        }).then(response => {
                            this.loading = false;
                            this.TableData = response;
                            let hk_MonthLine = [];
                            let hk_MonthLine1 = [];
                            for(var n = 0;n<response.length;n++) {
                                hk_MonthLine.push(response[n].money.toFixed(2));
                                hk_MonthLine1.push(response[n].lirun.toFixed(2));
                                response[n].lirun= response[n].lirun==null ? 0 : response[n].lirun;
                                response[n].money= response[n].money==null ? 0 : response[n].money;
                                this.consumption+=Number(response[n].lirun);
                                this.lirun+=Number(response[n].money)
                            }
                            this.monthData = {
                                monthData :hk_MonthLine1,
                                monthData1:hk_MonthLine,
                                name:'line2',
                            };
                        })
                    }

                },
            }
        },
        components: { lineMarker1,lineMarker2 },
        mounted() {
            this.customers();
            this.gs_value = this.$route.query.name;
            this.huID = this.$route.query.id;
            this.actualRenewals();
        },
        methods: {
            back_xf(){
                this.$router.go(-1)
            },
            yearChange(){
                this.actualRenewals();
            },
            handleClick(val){
                this.monthData = {
                    monthData :'',
                    monthData1:'',
                    name:'',
                };
                this.actualRenewals();
            },
            ccompine(val){
                this.huID = val;
                this.actualRenewals();
            },
            radioData_a(val){
                this.loading = true;
                if(val != true){
                    this.border_bottom_1 = !this.border_bottom_1;
                    this.border_bottom_2 = !this.border_bottom_2;
                    this.consumption = 0;
                    this.lirun = 0;
                    this.TableData = [];
                    this.monthData = {
                        monthData :"",
                        monthData1:"",
                        name:'',
                    };
                    this.actualRenewals();
                }

            },
            radioData_b(val){
                this.loading = true;
                if(val != true){
                    this.border_bottom_1 = !this.border_bottom_1;
                    this.border_bottom_2 = !this.border_bottom_2;
                    this.consumption = 0;
                    this.lirun = 0;
                    this.TableData = [];
                    this.monthData = {
                        monthData :"",
                        monthData1:"",
                        name:'',
                    };
                    this.actualRenewals();
                }
            }
        },
        filters:{
            FunTime(val){
                return moment(val).format("MM")+"月";
            },
        }
    };
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/table.scss";
    .piamingInfor {
        .title {
            .radio{
                margin: 5px 0 10px 0;
                width:100%;
                border-bottom:1px solid #e4e7ed;
                .f_1,.f_2:hover{
                    color: #409eff;
                }
               .f_1,.f_2 {
                   display: inline-block;
                   padding: 10px 30px;
                   font-size: 14px;
                    cursor: pointer;
                   color: black;
               }
                .border_bottom {
                    color: #409eff;
                    border-bottom: 2px solid #409eff;
                }
            }
        }
        .shiji {
            .top_year{
                .allMoney {
                    height:30px;
                    line-height: 30px;
                    display: inline-block;
                    background: #e3f3ff;
                    color: #22adff;
                    font-size: 14px;
                    font-weight: bold;
                    padding:0 10px;
                    margin-left: 20px;
                }
            }
        }
    }

</style>
