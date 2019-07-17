<template>
    <div class="statistics" >
        <el-row class="statisticsBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpKehuList">客户列表</span>><span>客户数据统计</span>
            </p>
            <div class="jumpConsole" @click="jumpConsole">
                <el-tooltip content="控制台" placement="right" effect="light">
                    <i class="el-icon-menu"></i>
                </el-tooltip>
            </div>

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="业绩管理" name="second">
                    <el-col :span="24" class="consoleTitle" >
                        <el-col :span="6" class="corporateName">
                            <span >{{ advertiserName }}</span>
                        </el-col>
                        <el-col :span="6" class="numberData">
                            <span>
                                收款：
                            </span>
                            <span class="num">
                                {{ advertiserMoney | currency('')}}
                            </span>
                        </el-col>
                        <el-col :span="6" class="numberData">
                            <span>
                                认款：
                            </span>
                            <span class="num">
                                  {{ ren_money| currency('')}}
                            </span>
                        </el-col>
                        <el-col :span="6" class="numberData">
                            <span>
                                媒体打款：
                            </span>
                            <span class="num">
                                  {{ mediaMoney| currency('')}}
                            </span>
                        </el-col>

                    </el-col>
                    <el-col :span="24" class="saixuan">
                        <span class="text">
                            显示类型：
                        </span>
                        <el-select  size="mini" v-model="selectdata" placeholder="请选择" @change="selectdataChange">
                            <el-option
                                    v-for="(item,key) in options"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="key">
                            </el-option>
                        </el-select>
                        <span class="text">
                            日期：
                        </span>
                        <el-date-picker
                                @change="timeDateChange"
                                class="timeDate"
                                size="mini"
                                v-model="peizhi_date"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                        <el-button type="primary" class="outExcel" @click="outExcel">导出Excel</el-button>
                    </el-col>
                    <el-col :span="24" >
                        <el-col :span="24" class="tableBox">
                            <el-col :span="24" class="title header">
                                <el-col :span="2">
                                    <div class="title_top borderLeft">

                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="title_top borderLeft">
                                        公司
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="title_top borderLeft">
                                        认款
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="title_top">
                                        媒体
                                    </div>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="body" >
                                <el-col :span="2" >
                                    <div class="body_name borderLeft" style="cursor: pointer" @click="paixu" >
                                        日期
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <el-col :span="12">
                                        <div class="body_name">
                                            项目
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="body_name borderLeft" >
                                            金额
                                        </div>
                                    </el-col>
                                </el-col>
                                <el-col :span="8">
                                    <el-col :span="9">
                                        <div class="body_name">
                                            产品线
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="body_name">
                                            项目
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="body_name borderLeft" >
                                            金额
                                        </div>
                                    </el-col>
                                </el-col>
                                <el-col :span="10">
                                    <el-col :span="6">
                                        <div class="body_name">
                                            产品线
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="body_name">
                                            账户
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="body_name">
                                            项目
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="body_name ">
                                            金额
                                        </div>
                                    </el-col>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="Listbox"  v-loading="loading">
                                <el-col :span="24"  class="list" v-for="(data,index) in addDatatable" :key="index">
                                    <el-col :span="2" >
                                        <div class="list_name borderLeft">
                                            {{ data.date }}
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-col :span="24"  v-if="data.project == '1'">
                                            <el-col :span="12">
                                                <div class="list_name">
                                                    {{ data.type }}
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="list_name borderLeft" :class="{Color_z:Number(data.money)>0,Color_f:Number(data.money)<0}">
                                                    <span v-if="Number(data.money)>0"> +{{ data.money | currency('')}}</span>
                                                    <span v-else>{{ data.money | currency('')}}</span>
                                                </div>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="24" v-else>
                                            <el-col :span="12">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="list_name borderLeft" >
                                                    --
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-col :span="24"  v-if="data.project == '2'">
                                            <el-col :span="9">
                                                <div class="list_name">
                                                    {{ data.product.name }}
                                                </div>
                                            </el-col>
                                            <el-col :span="5">
                                                <div class="list_name">
                                                    <div class="list_name">
                                                        <div class="list_name">
                                                            <div v-if="data.type =='转出保证金'">
                                                                <span class="textType">转出</span> <span class="bao"> 保</span>
                                                            </div>
                                                            <div v-else-if="data.type =='分配保证金'">
                                                                <span class="textType">分配</span> <span class="bao">保</span>
                                                            </div>
                                                            <div v-else-if="data.type =='打保证金'">
                                                                <span class="textType">打款</span><span class="bao"> 保</span>
                                                            </div>
                                                            <div v-else-if="data.type =='退保证金'">
                                                                <span class="textType">退款</span> <span class="bao">保</span>
                                                            </div>
                                                            <div v-else-if="data.type =='客户补款'">
                                                                <span class="textType"> 补款</span> <span class="bu">补</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="textType">
                                                                    {{ data.type }}
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="10" style="position: relative">
                                                <div class="list_name borderLeft" style="line-height: 20px">
                                                    <div :class="{Color_z:Number(data.money)>0,Color_f:Number(data.money)<0}">
                                                        <span v-if="Number(data.money)>0"> +{{ data.money | currency('')}}</span>

                                                        <span v-else>{{ data.money | currency('')}}</span>
                                                    </div>
                                                    <div style="position: absolute;font-size: 12px;color: #6694c8;bottom: 0;right: 10%;">
                                                        <span>余{{ data.kyue | currency('')}}</span>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="24" v-else>
                                            <el-col :span="9">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="5">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="10">
                                                <div class="list_name borderLeft" >
                                                    --
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-col :span="24" v-if="data.project == '3'">
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    {{ data.product.name }}
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    {{ data.account | funaccount}}
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    <div class="list_name">
                                                        <div v-if="data.type =='转出保证金'">
                                                            <span class="textType">转出</span> <span class="bao"> 保</span>
                                                        </div>
                                                        <div v-else-if="data.type =='分配保证金'">
                                                            <span class="textType">分配</span> <span class="bao">保</span>
                                                        </div>
                                                        <div v-else-if="data.type =='打保证金'">
                                                            <span class="textType">打款</span><span class="bao"> 保</span>
                                                        </div>
                                                        <div v-else-if="data.type =='退保证金'">
                                                            <span class="textType">退款</span> <span class="bao">保</span>
                                                        </div>
                                                        <div v-else-if="data.type =='客户补款'">
                                                            <span class="textType">补款</span> <span class="bu">补</span>
                                                        </div>
                                                        <div v-else>
                                                            <span class="textType">
                                                                 {{ data.type }}
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name borderLeft">
                                                    <div class="list_name " style="line-height: 20px;position: relative">
                                                        <div :class="{Color_z:Number(data.money)>0,Color_f:Number(data.money)<0}">
                                                            <span v-if="Number(data.money)>0" > +{{ data.money| currency('')}}</span>

                                                            <span v-else>{{ data.money | currency('')}}</span>
                                                        </div>
                                                        <div style="position: absolute;font-size: 12px;color: #6694c8;bottom: 0;right: 10%;">
                                                            <span>余{{ data.kyue | currency('')}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="24" v-else>
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name">
                                                    --
                                                </div>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="list_name borderLeft">
                                                    --
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-col>
                                </el-col>

                            </el-col>
                        </el-col>
                        <!-- 分页 -->
                        <el-col :span="24">
                            <div class="block">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="pageIndex"
                                        :page-size="pageSize"
                                        :page-sizes="[50,100]"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="kehuTableLength"
                                        style='text-align: right;'>
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="数据统计" name="first">
                    <el-col :span="24" class="consoleTitle" >
                        <el-col :span="6" class="corporateName">
                            <span >{{ advertiserName }}</span>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="statisticsTitle" >
                        <div class="money title">
                            <span>欠费金额:</span>
                            <span>{{ qianfeiMoney }}</span>
                            <i class="line"></i>
                        </div>
                        <div class="date title">
                            <span>充值周期:</span>
                            <span>{{ renewzhouqi | currency('') }}&nbsp;&nbsp;&nbsp;天</span>
                            <i class="line"></i>
                        </div>
                        <div class="backMoney title">
                            <span>回款周期:</span>
                            <span>{{ huikuanzhouqi | currency('') }}&nbsp;&nbsp;&nbsp;天</span>
                        </div>
                    </el-col>
                    <el-col :span="24" class="echarts_bar" >
                        <div class="yearDate_css">
                            <el-date-picker
                                    @change="yearChange"
                                    v-model="yearData"
                                    align="right"
                                    type="year"
                                    :clearable="false"
                                    placeholder="选择年">
                            </el-date-picker>
                        </div>
                        <bar_caiwu  :screen_bar="screen_bar"></bar_caiwu>
                    </el-col>
                    <el-col :span="24" class="statisticsTable">
                        <div>
                            <el-table
                                    highlight-current-row v-loading="listLoading"  border
                                    :data="tableData"
                                    class="vue-table"
                                    max-height="320"
                                    :default-sort = "{prop: 'date', order: 'descending'}"
                                    style="width: 100%">
                                <el-table-column
                                        label="产品线名称">
                                    <template slot-scope="scope">
                                        {{ scope.row.prlin }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="首次充值时间">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.minrenewtime | ctimeData}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="首次充值金额">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.minrenewmone | currency('') }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="总充值">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.chongzhimoney | currency('') }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="总利润">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.gs_lirun | currency('') }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="最后充值时间">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.maxrenewtime | ctimeData}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="最后充值金额">
                                    <template slot-scope="scope">
                                        <div style="text-align: center">
                                            {{ scope.row.maxrenewmone | currency('') }}
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="24" class="lineEcharts">

                        <el-col :span="24" class="echartsBox">
                            <el-col :span="24" style="padding:10px 0 0 10px;" >
                                <el-col :span="24" style="padding-left: 0">
                                    <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                    消耗统计
                                </el-col>
                                <div class="tj_Date">
                                    <el-date-picker
                                            size="mini"
                                            v-model="tjInfor"
                                            :clearable="false"
                                            @change="tjInforChange"
                                            type="daterange"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                                <line_xh :screen_line="screen_line"></line_xh>
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="24" class="lineEcharts" style="margin-top: 35px;">
                        <el-col :span="24" style="padding-left: 0">
                            <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                            利润统计
                        </el-col>
                        <el-col :span="24" class="echartsBox">
                            <div class="last_date">
                                <el-date-picker
                                        v-model="lirunInfor"
                                        @change="lirunChange"
                                        :clearable="false"
                                        type="year"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <bar_xh :bar_xh="bar_xh"></bar_xh>
                        </el-col>
                    </el-col>
                </el-tab-pane>
            </el-tabs>

        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { renew_huikuan_tu,productlinrenew ,cost_ad_tongji,lirun_ad_product_tu,zhouqi_kehu,qiankuan_ad,customer_money_history,apicustomers} from '@/api/kehu';
    import bar_caiwu from '@/components/Charts/bar_caiwu';
    import line_xh from './charts/line_xh';
    import bar_xh from './charts/bar_xh';

    import moment from "moment"
    export default {
        data() {
            return {
                activeName:'second',
                advertiserName:'',
                screen_line:'',
                qianfeiMoney:'',
                huikuanzhouqi:'',
                renewzhouqi:'',
                listLoading:false,
                screen_bar:"",
                bar_xh:'',
                LineName:[],
                tableData:[],
                allrenew:[],
                allLirun:[],
                renew:[],
                lirun:[],
                lineId:'',
                yearData:moment().format('YYYY-MM-DD'),
                tjInfor:[moment().format('YYYY-MM-01'),moment().format('YYYY-MM-DD')],
                lirunInfor:moment().format('YYYY-MM-DD'),
                radio_xh:'充值',
                renew_huikuan_tu:function(){
                    renew_huikuan_tu({
                        date:moment(this.yearData).format('YYYY'),
                        id:this.accounts.id,
                    }).then(response => {
                        this.screen_bar = response;
                    }).catch(error => {

                    });
                },
                productlinrenew:function(){
                    productlinrenew({
                        id:this.accounts.id,
                    }).then(response => {
                        this.tableData = response;
                        this.allrenew = [];
                        this.allLirun = [];
                        this.allLirun = [];
                        let _this = this;
                        this.lineId = response[0].prid;
                        this.cost_ad_tongji();
                        this.tableData.filter(function(item){
                            _this.allrenew.push(item.chongzhimoney);
                            _this.LineName.push(item.prlin);
                            _this.allLirun.push(item.gs_lirun);
                        });
                        this.renew = [
                            {
                                name:  this.LineName,
                                allrenew: this.allrenew
                            }
                        ];
                        this.lirun = [
                            {
                                name:  this.LineName,
                                allrenew: this.allLirun
                            }
                        ];
                    }).catch(error => {

                    });
                },
                cost_ad_tongji:function(){
                    cost_ad_tongji({
                        id:this.accounts.id,
                        state:moment(this.tjInfor[0]).format('YYYY-MM-DD'),
                        end:moment(this.tjInfor[1]).format('YYYY-MM-DD'),
                        prlin:this.lineId,
                    }).then(response => {
                        this.screen_line =  response;
                    }).catch(error => {

                    });
                },
                lirun_ad_product_tu:function(){
                    lirun_ad_product_tu({
                        id:this.accounts.id,
                        date:moment(this.lirunInfor).format('YYYY'),
                    }).then(response => {
                        this.bar_xh = response.data;
                    }).catch(error => {

                    });
                },
                zhouqi_kehu:function(){
                    zhouqi_kehu({
                        id:this.accounts.id,
                    }).then(response => {
                        this.huikuanzhouqi = response.huikuanzhouqi;
                        this.renewzhouqi = Number(response.renewzhouqi).toFixed(1);

                    }).catch(error => {

                    });
                },
                qiankuan_ad:function(){
                    qiankuan_ad({
                        id:this.accounts.id,
                    }).then(response => {
                    this.qianfeiMoney = response;
                    }).catch(error => {

                    });
                },


//配置管理
                ListBoxNew:false,
                loading:true,
                paixuData:"asc",
                type:'',
                advertiserMoney:'',
                ren_money:'',
                mediaMoney:'',
                isNum:1,
                options:[
                    {
                        name:'全部',
                        type:''
                    },
                    {
                    name:'充值',
                    type:'renew'
                },{
                    name:'补款',
                    type:'bukuan'
                },{
                    name:'退款',
                    type:'tuikuan'
                },{
                    name:'转出',
                    type:'zhuankuan'
                },{
                    name:'分配款',
                    type:'huikuan'
                },{
                    name:'分配保证金',
                    type:'baozhengjin'
                },{
                    name:'客户补款',
                    type:'kehubaokuan'
                },{
                    name:'打保证金',
                    type:'dabaozhengjin'
                },{
                    name:'保证金转款',
                    type:'zhuankuanbzj'
                },{
                    name:'公司回款',
                    type:'adhuikuan'
                }],
                selectdata:'全部',
                peizhi_date:[moment().format('YYYY-01-01'),moment().format('YYYY-MM-DD')],
                //分页
                page:'15',
                num:'1',
                pageIndex:1,
                pageSize:50,
                kehuTableLength:0,
                tableData:[],
                customer_money_history:function(asc){
                    customer_money_history({
                        id:this.accounts.id,
                        type:this.type,
                        state:moment(this.peizhi_date[0]).format('YYYY-MM-DD'),
                        end:moment(this.peizhi_date[1]).format('YYYY-MM-DD'),
                        asc:this.paixuData//  esc倒序
                    }).then(response => {
                        this.tableData =response;
                        this.loading = false;
                    }).catch(error => {

                    });
                },
                customer_money_historyExcel:function(){
                    customer_money_history({
                        id:this.accounts.id,
                        type:this.type,
                        state:moment(this.peizhi_date[0]).format('YYYY-MM-DD'),
                        end:moment(this.peizhi_date[1]).format('YYYY-MM-DD'),
                        asc:this.paixuData//  esc倒序
                    }).then(response => {
//                        this.tableDataexcel =  response.filter(function(item,i) {
//                          if(item.project == 1){
//
//                          };
//                            return item
//                        })
                        this.tableDataexcel = response;
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = ['日期', '公司项目', '公司金额','认款产品线','认款项目','认款金额' ,'认款余额','媒体产品线','媒体账户','媒体项目','媒体金额','媒体余额'];
                            const filterVal =['date','type','money','null','null','null','null','null','null','null','null','null'];
                            const filterVal_b =['date','null','null','product','type','money','kyue','null','null','null','null','null'];
                            const filterVal_c =['date','null','null','null','null','null','null','product','account','type','money','kyue'];
                            const list = this.tableDataexcel;
                            const data = this.formatJson( list,filterVal,filterVal_b,filterVal_c);
                            export_json_to_excel(tHeader, data, '企业管理列表');
                        })
                    }).catch(error => {

                    });
                },
                apicustomers:function(){
                    apicustomers(
                        this.accounts.id,
                    ).then(response => {
                        this.advertiserMoney = response.huikuan;
                        this.ren_money = Number(response.huikuan)+Number(response.bukuan)-Number(response.undistributed_yu_e);
                        this.mediaMoney = response.yu_e;
                    }).catch(error => {

                    });
                },
            }
        },
        components: {
            line_xh,
            bar_caiwu,
            bar_xh
        },
        computed: {
            ...mapGetters([
                'user',
                'search_list',
                'accounts'
            ]),
            addDatatable(){
                let tableData = this.tableData;
                let _this = this;
                this.kehuTableLength = tableData.length;
                return tableData.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            }
        },
        created() {

        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.advertiserName = this.accounts.advertiser,
            this.customer_money_history();
            this.apicustomers();
        },
        methods: {
            handleClick(){
                if(this.activeName == "first"){
                    this.qiankuan_ad();
                    this.zhouqi_kehu();
                    this.lirun_ad_product_tu();
                    this.renew_huikuan_tu();
                    this.productlinrenew();
                }else {
                    this.customer_money_history();
                    this.apicustomers();
                }
            },
            jumpKehuList(){
                this.$router.go(-1)
            },
            jumpConsole(){
                this.$router.push({ name: 'console' ,query: { type:1} });
            },
            yearChange(){
                this.renew_huikuan_tu();
            },


            tjInforChange(){
                this.cost_ad_tongji();
            },
            lirunChange(){
                this.lirun_ad_product_tu();
            },
            //排序
            outExcel(){
                this.customer_money_historyExcel()
            },
            formatJson(list,filterVal,filterVal_b,filterVal_c) {
                return list.map(v => {
                    if(v.project == 1){
                        return filterVal.map(j=>{
                            if(j == "null"){
                                v[j] = "--"
                            }else if(j == "money"){
                                v[j] = parseFloat(v[j]);
                            }
                            return v[j]
                        })
                    }else if(v.project == 2){
                        let type = v["type"];
                        let money = 0;
                        let line = filterVal_b.map(j=>{
                            if(j == "null"){
                                v[j] = "--"
                            }else if(j == 'product') {
                                v[j] = v[j].name
                            }
                            if(j == "money"){
                                v[j] = parseFloat(v[j]);
                                money = v[j];
                            }
                            return v[j]
                        });
                        if (type == "补账户币" || type == "转出保证金"){
                            if (money < 0){
                                money *= -1;
                            }
                            line[1] = type;
                            line[2] = money;
                        }else if (type == "分配保证金" || type == "客户补款"){
                            if (money > 0){
                                money *= -1;
                            }
                            line[1] = type;
                            line[2] = money;
                        }
                        return line;
                    }else{
                        return  filterVal_c.map(j=>{
                            if(j == "null"){
                                v[j] = "--"
                            }else if(j == 'product'){
                                v[j] =  v[j].name
                            }else if(j == "account"){
                                if( v[j]){
                                    v[j] = v[j].a_users
                                }else{
                                    v[j] = "--"
                                }

                            }else if(j == "money"){
                                v[j] = parseFloat(v[j]);
                            }
                            return v[j]
                        })
                    }
                })
//                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            paixu(){
                this.isNum++
                 if(this.isNum == 1){
                    this.paixuData = 'desc';
                }else if(this.isNum == 2){
                     this.paixuData = "asc";
                }else{
                    this.isNum = 1;
                     this.paixuData = "desc";
                }
                this.customer_money_history();
            },
            timeDateChange(){
                this.customer_money_history();
                this.loading = true;
            },
            selectdataChange(val){
               this.type =  this.options[val].type;
                this.customer_money_history();
            },
            //分页
            handleSizeChange(val) {

                if(val == 100){
                    this.ListBoxNew = true;
                }
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.pageIndex = val;

            },
        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            funaccount(val){
                if(val){
                    return val.a_users
                }else{
                    return '--'
                }
            }
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "./css/dataStatistics.scss";
</style>
