<template>
    <div class="companyCostList" >
        <el-row class="companyCostBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>查看消耗</span>
            </p>
            <el-col :span="24" style="font-size: 12px;margin:20px 0 10px 0 ">
                <span style="font-size: 13px;font-weight:600;">
                    {{advertiser}}
                </span>
            <span style="margin: 0 20px">
                  <span style="margin-right: 10px">
                            消耗更新日期:
                        </span>
                    {{consumeDate}}
            </span>
              <span>
                     <span style="margin-right: 10px">
                            消耗账户:
                             {{costSum}}
                        </span>
              </span>
            </el-col>
            <el-col :span="24" class="companyCostTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="companyCostTable"
                            class="vue-table"
                            height="400"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                label="产品线">
                            <template slot-scope="scope">
                                    {{scope.row.name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="总充值（币）">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.pay | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="总消耗（币）">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{(Number(scope.row.cost) + Number(scope.row.balance_cost))| currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="消耗账户数">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.account_num||'--' }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="当日消耗（币）">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{scope.row.cost_day | currency('')}}
                                    </div>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="账户余额（币）">
                            <template slot-scope="scope">
                                {{scope.row.money| currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                               <div @click="adjusting(scope.row)">
                                   校准
                               </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!--弹窗 新增回款-->
            <el-dialog title="修改账户余额"  :visible.sync="addFormVisible" @close="addFormVisible = false"  :close-on-click-modal="false" class="tan_shiftTo tan2" >
                <ul class="shiftTo" >
                    <li>
                        <p  class="first_p" style="width: 65px;">修改余额</p>
                        <p class="last_p" style="position: relative;width: 200px">
                            <el-input class="tan_input" type="text"></el-input>
                            <input style="line-height: normal; border: none;font-size: 12px;height: 23px;padding-left: 10px ;position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                                   type="number" v-model="upbalance"
                                   name="mouse2"
                                   onmousewheel="return false;">
                        </p>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_companyCost" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { adcost_product_lin,adcost_product_lin_up } from '@/api/kehu';
    import { account_last_date} from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                advertiser:'',
                listLoading:true,
                companyId:'',
                consumeDate:'',
                costSum:'',
                companyCostTable:[],
                adcost_product_lin:function(page,num,val){
                    this.loading = true;

                    adcost_product_lin({
                      id:this.companyId,
                    }).then(response => {
                        this.companyCostTable = response.data;
                        this.costSum = response.sum;
                        this.listLoading = false;
                        this.advertiser = response.adinfo.advertiser;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                account_last_date(){
                    account_last_date({
                    }).then(response => {
                        this.consumeDate = response.date;
                    }).catch(err => {
                        this.loading = false;
                        this.$message.error(err);
                    });
                },
 //弹窗
                addFormVisible:false,
                lineData:{},
                upbalance:'',
 //校准
                adcost_product_lin_up(){

                    adcost_product_lin_up({
                        id:this.lineData.advertiser,
                        pr_lin:this.lineData.prlin_id,
                        upbalance:this.upbalance,
                        cost:this.lineData.cost,
                        balance:this.lineData.money,
                        balance_cost:this.lineData.balance_cost
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            this.adcost_product_lin();
                        }

                    }).catch(err => {
                        this.loading = false;
                        this.$message.error(err);
                    });
                },
            }
        },
        components: {
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.companyId = this.$route.query.id;
            this.account_last_date()
            this.adcost_product_lin(this.page,this.num,  this.dataInfor);
        },
        methods: {
            ...mapActions([
                'Account'
            ]),
// 校准
            adjusting(val) {
                this.addFormVisible = true;
                this.lineData = val;
            },
//  校准提交
            pull_companyCost() {
                if(this.upbalance != ''){
                    this.$confirm('是否提交账户余额?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.addFormVisible = false;
                        this.adcost_product_lin_up()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    })
                }else{
                    this.$message({
                        message: '请输入账户余额！！',
                        type: 'warning'
                    });
                }

            },
            //跳转
            jumpCustomerList() {
                this.$router.push({name: 'kehuliebiao'});
            },
            jumpConsole() {
                this.$router.push({name: 'console' ,query: { type:1} });
            },
        },
        created() {

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/tan.scss";
    .companyCostList{
        .box-card {
            width: 250px;
            margin :20px 0;
            .title_date {
                font-size: 15px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .title_account {
                font-size: 14px;
            }
        }
    }
</style>
