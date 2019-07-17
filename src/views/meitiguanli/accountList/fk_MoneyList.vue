<template>
    <div class="fk_money_list" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >应付款列表</span>
            </p>
            <el-col :span="24" class="screen">


                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dateType" style="margin-right: 3px" >
                    <el-input
                            type="number"
                            v-model="dk_date"
                            name="mouse2"
                            style="width: 100px"
                            size="small"
                            placeholder="付款日"
                    ></el-input>
                </div>
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
            <el-col :span="24"  style="font-size: 18px">
                应付款总额：{{ qiane_sum | currency('')}}
            </el-col>
            <el-col :span="24" class="yingfu_Table">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="yingfu_Table"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="公司名称">
                            <template slot-scope="scope">
                                {{scope.row.adname | file_fk}}
                                <span v-if="scope.row.payment_type == '0507'"  style="display:inline-block; font-size: 12px;width: 18px!important;height: 18px!important;border-radius: 50%!important;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="账户名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.a_users }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="媒体名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.mhtadname }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.prlina }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="应付款">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.xf_qiane | currency('')}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                label="付款周期">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.dk_zhouqi | file_fk}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                label="付款日">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.dk_date | file_fk}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="付款类型">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div v-if="scope.row.mt_payment_type ">
                                        <div v-if="scope.row.mt_payment_type == 1">
                                            预付
                                        </div>
                                        <div v-if="scope.row.mt_payment_type == 2">
                                            垫付
                                        </div>
                                    </div>
                                   <div v-else>
                                      ---
                                   </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="销售">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.marketname | file_fk}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.ctime | ctimeData}}
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
                                :total="yingfu_TableLength"
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
    import { yfk_list} from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
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
                screen:[],
                //==================
                tableData:[],
                listLoading:true,

                stateData:'',
                label:'',
                qiane_sum:'',
                dk_date:"",

                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                yingfu_Table:[],
                yfk_list:function(page,num,val){
                    yfk_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {

                        if(response.data.data  instanceof Array){
                            this.yingfu_Table = [];
                            this.yingfu_Table = response.data.data;
                        }else{
                          let data = [];
                          for(let a in response.data.data){
                              data.push(response.data.data[a])
                          }
                            this.yingfu_Table = data;
                        }
                        this.yingfu_TableLength =  response.data.totalCount;
                        this.pageSize =  this.search_list.media_bondrefund_page?this.search_list.media_bondrefund_page:20;
                        this.pageIndex = this.search_list.media_bondrefund_num ?this.search_list.media_bondrefund_num :1;
                        if(Math.ceil(this.yingfu_TableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.yingfu_TableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.qiane_sum = response.data.qiane_sum;
                        this.listLoading = false;

                    }). catch(err => {this.$message.error('获取失败');});
                },
                yfk_listExcel:function(page,num,val){

                    yfk_list({
                        page:this.yingfu_TableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            if(item.mt_payment_type == 1){
                                item['mt_payment_type_name'] = '预付';
                            }else  if(item.mt_payment_type == 2){
                                item['mt_payment_type_name'] = '垫付';
                            }else {
                                item['mt_payment_type_name'] = '';
                            }


                            item['fk_time'] =    moment( new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD')
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'),'账户名称','媒体名称','产品线','应付款','付款周期','销售','付款类型','时间'];
                            const filterVal = ['adname','xf_qiane','a_users','mhtadname','prlina','dk_zhouqi','marketname','mt_payment_type_name',''];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '应付款列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                yingfu_TableLength:12,
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
        mounted(){
            this.options_type = criteria.options_type;
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.media_bondrefund_name
                }
            ]
            this.dataInfor.search['Search_str'] = this.search_list.media_bondrefund_name;

            this.dataInfor.search['date_type'] = this.search_list.media_bondrefund_date_type?this.search_list.media_bondrefund_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.media_bondrefund_start_date;
            this.dataInfor.search['end_date'] = this.search_list.media_bondrefund_end_date;
            this.dataInfor.search['dk_date'] =this.search_list.media_bondrefund_dk_date;
            this.dataInput = [this.search_list.media_bondrefund_start_date,this.search_list.media_bondrefund_end_date];
            this.date_type = this.search_list.media_bondrefund_date_type?this.search_list.media_bondrefund_date_type:1;
            this.dk_date = this.search_list.media_bondrefund_dk_date;
            this.pageSize =  this.search_list.media_bondrefund_page?this.search_list.media_bondrefund_page:20;
            this.pageIndex = this.search_list.media_bondrefund_num ?this.search_list.media_bondrefund_num :1;
            this.yingfu_TableLength = this.search_list.media_bondrefund_length ?this.search_list.media_bondrefund_length :1;
            this.yfk_list(this.page,this.num ,this.dataInfor);
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    media_bondrefund_name: this.dataInfor.search.Search_str,
                    media_bondrefund_date_type: this.dataInfor.search.date_type,
                    media_bondrefund_start_date: this.dataInfor.search.start_date,
                    media_bondrefund_end_date: this.dataInfor.search.end_date,
                    media_bondrefund_dk_date:this.dataInfor.search.dk_date,
                    media_bondrefund_page:this.pageSize,
                    media_bondrefund_num:this.pageIndex,
                    media_bondrefund_length:  this.yingfu_TableLength
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.yfk_list(this.page,this.num);
                this.searchDataFun();
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
                this.yfk_list(this.page,this.num);
                this.searchDataFun();
            },
//导出
            outExcel(){
                this.yfk_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.yingfu_TableLength /this.pageSize) >= this.pageIndex){
                    this.yfk_list();
                }
                this.searchDataFun();

            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.yfk_list();
                this.searchDataFun();
            },
//下载模板
            down(){

                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['日期', '账户名', '消耗'];
                    const filterVal = [];
                    const list = [];
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '导入消耗模板');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //上传成功
            handleAvatarSuccess(file){
                this.importxiaohao(file.files[0]);
            },

//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.dataInfor.search['dk_date'] = this.dk_date;
                this.yfk_list();
                this.searchDataFun();
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.pageSize =  20;
                this.pageIndex = 1;
                this.date_type = 1;
                this.dataInput = [];
                this.shenhe = '';
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.yfk_list();
                this.searchData({
                    media_bondrefund_name:'',
                    media_bondrefund_date_type: '',
                    media_bondrefund_start_date: '',
                    media_bondrefund_end_date: '',
                    media_bondrefund_dk_date:'',
                });
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
            file_fk(val){
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
