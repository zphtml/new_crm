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
                        label="公司名称">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.advertiser}}
                            </span>
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
                        label="消耗">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.cost | currency('')}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="增幅%">
                    <template slot-scope="scope">
                            <span>
                                {{scope.row.zuoriRate}}
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                        sortable='custom'
                        label="增幅绝对值">
                    <template slot-scope="scope">
                          <span>
                                    {{ Number(scope.row.zuoriValue )| currency('')}}
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
    import { account_cost_zf_ad_choosable ,account_last_date} from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                loading:false,
                customer_type:'',
                fistConsumeDate:[],
               lastConsumeDate:[],
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
                account_cost_zf_ad_choosable:function(type){
                    account_cost_zf_ad_choosable({
                        start_date1: this.fistConsumeDate[0],
                        end_date1:this.fistConsumeDate[1],
                        start_date2: this.lastConsumeDate[0],
                        end_date2:this.lastConsumeDate[1],
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
                        this.fistConsumeDate =[ moment(response.date).subtract(7, 'days').format('YYYY-MM-DD'),response.date];
                        this.lastConsumeDate = [moment(response.date).subtract(15, 'days').format('YYYY-MM-DD'),moment(response.date).subtract(8, 'days').format('YYYY-MM-DD')]
                        this.$emit('getDate', {fistTime:this.fistConsumeDate,lastTime: this.lastConsumeDate});
                        this.account_cost_zf_ad_choosable();


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
            companyclick(val1,line){
                this.loading = true;
                this.customer_type = val1;
                this.linevalue = line;
                this.account_last_date();
            },
            //选择日期
            dateCahneg(val,val1,line){
                this.linevalue = line;
                this.customer_type = val1;
                 this.fistConsumeDate = val.fist;
                 this.lastConsumeDate = val.last;
                this.loading = true;
                this.account_cost_zf_ad_choosable();
            },
            //排序
            table_sort(val){
                let dataNamw = '';
                if(val.column != null)
                    switch(val.column.label){
                        case '消耗':
                            dataNamw = 'cost';
                            break;
                        case '增幅%':
                            dataNamw = 'zuoriRate';
                            break;
                        case '增幅绝对值':
                            dataNamw = 'zuoriValue';
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
                this.tableList.map(item=>{item.customer_name =item.customer_type == 1?'直客':'渠道' })
                let cost = moment(this.fistConsumeDate[0]).format('YYYY-MM-DD')+'至'+moment(this.fistConsumeDate[1]).format('YYYY-MM-DD')+'现金';
                let cost_bi = moment(this.fistConsumeDate[0]).format('YYYY-MM-DD')+'至'+moment(this.fistConsumeDate[1]).format('YYYY-MM-DD')+'账户币';
                let zuori = moment(this.lastConsumeDate[0]).format('YYYY-MM-DD')+'至'+moment(this.lastConsumeDate[1]).format('YYYY-MM-DD')+'现金';
                let zuori_bi =moment(this.lastConsumeDate[0]).format('YYYY-MM-DD') +'至'+ moment(this.lastConsumeDate[1]).format('YYYY-MM-DD') +'账户币';



                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['公司名称','客户类型',cost,cost_bi,zuori,zuori_bi,'增幅%','增幅绝对值','销售'];
                    const filterVal = ['advertiser','customer_name','cost','cost_bi','zuori','zuori_bi','zuoriRate',  'zuoriValue','name'];
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

