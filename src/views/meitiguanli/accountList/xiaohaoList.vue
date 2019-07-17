<template>
    <div class="xiaohaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >消耗列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dataInput">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
                    <el-button type="primary" size="small" class="ImportExcel" @click="ImportExcel">导入Excel</el-button>

                </div>

            </el-col>
            <el-col :span="24" class="xufeiTable">
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
                                {{scope.row.advertiser0 | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="账户用户名">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.account_name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="销售">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="show_money"
                                header-align="center"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.prname }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="cost"
                                label="消耗">
                            <template slot-scope="scope">
                             {{ scope.row.cost | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="时间">
                            <template slot-scope="scope">
                                {{scope.row.date}}
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
        <!--弹窗 导入-->
        <el-dialog title="导入消耗" :visible.sync="addFormVisible1" @close="addFormVisible1 = false" :close-on-click-modal="false" class="tan_shiftTo" >
            <el-upload
                    class="upload-demo"
                    drag
                    ref="upload"
                    list-type="text"
                    name="File[imageFiles][]"
                    action="/api/file/addfile"
                    :on-success="handleAvatarSuccess"
                    :data="dataObj"
                    :auto-upload="false"
                    multiple>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>

                <div class="footBut">
                    <div style="display: inline-block;cursor: pointer" @click="down">
                        <i class="el-icon-upload"></i><span>下载模板</span>
                    </div>
                            <el-button size="small" @click="addFormVisible1 = false" style="margin-left: 5px">取 消</el-button>
                    <el-button size="small" type="primary"  @click="pullData"  >确 定</el-button>
                        </div>
        </el-dialog>
        <!--弹窗 不存在账户-->
        <el-dialog title="不存在账户(请新建账户)" :visible.sync="addFormVisible2" @close="addFormVisible2 = false" :close-on-click-modal="false" class="tan_shiftTo" >
               <el-table
                       highlight-current-row  border
                       :data="accountTable"
                       class="vue-table"
                       height="400"
                       :default-sort = "{prop: 'date', order: 'descending'}"
                       style="width: 100%;">
                   <el-table-column
                           label="账户名称">
                       <template slot-scope="scope">
                           {{scope.row}}
                       </template>
                   </el-table-column>
               </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import { cost_list ,importxiaohao} from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{},
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //================
                tableData:[],
                listLoading:true,
                addFormVisible1:false,//导入
                addFormVisible2:false,//
                screen:[],
                stateData:'',
                label:'',
                dataObj:{
                    'File[yid]':3664,
                    'File[type]':3664,
                },
                importxiaohao:function(page){
                    importxiaohao({
                       url:page,
                    }).then(response => {
                        if(response.code=='500'){

                           this.accountTable = response.data;
                            this.addFormVisible2 = true;
                            this.$refs.upload.clearFiles();

                        }else if(response.code=='200'){
                            this.$router.push({ name: 'AccountManagementlist' });
                        }

                    }). catch(() => {this.$message.error('获取失败');});
                },
                cost_list:function(){
                    cost_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.xufeiTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.meiti_xiaohao_page?this.search_list.meiti_xiaohao_page:20;
                        this.pageIndex = this.search_list.meiti_xiaohao_num ?this.search_list.meiti_xiaohao_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(() => {this.$message.error('获取失败');});
                },
                cost_listExcel:function(){
                    cost_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            if(item.customer_type == 1){
                                item['customer_type_name'] = '直客';
                            }else  if(item.customer_type == 2){
                                item['customer_type_name'] = '渠道';
                            }else{
                                item['customer_type_name'] = '媒体';
                            }
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '账户用户名','产品名','销售','客户账户'+this.$t('titles.fandian'),'客户现金'+this.$t('titles.fandian'),'媒体'+this.$t('titles.fandian'),'媒体代理'+this.$t('titles.fandian'),'产品线','消耗','时间','客户类型'];
                            const filterVal = ['adname', 'account_name', 'product','name','fandian','xj_fandian','mfandian','mdlfandian','prname','cost','date','customer_type_name'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '消耗列表');
                        })


                    }). catch(() => {this.$message.error('获取失败');});
                },
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$refs.upload.submit();
                        this.addFormVisible1 = false;
                        this.$message({
                            message: '正在上传，请稍后',
                            type: 'warning',
                            showClose: true,
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
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
// 未匹配表格
                accountTable:[],
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

        },
        mounted(){
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.meiti_xiaohao_name
                }
                ]
            this.dataInfor.search['Search_str'] = this.search_list.meiti_xiaohao_name;
            this.dataInfor.search['start_date'] = this.search_list.meiti_xiaohao_start_date;
            this.dataInfor.search['end_date'] = this.search_list.meiti_xiaohao_end_date;

            this.dataInput =this.search_list.meiti_xiaohao_end_date? [this.search_list.meiti_xiaohao_start_date,this.search_list.meiti_xiaohao_end_date]:[];

            this.pageSize =  this.search_list.meiti_xiaohao_page?this.search_list.meiti_xiaohao_page:20;
            this.pageIndex = this.search_list.meiti_xiaohao_num ?this.search_list.meiti_xiaohao_num :1;
            this.kehuTableLength = this.search_list.meiti_xiaohao_length ?this.search_list.meiti_xiaohao_length :1;
            this.cost_list(this.page,this.num ,this.dataInfor);
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    meiti_xiaohao_name: this.dataInfor.search.Search_str,
                    meiti_xiaohao_start_date: this.dataInfor.search.start_date,
                    meiti_xiaohao_end_date: this.dataInfor.search.end_date,
                    meiti_xiaohao_page:this.pageSize,
                    meiti_xiaohao_num:this.pageIndex,
                    meiti_xiaohao_length:this.kehuTableLength,
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
                this.cost_list(this.page,this.num);
                this.searchDataFun();
            },
//导出
            outExcel(){
                this.cost_listExcel();
            },
            onClose(){
                this.Z();
            },
//导入
            ImportExcel(){
                this.addFormVisible1 = true;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.cost_list(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.cost_list(this.page,this.num,this.dataInfor);
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
 //提交
            pullData(){
                if(this.$refs.upload.uploadFiles.length == 0 ){
                    this.$message({
                        message: '请上传附件',
                        type: 'warning'
                    });
                }else{
                    let data = '提交后不可更改，是否继续?';
                    this.tan(data)
                }

            },
 //上传成功
            handleAvatarSuccess(file){
                this.importxiaohao(file.files[0]);
            },

//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.cost_list(this.page,this.num,val);
                this.searchDataFun();
            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{},
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
                this.dataInput = [];
                this.cost_list(this.page,this.num ,this.dataInfor);
                this.searchData({
                    meiti_xiaohao_name:'',
                    meiti_xiaohao_start_date:'',
                    meiti_xiaohao_end_date:'',
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
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/tan.scss";
</style>
