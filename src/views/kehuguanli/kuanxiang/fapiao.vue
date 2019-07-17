<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >发票列表</span>
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
                <div class="startInput"  >
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
                <div class="startInput"  >
                    <el-select v-model="backMoney" placeholder="筛选回款" @change="changeBackMoney">
                        <el-option
                                v-for="(item, index) in backMoneyData"
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
                                label="广告主">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.guanggaozhu | fileFun1}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                width="230"
                                :label="label">
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
    import { fapiaoPost } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    const currency = require('@/../node_modules/vue2-filters/src/other/currency');
    import moment from "moment"
    export default {
        data() {
            return {
                //搜索条件
                dataInfor : {
                    search:{
                        f_type:1,
                    },
                },
                dataInput:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                screen:'',
                shenhe:'',
                shenheData:[],
                backMoney:'',
                backMoneyData:[],
                //-----------------------------------
                label:'',
                listLoading:true,
                fapiaoPost:function(page,num,val){
                    fapiaoPost({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.listLoading = false;
                        let num= 0;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;

                        }

                        this.fapiaoTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.kehu_fapiao_page?this.search_list.kehu_fapiao_page:20;
                        this.pageIndex = this.search_list.kehu_fapiao_num ?this.search_list.kehu_fapiao_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.label = '发票金额'+'(总数:'+ currency.default(response.money_sum,'') +')';

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //导出
                fapiaoPostExcel:function(){
                    this.dataInfor.search['f_type'] = 1;
                    fapiaoPost({
                        page:    this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.b_time) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称','发票金额','创建日期', '提交人','备注'];
                            const filterVal = ['adname', 'appname', 'money','ctime','submitname','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '发票列表');
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
                'search_list',
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            //获取条件
            this.shenheData = criteria.shenheData;
            this.backMoneyData = criteria.backMoneyData;

            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'Invoice'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.kehu_fapiao_name;
            this.dataInfor.search['start_date'] = this.search_list.kehu_fapiao_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehu_fapiao_end_date;
            this.dataInfor.search['shenhe'] = this.search_list.kehu_fapiao_shenhe;
            this.dataInfor.search['is_huikuan'] = this.search_list.kehu_fapiao_is_huikuan;
            this.dataInput = [this.search_list.kehu_fapiao_start_date,this.search_list.kehu_fapiao_end_date];
            this.shenhe = this.search_list.kehu_fapiao_shenhe;
            this.backMoney = this.search_list.kehu_fapiao_is_huikuan;
            this.pageSize =  this.search_list.kehu_fapiao_page?this.search_list.kehu_fapiao_page:20;
            this.pageIndex = this.search_list.kehu_fapiao_num ?this.search_list.kehu_fapiao_num :1;
            this.kehuTableLength = this.search_list.kehu_fapiao_length ?this.search_list.kehu_fapiao_length :1;

            this.fapiaoPost(this.page,this.num,this.dataInfor);
            this.screen =[
                {
                    name:'搜索',
                    data: this.search_list.kehu_fapiao_name
                }
            ];

        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    kehu_fapiao_name: this.dataInfor.search.Search_str,
                    kehu_fapiao_start_date: this.dataInfor.search.start_date,
                    kehu_fapiao_end_date: this.dataInfor.search.end_date,
                    kehu_fapiao_shenhe: this.dataInfor.search.shenhe,
                    kehu_fapiao_is_huikuan:this.dataInfor.search.is_huikuan,
                    kehu_fapiao_page:this.pageSize,
                    kehu_fapiao_num:this.pageIndex,
                    kehu_fapiao_length: this.kehuTableLength,
                });
            },
            //查找日期
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
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
            //审核
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
            changeBackMoney(){
                this.dataInfor.search.is_huikuan  = this.backMoney;
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
            //搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.fapiaoPost(this.page,this.num);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        f_type:1,
                    },
                };
                this.screen = [
                    {
                        name:'搜索',
                        data:''
                    }
                ]
                this.dataInput = [];
                this.shenhe = '';
                this.backMoney = '';
                this.pageSize =  20;
                this.pageIndex = 1;
                this.fapiaoPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    fapiao_name:'',
                    kehu_fapiao_start_date: '',
                    kehu_fapiao_end_date: '',
                    kehu_fapiao_shenhe: '',
                    kehu_fapiao_is_huikuan:'',
                });
            },

            outExcel(){
                this.fapiaoPostExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.fapiaoPost(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.fapiaoPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },

//点击tr
            clickTr(val){
                this.$router.push({ name: 'fapiao',query: { id:val.id} });

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
                    return val.advertiser
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
