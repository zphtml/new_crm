<template>
    <el-row  class="media_beikua_dikoun">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  @click="jumpht_list">执行框架列表</span>><span @click="jump_ht_infor">合同详情</span>><span>备款抵扣</span>
        </p>
        <el-col :span="22" style="padding-left: 20px">
            <el-col :span="24" style="color: #737373;font-size: 13px;">
                <el-col :span="24" style="margin-top: 10px;">
                    <el-col :span="24" class="select_account">
                        <span style="margin-right: 10px">备款账户:</span>
                        <el-select size="small" v-model="account" placeholder="请选择" @change="accountChange">
                            <el-option
                                    v-for="(item,key) in accountOptions"
                                    :key="item.id"
                                    :label="item.a_users"
                                    :value="key">
                            </el-option>
                        </el-select>
                        <!--<div class="addInfor" @click="addaccount">-->
                            <!--<span class="addaccount">？</span>-->
                            <!--<span class="addaccountText">没有你要的账户？点击添加</span>-->
                        <!--</div>-->
                    </el-col>
                    <el-col :span="24" class="beikuan_yue">
                        <span>备款账户余额：{{account_money}}</span>
                    </el-col>
                    <template>
                        <el-table
                                :data="Tabblefun"
                                height="auto"
                                border
                                class="vue-table"
                                style="width: 100%">
                            <el-table-column
                                    width="50"
                                    label="选择">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.selected" @change="checkboxChange(scope.row)"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="账户名称">
                                <template slot-scope="scope">
                                    <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                                        {{scope.row.a_users}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="实付金额">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{scope.row.xf_cost | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="充值欠费">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{scope.row.xf_qiane | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="抵扣金额">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <input style="line-height: normal; border: 1px solid #000;font-size: 12px;height: 24px; width: 100px;padding-left:20px;outline: none;z-index:9"
                                               v-if="scope.row.dikou_show"
                                               type="number" v-model="scope.row.dikou_money"
                                               name="mouse2"
                                               @focus="dikou_focus(scope.row)"
                                               v-on:input="dikou_moneyChange(scope.row)"
                                               placeholder="请输入金额"
                                               onmousewheel="return false;">
                                        <span  v-if="!scope.row.dikou_show">{{scope.row.dikou_money}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="账户币">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{scope.row.show_money | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    :label="$t('titles.fandian')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{scope.row.rebates_proportion }}%
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="充值时间">
                                <template slot-scope="scope">
                                    <div style="width: 100%;text-align: center">
                                        {{scope.row.payment_time | cur}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="block">
                            <div style="float: left;    margin-top: 11px;">
                                <el-checkbox v-model="checkedAll" @change="checkboxALlChange()"> {{checkedAllText}}</el-checkbox>
                            </div>
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
                    </template>
                </el-col>
                <el-col :span="24" class="all_yue" >
                    已选  <span style="color:#2485cc;">{{selectnum}}</span>项目 &nbsp;&nbsp;总价：{{ heji | currency('')}}
                </el-col>
            </el-col>
            <el-col :span="24" style="text-align: right;">
                <el-button type="primary" style="padding: 5px 15px;width: auto;height: auto" @click="submiter" :disabled="pulldisabled">提交</el-button>
                <el-button style="padding: 5px 15px;width: auto;height: auto" @click="reset">重置</el-button>
            </el-col>
        </el-col>
  </el-row>
</template>

<script>
    /*eslint-disable */
    import {add_beikuan,beikuan_account_renewlist,beikuan_account_renew_binding} from '@/api/meiti';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
                heji:0,
                num_clome:0,
                account:"",
                accountOptions:[],
                dataItem:[],
                checkedAllText:'全选',
                checkedAll:false,
                pulldisabled:false,
                //分页
                page:'10',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                account_money:'0',
                selectnum:'0',
                accountId:'',
                xf_id:[],
                fk_money:[],
                beikuan_account_renewlist(){
                    beikuan_account_renewlist({
                        mhtid:[ this.routeId],
                    }).then(response => {
                        this.dataItem = response.filter(function (item, i) {
                            item['dikou_money'] = 0;
                            item['dikou_show'] = false;
                            return item
                        });
                    }).catch(error => {

                    });
                },
                add_beikuan:function(){
                    add_beikuan({
                        id:  this.routeId,
                    }).then(response => {
                        this.accountOptions = response.accountlist;

                    }). catch(err => {this.$message.error('获取失败');});
                },
                beikuan_account_renew_binding(){
                    beikuan_account_renew_binding({
                        xf_id: this.xf_id,
                        fk_money:this.fk_money,
                        beikuan_account_id:this.accountId
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.success()
                        }else{
                            this.$message({
                                message: response.msg,
                                type: 'warning'
                            });
                            this.pulldisabled = false;
                        }

                    }). catch(err => {this.$message.error('获取失败');   this.pulldisabled = false;});
                },
                pull_beikuan() {
                    this.$confirm('是否提交?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.xf_id= [];
                        this.fk_money= [];

                        let _this = this;
                        this.dataItem.filter(function (item, i) {
                            if(item.selected){
                                _this.xf_id.push(item.id);
                                _this.fk_money.push(item.dikou_money);
                            }
                        });
                        this.pulldisabled = true;
                            this.beikuan_account_renew_binding();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消上传'
                        });
                    });
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--合同详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'mediaviewcontract', query: { id: _this.routeId}});
                    }, 500);
                },

            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'accounts'
            ]),
            Tabblefun:function(){
                this.kehuTableLength = this.dataItem.length;
                return this.dataItem.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.beikuan_account_renewlist();
            this.add_beikuan();
        },
        methods: {
//跳转
            jumpht_list(){
                this.$router.push({ name: 'MediaProtocolList' });
            },
            jump_ht_infor(){
                this.$router.push({ name: 'mediaviewcontract', query: { id: this.routeId}});
            },
            addaccount(){
                this.$router.push({ name: 'Reserve' ,query: { id:  this.routeId} });
            },
            accountChange(val){
                this.account_money = this.accountOptions[val].yu_e;
                this.accountId = this.accountOptions[val].id;
                this.heji = 0;
                this.num_clome = 0;
            },
            checkboxChange(val) {
                if(val.selected == true){
                    val.dikou_money = val.xf_qiane;
                    val.dikou_show = true;
                    this.numData = Number(this.heji) + Number(val.dikou_money);
                    this.selectnum = Number(this.selectnum) + 1;
                }else{
                    val.dikou_show = false;
                        this.numData = Number(this.heji) - Number(val.dikou_money);
                    val.dikou_money = 0;
                    this.selectnum = Number(this.selectnum) - 1;
                }
                this.heji=this.numData;
            },
            checkboxALlChange(){
                let numberData = 0;
                if(this.checkedAll){
                    this.dataItem = this.dataItem.filter(function (item, i) {
                        item.selected = true;
                        item.dikou_show = true;
                        item.dikou_money = item.xf_qiane;
                        numberData +=Number(item.xf_qiane);
                        return item
                    });
                    this.heji = numberData;
                    this.selectnum = this.dataItem.length;
                }else{
                    this.dataItem = this.dataItem.filter(function (item, i) {
                        item.selected = false;
                        item.dikou_show = false;
                        item.dikou_money = 0;
                        return item
                    });
                    this.selectnum = 0;
                    this.heji = "0.00";
                }
            },
            dikou_focus(val){
                 this.num_clome = Number(this.heji)-Number(val.dikou_money);
            },
            dikou_moneyChange(val){
                if(Number(val.dikou_money)>Number(val.xf_qiane)){

                    val.dikou_money = val.xf_qiane;
                }else if(Number(val.dikou_money<0)){
                    val.dikou_money = 0;
                }
                this.heji = Number(this.num_clome) + Number(val.dikou_money);
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex = val;
            },
//提交
            submiter(){
                if(this.account === ""){
                    this.$message({
                        message: '请选择备款账户',
                        type: 'warning'
                    });
                }else if(Number(this.selectnum) == 0){
                    this.$message({
                        message: '请选择账户',
                        type: 'warning'
                    });
                }else{
                    this.pull_beikuan();
                }

            },
            reset(){

            },
        },
        filters: {
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD')
            },
            matnum: function (value) {
                if(value){
                    return value
                }else{
                    return '--'
                }
            },
            type: function (value) {
                if(value == 1){
                    return "预付"
                }else if(value == 2){
                    return "垫付"
                }else{
                    return '--'
                }
            }
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    .media_beikua_dikoun {

        .beikuan_yue {
            width:100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            font-weight: bold;
            text-indent: 50px;
            border:1px solid #97d2e4;
            background: #cbfeff;
            color: #000;
            margin:10px 0;
        }
        .all_yue {
            width:100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            text-indent: 50px;
            border:1px solid #97d2e4;
            background: #cbfeff;
            color: #000;
            margin:10px 0;
        }
    }

</style>
