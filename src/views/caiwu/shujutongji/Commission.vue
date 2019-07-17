<template>
    <div class="xsTc_list" >
        <el-row class="kuhuBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>销售提成列表</span>
            </p>
            <el-col :span="24" class="screen" style="margin-bottom: 10px">
                <div class="dataInput tichengInput" style="margin: 0">
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-button type="success" size="small"  style="float: right;"  plain   @click="outExcel">导出Excel</el-button>
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
                                 label="销售">
                            <template slot-scope="scope">
                               <div >
                                   <img src="http://test.myushan.com/ZPCRM1.png" v-if="scope.$index == 0" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                   <img src="http://test.myushan.com/ZPCRM2.png" v-if="scope.$index == 1" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                   <img src="http://test.myushan.com/ZPCRM3.png" v-if="scope.$index == 2" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                   <img src="http://test.myushan.com/ZPCRM3.png" v-if="scope.$index > 2" style="width: 25px;vertical-align: middle;margin-right: 10px;opacity: 0" alt="">
                                   {{ scope.row.xs }}
                               </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="客户数量">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.adcount }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="充值金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.money |currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="欠款金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.qiane|currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="销售利润">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.xiaoshou_lirun|currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="提成金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.ticheng_money |currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="查看详情">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <img src="../../../assets/xq.png" style="width:20px;height:20px" alt="">
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
                                :total="TableLength"
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
    import { market_ticheng_all } from '@/api/money';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{},
                },
                screen:'',
                start :moment().format('YYYY-MM-1'),
                end : moment().format('YYYY-MM-DD'),
                stateData:'',
                listLoading:true,
                TableData:[],
                dataInput:[moment().format('YYYY-MM-1'),moment().format('YYYY-MM-DD')],
                market_ticheng_all:function(){

                    market_ticheng_all({
                        start:this.start,
                        end:this.end,
                    }).then(response => {
                        this.listLoading = false;
                        this.TableData = response;
                        this.TableLength = response.length;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                market_ticheng_allExcel:function(){
                    market_ticheng_all({
                        start:this.start,
                        end:this.end,
                    }).then(response => {
                        this.tableData = response;
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['销售','客户数量','充值金额','欠费金额','销售利润','提成金额'];
                            const filterVal = ['xs','adcount','money','qiane','lirun','ticheng'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '销售提成');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                TableLength:12,

            }
        },
        components: {
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'audit_action'
            ]),
            kuhuTable(){
                return this.TableData.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.market_ticheng_all();
        },
        methods: {
            ...mapActions([
                'Account'
            ]),
            changedate(){
                if(this.dataInput){
                    this.start = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    this.end = moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    this.start =  moment().format('YYYY-MM-1');
                    this.end = moment().format('YYYY-MM-DD');
                }
                this.market_ticheng_all()
            },
            //分页
            handleSizeChange(val) {
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
            },
            //跳转
            jumpCustomerList(val){
                this.$router.push({ name: 'kehuliebiao'});
            },
            jumpConsole(){
                this.$router.push({ name: 'console'  ,query: { type:1} });
            },
            outExcel(){
                this.market_ticheng_allExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

//点击tr
            clickTr(val){
                this.$router.push({ name: 'CommissionInfor',query: { id:val.uid,name:val.xs,start: this.start,end: this.end,} });
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
