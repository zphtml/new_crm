<template>
    <div class="refund" >
        <el-row class="compactBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>退款到总账户</span>
            </p>
            <el-col :span="24" class="refundTabs" >
                <el-col :span="24" class="compactFirtsTitle screen" style="margin-bottom:20px;">
                    <div class="searchInput">
                        <input type="text" class="search" placeholder="请输入公司名" v-model='accountText'  >
                        <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                            <use xlink:href="#icon-11"></use>
                        </svg>
                    </div>
                    <customerDiv :screen=screen  @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></customerDiv>
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
                <el-col :span="24" class="compactFirtsTable">
                    <div >
                        <el-table
                                highlight-current-row v-loading="listLoading"  border
                                :data="tuikuanTable"
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
                                        <div class="xfshow" v-if="scope.row.is_ultimate_shenhe == 0"></div>
                                        {{scope.row.adname}}
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
                                    :label="$t('titles.nick')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 }">
                                            {{scope.row.product | fileFun}}
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
                                            {{scope.row.money | currency('') }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    prop="is_huikuan"
                                    sortable
                                    :label="$t('titles.fandian')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 }">
                                            {{scope.row.rebates_proportion | currency('') }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="账户">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 }">
                                            {{scope.row.a_users | fileFun}}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="产品线">
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
                                    <stateDiv :stateData=scope.row ></stateDiv>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="80"
                                    label="最终审核">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        <div class="start_icon" v-if="scope.row.audit == 2 " style="color: red;font-size: 12px">
                                            驳回
                                        </div>
                                        <div class="start_icon" v-if="scope.row.audit == 0" style=" color:  #444444;font-size: 12px">
                                            未完成
                                        </div>
                                        <div class="start_icon" v-if="scope.row.audit == 1 && scope.row.is_ultimate_shenhe ==1" style=" color:  #54ADFF;font-size: 12px">
                                            已完成
                                        </div>
                                        <div class="start_icon" v-if="scope.row.audit == 1 && scope.row.is_ultimate_shenhe ==0" style=" color:  #444444;font-size: 12px">
                                            未完成
                                        </div>
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { refund_account_listPost,refund_kehu_listPost } from '@/api/kehu';
    import customerDiv from '@/components/search/search';
    import stateDiv from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {

        data() {
            return {
                dataInfor : {
                    search:{
                        date_type:1,
                    },
                },
                accountText:'',
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
                //退款到总账户
                audit_count_p:'',
                audit_count_z:'',
                tuikuanTable:[],
                listLoading:true,
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,


                //分页
                page_last:'20',
                num_last:'1',
                pageIndex_last:1,
                pageSize_last:20,
                kehuTableLength_last:12,
                date:{start:'',end:''},
                //合同table
                refund_accountTable:function(page,num,val){
                    this.listLoading = true;
                    refund_account_listPost({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let n = 0;n<this.audit_action.length;n++){
                            if(this.audit_action[n].id == 76){
                                this.audit_count_p = this.audit_action[n].audit_count;
                            }
                            if(this.audit_action[n].id == 78){
                                this.audit_count_z = this.audit_action[n].audit_count
                            }
                        }
                        for(let i = 0;i<response.data.data.length;i++){
                            response.data.data[i]['audit_countType'] = this.audit_count_z;
                        }
                        this.tuikuanTable = response.data.data;
                        this.kehuTableLength =  response.data.totalCount;
                        this.pageSize =  this.search_list.kehu_tuikuan_all_page?this.search_list.kehu_tuikuan_all_page:20;
                        this.pageIndex = this.search_list.kehu_tuikuan_all_num ?this.search_list.kehu_tuikuan_all_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');  this.listLoading = false;});

                },
                //导出
                tableData:[],
                refund_accountTableExcel:function(dataName){
                    refund_account_listPost({
                        page: this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            item.payment_time = moment(new Date(parseInt(item.payment_time) * 1000)).format('YYYY-MM-DD');
                            if(item.audit == 2){
                                item['shenheName'] = '驳回';
                            }else if(item.audit == 0){
                                item['shenheName'] = '未完成';
                            }else if(item.audit == 1 && item.is_ultimate_shenhe ==1){
                                item['shenheName'] = '已完成';
                            }else if(item.audit == 1 && item.is_ultimate_shenhe ==0){
                                item['shenheName'] = '未完成';
                            }
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称','广告主',this.$t('titles.nick'), '金额',this.$t('titles.fandian'), '账户', '产品线','创建日期','提交人','最终审核状态','账户币','备注'];
                            const filterVal = ['adname', 'appname','guanggaozhu','product', 'money','rebates_proportion','a_users', 'prlina','payment_time','submitname','shenheName','show_money','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '退款列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },

            }
        },
        components: {
            stateDiv,
            customerDiv,

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
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.kehu_tuikuan_all_name,
                }
            ];
            this.dataInfor.search['Search_str'] = this.search_list.kehu_tuikuan_all_name;
            this.dataInfor.search['search_adname'] = this.search_list.kehu_tuikuan_all_account_name;

            this.dataInfor.search['date_type'] = this.search_list.kehu_tuikuan_all_date_type?this.search_list.kehu_tuikuan_all_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.kehu_tuikuan_all_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehu_tuikuan_all_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.kehu_tuikuan_all_shenhe;
            this.accountText = this.search_list.kehu_tuikuan_all_account_name;
            this.date_type = this.search_list.kehu_tuikuan_all_date_type?this.search_list.kehu_tuikuan_all_date_type:1;
            this.dataInput = [this.search_list.kehu_tuikuan_all_start_date,this.search_list.kehu_tuikuan_all_end_date];
            this.shenhe = this.search_list.kehu_tuikuan_all_shenhe;

            this.pageSize =  this.search_list.kehu_tuikuan_all_page?this.search_list.kehu_tuikuan_all_page:20;
            this.pageIndex = this.search_list.kehu_tuikuan_all_num ?this.search_list.kehu_tuikuan_all_num :1;
            this.kehuTableLength_last = this.search_list.kehu_tuikuan_all_length ?this.search_list.kehu_tuikuan_all_length :1;
            this.refund_accountTable(this.page,this.num);

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    kehu_tuikuan_all_name: this.dataInfor.search.Search_str,
                    kehu_tuikuan_all_account_name:this.dataInfor.search.search_adname,
                    kehu_tuikuan_all_date_type: this.dataInfor.search.date_type,
                    kehu_tuikuan_all_start_date: this.dataInfor.search.start_date,
                    kehu_tuikuan_all_end_date: this.dataInfor.search.end_date,
                    kehu_tuikuan_all_shenhe: this.dataInfor.search.shenhe,
                    kehu_tuikuan_all_length:this.kehuTableLength_last,
                    kehu_tuikuan_all_page:this.pageSize,
                    kehu_tuikuan_all_num:this.pageIndex,
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.refund_accountTable(this.page,this.num);
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
                this.refund_accountTable(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.refund_accountTable(this.page,this.num);
                this.searchDataFun()
            },

            //导出
            outExcel(){
                this.refund_accountTableExcel()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.dataInfor.search.search_adname = this.accountText;
                this.refund_accountTable(this.page,this.num,val);
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
                this.shenhe = '';
                this.date_type = 1;
                this.dataInput = [];
                this.accountText = '';
                this.refund_accountTable(this.page,this.num);
                this.searchData({
                    kehu_tuikuan_all_name:"",
                    kehu_tuikuan_all_account_name:'',
                      kehu_tuikuan_all_start_date: '',
                      kehu_tuikuan_all_end_date: '',
                      kehu_tuikuan_all_shenhe: '',
                });
            },
            //tr跳转
            clickTr(val){
                this.$router.push({ name: 'tuikuanlist',query: { id:val.id,name:'退款到总账户'} });
            },
            addHetong(val){
                this.$router.push({ name: 'newContrac' , query: { id: val.id}});
            },
            //正常分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.refund_accountTable(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.refund_accountTable(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
            //客户
            handleSizeChange_last(val) {
                this.page_last = val;
                this.pageSize_last =val;
                this.refund_accountTable(this.page_last,this.num_last,this.dataInfor);
            },
            handleCurrentChange_last(val) {
                this.num_last = val;
                this.refund_accountTable(this.page_last,this.num_last,this.dataInfor);

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
