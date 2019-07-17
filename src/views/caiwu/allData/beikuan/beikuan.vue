<template>
    <div >
        <el-col :span="24" class="screen" style="margin:5px 0">
            <div class="searchInput">
                <input type="text" class="search" placeholder="请输入关键字" v-model='inputText' >
                <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                    <use xlink:href="#icon-11"></use>
                </svg>
            </div>
            <div class="dataInput" >
                <el-date-picker
                        v-model="dataInput"
                        type="daterange"
                        @change="changedate"
                        :picker-options="pickerOptions"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
            <div class="distributionButton">
                <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
            </div>
        </el-col>
        <el-col :span="24" class="beikuan_accounts_table">
            <div>
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="beikuan_data_table"
                        class="vue-table"
                        height="700"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        style="width: 100%">
                    <el-table-column
                            width="200"
                            height="10px"
                            label="备款账户">
                        <template slot-scope="scope">
                            {{scope.row.a_users}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="广告主">
                        <template slot-scope="scope">
                            {{scope.row.advertiser}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            :label="'代理'+ this.$t('titles.fandian')">
                        <template slot-scope="scope">
                            {{scope.row.dl_fandian| currency('')}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            :label="'媒介'+this.$t('titles.fandian')">
                        <template slot-scope="scope">
                            {{scope.row.rebates_proportion | currency('')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="转入金额">
                        <template slot-scope="scope">
                            {{scope.row.in_money }}
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            label="转出金额">
                        <template slot-scope="scope">

                            <span v-if="scope.row.out_money ">
                                {{scope.row.out_money | currency('')}}
                            </span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            label="余额">
                        <template slot-scope="scope">
                            {{scope.row.yu_e  | currency('')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="账户币">
                        <template slot-scope="scope">
                          {{ (Number(scope.row.yu_e)*(100+(Number(scope.row.rebates_proportion)))/(100-(Number(scope.row.dl_fandian))))  | currency('')}}
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="pageIndex"
                            :page-sizes="[ 20, 30,40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="kehuTableLength"
                            style='text-align: right;'>
                    </el-pagination>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { beikuan_accounts } from '@/api/money';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
//
                dataInfor: {
                    search: {},
                },
                inputText: '',
                dataInput: [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
                start_date: moment().format('YYYY-MM-DD'),
                end_date: moment().format('YYYY-MM-DD'),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                screen: [],
                //------------------------
                backMoney: '',
                huikuanAll: '',
                shifu_sum: '',
                tcqlr_sum: '',
                addFormVisible: false,
                fandianInput: '',
                fandian: '',
                accountId: '',
                listLoading: true,
                beikuan_accounts_table:[],
                beikuan_accounts: function () {
                    this.listLoading = true;
                    beikuan_accounts({
                        start_date: this.start_date,
                        end_date: this.end_date,
                    }).then(response => {
                        this.beikuan_accounts_table = response.data;
                        this.kehuTableLength = response.data.length;
                        this.listLoading = false;
                    }).catch(err => {
                        this.$message.error('获取失败');
                    });
                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:0,
            }
        },
        components: {
            state
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            beikuanList(){
                this.beikuan_accounts();
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.beikuan_accounts();
            },
// 搜索日期
            changedate(){
                let start_date = '';
                let end_date = '';
                if(this.dataInput){

                    start_date = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    end_date = moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    start_date = '';
                    end_date = '';
                }
                this.start_date = start_date;
                this.end_date = end_date;
                this.beikuan_accounts();
                this.searchDataFun();
            },
            outExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['备款账户','广告主','代理'+this.$t('titles.fandian'),'媒介'+this.$t('titles.fandian'),
                        '转入金额','转出金额','账户币','付款类型','时间'
                    ];
                    const filterVal = ['a_users','a_users','dl_fandian', 'rebates_proportion',
                        'in_money','out_money'];
                    const list = this.beikuan_table;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '充值列表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if(j == 'last_time'){
                        v[j] = moment( v[j]).format('YYYY-MM-DD')
                    }
                    return v[j]
                }))
            },
            tanFandian(val){
                this.accountId = val.id;
                this.addFormVisible = true;
                this.fandianInput =  val.gr_fandian;
            },
            pullzhuanchu(){
                this.suss();

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
//清除
            searchClear(){
                this.inputText = '';
                this.dataInput =[];
                this.date_type = 1;
                this.beikuan_accounts( );
            },
        },

        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list'
            ]),
            beikuan_data_table(){
                let beikuan_table = [];
                let _this = this;
                beikuan_table = this.beikuan_accounts_table.filter(function(item){
                    if(item.a_users.indexOf(_this.inputText)>=0 ||item.advertiser.indexOf(_this.inputText)>=0  ){
                        return item
                    }
                })
                this.kehuTableLength =  beikuan_table.length;
                return  beikuan_table.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        filters:{
            ctimeData(val){
                return   moment(val).format('YYYY-MM-DD')
            },
            fileFun(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileF(val){
                if(val){
                    return val
                }else{
                    return '---'
                }
            },
            fileData(val){
                if(val){
                    if(val.name){
                        return val.name
                    }else{
                        return '---'
                    }

                }else{
                    return '---'
                }
            },
        },
    }
</script>

