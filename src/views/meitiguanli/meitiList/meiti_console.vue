<template>
    <div class="console mediaconsole" >
        <p class="crm_title">
            <i class="crm_line"></i>
            <span @click="jumpCustomerList">媒体列表</span>><span>客户控制台</span>
            <span style="float: right">
                        <span class="list"  @click="consoleNext('MediacompactList','1')">

                          <img src="../../../assets/20190308003.png" alt="">
                        合同</span>

                          <span class="list"  @click="consoleNext('MediacompactList','2')">
                          <img src="../../../assets/20190308004.png" alt="">
                        执行框架</span>
                </span>
        </p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="控制台" name="first">
                <el-row class="consoleBox">
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

                                    </div>
                                    <div class="yu_e">
                                <span class="name_right">
                                    余额:
                                </span>
                                        {{ Number(data.balance ) | currency('')   }}
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title" style="line-height: 37px">
                                        <p style="height: 20px;margin: 0;">
                                            <span class="top_title_name name_right"   style="cursor: pointer;font-size: 14px">打款:</span>
                                            <span class="num" style="font-size: 15px;font-weight: bold;color: #ca66aa;">{{ data.dakuan | currency('') }} </span>
                                            <el-button plain type="primary" class="fenpei" size="small " style="float: right" @click="jumpdakuan">添加</el-button>

                                        </p>
                                    </div>
                                    <div class="bottom_title">
                                        <div class="nameBox">
                                   <span class="name_right" style="text-decoration: none">
                                            充值:
                                    </span>
                                            <span class="num"  style="font-size: 15px;font-weight: bold;color: #ca66aa;">
                                        {{ data.myu_e | currency('') }}
                                    </span>
                                        </div>

                                    </div>

                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title" style="line-height: 20px">

                                        <p style="height: 20px;margin: 0;">
                                <span class="name_right"  style="text-decoration: underline;cursor: pointer" @click="beikuanList(data)" >
                                    备款余额:
                                </span>
                                            <span class="num" style="font-size: 15px;font-weight: bold;color: #ca66aa;">{{data.beikuan_yue | currency('')}} </span>
                                        </p>
                                    </div>


                                    <div class="bottom_title">

                                        <span class="name_right " @click="jumpbukuanList" style="text-decoration: underline;cursor: pointer">
                                        媒体补款:
                                </span>
                                        <span class="num">{{ data.bukuan | currency('') }}</span>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6" class="console_header_box">
                                <el-card class="box-card">
                                    <div class="top_title">
                                        <span class="name_right" >媒体保证金:</span>

                                        <span class="num">{{ data.margin_meiti | currency('') }}</span>
                                    </div>
                                    <div class="bottom_title">
                                        <span class="name_right" >客户保证金:</span>
                                        <span class="num">{{ data.margin_money | currency('') }}</span>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                        <el-col style="padding-left: 0" :span="24" class="console_header">
                            <el-col :span="18"  v-for="(data,index) in formData" :key="index">
                                <el-col style="padding-left: 0"  :span="8" class="console_header_box">
                                    <el-card class="box-card">
                                        <!--<div class="top_title" style="line-height: 20px">-->
                                        <!--<p style="height: 20px;margin: 0;">-->
                                        <!--<span class="top_title_name name_right"  style=" font-size: 14px">回款:</span>-->
                                        <!--<span class="num" >{{ data.huikuan | currency('') }}</span>-->
                                        <!--</p>-->
                                        <!--<el-button type="primary"  size="small " plain style="position: absolute;right: 0;top:0;" @click="jumpAddHuikuan">添加</el-button>-->
                                        <!--</div>-->
                                        <div class="top_title" style="line-height: 37px">
                                            <p style="height: 20px;margin: 0;">
                                                <span class="top_title_name name_right"   style="cursor: pointer;font-size: 14px">未分配余额:</span>
                                                <span class="num"  >{{ data.dakuan_undistributed_yu_e | currency('') }} </span>
                                                <el-button plain type="primary" class="fenpei" size="small " style="float: right" @click="jumpfenpei">分配</el-button>
                                            </p>
                                        </div>
                                        <div class="bottom_title">
                                <span class="name_right" >
                                    罚款:
                                </span>
                                            <span class="num" >{{ data.fakuan | currency('') }}</span>
                                        </div>


                                    </el-card>
                                </el-col>

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
                    </el-col>
                    <el-col :span="24" class="Inforbox">
                        <el-table
                                highlight-current-row v-loading="listLoading"  border
                                :data="DataInfor"
                                class="vue-table"
                                @sort-change="table_sort"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                @row-click="clickTr($event)"
                                style="width: 100%">
                            <el-table-column
                                    label="协议时间">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.ctime | ctimeData}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="协议名称">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.title }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="协议状态">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}">
                                      <span v-if="scope.row.iszuofei == 0">
                                    <span v-if="scope.row.audit == 2">
                                        驳回
                                    </span>
                                    <span v-else-if="scope.row.audit != 2 && scope.row.is_ultimate_shenhe == 0">
                                        未审核
                                    </span>
                                     <span v-else>
                                          进行中
                                      </span>
                                </span>
                                            <span v-if="scope.row.iszuofei == 1">
                                    作废
                                </span>
                                            <span v-if="scope.row.iszuofei == 2">
                                    结束
                                </span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="产品线">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.prlin }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    :label="$t('titles.fandian')">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.rebates_proportion  }}%
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    header-align="center"
                                    label="余额">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 ||scope.row.iszuofei == 1 ,border:scope.row.iszuofei == 2}" style="text-align: center">
                                <span class="numInfor" style="color:#30D6A9" v-if="(Number( scope.row.balance) )>0">
                                    {{Number( scope.row.balance)| currency('') }}
                                </span>
                                        <span class="numInfor" style="color:#FF5662" v-if="(Number( scope.row.balance))<0">
                                    {{Number( scope.row.balance) | currency('') }}
                                </span>
                                        <span class="numInfor" v-if="(Number( scope.row.balance)) == 0">
                                    {{Number( scope.row.balance) | currency('') }}
                                </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    prop="address"
                                    header-align="center"
                                    label="充值">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                            {{ scope.row.yu_e  | currency('') }}
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>>
                            <el-table-column
                                    label="客户保证金">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.margin_money | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="媒体保证金">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
                                        {{ scope.row.margin_meiti | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="备款余额">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">

                                        {{ scope.row.beikuan_yue | currency('') }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="审核状态">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 || scope.row.iszuofei == 1,border:scope.row.iszuofei == 2}">
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
                <meitixinxi ref="meiti_infor"></meitixinxi>
            </el-tab-pane>

        </el-tabs>

    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { productline,productlineId} from '@/api/kehu';
    import { mcustomer_info } from '@/api/meiti';
    import meitixinxi from './kehuxinxi';
    import {meijie_customer_contract_listConsole } from '@/api/meiti';
    import state from '@/components/shenhe/sh_state';
    const lodash = require('lodash')
    import moment from "moment"
    export default {
        data() {
            return {
                listLoading:true,
                activeName:'first',
                showMore:true,
                stateData:'',
                meijiedakuan:'',
                rate:3,
                stateDate:'',
                formData:[],
                zhuanchuData:[],
                z_yu_e:'',
                show:true,
                disabledPull:false,
                addFormVisible3:false,
                accountvalue:'',
                accountoptions:[],
                Newaccountoptions:[],
                dataInforTable:[],
                disabled_account:false,
                checkedId:true,
                advertiserName:'',
                type_lx:'分配款',
                backmoney_type:1,
 //审核状态
                audit_count:'',
//分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                mcustomer_info:function(){
                    mcustomer_info({
                        id:this.accounts.id,
                    }).then(response => {

                        this.formData = [];
                        this.formData.push(response) ;
                    }). catch(err => {this.$message.error('获取失败');});
                },


                //下拉
                options:[],
                //切换
                clickColor:false,
                click_Color:true,
                //表格
                old_Table:[],
                tableData:[],
                meijie_customer_contract_listConsole:function(){
                    meijie_customer_contract_listConsole({
                        id:this.accounts.id,
                        data:this.pr_id,
                        page:'9999',
                        num:'1',
                    }).then(response => {
                        this.listLoading = false;
                        for(let i = 0;i<response.list.data.length;i++){
                            response.list.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.tableData = response.list.data;
                        this.old_Table =  response.list.data;
                        this.accountoptions = response.list.data;

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //产品线
                linevalue:'',
                lineoptions:[],
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
                pr_id:{
                    pr_id:'',
                    start_date:'',
                    end_date:'',
                    shenhe:'',
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

                    }). catch(err => {this.$message.error('获取失败');});
                },




            }
        },
        components: {
            state,
            meitixinxi
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'roles',
                'audit_action'
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
                this.$refs.meiti_infor.meitiClick()
            }
        },
        methods: {
            ...mapActions([
                'Account'
            ]),
            //tab切换
            handleClick(){
                if(this.activeName== 'first'){
                    this.console_get()
                }else{
                    this.$refs.meiti_infor.meitiClick()
                }
            },
            console_get(){
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name =='meijie_contract'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
                this.mcustomer_info();
                this.meijie_customer_contract_listConsole();
                this.productlineId();
            },
            consoleNext(val,type){
                this.$router.push({ name: val,query: { id: this.accounts.id,type:type} });
            },
// 表格点击单行
            clickTr(val){
                let _this = this;
                this.roles.filter(function(item){
                    if(item == "/api/meijie-contract/contractlist"){
                        _this.$router.push({ name: 'mediaviewcontract' ,query: { id: val.id}});
                    }
                })


            },
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
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex =val;
            },


//跳转合同详情
            jumphetong(val){
                this.$router.push({ name: 'mediaviewcontract',query: { id: val} });

            },
//跳转客户信息
            jumpKehu(val){
                this.$router.push({ name: 'mediakehuxinxi',query: { id: this.accounts.id} });
            },
//跳转返回客户列表
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            //跳转发票
            jumpaddFapiao(){
                this.$router.push({ name: 'Mediainvoice',query: { id: this.accounts.id} });
            },

            //跳转打款列表
            jumpdakuanList(){
                this.$router.push({ name: 'console_AdvanceList' });
            },
            //添加打款
            jumpdakuan(){
                this.$router.push({ name: 'adddakuan',query: { id: this.accounts.id} });
            },
            //跳转补款列表
            jumpbukuanList(){
                this.$router.push({ name: 'console_SupplementList' });
            },
            jumpxufeiList(){
                this.$router.push({ name: 'console_RenewTheListfrom' });
            },
// 备款列表
            beikuanList(){
                this.$router.push({ name: 'meadi_beikuanList',query: { id: this.accounts.id} });
            },

            jumpAddHuikuan(){
                this.$router.push({ name: 'MediaaddReceivable',query: { id: this.accounts.id} });
            },

//hover 提示
            enter(){
                this.show = false;
            },
            leave(){
                this.show = true;
            },

// 审核状态
            shenheChange(val){
                this.pr_id.shenhe = val;
                this.meijie_customer_contract_listConsole()
            },
            xieyiChange(val){
                this.pr_id.iszuofei = val;
                this.meijie_customer_contract_listConsole()
            },


            //产品线
            lineChange(index){
                this.pr_id.pr_id = index;
                this.meijie_customer_contract_listConsole()
            },
//分配余额
            jumpfenpei(){
                this.$router.push({ name: 'MediaenpeiBalance' ,query: { id: this.accounts.id}});
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
    .mediaconsole{
        .tan_infor{
            height: 40px !important;
        }
        .tan_shiftTo_zhuanchu {
            .add_gl_account {
                padding: 0 15px;
                height:30px;
                margin-bottom: 10px;
            }
            .el-dialog  {
                width:420px;
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }
                .dialog-footer {
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .el-dialog__body {
                padding:10px 20px  ;
            }
            .Tan_select {
                width: 100%;
                margin-bottom: 10px;
                .el-select {
                    width:100%;
                }
            }
            .Tan_table{
                width:100%;
                height:300px;
                border:1px solid #dfdfe0;
                .Tan_header {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    .left {
                        text-align: center;

                        span{
                            font-size: 12px;
                            display: inline-block;
                            width:40px;
                            height:20px;
                            text-align: center;
                            line-height: 20px;
                            border: 1px solid #969a9e;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    }
                }
                .TanBox {
                    width:100%;
                    height:267px;
                    overflow: auto;
                    .Tan_body {
                        height:30px;
                        line-height: 30px;
                        .left{
                            .el-radio__label {
                                display: none;
                            }
                            .checkboxFour {
                                width: 15px;
                                height: 15px;
                                background: white;
                                box-sizing: border-box;
                                position: relative;
                                margin:8px auto;
                                cursor: pointer;
                                input{
                                    opacity: 0;
                                    position: absolute;
                                    width: 20px;
                                    height: 20px;
                                    left: -3px;
                                    top: -3px;
                                    z-index:888;
                                }
                                label {
                                    display: block;
                                    width: 105%;
                                    height: 105%;
                                    cursor: pointer;
                                    z-index: 1;
                                    background: white;
                                    border: 1px solid #bfcbd9;
                                }
                                label span{
                                    display: inline-block;
                                    width: 8px;
                                    height: 4px;
                                    position: absolute;
                                    top: 4px;
                                    left: 3px;
                                    border: 2px solid white;
                                    border-top: none;
                                    border-right: none;
                                    border-radius: 0;
                                    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                    /* opacity: 0; */
                                    -moz-transform: rotate(-45deg);
                                    -ms-transform: rotate(-45deg);
                                    -webkit-transform: rotate(-45deg);
                                    transform: rotate(-45deg);
                                }
                                input[type=checkbox]:checked + label {
                                    background: #66a0e6;
                                }
                            }
                        }
                        .right{
                            .right_input {
                                .el-input {
                                    display: inline-block;
                                    width:190px;
                                    input{
                                        width:190px;
                                        height:25px!important;
                                        line-height: 25px;
                                    }
                                }

                            }
                        }
                    }
                }

                .Tan_body:nth-child(even){
                    background: #f7f7f8;
                }
            }
        }
    }
</style>
