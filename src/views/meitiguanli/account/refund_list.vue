<template>
    <div class="bondrefundList" >

        <el-row class="bondrefundBox" >
            <el-col :span="24">
                <p class="crm_title">
                    <i class="crm_line"></i>
                    <span >保证金退款列表</span>
                </p>
            </el-col>
            <el-col :span="24" class="screen" style="margin: 20px 0;">
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
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="bondrefundTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="bondrefundTable"
                            class="vue-table"
                            height="715"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    <div v-if="scope.row.advertiser0">
                                        <div class="xfshow" v-if="scope.row.is_ultimate_shenhe == 0"></div>
                                        {{scope.row.adname}}
                                        <span class="appInfor qu" :class="{ textColor:scope.row.audit == 2 }" v-if="scope.row.advertiser0.customer_type == 2">
                                        渠
                                    </span>
                                        <span class="appInfor zhi" :class="{ textColor:scope.row.audit == 2 }" v-if="scope.row.advertiser0.customer_type == 1">
                                        直
                                    </span>
                                    </div>
                                    <div v-else="scope.row.advertiser0">
                                        --
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="广告主">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.guanggaozhu | fileFun}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="金额">
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
                                :label=" $t('titles.Addcustomers')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.prlina | fileFun }}
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
    import {mapGetters,mapActions} from 'vuex';
    import { meijie_margin_tui_list } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
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
                screen:[],

                //---------------
                stateData:'',
                listLoading:true,
                meijie_margin_tui_list:function(page,num,val){
                    this.listLoading = true;
                    meijie_margin_tui_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {

                        this.listLoading = false;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.bondrefundTable = response.data;

                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.media_bondrefund_page?this.search_list.media_bondrefund_page:20;
                        this.pageIndex = this.search_list.media_bondrefund_num ?this.search_list.media_bondrefund_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                    }).catch(err => {   this.listLoading = false;});
                },
                meijie_margin_tui_listExcel:function(page,num){
                    this.dataInfor.search['search_adname'] = this.search_list.bondrefund_account_name;
                    meijie_margin_tui_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        })
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'),'简称', '金额', this.$t('titles.Addcustomers'),'创建日期','提交人','备注'];
                            const filterVal = ['adname', 'appname', 'money', 'prlina','ctime','submitname','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '保证金退款列表');
                        })


                    }).catch(err => {});
                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                bondrefundTable:[],
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
        mounted(){
            this.shenheData = criteria.shenheData;
            this.options_type = criteria.options_type;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'meiti-margin-tuikuan'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.media_bondrefund_name;

            this.dataInfor.search['date_type'] = this.search_list.media_bondrefund_date_type?this.search_list.media_bondrefund_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.media_bondrefund_start_date;
            this.dataInfor.search['end_date'] = this.search_list.media_bondrefund_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.media_bondrefund_shenhe;
            this.dataInput = [this.search_list.media_bondrefund_start_date,this.search_list.media_bondrefund_end_date];
            this.date_type = this.search_list.media_bondrefund_date_type?this.search_list.media_bondrefund_date_type:1;
            this.shenhe = this.search_list.media_bondrefund_shenhe;

            this.pageSize =  this.search_list.media_bondrefund_page?this.search_list.media_bondrefund_page:20;
            this.pageIndex = this.search_list.media_bondrefund_num ?this.search_list.media_bondrefund_num :1;
            this.kehuTableLength = this.search_list.media_bondrefund_length ?this.search_list.media_bondrefund_length :1;
            this.meijie_margin_tui_list(this.page,this.num);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.media_bondrefund_name,
                }
            ];
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    media_bondrefund_name: this.dataInfor.search.Search_str,
                    media_bondrefund_date_type: this.dataInfor.search.date_type,
                    media_bondrefund_start_date: this.dataInfor.search.start_date,
                    media_bondrefund_end_date: this.dataInfor.search.end_date,
                    media_bondrefund_shenhe: this.dataInfor.search.shenhe,

                    media_bondrefund_page:this.pageSize,
                    media_bondrefund_num:this.pageIndex,
                    media_bondrefund_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.meijie_margin_tui_list(this.page,this.num);
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
                this.meijie_margin_tui_list(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.meijie_margin_tui_list(this.page,this.num);
                this.searchDataFun()
            },
//导出
            outExcel(){
                this.meijie_margin_tui_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_margin_tui_list(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.meijie_margin_tui_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_margin_tui_list(this.page,this.num,val);
                this.searchDataFun()
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
                this.meijie_margin_tui_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    media_bondrefund_name:'',
                    media_bondrefund_date_type: '',
                    media_bondrefund_start_date: '',
                    media_bondrefund_end_date: '',
                    media_bondrefund_shenhe: '',

                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'refund_listInfor', query: { id: val.id} });
            },
        },
        created() {

        },
        props: ['refund_list'],
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
