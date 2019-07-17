<template>
    <div class="history" >
        <el-row class="historyBox">
            <el-col :span="24" class="history_title" v-for="(data,index) in funData" :key="index">
                <div class="history_div" >
                    <div class="icoBox">
                        <div class="iconQian" style=" background: #80b3f1;">
                            <img src="../../../assets/qian.png" style="width: 18px;height:18px;" alt="">
                        </div>
                    </div>
                    <div class="history_infor">
                        <p class="name">
                            余额
                        </p>
                        <p class="num">
                            {{ Number( data.balance) | currency('') }}
                        </p>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="history_div" >
                    <div class="icoBox">
                        <div class="iconQian" style=" background: #4c93eb;">
                            <img src="../../../assets/qian.png" style="width: 18px;height:18px;" alt="">
                        </div>
                    </div>
                    <div class="history_infor">
                        <p class="name">
                            回款
                        </p>
                        <p class="num">
                            {{ data.huikuan | currency('') }}
                        </p>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="history_div" >
                    <div class="icoBox">
                        <div class="iconQian" style=" background: #1972e6;" >
                            <img src="../../../assets/qian.png" style="width: 18px;height:18px;" alt="">
                        </div>
                    </div>
                    <div class="history_infor">
                        <p class="name">
                            补款
                        </p>
                        <p class="num">
                            {{ data.bukuan | currency('')  }}
                        </p>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="history_div" >
                    <div class="icoBox">
                        <div class="iconQian" style=" background: #114ba8;">
                            <img src="../../../assets/qian.png" style="width: 18px;height:18px;" alt="">
                        </div>
                    </div>
                        <div class="history_infor">
                            <p class="name">
                                充值
                            </p>
                            <p class="num">
                                {{  data.yu_e | currency('') }}
                            </p>
                        </div>
                </div>
            </el-col>
            <el-col :span="24" class="history_operation">
                <div class="left">
                    <el-date-picker
                            v-model="date"
                            class="leftDate"
                            type="daterange"
                            @change="lishiDate"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="distributionButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" style="font-size: 18px;margin:10px 0;">
                总金额：{{Allmoney | currency('') }}
            </el-col>
            <el-col :span="24" class="history_table">
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="historyTable"
                        class="vue-table"
                        height="auto"
                        @row-click="clickTr($event)"
                        style="width: 100%">
                    <el-table-column
                            label="广告主">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                            <span v-if="scope.row.guanggaozhu">
                                  {{ scope.row.guanggaozhu.advertiser  }}
                            </span>
                            <span v-else>
                                  ---
                            </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="时间">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{ scope.row.date  }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                            {{ scope.row.ctime }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="金额">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                            <div v-if="Number(scope.row.money)>0">
                                +{{ scope.row.money }}
                            </div>
                            <div v-if="Number(scope.row.money)<=0" style="color: red">
                                {{ scope.row.money }}
                            </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="款余额">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                            {{ scope.row.kyue  | currency('') }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            header-align="center"
                            label="审核状态">
                        <template slot-scope="scope">
                            <div class="start_icon" v-if="scope.row.audit == 2 ">
                                <img src="../../../assets/cha.png" v-if="scope.row.audit == 2" style="width: 18px; color:  red;font-size: 16px;margin-right: 10px;cursor: pointer" alt="">
                            </div>
                            <div class="start_icon" v-if="scope.row.audit == 0" style=" color:  #444444;font-size: 16px;margin-right: 10px;cursor: pointer">
                                <img src="../../../assets/dengdai.png" style="width: 18px" alt="">
                            </div>
                            <div class="start_icon" v-if="scope.row.audit == 1 && scope.row.is_ultimate_shenhe ==1" style=" color:  #54ADFF;font-size: 16px;margin-right: 10px;cursor: pointer">
                                <img src="../../../assets/duigou.png" style="width: 18px" alt="">
                            </div>
                            <div class="start_icon" v-if="scope.row.audit == 1 && scope.row.is_ultimate_shenhe ==0" style=" color:  #444444;font-size: 16px;margin-right: 10px;cursor: pointer">
                                <img src="../../../assets/dengdai.png" style="width: 18px" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            header-align="center"
                            label="提交人">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{ scope.row.submitusers }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="270"
                            header-align="center"
                            label="说明">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                <!--分配款-->
                                <div style="margin: 10px 0 5px 0 "  v-if="scope.row.type =='分配款'">
                                    <span>账户名称:</span><span  v-if="scope.row.account ">{{ scope.row.account | fileDataFun }}</span>
                                    <span v-else>---</span>
                                </div>
                                <!--充值-->
                                <div style="margin: 10px 0 5px 0 "  v-if="scope.row.type =='充值'">
                                    <span>{{ $t('titles.fandian') }}:{{  scope.row.fandian   }}&nbsp;&nbsp;&nbsp;</span>
                                    <span v-if=" scope.row.show_money  ">账户币:{{  scope.row.show_money  | currency('') }}</span>
                                    <span v-else>账户币:---</span>
                                    <div >
                                        <span>账户名称:</span><span v-if="scope.row.account ">{{ scope.row.account | fileDataFun }}</span>
                                        <span v-else>---</span>
                                    </div>
                                </div>
                                <!--退款-->
                                <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='退款'">
                                        <span>{{ $t('titles.fandian') }}:{{  scope.row.fandian }}</span>&nbsp;&nbsp;&nbsp;
                                        <span v-if=" scope.row.show_money  ">账户币:{{  scope.row.show_money | currency('') }}</span>
                                        <span v-else>账户币:---</span>
                                    <div >
                                        <span>账户名称:</span><span v-if="scope.row.account ">{{ scope.row.account | fileDataFun }}</span>
                                        <span v-else>---</span>
                                    </div>
                                    <!--<span style="display: block;color:#f85275 ;">{{scope.row.mes}}</span>-->
                                </div>
                                <!--补款-->
                                <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='补款'">

                                    <span>{{ $t('titles.fandian') }}:{{  scope.row.fandian  }}</span>&nbsp;&nbsp;&nbsp;
                                    <span v-if=" scope.row.show_money  ">账户币:{{  scope.row.show_money| currency('') }}</span>
                                    <span v-else>账户币:---</span>
                                </div>
                                <!--转出-->
                                <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='转款'">
                                    <span>{{ $t('titles.fandian') }}:{{  scope.row.fandian  }}</span>
                                </div>
                                <!--转出-->
                                <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='客户补款'">
                                    <span>
                                        {{ scope.row.mes }}
                                    </span>
                                </div>
                                <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='分配保证金'">
                                    <span>
                                      ---
                                    </span>
                                </div>
                                 <div style="margin: 10px 0 5px 0 " v-if="scope.row.type =='转出保证金'">
                                    <span>
                                      ---
                                    </span>
                                  </div>
                                    <div style="margin: 10px 0 5px 0 "  v-if="scope.row.type =='补账户币'">
                                        <span>账户名称:</span><span  v-if="scope.row.account ">{{ scope.row.account.a_users  }}</span>
                                        <span v-else>---</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="120"
                            header-align="center"
                            label="状态详情">
                        <template slot-scope="scope">
                            <div style="text-align: center" >
                                <span class='operation operation_a' :class="{ textColor:scope.row.audit == 2 }"  v-if="scope.row.type =='分配款'">分配款</span>
                                <span class='operation operation_b':class="{ textColor:scope.row.audit == 2 }" v-if="scope.row.type =='充值'">充值</span>
                                <span class='operation operation_c' :class="{ textColor:scope.row.audit == 2 }"  v-if="scope.row.mes =='退款到客户'">退款到客户</span>
                                <span class='operation operation_h' v-if="scope.row.mes =='退款到总账户'" :class="{ textColor:scope.row.audit == 2 }">退款到总账户</span>
                                <span class='operation operation_d' v-if="scope.row.type =='补款'" :class="{ textColor:scope.row.audit == 2 }">补款</span>
                                <span class='operation operation_e' v-if="scope.row.type =='转款'" :class="{ textColor:scope.row.audit == 2 }">转出</span>
                                <span class='operation operation_f' v-if="scope.row.type =='客户补款'" :class="{ textColor:scope.row.audit == 2 }">客户补款</span>
                                <span class='operation operation_g' v-if="scope.row.type =='分配保证金'" :class="{ textColor:scope.row.audit == 2 }">分配保证金</span>
                                <span class='operation operation_k' v-if="scope.row.type =='打保证金'" :class="{ textColor:scope.row.audit == 2 }">打保证金</span>
                                <span class='operation operation_l' v-if="scope.row.type =='转出保证金'" :class="{ textColor:scope.row.audit == 2 }">转出保证金</span>
                                <span class='operation operation_m' v-if="scope.row.type =='补账户币'" :class="{ textColor:scope.row.audit == 2 }">补账户币</span>
                                <span class='operation operation_n' v-if="scope.row.type =='转出退款'" :class="{ textColor:scope.row.audit == 2 }">转出退款</span>
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { contract_history } from '@/api/kehu';
    import moment from "moment"
    let date = [];
    export default {
        data() {
            return {
                routeId:'',
                funData:[],
                date:[],
                historyTable:[],
                Allmoney:'',
                listLoading:true,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                time_start:'',
                time_end:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                contract_history(time_start,time_end){
                    contract_history({
                        page:this.page,
                        num:this.num,
                        id:this.$route.query.id,
                        time_start:this.time_start,
                        time_end:this.time_end,
                    }).then(response => {
                        this.listLoading = false;
                        this.funData = [];
                    this.funData.push(response.contract_info);
                    this.historyTable = response.data;
                        this.Allmoney = response.sum;
                    this.kehuTableLength =  response.totalCount;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_historyExcel(time_start,time_end){
                    contract_history({
                        id:this.$route.query.id,
                        page:this.kehuTableLength ,
                        num:1,
                        time_start:this.time_start,
                        time_end:this.time_end,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.account){
                                item['account'] = item.account.a_users;
                            }
                            //          audit_count   当前是第几审核
//          audit   0未审核 1通过 2驳回
                            //is_ultimate_shenhe  最终审核状态
                            if(item.audit == 2){
                                item['shenheName'] = '驳回';
                            }else if(item.audit == 0){
                                item['shenheName'] = '未完成';
                            }else if(item.audit == 1 && item.is_ultimate_shenhe ==1){
                                item['shenheName'] = '已完成';
                            }else if(item.audit == 1 && item.is_ultimate_shenhe ==0){
                                item['shenheName'] = '未完成';
                            }
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['时间', '创建时间', '金额','款余额','提交人','账户币','账户名称','类型','说明','审核状态'];
                            const filterVal = ['date', 'ctime', 'money','kyue','submitusers','show_money','account','type','mes','shenheName'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '历史记录');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },

            }
        },
        components: {
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        methods: {
            history(){
                this.routeId =  this.$route.query.id;
                this.contract_history();
            },
            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.contract_history();
            },
            handleCurrentChange(val) {
                this.num = val;
                this.contract_history();
            },
            outExcel(){
                this.contract_historyExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            lishiDate(){
                if(this.date[0]){
                        date = [];
                        for(var i = 0;i<this.date.length;i++){
                            date.push(moment(this.date[i]).format('YYYY-MM-DD'));
                        }

                        this.time_start = date[0];
                        this.time_end = date[1];
                }else{
                  this.time_start = '';
                   this.time_end = '';
                }
                this.contract_history();
            },
            clickTr(val){

                if(val.type == '分配款'){
                }else if(val.type == '充值'){
                    if(val.is_xiadan == "0"){
                        this.$router.push({ name: 'renew',query: { id: val.id} });
                    }else{
                        this.$router.push({ name: 'orderdetails', query: { id: val.id} });
                    }
                }else if(val.type == '退款'){
                    this.$router.push({ name: 'tuikuanlist',query: { id: val.id ,name:val.mes}})
                }else if(val.type == '补款'){
                    this.$router.push({ name: 'replenishment',query: { id: val.id} });
                }else if(val.type == '补账户币'){
                    this.$router.push({ name: 'replenishment',query: { id:val.id,payment_type:311} });
                }

            },
//跳转
            jumpCustomerList(){
                this.$router.push({ name: 'kehuliebiao' });
            },
            jumpConsole(){
                this.$router.push({ name: 'console'  ,query: { type:1} });
            },
        },
        created() {

        },
        filters:{
            fileFun(val){
                if(val){
                    return val
                }else{
                    return '---'
                }
            },
            fileDataFun(val){
                if(val){
                    return val.a_users
                }else{
                    return '---'
                }

            },
            fileFunName(val){
                if(val){
                    return val.name
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
    .history {
        width:100%;
        .historyBox {
            .consoleTitle{
                margin:10px 0;
                .corporateName {
                    font-size: 22px;
                }
                .appInfotBox {
                    height: 30px;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 30px;
                    .appInfor {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        text-align: center;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius: 50%;
                        margin:0 100px 0 0px ;
                    }
                    .appInfor.qu{
                        color: white;
                        background: #FF8754;
                    }
                    .appInfor.zhi{
                        color: white;
                        background: #3F7FFC;
                    }
                }

                .name {
                    height:30px;
                    line-height: 30px;
                    font-size: 12px;
                    display: inline-block;
                    margin: 0;
                    vertical-align: top;
                    position: relative;
                    .hoverTishi {
                        width:225px;
                        height:20px;
                        line-height: 20px;
                        display: inline-block;
                        background: #cfc6c6;
                        position: absolute;
                        top:-20px;
                        margin:0;
                        .color{
                            color: #54adff;
                            cursor: pointer;
                        }
                    }
                    .show {
                        -webkit-transition:opacity 1s;
                        opacity:0;
                        pointer-events:auto;
                    }
                    .chaxun {
                        width:14px;
                        height:14px;
                        line-height: 15px;
                        text-align: center;
                        font-size: 12px;
                        display: inline-block;
                        border-radius: 50%;
                        color: white;
                        background: #bbbbbb;
                        cursor: pointer;
                    }
                    .chaxun:hover  .hoverTishi{
                        display: none;
                    }
                    .nameColor {
                        color: #9C9C9C;
                    }
                    .lastName {
                        margin-left: 10px;
                    }
                }
            }
            .history_title {
                border: 1px solid #88d8fd;
                background: #fafdff;
                margin-top: 20px;
                width:100%;
                .history_div {
                    width:25%;
                    float: left;
                    position: relative;
                    .icoBox{
                        display: inline-block;
                        width:80px;
                        height: 90px;
                        vertical-align: top;
                        position: relative;
                        .iconQian{
                            width:40px;
                            height:40px;
                            text-align: center;
                            line-height: 50px;

                            border-radius: 50%;
                            position: absolute;
                            top:0;
                            bottom:0;
                            left:20px;
                            margin:auto;
                            color: white;
                            .icon{
                                font-size: 30px;
                            }
                        }
                    }
                    .history_infor {
                        display: inline-block;
                        padding:10px 0 0 0;
                        position: relative;

                        p{
                            margin:0;
                        }
                        p.name{
                            font-size: 14px;
                        }
                        p.num{
                          font-size: 24px;
                            margin:15px 0;
                        }
                    }
                    .line {
                        position: absolute;
                        display: block;
                        top:0;
                        bottom:0;
                        right:0;
                        margin:auto;
                        height:70px;
                        width:1px;
                        background: #bdd8f8;
                    }
                }

            }
            .history_operation {
                width:100%;
                margin-top: 20px;
                .left{
                    float: left;
                    .leftDate {
                        width:220px;
                        height:30px;
                        line-height: 30px;
                        padding:0;
                        input{
                            height:22px!important;
                            line-height: 22px!important;
                            font-size: 12px;
                            vertical-align: top;
                        }
                        .el-range__icon{
                            line-height: 14px;
                        }
                        .el-range-separator {
                            line-height: 24px;
                            vertical-align: top;
                        }
                        .el-range__close-icon {
                            width:13px;
                            vertical-align: top;
                            line-height: 21px;
                        }
                    }
                }

                .distributionButton {
                    float: right;
                    width:80px;
                    height:30px;
                    margin-right: 24px;
                    button{
                        height:30px!important;
                        line-height: 6px;
                    }
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        padding: 0;
                        width: 90px;
                        height: 30px;
                        line-height: 30px;
                        color: #54ADFF;
                        padding: 0;
                        width: 90px;
                    }
                }
            }
            .history_table {
                .vue-table{
                    .start_icon {
                        font-size: 18px;
                        font-weight: bold;
                        text-align: center;
                    }
                    .state{
                        margin-top: 5px;
                        span:first-child{
                            width:150px;
                            height:22px;
                            line-height: 22px;
                            text-align: center;
                            display: inline-block;
                            border-radius: 3px;
                            margin-right: 5px;
                        }
                        span:last-child{

                        }
                    }
                    .state_a {
                        span:first-child{
                            border:1px solid #54ADFF;
                            color: #54ADFF;
                        }
                    }
                    .state_b {
                        span:first-child{
                            border:1px solid #65cc81;
                            color: #65cc81;
                        }
                    }
                    .state_c {
                        span:first-child{
                            border:1px solid #f85275;
                            color: #f85275;
                        }
                    }
                    .state_d {
                        span:first-child{
                            border:1px solid #f59a3d;
                            color: #f59a3d;
                        }
                    }
                    .state_e {
                        span:first-child{
                            border:1px solid #b465e5;
                            color: #b465e5 ;
                        }
                    }
                    .state_f {
                        span:first-child{
                            border:1px solid #159688;
                            color: #159688 ;
                        }
                    }
                    .operation {
                        width:85px;
                        height:25px;
                        display: block;
                        line-height: 25px;
                        text-align: center;
                        color: white;
                        border-radius: 5px;
                        font-size: 12px;
                        margin:0  auto;
                    }
                    .operation_a{
                        background: #58aefd;
                    }
                    .operation_b{
                        background: #65cc81;
                    }
                    .operation_c{
                        background: #f85275;
                    }
                    .operation_d{
                        background: #f59a3d;
                    }
                    .operation_e{
                        background: #b465e5;
                    }
                    .operation_f{
                        background: #159688;
                    }
                    .operation_g{
                        background: olive;
                    }
                    .operation_h {
                        background: #ef090c;
                    }
                    .operation_k {
                        background: gold;
                    }
                    .operation_l {
                        background: greenyellow;
                    }
                    .operation_m {
                        background: blueviolet;
                    }
                    .operation_n {
                        background: #E2C64B;
                    }
                }
            }

        }

    }

</style>
