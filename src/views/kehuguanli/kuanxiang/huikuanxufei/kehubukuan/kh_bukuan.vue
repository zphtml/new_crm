<template>
    <div >
        <el-col :span="24" class="screen">
            <div class="searchInput">
                <input type="text" class="search" placeholder="请输入关键字" v-model='inputText' >
                <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                    <use xlink:href="#icon-11"></use>
                </svg>
            </div>
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
            <div class="dataInput" style="  border-left: none!important">
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
            <div class="allMoney" style="text-align: right;font-size: 14px">
                <p>
                       <span class="moneyName">
                           总金额:
                       </span> {{ huikuanAll | currency('') }}
                </p>
                <p >
                    <span class="moneyName">利润总金额:</span>
                    {{ tcqlr_sum | currency('') }}
                </p>
            </div>
        </el-col>
        <el-col :span="24" class="huikuanxufeiTable">
            <div>
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="huikuanxufeiTable"
                        class="vue-table"
                        height="700"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        style="width: 100%">
                    <el-table-column
                            height="10px"
                            :label="$t('titles.customer')">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.adname  | fileF}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="产品线">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.prlinname}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            label="补款金额">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.money | currency('')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="实付金额">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.money | currency('')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            label="利润">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.money | currency('')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            header-align="center"
                            label="销售">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.name | fileF}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                            height="10px"
                            header-align="center"
                            label="补款时间">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.time | ctimeData}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            height="10px"
                            header-align="center"
                            label="备注">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    <el-tooltip :content="scope.row.note" placement="top" effect="light" v-if="scope.row.note != ''">
                                        <span>{{scope.row.note }} </span>
                                    </el-tooltip>
                                    <span v-else>
                                        无
                                    </span>

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
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { yihuikuanxufei_list } from '@/api/kehu';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
//
                dataInfor : {
                    search:{
                        ktype:'khbukuan',
                        date_type:1,
                    },
                },
                inputText:'',
                // 搜索时间
                date_type:1,
                options_type:[],
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                screen:[],
                //------------------------
                backMoney:'',
                huikuanAll:'',
                shifu_sum:'',
                tcqlr_sum:'',
                addFormVisible:false,
                fandianInput:'',
                fandian:'',
                accountId:'',
                listLoading:true,
                yihuikuanxufei_list:function(page,num,val){
                    yihuikuanxufei_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        let backMoney = 0;
                        let tk_shifu = 0;
                        let lirun = 0;

                        this.tcqlr_sum = response.data.tcqlr_sum;
                        this.huikuanAll =  response.data.huikuan;
                        this.huikuanxufeiTable = response.data.data;
                        this.kehuTableLength =  response.data.totalCount;
                        this.pageSize =  this.search_list.caiwu_kehu_bukuan_page?this.search_list.caiwu_kehu_bukuan_page:20;
                        this.pageIndex = this.search_list.caiwu_kehu_bukuan_num ?this.search_list.caiwu_kehu_bukuan_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                yihuikuanxufei_listExcel:function(num){

                    yihuikuanxufei_list({
                        page: this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.data.filter(function(item,i) {
                            item.time = moment(new Date(parseInt(item.time) * 1000)).format('YYYY-MM-DD');
                            item.xftime = moment(new Date(parseInt(item.xftime) * 1000)).format('YYYY-MM-DD');

                            return item
                        });
                        require.ensure([], () => {
                        const { export_json_to_excel } = require('@/vendor/Export2Excel');
                     const tHeader = [this.$t('titles.customer'), '产品线','补款金额',
                         '实付金额','利润', '销售' ,'补款时间',
                         '备注'];
                        const filterVal = ['adname', 'prlinname','money',
                            'money','money','name','time',
                            'note'];
                        const list = this.tableData;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '客户补款');
                    })
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,

//表格
                huikuanxufeiTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
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


        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            kh_bukuanList(){
                this.options_type = criteria.options_type;
                this.dataInfor.search['ktype'] = 'khbukuan';

                this.dataInfor.search['Search_str'] = this.search_list.caiwu_kehu_bukuan_name;
                this.dataInfor.search['date_type'] = this.search_list.caiwu_kehu_bukuan_date_type?this.search_list.caiwu_kehu_bukuan_date_type:1;
                this.dataInfor.search['start_date'] = this.search_list.caiwu_kehu_bukuan_start_date;
                this.dataInfor.search['end_date'] = this.search_list.caiwu_kehu_bukuan_end_date;
                this.inputText = this.search_list.caiwu_kehu_bukuan_name;
                this.dataInput = [this.search_list.caiwu_kehu_bukuan_start_date,this.search_list.caiwu_kehu_bukuan_end_date];
                this.date_type = this.search_list.caiwu_kehu_bukuan_date_type?this.search_list.caiwu_kehu_bukuan_date_type:1;
                this.pageSize =  this.search_list.caiwu_kehu_bukuan_page?this.search_list.caiwu_kehu_bukuan_page:20;
                this.pageIndex = this.search_list.caiwu_kehu_bukuan_num ?this.search_list.caiwu_kehu_bukuan_num :1;
                this.kehuTableLength = this.search_list.caiwu_kehu_bukuan_length ?this.search_list.caiwu_kehu_bukuan_length :1;
                this.yihuikuanxufei_list(this.page,this.num,this.dataInfor);

            },
            searchDataFun(){
                this.searchData({
                    caiwu_kehu_bukuan_name: this.dataInfor.search.Search_str,
                    caiwu_kehu_bukuan_date_type: this.dataInfor.search.date_type,
                    caiwu_kehu_bukuan_start_date: this.dataInfor.search.start_date,
                    caiwu_kehu_bukuan_end_date: this.dataInfor.search.end_date,
                    caiwu_kehu_bukuan_page:this.pageSize,
                    caiwu_kehu_bukuan_num:this.pageIndex,
                    caiwu_kehu_bukuan_length: this.kehuTableLength
                });
            },
            //搜索
            searchInput(){
                this.dataInfor.search.Search_str = this.inputText;
                this.yihuikuanxufei_list();
                this.searchDataFun();

            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.yihuikuanxufei_list();
                this.searchDataFun();
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
                this.yihuikuanxufei_list();
                this.searchDataFun();
            },
            outExcel(){
                this.yihuikuanxufei_listExcel(this.num);
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
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
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.yihuikuanxufei_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.yihuikuanxufei_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = this.inputText;
                this.yihuikuanxufei_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
            //清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        ktype:'khbukuan',
                        date_type:1,
                    },
                };
                this.pageSize =  20;
                this.pageIndex = 1;
                this.inputText = '';
                this.dataInput =[];
                this.date_type = 1;
                this.yihuikuanxufei_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    caiwu_kehu_bukuan_name:'',
                    caiwu_kehu_bukuan_date_type: '',
                    caiwu_kehu_bukuan_start_date: '',
                    caiwu_kehu_bukuan_end_date: '',
                });
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
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
