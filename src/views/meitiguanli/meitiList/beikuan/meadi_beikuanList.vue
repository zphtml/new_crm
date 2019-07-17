<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">媒体列表</span>><span @click="jumpConsole">客户控制台</span>><span>备款账户列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
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
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
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
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="账户">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    <div class="xfshow" v-if="scope.row.advertiser0.customer_type == 1"></div>
                                    {{scope.row.a_users}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                label="媒介合同">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.title}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.name}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                label="备款余额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.yu_e | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="账户币">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.show_money | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="创建时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="结束">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <el-button v-if="scope.row.state == 0   " :disabled="Number(scope.row.yu_e) != 0"  size="mini" type="primary" @click="jieshu(scope.row)">
                                        结束
                                    </el-button>
                                    <soan v-else style="font-size: 12px">
                                        已结束
                                    </soan>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                width="150px"
                                header-align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <el-button type="primary" size="mini"  :disabled="Number(scope.row.yu_e) <= 0"  @click="jump_backMoney(scope.row)">
                                        退款
                                    </el-button>
                                    <el-button type="primary" size="mini"   @click="jump_beikuan(scope.row)">
                                        备款
                                    </el-button>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="详情">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <el-button type="warning" size="mini"   @click="jump_history_infor(scope.row)">
                                        查看
                                    </el-button>
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
    import { beikuan_account_list ,beikuanAccountStatus} from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
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
                screen:[],
                //---------------------
                listLoading:true,
                beikuan_account_list:function(page,num,val){
                    this.dataInfor.search['advertiserid'] = this.routeId;
                    this.listLoading = true;
                    beikuan_account_list({
                        id:'All',
                        data:this.user.auth_key,
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.meiti_account_page?this.search_list.meiti_account_page:20;
                        this.pageIndex = this.search_list.meiti_account_num ?this.search_list.meiti_account_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.fapiaoTable = response.list.data;

                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');  this.listLoading = false;});
                },
                beikuan_account_listExcel:function(page,num,val){
                    this.dataInfor.search['advertiserid'] = this.routeId;
                    beikuan_account_list({
                        id:'All',
                        data:this.user.auth_key,
                        page:page ,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {

                        this.tableData =  response.list.data.filter(function(item,i) {
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.show_money = Number(item.show_money).toFixed(2);
                            item.yu_e = Number(item.yu_e).toFixed(2);
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['账户', '媒介合同','产品线', '备款余额','账户币','创建日期'];
                            const filterVal = ['a_users', 'title', 'name','yu_e','show_money','ctime'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '备款账户列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //结束
                beikuanAccountStatus(accountId,type){
                    beikuanAccountStatus({
                        id:accountId,
                        state:type,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '结束成功',
                                type: 'success'
                            });
                            this.beikuan_account_list(this.page,this.num,this.dataInfor);
                        }
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
                'search_list',
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.options_type = criteria.options_type;
            this.routeId = this.$route.query.id;
            this.dataInfor.search['Search_str'] = this.search_list.meiti_account_beikun_name;
            this.dataInfor.search['date_type'] = this.search_list.meiti_account_beikun_date_type?this.search_list.meiti_account_beikun_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.meiti_account_beikun_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_account_beikun_end_date;
            this.dataInput = [this.search_list.meiti_account_beikun_start_date,this.search_list.meiti_account_beikun_end_date];
            this.date_type = this.search_list.meiti_account_beikun_date_type?this.search_list.meiti_account_beikun_date_type:1;
            this.pageSize =  this.search_list.meiti_account_page?this.search_list.meiti_account_page:20;
            this.pageIndex = this.search_list.meiti_account_num ?this.search_list.meiti_account_num :1;
            this.kehuTableLength = this.search_list.meiti_account_length ?this.search_list.meiti_account_length :1;
            this.beikuan_account_list(this.page,this.num,this.dataInfor);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_account_beikun_name
                }
            ];
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_account_beikun_name: this.dataInfor.search.Search_str,
                    meiti_account_beikun_date_type: this.dataInfor.search.date_type,
                    meiti_account_beikun_start_date: this.dataInfor.search.start_date,
                    meiti_account_beikun_end_date: this.dataInfor.search.end_date,
                    meiti_account_page:this.pageSize,
                    meiti_account_num:this.pageIndex,
                    meiti_account_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.beikuan_account_list(this.page,this.num);
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
                this.beikuan_account_list(this.page,this.num);
                this.searchDataFun()
            },

            outExcel(){
                this.beikuan_account_listExcel(this.page,this.num,this.dataInfor);
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//结束
            jieshu(val){
                this.beikuanAccountStatus(val.id,1)
            },
// 退款
            jump_backMoney(val){
                this.$router.push({ name: 'refund_beikuan',query: { id:val.id}});
            },
// 备款
            jump_beikuan(val){
                this.$router.push({ name: 'Reserve',query: { id:val.contract_id,account_id:val.id}});


            },
//  详情
            jump_history_infor(val){
                this.$router.push({ name: 'beikuanAccountHistory',query: { id:val.id}});
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.beikuan_account_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.beikuan_account_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.beikuan_account_list(this.page,this.num,val);
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
                this.date_type = 1;
                this.dataInput = [];
                this.beikuan_account_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    meiti_account_beikun_name:'',
                });
                this.searchData({
                    meiti_account_beikun_name:'',
                    meiti_account_beikun_date_type: '',
                    meiti_account_beikun_start_date: '',
                    meiti_account_beikun_end_date: '',
                });
            },
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            jumpConsole(){
                this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
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
    @import "src/styles/crmStyle/search.scss";
</style>
