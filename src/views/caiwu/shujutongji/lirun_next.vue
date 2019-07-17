<template>
    <div class=" piamingInfor " >
        <el-row class="caiwu_line">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="back_xf">客户利润排名</span>><span>详情</span>
            </p>
        </el-row>
        <el-col :span="24"     v-loading="loading">
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
                            size="mini"
                            style="width: 180px;"
                            align="right"
                            type="year"
                            @change="yearChange"
                            :clearable="false"
                            placeholder="选择年">
                    </el-date-picker>
                    <el-select size="mini" v-model="gs_value" filterable placeholder="请选择" @change="ccompine($event)" class="select_gs">
                        <el-option
                                v-for="(item,index) in gs_options"
                                :key="item.id"
                                :label="item.advertiser"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select size="mini" v-model="line_value" filterable placeholder="请选择" @change="lineChange($event)" class="select_gs">
                        <el-option
                                v-for="(item,index) in line_options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
                                        {{ scope.row.date | FunTime}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="消费">
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

    import { customers,profitsTrend ,profitsTrueTrend,market_renew_money_zhexian_xf,customer_prlin} from '@/api/customer1';
    import moment from "moment"
    let week = '';
    let month = '';
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
                gs_value:'',
                line_value:"",
                gs_options:[],
                line_options:[],
                monthData:{},
                huID:'',
                plineId:'',
                TableData:[],
                customers:function(){
                    customers().then(response => {
                        this.loading = false;
                        this.gs_options=response.data;
                    }).catch(error => {
                        this.$message.error("error");
                    });
                },
                customer_prlin:function(){
                    customer_prlin({
                        id:this.huID,
                    }).then(response => {
                        this.loading = false;
                        this.line_options=response.data;
                        this.plineId = response.data[0].id;
                        this.line_value = response.data[0].name;
                        this.market_renew_money_zhexian_xf();
                    })
                },
                market_renew_money_zhexian_xf(){
                    if(this.border_bottom_1){
                        market_renew_money_zhexian_xf({
                            id:this.huID,
                            date:moment(this.yearData).format("YYYY"),
                            data:'',
                            prlin:'&prlin='+this.plineId,
                        }).then(response => {
                            this.loading = false;
                            this.TableData = response;
                            let MonthLine = [];
                            let MonthLine1 = [];
                            for(var n = 0;n<response.length;n++) {
                                MonthLine.push(response[n].lirun.toFixed(2));
                                MonthLine1.push(response[n].money.toFixed(2));
                                response[n].lirun= response[n].lirun==null ? 0 : response[n].lirun;
                                response[n].money= response[n].money==null ? 0 : response[n].money;
                                this.consumption+=Number(response[n].lirun);
                            }
                            this.consumption = this.consumption.toFixed(2);
                            this.monthData = {
                                monthData :MonthLine,
                                monthData1:MonthLine1,
                                name:'line1',
                            };
                        })
                    }else{
                        market_renew_money_zhexian_xf({
                            id:this.huID,
                            date:moment(this.yearData).format("YYYY"),
                            data:'&yihuikuan=1',
                            prlin:'&prlin='+this.plineId,
                        }).then(response => {
                            this.loading = false;
                            this.TableData = response;
                            let hk_MonthLine = [];
                            let hk_MonthLine1 = [];
                            for(var n = 0;n<response.length;n++) {
                                hk_MonthLine.push(response[n].lirun.toFixed(2));
                                hk_MonthLine1.push(response[n].money);
                                response[n].lirun= response[n].lirun==null ? 0 : response[n].lirun;
                                response[n].money= response[n].money==null ? 0 : response[n].money;
                                this.consumption+=Number(response[n].lirun);
                            }
                            this.monthData = {
                                monthData :hk_MonthLine,
                                monthData1:hk_MonthLine1,
                                name:'line2',
                            };
                        })
                    }

                },
            }
        },
        components: { lineMarker1,lineMarker2 },
        mounted() {
            this.gs_value = this.$route.query.name;
            this.huID = this.$route.query.id;

            this.customers();
            this.customer_prlin();
        },
        methods: {
            back_xf(){
                this.$router.go(-1)
            },
            yearChange(){
                this.market_renew_money_zhexian_xf();
            },
            handleClick(val){
                this.monthData = {
                    monthData :'',
                    monthData1:'',
                    name:'',
                };
                this.market_renew_money_zhexian_xf();
            },
            ccompine(val){
                this.huID = val;
                this.plineId = '';
                this.line_value = '';
                this.customer_prlin();
            },
            lineChange(val){
                this.plineId = val;
                this.market_renew_money_zhexian_xf();
            },
            radioData_a(val){
                this.loading = true;
                if(val !=true){
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
                    this.market_renew_money_zhexian_xf();
                }
            },
            radioData_b(val){
                this.loading = true;
                if(val !=true){
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
                    this.market_renew_money_zhexian_xf();
                }
            },
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
        .el-tabs__item {
            width:100px;
            text-align: center;
        }
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
