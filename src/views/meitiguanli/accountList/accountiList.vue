<template>
    <div class="meitiaccountList" >
        <el-row class="meitiaccountBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                账户列表
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen=screen @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="searchInput">
                    <input type="text" class="search" placeholder="请输入公司名称" v-model='inputText'  >
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
                <div class="searchInput">
                    <input type="text" class="search" placeholder="请输入二级域名" v-model='yumingText' >
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
                <div class="dataInput">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="startInput">
                    <el-select v-model="is_use" placeholder="是否结束" @change="changeUse">
                        <el-option
                                v-for="(item, index) in is_useData"
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
            <el-col :span="24" class="meitiaccountTable">
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="meitiaccountTable"
                            class="vue-table"
                            height="740"
                            @row-click="jumpmessage($event.id)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                 :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.advertiser0">
                                    <div class="xfshow" v-if="scope.row.is_ultimate_shenhe == 0"></div>
                                    {{scope.row.advertiser0.advertiser}}
                                </div>
                                <div v-else="scope.row.advertiser0">
                                    --
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="广告主">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.guanggaozhu | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                :label="$t('titles.nick')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.product | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="产品线">
                            <template slot-scope="scope">
                                {{scope.row.prlin }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="销售">
                            <template slot-scope="scope">
                                {{scope.row.marketname }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="用户名">
                            <template slot-scope="scope">
                                {{scope.row.a_users | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总消耗">
                            <template slot-scope="scope">
                                {{scope.row.total_cost  | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总充值">
                            <template slot-scope="scope">
                                {{scope.row.total_pay  | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="开始时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.ctime | ctimeData}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="到期时间">
                            <template slot-scope="scope">
                                <div style="text-align: center;color: green" v-if="scope.row.endtime== '4092599349'" >
                                    使用中
                                </div>
                                <div style="text-align: center;color: red;font-size: 12px" v-else >
                                    <div>{{scope.row.endtime | ctimeData}}</div>
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { account_listAllPost } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{},
                },
                inputText:'',
                yumingText:'',
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                is_use:'',
                is_useData:[],
                screen:[],
                //====================
                listLoading:true,
                account_listAllPost:function(page,num,val){
                    this.listLoading = true;
                    account_listAllPost({
                        id:'All',
                        data:this.user.auth_key,
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.meiti_accountList_page?this.search_list.meiti_accountList_page:20;
                        this.pageIndex = this.search_list.meiti_accountList_num ?this.search_list.meiti_accountList_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.meitiaccountTable = response.list.data;

                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');   this.listLoading = false;});
                },
                account_listAllPostExcel:function(page,num,val){

                    account_listAllPost({
                        id:'All',
                        data:this.user.auth_key,
                        page:this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.list.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['advertiserName'] = item.advertiser0.advertiser;
                            }
                            item.endtime = moment(new Date(parseInt(item.endtime) * 1000)).format('YYYY-MM-DD');

                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '广告主',this.$t('titles.nick'),'产品线','账户用户名','密码','主手机号','总消耗','总充值','到期时间','销售'];
                            const filterVal = ['advertiserName', 'appname','guanggaozhu','product','prlin', 'a_users','a_password','tel','total_cost','total_pay','endtime','marketname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '账户列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                meitiaccountTable:[],

                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
            screenInput
        },
        computed: {
            ...mapGetters([
                'user',
                'search_list'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.is_useData = criteria.is_useData
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_accountList_name,
                }
            ];
            this.dataInfor.search['Search_str'] = this.search_list. meiti_accountList_name;
            this.dataInfor.search['is_use'] = this.search_list.meiti_accountList_use;
            this.dataInfor.search['search_adname'] = this.search_list.meiti_accountList_account_name;
            this.dataInfor.search['yumingText'] = this.search_list.meiti_accountList_yuming;
            this.dataInfor.search['start_date'] = this.search_list.meiti_accountList_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_accountList_end_date ;
            this.dataInput =this.search_list.meiti_accountList_end_date? [this.search_list.meiti_accountList_start_date,this.search_list.meiti_accountList_end_date]:[];
            this.inputText = this.search_list.meiti_accountList_account_name;
            this.yumingText = this.search_list.meiti_accountList_yuming;
            this.is_use = this.search_list.meiti_accountList_use;
            this.pageSize =  this.search_list.meiti_accountList_page?this.search_list.meiti_accountList_page:20;
            this.pageIndex = this.search_list.meiti_accountList_num ?this.search_list.meiti_accountList_num :1;
            this.kehuTableLength = this.search_list.meiti_accountList_length ?this.search_list.meiti_accountList_length :1;
            this.account_listAllPost(this.page,this.num,this.dataInfor );
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_accountList_use:this.dataInfor.search.is_use,
                    meiti_accountList_name: this.dataInfor.search.Search_str,
                    meiti_accountList_account_name:this.dataInfor.search.search_adname,
                    meiti_accountList_yuming:  this.dataInfor.search.serach_yuming,
                    meiti_accountList_date_type: this.dataInfor.search.date_type,
                    meiti_accountList_start_date: this.dataInfor.search.start_date,
                    meiti_accountList_end_date: this.dataInfor.search.end_date,
                    meiti_accountList_shenhe: this.dataInfor.search.shenhe,
                    meiti_accountList_page:this.pageSize,
                    meiti_accountList_num:this.pageIndex,
                    meiti_accountList_length: this.kehuTableLength,
                });
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
                this.account_listAllPost(this.page,this.num);
                this.searchDataFun();
            },
            //是否使用
            changeUse(val){
                this.dataInfor.search.is_use = this.is_use;
                this.account_listAllPost(this.page,this.num);
                this.searchDataFun();
            },
            outExcel(){
                this.account_listAllPostExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.account_listAllPost(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.account_listAllPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.dataInfor.search.search_adname = this.inputText;
                this.dataInfor.search.serach_yuming = this.yumingText;
                this.account_listAllPost(this.page,this.num,val);
                this.searchDataFun();
            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{},
                };
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.dataInput = [];
                this.inputText = '';
                this.yumingText = '';
                this.is_use = '';
                this.account_listAllPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    meiti_accountList_use:'',
                    meiti_accountList_name: '',
                    meiti_accountList_account_name:'',
                    meiti_accountList_yuming:  '',
                    meiti_accountList_date_type:'',
                    meiti_accountList_start_date:'',
                    meiti_accountList_end_date:'',
                    meiti_accountList_shenhe: '',
                });
            },
              jumpmessage(val){
                  this.$router.push({ name: 'AccountManagement1',query: { id:val} });
              }
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
