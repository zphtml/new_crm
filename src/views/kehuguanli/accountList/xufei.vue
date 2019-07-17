<template>
    <div class="xufeiForm ku_addBox" >
        <el-row class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>新增充值</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-新增充值</span>
                <div class="appInfotBox">
                    <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.market0 | fileFunName}}</span>
                    <span class="nameColor lastName">负责商务 </span><span>{{data.business}}</span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor" >
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">充值信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData" :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        付款方式
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.payment_type">
                                            <el-radio   label="1" >预付</el-radio>
                                            <el-radio   label="2" >垫付</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        广告主名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="ggz" filterable placeholder="请选择" @change="ggzaccount">
                                            <el-option
                                                    v-for="(item,key) in ggzOptions"
                                                    :key="key"
                                                    :label="item.advertiser"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                        <!--<el-input v-model="data.ggz_name" type="number" v-on:input="fandianData"  placeholder="自动填写" :disabled="true"></el-input>-->
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a"  >
                                    <el-col :span="4" class="title">
                                        账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="account" filterable placeholder="请选择" @change="changeaccount">
                                            <el-option
                                                    v-for="(item,key) in accountOptions"
                                                    :key="key"
                                                    :label="item.a_users"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        产品名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <div style="width: 290px;height: 30px;background:#f5f7f9; border: 1px solid #e4e0d9;margin-left: 20px;padding-left: 18px;font-size: 14px;color: #c3c9d6;">
                                            <span v-if="cp_show">自动填写</span>
                                            <span v-if="!cp_show"> {{ data.cp_name }}</span>
                                        </div>
                                        <!--<el-input v-model="data.cp_name" type="number" v-on:input="fandianData" placeholder="自动填写" :disabled="true"></el-input>-->
                                    </el-col>
                                </el-col>
                            </div>
                            <div v-if="data.tuikuan_undistributed_yu_e>0">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            未使用退款
                                        </el-col>
                                        <el-col :span="20" class="input_search" style="padding-left: 30px">
                                            {{data.tuikuan_undistributed_yu_e | currency('') }}
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                           使用退款充值
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-radio-group v-model="data.tk_deduction" @change="deduction">
                                                <el-radio   label="1" >是</el-radio>
                                                <el-radio   label="2" >否</el-radio>
                                            </el-radio-group>
                                            <span style="font-size: 12px;color: orangered;" v-if="data.tk_deduction =='1'">
                                            (使用退款充值，充值金额不能大于未使用退款金额)
                                        </span>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>

                            <div v-if="fk_type == 0">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input v-model="data.money" type="text" style="width: 155px;"></el-input>
                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 155px;outline: none;z-index:9"
                                                   type="number" v-model="data.money"
                                                   name="mouse2"
                                                   placeholder="请输入金额" v-on:input="fandianData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;" v-if="data.payment_type == 2 && companyPayment_type == 1 && Number(data.money)>0">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            垫款天数
                                        </el-col>
                                        <el-col :span="20"  style="height: 30px;padding-left: 30px" >
                                            <el-select size="mini" v-model="data.zhouqi" style="width: 155px" filterable  placeholder="请选择" >
                                                <el-option
                                                        v-for="(item,key) in 15"
                                                        :key="item"
                                                        :label="item"
                                                        :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            账户币
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" placeholder="自动计算" v-model="data.show_money" style="width: 155px;" :disabled="true">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <span style="font-size: 12px">账户{{ $t('titles.fandian') }}： {{ data.rebates_proportion || '0' }}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            应收金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" placeholder="自动计算" v-model="data.ys_money" style="width: 155px;" :disabled="true">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <span style="font-size: 12px">现金{{ $t('titles.fandian') }}： {{ data.xj_fandian || '0'}}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>
                            <div v-if="fk_type == 1">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input type="text"></el-input>
                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 286px;outline: none;z-index:9"
                                                   type="number" v-model="data.money"
                                                   name="mouse2"
                                                   placeholder="请输入金额" v-on:input="fandianData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;" v-if="data.payment_type == 2 && companyPayment_type == 1 && Number(data.money)>0">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            垫款天数
                                        </el-col>
                                        <el-col :span="20"  style="height: 30px;padding-left: 30px" >
                                            <el-select size="mini" v-model="data.zhouqi" style="width: 155px" filterable  placeholder="请选择" >
                                                <el-option
                                                        v-for="(item,key) in 15"
                                                        :key="item"
                                                        :label="item"
                                                        :value="key">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            媒体报价
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input  type="text" ></el-input>
                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 286px;outline: none;z-index:9"
                                                   type="number" v-model="data.show_money"
                                                   name="mouse2"
                                                   placeholder="请输入媒体报价" v-on:input="fandianData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            应收金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" placeholder="自动计算" v-model="data.ys_money" style="width: 155px;" :disabled="true">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <span style="font-size: 12px">现金{{ $t('titles.fandian') }}： {{ data.xj_fandian || '0'}}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;"  v-if="true == dateShow">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        充值日期
                                    </el-col>
                                    <el-col :span="20" class="input_search" >
                                        <el-date-picker  :clearable='false'
                                                         v-model="data.payment_time"
                                                         type="date"
                                                         placeholder="选择日期"
                                                         @change="inforData"
                                                         :picker-options="pickerOptions0">
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;"  v-if="fk_type == 1">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        是否分期
                                    </el-col>
                                    <el-col :span="20" class="input_search" >
                                        <el-radio-group v-model="returned" class="radio_a" @change="changeFenqi($event)">
                                            <el-radio :label="0">不分期</el-radio>
                                            <el-radio :label="3">分3期</el-radio>
                                            <el-radio :label="6">分6期</el-radio>
                                            <el-radio :label="12">分12期</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="margin-bottom: 5px;" v-if="form.length>0">
                                <el-col :span="24"  class="infor_a" style="display: inline-block;float: none;">
                                    <el-col :span="4" style="display: inline-block;float: none;vertical-align: top" class="title" >
                                        &nbsp;
                                    </el-col>
                                    <el-col :span="20" style="display: inline-block;float: none;margin-left: -5px" class="input_search fenqi_Infor">
                                        <div class="fenqi_box">
                                            <div style="height:30px;">
                                                <el-col :span="24" class="fenqiheraer">
                                                    <el-col :span="3">分期</el-col>
                                                    <el-col :span="7" style="padding-left: 5px">分期金额</el-col>
                                                    <el-col :span="7" style="padding-left: 5px">媒体报价</el-col>
                                                    <el-col :span="7" style="padding-left: 5px">充值时间</el-col>
                                                </el-col>
                                            </div>
                                            <el-col :span="24" style="display: inline-block;float: none;"  class="fenqibody" v-for="(data,key) in form" :key="key">
                                                <el-col :span="3">
                                                    <span class="title" v-if="key<=8">第{{ key+1 }}期&nbsp;&nbsp;</span>
                                                    <span class="title" v-if="key>8">第{{ key+1 }}期</span>
                                                </el-col>
                                                <el-col :span="7" class="moneyInput">
                                                    <el-input  v-model="data.money" ></el-input>
                                                </el-col>
                                                <el-col :span="7" class="showmoneyInput">
                                                    <el-input v-model="data.show_money"></el-input>
                                                </el-col>
                                                <el-col :span="7" class="dateInput">
                                                    <el-date-picker  :clearable='false'
                                                                     v-model="data.payment_time"
                                                                     type="date"
                                                                     placeholder="选择日期"
                                                                     @change="fenqiDate(key)">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-col>
                                        </div>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="fujianInfor">
                        <el-col :lg="12" class="leftInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">附件信息</span>
                            </div>
                            <div class="fujian">
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        ref="upload"
                                        list-type="picture"
                                        name="File[imageFiles][]"
                                        action="/api/file/addfile"
                                        :on-success="handleAvatarSuccess"
                                        :data="dataObj"
                                        :auto-upload="false"
                                        multiple>
                                    <div class="add_fujian">
                                        <span class="fujian_icon" >
                                        <img src="../../../assets/add.png" alt="">
                                             添加附件
                                        </span>
                                    </div>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col :lg="12" class="rightInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">备注信息</span>
                            </div>
                            <div class="inputInfor"  v-for="(data,index) in formData" :key="index">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入备注"
                                        v-model="data.note">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button type="primary" @click="pullData" :disabled=disabledPull>提交</el-button>
                            <el-button class="reset" @click="reset">重置</el-button>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="8" class="kh_right_box">
                    <el-col :span="24">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">合同信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in dataInfor" :key="index">
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" >
                                    <el-col :span="7" class="title" >
                                        {{ $t('titles.customer') }}
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{  data.advertiser0.advertiser  }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        {{ $t('titles.agent') }}
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.agent_company }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        合同类型
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        <span v-if="data.type == 1">普通</span>
                                        <span v-if="data.type == 2">框架</span>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { add_renew,renewHuikuan,renewHuikuanpici,add_picifile,account_to_product,customer_advertiser_list,adtoaccount} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let accountId = '';
    export default {
        data() {
            return {
                routeId:'',
                contract_money: 0, //合同余额
                cp_show:true,
                ggz_show:true,
                dataInfor:[],
                fd_type:'1',
                companyPayment_type:3,
                formData:[{
                    'advertiser':'',//公司id
                    'submituser':'' ,//提交人id
                    'type':'' ,//合同type
                    'xf_contractid':  '',//合同id
                    'market': '',//销售id
                    'account': '',//账户id
                    'appname': '',//APPname
                    'xj_fandian':'',//现金返点
                    'rebates_proportion': '',//充值返点
                    'money':'',//充值金额
                    'ys_money':'',
                    'show_money': '',//显示金额
                    'payment_type': '1',//付款类型
                    'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                    'note':'',//备注
                    'cu_ad_id':'',
                    'zhouqi':1,
                    'ggz_name':'',
                    'cp_name':'',
                    'tk_deduction':'2',//退款抵扣
                }],
                fenqiData:{},
                fk_type:0,
                dateShow:true,
                indexNum:0,
                fileList:[],
                ggz:'',
                ggzOptions:[],
                account:'',
                accountOptions:[],
                fukuanValue:'',
                lookFandian:'',
                dataObj:{
                    'File[yid]':'',
                    'File[type]':4,
                },
                returned:0,
                form: [],
                fukuanOptions:[
                    {
                    name:'预付',
                    id:'1'
                },{
                    name:'垫付',
                    id:'2'
                }],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                add_renew(id){
                    add_renew({
                        id:id,
                    }).then(response => {
                        this.companyPayment_type = response.data.contract.payment_type;
                        let contractData = response.data.contract;
                        this.fd_type =  response.data.contract.fd_type;
                        this.dataInfor.push(response.data.contract);
                        this.customer_advertiser_list(response.data.contract.advertiser);
                        this.formData[0].rebates_proportion = response.data.contract.rencontract.fandian;
                        this.formData[0].xj_fandian =  response.data.contract.rencontract.xj_fandian;
                        accountId = response.data.contract.id;
                        this.formData[0].advertiser = response.data.contract.advertiser;
                        this.formData[0].xf_contractid = response.data.contract.id;
                        if(response.data.contract.market0){
                            this.formData[0].market = response.data.contract.market0.id;
                        }else{
                            this.formData[0].market = '';
                        }
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].type =  response.data.contract.type;
                        this.fk_type =  response.data.contract.mht.prlin.fk_type;

                        this.contract_money = Number(contractData.huikuan) + Number(contractData.bukuan) - Number(contractData.yu_e)


                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_list(id){
                    customer_advertiser_list({
                        id:id,
                    }).then(response => {
                        this.ggzOptions = response.list;
                        this.formData[0].tuikuan_undistributed_yu_e = response.customer_info.tuikuan_undistributed_yu_e
                    }). catch(err => {this.$message.error('获取失败');});
                },
                adtoaccount(id){
                    adtoaccount({
                        id:id,
                        contractid: this.routeId,
                    }).then(response => {
                        this.accountOptions = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                    if(this.fk_type == 0 && this.dateShow == true){
                        if(this.formData[0].account != ""&& this.formData[0].money != ""&& this.formData[0].payment_time != ""  ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else if(this.fk_type == 1 && this.dateShow == true ){
                        if(this.formData[0].account != ""&&  this.formData[0].money != "" && this.formData[0].show_money != "" ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else if(this.fk_type == 1 && this.dateShow == false ){
                        if(this.formData[0].account != ""&&  this.formData[0].money != ""&& this.formData[0].show_money != "" && this.form[0].payment_time !=""){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }
                },
                renewHuikuan(accountId,val){
                    renewHuikuan({
                        id:accountId,
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 4;
                            let _this = this;

                            this.$refs.upload.submit();

                            this.success()
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                renewHuikuanpici(accountId,val){
                    renewHuikuanpici({
                        id:accountId,
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 4;
                            let _this = this;
                            this.$refs.upload.submit();
                            this.success()
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabledPull = true;
                        this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                        if(this.indexNum == 0){
                            if(this.fk_type == 0){
                                if(this.formData[0].payment_type == 1 && this.formData[0].tk_deduction  !=1  && (this.contract_money - this.formData[0].ys_money) < -1){
                                    this.$message("合同金额不足！");
                                    this.disabledPull = false;
                                    return;
                                }
                            }else{
                                if(this.formData[0].payment_type == 1 && this.formData[0].tk_deduction  !=1  && (this.contract_money - this.formData[0].money) < -1){
                                    this.$message("合同金额不足！");
                                    this.disabledPull = false;
                                    return;
                                }
                            }
                            let money = this.formData[0].money;
                            let ys_money =  this.formData[0].ys_money;
                            let newDormData = Object.assign({},  this.formData[0]);
                            newDormData.ys_money = money;
                            newDormData.money = ys_money;
                            this.renewHuikuan(accountId,newDormData);
                        }else{//分期

                            let money = [];
                            let show_money = [];
                            let payment_type = [];
                            let ys_money = [];
                            for(var i = 0;i<this.form.length;i++){
                                show_money.push(this.form[i].show_money);
                                ys_money.push(this.formData[0].money/this.returned)
                                money.push(this.formData[0].ys_money/this.returned)
                                if(this.form[i].payment_time){
                                    payment_type.push(moment(this.form[i].payment_time).format('YYYY-MM-DD'));
                                }else{
                                    payment_type.push('');
                                }
                            }
                            this.fenqiData = {
                                'advertiser':this.formData[0].advertiser,//公司id
                                'submituser':this.formData[0].submituser ,//提交人id
                                'type':this.formData[0].type ,//合同type
                                'xf_contractid':  this.formData[0].xf_contractid,//合同id
                                'market': this.formData[0].market,//销售id
                                'account': this.formData[0].account,//账户id
                                'appname': this.formData[0].appname,//APPname
                                'xj_fandian':this.formData[0].xj_fandian,//现金返点
                                'rebates_proportion': this.formData[0].rebates_proportion,//充值返点
                                'money':money,//充值金额
                                'ys_money':ys_money,
                                'show_money': show_money,//显示金额
                                'payment_type': this.formData[0].payment_type,//付款类型
                                'payment_time': payment_type,//付款时间 2017-11-01
                                'note':this.formData[0].note,//备注
                                'zhouqi':this.formData[0].zhouqi,
                            };
                            this.renewHuikuanpici(accountId,this.fenqiData)
                        }

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                        this.disabledPull = false;
                    });
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--协议详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'agreementDetails' , query: { id: _this.routeId}});
                    }, 500);
                },
                add_picifile(accountId){
                    add_picifile({
                        id:accountId,
                    }).then(response => {
                    }). catch(err => {this.$message.error('获取失败');});
                },
                account_to_product(id){
                    account_to_product({
                        id:id,
                    }).then(response => {

                        if(response.msg.advertiser){
                            this.formData[0].ggz_name = response.msg.advertiser;
                            this.cp_show = false;
                        }else{
                            this.cp_show = true;
                        }
                        if( response.msg.advertiser){
                            this.formData[0].cp_name =  response.msg.product;
                            this.ggz_show = false;
                        }else{
                            this.ggz_show = true;

                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'accounts'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId =  this.$route.query.id;

            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.add_renew(decodeURI(ref[0].split('=')[1]));

        },
        methods: {

            //广告主
            ggzaccount(val){
                this.adtoaccount(this.ggzOptions[val].id);
                   this.formData[0].ggz_name = this.ggzOptions[val].advertiser
            },
            //退款抵扣
            deduction(val){
                if(val == '1'){
                    this.formData[0].money =this.formData[0].tuikuan_undistributed_yu_e;
                    this.fandianData()
                }
            },
            //金额
            fandianData()   {
                if(this.formData[0].tk_deduction == '1'){
                    Number(this.formData[0].money)>Number(this.formData[0].tuikuan_undistributed_yu_e)?this.formData[0].money =this.formData[0].tuikuan_undistributed_yu_e:'';
                }
                if(this.fk_type == 0){
                    this.formData[0].show_money = (Number(this.formData[0].money) * (1+Number(this.formData[0].rebates_proportion)/100)).toFixed(2);
                    this.formData[0].ys_money = Number(this.formData[0].money)*(1-(Number(this.formData[0].xj_fandian)/100));
                }else{
                    this.formData[0].ys_money = Number(this.formData[0].money)*(1-(Number(this.formData[0].xj_fandian)/100));
                }
                if(this.returned != 0){
                    let num = this.formData[0].money/this.returned;
                    let Snum = this.formData[0].show_money/this.returned;
                    for(var i = 0;i<this.returned;i++){
                        this.form[i].money = num.toFixed(2);
                        this.form[i].show_money = Snum.toFixed(2);
                    }
                }
                this.judge();
            },
            changeaccount(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].account = this.accountOptions[index].id;
                    this.formData[0].appname = this.accountOptions[index].appname;
                    this.formData[0].cu_ad_id = this.accountOptions[index].cu_ad_id;
                }
                this.account_to_product(this.accountOptions[index].id);
                this.judge()
            },
            fukuanchange(index){
                this.formData[0].payment_type = index;
                this.judge()
            },
            inforData(){
                this.judge()
            },
            //筛选
            changeFenqi(index){
                this.form = [];
                this.indexNum = index;
                if(index == '0'){
                    this.form = [];
                    this.dateShow = true;
                }else{
                    this.dateShow = false;
                    for(var i = 0;i<index;i++){
                        this.form.push({
                            money:(this.formData[0].money/this.returned).toFixed(2),
                            show_money:(this.formData[0].show_money/this.returned).toFixed(2),
                            payment_time:'',
                        })
                    }
                }
                this.judge();
            },
            fenqiDate(val){
                if(val == 0){

                    for(var i = 0;i<this.form.length;i++){
                        this.form[i].payment_time = moment(this.form[0].payment_time).add(i, 'months').format('YYYY-MM-DD')
                    }
                }
                this.judge();
            },
            //提交
            pullData(){
                if(Number(this.formData[0].show_money)>=0){
                    let data = '';
                    if(this.$refs.upload.uploadFiles.length == 0 &&  this.formData[0].note == ''){
                        data = '系统检测到您未添加上传附件和备注，是否继续?'
                    }else if(this.$refs.upload.uploadFiles.length == 0 &&  this.formData[0].note != ''){
                        data = '系统检测到您未添加上传附件，是否继续?'
                    }else if(this.$refs.upload.uploadFiles.length != 0 &&  this.formData[0].note == ''){
                        data = '系统检测到您未添加备注，是否继续?'
                    }else{
                        data = '提交后不可更改，是否继续?'
                    }
                    this.tan(data)
                }else{
                    this.$message({
                        message: '账户币不能为空',
                        type: 'warning'
                    });
                }

            },
            //上传成功
            handleAvatarSuccess(){
                this.success();
                if(this.dateShow == false){
                    this.add_picifile(this.dataObj['File[yid]'])
                }
            },
            //重置
            reset(){

                this.formData[0].appname  = appname;
                 this.formData[0].payment_time  = moment().format('YYYY-MM-DD');;
                this.formData[0].money  = '';
                this.formData[0].show_money  = '---';
                this.formData[0].note  = '---';
                this.account = '';
                this.fukuanValue = '';

                this.$refs.upload.clearFiles();
          },
//跳转
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id: this.routeId}});
            },

        },
        filters:{
            fileFun(val){
                if(val){
                    return val
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
        created() {

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .xufeiForm{
        .input_search {
            .el-input-group__append {
                background: #f5f7f9!important;
                color: black;
            }
        }

        .fenqi_Infor {
            padding:0 10px 0 20px;

            .fenqi_box {
                border: 1px dashed #bebbb5;
                .fenqiheraer{
                    width: 100%;
                    height: 30px;
                    font-size: 12px;
                    color: #9c9c9c;
                    padding-left: 20px;
                }
                .fenqibody {
                    width: 100%;
                    font-size: 12px;
                    color: #9c9c9c;
                    padding-left: 20px;
                    .moneyInput,.showmoneyInput,.dateInput {
                        .el-input{
                            width:100%!important;
                            margin-left: 0!important;
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }


</style>
