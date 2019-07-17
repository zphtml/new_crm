<template>
    <div class="beikuanList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">返回上一级</span>><span>备款详情</span>
            </p>
            <el-col :span="24" class="screen" style="margin-bottom: 10px">
                <div class="searchInput">
                    <input type="text" class="search" :placeholder="'请输入公司名'" v-model='inputText'>
                    <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                        <use xlink:href="#icon-11"></use>
                    </svg>
                </div>
                <div class="distributionButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="beikuanTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="beikuanList"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="公司名称">
                            <template slot-scope="scope">
                                    {{scope.row.advertiser}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="转出账户">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.out_account}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                header-align="center"
                                label="转入账户">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.in_account}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                <span v-if="scope.row.payment_type == 0||scope.row.payment_type == 155 ">
                                    -
                                </span>    {{scope.row.money | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="账户币">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                 <span v-if="scope.row.payment_type == 0||scope.row.payment_type == 155 ">
                                    -
                                </span>  {{scope.row.show_money | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="付款方式">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.payment_type | payment_name}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                width="240"
                                label="时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.payment_time | ctimeData}}
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
    import { beikuanAccountHistory} from '@/api/meiti';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
                inputText:'',
                //---------------------
                listLoading:true,
                beikuanAccountHistory:function(page,num,val){
                    this.listLoading = true;
                    beikuanAccountHistory({
                        id: this.routeId,
                    }).then(response => {
                        this.listLoading = false;

                        this.beikuanTable = response.data;
                        this.kehuTableLength =  response.data.length;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                beikuanTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
            ]),
           beikuanList(){
                let TableData = [];
                let _this = this;

               TableData = this.beikuanTable.filter(function(item){
                    if(item.advertiser.indexOf(_this.inputText)>=0){
                        return item
                    }
                })
                this.kehuTableLength =  TableData.length;
                return  TableData.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.beikuanAccountHistory();
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),

            outExcel(){
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['公司名称',  '转出账户','转入账户','转入金额','转入币','付款方式','备注','时间'];
                    const filterVal = ['advertiser',  'out_account','in_account','money','show_money','payment_type','note','payment_time'];
                    const list = JSON.parse(JSON.stringify(this.beikuanTable));
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '备款账户详情列表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                   if( v['payment_type'] == 0 || v['payment_type'] == 155){
                       if(j == 'money' || j == 'show_money'){
                           v[j] = -v[j];
                       }
                   }
                    if(j == 'payment_type'){
                        if(v[j] == 0){
                            v[j] =  '转款'
                        }else if(v[j] == 1){
                            v[j] =  '预付'
                        }else if(v[j] == 2){
                            v[j] =  '垫付'
                        }else if(v[j] == 3){
                            v[j] =  '补款到备款账户'
                        }else if(v[j] == 15){
                            v[j] =  '退款到备款账户'
                        }else if(v[j] == 155){
                            v[j] =  '备款账户退款'
                        }

                    }
                    if(j == 'payment_time'){
                        var time=new Date(parseInt( v[j] ) * 1000);
                        v[j] =  moment(time).format('YYYY-MM-DD')

                    }
                  return  v[j]
                }))
            },
//结束
            jieshu(val){
                this.beikuanAccountStatus(val.id,1)
            },
// 退款
            jump_backMoney(val){
                this.$router.push({ name: 'refund_beikuan',query: { id:val.contract_id}});
            },
//  详情
            jump_history_infor(val){
                this.$router.push({ name: 'beikuanAccountHistory',query: { id:val.id}});
            },
//分页
            handleSizeChange(val) {
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
            },
            jumpCustomerList(){
                this.$router.go(-1)
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            payment_name(val){
                if(val == 0){
                    return '转款'
                } else if(val == 1){
                    return '预付'
                }else if(val == 2){
                    return '垫付'
                }else if(val == 3){
                    return   '补款到备款账户'
                }else if(val == 15){
                    return   '退款到备款账户'
                }else if(val == 155){
                    return  '备款账户退款'
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
