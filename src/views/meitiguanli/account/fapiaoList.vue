<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >发票列表</span>
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
                    <el-select v-model="accountType" placeholder="请选择" @change="accountTypeChange">
                        <el-option
                                v-for="(item, index) in accountTypeData"
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
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.adname | fileFun}}
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
                                        {{scope.row.money | currency('')}}
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
    import { fapiaoPost } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    const currency = require('@/../node_modules/vue2-filters/src/other/currency');
    export default {
        data() {
            return {
                dataInfor : {
                    search:{
                        f_type:2,
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
                accountType:'账户状态',
                accountTypeData:[],
                screen:[],

                //---------------
                stateData:'',
                label:'',
                listLoading:true,
                fapiaoPost:function(page,num,val){
                    this.listLoading = true;
                    fapiaoPost({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        let num= 0;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.fapiaoTable = response.data;

                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.meiti_fapiao_page?this.search_list.meiti_fapiao_page:20;
                        this.pageIndex = this.search_list.meiti_fapiao_num ?this.search_list.meiti_fapiao_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.label = '发票金额'+'(总数:'+ currency.default(response.money_sum,'') +')';
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');   this.listLoading = false;});
                },
                fapiaoPostExcel:function(){
                    this.dataInfor.search['f_type'] =2;
                    fapiaoPost({
                        page:  this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['advertiseraccount'] = item.advertiser0.advertiser;

                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        })
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '发票金额', '创建时间','提交人'];
                            const filterVal = ['advertiseraccount', 'appname', 'money','ctime','submitname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '发票列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',

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
                'accounts',
                'search_list'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.shenheData = criteria.shenheData;
            this.accountTypeData = criteria.accountTypeData;
            this.options_type = criteria.options_type;
            this.dataInfor.search['Search_str'] = this.search_list.meiti_fapiao_name;
            this.dataInfor.search['date_type'] = this.search_list.meiti_fapiao_date_type?this.search_list.meiti_fapiao_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.meiti_fapiao_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_fapiao_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.meiti_fapiao_shenhe;
            this.dataInfor.search['account_state'] = this.search_list.meiti_fapiao_account_state;
            this.pageSize =  this.search_list.meiti_fapiao_page?this.search_list.meiti_fapiao_page:20;
            this.pageIndex = this.search_list.meiti_fapiao_num ?this.search_list.meiti_fapiao_num :1;
            this.kehuTableLength = this.search_list.meiti_fapiao_length ?this.search_list.meiti_fapiao_length :1;

            this.dataInput = [this.search_list.meiti_fapiao_start_date,this.search_list.meiti_fapiao_end_date];
            this.date_type = this.search_list.meiti_fapiao_date_type?this.search_list.meiti_fapiao_date_type:1;
            this.shenhe = this.search_list.meiti_fapiao_shenhe;
            this.accountType = this.search_list.meiti_fapiao_account_state? this.search_list.meiti_fapiao_account_state:'账户状态';

            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'Invoice'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_fapiao_name
                }
            ];
            this.fapiaoPost(this.page,this.num,this.dataInfor);
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                   meiti_fapiao_name: this.dataInfor.search.Search_str,
                   meiti_fapiao_date_type: this.dataInfor.search.date_type,
                   meiti_fapiao_start_date: this.dataInfor.search.start_date,
                   meiti_fapiao_end_date: this.dataInfor.search.end_date,
                   meiti_fapiao_shenhe: this.dataInfor.search.shenhe,
                   meiti_fapiao_account_state:this.dataInfor.search.account_state,
                    meiti_fapiao_page:this.pageSize,
                    meiti_fapiao_num:this.pageIndex,
                    meiti_fapiao_length:this.kehuTableLength,
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.fapiaoPost(this.page,this.num);
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
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
            accountTypeChange(val){
                this.dataInfor.search.account_state = val;
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()

            },
            //导出
            outExcel(){
                this.fapiaoPostExcel()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {

                this.page = val;
                this.pageSize =val;

                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.fapiaoPost(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {

                this.pageIndex = val;
                this.fapiaoPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){

                this.dataInfor.search.Search_str = val;
                this.fapiaoPost(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        f_type:2,
                        date_type:1,
                    },
                };
                this.accountType = '账户状态';
                this.date_type = 1;
                this.dataInput = [];
                this.shenhe = '';
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.fapiaoPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    meiti_fapiao_name:'',
                   meiti_fapiao_date_type: '',
                   meiti_fapiao_start_date: '',
                   meiti_fapiao_end_date: '',
                   meiti_fapiao_shenhe: '',
                   meiti_fapiao_account_state:'',
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'fapiaoInfor',query: { id:val.id} });
            },
            //跳转
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            jumpConsole(){
                this.$router.push({ name: 'mediaConsole' ,query: { type:1} });
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
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
</style>
