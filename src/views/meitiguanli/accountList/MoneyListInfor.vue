<template>
    <div class="MoneyList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpMoneylist">金额列表</span>><span>查看详情</span>
            </p>
        </el-row>
        <el-col :span="24" class="title">
            <div class="el-col el-col-24" style="padding-left: 0px; padding-right: 10px;font-size: 12px;font-weight: bold;margin: 10px 0;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 100%; background: rgb(34, 47, 59);"></span>
                账户概览
            </div>
            <el-col :span="24" class="date_title moneyEcarts">
                <el-col :span="4"  class="account_top_left account_left">
                    <div  class="account_box">
                        <p class="text textFirst">
                           {{ a_users}}
                        </p>
                        <p class="text ">
                           {{ accountName }}
                        </p>
                        <p class="text ">
                          ({{ ctime |ctimeData}}-{{ endtime |ctimeData}})
                        </p>
                    </div>
                </el-col>
                <el-col :span="20" class="account_top_right">
                    <el-date-picker
                            v-model="dateInfor"
                            type="daterange"
                            align="right"
                            unlink-panels
                            @change="dateMoney"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-col :span="24" class="top_bar">
                        <el-col :span="4" class="bar left_box">
                            总余额:{{ Allyue | currency('')}}
                        </el-col>
                        <el-col :span="13" class=" center_box">
                            <div class="bar">
                                <el-progress :text-inside="true"  :percentage="AllyeWIdth"></el-progress>
                            </div>
                           <div class="bar_a">
                               <el-progress style="margin-top: 10px" :text-inside="true"  :percentage="AllxiaohaoWIdth"></el-progress>
                           </div>

                        </el-col>
                        <el-col :span="7" class="right_box">
                            <p class="right_box_a">
                                总充值:{{ Allxufei | currency('')}}
                            </p>
                            <p class="right_box_b">
                                总消耗:{{ Allxiaohao | currency('')}}
                            </p>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </el-col>
        <el-col :span="24" class="table" v-if="moneyNone">
            <div class="el-col el-col-24" style="padding-left: 0px; padding-right: 10px;font-size: 12px;font-weight: bold;margin: 10px 0;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 100%; background: rgb(34, 47, 59);"></span>
                关联账户概览
            </div>
            <el-col :span="24" class="moneyTable">
                <div v-if="showTable" style="margin-bottom: 10px">
                    <el-table
                             v-loading="listLoading"
                             border
                             ref="singleTable"
                            :data="moneyTable"
                             class="table"
                            max-height="250"
                             highlight-current-row
                             @current-change="handleCurrentChange"
                            highlight-current-row
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                label="关联账户">
                            <template slot-scope="scope">
                                {{ scope.row.a_users }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="充值">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.xufei| currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="消耗">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{ scope.row.cost| currency('')}}

                                </div>
                              </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="余额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{  scope.row.xufei -  scope.row.cost | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="24" class="moneyEcarts"    v-loading="listLoading_a">
                <el-col :span="4"  class=" account_left ">
                    <div  class="account_box">
                        <p class="text text_a">
                            关联账户:{{ name_table}}
                        </p>
                        <p class="text text_b">
                            最高消耗:{{ max_xiaoaho | currency('')}}
                        </p>
                        <p class="text text_c">
                            平均消耗:{{ Average_xiaoaho | currency('')}}
                        </p>
                        <p class="text text_d">
                            最低消耗:{{ min_xiaoaho | currency('')}}
                        </p>
                    </div>
                </el-col>
                <el-col :span="20">
                    <linMoney :item=item></linMoney>
                </el-col>
            </el-col>
        </el-col>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { acccount_money_info,acccount_money_info_day } from '@/api/meiti';
    import linMoney from './Charts/line_Money';

    import moment from "moment"
    export default {
        data() {
            return{
                AllxiaohaoWIdth:0,
                AllyeWIdth:0,
                accountName:'',
                a_users:'',
                name_table:'',
                max_xiaoaho:'',
                Average_xiaoaho:'',
                min_xiaoaho:'',
                listLoading:true,
                listLoading_a:true,
                showTable:false,
                moneyNone:true,
                Allxufei:0,
                Allxiaohao:0,
                Allyue:0,
                dateInfor:[],
                moneyTable:[],
                currentRow: null,
                item:[],
                ctime:'',
                endtime:'',
                acccount_money_info_day:function(start,end,account,advertiser){
                    acccount_money_info_day({
                        start:start,
                        end:end,
                        data:{
                            account:account,
                            advertiser:advertiser,
                        }
                    }).then(response => {
                        this.max_xiaoaho = response.max;
                        this.min_xiaoaho = response.min;
                        this.item = response;
                        let allNum = 0;
                        for(let a =0;a<response.data.length;a++){
                            allNum += Number(response.data[a].cost)
                        }
                        this.Average_xiaoaho = allNum/response.data.length;
                        this.listLoading_a = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                acccount_money_info:function(start,end){
                    acccount_money_info({
                        start:start,
                        end:end,
                        data:{
                            account:this.accounts.a_users,
                            advertiser:this.accounts.advertiser,
                        }

                    }).then(response => {
                        if(response.length == 0){
                            this.moneyNone = false;
                            this.Allxufei = 0;
                                this.Allxiaohao = 0;
                                this.Allyue = 0;
                            this.AllxiaohaoWIdth = 100;
                            this.AllyeWIdth = 100;
                        }else{
                            this.moneyNone = true;
                            this.moneyTable = response;
                            this.listLoading = false;
                            if(response[0].alias){
                                this.showTable = true;
                                this.name_table = response[0].a_users;
                                this.acccount_money_info_day(start,end,response[0].a_users,response[0].avid);
                            }else{
                                this.showTable = false;
                                this.acccount_money_info_day(start,end,this.accounts.a_users,this.accounts.avid);
                            }
                            for(let a = 0;a<response.length;a++){
                                this.Allxufei+=Number(response[a].xufei);
                                this.Allxiaohao+=Number(response[a].cost);
                            }
                            this.ctime = response[0].ctime;
                            this.endtime = response[0].endtime;
                            this.AllxiaohaoWIdth = this.Allxiaohao/(this.Allxiaohao+this.Allxufei)*100;
                            this.AllyeWIdth = this.Allxufei/(this.Allxiaohao+this.Allxufei)*100;
                            this.Allyue =   this.Allxufei - this.Allxiaohao;
                            this.$refs.singleTable.setCurrentRow(this.moneyNone[0]);
                        }


                    }). catch(err => {this.$message.error('获取失败');});
                },
            }
        },
        components: {
            linMoney,
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
                'accounts'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.accountName = this.accounts.advertiser;
            this.a_users = this.accounts.a_users;
            if(this.accounts.start == "2000-01-01"){
                this.dateInfor = [];
            }else{
                this.dateInfor = [this.accounts.start,this.accounts.end];
            }
            this.acccount_money_info(this.accounts.start,this.accounts.end);
        },
        methods:{
            jumpMoneylist(){
                this.$router.go(-1)
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            clickTr(val){
                this.listLoading_a = true;
                if(this.dateInfor.length == 0){
                    this.acccount_money_info_day(this.accounts.start,this.accounts.end,val.a_users,val.avid);
                }else{
                    this.acccount_money_info_day(moment(this.dateInfor[0]).format('YYYY-MM-DD'),moment(this.dateInfor[1]).format('YYYY-MM-DD'),val.a_users,val.avid);
                }
                this.name_table = val.a_users;
            },
            dateMoney(){
                this.acccount_money_info(moment(this.dateInfor[0]).format('YYYY-MM-DD'),moment(this.dateInfor[1]).format('YYYY-MM-DD'));
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                if( moment(time).format('YYYY-MM-DD') == "2099-09-09"){
                    return "未结束"
                }
                return   moment(time).format('YYYY-MM-DD')
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .MoneyList {
        .title {
            .date_title {
                .el-input__inner {
                    width: 270px;
                    height: 30px;
                    padding: 0;
                    input {
                        height: 22px !important;
                        line-height: 22px !important;
                    }
                    .el-range-separator {
                        width: 22px;
                    }
                }
                .account_top_right {
                    padding-left: 20px;
                    .left_box, .center_box, .right_box {
                        font-size: 12px;
                    }
                    .left_box {
                        margin-top: 23px;
                    }
                    .right_box {
                        padding-left: 20px;
                        .right_box_a {
                            margin-top: 10px;
                        }
                        .right_box_b {
                            margin-top: 10px;
                        }
                    }
                }
            }
            .bar, .bar_a {
                margin-top: 10px;
                .el-progress-bar {
                    .el-progress-bar__outer {
                        background: white;
                        height: 18px !important;
                        .el-progress-bar__inner {
                            background-color: #2CCEBF;
                            .el-progress-bar__innerText {
                                opacity: 0;
                            }
                        }
                    }
                }
            }
            .bar_a {
                .el-progress-bar__inner {
                    background-color: #54ADFF !important;
                }
            }
            .table {
                .v_table {
                    tr {
                        height: 40px;
                        td {
                            width: 100%;
                            overflow: hidden;
                            white-space: nowrap;
                            border: none;
                            .line {
                                width: 1px;
                                height: 20px;
                                background: #e3e3e3;
                                display: inline-block;
                                margin: 0 6px;
                            }
                        }

                    }

                    .info-row {
                    }
                    .el-table__header thead tr th {
                        border-bottom: none;
                    }
                    .cell, .td-text {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #000;
                        padding-left: 20px;
                        font-size: 12px;
                    }
                    tbody tr:nth-child(even) {
                        background: #f8f9fb;
                    }
                    tbody tr:nth-child(odd) {
                        background-color: #fff;
                    }
                    .cell {
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .appInfor {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        text-align: center;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius: 50%;
                    }
                    .appInfor.qu {
                        color: white;
                        background: #FF8754;
                    }
                    .appInfor.zhi {
                        color: white;
                        background: #3F7FFC;
                    }

                }
                .v_table ::-webkit-scrollbar {
                    width: 7px;
                    height: 16px;
                    border-radius: 0;
                    background-color: white;
                }

                /*定义滚动条的轨道，内阴影及圆角*/
                .v_table ::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background-color: white;
                }
                /*定义滑块，内阴影及圆角*/
                .v_table ::-webkit-scrollbar-thumb {
                    /*width: 10px;*/
                    height: 10px;
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px white;
                    background-color: rgba(205, 211, 237, .4);
                }
                .moneyEcarts {
                    height: 200px;
                    margin: 10px 0;
                }

            }

            .account_top_left {
                height: 100px !important;
                .textFirst {
                    font-size: 16px !important;
                }
                .text {
                    height: 25px !important;
                }
            }
        }
        .table {
            tr{
                height:40px;
                td{
                    width:100%;
                    overflow: hidden;
                    white-space: nowrap;
                    border:none;
                    .line{
                        width:1px;
                        height: 20px;
                        background: #e3e3e3;
                        display: inline-block;
                        margin:0 6px;
                    }
                }

            }

            .info-row {}
            .el-table__header thead tr th{
                border-bottom: none;
            }
            .cell, .td-text {
                width:100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                color: #000;
                padding-left: 20px;
                font-size: 12px;
            }
            tbody tr:nth-child(even){
                background: #f8f9fb;
            }
            tbody tr:nth-child(odd){
                background-color: #fff;
            }
            .cell{
                width:100%;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .appInfor {
                width: 20px;
                height: 20px;
                display: inline-block;
                text-align: center;
                line-height: 20px;
                font-size: 12px;
                border-radius: 50%;
            }
            .appInfor.qu{
                color: white;
                background: #FF8754;
            }
            .appInfor.zhi{
                color: white;
                background: #3F7FFC;
            }
            /*thead{*/
            /*tr{*/
            /*th:first-child{*/
            /*.cell{*/
            /*padding-left:40px;*/
            /*}*/
            /*}*/
            /*}*/
            /*}*/
        }
        .table  ::-webkit-scrollbar{
            width: 7px;
            height: 16px;
            border-radius:0;
            background-color: white;
        }

        /*定义滚动条的轨道，内阴影及圆角*/
        .table   ::-webkit-scrollbar-track{
            border-radius: 10px;
            background-color: white;
        }
        /*定义滑块，内阴影及圆角*/
        .table   ::-webkit-scrollbar-thumb{
            /*width: 10px;*/
            height: 10px;
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px white;
            background-color: rgba(205,211,237,.4);
        }
        .account_left {
            height: 200px;
            .account_box {
                width: 100%;
                height: 100%;
                background: #F7F7F7;
                padding: 5px;
                .text {
                    width: 100%;
                    font-size: 12px;
                    height: 30px;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .text_a {
                    border-bottom: 1px solid #dedcd8;
                    color: black;
                }
                .text_b {
                    color: #ff0655;
                }
                .text_c {
                    color: #ff8f03;
                }
                .text_d {
                    color: #11b2f7;
                }

            }

        }
    }

</style>
