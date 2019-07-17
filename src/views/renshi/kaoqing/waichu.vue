<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >外出列表</span>
            </p>
            <el-col :span="24" class="screen">
                <el-button type="primary" class="qingjia" @click="qingjia">我要外出</el-button>
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
                                label="部门">
                            <template slot-scope="scope">
                                {{scope.row.zhiwu}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"

                                width="230"
                                label="外出公司">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.gongsi }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"

                                width="230"
                                label="外出联系人">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.lianxiren }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                sortable
                                header-align="center"
                                label="申请时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.ctime | ctimeData}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                header-align="center"
                                label="外出时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.starttime | ctimeData}}&nbsp;到&nbsp;{{scope.row.endtime | ctimeData}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <state :stateData=scope.row ></state>
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
    import { waichu_list } from '@/api/renshi';
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
                waichu_list:function(page,num,val){
                    this.listLoading = true;
                    waichu_list({
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
                        this.pageSize =  this.search_list.renshi_waichu_page?this.search_list.renshi_waichu_page:20;
                        this.pageIndex = this.search_list.renshi_waichu_num ?this.search_list.renshi_waichu_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.fapiaoTable = response.data;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');    this.listLoading = false;});
                },
                waichu_listExcel:function(){

                    waichu_list({
                        page:    this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.submituser0){
                                item['adname'] = item.submituser0.name;
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.starttime) * 1000)).format('YYYY-MM-DD')+'到'+moment(new Date(parseInt(item.endtime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['提交人', '部门','外出公司','外出联系人','申请时间','外出时间'];
                            const filterVal = ['adname', 'zhiwu','gongsi','lianxiren', 'ctime','b_time'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '外出列表');
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
                if(this.audit_action[i].action_name == 'waichu'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.renshi_waichu_name;
            this.dataInfor.search['date_type'] = this.search_list.renshi_waichu_date_type?this.search_list.renshi_waichu_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.renshi_waichu_start_date;
            this.dataInfor.search['end_date'] = this.search_list.renshi_waichu_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.renshi_waichu_shenhe;
            this.dataInput = [this.search_list.renshi_waichu_start_date,this.search_list.renshi_waichu_end_date];
            this.date_type = this.search_list.renshi_waichu_date_type?this.search_list.renshi_waichu_date_type:1;
            this.shenhe = this.search_list.renshi_waichu_shenhe;
            this.pageSize =  this.search_list.renshi_waichu_page?this.search_list.renshi_waichu_page:20;
            this.pageIndex = this.search_list.renshi_waichu_num ?this.search_list.renshi_waichu_num :1;
            this.kehuTableLength = this.search_list.renshi_waichu_length ?this.search_list.renshi_waichu_length :1;

            this.waichu_list(this.page,this.num,this.dataInfor);
            this.screen =[
                {
                    name:'搜索',
                    data: this.search_list.renshi_waichu_name
                }
            ];

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                   renshi_waichu_name: this.dataInfor.search.Search_str,
                   renshi_waichu_date_type: this.dataInfor.search.date_type,
                   renshi_waichu_start_date: this.dataInfor.search.start_date,
                   renshi_waichu_end_date: this.dataInfor.search.end_date,
                   renshi_waichu_shenhe: this.dataInfor.search.shenhe,
                    renshi_waichu_page:this.pageSize,
                    renshi_waichu_num:this.pageIndex,
                    renshi_waichu_length:this.kehuTableLength,
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.waichu_list(this.page,this.num);
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
                this.waichu_list(this.page,this.num);
                this.searchDataFun()
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.waichu_list(this.page,this.num);
                this.searchDataFun()
            },

            outExcel(){
                this.waichu_listExcel();
            },
            qingjia(){
                this.$router.push({ name: 'waichudetail' });
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.waichu_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.waichu_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.waichu_list(this.page,this.num,val);
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
                this.kehuTableLength =0 ;
                this.waichu_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    renshi_waichu_name:'',
                    renshi_waichu_date_type: '',
                    renshi_waichu_start_date: '',
                    renshi_waichu_end_date: '',
                    renshi_waichu_shenhe: '',
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'waichushenhe',query: { id: val.id} });

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
</style>
