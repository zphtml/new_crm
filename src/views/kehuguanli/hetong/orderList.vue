<template>
    <div class="kuhuList" >
        <el-row class="kuhuBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >下单列表</span>
            </p>
            <el-col :span="24" class="screen">
                <div class="searchInput">
                    <input type="text" class="search" placeholder="请输入公司名" v-model='accountText'  >
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
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
            <el-col :span="24" class="kuhuTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kuhuTable"
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
                                        {{scope.row.money | currency('')}}
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
                                        {{scope.row.rebates_proportion | currency('')}}
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
    import { renew_list,renew_list_post } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"

    export default {
        data() {
            return {
                dataInfor: {
                    search:{
                        date_type:1,
                    }
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
                //--------------------
                screen:'',
                stateData:'',
                listLoading:true,
                renew_list_post:function(page,num,val){
                    this.dataInfor.search['xiadan'] = 1;
                    this.listLoading = true;
                    renew_list_post({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.data.length;i++){
                            if(response.data.data[i].is_xiadan == "0"){
                                response.data.data[i]['audit_countType'] = this.audit_count_xufei;
                            }else{
                                response.data.data[i]['audit_countType'] = this.audit_count;
                            }
                        }
                        this.kuhuTable = response.data.data;

                        this.kehuTableLength =  response.data.totalCount;
                        this.pageSize =  this.search_list.xiadan_page?this.search_list.xiadan_page:20;
                        this.pageIndex = this.search_list.xiadan_num ?this.search_list.xiadan_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');   this.listLoading = false;});
                },
                renew_list_postExcel:function(page,num){
                    this.dataInfor.search['xiadan'] = 1;
                    renew_list_post({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        })
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '广告主',this.$t('titles.nick'),'简称', '金额',this.$t('titles.fandian'), '账户', '产品线','创建日期','提交人','备注'];
                            const filterVal = ['adname','guanggaozhu','product', 'appname', 'money','rebates_proportion','a_users', 'prlina','ctime','submitname','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '下单列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
                audit_count_xufei:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                kuhuTable:[],
                renew_list:function(page,num){
                    renew_list({
                        page:page,
                        num:num,
                    }).then(response => {
                        for(let i = 0;i<response.data.data.length;i++){
                            response.data.data[i]['audit_countType'] = this.audit_count;
                        }

                        this.kuhuTable =  response.data.data;
                        this.kehuTableLength =  response.data.totalCount;
                    }). catch(err => {this.$message.error('获取失败');});
                },
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
            this.options_type = criteria.options_type;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'xiadan'){
                    this.audit_count = this.audit_action[i].audit_count;
                }else if(this.audit_action[i].action_name =='renew'){
                    this.audit_count_xufei = this.audit_action[i].audit_count;
                }
            }
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.xiadan_name,
                }
            ];
            this.accountText = this.search_list.xiadan_account_name;
            this.dataInfor.search['date_type'] = this.search_list.xiadan_date_type?this.search_list.xiadan_date_type:1;
            this.dataInfor.search['Search_str'] = this.search_list.xiadan_name;
            this.dataInfor.search['search_adname'] = this.search_list.xiadan_account_name;
            this.dataInfor.search['start_date'] = this.search_list.xiadan_start_date;
            this.dataInfor.search['end_date'] = this.search_list.xiadan_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.xiadan_shenhe;
            this.dataInput = [this.search_list.xiadan_start_date,this.search_list.xiadan_end_date];
            this.date_type = this.search_list.xiadan_date_type?this.search_list.xiadan_date_type:1;
            this.shenhe = this.search_list.xiadan_shenhe;
            this.pageSize =  this.search_list.xiadan_page?this.search_list.xiadan_page:20;
            this.pageIndex = this.search_list.xiadan_num ?this.search_list.xiadan_num :1;
            this.kehuTableLength = this.search_list.xiadan_length ?this.search_list.xiadan_length :1;

            this.renew_list_post(this.page,this.num);


        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    xiadan_name: this.dataInfor.search.Search_str,
                    xiadan_account_name:this.dataInfor.search.search_adname,
                    xiadan_date_type: this.dataInfor.search.date_type,
                    xiadan_start_date: this.dataInfor.search.start_date,
                    xiadan_end_date: this.dataInfor.search.end_date,
                    xiadan_shenhe: this.dataInfor.search.shenhe,
                    xiadan_page:this.pageSize,
                    xiadan_num:this.pageIndex,
                    xiadan_length: this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.renew_list_post(this.page,this.num);
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
                this.renew_list_post(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.renew_list_post(this.page,this.num);
                this.searchDataFun()
            },


//导出
            outExcel(){
                this.renew_list_postExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.renew_list_post(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.renew_list_post(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.dataInfor.search.search_adname = this.accountText;
                this.renew_list_post(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor= {
                    search:{
                        date_type:1,
                    }
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
                this.accountText = '';
                this.dataInput = [];
                this.shenhe = '';
                this.date_type = 1;
                this.renew_list_post(this.page,this.num,this.dataInfor);
                this.searchData({
                    xiadan_name:"",
                    xiadan_account_name:"",
                    xiadan_start_date: '',
                    xiadan_end_date: '',
                    xiadan_shenhe: '',
                });
            },
//点击tr
            clickTr(val){
                if(val.is_xiadan == "0"){
                    this.$router.push({ name: 'renew',query: { id:val.id} });
                }else{
                    this.$router.push({ name: 'orderdetails', query: { id: val.id} });
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
