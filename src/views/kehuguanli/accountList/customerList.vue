<template>
    <div class="customerList" >
        <el-row class="customerBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                客户列表
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen=screen  @search="search"  style="display: inline-block;vertical-align: top"></screenInput>
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
                <div class="startInput" style="width: 130px!important;">
                    <el-select style="width: 100%" v-model="liveness" placeholder="请选择活跃度" @change="changeLiveness">
                        <el-option
                                v-for="(item, index) in livenessOption"
                                :key="index"
                                :label="item.label"
                                :value="item.id"
                                :other="item.id">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <div class="dropdownBut">
                        <el-dropdown @command="handleCommand">
                            <el-button  type="primary">
                                分配
                            </el-button >
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">分配商务</el-dropdown-item>
                                <el-dropdown-item command="2">分配销售</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                    <div class="textInfor">
                       <span class="topText" :class="{clickColor:clickColor}" @click="infor">
                           信息
                       </span>
                        <i class="line"></i>
                        <span class="bottomText" :class="{click_Color:click_Color}" @click="Money">
                            款项
                        </span>
                    </div>

                </div>
            </el-col>
            <el-col :span="24" class="customerTable">
                <div v-show="clickColor">
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="customerTable"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div @click="jumpConsole(scope.row,1)">
                                    {{scope.row.advertiser}}
                                    <span class="appInfor qu" v-if="scope.row.customer_type == 2">
                                    渠
                                </span>
                                    <span class="appInfor zhi" v-if="scope.row.customer_type == 1">
                                    直
                                </span>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="简称">
                            <template slot-scope="scope">
                                {{scope.row.appname}}
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
                                label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.ctime | ctimeData}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提交人">
                            <template slot-scope="scope">
                                {{scope.row.submituser0 | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="广告主">
                            <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline" @click="jump_ggz(scope.row)">
                                    {{scope.row.guanggaozhu.length }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="合同数">
                            <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline" @click="jumphetong(scope.row)">
                                {{scope.row.contractnew0.length }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="结算单数">
                            <template slot-scope="scope">
                                <span @click="add_backmoney(scope.row.id)">
                                       {{scope.row.contractaccounts.length}}
                                </span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="执行框架数">
                            <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline" @click="jumpxieyihetong(scope.row)">
                                      {{scope.row.contract0.length }}
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="客户统计">
                            <template slot-scope="scope">
                                <img src="../../../assets/tj.png" style="width: 30px;height: 30px;color: #54adff;"  @click="jump_tj(scope.row)"  alt="">
                            </template>
                        </el-table-column>


                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <div class="kh_operation" style="text-align: center">
                                    <el-tooltip content="控制台" placement="left" effect="light">
                                        <i class="el-icon-menu"  @click="jumpConsole(scope.row,1)"></i>
                                    </el-tooltip>
                                    <span class="line"></span>
                                    <img src="../../../assets/pen.png"  @click="jumpConsole(scope.row,2)" style="width: 18px;height: 18px;" alt="">
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
                <div  v-show="click_Color">
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="customerTable"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser}}
                                <span class="appInfor qu" v-if="scope.row.customer_type == 2">
                                    渠
                                </span>
                                <span class="appInfor zhi" v-if="scope.row.customer_type == 1">
                                    直
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="简称">
                            <template slot-scope="scope">
                                {{scope.row.appname}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="余额">
                            <template slot-scope="scope">
                                {{Number( scope.row.huikuan)+Number( scope.row.bukuan)- Number( scope.row.yu_e) - Number(scope.row.margin_money) -  Number(scope.row.kehu_bukuan) | currency('') }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="huikuan"
                                label="补款">
                            <template slot-scope="scope">
                                {{scope.row.bukuan | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="huikuan"
                                label="总回款余额">
                            <template slot-scope="scope">
                                {{scope.row.huikuan | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="huikuan"
                                label="总充值余额">
                            <template slot-scope="scope">
                                {{scope.row.yu_e | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="fapiao"
                                label="总发票 ">
                            <template slot-scope="scope">
                                {{scope.row.fapiao | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                sortable
                                label="未分配金额">
                            <template slot-scope="scope">
                                {{scope.row.undistributed_yu_e | currency('') }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提交人">
                            <template slot-scope="scope">
                                {{scope.row.submituser0 | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="客户统计">
                            <template slot-scope="scope">
                                <img src="../../../assets/tj.png" style="width:30px;height:30px" @click="jump_tj(scope.row)"  alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <div class="kh_operation" style="text-align: center">
                                    <el-tooltip content="控制台" placement="right" effect="light">
                                        <i class="el-icon-menu"  @click="jumpConsole(scope.row,1)"></i>
                                    </el-tooltip>
                                    <span class="line"></span>
                                    <img src="../../../assets/pen.png" style="width:20px;height:20px" @click="jumpConsole(scope.row,2)"  alt="">
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
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { customerList,customer_listPost } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {

        data() {
            return {
                helpVisibleReceive:false,
                dataInfor : {
                    search:{},
                },
                screen:'',
                dataInput:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //活跃度
                liveness:'',
                livenessOption:[],
                //----------------
                listLoading:true,
                customer_listPost:function(val){
                    this.listLoading = true;
                    customer_listPost({
                        id:this.user.id,
                        data:this.user.auth_key,
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.kehuList_page?this.search_list.kehuList_page:20;
                        this.pageIndex = this.search_list.kehuList_num ?this.search_list.kehuList_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.customerTable = response.list.data;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');   this.listLoading = false;});
                },
                tableData:[],
                customer_listPostExcel:function(page,num,val){
                    customer_listPost({
                        id:this.user.id,
                        data:this.user.auth_key,
                        page: this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.list.data.filter(function(item,i) {
                            item['kh_yu_e'] =Number( item.huikuan)+Number( item.bukuan)- Number( item.yu_e) - Number(item.margin_money) -  Number(item.kehu_bukuan)
                            if(item.audit == 1){
                                item.audit =  "已审核"
                            }else{
                                item.audit =  "未通过"
                            }
                            if(item.contact[0]){
                                item['contactName'] = item.contact[0].name;
                                item['contactTel'] = item.contact[0].tel;
                            }
                            if(item.submituser0){
                                item['submituserName'] = item.submituser0.name;
                            }

                            item.contract0Length = item.contract0.length;
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        })
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), 'app名称','余额','补款','总回款','总充值','总发票','未分配金额','创建时间','销售','AE','活跃度'];
                            const filterVal = ['advertiser', 'appname','kh_yu_e','bukuan','huikuan','yu_e','fapiao','undistributed_yu_e','ctime','submituserName','bussname','liveness'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '客户列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                customerTable:[],
                customerList:function(page,num){
                    customerList({
                        id:this.user.id,
                        data:this.user.auth_key,
                        page:page,
                        num:num,

                    }).then(response => {
                        this.customerTable = response.list.data;
                        this.kehuTableLength =  response.list.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //分页
                page:20,
                num:1,
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
                'search_list',
            ])
        },
        created() {

        },
        watch:{
            user:function(newValue){
            },
        },
        destroyed() {
            console.log('destroyed')
        },
        mounted(){
            this.livenessOption = criteria.livenessOption;
            this.dataInfor.search['Search_str'] = this.search_list.kehuList_name;
            this.dataInfor.search['start_date'] = this.search_list.kehuList_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehuList_end_date;
            this.dataInfor.search['liveness'] = this.search_list.kehuList_liveness;
            this.dataInput = [this.search_list.kehuList_start_date,this.search_list.kehuList_end_date];
            this.liveness = this.search_list.kehuList_liveness ;
            this.pageSize =  this.search_list.kehuList_page?this.search_list.kehuList_page:20;
            this.pageIndex = this.search_list.kehuList_num ?this.search_list.kehuList_num :1;
            this.kehuTableLength = this.search_list.kehuList_length ?this.search_list.kehuList_length :1;
            this.customer_listPost();
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.kehuList_name
                }
            ]
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData'
            ]),
            searchDataFun(){
                this.searchData({
                    kehuList_start_date:  this.dataInfor.search.start_date,
                    kehuList_end_date:this.dataInfor.search.end_date ,
                    kehuList_name:this.dataInfor.search.Search_str,
                    kehuList_liveness:this.dataInfor.search.liveness,
                    kehuList_page:this.pageSize,
                    kehuList_num:this.pageIndex,
                    kehuList_length:this.kehuTableLength,
                });
            },
            //搜索
            search(val){
                this.dataInfor.search.Search_str = val;
             this.searchDataFun();
                this.customer_listPost();
            },
            //日期
            changedate(){
                let start_date = '';
                let end_date = '';
                if(this.dataInput){
                    start_date = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    end_date = moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    start_date = '';
                    end_date = '';
                };
                this.dataInfor.search.start_date = start_date;
                this.dataInfor.search.end_date = end_date;
                this.searchDataFun();

                this.customer_listPost();
            },
            //活跃度
            changeLiveness(val){
                this.dataInfor.search.liveness = this.liveness;
                this.searchDataFun();
                this.customer_listPost();
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{},
                };
                this.searchData({
                    kehuList_name:'',
                    kehuList_start_date:'',
                    kehuList_end_date:'',
                    kehuList_liveness:'',
                });
                this.screen = [
                    {
                        name:'搜索',
                        data:''
                    }
                ];
                this.dataInput =[];
                this.liveness = '';
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.customer_listPost();
            },
            help(){
                this.helpVisibleReceive = true;
            },
// 添加回款
            add_backmoney(val){
                this.$router.push({ name: 'addbackMoney',query: { id: val} });
                this.Account({
                    id:val.id,
                    name:val.name,
                })
            },
            //导出
            outExcel(){
                this.customer_listPostExcel(this.page,this.pageIndex,this.dataInfor);

            },
            jump_ggz(val){
                this.$router.push({ name: 'Advertiser', query: { id: val.id}});
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //款项
            infor(){
                this.click_Color = false;
                this.clickColor = true;
            },
            Money(){
                this.click_Color = true;
                this.clickColor = false;
            },
            //新加合同  type:1 合同，2 协议
            jumphetong(val){
                this.$router.push({ name: 'Contractlist', query: { id: val.id,type:1}});
                this.Account({
                    id:val.id,
                    name:val.name,
                })

            },
            jumpxieyihetong(val){
                this.$router.push({ name: 'Contractlist', query: { id: val.id,type:2}});
                this.Account({
                    id:val.id,
                    name:val.name,
                })
            },
            //分配
            handleCommand(handleCommand){
                this.$router.push({ name: 'fenpeishangwu' , query: { id: handleCommand}});
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.customer_listPost(this.dataInfor);

                }
                this.searchDataFun();

            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.searchDataFun();
                this.customer_listPost(this.dataInfor);
            },

//客户统计
            jump_tj(val){
                this.$router.push({ name: 'dataStatistics'});
                this.Account({
                    id:val.id,
                    name:val.name,
                })
            },
//跳转
            jumpConsole(val,data){
                this.$router.push({ name: 'console',query: { type: data} });
                this.Account({
                    id:val.id,
                    name:val.advertiser,
                })

            },
        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            fileFunaccount(val){
                if(val){
                    return val
                }else{
                    return "---"
                }
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },

            fileFunName(val){
                if(val){
                    if(val[0]){
                        return val[0].name
                    }else{
                        return '---'
                    }

                }else{
                    return '---'
                }
            },
            fileFunTel(val){
                if(val){
                    if(val[0]){
                        return val[0].tel
                    }else{
                        return '---'
                    }
                }else{
                    return '---'
                }
            },
            fileFun(val){
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
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .customerList {
        width:100%;
        .customerBox {
            .screen {
                margin-bottom: 20px;
                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;
                    .dropdownBut {
                        margin-right: 10px;
                        display: inline-block;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
                        line-height: 32px;
                        padding: 0;
                        font-size: 12px;
                    }
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
                        cursor: pointer;
                        z-index:999;
                        height:32px;
                        font-size: 12px;
                    }
                    .textInfor {
                        width:65px;
                        height:32px;
                        line-height: 10px;
                        display: inline-block;
                        font-size: 14px;
                        position: relative;
                        margin-left: 30px;
                        span{
                            cursor: pointer;
                        }
                        .clickColor {
                            color: #0587ff;
                        }
                        .click_Color {
                            color: #0587ff;
                        }
                        span:hover{
                            color: #0587ff;
                        }
                        .topText {
                            position: absolute;
                            top:0;
                            left:0;
                        }
                        .line{
                            width:1px;
                            height: 40px;
                            background: #e3e3e3;
                            transform:rotate(45deg);
                            -ms-transform:rotate(45deg); 	/* IE 9 */
                            -moz-transform:rotate(45deg); 	/* Firefox */
                            -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                            -o-transform:rotate(45deg);
                            position: absolute;
                            left: 30px;
                            top: -2px;
                        }
                        .bottomText{
                            position: absolute;
                            bottom:0;
                            right:0;
                        }
                    }
                }
            }
            .customerTable {
                .vue-table {
                    .cell{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        .add {
                            display: inline-block;
                            width:20px;
                            height:20px;
                            text-align: center;
                            line-height: 22px;
                            background: #54adff;
                            color: white;
                            border-radius: 50%;
                            margin-left: 5px;
                            .icon{
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: normal;
                            }
                        }
                    }
                    .appInfor {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        text-align: center;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius: 50%;
                    }
                    .appInfor.qu{
                        color: white;
                        background: #FF8754;
                    }
                    .appInfor.zhi{
                        color: white;
                        background: #3F7FFC;
                    }
                    .el-table__header{
                        thead {
                            th:nth-last-child(2){
                                .cell {

                                    text-align: center;
                                }
                            }
                        }
                    }

                    .kh_operation {
                        color: #54adff;
                        width:100%;
                        height:100%;
                        vertical-align: middle;
                        font-size: 22px;
                        font-weight: 600;
                        .line{
                            display: inline-block;
                            width:1px;
                            height:24px;
                            background: #bbbbbb;
                            vertical-align: middle;
                            margin:0 6%;
                        }
                        i{
                            cursor: pointer;
                        }
                    }
                }
                .addKehu{
                    position: absolute;
                    top: 23px;
                    left: 20px;
                    font-weight: bold;
                    text-decoration: underline;
                    font-size: 16px;
                    cursor: pointer;
                }
            }

        }
        .signal {
            display: inline-block;
            span{
                width:4px;
                display: inline-block;
                margin: 0 1px;
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
