<template>
    <div class="newContrac" >
        <el-row class="addhetongBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>新增发票</span>
            </p>
            <el-col :span="24" class="consoleTitle" >
                <span class="corporateName">杭州网兰科技有限公司-新增发票</span>
                <div class="appInfotBox">
                    <!--<span class="appInfor qu" >-->
                          <!--渠-->
                    <!--</span>-->
                    <!--<span class="appInfor zhi">-->
                    <!--直-->
                    <!--</span>-->
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>123</span>
                    <span class="nameColor lastName">负责商务 </span><span>123</span>
                </div>
            </el-col>
            <el-col :span="24" class="hetongInforBox" >
                <el-col :span="24"  class="hetongInfor">
                    <el-col :span="16" class="Infor_bottom">
                        <el-col :span="24" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">合同基本信息</span>
                            </div>
                            <div class="inputInfor">
                                <div class="infor_a">
                                    <div class="title">{{ $t('titles.advertiser') }}</div>
                                    <div class="titleInfor">杭州煎饼网络技术有限公司</div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">{{ $t('titles.agent') }}</div>
                                    <div class="titleInfor">
                                        <el-select v-model="company" placeholder="请选择">
                                            <el-option
                                                    v-for="(item,index) in companyOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">合同编号</div>
                                    <div class="titleInfor"><span>自动生成，无需备注</span></div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">媒介合同</div>
                                    <div class="titleInfor">
                                        <el-select v-model="medium" placeholder="请选择">
                                            <el-option
                                                    v-for="(item,index) in mediumOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">合同类型</div>
                                    <div class="titleInfor">
                                        <el-radio-group v-model="returned " class="radio">
                                            <el-radio :label="1">已回款</el-radio>
                                            <el-radio :label="2">未回款</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">客户所属省份</div>
                                    <div class="titleInfor">
                                        <el-select v-model="city" placeholder="请选择">
                                            <el-option
                                                    v-for="(item,index) in cityOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">负责销售</div>
                                    <div class="titleInfor"><el-input v-model="input" class="inputNum" placeholder="请输入内容"></el-input></div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="24" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">购买产品信息</span>
                            </div>
                            <div class="inputInfor">
                                <div class="infor_a infor_height">
                                    <div class="title ">实付金额</div>
                                    <div class="titleInfor_a">
                                        <div class="titleInforBox">
                                            <div class="topText">金额</div>
                                            <div  class="bottomText">
                                                <div class="bottombox">
                                                    <el-input v-model="numInput" ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="titleInforBox">
                                            <div class="topText">{{ $t('titles.fandian') }}</div>
                                            <div  class="bottomText bottom_a">
                                                <div class="bottombox">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="titleInforBox">
                                            <div class="topText">显示金额</div>
                                            <div  class="bottomText">--</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">合同有效期</div>
                                    <div class="titleInfor">
                                        <el-date-picker  :clearable='false'
                                                v-model="dateFirst"
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions0">
                                        </el-date-picker>
                                        ~
                                        <el-date-picker  :clearable='false'
                                                v-model="dateLast"
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions0">
                                        </el-date-picker>
                                        <span style="float: right;margin-right: 10px">
                                            * 结束时间为空则认为合同截止日期为： 至消费结束
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="24" class="xufeiInfor_a">
                            <el-col :span="12" class="xufeiFoot xufei_a">
                                <div class="hetongInfor">
                                    <span class="listStyle"></span>
                                    <span class="listText">合同基本信息</span>
                                </div>
                                <div class="inputInfor">
                                    <div class="infor_a">
                                        <div class="title">付款方式</div>
                                        <div class="titleInfor">
                                            <el-select v-model="payment" placeholder="请选择">
                                                <el-option
                                                        v-for="(item,index) in paymentOptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="infor_a">
                                        <div class="title">充值日期</div>
                                        <div class="titleInfor">
                                            <el-date-picker  :clearable='false'
                                                    v-model="xufeidate"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    :picker-options="pickerOptions0">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                    <div class="infor_a">
                                        <div class="title">回款周期</div>
                                        <div class="titleInfor">
                                            <el-input v-model="huikuanInput" placeholder="请输入内容"></el-input>
                                            <span style="position: absolute;right: 0;top: 0;">
                                                元
                                            </span>
                                        </div>
                                    </div>
                                    <div class="infor_a">
                                        <div class="title">结算方式</div>
                                        <div class="titleInfor">
                                            <el-radio-group v-model="returned " class="radio">
                                                <el-radio :label="1">已回款</el-radio>
                                                <el-radio :label="2">未回款</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12" class="xufeiFoot xufei_b">
                                <div class="hetongInfor">
                                    <span class="listStyle"></span>
                                    <span class="listText">合同基本信息</span>
                                </div>
                                <div class="inputInfor">
                                    <div class="infor_b">
                                        <div class="title">填写备注</div>
                                        <el-input
                                                type="textarea"
                                                :rows="2"
                                                placeholder="请输入内容"
                                                v-model="textarea">
                                        </el-input>
                                    </div>
                                </div>
                            </el-col>

                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button type="primary">提交</el-button>
                            <el-button class="reset">重置</el-button>
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
    import { customerList,customer_listPost } from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                numInput:'',
                returned:1,
                company:'',
                companyOptions:[],
                medium:'',
                mediumOptions:[],
                city:'',
                cityOptions:'',
                dateFirst:'',
                dateLast:'',
                xufeidate:'',
                payment:'',
                paymentOptions:'',
                huikuanInput:'',
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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .newContrac {
        .addhetongBox{
            .consoleTitle{
                margin:10px 0 0 0;
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
            .hetongInforBox {
                margin-top: 10px;
                .hetongInfor{
                    .Infor_bottom {
                        .xufeiInfor {
                            .hetongInfor {
                                height:40px;
                                line-height: 40px;
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
                                    font-weight: bold;
                                }
                            }
                            .inputInfor {
                                width:100%;
                                margin-top: 10px;
                                .infor_a {
                                    width:100%;
                                    height:40px;
                                    border-bottom: 1px solid #bbbbbb;
                                    font-size: 12px;
                                    .title {
                                        display: inline-block;
                                        width: 25%;
                                        height:100%;
                                        line-height: 40px;
                                        border-right:1px solid #bbbbbb;
                                        padding-left:20px ;
                                        vertical-align: top;
                                    }
                                    .titleInfor {
                                        vertical-align: top;
                                        display: inline-block;
                                        width: 74.5%;
                                        height:100%;
                                        line-height: 40px;
                                        padding-left:20px ;
                                        position: relative;
                                        .el-input {
                                            display: inline-block;
                                            height:100%;
                                            input{
                                                border:none;
                                                height:99%!important;
                                            }
                                        }
                                        .el-select {
                                            width:100%;
                                        }
                                        .el-radio__input {
                                            .el-radio__inner {
                                                border-color: #bfcbd9;
                                                background: none;
                                                border-radius: 0;
                                            }
                                        }
                                        .is-checked {
                                            .el-radio__inner::after {
                                                content: '';
                                                width: 9px;
                                                height: 5px;
                                                position: absolute;
                                                top: 4px;
                                                left: 4px;
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
                                        .el-radio__label {
                                            font-size: 12px!important;
                                            font-weight: normal;
                                        }
                                        .el-date-editor.el-input{
                                            width:120px;
                                            .el-input__icon {
                                                left:0;
                                            }
                                            .el-input__inner {
                                                padding: 0px 0px 0 30px;
                                            }
                                        }
                                    }
                                }
                                .infor_height {
                                    height:80px;
                                    .titleInfor_a {
                                        position: relative;
                                        vertical-align: top;
                                        display: inline-block;
                                        width: 74.5%;
                                        height:100%;
                                        padding-left:20px ;
                                        .title{
                                            line-height:80px;
                                        }
                                        .titleInforBox {
                                            display: inline-block;
                                            width:100px;
                                            height:100%;
                                            text-align: center;
                                            vertical-align: top;
                                            .topText{
                                                width:100%;
                                                display: inline-block;
                                                height:30px;
                                                line-height: 30px;
                                            }
                                            .bottomText{
                                                width:100%;
                                                height:40px;
                                                line-height: 40px;
                                                .bottombox {
                                                    width:80%;
                                                    height: 30px;
                                                    border-bottom: 1px solid #bbbbbb;
                                                    margin:5px auto 0;
                                                    .el-input {
                                                        vertical-align: top;
                                                        input{
                                                            border: none;
                                                            width: 100%;
                                                            height:28px!important;

                                                        }
                                                    }

                                                }
                                            }
                                            .bottom_a {
                                                border-top: 1px solid #bbbbbb;
                                            }
                                        }
                                    }

                                }
                            }
                        }
                        .xufeiInfor_a{
                            .xufei_a {
                                padding-right: 20px;
                            }
                            .xufei_b{
                                padding-left: 20px;

                            }
                            .xufeiFoot {
                                .hetongInfor {
                                    height:40px;
                                    line-height: 40px;
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
                                        font-weight: bold;
                                    }
                                }
                                .inputInfor {
                                    width:100%;
                                    margin-top: 10px;
                                    .infor_a {
                                        width:100%;
                                        height:40px;
                                        border-bottom: 1px solid #bbbbbb;
                                        font-size: 12px;
                                        position: relative;
                                        .title {
                                            display: inline-block;
                                            width: 25%;
                                            height:100%;
                                            line-height: 40px;
                                            border-right:1px solid #bbbbbb;
                                            padding-left:20px ;
                                            vertical-align: top;
                                        }
                                        .titleInfor {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 74%;
                                            height:100%;
                                            line-height: 40px;
                                            padding-left:20px ;
                                            position: relative;
                                            .el-input {
                                                display: inline-block;
                                                height:100%;
                                                input{
                                                    border:none;
                                                    height:99%!important;
                                                }
                                            }
                                            .el-select {
                                                width:100%;
                                            }
                                            .el-radio__input {
                                                .el-radio__inner {
                                                    border-color: #bfcbd9;
                                                    background: none;
                                                    border-radius: 0;
                                                }
                                            }
                                            .is-checked {
                                                .el-radio__inner::after {
                                                    content: '';
                                                    width: 9px;
                                                    height: 5px;
                                                    position: absolute;
                                                    top: 4px;
                                                    left: 4px;
                                                    border-bottom: 3px solid #bbbbbb;
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
                                            .el-radio__label {
                                                font-size: 12px!important;
                                                font-weight: normal;
                                            }
                                            .el-date-editor.el-input{
                                                width:120px;
                                                .el-input__icon {
                                                    left:0;
                                                }
                                                .el-input__inner {
                                                    padding: 0px 0px 0 30px;
                                                }
                                            }
                                        }
                                    }
                                    .infor_b {
                                        width:100%;
                                        height:160px!important;
                                        border-bottom: 1px solid #bbbbbb;
                                        font-size: 12px;
                                        .title {
                                            display: inline-block;
                                            width: 25%;
                                            height:100%;
                                            line-height: 40px;
                                            border-right:1px solid #bbbbbb;
                                            padding-left:20px ;
                                            vertical-align: top;
                                            color: #737373;
                                        }
                                        .el-textarea {
                                            display: inline-block;
                                            width: 74.3%;
                                            vertical-align: top;
                                            height:100%;
                                            .el-textarea__inner {
                                                height:100%!important;
                                                border: none;
                                            }
                                        }
                                    }
                                    .infor_height {
                                        height:80px;
                                        .titleInfor_a {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 74.5%;
                                            height:100%;
                                            padding-left:20px ;
                                            .title{
                                                line-height:80px;
                                            }
                                            .titleInforBox {
                                                display: inline-block;
                                                width:100px;
                                                height:100%;
                                                text-align: center;
                                                vertical-align: top;
                                                .topText{
                                                    width:100%;
                                                    display: inline-block;
                                                    height:30px;
                                                    line-height: 30px;
                                                }
                                                .bottomText{
                                                    width:100%;
                                                    height:40px;
                                                    line-height: 40px;
                                                    .bottombox {
                                                        width:80%;
                                                        height: 30px;
                                                        border-bottom: 1px solid #bbbbbb;
                                                        margin:5px auto 0;

                                                    }
                                                }
                                                .bottom_a {
                                                    border-bottom: 1px solid #bbbbbb;
                                                }
                                            }
                                        }

                                    }
                                }
                            }

                        }
                        .foot_btn {
                            text-align: right;
                            margin-top: 20px;
                            padding-right: 3%;
                            button{
                                width:80px;
                                height:30px;
                                padding: 0;
                                line-height: 30px;
                                text-align: center;
                            }
                            .reset {
                                color: #54ADFF;
                                border-bottom: 1px solid #54ADFF;
                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1730px) {
        .newContrac {
            .addhetongBox{
                .hetongInforBox {
                    margin-top: 10px;
                    .hetongInfor{
                        .Infor_bottom {
                            .xufeiInfor {
                                .inputInfor {
                                    .infor_a {
                                        .title {
                                            display: inline-block;
                                            width: 20%;
                                        }
                                        .titleInfor {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 79%;
                                        }
                                    }
                                }
                            }
                            .xufeiInfor_a{
                                .xufeiFoot {
                                    .hetongInfor {
                                        height:40px;
                                        line-height: 40px;
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
                                            font-weight: bold;
                                        }
                                    }
                                    .inputInfor {
                                        .infor_b {
                                            .title {
                                                display: inline-block;
                                                width: 20%;
                                            }
                                            .el-textarea {
                                                display: inline-block;
                                                width: 79%;
                                            }
                                        }
                                    }
                                }

                            }

                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1380px) {
        .newContrac {
            .addhetongBox{
                .hetongInforBox {
                    margin-top: 10px;
                    .hetongInfor{
                        .el-col-16 {
                            width: 80%;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1150px) {
        .newContrac {
            .addhetongBox{
                .hetongInforBox {
                    margin-top: 10px;
                    .hetongInfor{
                        .el-col-16, .el-col-12 {
                            width: 100%;
                        }
                        .xufei_b {
                            padding-left: 0px;
                        }
                    }

                }
            }
        }
    }
</style>
