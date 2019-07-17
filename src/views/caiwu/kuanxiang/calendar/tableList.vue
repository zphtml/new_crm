<template>
    <el-row >
        <el-col :span="24" class="backmoney_table_list">
            <el-table
                    highlight-current-row v-loading="listLoading"  border
                    :data="huikuanTable"
                    class="vue-table"
                    height="430"
                    style="width: 100%;">
                <el-table-column
                        width="150px"
                        label="公司名称">
                    <template slot-scope="scope">
                    {{scope.row.adname }}

                    </template>
                </el-table-column>


                <el-table-column
                        label="计划回款金额">
                    <template slot-scope="scope">
                         {{scope.row.money | currency('') }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="实际回款金额">
                    <template slot-scope="scope">
                        {{scope.row.huikuan | currency('') }}
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
                        :total="backMoneyTableLength"
                        style='text-align: right;'>
                </el-pagination>
            </div>
        </el-col>

    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { huikuan_plan_list ,up_pla} from '@/api/kehu';
    import back_money_pie from '../echart/pie';
    import moment from "moment"
    export default {
        name: 'dashboard',
        data() {
            return {
                listLoading:true,
                huikuanTable:[],
                tableDateArray:[],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now()- 8.64e7;//不算今天往后禁止
                    }
                },


 //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
               backMoneyTableLength:12,
//点击日期查看回款列表
                huikuan_plan_list:function (val) {
                    huikuan_plan_list({
                        start_date:this.tableDateArray,
                        end_date:this.tableDateArray,
                        page:'99999',
                        num:this.num,
                    }).then(response => {
                        this.listLoading = false;
                        if(response.code == '200'){
                            this.huikuanTable = response.data.data;
                            this.backMoneyTableLength = response.data.totalCount
                        }else{
                            this.$message.error('获取失败');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },

            }
        },
        components: {
            back_money_pie
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        mounted(){
             this.this_date = this.month;
        },
        methods: {
            backmoneytableChange(val){
                this.tableDateArray = val.date;
                this.listLoading = true;
                this.huikuan_plan_list()
            },

            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

            },
            handleCurrentChange(val) {
                this.num = val;
            },
        },
        watch:{

        },
        filters: {
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">

    .backmoney_table_list {
    }
</style>
