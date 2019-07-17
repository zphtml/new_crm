<template>
    <div class="console" >
        <p class="crm_title">
            <i class="crm_line"></i>
            <span @click="jumpCustomerList">客户列表</span>><span>客户控制台</span>

        </p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="控制台" name="first">
                <el-row class="consoleBox" >
                    <p class="crm_title">
                        <span style="float: right">
                    <span class="list"  @click="consoleNext('Advertiser','')">
                       <img src="../../../assets/20190308002.png" alt="">
                        广告主/产品
                    </span>
                        <span class="list"  @click="consoleNext('Contractlist','1')">
                          <img src="../../../assets/20190308003.png" alt="">
                        合同</span>
                            <span class="list"  @click="consoleNext('addbackMoney','')">
                          <img src="../../../assets/20190308001.png" alt="">
                        结算单</span>
                          <span class="list"  @click="consoleNext('Contractlist','2')">
                          <img src="../../../assets/20190308004.png" alt="">
                        执行框架</span>
                </span>

                    </p>
                    <el-col :span="24" class="headerBox">
                        <el-col style="padding-left: 0" :span="24" class="console_header"  v-for="(data,index) in formData" :key="index">
                            <el-col :span="6" style="padding-left: 0" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="companyName">
                                        <el-tooltip :content="data.advertiser" placement="top" effect="light">
                                    <span style="cursor: pointer">
                                    {{data.advertiser  }}
                                    </span>
                                        </el-tooltip>
                                    </div>
                                    <div class="name" style="color: #8a7c7c;padding-left: 10px">
                                <span style="margin-right: 7px;">
                                    <span class="name_right" >
                                        销售:
                                    </span>
                                    {{data.submituser0.name}}
                                </span>
                                        <span>
                                    <span class="name_right">
                                        AE:
                                    </span>
                                    <span v-if="data.business0">
                                    {{data.business0.name}}
                                    </span>
                                    <span v-else>
                                        --
                                    </span>
                                </span>
                                    </div>
                                    <div class="yu_e">
                                <span class="name_right">
                                    余额:
                                </span>
                                        {{Number( data.huikuan)+Number( data.bukuan)- Number( data.yu_e) - Number(data.margin_money) -  Number(data.kehu_bukuan) | currency('') }}
                                    </div>
                                    <div style="position: absolute;right: 0;top: 0;background: #c5e4ff;" @click="jump_tj">
                                        <img src="../../../assets/tj.png"  class="el_show" style="width: 30px;margin: 5px 10px;cursor: pointer"  alt="">
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title" style="line-height: 20px">
                                        <p style="height: 20px;margin: 0;">
                                            <span class="top_title_name name_right"  @click="jumpHuikuan" style="text-decoration: underline;cursor: pointer;font-size: 14px">回款:</span>
                                            <span class="num" style="font-size: 15px;font-weight: bold;color: #ca66aa;">{{ data.huikuan | currency('') }}</span>
                                        </p>
                                        <p style="height: 20px;color: #669fe4;font-size: 12px;margin: 0;">
                                               <span style="font-size: 12px"  v-if="hui_content == ''">
                                    <span style="margin-right: 10px">
                                        待审核:
                                    </span>0.00
                                    </span>
                                            <span class="dai_num"  v-else>
                                   <span style="margin-right: 10px">
                                       待审核:
                                   </span>
                                            {{ hui_content | currency('')}}
                                    </span>
                                        </p>
                                        <el-button type="primary"  size="small " plain style="position: absolute;right: 0;top:0;" @click="jumpAddHuikuan">添加</el-button>
                                    </div>
                                    <div class="bottom_title">
                                <span class="name_right" @click="jumpAllFapiao" style="text-decoration: underline;cursor: pointer">
                                    发票:
                                </span>
                                        <span class="num" >{{ data.fapiao | currency('') }}</span>
                                        <el-button type="primary" plain style="float: right" size="small " @click="jumpFapiao">添加</el-button>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title" style="line-height: 20px">
                                        <p style="height: 20px;margin: 0;">
                                        <span class="name_right " @click="jumpbukuanList" style="text-decoration: underline;cursor: pointer">
                                        公司补款:
                                </span>
                                            <span class="num">{{ data.bukuan | currency('') }}</span>
                                        </p>
                                        <p style="height: 20px;color: #669fe4;font-size: 12px;margin: 0;">
                                    <span class="dai_num" v-if="bu_content == ''">
                                   <span style="margin-right: 10px">
                                       待审核:
                                   </span>
                                        0.00
                                    </span>
                                            <span class="dai_num" v-else>
                                     <span style="margin-right: 10px">
                                       待审核:
                                   </span>
                                        {{ bu_content | currency('') }}
                                    </span>
                                        </p>


                                    </div>
                                    <div class="bottom_title">
                                        <div class="nameBox">
                                   <span class="name_right" style="text-decoration: none">
                                            客户补款:
                                        </span>
                                            <span class="num" v-if="data.kehu_bukuan">
                                    {{ data.kehu_bukuan }}
                                </span>
                                            <span class="num" v-else>
                                    0.00
                                </span>
                                        </div>

                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title">
                                        <span class="name_right" >保证金:</span>

                                        <span class="num">{{ data.margin_money | currency('') }}</span>
                                    </div>
                                    <div class="bottom_title">
                                        <span class="name_right" >保证金余额</span>
                                        <span class="num">{{ data.margin_yue | currency('') }}</span>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                        <el-col style="padding-left: 0" :span="24" class="console_header">
                            <el-col :span="18"  v-for="(data,index) in formData"  :key="index">
                                <el-col style="padding-left: 0"  :span="8" class="console_header_box">
                                    <el-card class="box-card">

                                        <div class="top_title" style="line-height: 37px">
                                            <p style="height: 20px;margin: 0;">
                                                <span class="top_title_name name_right"   style="cursor: pointer;font-size: 14px">未分配:</span>
                                                <span class="num" style="font-size: 15px;font-weight: bold;color: #ca66aa;">{{ data.undistributed_yu_e | currency('') }}</span>
                                                <el-button plain type="primary" class="fenpei" size="small " style="float: right" @click="jumpFenpei_balance">分配</el-button>

                                            </p>
                                        </div>
                                        <div class="bottom_title">
                                <span class="name_right"   >
                                    退款未使用:
                                </span>
                                            <span class="num" >{{ data.tuikuan_undistributed_yu_e  | currency('') }}</span>
                                        </div>

                                    </el-card>


                                </el-col>
                                <el-col :span="8" class="console_header_box">
                                    <el-card class="box-card">
                                        <div class="top_title">
                                <span class="name_right" style="text-decoration: underline;cursor: pointer;font-size: 14px" @click="jumpxufeiList">
                                    充值:
                                </span>
                                            <span style="font-size: 15px;font-weight: bold;color: #ca66aa;">
                                {{ data.yu_e | currency('') }}
                                </span>
                                        </div>
                                        <div class="bottom_title">
                                            <span class="name" v-if="data.customer_type == 2" style="margin-right: 5px">渠道打款:</span>
                                            <span class="name" v-if="data.customer_type == 1" style="margin-right: 5px">个人打款:</span>
                                            <span class="num">{{ data.qd_money | currency('') }}</span>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" class="console_header_box" style="cursor: pointer" >
                                    <el-card class="box-card" >
                                        <div @click="jumpCostList">
                                            <div class="top_title"  >
                                 <span class="name_right" >
                                    消耗（币）:
                                </span>
                                                {{companyCost | currency('') }}
                                            </div>
                                            <div class="bottom_title">
                                   <span class="name_right">
                                   账户余额（币）:
                                </span>
                                                {{companyBalance | currency('') }}
                                            </div>
                                        </div>

                                    </el-card>
                                </el-col>
                            </el-col>

                            <el-col :span="6"  style="padding:0;cursor: pointer"  v-show="money_pie">
                                <el-card class="box-card bos-padding">
                                    <span style="font-size: 12px;position:absolute;left: 2px;top:5px;">预计回款:&nbsp;&nbsp; {{predict_money | currency('')}}</span>
                                    <backmoney_pie ref="backmoney_pie_infor"></backmoney_pie>
                                </el-card>
                            </el-col>
                        </el-col>
                    </el-col>

                    <el-col :span="24" class="select">
                    <span style="font-size: 13px;margin-left: 10px">
                        产品线：
                    </span>
                        <el-select v-model="linevalue" style="width:160px;" size="mini" placeholder="请选择" @change="lineChange">
                            <el-option-group
                                    v-for="(item,key) in lineoptions"
                                    :key="item.name"
                                    :label="item.name">
                                <el-option
                                        v-for="(item,index) in item.zi"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <el-select style="margin-left: 10px;width:140px;" v-model="shenheType" size="mini" placeholder="请选择" @change="shenheChange">
                            <el-option
                                    v-for="(item,index) in shenheoption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select style="margin-left: 10px;width:140px;" v-model="xieyiType" size="mini" placeholder="请选择" @change="xieyiChange">
                            <el-option
                                    v-for="(item,index) in xieyioption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="24" class="Inforbox">
                        <el-table
                                highlight-current-row
                                v-loading="listLoading"  border
                                :data="DataInfor"
                                class="vue-table"
                                ref="multipleSelection"
                                @sort-change="table_sort"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                @row-click="clickTr($event)"
                                style="width: 100%">
                            <el-table-column
                                    label="协议时间">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.ctime | ctimeData}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="协议名称">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.title }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    header-align="center"
                                    label="产品线">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.prlin }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    :label="'现金'+$t('titles.fandian')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.rencontract.xj_fandian }}%
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    :label="'账户币'+$t('titles.fandian')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.rencontract.fandian }}%
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    header-align="center"
                                    label="余额">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}" style="text-align: center">
                                <span class="numInfor" v-if="(Number( scope.row.balance)>0)" style="color:#30D6A9">
                                    {{Number(scope.row.balance) | currency('')}}
                                </span>
                                        <span class="numInfor" v-if="(Number( scope.row.balance)<0)" style="color:#FF5662">
                                  {{Number(scope.row.balance) | currency('')}}
                                </span>
                                        <span class="numInfor" v-if="(Number( scope.row.balance)== 0)" >
                                   {{Number(scope.row.balance) | currency('')}}
                                </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    sortable="custom"
                                    header-align="center"
                                    label="充值">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.yu_e  | currency('') }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    v-if="customer_type == 2"
                                    label="渠道打款">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{Number( scope.row.qd_money)| currency('') }}

                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    v-if="customer_type == 1"
                                    label="个人打款">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{Number( scope.row.qd_money)| currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="公司补款">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.bukuan | currency('')  }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="客户补款">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.kehu_bukuan | currency('')  }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="保证金">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.margin_money | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="协议状态">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                  <span v-if="scope.row.iszuofei == 0">
                                      <span v-if="scope.row.audit == 2">
                                        <i style="width: 6px; height: 6px; background: rgb(255, 104, 5); display: inline-block; vertical-align: middle; border-radius: 50%; margin-right: 3px;"></i>   驳回
                                      </span>
                                      <span v-else-if="scope.row.audit != 2 && scope.row.is_ultimate_shenhe == 0">
                                         <i style="width: 6px; height: 6px; background: #f5f5f5; display: inline-block; vertical-align: middle; border-radius: 50%; margin-right: 3px;"></i>  未审核
                                      </span>
                                      <span v-else>
                                        <i style="width: 6px; height: 6px; background: rgb(100, 201, 46); display: inline-block; vertical-align: middle; border-radius: 50%; margin-right: 3px;"></i>  进行中
                                      </span>
                                </span>
                                            <span v-if="scope.row.iszuofei == 1">
                               <i style="width: 6px; height: 6px; background: red; display: inline-block; vertical-align: middle; border-radius: 50%; margin-right: 3px;"></i> 作废
                            </span>
                                            <span v-if="scope.row.iszuofei == 2">
                              <i style="width: 6px; height: 6px; background: orange; display: inline-block; vertical-align: middle; border-radius: 50%; margin-right: 3px;"></i>  结束
                            </span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="审核状态">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        <state :stateData=scope.row ></state>
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

            </el-tab-pane>
            <el-tab-pane label="客户信息" name="second">
                <kehuxinxi ref="kehu_infor"></kehuxinxi>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { customersConsole,customer_contract_list ,productlineId,fphuikuanConsole,zhuankuan,dshenhehk,customer_advertiser_list,adcost,huikuan_plan_list_ad} from '@/api/kehu';
    import state from '@/components/shenhe/sh_state';
    import backmoney_pie from './charts/console_pie';
    import kehuxinxi from './kehuxinxi';

    const lodash = require('lodash')
    import moment from "moment"
    export default {
        data() {
            return {
                activeName:'first',
                listLoading:true,
                showMore: true,
                stateData:'',
                formData:[],
                customer_type:'',
                show:true,
                hui_content:'',
                bu_content:'',
                advertiserName:'',
                shui:'false',
                money_pie:true,
                predict_money:'',
                customersConsole:function(){
                    customersConsole({
                        id:this.accounts.id,
                    }).then(response => {
                        this.formData = [];
                        this.customer_type = response.customer_type;
                        this.customer_contract_list();
                        this.formData.push(response) ;
                        response.tax_identification = response.tax_identification.replace(/(^\s*)|(\s*$)/g, "");
                        if(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(response.tax_identification)){
                            this.shui = "true"
                        }else{
                            this.shui = "false";
                        }
                    }). catch(err => {});
                },
                dshenhehk:function(){
                    dshenhehk({
                        id:this.accounts.id,
                    }).then(response => {
                        this.hui_content = response;
                    }). catch(err => {});
                },

                //下拉
                options:[],
                //切换
                clickColor:false,
                click_Color:true,
// 回款
                huikuan_plan_list_ad(){
                    huikuan_plan_list_ad({
                        avid:this.accounts.id,
                        page:'1',
                        num:'1',
                        start_date:moment().format('YYYY-MM-01'),
                        end_date:moment().endOf('month').format('YYYY-MM-DD'),
                    }).then(response => {
                        if(response.code == '200'){
                            if(response.data.data.length!=0){
                                this.money_pie = true;
                                this.predict_money = response.data.data[0].money;
                                this.$refs.backmoney_pie_infor.backmoney_pie_infor(response.data.data[0]);
                            }else{
                                this.money_pie = false;
                            }
                        }
                    }). catch(err => {});
                },
//  ---------------------
                start_date:'',
                end_date:'',
                shenhe:'',
                iszuofei:'',//1.作废，2，结束
                //表格
                tableData:[],
                old_Table:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                customer_contract_list:function(){
                    customer_contract_list({
                        data:this.accounts.id,
                        val:this.pr_id,
                    }).then(response => {
                        for(let i = 0;i<response.list.data.length;i++){
                            response.list.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.listLoading = false;
                        this.tableData = response.list.data;
                        this.old_Table = response.list.data;
                        this.$refs.multipleSelection.clearSort();
                    }). catch(err => {});
                },
//  ------------
// 消耗账户余额
                companyCost:'',
                companyBalance:'',
                adcost:function(){
                    adcost({
                        id:this.accounts.id,
                    }).then(response => {
                        if(response.code == '200'){
                            this.companyCost = response.data.cost_total;
                            this.companyBalance = response.data.balance;
                        }
                    }). catch(err => {});
                },
 //产品线
                linevalue:'',
                lineoptions:[],

                pr_id:{
                    pr_id:'',
                    start_date:'',
                    end_date:'',
                    shenhe:'',
                    iszuofei:'',
                },
                productlineId:function () {
                    productlineId({
                        id:this.accounts.id,
                    }).then(response => {
                        response.unshift({
                            name:'全部',
                            zi:[{
                                id:'',
                                name:'全部',
                            }]
                        });
                        this.lineoptions = response;

                    }). catch(err => {});
                },
// 协议状态
                shenheType:'审核状态',
                shenheoption:[
                    {
                        label:'全部',
                        value:'',
                    },
                    {
                        label:'未审核',
                        value:'0',
                    },
                    {
                        label:'已通过',
                        value:'1',
                    },
                    {
                        label:'未通过',
                        value:'2',
                    }

                ],
                xieyiType:'协议状态',
                xieyioption:[
                    {
                        label:'全部',
                        value:'',
                    },
                    {
                        label:'进行中',
                        value:'0',
                    },
                    {
                        label:'作废',
                        value:'1',
                    },
                    {
                        label:'结束',
                        value:'2',
                    },


                ],
                //审核状态
                audit_count:'',

            }
        },
        components: {
            state,
            backmoney_pie,
            kehuxinxi
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'roles',
                'audit_action',
            ]),
            DataInfor(){
                let tableData = this.tableData;
                this.kehuTableLength =  tableData.length;

                return  tableData.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        mounted(){
            if(this.$route.query.type == 1){
                this.activeName = "first";
                this.console_get()
            }else{
                this.activeName = 'second';
                this.$refs.kehu_infor.kehuClick()
            }

        },
        methods: {
            ...mapActions([
                'Account',
                'searchData',
            ]),
            console_get(){
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name =='contract'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
                this.adcost();
                this.customersConsole();
                this.productlineId();
                this.dshenhehk();
                this.huikuan_plan_list_ad();
            },
            //tab切换
            handleClick(){
                if(this.activeName== 'first'){
                    this.console_get()
                }else{
                    this.$refs.kehu_infor.kehuClick()
                }
            },
            consoleNext(val,type){
                this.$router.push({ name: val,query: { id: this.accounts.id,type:type} });
            },
//排序
            table_sort(val){
                let name = '';
                if(val.column.label == '充值'){
                    name = 'yu_e'
                }else  if(val.column.label == '余额'){
                    name = 'balance'
                }
                if(val.column == null){
                    this.tableData = this.old_Table;
                }else if(val.column.order == 'descending'){ //向下
                    this.tableData = lodash.orderBy(this.old_Table, [name],['asc']);
                }else if(val.column.order == 'ascending'){ //向上排序
                    this.tableData = lodash.orderBy(this.old_Table, [name],['desc']);
                }
            },
// 表格点击单行
            clickTr(val){
                let _this = this;
                console.log(val)
                this.roles.filter(function(item){
                    if(item == "/api/contract/contractlist"){
                        _this.$router.push({ name: 'agreementDetails' ,query: { id: val.id,gsId:val.advertiser}});
                    }
                })

            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex =val;
            },
//跳转返回上一级
            jumpCustomerList(){
                this.$router.push({ name: 'kehuliebiao' });
            },
//跳转统计
            jump_tj(){
                this.$router.push({ name: 'dataStatistics' ,query: { id: this.$route.query.id,name:this.$route.query.name}});
            },
 //跳转回款列表
            jumpHuikuan(){
                this.$router.push({ name: 'huikuan' });
            },

            jumpAddHuikuan(){
                this.$router.push({ name: 'addReceivable',query: { id: this.accounts.id} });
            },
            jumpFapiao(){
                if(this.shui == "false"){
                    this.$confirm('纳税人识别号为空，或者错误, 是否修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.activeName = 'second';
                        this.$refs.kehu_infor.kehuClick()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                }else{
                    this.$router.push({ name: 'invoice',query: { id: this.accounts.id}  });
                }

            },
            //发票
            jumpAllFapiao(){
                this.$router.push({ name: 'invoiceList',query: { id: this.accounts.id} });
            },
            //补款
            jumpbukuanList(){
                this.$router.push({ name: 'Consoel_fillingList' });

            },
//hover 提示
            enter(){
                this.show = false;
            },
            leave(){
                this.show = true;
            },
  //产品线
            lineChange(index){
                this.pr_id.pr_id = index;
                this.customer_contract_list()
            },

// 审核状态
            shenheChange(val){
                this.pr_id.shenhe = val;
                this.customer_contract_list()
            },
            xieyiChange(val){
                this.pr_id.iszuofei = val;
                this.customer_contract_list()
            },

//分配余额
            jumpFenpei_balance(){
                this.$router.push({ name: 'fenpeiBalance' ,query: { id: this.accounts.id}});
            },


            jumpxufeiList(val){
                this.$router.push({ name: 'Consoel_renewal' ,query: { id: val.id}});
            },
 // 跳转公司消耗
            jumpCostList(){
                this.$router.push({ name: 'companyCostList' ,query: { id: this.accounts.id}});
            },

        },
        created() {

        },
        filters:{
            ctimeData(val){
                if(val){
                    if(val != 0){
                        var time=new Date(parseInt(val) * 1000);
                        return   moment(time).format('YYYY-MM-DD')
                    }
                }

            },
            filfun(val){
                if(val == ''){
                    return '--'
                }else{
                    return val
                }
            },
            filfunName(val){
                if(val ){
                    return val.name
                }else{
                    return '--'
                }
            },
            fenpeiData(val){
                if(val){
                    return val
                }else{
                    return '暂无建议'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/console.scss";

</style>
