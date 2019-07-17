<template>
    <div class="kehuchiList" >
        <el-row class="kebaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                客户列表
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen=screen @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
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
                    <el-select v-model="renling" placeholder="请选择" @change="searchstart">
                        <el-option
                                v-for="(item, index) in renlingData"
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
            <el-col :span="24" class="kebaoTable">
                <div >
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kebaoTable"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="简称">
                            <template slot-scope="scope">
                            {{scope.row.appname | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="所属行业">
                            <template slot-scope="scope">
                               {{ scope.row.industry  | fileFun }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="城市">
                            <template slot-scope="scope">
                                {{scope.row.city | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="fapiao"
                                label="创建时间 ">
                            <template slot-scope="scope">
                                {{scope.row.ctime| ctimeData}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="所属人">
                        <template slot-scope="scope">
                         {{ scope.row.submituser0.name  }}
                        </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="客保时间">
                            <template slot-scope="scope">
                                {{scope.row.r_time | t_timeDate}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="状态">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    已通过
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                width="200"
                                label="认领状态">
                            <template slot-scope="scope">
                                <div class="chi_operation">
                                    <div style="text-align: center">
                                              <span class="color" v-if="scope.row.is_claim == 1" @click="claim(scope.row.id)">
                                        认领
                                    </span>
                                        <span v-if="scope.row.is_claim == 0" >
                                        不可认领
                                    </span>
                                    </div>

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
    import {mapActions,mapGetters} from 'vuex';
    import { market_kehuchi_list,market_kehuchi_listPost,customerbs } from '@/api/kehu';
    import criteria from '@/components/search/criteria';  //获取条件
    import screenInput from '@/components/search/search';
    import moment from "moment"
    export default {

        data() {
            return {
                screen:"",
                dataInfor : {
                    search:{
                    },
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                renling:'是否认领',
                renlingData:[],
                //---------------
                listLoading:true,
                kebaoTable:[],

                market_kehuchi_listPost:function(page,num,val){
                    this.listLoading = true;
                    market_kehuchi_listPost({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kebaoTable = response.list.list;
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.kehu_kehuchi_page?this.search_list.kehu_kehuchi_page:20;
                        this.pageIndex = this.search_list.kehu_kehuchi_num ?this.search_list.kehu_kehuchi_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败'); this.listLoading = false;});
                },
//表格
                market_kehuchi_listExcel:function(){
                    market_kehuchi_list({
                        page:this.kehuTableLength,
                        num:1,
                    }).then(response => {

                        this.tableData =  response.list.list.filter(function(item,i) {
                            if(item.submituser0){
                                item['submituserName'] = item.submituser0.name;
                            }

                            var time=new Date(parseInt(item.r_time) * 1000)
                            item['rtime'] =  moment(item.r_time).format('YYYY-MM-DD') +' / '+ moment(item.r_time).add(3, 'M').format('YYYY-MM-DD')

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称','所属行业', '城市','创建时间','所属人','客保时间'];
                            const filterVal = ['advertiser', 'appname', 'industry','city','ctime','submituserName','rtime'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '客户池');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //客保放弃
                customerbs:function(val,data){
                    customerbs({
                        id:val,
                        id_x:this.user.id,
                    }).then(response => {
                        this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                //认领
                tanInfor(dataText,dataName,id) {
                    this.$confirm(dataText,dataName , {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '认领成功!'
                        });
                        this.customerbs(id);

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消认领'
                        });
                    });
                },
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
        watch:{
            user:function(newValue){

            },
        },
        mounted(){

            this.renlingData = criteria.renlingData;
            this.dataInfor.search['Search_str'] = this.search_list. kehu_kehuchi_name;
            this.dataInfor.search['start_date'] = this.search_list.kehu_kehuchi_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehu_kehuchi_end_date;
            this.dataInfor.search['isrenling'] = this.search_list.kehu_kehuchi_isrenling;
            this.dataInput = [this.search_list.kehu_kehuchi_start_date,this.search_list.kehu_kehuchi_end_date];
            this.renling = this.search_list.kehu_kehuchi_isrenling?this.search_list.kehu_kehuchi_isrenling:'是否认领';
            this.pageSize =  this.search_list.kehu_kehuchi_page?this.search_list.kehu_kehuchi_page:20;
            this.pageIndex = this.search_list.kehu_kehuchi_num ?this.search_list.kehu_kehuchi_num :1;
            this.kehuTableLength = this.search_list.kehu_kehuchi_length ?this.search_list.kehu_kehuchi_length :1;
            this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.kehu_kehuchi_name
                }
            ]
        },
        methods: {
            ...mapActions([
                'searchData'
            ]),
            searchDataFun(){
                this.searchData({
                   kehu_kehuchi_name: this.dataInfor.search.Search_str,
                   kehu_kehuchi_start_date: this.dataInfor.search.start_date,
                   kehu_kehuchi_end_date: this.dataInfor.search.end_date,
                   kehu_kehuchi_isrenling:this.dataInfor.search.isrenling,
                    kehu_kehuchi_page:this.pageSize,
                    kehu_kehuchi_num:this.pageIndex,
                    kehu_kehuchi_length: this.kehuTableLength,
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
                this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
                this.searchDataFun()
            },
            //是否认领
            searchstart(val){
                this.dataInfor.search.isrenling = val;
                this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
                this.searchDataFun()
            },

            outExcel(){
                this.market_kehuchi_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);

                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.market_kehuchi_listPost(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(val){
                this.dataInfor = {
                    search:{},
                };
                this.renling = '是否认领';
                this.dataInput = [];
                this.screen = [
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                this.market_kehuchi_listPost(this.page,this.num,this.dataInfor);
                this.searchData({
                   kehu_kehuchi_name:'',
                   kehu_kehuchi_start_date: '',
                   kehu_kehuchi_end_date: '',
                   kehu_kehuchi_isrenling: '',
                });
            },
//跳转
            jumpnewCustomer(val){
                this.$router.push({ name: 'newCustomer'});
            },
//认领
            claim(val){
                this.tanInfor('确认认领此客户，将不可恢复, 是否继续?','放弃',val);
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                if(val){
                    var time=new Date(parseInt(val) * 1000);
                    return   moment(time).format('YYYY-MM-DD')
                }else{
                    return "--"
                }

            },
            t_timeDate(val){
                var time=new Date(parseInt(val) * 1000);
                return  moment(time).format('YYYY-MM-DD') +' / '+ moment(time).add(3, 'M').format('YYYY-MM-DD')
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
