<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >金额列表</span>
            </p>
            <el-col :span="24" class="screen">
                <div class="searchInput">
                    <input type="text" class="search" :placeholder="'请输入公司名/' + $t('titles.nick')" v-model='inputText'>
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
                <div class="dataInput">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>

                </div>

            </el-col>
            <el-col :span="24" class="xufeiTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="xufeiTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="账户名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.a_users }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="总消耗">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.cost| currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="总充值">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.xufei | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="总余额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.xufei- scope.row.cost  | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="开始时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.ctime | ctimeData}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="结束时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.endtime | ctimeData}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="查看详情">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <img src="../../../assets/xq.png" style="width:20px;height:20px" alt="">
                                </div>
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
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { acccount_money} from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                inputText:"",
                dataInfor : {
                    search:{},
                },
                dataInput:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                tableData:[],
                listLoading:true,
                screen:[],
                stateData:'',
                label:'',
                start:'2000-01-01',
                end:moment().format('YYYY-MM-DD'),
                acccount_money:function(){
                    acccount_money({
                        start:this.search_list.meiti_money_start_date,
                        end:this.search_list.meiti_money_end_date,
                        page:this.num,
                        data:this.dataInfor.search,
                    }).then(response => {
                        this.xufeiTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                acccount_moneyExcel:function(){

                    acccount_money({
                        start:this.start,
                        end:this.end,
                        page:1,
                        data:this.dataInfor.search,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            item['yu_e'] = item.xufei - item.cost;
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '账户名称','总消耗','总充值','总余额'];
                            const filterVal = ['advertiser', 'a_users', 'cost','xufei','yu_e'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '金额列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                xufeiTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
        },
        created(){
            let component = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    component.inputChange();
                }
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){

            this.dataInfor.search['searchstr'] = this.search_list.meiti_money_name;
            this.inputText =this.search_list.meiti_money_name;
            this.dataInput =this.search_list.meiti_money_start_date != '2000-01-01'? [this.search_list.meiti_money_start_date,this.search_list.meiti_money_end_date]:[];
            if(!this.search_list.meiti_money_start_date){
                this.searchData({
                    meiti_money_name: this.dataInfor.search.searchstr,
                    meiti_money_start_date:'2000-01-01',
                    meiti_money_end_date:moment().format('YYYY-MM-DD'),

                });
            }
            this.dataInfor.search['start_date'] = this.search_list.meiti_money_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_money_end_date;
            this.acccount_money();
        },
        methods: {
            ...mapActions([
                'searchData',
                'Account'
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_money_name: this.dataInfor.search.searchstr,
                    meiti_money_start_date: this.dataInfor.search.start_date,
                    meiti_money_end_date: this.dataInfor.search.end_date,

                });
            },
            //搜索
            inputChange(val){
                this.dataInfor.search.searchstr = this.inputText;
                this.acccount_money();
                this.searchDataFun()
            },
            changedate(){
                if(this.dataInput){
                    this.start = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    this.end = moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    this.start = '2000-01-01';
                    this.end = moment().format('YYYY-MM-DD');
                }
                this.dataInfor.search.start_date =  this.start;
                this.dataInfor.search.end_date =   this.end ;
                this.searchDataFun()
                this.acccount_money();
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{},
                };
                this.dataInput = [];
                this.inputText = '';
                this.searchData({
                    meiti_money_name:'',
                    meiti_money_start_date:'2000-01-01',
                    meiti_money_end_date:moment().format('YYYY-MM-DD'),
                });
                this.acccount_money();

            },
//导出
            outExcel(){
                this.acccount_moneyExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.acccount_money();
            },
            handleCurrentChange(val) {
                this.num = val;
                this.acccount_money();
            },

//点击tr
            clickTr(val){
                this.$router.push({ name: 'MoneyInfor', query: { id: val.id} });
                if(this.dataInput.length>0){
                    val.start = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    val.end =  moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    val.start= '2000-01-01';
                    val.end = moment().format('YYYY-MM-DD');
                }

                this.Account(val)
            },
        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                if( moment(time).format('YYYY-MM-DD') == "2099-09-09"){
                    return "未结束"
                }
                return   moment(time).format('YYYY-MM-DD')
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },
            fileFun(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/search.scss";
</style>
