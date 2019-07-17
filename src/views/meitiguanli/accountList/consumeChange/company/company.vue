<template>
    <el-row class="consumeList" >
        <div>
            <el-table
                    ref='table1'
                    v-loading="loading"
                    class="vue-table"
                    :data="consumeTable"
                    @sort-change="table_sort"
                    height="720"
                    border>
                <el-table-column
                        width="140px"
                        label="公司名称">
                    <template slot-scope="scope">
                            <div>
                                {{scope.row.advertiser}}
                            </div>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"

                        width="140px"
                        label="客户类型">
                    <template slot-scope="scope">
                        <div style="text-align: center">
                                   <span v-if="scope.row.customer_type == 1">
                               直客
                            </span>
                            <span v-if="scope.row.customer_type == 2">
                               渠道
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="当日消耗">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.cost| currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="环比前日增幅%">
                    <template slot-scope="scope">
                          <span>
                                {{ Number(scope.row.zuoriRate) | currency('')}}%
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="环比前日增幅绝对值">
                    <template slot-scope="scope">
                          <span>
                                    {{ Number(scope.row.zuoriValue )| currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="近七日平均消耗">
                    <template slot-scope="scope">
                          <span>
                                {{scope.row.avg | currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="环比近七日增幅%">
                    <template slot-scope="scope">
                                <span >
                                    {{ Number(scope.row.qiriRate) | currency('')}}%
                            </span>

                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="环比近七日增幅绝对值">
                    <template slot-scope="scope">
                          <span>
                                {{ Number(scope.row.qiriValue) | currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="销售">
                    <template slot-scope="scope">
                          <span>
                                {{ scope.row.name}}
                            </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="pageIndex"
                        :page-sizes="[20, 50,100,300]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableLength"
                        style='text-align: right;'>
                </el-pagination>
            </div>
        </div>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex';
    const lodash = require('lodash');
    import { account_cost_zf_ad ,account_last_date} from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                loading:false,
                consumeDate:'',
                tableList:[],
                old_tableList:[],
                customer_type:'',
                //产品线
                linevalue:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                tableLength:0,

                account_cost_zf_ad:function(type){
                    account_cost_zf_ad({
                        date:this.consumeDate,
                        customer_type:this.customer_type,
                        pr_lin:this.linevalue
                    }).then(response => {

                        this.loading = false;
                        this.tableList = response.data;
                        this.old_tableList = response.data;
                    }).catch(err => {
                        this.loading = false;
                        this.$message.error(err);
                    });
                },
                account_last_date(){
                    account_last_date({
                    }).then(response => {
                        this.consumeDate = response.date;
                        this.$emit('getDate', this.consumeDate);
                        this.account_cost_zf_ad();

                    }).catch(err => {
                        this.loading = false;
                        this.$message.error(err);
                    });
                },
            }
        },
        components: {
        },
        computed: {
            ...mapGetters([
                'curaccount',
                'user',
                'roles',
                'allSem',
                'semNameId'
            ]),
            consumeTable(){
                let tableList = this.tableList;
                this.tableLength =  tableList.length;
                return  tableList.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        methods: {
            companyclick(val,line){
                this.loading = true;
                this.linevalue = line;
                this.account_last_date();
            },
            //选择日期//切换客户类型
            dateCahneg(val,val1,line){
                this.linevalue = line;
                this.customer_type = val1;
                this.consumeDate = moment(val).format('YYYY-MM-DD');
                this.loading = true;
                this.account_cost_zf_ad();
            },
            //排序
            table_sort(val){
                let dataNamw = '';
                if(val.column != null)
                    switch(val.column.label){
                        case '环比前日增幅%':
                            dataNamw = 'zuoriRate';
                            break;
                        case '环比前日增幅绝对值':
                            dataNamw = 'zuoriValue';
                            break;
                        case '近七日平均消耗':
                            dataNamw = 'avg';
                            break;
                        case '环比近七日增幅%':
                            dataNamw = 'qiriRate';
                            break;
                        case '环比近七日增幅绝对值':
                            dataNamw = 'qiriValue';
                            break;
                        case '当日消耗':
                            dataNamw = 'cost';
                            break;
                    }
                    this.pageIndex = 1;
                if(val.column == null){
                    this.tableList = this.old_tableList;
                }else if(val.column.order == 'descending'){ //向下
                    this.tableList = lodash.orderBy(this.old_tableList, [dataNamw],['asc']);
                }else if(val.column.order == 'ascending'){ //向上排序
                    this.tableList = lodash.orderBy(this.old_tableList, [dataNamw],['desc']);
                }
            },
            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex = val;
            },
 //导出
            getExcel() {
                require.ensure([], () => {
                    this.tableList.map(item=>{item.customer_name =item.customer_type == 1?'直客':'渠道' })
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['公司名称','客户类型','当日消耗','环比前日增幅%','环比前日增幅绝对值','近七日平均消耗','环比近七日增幅%','环比近七日增幅绝对值','销售'];
                    const filterVal = ['advertiser','customer_name','cost',  'zuoriRate', 'zuoriValue','avg','qiriRate','qiriValue','name'];
                    const list = this.tableList;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '公司消耗涨跌列表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

        },
        mounted(){
            this.loading = true;
            this.account_last_date()
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
</style>

