<template>
    <div class="kuhuList" >
        <el-row class="kuhuBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >执行框架列表</span>
            </p>
            <el-col :span="24" class="screen distributionButton">
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
            <el-col :span="24" class="kuhuTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kuhuTable"
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
                                    {{scope.row.advertiser0 | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="合同名称">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.title | fileNameFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                width="230"
                                label="产品线/合同金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.prlin | fileNameFun}}&nbsp;&nbsp;/&nbsp;&nbsp;{{ scope.row.contract_money |currency('') }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="rebates_proportion"
                                header-align="center"
                                sortable
                                :label="'媒介'+$t('titles.fandian')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.rebates_proportion |currency('') }}
                                    </div>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="dl_fandian"
                                header-align="center"
                                sortable
                                :label="'代理'+$t('titles.fandian')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.dl_fandian |currency('') }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="m_xsfd"
                                header-align="center"
                                sortable
                                v-if="inforTrue"
                                :label="'销售媒介'+$t('titles.fandian')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.m_xsfd |currency('') }}
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
                                label="创建时间">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.ctime | ctimeData}}
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
    import { meijie_customer_contract_list } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
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
                inforTrue:false,
                stateData:'',
                label:'',
                listLoading:true,
                meijie_customer_contract_list:function(page,num,val){
                    meijie_customer_contract_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.list.data.length;i++){
                            response.list.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.kuhuTable = response.list.data;
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.meiti_kuangjia_page?this.search_list.meiti_kuangjia_page:20;
                        this.pageIndex = this.search_list.meiti_kuangjia_num ?this.search_list.meiti_kuangjia_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                meijie_customer_contract_listExcel:function(page,num,val){

                    meijie_customer_contract_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {

                        if(this.inforTrue){
                            this.tableData =  response.list.data.filter(function(item,i) {
                                if(item.advertiser0){
                                    item['submituserName'] = item.advertiser0.advertiser;
                                }
                                item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                                item['m_yu_e'] =  Number(item.dakuan)- Number(item.yu_e);
                                item['m_xsfd_out'] =  item.m_xsfd;
                                return item
                            });

                        }else{
                            this.tableData =  response.list.data.filter(function(item,i) {
                                if(item.advertiser0){
                                    item['submituserName'] = item.advertiser0.advertiser;
                                }
                                item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                                item['m_yu_e'] =  Number(item.dakuan)- Number(item.yu_e);
                                item['m_xsfd_out'] =  '';
                                return item
                            });

                        }

                        require.ensure([], () => {
                            let name = '';
                            if(this.inforTrue){
                                name = '销售媒介'+this.$t('titles.fandian');
                            }else{
                                name = '';
                            }
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '合同名称', '产品线/合同金额','充值','打款','余额','创建时间','媒介'+this.$t('titles.fandian'),'代理'+this.$t('titles.fandian'),'提交人',name];
                            const filterVal = ['submituserName', 'title', 'product_line','isxufei','dakuan','m_yu_e','ctime','rebates_proportion','dl_fandian','submitname','m_xsfd_out'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '合同列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                kuhuTable:[],
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
                'roles',
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
                if(this.audit_action[i].action_name == 'meijie_contract'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            };
            this.dataInfor.search['Search_str'] = this.search_list.meiti_kuangjia_name;
            this.dataInfor.search['date_type'] = this.search_list.meiti_kuangjia_date_type?this.search_list.meiti_kuangjia_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.meiti_kuangjia_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_kuangjia_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.meiti_kuangjia_shenhe;
            this.dataInput = [this.search_list.meiti_kuangjia_start_date,this.search_list.meiti_kuangjia_end_date];
            this.date_type = this.search_list.meiti_kuangjia_date_type?this.search_list.meiti_kuangjia_date_type:1;
            this.shenhe = this.search_list.meiti_kuangjia_shenhe;
            this.pageSize =  this.search_list.meiti_kuangjia_page?this.search_list.meiti_kuangjia_page:20;
            this.pageIndex = this.search_list.meiti_kuangjia_num ?this.search_list.meiti_kuangjia_num :1;
            this.kehuTableLength = this.search_list.meiti_kuangjia_length ?this.search_list.meiti_kuangjia_length :1;
            this.meijie_customer_contract_list(this.page,this.num,this.dataInfor);
            this.screen =   [
                {
                    name:'搜索',
                    data: this.search_list.meiti_kuangjia_name
                }
            ];
            let _this = this;
            this.roles.filter(function(item){
                if(item == "/api/renew-huikuan/mei_market_fandian"){
                    _this.inforTrue = true;
                }
            })
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_kuangjia_name: this.dataInfor.search.Search_str,
                    meiti_kuangjia_date_type: this.dataInfor.search.date_type,
                    meiti_kuangjia_start_date: this.dataInfor.search.start_date,
                    meiti_kuangjia_end_date: this.dataInfor.search.end_date,
                    meiti_kuangjia_shenhe: this.dataInfor.search.shenhe,
                    meiti_kuangjia_page:this.pageSize,
                    meiti_kuangjia_num:this.pageIndex,
                    meiti_kuangjia_length:this.kehuTableLength

                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.meijie_customer_contract_list(this.page,this.num);
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
                this.meijie_customer_contract_list(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.meijie_customer_contract_list(this.page,this.num);
                this.searchDataFun()
            },

            outExcel(){
                this.meijie_customer_contract_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_customer_contract_list(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;

                this.meijie_customer_contract_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_customer_contract_list(this.page,this.num,val);
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
                this.meijie_customer_contract_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    meiti_kuangjia_name:'',
                    meiti_kuangjia_date_type: '',
                    meiti_kuangjia_start_date: '',
                    meiti_kuangjia_end_date: '',
                    meiti_kuangjia_shenhe: '',
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'mediaviewcontract',query: { id:val.id} });

                this.Account(val)
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
            fileNameFun(val){
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
