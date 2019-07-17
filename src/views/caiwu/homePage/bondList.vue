<template>
    <div class="caiwu_bond_list" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  style="cursor: pointer" @click="back">
                   返回>
               </span>
                {{ typeName }}
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
            <el-col :span="24" class="xufeiTable" v-if="$route.query.type == 'kh'">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="xufeiTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser| file_fk}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.prlin | file_fk}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.margin_money | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="提交人">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.marketname | file_fk}}
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
            <el-col :span="24" class="xufeiTable" v-if="$route.query.type == 'mt'">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="xufeiTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser| file_fk}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.prlin | file_fk}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.margin_meiti | currency('')}}
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
            <el-col :span="24" class="xufeiTable" v-if="$route.query.type == 'df'">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="xufeiTable"
                            class="vue-table"
                            height="715"
                            :default-sort = "{prop: 'date', order: 'descending'}"
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
                                        {{scope.row.guanggaozhu | file_fk}}
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
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.prlina | file_fk }}
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
    import { margin_meijie_list,margin_kehu_list,margin_m_list} from '@/api/money';
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
                //====================
                typeName:'',
                tableData:[],
                listLoading:true,
                stateData:'',
                label:'',
                margin_meijie_list:function(page,num,val){
                    if(this.$route.query.type == "mt"){
                        margin_meijie_list({
                            page:page,
                            num:num,
                            search:this.dataInfor,
                        }).then(response => {
                            let num= 0;
                            this.xufeiTable = response.list.data;
                            this.kehuTableLength =  response.list.totalCount;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }else if(this.$route.query.type == "kh"){
                        margin_kehu_list({
                            page:page,
                            num:num,
                            search:val,
                        }).then(response => {
                            let num= 0;
                            this.xufeiTable = response.list.data;
                            this.kehuTableLength =  response.list.totalCount;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }else if(this.$route.query.type == "df"){
                         val.search['isdiankuan'] = 1;
                        margin_m_list({
                            page:page,
                            num:num,
                            search:val,
                        }).then(response => {
                            let num= 0;
                            this.xufeiTable = response.data;
                            this.kehuTableLength =  response.totalCount;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }

                },
                margin_meijie_listExcel:function(page,num,val){
                    if(this.$route.query.type == "kh"){
                        margin_kehu_list({
                            page:this.kehuTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.list.data.filter(function(item,i) {
                                return item
                            });
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'),'产品线','金额',"提交人"];
                                const filterVal = ['advertiser','prlin','margin_money','marketname'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '客户总保证金列表');
                            })

                        }). catch(err => {this.$message.error('获取失败');});
                    }else if(this.$route.query.type == "mt"){
                        margin_meijie_list({
                            page:this.kehuTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.list.data.filter(function(item,i) {
                                return item
                            });
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'),'产品线','金额'];
                                const filterVal = ['advertiser','prlin','margin_meiti'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '媒体总保证金列表');
                            })
                        }). catch(err => {this.$message.error('获取失败');});

                    }else if(this.$route.query.type == "df"){
                        this.dataInfor.search['isdiankuan'] = 1;
                        margin_m_list({
                            page:this.kehuTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.data.filter(function(item,i) {
                                item["ctime_New"] = moment(parseInt(item.ctime) * 1000).format('YYYY-MM-DD')

                                return item
                            });
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'),'广告主','产品线','金额','创建日期','提交人'];
                                const filterVal = ['adname','guanggaozhu','prlina','money','ctime_New','submitname'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '垫付列表');
                            })
                        }). catch(err => {this.$message.error('获取失败');});
                    }

                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                xufeiTable:[],
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
            this.options_type = criteria.options_type;
            this.margin_meijie_list(this.page,this.num ,this.dataInfor);
            if(this.$route.query.type == "kh"){
                this.typeName = "客户总保证金列表";
                this.screen.push(
                    {
                        name:'搜索',
                        data: this.search_list.bond_kh_money
                    }
                )
                this.dataInfor.search['Search_str'] = this.search_list.bond_kh_money;
            }else if(this.$route.query.type == "mt"){
                this.typeName = "媒体总保证金列表";
                this.screen.push(
                    {
                        name:'搜索',
                        data: this.search_list.bond_mt_money
                    }
                )
                this.dataInfor.search['Search_str'] = this.search_list.bond_mt_money;
            }else if(this.$route.query.type == "df"){
                this.typeName = "垫付列表";
                this.screen.push(
                    {
                        name:'搜索',
                        data: this.search_list.bond_df_money
                    }
                )
                this.dataInfor.search['Search_str'] = this.search_list.bond_df_money;
            }
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            back(){
                this.$router.go(-1)
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.margin_meijie_list(this.page,this.num);
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
                this.margin_meijie_list(this.page,this.num);
            },
//导出
            outExcel(){
                this.margin_meijie_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                this.margin_meijie_list(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;
                this.margin_meijie_list(this.page,this.num,this.dataInfor);
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
                this.margin_meijie_list(this.page,this.num,val);
                if(this.$route.query.type == "kh"){
                    this.searchData({
                        bond_kh_money:val
                    });
                }else if(this.$route.query.type == "mt"){

                    this.searchData({
                        bond_mt_money:val
                    });
                }else if(this.$route.query.type == "df"){
                    this.searchData({
                        bond_df_money:val
                    });
                }

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
                this.margin_meijie_list(this.page,this.num ,this.dataInfor);
                if(this.$route.query.type == "kh"){
                    this.searchData({
                        bond_kh_money:''
                    });
                }else if(this.$route.query.type == "mt"){
                    this.searchData({
                        bond_mt_money:''
                    });
                }else if(this.$route.query.type == "df"){
                    this.searchData({
                        bond_df_money:''
                    });
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
    @import "src/styles/crmStyle/search.scss";
</style>
