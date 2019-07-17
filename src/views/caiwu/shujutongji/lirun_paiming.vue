<template>
    <div class="components-container_lirun" >
        <el-row class="caiwu_line">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>客户利润排名</span>
            </p>
        </el-row>
        <el-col :span="24" class="title">
            <div class="radio">
                <span class="f_1" :class="{border_bottom:border_bottom_1}" @click="radioData">实际</span>
                <span class="f_2" :class="{border_bottom:border_bottom_2}" @click="radioData">已回款</span>
            </div>
        </el-col>
        <el-col :span="24" class="top_year" style="margin-top: 10px">
            <el-date-picker
                    v-model="yearData"
                    align="right"
                    type="year"
                    size="mini"
                    style="width: 200px"
                    @change="yearChange"
                    :clearable="false"
                    placeholder="选择年">
            </el-date-picker>
            <div class="allMoney">
                全年总利润：{{ consumption | currency('') }}
            </div>
        </el-col>
        <el-col :span="24" class="echarts_line">
            <lineMarker v-loading="e_listLoading" :monthData="monthData" height='300px' width='100%'></lineMarker>
        </el-col>
        <el-col :span="24" class="echarts_line">
            <el-col :span="24" style="padding-left: 0;font-size: 14px">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                利润排名
            </el-col>
            <el-col :span="24" class="screen" style="margin-bottom: 10px">
                <div class="searchInput">
                    <input type="text" class="search" :placeholder="$t('titles.customer')" v-model='nameInput'>
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
                <div class="dataInput">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            :clearable = false
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-button style="margin-left: 20px" size="small" type="primary" @click="lookList">查看</el-button>
            </el-col>
            <el-col :span="24" class="table_kh" v-show="table_show">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"
                            :data="Tablefilter"
                            class="vue-table"
                            height="640"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                label="排名">
                            <template slot-scope="scope">
                                <div>
                                    <img src="http://test.myushan.com/ZPCRM1.png" v-if="scope.row.rank == 1" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                    <img src="http://test.myushan.com/ZPCRM2.png" v-if="scope.row.rank == 2" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                    <img src="http://test.myushan.com/ZPCRM3.png" v-if="scope.row.rank == 3" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                    <span style="margin-left: 10px" v-if="scope.row.rank > 3">{{ scope.row.rank  }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.advertiser }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="月利润">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.gs_lirun | currency('') }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageAccountIndex"
                                :page-sizes="[ 20, 30,40]"
                                :page-size="pageAccountSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="kehuTableAccountLength"
                                style='text-align: right;'>
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-col>
    </div>
</template>

<script>
    import lineMarker from './Charts/lineMarker';
    import { customer_profits_rank,lirun_money_zhexian} from '@/api/customer1';
    import moment from "moment"
    export default {
        data(){
            return {
                yearData:moment().format('YYYY'),
                border_bottom_1:true,
                border_bottom_2:false,
                nameInput:"",
                dataInput:[moment().format('YYYY-MM-01'),moment().format('YYYY-MM-DD')],
                TableData:[],
                monthData:[],
                consumption:'',
                listLoading:false,
                e_listLoading:false,
                thisLineName:'',
                thisName:'',
                table_show:false,
                //分页
                pageAccountIndex: 1,
                pageAccountSize:20,
                kehuTableAccountLength:'',
                lirun_money_zhexian:function(){
                    this.e_listLoading = true;
                    lirun_money_zhexian({
                        data:this.thisLineName,
                        date:moment(this.yearData).format('YYYY')
                    }).then(response => {
                        let MonthLine = [];
                        let num = 0;
                        for(var n = 0;n<response.length;n++) {
                            MonthLine.push(response[n].gs_lirun);
                            num+=Number(response[n].gs_lirun);
                        }
                        this.consumption = num;
                        this.monthData = MonthLine;
                        this.e_listLoading = false;
                    })
                },
                customer_profits_rank:function(){
                    this.listLoading = true;
                    customer_profits_rank({
                        date:moment(this.dataInput[0]).format('YYYY-MM-DD')+"/"+moment(this.dataInput[1]).format('YYYY-MM-DD')+"?",
                        name:'gs_lirun',
                        data:this.thisName,
                    }).then(response => {
                        this.listLoading = false;
                        this.TableData  = response;
                    })
                },
//==================================================================
            }
        },
        computed: {
            Tablefilter(){
                let tableData = [];
                let _this = this;
                tableData =_this.TableData.filter(function (item, i) {
                    if(item.advertiser.indexOf(_this.nameInput)>=0  ){
                        return item
                    }
                });
                this.kehuTableAccountLength = tableData.length;
                return tableData.filter((o,i) => i >=(this.pageAccountIndex-1)*this.pageAccountSize&&i<=this.pageAccountIndex*this.pageAccountSize-1);
            }
        },
        components: { lineMarker },

        mounted() {
            this.lirun_money_zhexian();
//=========================================
        },
        methods: {
            lookList(){
                this.customer_profits_rank();

                this.table_show = true;
            },
            radioData(){
                this.border_bottom_1 = !this.border_bottom_1;
                this.border_bottom_2 = !this.border_bottom_2;
                if(this.border_bottom_1){
                    this.thisName = "";
                    this.thisLineName = "";
                }else{
                    this.thisName = "&yihuikuan=1";
                    this.thisLineName = "?yihuikuan=1";
                }
                this.consumption = 0;
                this.TableData = [];
                this.monthData = 0;
                this.lirun_money_zhexian();
            },
            //分页
            handleSizeChange(val) {
                this.pageAccountSize = val;
            },
            handleCurrentChange(val) {
                this.pageAccountIndex = val;
            },
            clickTr(val){
                this.$router.push({ name: 'customerProfitNext', query: { id: val.cuid,name:val.advertiser}})
            },
            yearChange(){
                this.lirun_money_zhexian();
            },

        }
    };
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/search.scss";
    .components-container_lirun  {
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
        .table_kh {
            .vue-table {
                tbody tr:first-child{
                    td{
                        background-color: #fff6e9!important;
                        .cell{
                            background-color: #fff6e9!important;
                        }
                    }
                }
                tbody tr:nth-child(2){
                    td{
                        background-color: #f2f5fe!important;
                        .cell{
                            background-color: #f2f5fe!important;
                        }
                    }
                }
                tbody tr:nth-child(3){
                    td{
                        background-color: #edfbf9!important;
                        .cell{
                            background-color: #edfbf9!important;
                        }
                    }
                }
            }
        }
    }


</style>
