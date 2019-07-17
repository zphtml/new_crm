<template>
    <div class="meitiList" >
        <el-row class="meitiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >媒体列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dataInput">
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
                    <el-button type="primary" size="small"  @click="addmeiti">新建媒体</el-button>
                    <el-button type="success" plain size="small" @click="outExcel">导出Excel</el-button>

                </div>
            </el-col>
            <el-col :span="24" class="meitiTable">
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="meitiTable"
                        class="vue-table"
                        height="740"
                        style="width: 100%">
                    <el-table-column
                            label="媒体名称">
                        <template slot-scope="scope">
                            <div @click="jumpmMitiConsole(scope.row,1)">
                                {{scope.row.advertiser}}
                                <span class="appInfor qu" v-if="scope.row.customer_type ==2">
                                    渠
                                </span>
                                <span class="appInfor zhi" v-if="scope.row.customer_type == 2">
                                    直
                                </span>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间">
                        <template slot-scope="scope">
                            {{scope.row.ctime | ctimeData}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="活跃度">
                        <template slot-scope="scope">
                            <div class="signal " @click="help"  style="cursor: help" :class="{signal1:scope.row.liveness == 1,signal2:scope.row.liveness == 2,signal3:scope.row.liveness == 3,signal4:scope.row.liveness == 4,signal5:scope.row.liveness == 5}">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="余额">
                        <template slot-scope="scope">
                            {{ scope.row.yu_e| currency('')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="打款金额">
                        <template slot-scope="scope">
                            {{ scope.row.dakuan | currency('')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="合同数">
                        <template slot-scope="scope">
                            <div   @click="jumphetong(scope.row)">
                                {{ scope.row.contractnew0.length }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="执行框架数">
                        <template slot-scope="scope">
                            <div  @click="addhetong(scope.row)">
                                {{ scope.row.contract0.length }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <div class="mt_operation" style="text-align: center">
                                <i class="el-icon-menu"  @click="jumpmMitiConsole(scope.row,1)"></i>
                                <span class="line"></span>
                                <img src="../../../assets/pen.png" style="width:18px;height:18px" @click="jumpmMitiConsole(scope.row,2)"  alt="">
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
                <el-dialog title="活跃度" :visible.sync="helpVisibleReceive" @close="helpVisibleReceive = false"  size="tiny" class="tan">


                    <div>
                        <div class="signal signal1" @click="help"  style="cursor: help" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>：一年内未操作账户</div>
                    <div>
                        <div class="signal signal2" @click="help" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>：90天内未操作账户</div>
                    <div>
                        <div class="signal signal3" @click="help">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>：30天内未操作账户</div>
                    <div>
                        <div class="signal signal4" @click="help" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>：7天内未操作账户</div>
                    <div>
                        <div class="signal signal5" @click="help" >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>：1天内未操作账户</div>
                </el-dialog>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { meijie_customer_listPost } from '@/api/meiti';
    import permissionRoutes from '@/store/permission';
    import screenInput from '@/components/search/search';
    import moment from "moment"
    export default {
        data() {
            return {
                helpVisibleReceive:false,
                dataInfor : {
                    search:{},
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //======================
                permissionRoutes: permissionRoutes.get(this.$route),
                screen:'',
                stateData:'',
                label:'',
                listLoading:true,
                meijie_customer_listPost:function(page,num,val){
                    this.listLoading = true;
                    meijie_customer_listPost({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kehuTableLength = response.list.totalCount;
                        this.pageSize =  this.search_list.meitiLlist_page?this.search_list.meitiLlist_page:20;
                        this.pageIndex = this.search_list.meitiLlist_num ?this.search_list.meitiLlist_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.meitiTable = response.list.data;

                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');this.listLoading = false;});
                },
                meijie_customer_listPostExcel:function(page,num,val){
                    meijie_customer_listPost({
                        page:this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {

                        this.tableData =  response.list.data.filter(function(item,i) {
                            if(item.submituser0){
                                item['submituserName'] = item.submituser0.name;
                            }
                            item['contractLength'] = item.contract0.length;
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');

                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['媒体名称','余额','打款金额', '创建时间', '提交人','合同数','活跃度'];
                            const filterVal = ['advertiser', 'yu_e','dakuan','ctime', 'submituserName','contractLength','liveness'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '媒体列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                meitiTable:[],
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
            let data = '';
            for(var i = 0;i<this.permissionRoutes.length;i++){
                if(this.permissionRoutes[i].name == this.$route.name){
                    data = 'true';
                    break;
                }else{
                    data = 'false';
                }
            }
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'renew'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            if(data == 'false'){
                this.$router.push({ name: this.permissionRoutes[0].children[0].name, });
            }else{
                this.dataInfor.search['Search_str'] = this.search_list.meitiLlist_name;
                this.dataInfor.search['start_date'] = this.search_list.meitiLlist_start_date;
                this.dataInfor.search['end_date'] = this.search_list.meitiLlist_end_date;
                this.dataInput = [this.search_list.meitiLlist_start_date,this.search_list.meitiLlist_end_date];
                this.pageSize =  this.search_list.meitiLlist_page?this.search_list.meitiLlist_page:20;
                this.pageIndex = this.search_list.meitiLlist_num ?this.search_list.meitiLlist_num :1;
                this.kehuTableLength = this.search_list.meitiLlist_length ?this.search_list.meitiLlist_length :1;
                this.meijie_customer_listPost(this.page,this.num,this.dataInfor);

                this.screen = [
                    {
                        name:'搜索',
                        data: this.search_list.meitiLlist_name
                    }
                ];
            }
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData'
            ]),
            searchDataFun(){
                this.searchData({
                  meitiLlist_start_date:  this.dataInfor.search.start_date,
                  meitiLlist_end_date:this.dataInfor.search.end_date ,
                  meitiLlist_name:this.dataInfor.search.Search_str,
                  meitiLlist_liveness:this.dataInfor.search.liveness,
                    meitiLlist_page:this.pageSize,
                    meitiLlist_num:this.pageIndex,
                    meitiLlist_length:this.kehuTableLength,
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
                this.meijie_customer_listPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
            help(){
                this.helpVisibleReceive = true;
            },
            addhetong(val){
                this.$router.push({ name: 'MediacompactList', query: { id: val.id,type:2}});
                this.Account(val)
            },
// 合同数
            jumphetong(val){
                this.$router.push({ name: 'MediacompactList', query: { id: val.id,type:1}});
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            outExcel(){
                this.meijie_customer_listPostExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            addmeiti(){
                this.$router.push({ name: 'addMedia' });
            },
            jumpmMitiConsole(val,data){
                this.$router.push({ name: 'mediaConsole',query: { type:data} });
                this.Account(val)
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_customer_listPost(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.meijie_customer_listPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_customer_listPost(this.page,this.num,val);
                this.searchDataFun();
            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{},
                };
                this.screen = [
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.dataInput = [];
                this.meijie_customer_listPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    meitiLlist_name:'',
                  meitiLlist_start_date:'',
                  meitiLlist_end_date:'',
                  meitiLlist_liveness:'',
                });
            },
//点击tr
            clickTr(val){


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
                    return val.name
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
    .meitiList {
        .meitiTable {
            .vue-table {


                .mt_operation {
                    color: #54adff;
                    width:100%;
                    height:100%;
                    vertical-align: middle;
                    font-size: 22px;
                    .line{
                        display: inline-block;
                        width:1px;
                        height:24px;
                        background: #bbbbbb;
                        vertical-align: middle;
                        margin:0 12%;
                    }
                    i{
                        cursor: pointer;
                    }
                }
            }
        }
        .signal {
            display: inline-block;
            span{
                width:4px;
                margin: 0 1px;
                display: inline-block;
                vertical-align: bottom;
                background: #e0e0e0;
            }
            span:first-child{
                height: 4px;
            }
            span:nth-child(2){
                height: 8px;
            }
            span:nth-child(3){
                height: 12px;
            }
            span:nth-child(4){
                height: 16px;
            }
            span:nth-child(5){
                height: 20px;
            }
        }
        .signal1 {
            display: inline-block;
            vertical-align: middle;
            span:first-child{
                background: #ff4811;
            }
            span:nth-child(2){
                background: #ECF0FF;
            }
            span:nth-child(3){
                background: #ECF0FF;
            }
            span:nth-child(4){
                background: #ECF0FF;
            }
            span:nth-child(5){
                background: #ECF0FF;
            }
        }
        .signal2{
            span:first-child{
                background: #fe9e00;
            }
            span:nth-child(2){
                background: #fe9e00;
            }
            span:nth-child(3){
                background: #ECF0FF;
            }
            span:nth-child(4){
                background: #ECF0FF;
            }
            span:nth-child(5){
                background: #ECF0FF;
            }
        }
        .signal3{
            span:first-child{
                background: #ffc000;
            }
            span:nth-child(2){
                background: #ffc000;
            }
            span:nth-child(3){
                background: #ffc000;
            }
            span:nth-child(4){
                background: #ECF0FF;
            }
            span:nth-child(5){
                background: #ECF0FF;
            }
        }
        .signal4{
            span:first-child{
                background: #8fc31f;
            }
            span:nth-child(2){
                background: #8fc31f;
            }
            span:nth-child(3){
                background: #8fc31f;
            }
            span:nth-child(4){
                background: #8fc31f;
            }
            span:nth-child(5){
                background: #ECF0FF;
            }
        }
        .signal5{
            span:first-child{
                background: #22ac38;
            }
            span:nth-child(2){
                background: #22ac38;
            }
            span:nth-child(3){
                background: #22ac38;
            }
            span:nth-child(4){
                background: #22ac38;
            }
            span:nth-child(5){
                background: #22ac38;
            }
        }
        .tan {
            .el-dialog {
                width: 200px;
                .el-dialog__header {
                    text-align: center;
                }
                .el-dialog__body {
                    padding: 10px;
                }
            }

        }
    }
</style>
