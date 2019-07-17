<template>
    <el-row class="consumeList" >
        <div :span="24">
            <el-table
                    ref='table1'
                    v-loading="loading"
                    class="vue-table"
                    :data="consumeTable"
                    @sort-change="table_sort"
                    height="720"
                    border>
                <el-table-column
                        width="100px"
                        label="账户名称 ">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.account_name}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="公司名称 ">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.advertiser}}
                            </span>
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
                                    {{ Number(scope.row.qiriRate)| currency('')}}%
                            </span>

                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="环比近七日增幅绝对值">
                    <template slot-scope="scope">
                          <span>
                                {{ Number(scope.row.qiriValue)| currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="销售 ">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.name}}
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
    import { account_cost_zf,account_last_date } from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                loading:false,
                allcost:[],
                consumeDate:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//不算今天往后禁止
                    },
                },
                tableList:[],
                old_tableList:[],
                //产品线
                linevalue:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                tableLength:0,
                account_cost_zf:function(type){
                    account_cost_zf({
                        date:this.consumeDate,
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
                        this.account_cost_zf()
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
            }
        },
        // created:function(){
        //  `
        // },
        methods: {
            accountClick(val,line){
                this.loading = true;
                this.linevalue = line;
                this.account_last_date()

            },
            //选择日期
            dateCahneg(val,line){
                this.linevalue = line;
                this.consumeDate = moment(val).format('YYYY-MM-DD'),
                this.loading = true;
                this.account_cost_zf();

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
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['账户名称','公司名称','当日消耗','环比前日增幅%','环比前日增幅绝对值','近七日平均消耗','环比近七日增幅%','环比近七日增幅绝对值','销售'];
                    const filterVal = ['account_name','advertiser','cost',  'zuoriRate', 'zuoriValue','avg','qiriRate','qiriValue','name'];
                    const list = this.tableList;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '账户消耗涨跌列表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

        },



    }
</script>
<style rel="stylesheet/scss"  lang="scss">
</style>

