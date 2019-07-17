<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">媒体列表</span>><span @click="jumpConsole">客户控制台</span>><span>媒体补款列表</span>
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
                                <div class="xfshow" v-if="scope.row.advertiser0.customer_type == 1"></div>
                                {{scope.row.advertiser0 | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="简称">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.appname}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                width="230"
                                label="补款金额">
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
    import { meijie_bukuan_list } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
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
                //----------------
                listLoading:true,
                meijie_bukuan_list:function(page,num,val){
                    this.listLoading = true;
                    meijie_bukuan_list({
                        page: this.pageSize,
                        num: this.pageIndex,

                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.fapiaoTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.meiti_fakuan_page?this.search_list.meiti_fakuan_page:20;
                        this.pageIndex = this.search_list.meiti_fakuan_num ?this.search_list.meiti_fakuan_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');   this.listLoading = false;});
                },
                meijie_bukuan_listExcel:function(page,num,val){

                    meijie_bukuan_list({
                        page: this.kehuTableLength,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {

                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['submituserName'] = item.advertiser0.advertiser;
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.b_time) * 1000)).format('YYYY-MM-DD');
                            item['m_yu_e'] =  Number(item.dakuan)- Number(item.yu_e);
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '补款金额','打款日期','创建日期','汇款人','提交人'];
                            const filterVal = ['submituserName', 'appname', 'money','b_time','ctime','huikuanren','submitname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '补款列表');
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
                'accounts',
                'search_list',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.options_type = criteria.options_type;
            this.dataInfor.search['Search_str'] = this.accounts.advertiser;
            this.dataInfor.search['date_type'] = this.search_list.meiti_console_bukuan_type?this.search_list.meiti_console_bukuan_type:1;
            this.dataInfor.search['start_date'] = this.search_list.meiti_fakuan_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_fakuan_end_date;
            this.dataInput = [this.search_list.meiti_fakuan_start_date,this.search_list.meiti_fakuan_end_date];
            this.date_type = this.search_list.meiti_console_bukuan_type?this.search_list.meiti_console_bukuan_type:1;
            this.pageSize =  this.search_list.meiti_fakuan_page?this.search_list.meiti_fakuan_page:20;
            this.pageIndex = this.search_list.meiti_fakuan_num ?this.search_list.meiti_fakuan_num :1;
            this.kehuTableLength = this.search_list.meiti_fakuan_length ?this.search_list.meiti_fakuan_length :1;

            this.meijie_bukuan_list(this.page,this.num,this.dataInfor);
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'meijie-bukuan'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.screen = [
                {
                    name:'搜索',
                    data: this.accounts.advertiser
                }
            ];

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_console_bukuan_type: this.dataInfor.search.date_type,
                    meiti_fakuan_start_date: this.dataInfor.search.start_date,
                    meiti_fakuan_end_date: this.dataInfor.search.end_date,
                    meiti_fakuan_page:this.pageSize,
                    meiti_fakuan_num:this.pageIndex,
                    meiti_fakuan_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.meijie_bukuan_list(this.page,this.num);
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
                this.meijie_bukuan_list(this.page,this.num);
                this.searchDataFun()
            },
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            jumpConsole(){
                this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
            },
            outExcel(){
                this.meijie_bukuan_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_bukuan_list(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;

                this.meijie_bukuan_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_bukuan_list(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.dataInfor.search['Search_str'] = this.accounts.advertiser;
                this.screen =[
                    {
                        name:'搜索',
                        data: this.accounts.advertiser
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.meijie_bukuan_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    meiti_console_bukuan_type: '',
                    meiti_fakuan_start_date: '',
                    meiti_fakuan_end_date: '',
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'mediareplenishment',query: { id:val.id} });

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
    .fapiaoList {
        width:100%;
        .fapiaoBox {

            .screen {
                margin-bottom: 20px;
                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
                    }
                    .dropdownBut {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
                        line-height: 10px;
                        font-size: 12px;
                        vertical-align: top;
                    }
                    .textInfor {
                        width:65px;
                        height:32px;
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
            .fapiaoTable {
                .vue-table {
                    .cell{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        .xfshow {
                            position: absolute;
                            left: 0;
                            top:0;
                            width: 0;
                            height: 0;
                            border-top: 10px solid #ff4081;
                            border-right: 10px solid transparent;
                        }
                        .appInfor {
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            text-align: center;
                            line-height: 20px;
                            font-size: 12px;
                            border-radius: 50%;
                            display: inline-block;
                        }
                        .appInfor.qu{
                            color: white;
                            background: #FF8754;
                        }
                        .appInfor.zhi{
                            color: white;
                            background: #3F7FFC;
                        }
                    }
                    .operation {
                        color: #54adff;
                        width:100%;
                        height:100%;
                        vertical-align: middle;
                        font-size: 18px;
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
                    .start_icon {
                        display: inline-block;
                        margin:0 2%;
                        font-size: 16px;

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

    }
    @media(max-width: 1280px) {
        .fapiaoTable {
            .vue-table {
                .operation {
                    font-size: 12px!important;
                }
            }
        }
    }
</style>
