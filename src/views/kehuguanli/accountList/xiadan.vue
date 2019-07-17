<template>
    <div class="xufeiForm ku_addBox" >
        <el-row class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>下单</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-新增下单</span>
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
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">下单信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData"  :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        开户性质
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="xingzhi" filterable placeholder="请选择" @change="changexingzhi">
                                            <el-option
                                                    v-for="(item,key) in xingzhiOptions"
                                                    :key="key"
                                                    :label="item.name"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" v-for="(data,index) in formData"  :key="index">
                                    <el-col :span="4" class="title">
                                        客户URL
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.url"   placeholder="请输入内容"  v-on:input="inforData"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        服务类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="fw_type"   filterable placeholder="请选择" @change="fw_change">
                                            <el-option
                                                    v-for="(i,key) in fw_type_options"
                                                    :key="i.id"
                                                    :label="i.label"
                                                    :value="i.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>

                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        广告主名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="ggzName"   filterable placeholder="请选择" @change="ggz_change">
                                            <el-option
                                                    v-for="(i,key) in ggz_options"
                                                    :key="key"
                                                    :label="i.advertiser"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                        <el-tooltip content="点击添加广告主" placement="right" effect="light" style="margin-left: 25px">
                                            <span style="cursor: pointer;color: #54ADFF;font-weight: bold" v-if="account_add_ruData[0].avid" @click="jump_ggz">?</span>
                                        </el-tooltip>
                                    </el-col>

                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        {{ $t('titles.nick') }}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="cpName"  filterable placeholder="请选择" @change="cu_ad_change">
                                            <el-option
                                                    v-for="(i,key) in cp_options"
                                                    :key="key"
                                                    :label="i.product"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>

                        </div>
                    </el-col>
                </el-col>
                <el-col :span="8" class="kh_right_box">
                    <el-col :span="24">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">合同信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in dataInfor"  :key="index">
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
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">充值信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData"  :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        付款方式
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.payment_type">
                                            <el-radio :label="1">预付</el-radio>
                                            <el-radio :label="2">垫付</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div >
                                <div v-if="fk_type == 0">
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                                金额
                                            </el-col>
                                            <el-col :span="20" class="input_search">
                                                <el-input  type="text" style="width: 155px;"></el-input>
                                                <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 152px;outline: none;z-index:9"
                                                       type="number" v-model="data.money"
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
                                            <el-col :span="20"  style="padding-left:30px">
                                                <el-select v-model="data.zhouqi"  size="mini" style="width:155px;"  filterable placeholder="请选择" @change="ggz_change">
                                                    <el-option
                                                            v-for="(i,key) in 15"
                                                            :key="i"
                                                            :label="i"
                                                            :value="i">
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
                                                <el-input class="inputText" placeholder="自动计算" v-model="data.show_money" style="width: 155px;"  :disabled="true">
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
                                                <el-input class="inputText" placeholder="自动计算" v-model="data.ys_money" style="width: 155px;"  :disabled="true">
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
                                            <el-col :span="20"  style="padding-left:30px">
                                                <el-select v-model="data.zhouqi"  size="mini" style="width:155px;"  filterable placeholder="请选择" @change="ggz_change">
                                                    <el-option
                                                            v-for="(i,key) in 15"
                                                            :key="i"
                                                            :label="i"
                                                            :value="i">
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
                                                <el-input type="text" ></el-input>
                                                <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 286px;outline: none;z-index:9"
                                                       type="number" v-model="data.show_money"
                                                       placeholder="请输入金额" v-on:input="fandianData"
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

                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="font-size: 12px;color: black;margin-left: 20px">{{ a_users }}</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;"  v-if="true == dateShow">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                      充值日期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
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
                                            <el-col :span="24" style="display: inline-block;float: none;"  class="fenqibody" v-for="(data,key) in form"  :key="key">
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
                            <div class="inputInfor"  v-for="(data,index) in formData"  :key="index">
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { add_renew,renewHuikuan,renewHuikuanpici,add_picifile,account_add_ru,customer_advertiser_list} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let accountId = '';
    let appname = '';
    export default {
        data() {
            return {
                routeId:'',
                contract_money: 0,
                dataInfor:[],
                companyPayment_type:3,
                payment_type:1,
                fd_type:'1',
                fw_type:'',
                fw_type_options: [{
                    value: '130001',
                    label: '优化服务+页面'
                }, {
                    value: '130002',
                    label: '页面'
                }, {
                    value: '130003',
                    label: '优化服务'
                }, {
                    value: '130004',
                    label: '无服务'
                }, {
                    value: '130005',
                    label: '监督'
                }],
                formData:[{
                    'advertiser':'',//公司id
                    'submituser':'' ,//提交人id
                    'type':'' ,//合同type
                    'xf_contractid':  '',//合同id
                    'market': '',//销售id
                    'account': '',//账户id
                    'appname': '',//APPname
                    'rebates_proportion': '',//充值返点
                    'xj_fandian':'',
                    'money':'',//充值金额
                    'show_money': '',//显示金额
                    'ys_money':'',
                    'payment_type': 1,//付款类型
                    'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                    'cu_ad_id':'',
                    'cu_ad_product':'',
                    'note':'',//备注
                    'isorder':'1',
                    'zhouqi':1,
                    'xingzhi':'',
                    'guanggaozhu':'',
                    'url':'',
                }],
                account_add_ruData:[{
                    "submituser":"",
                    "contract_id":"",//合同id
                    "appname":"",
                    "server_type":"",
                    "promote_url":"",
                    "prlin_id":"1",//产品线id
                    "fandian":"30",
                    "qudao":"0",
                    "state":"1",
                    "a_users":"",//临时+ 账户 +时间戳
                    "a_password":"123456",//123456
                    "avid":"",//公司id
                    'cu_ad_id':'',
                    'cu_ad_product':'',
                }],
                ggzName:'',
                ggz_options:[],
                fk_type:0,
                cpName:'',
                cp_options:[],
                a_users:'',
                guanggaozhuShow:true,
                fenqiData:{},
                dateShow:true,
                fileList:[],
                account:'',
                accountOptions:[],
                fukuanValue:'',
                lookFandian:'',
                dataObj:{
                    'File[yid]':'',
                    'File[type]':4,
                },
                indexNum:0,
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
                xingzhi:'',
                xingzhiOptions:[
                    {
                        name:'直开',
                        id:'1'
                    },{
                        name:'拼框',
                        id:'2'
                    },{
                        name:'外地',
                        id:'3'
                    },{
                        name:'框架',
                        id:'4'
                    }
                ],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },

                account_add_ru(data){
                    account_add_ru({
                        data:data,
                    }).then(response => {
                          this.formData[0].account = response.data.id;
                        if(this.indexNum == 0){
                            let money = this.formData[0].money;
                            let ys_money =  this.formData[0].ys_money;
                            let newDormData = Object.assign({},  this.formData[0]);
                            newDormData.ys_money = money;
                            newDormData.money = ys_money;
                            this.renewHuikuan(accountId,newDormData);
                        }else{

                            let money = [];
                            let show_money = [];
                            let payment_time = [];
                            let ys_money = [];
                            for(var i = 0;i<this.form.length;i++){
                                money.push(this.formData[0].ys_money/this.returned)
                                show_money.push(this.form[i].show_money);
                                ys_money.push(this.formData[0].money/this.returned)
                                if(this.form[i].payment_time){
                                    payment_time.push(moment(this.form[i].payment_time).format('YYYY-MM-DD'));
                                }else{
                                    payment_time.push('');
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
                                'rebates_proportion': this.formData[0].rebates_proportion,//充值返点
                                'money':money,//充值金额
                                'ys_money':ys_money,
                                'show_money': show_money,//显示金额
                                'isorder':'1',
                                'payment_type': this.formData[0].payment_type,//付款类型
                                'payment_time': payment_time,//付款时间 2017-11-01
                                'zhouqi': this.formData[0].zhouqi,
                                'note':this.formData[0].note,//备注
                            };
                            this.renewHuikuanpici(accountId,this.fenqiData)
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },


                add_renew(id){
                    add_renew({
                        id:id,
                    }).then(response => {
                        let contractData = response.data.contract;
                        this.companyPayment_type = response.data.contract.payment_type;
                        this.fd_type = response.data.contract.fd_type;
                        this.customer_advertiser_list(response.data.contract.advertiser);
                        this.dataInfor.push(response.data.contract);
                        this.accountOptions = response.data.accountlist;
//                        appname = response.data.contract.appname
//                        this.formData[0].appname = response.data.contract.appname;
                        this.formData[0].rebates_proportion = response.data.contract.rencontract.fandian;
                        this.formData[0].xj_fandian =  response.data.contract.rencontract.xj_fandian;
                        accountId = response.data.contract.id;
                        this.formData[0].advertiser = response.data.contract.advertiser;
                        this.formData[0].xf_contractid = response.data.contract.id;
                        this.fk_type =  response.data.contract.mht.prlin.fk_type;
                        if(response.data.contract.market0){
                            this.formData[0].market = response.data.contract.market0.id;
                        }else{
                            this.formData[0].market = '';
                        }
                        if( response.data.contract.advertiser0.customer_type){
                            this.guanggaozhuShow = false;
                        }else{
                            this.guanggaozhuShow = true;
                            this.formData[0].guanggaozhu = response.data.contract.advertiser0.advertiser;
                        }

                        this.formData[0].submituser = this.user.id;
                        this.formData[0].type =  response.data.contract.type;
                        let timestamp = Date.parse(new Date());
                        this.a_users = '临_'+response.data.contract.mht.prlin.name+timestamp / 1000;
                        //新建
                        this.account_add_ruData[0].submituser = this.user.id;
                        this.account_add_ruData[0].contract_id =response.data.contract.rencontract.contract_id;
                        this.account_add_ruData[0].avid = response.data.contract.advertiser0.id;

                        this.contract_money = Number(contractData.huikuan) + Number(contractData.bukuan) - Number(contractData.yu_e)

                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                    if(this.fk_type == 0 && this.dateShow == true){
                        if(this.formData[0].xingzhi != "" && this.formData[0].url != "" && this.formData[0].money != "" && this.formData[0].payment_time != "" && this.formData[0].cu_ad_id !="" && this.formData[0].cu_ad_product !="" && this.fw_type !=""){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else if(this.fk_type == 1 && this.dateShow == true ){
                        if( this.formData[0].xingzhi != "" && this.formData[0].url != "" && this.formData[0].money != "" && this.formData[0].show_money != "" && this.formData[0].cu_ad_id !="" && this.formData[0].cu_ad_product !=""  && this.fw_type !=""){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else if(this.fk_type == 1 && this.dateShow == false ){
                        if( this.formData[0].xingzhi != "" && this.formData[0].url != "" && this.formData[0].money != ""&& this.formData[0].show_money != "" && this.form[0].payment_time !="" && this.formData[0].cu_ad_id !="" && this.formData[0].cu_ad_product !=""  && this.fw_type !=""){
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

                    }).catch(err => {

                    });
                },
                renewHuikuanpici(accountId,val){
                    renewHuikuanpici({
                        id:accountId,
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
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
                customer_advertiser_list:function(id){

                    customer_advertiser_list({
                        id:id,
                    }).then(response => {
                        if(response.list){
                            this.ggz_options = response.list;
                        }else{
                            this.$confirm('请先填写广告主再提交下单', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.$router.push({ name: 'Advertiser',query: { id:this.accounts.id} });
                            }).catch(() => {

                            });
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,
                tan(data) {

                    if(this.fk_type == 0){
                        if(this.formData[0].payment_type == 1 && (this.contract_money - this.formData[0].ys_money) < -1){
                            this.$message("合同金额不足！");
                            return;
                        }

                    }else{
                        if(this.formData[0].payment_type == 1 && (this.contract_money - this.formData[0].money) < -1){
                            this.$message("合同金额不足！");
                            return;
                        }
                    }


                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let money = this.formData[0].money;
                        let ys_money =  this.formData[0].ys_money;

                        let newDormData = Object.assign({},  this.formData[0]);
                        newDormData.ys_money = money;
                        newDormData.money = ys_money;
                        this.disabledPull = true;
                        newDormData.payment_time = moment(newDormData.payment_time).format('YYYY-MM-DD');
                        this.account_add_ruData[0].appname =newDormData.appname;
                        this.account_add_ruData[0].a_users =  this.a_users;
                        this.account_add_ru(this.account_add_ruData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
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
            this.add_renew(  this.routeId);

        },
        methods: {
            jump_ggz(){

                this.$router.push({ name: 'Advertiser' , query: { id:  this.account_add_ruData[0].avid}});
            },
            ggz_change(index){
                this.formData[0].cu_ad_id = this.ggz_options[index].id;
                this.account_add_ruData[0].cu_ad_id = this.ggz_options[index].id;
                this.cp_options = this.ggz_options[index].product0;
                this.cpName = "";
                this.formData[0].cu_ad_product = "";
                this.account_add_ruData[0].cu_ad_product = "";
                this.judge()
            },
            fw_change(val){
                this.account_add_ruData[0].server_type = val;
                this.judge()
            },
            cu_ad_change(index){
                this.formData[0].cu_ad_product = this.cp_options[index].id;
                this.account_add_ruData[0].cu_ad_product = this.cp_options[index].id;
                this.judge()
            },
            fandianData()   {
                if(this.fk_type == 0){

                    this.formData[0].show_money = ((Number(this.formData[0].money)) * (1+Number(this.formData[0].rebates_proportion)/100)).toFixed(2);
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
            changeaccount(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].account = this.accountOptions[index].id;
                    this.formData[0].appname = this.accountOptions[index].appname;

                }
                this.judge()
            },
            changexingzhi(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].xingzhi = this.xingzhiOptions[index].name;
                }
                this.judge()
            },
            fukuanchange(index){
                this.formData[0].payment_type = index;
                this.judge()
            },
            inforData(){
                this.judge()
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
                this.$router.push({ name: 'agreementDetails' , query: { id:this.$route.query.id}});
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
    .xufeiForm {
        .xufeiBox{
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
            .xufeiInforBox {
                margin-top: 10px;
                .xiadanInfor{
                    min-width: 560px;
                    .Infor_bottom {
                        margin-bottom: 20px;
                    }
                    .hetongInfor {
                        height:30px;
                        line-height: 30px;
                        font-size: 12px;
                        border-bottom:1px solid #e6e6e6;
                        .listStyle{
                            width:8px;
                            height:8px;
                            display: inline-block;
                            background: #000;
                            border-radius: 50%;
                        }
                        .listText {
                            margin-left: 10px;
                        }
                    }
                    .inforTitle {
                        font-size: 12px;
                        .el-col {
                            padding-left: 20px;
                            .inforBox {
                                margin-top:20px;
                            }
                            .title {
                                margin-right: 20px;
                            }
                        }
                    }
                    .xufeiInfor {
                        padding-right: 50px;
                    }
                    .xufeiInfor,.fukuanInfor {
                        font-size: 12px;
                        .inputInfor {
                            .infor_a {
                                padding:0 20px;
                                margin-top: 18px;
                                .el-select,.inputText {
                                    width:80%;
                                    height:30px;
                                    font-size: 12px;
                                    input{
                                        height:29px!important;
                                        line-height:29px!important;
                                        font-size: 12px;
                                    }
                                }
                                .el-date-editor{
                                    width:50%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                        line-height:29px!important;
                                        font-size: 12px;
                                    }
                                    .el-input__icon {
                                        line-height: 21px;
                                        vertical-align: top;
                                    }
                                }
                                .el-textarea {
                                    width:80%;
                                    .el-textarea {
                                        height: 60px;
                                    }
                                }
                                .title{
                                    width: 60px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    position: relative;
                                    color: #9C9C9C;
                                    .important {
                                        position: absolute;
                                        left:-10px;
                                        font-size: 14px;
                                        color: red;
                                    }
                                }
                                .inputBox{
                                    display: inline-block;
                                    width:80%;
                                    height: 30px;
                                    vertical-align: middle;
                                    .fenqiInput {
                                        padding:0 5px;
                                        .el-date-editor {
                                            width:100%;
                                        }
                                        input{
                                            width:100%;
                                            height:29px!important;
                                            line-height:30px!important;
                                            border-radius: 0;
                                            font-size: 12px;
                                        }
                                    }
                                }
                                .el-radio__input {
                                    .el-radio__inner {
                                        border-color: #bfcbd9;
                                        background: none;
                                        border-radius: 0;
                                        width: 15px;
                                        height: 15px;
                                    }
                                }
                                .el-radio__label {
                                    color: #000;
                                    font-weight:normal;
                                    font-size: 12px;
                                }
                                .is-checked {
                                    .el-radio__inner::after {
                                        content: '';
                                        width: 9px;
                                        height: 5px;
                                        position: absolute;
                                        top: 3px;
                                        left: 3px;
                                        border: 3px solid #bbbbbb;
                                        border-top: none;
                                        border-right: none;
                                        background: transparent;
                                        border-radius: 0;
                                        filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                        /* opacity: 0; */
                                        -moz-transform: rotate(-45deg);
                                        -ms-transform: rotate(-45deg);
                                        -webkit-transform: rotate(-45deg);
                                        transform: rotate(-45deg);
                                    }
                                }
                                .title_top{
                                    width: 60px;
                                    display: inline-block;
                                    vertical-align: top;
                                    color: #9C9C9C;
                                }
                                .upload {
                                    width:80%;
                                    height: 60px;
                                    text-align: center;
                                    display: inline-block;
                                    border:1px solid #e6e6e6;
                                    line-height: 60px;
                                    .upload-demo {
                                        width:100%;
                                        height:100%;
                                        .el-upload {
                                            width:100%;
                                            height:100%;
                                            .el-upload-dragger{
                                                width:100%;
                                                height:100%;
                                                border-radius: 0;
                                            }
                                        }
                                        .el-upload-list {
                                            margin-top: -25px;
                                        }
                                    }
                                    .el-button {
                                        color: #fff;
                                        background-color: #3B546B;
                                        border-color: #3B546B;
                                    }
                                }
                                .action {
                                    width:80%;
                                    display: inline-block;
                                    text-align: center;
                                    .actionDiv {
                                        display: inline-block;
                                        height:60px;
                                        text-align: center;
                                        vertical-align: top;
                                        span{
                                            display: inline-block;
                                            margin-bottom:10px;
                                        }
                                        .actionDiv_num {
                                            text-align: center;
                                            height:30px;
                                            line-height: 30px;
                                            width:100%;
                                            margin:0 auto;
                                            input{
                                                border: none;
                                                height:29px!important;
                                                line-height:29px!important;
                                            ;
                                            }
                                        }
                                        .actionDiv_num_a {
                                            border: 1px solid #e6e6e6;
                                        }
                                        .actionDiv_num_b {
                                            border-top:1px solid #e6e6e6;
                                        }
                                    }
                                    .actionDiv_b{
                                        width:35%;
                                    }
                                    .actionDiv_a ,.actionDiv_c{
                                        width:29%;
                                    }
                                }
                            }

                        }

                    }
                    .fukuanInfor {
                        padding-left: 50px;
                    }
                }
            }
            .foot_btn {
                text-align: right;
                margin-top: 20px;
                padding-right: 10%;
                button{
                    width:80px;
                    height:30px;
                    padding: 0;
                    line-height: 30px;
                    text-align: center;
                }
                .reset {
                    color: #54ADFF;
                    border: 1px solid #54ADFF;
                }
            }
        }
    }
    @media screen and (max-width: 1480px) {
        .xufeiForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:85%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:90%;
                }
            }
        }
    }
    @media screen and (max-width: 1350px) {
        .xufeiForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:85%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:95%;
                }
            }
        }
    }
    @media screen and (max-width: 1280px) {
        .xufeiForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:95%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:100%;
                }
            }
        }
    }
    @media screen and (max-width: 1020px) {
        .Infor_bottom {
            .el-col-12 {
                width: 70%;
            }
        }
    }


</style>
