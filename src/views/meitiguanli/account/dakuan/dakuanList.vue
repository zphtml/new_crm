<template>
    <div class="fapiaoListmedia" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >打款列表</span>
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
                <div class="startInput">
                    <el-select v-model="dakuan_type" placeholder="打款类型" @change="dakuan_change">
                        <el-option
                                v-for="(item, index) in dakuanData"
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
            <el-col :span="24" class="fapiaoTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="fapiaoTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="媒体名称">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.advertiser0 | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="打款类型">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    <div v-if="scope.row.ftype == 1 && scope.row.type == 1">
                                        实时付
                                    </div>
                                    <div v-if="scope.row.ftype == 2  && scope.row.type == 1">
                                        周期付
                                    </div>
                                    <div v-if="scope.row.type == 3 ">
                                        保证金
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                width="230"
                                :label="label">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.b_money | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="打款日期">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row. b_time | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="创建日期">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
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
                                label="汇款人">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.huikuanren | fileFun1}}
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
    import {mapGetters,mapActions} from 'vuex';
    import { meijie_dakuan_list } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    const currency = require('@/../node_modules/vue2-filters/src/other/currency');
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor:{
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
                dakuan_type:'打款类型',
                dakuanData:[
                    {
                        label:'全部',
                        value:'',
                    },
                    {
                        label:'实时付',
                        value:'1',
                    },
                    {
                        label:'周期付',
                        value:'2',
                    },
                    {
                        label:'保证金',
                        value:'3',
                    }
                ],
                //=============================
                screen:'',
                stateData:'',
                label:'',
                listLoading:true,
                meijie_dakuan_list:function(page,num,val){
                    meijie_dakuan_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.data.length;i++){
                            if(response.data.data[i].type == 1){
                                response.data.data[i]['audit_countType'] = this.audit_count_a;
                            }else  if(response.data.data[i].type == 3){
                                response.data.data[i]['audit_countType'] = this.audit_count_b;
                            }
                        }
                        this.fapiaoTable = response.data.data;
                        this.kehuTableLength =  response.data.totalCount;
                        this.pageSize =  this.search_list.meiti_dakuan_page?this.search_list.meiti_dakuan_page:20;
                        this.pageIndex = this.search_list.meiti_dakuan_num ?this.search_list.meiti_dakuan_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.label = '打款金额'+'(总数:'+ currency.default(response.dakuan_sum,'')  +')';
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                meijie_dakuan_listExcel:function(page,num,val){

                    meijie_dakuan_list({
                        page: this.kehuTableLength,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['submituserName'] = item.advertiser0.advertiser;
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.b_time) * 1000)).format('YYYY-MM-DD');
                            item['m_yu_e'] =  Number(item.dakuan)- Number(item.yu_e);
                            if(item.ftype == 1){
                                item['LType'] = '实时付'
                            }else if(item.ftype == 2){
                                item['LType'] = '周期付'
                            }
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '打款类型','打款金额','打款日期','创建日期','汇款人','提交人','备注'];
                            const filterVal = ['submituserName', 'appname','LType', 'b_money','b_time','ctime','huikuanren','submitname','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '打款列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count_a:'',
                audit_count_b:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                fapiaoTable:[],
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
            this.options_type = criteria.options_type;
            this.shenheData = criteria.shenheData;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'meijie-dakuan'){
                    this.audit_count_a = this.audit_action[i].audit_count;
                }
                if(this.audit_action[i].action_name == 'margin-dakuan'){
                    this.audit_count_b = this.audit_action[i].audit_count;
                }
            }
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_dakuan__name
                }
            ];
            this.dataInfor.search['Search_str'] = this.search_list.meiti_dakuan__name;
            this.dataInfor.search['date_type'] = this.search_list.meiti_dakuan_date_type?this.search_list.meiti_dakuan_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.meiti_dakuan_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_dakuan_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.meiti_dakuan_shenhe;
            this.dataInfor.search['dktype'] = this.search_list.meiti_dakuan_dktype;
            this.dataInput = [this.search_list.meiti_dakuan_start_date,this.search_list.meiti_dakuan_end_date];
            this.date_type = this.search_list.meiti_dakuan_date_type?this.search_list.meiti_dakuan_date_type:1;
            this.shenhe = this.search_list.meiti_dakuan_shenhe;
            this.dakuan_type = this.search_list.meiti_dakuan_dktype;
            this.pageSize =  this.search_list.meiti_dakuan_page?this.search_list.meiti_dakuan_page:20;
            this.pageIndex = this.search_list.meiti_dakuan_num ?this.search_list.meiti_dakuan_num :1;
            this.kehuTableLength = this.search_list.meiti_dakuan_length ?this.search_list.meiti_dakuan_length :1;
            this.meijie_dakuan_list(this.page,this.num,this.dataInfor);



        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_dakuan_name: this.dataInfor.search.Search_str,
                    meiti_dakuan_date_type: this.dataInfor.search.date_type,
                    meiti_dakuan_start_date: this.dataInfor.search.start_date,
                    meiti_dakuan_end_date: this.dataInfor.search.end_date,
                    meiti_dakuan_shenhe: this.dataInfor.search.shenhe,
                    meiti_dakuan_dktype:this.dataInfor.search.dktype,

                    meiti_dakuan_page:this.pageSize,
                    meiti_dakuan_num:this.pageIndex,
                    meiti_dakuan_length:this.kehuTableLength,
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.meijie_dakuan_list(this.page,this.num);
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
                this.meijie_dakuan_list(this.page,this.num);
                this.searchDataFun();
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.meijie_dakuan_list(this.page,this.num);
                this.searchDataFun();
            },
            //打款类型
            dakuan_change(val){
                this.dataInfor.search.dktype = val;
                this.meijie_dakuan_list(this.page,this.num);
                this.searchDataFun();

            },
            outExcel(){
                this.meijie_dakuan_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_dakuan_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.meijie_dakuan_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_dakuan_list(this.page,this.num,val);
                this.searchDataFun();
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.date_type = 1;
                this.dataInput = [];
                this.shenhe = '';
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.dakuan_type = '打款类型';
                this.meijie_dakuan_list(this.page,this.num);
                this.searchData({
                  meiti_dakuan__name:'',
                    meiti_dakuan_date_type: '',
                    meiti_dakuan_start_date: '',
                    meiti_dakuan_end_date: '',
                    meiti_dakuan_shenhe: '',
                    meiti_dakuan_dktype
                });
            },
//点击tr
            clickTr(val){
                if(val.type == 1){
                    this.$router.push({ name: 'dakuan',query: { id:val.id} });
                }else{
                    this.$router.push({ name: 'dakuan',query: { id:val.id} });
                }

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
