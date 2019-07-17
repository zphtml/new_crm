<template>
    <div class="log_list" >
        <el-row class="log_listBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >日志查看</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dataInput" >
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
            <el-col :span="24" class="log_listTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="log_listTable"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                label="提交人">
                            <template slot-scope="scope">
                                <div >
                                    {{scope.row.submitname}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="操作时间">
                            <template slot-scope="scope">
                                <div style="text-align: center;">
                                    {{scope.row.action_time |ctimeData}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                header-align="center"
                                label="操作对象">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.target_source }}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                width="230"
                                label="操作">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.action_name }}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="操作说明">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.note }}
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
    import { log_list } from '@/api/renshi';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';

    import moment from "moment"

    export default {
        data() {
            return {
                dataInfor:{
                    search:{
                    },
                },
                dataInput: [],
                screen:[],

                //---------------
                stateData:'',
                listLoading:true,
                log_list:function(page,num,val){
                    this.listLoading = true;
                    log_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.renshi_log_list_page?this.search_list.renshi_log_list_page:20;
                        this.pageIndex = this.search_list.renshi_log_list_num ?this.search_list.renshi_log_list_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.log_listTable = response.list.data;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');  this.listLoading = false;});
                },
                qingjiaListExcel:function(){

                    log_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                       response.list.data.filter(function(item,i) {
                            item.ctime = moment(item.action_time).format('YYYY-MM-DD HH:mm:ss');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['提交人', '操作时间','操作对象','操作','操作说明'];
                            const filterVal = ['submitname', 'ctime', 'target_source','action_name','note'];
                            const list =  response.list.data;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '日志列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                log_listTable:[],
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
                'search_list'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){

            this.dataInfor.search['Search_str'] = this.search_list.renshi_log_list_name;
            this.dataInfor.search['start_date'] = this.search_list.renshi_log_list_start_date;
            this.dataInfor.search['end_date'] = this.search_list.renshi_log_list_end_date;
            this.dataInput = [this.search_list.renshi_log_list_start_date,this.search_list.renshi_log_list_end_date];
            this.pageSize =  this.search_list.renshi_log_list_page?this.search_list.renshi_log_list_page:20;
            this.pageIndex = this.search_list.renshi_log_list_num ?this.search_list.renshi_log_list_num :1;
            this.kehuTableLength = this.search_list.renshi_log_list_length ?this.search_list.renshi_log_list_length :1;

            this.log_list(this.page,this.num,this.dataInfor);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.renshi_log_list_name
                }
            ];

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    renshi_log_list_name: this.dataInfor.search.Search_str,
                    renshi_log_list_start_date: this.dataInfor.search.start_date,
                    renshi_log_list_end_date: this.dataInfor.search.end_date,
                    renshi_log_list_page:this.pageSize,
                    renshi_log_list_num:this.pageIndex,
                    renshi_log_list_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
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
                this.dataInfor.search.start_date = start_date;
                this.dataInfor.search.end_date = end_date;
                this.log_list(this.page,this.num);
                this.searchDataFun()
            },

            outExcel(){
                this.qingjiaListExcel();
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.log_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.log_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.log_list(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                    },
                };
                this.dataInput = [];
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.log_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    renshi_log_list_name:'',
                    renshi_log_list_date_type: '',
                    renshi_log_list_start_date: '',
                    renshi_log_list_end_date: '',
                });
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=val;
                return   moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
            fileFun(val){
                if(val){
                    return val.name
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
