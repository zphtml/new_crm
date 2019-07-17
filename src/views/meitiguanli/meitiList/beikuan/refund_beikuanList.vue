<template>
    <div class="refund_beikuan_tuikuan" >
        <el-row >
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >备款账户退款列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dataInput">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="startInput">
                    <el-select v-model="shenhe" placeholder="请选择审核" @change="searchstart">
                        <el-option
                                v-for="(item, index) in shenheData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :other="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="refund_moneyTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="refund_moneyTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="账户">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    <div class="xfshow" v-if="scope.row.advertiser0.customer_type == 1"></div>
                                    {{scope.row.a_users}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="媒介合同">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.title}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.prlina}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="退款金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.money | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="退款币">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.show_money | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <state :stateData=scope.row ></state>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="创建时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="提交人">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.submitname }}
                                    </div>
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
    import { refund_money_list_beikuan } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{},
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                shenhe:'',
                shenheData:[],
//-------------------------------------------------------------
                screen:'',
                stateData:'',
                label:'',
                listLoading:true,
                refund_money_list_beikuan:function(page,num,val){
                    this.listLoading = true;
                    refund_money_list_beikuan({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor.search,
                    }).then(response => {
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.refund_moneyTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.listLoading = false;
                        this.pageSize =  this.search_list.meiti_beikuan_beikunpage?this.search_list.meiti_beikuan_beikunpage:20;
                        this.pageIndex = this.search_list.meiti_beikuan_beikunnum ?this.search_list.meiti_beikuan_beikunnum :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                    }). catch(err => {this.$message.error('获取失败');  this.listLoading = true;});
                },
                refund_money_list_beikuanExcel:function(page,num,val){
                    refund_money_list_beikuan({
                        page: this.kehuTableLength,
                        num:1,
                        search:this.dataInfor.search,
                    }).then(response => {

                        this.tableData =  response.data.filter(function(item,i) {
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.show_money = Number(item.show_money).toFixed(2);
                            item.money = Number(item.yu_e).toFixed(2);
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['账户', '媒介合同','产品线', '退款金额','退款账户币','创建日期','提交人'];
                            const filterVal = ['a_users', 'title', 'prlina','money','show_money','ctime','submitname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '备款账户退款列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },

                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                refund_moneyTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
            screenInput,
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.shenheData = criteria.shenheData;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'beikuan_account_tuikuan'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.meiti_beikuan_beikun_name;
            this.dataInfor.search['start_date'] = this.search_list.meiti_beikuan_beikunstart_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_beikuan_beikunend_date;
            this.dataInfor.search['shenhe'] = this.search_list.beikuan_beikuan_beikunend_shenhe;
            this.dataInput = [this.search_list.meiti_beikuan_beikunstart_date,this.search_list.meiti_beikuan_beikunend_date];
            this.shenhe = this.search_list.beikuan_beikuan_beikunend_shenhe;

            this.pageSize =  this.search_list.meiti_beikuan_beikunpage?this.search_list.meiti_beikuan_beikunpage:20;
            this.pageIndex = this.search_list.meiti_beikuan_beikunnum ?this.search_list.meiti_beikuan_beikunnum :1;
            this.kehuTableLength = this.search_list.meiti_beikuan_beikunLength ?this.search_list.meiti_beikuan_beikunLength :1;
            this.refund_money_list_beikuan(this.page,this.num);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_beikuan_beikun_name
                }
            ];
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_beikuan_beikun_name: this.dataInfor.search.Search_str,
                    meiti_beikuan_beikunstart_date: this.dataInfor.search.start_date,
                    meiti_beikuan_beikunend_date: this.dataInfor.search.end_date,
                    beikuan_beikuan_beikunend_shenhe: this.dataInfor.search.shenhe,
                    meiti_beikuan_beikunpage:this.pageSize,
                    meiti_beikuan_beikunnum:this.pageIndex,
                    meiti_beikuan_beikunLength: this.kehuTableLength
                });
            },
            //搜索内容
            search(val){
                this.dataInfor.search.Search_str = val;
                this.refund_money_list_beikuan(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.refund_money_list_beikuan(this.page,this.num);
                this.searchDataFun();
            },
            //查找日期
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
                this.dataInfor.search.start_date = start_date;
                this.dataInfor.search.end_date = end_date;
                this.refund_money_list_beikuan(this.page,this.num);
                this.searchDataFun()
            },
            //清除
            searchClear(){
                this.dataInfor = {
                    search:{},
                };
                this.screen = [
                    {
                        name:'搜索',
                        data:''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.shenhe = '';
                this.dataInput = [];
                this.refund_money_list_beikuan(this.page,this.num);
                this.searchData({
                    meiti_beikuan_beikun_name:'',
                    meiti_beikuan_beikunstart_date: '',
                    meiti_beikuan_beikunend_date: '',
                    beikuan_beikuan_beikunend_shenhe: '',
                });
            },
            //导出
            outExcel(){
                this.refund_money_list_beikuanExcel(this.page,this.num);
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.refund_money_list_beikuan(this.page,this.num);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.refund_money_list_beikuan(this.page,this.num);
                this.searchDataFun();
            },
        //跳转
            clickTr(val){
                this.$router.push({ name: 'refund_beikuanInfor',query: { id:val.id} });
            },
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
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileFun1(val){
                if(val){
                    return val
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
