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
                            总余额
                        </p>
                        <p class="num">
                            {{Number( data.dakuan)+Number(data.bukuan)- Number( data.yu_e) | currency('') }}
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
                            分配打款
                        </p>
                        <p class="num">
                            {{ data.dakuan | currency('') }}
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
            <el-col :span="24" class="history_operation" style="margin-bottom: 10px">
                <el-date-picker  :clearable='false'
                        v-model="date"
                        class="leftDate"
                        type="daterange"
                        @change="lishiDate"
                        :picker-options="pickerOptions"
                         start-placeholder="开始日期"
                         end-placeholder="结束日期">
                </el-date-picker>
                <div class="distributionButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
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
                            label="账户">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                <span v-if="scope.row.account">
                                {{ scope.row.account.a_users }}
                                </span>
                                <span v-else>
                                    --
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="账户币">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                                <div v-if="Number(scope.row.money)>0">
                                    {{ scope.row.show_money }}
                                </div>
                                <div v-if="Number(scope.row.money)<=0" style="color: red">
                                    {{ scope.row.show_money }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="金额">
                        <template slot-scope="scope">
                            <div :class="{ textBorder:scope.row.audit == 2 }">
                            <div v-if="Number(scope.row.money)>0">
                                {{ scope.row.money }}
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
                            <!--audit_count   当前是第几审核-->
                            <!--audit   0未审核 1通过 2驳回-->
                            <!--is_ultimate_shenhe 1审核完 2未审核-->
                            <div class="start_icon" v-if="scope.row.audit == 2 ">
                                <img src="../../../assets/cha.png" v-if="scope.row.audit == 2" style="width: 18px; color:  red;font-size: 16px;margin-right: 10px;cursor: pointer" alt="">

                            </div>
                            <div class="start_icon" v-if="scope.row.audit == 0 " style=" color:  #444444;font-size: 16px;margin-right: 10px;cursor: pointer">
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
                                <el-tooltip :content="scope.row.mes" placement="top" effect="light">
                                   <span>
                                       {{scope.row.mes}}
                                   </span>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="120"
                            header-align="center"
                            label="状态详情">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span v-if="scope.row.type =='充值' || scope.row.type =='打保证金' || scope.row.type =='罚款' || scope.row.type =='备款'">
                                     <el-tag type="danger"  size="small" >  {{scope.row.type}}</el-tag>
                                </span>
                                <span v-else>
                                        <el-tag type="success"  size="small" >  {{scope.row.type}}</el-tag>
                                </span>
                                <!--danger-->
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
    import { meijie_contract_history } from '@/api/meiti';
    import moment from "moment"
    let date = [];
    export default {
        data() {
            return {
                funData:[],
                date:[],
                historyTable:[],
                listLoading:true,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                Allmoney:'',
                time_start:'',
                time_end:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                meijie_contract_history(page,num,time_start,time_end){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let id = decodeURI(ref[0].split('=')[1]);
                    meijie_contract_history({
                        id:id,
                        page:page,
                        num:num,
                        time_start:this.time_start,
                        time_end:this.time_end,
                    }).then(response => {
                        this.listLoading = false;
                        this.funData = [];
                        this.funData.push(response.contract_info);
                        this.historyTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.Allmoney = response.sum;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                meijie_contract_historyExcel(time_start,time_end){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let id = decodeURI(ref[0].split('=')[1]);
                    meijie_contract_history({
                        id:id,
                        page:this.kehuTableLength ,
                        num:1,
                        time_start:this.time_start,
                        time_end:this.time_end,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.account){
                                item['account'] = item.account.a_users;
                            }
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
        mounted(){

        },
        methods: {
            history(){
                this.meijie_contract_history(this.page,this.num);
            },
            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.meijie_contract_history(this.page,this.num);
            },
            handleCurrentChange(val) {
                this.num = val;
                this.meijie_contract_history(this.page,this.num);
            },
            outExcel(){
                this.meijie_contract_historyExcel(this.page,this.num);
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
                this.meijie_contract_history();
            },
            clickTr(val){



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
            type(val){
                if(val == 1){
                    return "预付"
                }else if(val == 2){
                    return "垫付"
                }else{
                    return '--'
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
                .leftDate {
                    float: left;
                    width:220px;
                    height:30px;
                    padding:0;
                    input{
                        height:22px!important;
                        line-height: 22px!important;
                        font-size: 12px;
                    }
                }
                .distributionButton {
                    float: right;
                    width:80px;
                    height:30px;
                    margin-right: 24px;
                    button{
                        height:30px!important;
                        line-height: 12px;
                    }
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
                        padding: 0;
                        width: 90px;
                    }
                }
            }


        }

    }

</style>
