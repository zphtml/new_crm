<template>
    <div class="compactList" >
        <el-row class="compactBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>未回款逾期</span>
            </p>
            <el-col :span="24" class="compactListTabs">
                <el-button type="success" size="small"  style="position: absolute;right: 0;top: 20px;z-index: 9999;"  plain   @click="outExcel">导出Excel</el-button>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsList" >
                    <el-tab-pane label="充值" name="first">
                        <el-col :span="24" class="compactFirtsTitle screen" style="margin: 5px 0">
                            <customerDiv :screen=screen  @search="search" @searchClear="searchClear"></customerDiv>
                        </el-col>
                        <el-col :span="24" class="compactFirtsTable">
                            <div >
                                <el-table
                                        highlight-current-row v-loading="listLoading"  border
                                        :data="compactListTable"
                                        class="vue-table"
                                        height="740"
                                        @row-click="clickTr($event)"
                                        style="width: 100%">
                                    <el-table-column
                                            width="200"
                                             :label="$t('titles.customer')">
                                        <template slot-scope="scope">
                                            {{scope.row.gongsi | fileFun}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="金额">
                                        <template slot-scope="scope">
                                            {{scope.row.money | currency('') }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            min-width="150"
                                            header-align="center"
                                            label="欠费">
                                        <template slot-scope="scope">
                                            <div style="text-align: center">
                                                {{ scope.row.xf_qiane | currency('') }}
                                            </div>

                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="充值时间">
                                        <template slot-scope="scope">
                                            <div>
                                                {{ scope.row.payment_time | ctimeData }}
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            prop="address"
                                            sortable

                                            label="逾期天数">
                                        <template slot-scope="scope">
                                            {{scope.row.rg | fileFun}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="销售">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.name | fileFun  }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="AE">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.ae | fileFun  }}</div>
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
                                            :total="hetongTableLength"
                                            style='text-align: right;'>
                                    </el-pagination>
                                </div>
                            </div>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="公司" name="second">
                        <el-col :span="24" class="compactFirtsTitle screen" style="margin: 5px 0">
                            <customerDiv :screen=screen  @search="search" @searchClear="searchClear"></customerDiv>

                        </el-col>
                        <el-col :span="24" class="compactFirtsTable">
                            <div >
                                <el-table
                                        highlight-current-row v-loading="listLoading"  border
                                        :data="compactListTable1"
                                        class="vue-table"
                                        height="740"
                                        @row-click="clickTr($event)"
                                        style="width: 100%">
                                    <el-table-column
                                            width="200"
                                             :label="$t('titles.customer')">
                                        <template slot-scope="scope">
                                            {{scope.row.gongsi | fileFun}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            min-width="150"
                                            header-align="center"
                                            label="欠费">
                                        <template slot-scope="scope">
                                            <div style="text-align: center">
                                                {{ scope.row.xf_qiane | currency('') }}
                                            </div>

                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="address"
                                            sortable

                                            label="最大逾期天数">
                                        <template slot-scope="scope">
                                            {{scope.row.maxrg | fileFun}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="address"
                                            sortable

                                            label="最小逾期天数">
                                        <template slot-scope="scope">
                                            {{scope.row.minrg | fileFun}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="销售">
                                    <template slot-scope="scope">
                                        <div>{{ scope.row.name | fileFun  }}</div>
                                    </template>
                                </el-table-column>
                                    <el-table-column
                                            label="AE">
                                        <template slot-scope="scope">
                                            <div>{{ scope.row.ae | fileFun  }}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!-- 分页 -->
                                <div class="block">
                                    <el-pagination
                                            @size-change="handleSizeChange_last"
                                            @current-change="handleCurrentChange_last"
                                            :current-page="pageIndex_last"
                                            :page-sizes="[ 20, 30,40]"
                                            :page-size="pageSize_last"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="hetongTableLength_last"
                                            style='text-align: right;'>
                                    </el-pagination>
                                </div>
                            </div>
                        </el-col>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { weihuikuanyuqi,weihuikuanyuqicu } from '@/api/money';
    import customerDiv from '@/components/search/weihuikuanyuqi';
    import stateDiv from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {

        data() {
            return {
                dataInfor : {
                    search:{
                        date: moment().format('YYYY-MM-DD'),
                    },
                },
                screen:'',
                stateData:'',
                dataName:'充值',
                //充值
                activeName: 'first',
                inputText:'',
                dataInput:[],
                startValueProperty:'合同属性',
                optionsProperty:[],
                startValueStart:'审核状态',
                optionsStart:[],
                startValueProduct:'产品线',
                optionsProduct:[],
                startValuePigeonhole:'是否归档',
                optionsPigeonhole:[],
                compactListTable:[],
                compactListTable1:[],
                audit_count:'',
                listLoading:true,
                //合同table

                contract_listPost:function(page,num,val){
                        this.listLoading = true;
                    if(this.dataName == '充值'){
                        weihuikuanyuqi({
                            page:page,
                            num:num,
                            search:val,
                        }).then(response => {
                            this.compactListTable = response.data;
                            let num = Number(response.totalCount);
                            this.hetongTableLength = num;
                            this.screen = response.sum_qiane;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }else{
                        weihuikuanyuqicu({
                            page:page,
                            num:num,
                            search:val,
                        }).then(response => {
                            this.compactListTable1 = response.data;
                            let num = Number(response.totalCount);
                            this.hetongTableLength_last = num;
                            this.listLoading = false;
                            this.screen = response.sum_qiane;
                        }). catch(err => {this.$message.error('获取失败');});
                    }

                },
                //导出
                tableData:[],
                contract_listPostExcel:function(dataName){
                    if(this.dataName == '充值'){
                        weihuikuanyuqi({
                            page: this.hetongTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.data.filter(function(item,i) {
                                item.payment_time = moment(new Date(parseInt(item.payment_time) * 1000)).format('YYYY-MM-DD');
                                item.rg = -Number(item.rg)
                                return item
                            })
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'), '金额','欠费','充值时间', '周期', '逾期天数','销售','AE'];
                                const filterVal = ['gongsi', 'money' ,'xf_qiane','payment_time','zhouqi', 'rg','name','ae'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '未回款逾期-充值');
                            })

                        }). catch(err => {this.$message.error('获取失败');});
                    }else{
                        weihuikuanyuqicu({
                            page: this.hetongTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {

                            this.tableData =  response.data.filter(function(item,i) {
                                item.maxrg = - Number(item.maxrg);
                                item.minrg = - Number(item.minrg);

                                return item
                            })

                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'), '欠费','最大逾期天数', '最小逾期天数','销售','AE'];
                                    const filterVal = ['gongsi', 'xf_qiane','minrg','maxrg','name','ae'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '未回款逾期-公司');
                            })


                        }). catch(err => {this.$message.error('获取失败');});
                    }

                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                hetongTableLength:12,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //公司
                dataInput_last:'',
                compactListTable_last:'',
                //分页
                page_last:'20',
                num_last:'1',
                pageIndex_last:1,
                pageSize_last:20,
                hetongTableLength_last:12,
            }
        },
        components: {
            stateDiv,
            customerDiv,

        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            let val= {
                search:{
                    date: moment().format('YYYY-MM-DD'),
                }
            };

            this.contract_listPost(this.page,this.num,val);

        },
        methods: {

            changedate(){},
            handleClick(tab, event) {
                this.dataName = tab.label;
                this.searchClear()
            },
            searchproperty(){

            },
            //导出
            outExcel(){
                this.contract_listPostExcel(this.dataName)
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //搜索
            search(val){
                this.dataInfor = val;

                this.contract_listPost(this.page,this.num,val);
            },
//清除
            searchClear(){
                 this.dataInfor= {
                    search:{
                        date: moment().format('YYYY-MM-DD'),
                    }
                };
                this.contract_listPost(this.page,this.num,this.dataInfor);
            },
            //tr跳转
            clickTr(val){
//                this.$router.push({ name: 'viewncontract' , query: { id: val.id}});
            },
            addHetong(val){
                this.$router.push({ name: 'newContrac' , query: { id: val.id}});
            },
            //充值分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.contract_listPost(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;

                this.contract_listPost(this.page,this.num,this.dataInfor);
            },
            //公司分页
            handleSizeChange_last(val) {
                this.page_last = val;
                this.pageSize_last =val;

                this.contract_listPost(this.page_last,this.num_last,this.dataInfor);
            },
            handleCurrentChange_last(val) {
                this.num_last = val;
                this.contract_listPost(this.page,this.num_last,this.dataInfor);

            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
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
                    return val
                }else{
                    return '---'
                }
            },
            fileFun1(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            mhtFun(val){
                if(val){
                    if(val.title){
                        return val.title
                    }else{
                        return '--'
                    }
                }else{
                    return '--'
                }
            },
            nameFun(val){
                if(val){
                    if(val.business0){
                        return val.business0.name
                    }else{
                        return '--'
                    }
                    return val.business0.name
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

</style>
