<template>
    <div class="zhuankuanList" >
        <el-row class="zhuankuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >转款列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dateType">
                    <el-select  v-model="date_type" placeholder="请选择" @change="dateTypeChange">
                        <el-option
                                v-for="(item, index) in options_type"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                                :other="item.name">
                        </el-option>
                    </el-select>
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
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="zhuankuanTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="zhuankuanTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.advertiser0 | advertiserFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="转出账户名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.zcaccount | fileFun}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="转入账户名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.zraccount | fileFun}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="转出金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.money | currency('') }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="创建时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.ctime | ctimeData }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="审核状态">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <state :stateData=scope.row ></state>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提交人">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.submitname}}
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
    import {mapActions,mapGetters} from 'vuex';
    import { zhuankuan_list } from '@/api/kehu';
    import { renew_list_meijie } from '@/api/meiti';
    import { renew_list_caiwu } from '@/api/money';
    import criteria from '@/components/search/criteria';  //获取条件
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{
                        date_type:1,
                    },
                },
                date_type:1,
                options_type:[],
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                shenhe:'',
                shenheData:[],
                //======================
                screen:'',
                stateData:'',
                listLoading:true,
                zhuankuanTable:[],

                zhuankuan_list:function(page,num,val){
                    this.listLoading = true;
                    zhuankuan_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.kehu_zhuankuan_page?this.search_list.kehu_zhuankuan_page:20;
                        this.pageIndex = this.search_list.kehu_zhuankuan_num ?this.search_list.kehu_zhuankuan_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.zhuankuanTable = response.data;

                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');this.listLoading = false;});

                },
                zhuankuan_listExcel:function(num){
                    zhuankuan_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['转出账户名称','转入账户名称','转出金额', '创建时间', '提交人','备注'];
                            const filterVal = ['zcaccount','zraccount','money','ctime','submitname','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '转款列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});

                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
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
            this.options_type = criteria.options_type;
            this.shenheData = criteria.shenheData;
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name =='zhuankuan'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
            this.screen =[
                {
                    name:'搜索',
                    data: this.search_list.kehu_zhuankuan_name
                }
            ];
            this.dataInfor.search['Search_str'] = this.search_list.kehu_zhuankuan_name;
            this.dataInfor.search['date_type'] = this.search_list.kehu_zhuankuan_date_type?this.search_list.kehu_zhuankuan_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.kehu_zhuankuan_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehu_zhuankuan_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.kehu_zhuankuan_shenhe;
            this.date_type = this.search_list.kehu_zhuankuan_date_type?this.search_list.kehu_zhuankuan_date_type:1;
            this.dataInput = [this.search_list.kehu_zhuankuan_start_date,this.search_list.kehu_zhuankuan_end_date];
            this.shenhe = this.search_list.kehu_zhuankuan_shenhe;
            this.pageSize =  this.search_list.kehu_zhuankuan_page?this.search_list.kehu_zhuankuan_page:20;
            this.pageIndex = this.search_list.kehu_zhuankuan_num ?this.search_list.kehu_zhuankuan_num :1;
            this.kehuTableLength = this.search_list.kehu_zhuankuan_length ?this.search_list.kehu_zhuankuan_length :1;
            this.zhuankuan_list(this.page,this.num);



        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    kehu_zhuankuan_name: this.dataInfor.search.Search_str,
                    kehu_zhuankuan_date_type: this.dataInfor.search.date_type,
                    kehu_zhuankuan_start_date: this.dataInfor.search.start_date,
                    kehu_zhuankuan_end_date: this.dataInfor.search.end_date,
                    kehu_zhuankuan_shenhe: this.dataInfor.search.shenhe,
                    kehu_zhuankuan_page:this.pageSize,
                    kehu_zhuankuan_num:this.pageIndex,
                    kehu_zhuankuan_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.zhuankuan_list(this.page,this.num);
                this.searchDataFun()
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
                this.dataInfor.search.start_date = start_date;
                this.dataInfor.search.end_date = end_date;
                this.zhuankuan_list(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.zhuankuan_list(this.page,this.num);
                this.searchDataFun()
            },

            outExcel(){
                this.zhuankuan_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.zhuankuan_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.zhuankuan_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.zhuankuan_list(this.page,this.num);
                this.searchDataFun()

            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.dataInput = [];
                this.date_type = 1;
                this.shenhe = '';
                this.zhuankuan_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    kehu_zhuankuan_name:'',
                    kehu_zhuankuan_start_date: '',
                    kehu_zhuankuan_end_date: '',
                    kehu_zhuankuan_shenhe: '',
                });
                },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'TransferOfFundsInfor',query: { id:val.id} });

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
            advertiserFun(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileFun(val){
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
