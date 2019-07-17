<template>
    <div class="kuhuList" >
        <el-row class="kuhuBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >申请盖章列表</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
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
                    <el-button type="primary" size="small" @click="addStamp">添加盖章</el-button>
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
                </div>

            </el-col>
            <el-col :span="24" class="kuhuTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kuhuTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="公司名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.advertiser  }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="提交时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="审核状态">
                            <template slot-scope="scope">
                                <stateDiv style="text-align: center" :stateData=scope.row ></stateDiv>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="提交人">
                            <template slot-scope="scope">
                                <div style="text-align: center" :class="{ textBorder:scope.row.audit == 2 }">
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
    import {mapActions,mapGetters} from 'vuex';
    import { gaizhang_list } from '@/api/money';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import stateDiv from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{
                        type:1,
                    }
                },
                shenhe:'',
                shenheData:[],
                screen:[],

                //---------------
                stateData:'',
                listLoading:true,
                gaizhang_list:function(page,num,val){
                    gaizhang_list({
                        page:page,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.data.length;i++){
                            response.data.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.kuhuTable = response.data.data;
                        this.kehuTableLength =  response.data.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                renew_list_postExcel:function(page,num,val){
                    gaizhang_list({
                        page:this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        response.data.data =  response.data.data.filter(function(item,i) {
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['公司名称','提交时间','提交人','备注'];
                            const filterVal = ['advertiser', 'ctime','submitname','note'];
                            const list = response.data.data;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '垫款列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                kuhuTable:[],
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
            state,
            stateDiv
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
            this.shenheData = criteria.shenheData;
            for(let i = 0;i<this.audit_action.length;i++){

                if(this.audit_action[i].action_name == 'gaizhang'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor.search['Search_str'] = this.search_list.stamp_name;
            this.gaizhang_list(this.page,this.num,this.dataInfor);

            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.stamp_name
                }
            ];

        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.gaizhang_list(this.page,this.num);
            },
            outExcel(){
                this.renew_list_postExcel(this.dataInfor);
            },
            //添加盖章
            addStamp(){
                this.$router.push({ name: 'addStamp' });
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.gaizhang_list(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;
                this.gaizhang_list(this.page,this.num,this.dataInfor);
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.gaizhang_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    stamp_name:val
                });
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        type:1,
                    }
                };
                this.shenhe = '';
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];

                this.gaizhang_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    stamp_name:''
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'stampInfor',query: { id:val.id} });
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
