<template>
    <div class="caiwu_line" >
        <el-row class="caiwu_line">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>各产品线</span>
            </p>
        </el-row>
        <el-col :span="24" style="margin-top: 10px">
            <el-col :span="6" class="left_box">
                <el-col :span="24" class="leftTreeBox">
                    <p class="allTree" @click="all_line" :class="{AllColor:AllColor}">全部</p>
                    <el-tree :data="dataInfor" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-col>
            </el-col>
            <el-col :span="18"  class="right_box"     v-loading="loading">
                <p style="width: 100%;text-align: center">
                    {{ titleName }}
                </p>
                <el-col :span="24" class="title">
                    <div class="radio">
                        <span class="f_2" :class="{border_bottom:border_bottom_2}" @click="radioData_b(border_bottom_2)">充值</span>
                        <span class="f_1" :class="{border_bottom:border_bottom_1}" @click="radioData_a(border_bottom_1)">消耗</span>
                    </div>
                </el-col>

                <el-col :span="24" style="height: 700px;">
                    <div class="date_title">
                        <el-date-picker
                                v-model="lineInfor"
                                @change="LineChange"
                                :clearable="false"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-col :span="24">
                        <pieEcharts :pieData="pieData"></pieEcharts>
                    </el-col>
                    <el-col :span="24">
                        <lineEcharts :item=item></lineEcharts>
                    </el-col>

                </el-col>
                <el-col :span="24">
                    <div class="btn_down">
                        <span class="zhb" v-bind:class="{ xjColor:zhbshow }" @click="zhbColorBtn(zhbshow)">账户币</span>
                        <span class="xj " v-bind:class="{ xjColor:xjshow}" @click="xjColorBtn(xjshow)">现金</span>
                        <img class="iconLeft"  src="../../../assets/xuanzhuan_left.png" alt="">
                        <img class="iconRight"  src="../../../assets/xuanzhuan_left.png" alt="">
                    </div>
                </el-col>
                <el-col :span="24" style="margin-top: 20px">
                    <div>
                        <el-table
                                highlight-current-row v-loading="listLoading"  border
                                :data="Table"
                                height="500"
                                class="vue-table"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                @row-click="clickTr($event)"
                                style="width: 100%">
                            <el-table-column
                                    width="200"
                                    label="客户">
                                <template slot-scope="scope">
                                    <div>
                                        {{ scope.row.adver }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.allxf">
                                <template slot-scope="scope">
                                    <div class="firstTd">
                                      {{ Number(scope.row.data[6].cost)+Number(scope.row.data[5].cost)+Number(scope.row.data[4].cost)+Number(scope.row.data[3].cost)+Number(scope.row.data[2].cost)| currency('')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.xf_a">
                                <template slot-scope="scope">
                                    <div >
                                        {{ scope.row.data[6].cost | currency('')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.xf_b">
                                <template slot-scope="scope">
                                    <div>
                                        {{ scope.row.data[5].cost | currency('')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    :label="TableName.xf_c">
                                <template slot-scope="scope">
                                    <div>
                                        {{ scope.row.data[4].cost | currency('')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.xf_d">
                                <template slot-scope="scope">
                                    <div >
                                        {{ scope.row.data[3].cost | currency('')}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.xf_e">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        {{ scope.row.data[2].cost | currency('')}}
                                    </div>
                                </template>

                            </el-table-column>
                            <el-table-column
                                    label="涨跌幅">
                                <template slot-scope="scope">
                                     <span v-if="Number(scope.row.data[6].cost) != 0">
                                       <span v-if="(Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost)>0" style="color:#fe0000;">
                                           + {{ (Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost ) | currency('')}}%
                                       </span>
                                         <span v-if="(Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost)<0" style="color:#069683;">
                                            {{ (Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost) | currency('')}}%
                                       </span>
                                         <span v-if="(Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost)==0" >
                                            {{ (Number(scope.row.data[6].cost)-Number(scope.row.data[5].cost))/Number(scope.row.data[6].cost) | currency('')}}%
                                       </span>
                                   </span>
                                    <span v-if="Number(scope.row.data[6].cost) == 0">
                                       0
                                   </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :label="TableName.xf_f">
                                <template slot-scope="scope">
                                    <div style="text-align: center;font-weight: 700">
                                        <img v-if="Number(scope.row.data[6].rank) > Number(scope.row.data[5].rank)" src="../../../assets/s_jian.png" style="width: 15px;vertical-align: middle" alt="">
                                        <img v-if="Number(scope.row.data[6].rank) < Number(scope.row.data[5].rank)" src="../../../assets/x_jian.png" style="width: 15px;vertical-align: middle" alt="">
                                        <img v-if="Number(scope.row.data[6].rank) == Number(scope.row.data[5].rank)" src="../../../assets/heng.png" style="width: 15px;vertical-align: middle" alt="">

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
            </el-col>
        </el-col>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { productline } from '@/api/kehu';
    import { market_ticheng_all ,xiaohaomoneytjprlin,renewmoneytjprlin,xiaohaorank,xufeirank,money_xh_rank,money_xufei_rank,xiaohaoprzhanbi,renewproduct} from '@/api/money';
    import lineEcharts from './Charts/lineAndpie';
    import pieEcharts from './Charts/pie_line';
    import moment from "moment"
    export default {
        data() {
            return {
                loading:false,
                titleName:'全部',
                TableName:{
                    allxf:'总充值',
                    xf_a:'今日充值',
                    xf_b:'昨日充值',
                    xf_c:'3日前充值',
                    xf_d:'4日前充值',
                    xf_e:'5日前充值',
                    xf_f:"充值排名"
                },
                item:'',
                pieData:'',
                AllColor:true,
                listLoading:false,
                cw_LineTable:[],
                dataId:[],
                dataInfor:[],
                activeName: 'first',
                border_bottom_1:false,
                border_bottom_2:true,
                zhbshow:false,
                xjshow:true,
                lineInfor:[moment().format('YYYY-MM-01'),moment().format('YYYY-MM-DD')],
                productline:function(){
                    productline().then(response => {
                        this.dataInfor = response;
                    }).catch(error => {

                    });
                },
                xufeirank:function () {
                    xufeirank({
                    }).then(response => {
                        this.listLoading = false;
                        this.loading = false;
                        this.cw_LineTable = response.data;
                        this.kehuTableLength = response.data.length;
                    }).catch(error => {

                    });
                },
                renewmoneytjprlin:function(){
                    renewmoneytjprlin({
                        start:moment(this.lineInfor[0]).format('YYYY-MM-DD'),
                        end:moment(this.lineInfor[1]).format('YYYY-MM-DD'),
                        prlin:{prlin:this.dataId},
                    }).then(response => {
                        this.loading = false;
                        this.item = response;
                    }).catch(error => {

                    });
                },
                money_xufei_rank:function(){
                    money_xufei_rank({
                    }).then(response => {
                        this.listLoading = false;
                        this.loading = false;
                        this.cw_LineTable = response.data;
                        this.kehuTableLength = response.data.length;
                    }).catch(error => {

                    });
                },
//消耗
                xiaohaomoneytjprlin:function(){
                    xiaohaomoneytjprlin({
                        start:moment(this.lineInfor[0]).format('YYYY-MM-DD'),
                        end:moment(this.lineInfor[1]).format('YYYY-MM-DD'),
                        prlin:{prlin:this.dataId},
                    }).then(response => {
                        this.loading = false;
                        this.item = response;
                    }).catch(error => {

                    });
                },
                xiaohaorank:function () {
                    xiaohaorank({
                    }).then(response => {
                        this.listLoading = false;
                     this.cw_LineTable = response.data;
                     this.kehuTableLength = response.data.length;
                        this.loading = false;
                    }).catch(error => {

                    });
                },
                money_xh_rank:function(){
                    money_xh_rank({
                    }).then(response => {
                        this.listLoading = false;
                        this.loading = false;
                        this.cw_LineTable = response.data;
                        this.kehuTableLength = response.data.length;
                    }).catch(error => {

                    });
                },
                xiaohaoprzhanbi:function(){
                    xiaohaoprzhanbi({
                        state:moment(this.lineInfor[0]).format('YYYY-MM-DD'),
                        end:moment(this.lineInfor[1]).format('YYYY-MM-DD'),
                        prlin:{prlin:this.dataId},
                    }).then(response => {
                        this.pieData =response;
                    }).catch(error => {

                    });
                },
                renewproduct:function(){
                    renewproduct({
                        state:moment(this.lineInfor[0]).format('YYYY-MM-DD'),
                        end:moment(this.lineInfor[1]).format('YYYY-MM-DD'),
                        prlin:{prlin:this.dataId},
                    }).then(response => {
                        this.pieData =response;
                    }).catch(error => {

                    });
                },

                defaultProps: {
                    children: 'zi',
                    label: 'name'
                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:1,
            }
        },
        components: {
            lineEcharts,
            pieEcharts
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'audit_action'
            ]),
            Table(){
                return this.cw_LineTable.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){

            this.renewmoneytjprlin();
            this.productline();
            this.xufeirank();
            this.renewproduct();
        },
        methods: {
            ...mapActions([
                'Account'
            ]),
            all_line(){
                this.titleName = "全部";
                this.AllColor = false;
                this.dataId = [];
                this.AllColor = true;
                if(this.border_bottom_1){
                    this.xiaohaomoneytjprlin();
                    if(!this.zhbshow){
                        this.xiaohaorank();
                    }else{
                        this.money_xh_rank();
                    }
                }else{
                    this.renewmoneytjprlin();

                    this.renewproduct();
                    if(!this.zhbshow){
                        this.xufeirank();
                    }else{
                        this.money_xufei_rank();
                    }
                }
            },
            handleNodeClick(data){
                 this.dataId = [];
                 this.AllColor = false;
                 let _this = this;
                 this.loading = true;
                 this.titleName = data.name;
                if(data.zi&&data.zi.length>0){
                    data.zi.filter(function(item){
                        _this.dataId.push(item.id)
                    })
                }else{
                    this.dataId.push(data.id)
                }
                if(this.border_bottom_1){
                    this.xiaohaomoneytjprlin();
                    this.xiaohaoprzhanbi();
                    if(!this.zhbshow){
                        this.xiaohaorank();
                    }else{
                        this.money_xh_rank();
                    }
                }else{
                    this.renewmoneytjprlin();
                    this.renewproduct();
                    if(!this.zhbshow){
                        this.xufeirank();
                    }else{
                        this.money_xufei_rank();
                    }
                }

            },
            handleClick(){},
            LineChange(){
                if(this.border_bottom_1){
                    this.xiaohaomoneytjprlin();
                    this.xiaohaoprzhanbi();
                }else{
                    this.renewmoneytjprlin();
                    this.renewproduct();
                }
            },
            radioData_a(val){

                this.loading = true;
                if( val != true){
                    this.TableName = {
                        allxf:'总消耗',
                        xf_a:'今日消耗',
                        xf_b:'昨日消耗',
                        xf_c:'3日前消耗',
                        xf_d:'4日前消耗',
                        xf_e:'5日前消耗',
                        xf_f:"消耗排名"
                    };
                    this.border_bottom_1 = !this.border_bottom_1;
                    this.border_bottom_2 = !this.border_bottom_2;
                    this.xiaohaomoneytjprlin();
                    this.xiaohaoprzhanbi();
                    if(!this.zhbshow){
                        this.xiaohaorank();
                    }else{
                        this.money_xh_rank();

                    }
                }
            },
            radioData_b(val){
                this.loading = true;
                if( val != true){

                    this.TableName = {
                        allxf:'总充值',
                        xf_a:'今日充值',
                        xf_b:'昨日充值',
                        xf_c:'3日前充值',
                        xf_d:'4日前充值',
                        xf_e:'5日前充值',
                        xf_f:"充值排名"
                    };


                    this.border_bottom_1 = !this.border_bottom_1;
                    this.border_bottom_2 = !this.border_bottom_2;
                    this.renewmoneytjprlin();
                    this.renewproduct();
                    if(!this.zhbshow){
                        this.xufeirank();
                    }else{
                        this.money_xufei_rank();
                    }
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
            },
            zhbColorBtn(val){
                this.listLoading = true;
                if( val == true){
                    this.zhbshow =  !this.zhbshow;
                    this.xjshow =  !this.xjshow;
                    this.xiaohaomoneytjprlin();
                    this.xiaohaoprzhanbi();
                    if(this.border_bottom_1){
                        this.xiaohaorank();
                    }else{
                        this.xufeirank();
                    }

                }
            },
            xjColorBtn(val){
                this.listLoading = true;
                if( val == true){
                    this.zhbshow =  !this.zhbshow;
                    this.xjshow =  !this.xjshow;
                    if(this.border_bottom_1){
                        this.money_xh_rank();
                    }else{
                        this.money_xufei_rank();
                    }

                }
            },
        },
        created() {

        },
        filters:{

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .caiwu_line {
        .btn_down {
            float: right;
            position: relative;
            margin:45px 20px 0 0;
            .zhb {
                margin: 7px 20px 7px 0 ;
            }
            .xj {
                margin-left: 33px;
            }
            .zhb,.xj{
                width:55px;
                height:18px;
                display: block;
                line-height: 18px;
                font-size: 12px;
                text-align: center;
                border-radius: 3px;
                cursor: pointer;
                background: #669fe4;
                color: white;
            }
            .xjColor {
                color: #499fe2;
                background: none;
                border:1px solid #499fe2;
            }
            .iconLeft,.iconRight {
                width: 15px;
                border: 0;
                position: absolute;
            }
            .iconLeft {
                top: 28px;
                left: 11px;
            }
            .iconRight {
                transform:rotate(-180deg);
                -ms-transform:rotate(-180deg);
                -moz-transform:rotate(-180deg);
                -webkit-transform:rotate(-180deg);
                -o-transform:rotate(-180deg);
                top: 11px;
                right: 13px;
            }
        }
        .title {
            .radio{
                margin: 5px 0 0 0;
                width:100%;
                border-bottom:1px solid #e4e7ed;
                .f_1,.f_2:hover{
                    color: #409eff;
                }
                .f_1,.f_2 {
                    display: inline-block;
                    padding: 10px 30px;
                    font-size: 14px;
                    cursor: pointer;
                    color: black;
                }
                .border_bottom {
                    color: #409eff;
                    border-bottom: 2px solid #409eff;
                }
            }
        }
        .left_box {
            padding-right: 10px;
            .leftTreeBox {
                height: 1382px;
                border:1px solid #cdcac4;
                .allTree {
                    width:100%;
                    height:30px;
                    line-height:30px;
                    font-size: 12px;
                    padding-left: 20px;
                }
                .AllColor {
                    background: #f5f7f9;
                }
                .allTree:hover{
                    background: #f5f7f9;
                    color: #81b5ff;
                    cursor: pointer;
                }
            }
        }
        .right_box{
            position: relative;
            .el-tabs__item{
                width:100px;
                text-align: center;
            }
            .date_title {
                height:30px;
                margin-top: 10px;
                text-align: right;
                .el-date-editor {
                    width:210px;
                    height:30px;
                    padding: 0;
                    input{
                        height:24px!important;
                        line-height: 24px!important;
                    }
                    .el-input__icon {
                        line-height: 34px!important;
                    }
                }

            }
        }
    }

</style>
