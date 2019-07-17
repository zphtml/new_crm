<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >请假列表</span>
            </p>
            <el-col :span="24" class="screen">
                <el-button type="primary" class="qingjia" @click="qingjia">我要请假</el-button>
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
                                label="提交人">
                            <template slot-scope="scope">
                                <div class="xfshow" v-if="scope.row.audit == 0"></div>
                                <div >
                                    {{scope.row.submituser0 | fileFun}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="部门">
                            <template slot-scope="scope">
                                <div style="text-align: center;">
                                    {{scope.row.zhiwu}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"

                                width="230"
                                label="类型">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.type }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                sortable
                                header-align="center"
                                label="请假天数">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.day }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                header-align="center"
                                label="请假时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.starttime | ctimeData}}&nbsp;到&nbsp;{{scope.row.endtime | ctimeData}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="审核状态">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <state :stateData=scope.row ></state>
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
    import { qingjiaList } from '@/api/renshi';
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
                stateData:'',
                listLoading:true,
                qingjiaList:function(page,num,val){
                    this.listLoading = true;
                    qingjiaList({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        let num= 0;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                            num += Number(response.data[i].money)
                        }
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.renshi_qingjia_page?this.search_list.renshi_qingjia_page:20;
                        this.pageIndex = this.search_list.renshi_qingjia_num ?this.search_list.renshi_qingjia_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.fapiaoTable = response.data;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败'); this.listLoading = false;});
                },
                qingjiaListExcel:function(){

                    qingjiaList({
                        page:    this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.submituser0){
                                item['adname'] = item.submituser0.name;
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.starttime) * 1000)).format('YYYY-MM-DD')+'到'+moment(new Date(parseInt(item.endtime) * 1000).toLocaleDateString()).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['提交人', '部门','类型','申请时间','请假时间','请假天数'];
                            const filterVal = ['adname', 'zhiwu', 'shiyou','ctime','b_time','day'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '请假列表');
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
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'qingjia'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.renshi_qingjia_name;
            this.dataInfor.search['date_type'] = this.search_list.renshi_qingjia_date_type?this.search_list.renshi_qingjia_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.renshi_qingjia_start_date;
            this.dataInfor.search['end_date'] = this.search_list.renshi_qingjia_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.renshi_qingjia_shenhe;
            this.dataInput = [this.search_list.renshi_qingjia_start_date,this.search_list.renshi_qingjia_end_date];
            this.date_type = this.search_list.renshi_qingjia_date_type?this.search_list.renshi_qingjia_date_type:1;
            this.shenhe = this.search_list.renshi_qingjia_shenhe;
            this.pageSize =  this.search_list.renshi_qingjia_page?this.search_list.renshi_qingjia_page:20;
            this.pageIndex = this.search_list.renshi_qingjia_num ?this.search_list.renshi_qingjia_num :1;
            this.kehuTableLength = this.search_list.renshi_qingjia_length ?this.search_list.renshi_qingjia_length :1;

            this.qingjiaList(this.page,this.num,this.dataInfor);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.renshi_qingjia_name
                }
            ];

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    renshi_qingjia_name: this.dataInfor.search.Search_str,
                    renshi_qingjia_date_type: this.dataInfor.search.date_type,
                    renshi_qingjia_start_date: this.dataInfor.search.start_date,
                    renshi_qingjia_end_date: this.dataInfor.search.end_date,
                    renshi_qingjia_shenhe: this.dataInfor.search.shenhe,
                    renshi_qingjia_page:this.pageSize,
                    renshi_qingjia_num:this.pageIndex,
                    renshi_qingjia_length:this.kehuTableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.qingjiaList(this.page,this.num);
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
                this.qingjiaList(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.qingjiaList(this.page,this.num);
                this.searchDataFun()
            },
            outExcel(){
                this.qingjiaListExcel();
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.qingjiaList(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.qingjiaList(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.qingjiaList(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
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
                this.kehuTableLength = 0;
                this.qingjiaList(this.page,this.num,this.dataInfor);
                this.searchData({
                    renshi_qingjia_name:'',
                    renshi_qingjia_date_type: '',
                    renshi_qingjia_start_date: '',
                    renshi_qingjia_end_date: '',
                    renshi_qingjia_shenhe: '',
                });
            },
//点击tr
            clickTr(val){

                this.$router.push({ name: 'qingjiashenhe',query: { id: val.id} });
            },
          qingjia(){
            this.$router.push({ name: 'qingjiatetail' });
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
    .fapiaoList {
        width:100%;
        .fapiaoBox {

            .screen {
                margin-bottom: 20px;
                .qingjia {
                    height:32px;
                    font-size: 12px;
                    margin-right: 10px;
                    padding: 0;
                    width:80px;
                }
                .outExcel {
                    border:1px solid #54ADFF;
                    background: none;
                    color: #54ADFF;
                    float: right;
                    height:32px;
                    line-height: 10px;
                    font-size: 12px;
                }
                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;

                    .dropdownBut {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
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
