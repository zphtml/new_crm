<template>
    <div class="addhuikuanList ku_addBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>添加公司发票</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser }}-添加发票</span>
                <div class="appInfotBox">
                   <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.submituser0 | fileFunName }}</span>
                    <span class="nameColor lastName">负责商务 </span><span>{{data.business | fileFunName}}</span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">发票信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData" :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        收支类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.shouzhi">
                                            <el-radio :label="1">开出</el-radio>
                                            <el-radio :label="2">收到</el-radio>
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
                                        <el-select v-model="name_ggz" clearable   placeholder="请选择" @change="name_ggz_Change">
                                            <el-option
                                                    v-for="(item,key) in ggzoptions"
                                                    :key="item.id"
                                                    :label="item.advertiser"
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
                                        <div class="inputBox">
                                            {{  data.appname }}
                                        </div>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" type="number" v-model="data.money" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" v-if="data.shouzhi == 1">
                                        开票主体
                                    </el-col>
                                    <el-col :span="4" class="title" v-if="data.shouzhi == 2">
                                        收票主体
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="b_company" filterable placeholder="请选择" @change="changeb_company">
                                            <el-option
                                                    v-for="(item,key) in b_companyOptions"
                                                    :key="item.id"
                                                    :label="item.companyname"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        税目
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="type" filterable placeholder="请选择" @change="changetype">
                                            <el-option
                                                    v-for="(item,key) in typeOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        开票类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.type2" class="radio_a">
                                            <el-radio :label="1">专票</el-radio>
                                            <el-radio :label="2">普票</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        是否回款
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.is_back_money" class="radio_a">
                                            <el-radio :label="1">已回款</el-radio>
                                            <el-radio :label="2">未回款</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="fujianInfor">
                        <el-col :span="24" class="rightInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">备注信息</span>
                            </div>
                            <div class="inputInfor" v-for="(data,index) in formData" :key="index">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="data.note">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button type="primary" :disabled=disabledPull @click="pullData">提交</el-button>
                            <el-button  type="primary" class="reset">重置</el-button>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="8" class="kh_right_box">
                    <el-col :span="24">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">开票资料</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in fapiaoInfor" :key="index">
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" >
                                    <el-col :span="7" class="title" >
                                        纳税人识别号
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.tax_identification }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        开户行
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.open_account }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        地址
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.ticket_address }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        账号
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.account }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        电话
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.kp_tel }}
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
    import {invoice_addruPost,invoice_addInfor,invoice_typeInfor,customer_advertiser_list} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                fapiaoInfor:[],
                dataInfor:[],
                textarea: '',
                formData:[
                    {
                        "invoice_head":"", //advertiser
//                        "contract_id":"",
//                        "contract_no":"",
                        "submituser":"",
                        "money":"",
                        "is_back_money":1,
                        "type2":1,
                        "shouzhi":1,
                        "main_company":"1",
                        "type":"",
                        "appname":"",
                        "note":" ",
                        "cu_ad_id":'',
                    }
                ],
                name_ggz:'',
                ggzoptions:[],
                b_company:'',
                b_companyOptions:[],
                type:'',
                typeOptions:[],
                //账户信息
                invoice_addInfor:function(val){
                    invoice_addInfor({
                        id:val,
                    }).then(response => {
                        this.b_companyOptions.push(response.agentCompany);
                        this.b_companyOptions =  this.b_companyOptions[0];
                        this.dataInfor.push(response.customer);
                        this.fapiaoInfor =   this.dataInfor;
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].invoice_head = response.customer.id;
                        this.formData[0].appname = response.customer.appname;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                invoice_typeInfor:function(val){
                    invoice_typeInfor({
                        id:val,
                    }).then(response => {
                        this.typeOptions = response
                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_list:function(){
                    customer_advertiser_list({
                        id:this.accounts.id,
                    }).then(response => {
                        this.ggzoptions = response.list;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,

                //上传
                invoice_addruPost:function(val){
                    invoice_addruPost({
                        data:val
                    }).then(response => {
                        if(response.code == '200'){
                            this.success();
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--客户控制台',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'console',query: { type:1} });
                    }, 500);
                },
                judge(){
                    if( this.formData[0].money != ""&&
                        this.formData[0].main_company != ""&&
                        this.formData[0].type != "" ){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabledPull = true;

                        this.invoice_addruPost(this.formData[0])
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'user',
                'accounts'
            ])
        },
        watch: {
            user: function (newValue) {

            },
        },
        mounted(){
            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.invoice_addInfor(decodeURI(ref[0].split('=')[1]));
            this.customer_advertiser_list();
        },
        methods: {
            name_ggz_Change(index){
                if(typeof index == 'number'){
                    this.formData[0].cu_ad_id = this.ggzoptions[index].id;
                    let data = [{
                        tax_identification:this.ggzoptions[index].tax_identification,
                        open_account:this.ggzoptions[index].open_account,
                        ticket_address:this.ggzoptions[index].ticket_address,
                        account:this.ggzoptions[index].account,
                        kp_tel:this.ggzoptions[index].tax_identification,
                    }];
                    this.fapiaoInfor =  data;
                }else{
                    this.formData[0].cu_ad_id = '';
                    this.fapiaoInfor =   this.dataInfor;
                }
            },
            changeb_company(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].main_company = this.b_companyOptions[index].id;
                }

                this.invoice_typeInfor( this.formData[0].main_company);
                this.type = '';
                this.formData[0].type = '';
                this.judge();

            },
            changetype(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].type = this.typeOptions[index].id;
                }
                this.judge();
            },
            judgeData(){
                this.judge();
            },
            handleAvatarSuccess(){
                this.success();
            },
            //提交
            pullData(){
                let data = '';
                if(this.formData[0].note == ''){
                    data = '系统检测到您未添加备注，是否继续?'
                }else{
                    data = '提交后不可更改，是否继续?'
                }
                this.tan(data)
            },
//跳转
            jumpCustomerList(){
                this.$router.push({name: 'kehuliebiao'});
            },
            jumpConsole(){
                this.$router.push({name: 'console' ,query: { type:1} });
            },
            back(){
                this.$router.push({name: 'AddCustomerInformation'});
            }
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
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .addhuikuanList {
        .addhuikuanBox {
            .consoleTitle {
                margin: 10px 0 0 0;
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
                        margin: 0 50px 0 0px;
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

                .name {
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    display: inline-block;
                    margin: 0;
                    vertical-align: top;
                    position: relative;
                    .hoverTishi {
                        width: 225px;
                        height: 20px;
                        line-height: 20px;
                        display: inline-block;
                        background: #cfc6c6;
                        position: absolute;
                        top: -20px;
                        margin: 0;
                        .color {
                            color: #54adff;
                            cursor: pointer;
                        }
                    }
                    .show {
                        -webkit-transition: opacity 1s;
                        opacity: 0;
                        pointer-events: auto;
                    }
                    .chaxun {
                        width: 14px;
                        height: 14px;
                        line-height: 15px;
                        text-align: center;
                        font-size: 12px;
                        display: inline-block;
                        border-radius: 50%;
                        color: white;
                        background: #bbbbbb;
                        cursor: pointer;
                    }
                    .chaxun:hover .hoverTishi {
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
                .hetongInfor {
                    .Infor_bottom {
                        .fapiaoInfor {
                            .hetongInfor {
                                height: 40px;
                                line-height: 40px;
                                font-size: 12px;
                                border-bottom: 1px solid #e6e6e6;
                                .listStyle {
                                    width: 8px;
                                    height: 8px;
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
                                width: 100%;
                                margin-top: 10px;
                                .infor_a {
                                    width: 100%;
                                    height: 40px;
                                    border: 1px solid #bbbbbb;
                                    border-bottom: none;
                                    font-size: 12px;
                                    .title {
                                        display: inline-block;
                                        width: 25%;
                                        height: 100%;
                                        line-height: 40px;
                                        border-right: 1px solid #bbbbbb;
                                        padding-left: 20px;
                                        vertical-align: top;
                                        color: #9C9C9C;
                                    }
                                    .titleInfor {
                                        vertical-align: top;
                                        display: inline-block;
                                        width: 74.5%;
                                        height: 100%;
                                        line-height: 40px;
                                        padding-left: 20px;
                                        position: relative;
                                        .el-input {
                                            display: inline-block;
                                            height: 100%;
                                            input {
                                                border: none;
                                                height: 28px !important;
                                                line-height: 27px!important;
                                            }
                                        }
                                        .el-select {
                                            width: 30%;
                                        }
                                        .el-radio__input {
                                            .el-radio__inner {
                                                border-color: #bfcbd9;
                                                background: none;
                                                border-radius: 0;
                                            }
                                        }
                                        .radio {
                                            .el-radio__input {
                                                .el-radio__inner {
                                                    border-color: #bfcbd9;
                                                    background: none;
                                                    border-radius: 0;
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
                                        .el-date-editor.el-input {
                                            width: 120px;
                                            .el-input__icon {
                                                left: 0;
                                            }
                                            .el-input__inner {
                                                padding: 0px 0px 0 30px;
                                            }
                                        }
                                    }
                                }
                                .infor_a:last-child{
                                    border-bottom: 1px solid #bbbbbb;
                                }
                                .infor_height {
                                    height: 80px;
                                    .titleInfor_a {
                                        position: relative;
                                        vertical-align: top;
                                        display: inline-block;
                                        width: 74.5%;
                                        height: 100%;
                                        padding-left: 20px;
                                        .title {
                                            line-height: 80px;
                                        }
                                        .titleInforBox {
                                            display: inline-block;
                                            width: 100px;
                                            height: 100%;
                                            text-align: center;
                                            vertical-align: top;
                                            .topText {
                                                width: 100%;
                                                display: inline-block;
                                                height: 30px;
                                                line-height: 30px;
                                            }
                                            .bottomText {
                                                width: 100%;
                                                height: 40px;
                                                line-height: 40px;
                                                .bottombox {
                                                    width: 80%;
                                                    height: 30px;
                                                    border: 1px solid #bbbbbb;
                                                    margin: 5px auto 0;
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
                        .fapiaoInfor_a {
                            margin-top: 20px;
                            .fapiao_a {
                                padding-right: 20px;
                            }
                            .fapiao_b {
                                padding-left: 20px;

                            }
                            .fapiaoFoot {
                                .hetongInfor {
                                    height: 25px;
                                    line-height: 25px;
                                    font-size: 12px;
                                    border-bottom: 1px solid #bbbbbb;
                                    .listStyle {
                                        width: 8px;
                                        height: 8px;
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
                                    width: 100%;
                                    margin-top: 10px;
                                    .infor_a {
                                        width: 100%;
                                        height: 25px;
                                        font-size: 12px;
                                        position: relative;
                                        .title {
                                            display: inline-block;
                                            width: 100px;
                                            height: 100%;
                                            line-height: 25px;
                                            padding-left: 20px;
                                            vertical-align: top;
                                            color: #9C9C9C;
                                        }
                                        .titleInfor {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 60%;
                                            height: 100%;
                                            line-height: 25px;
                                            padding-left: 20px;
                                            position: relative;
                                            .el-input {
                                                display: inline-block;
                                                height: 100%;
                                                input {
                                                    border: none;
                                                    height: 28px!important;
                                                    line-height: 27px!important;
                                                }
                                            }
                                            .el-select {
                                                width: 100%;
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
                                            .el-date-editor.el-input {
                                                width: 120px;
                                                .el-input__icon {
                                                    left: 0;
                                                }
                                                .el-input__inner {
                                                    padding: 0px 0px 0 30px;
                                                }
                                            }
                                        }
                                    }
                                    .infor_b {
                                        width: 100%;
                                        height: 120px;
                                        font-size: 12px;
                                        .title {
                                            display: inline-block;
                                            width: 100px;
                                            height: 100%;
                                            line-height: 40px;
                                            padding-left: 20px;
                                            vertical-align: top;
                                            color: #9C9C9C;
                                        }
                                        .el-textarea {
                                            display: inline-block;
                                            width: 70%;
                                            vertical-align: top;
                                            height: 100%;
                                            .el-textarea__inner {
                                                height: 100% !important;
                                            }
                                        }
                                    }
                                    .infor_height {
                                        height: 80px;
                                        .titleInfor_a {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 74.5%;
                                            height: 100%;
                                            padding-left: 20px;
                                            .title {
                                                line-height: 80px;
                                            }
                                            .titleInforBox {
                                                display: inline-block;
                                                width: 100px;
                                                height: 100%;
                                                text-align: center;
                                                vertical-align: top;
                                                .topText {
                                                    width: 100%;
                                                    display: inline-block;
                                                    height: 30px;
                                                    line-height: 30px;
                                                }
                                                .bottomText {
                                                    width: 100%;
                                                    height: 40px;
                                                    line-height: 40px;
                                                    .bottombox {
                                                        width: 80%;
                                                        height: 30px;
                                                        border: 1px solid #bbbbbb;
                                                        margin: 5px auto 0;
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
                        }
                        .foot_btn {
                            text-align: right;
                            margin-top: 20px;
                            padding-right: 3%;
                            button {
                                width: 80px;
                                height: 30px;
                                padding: 0;
                                line-height: 30px;
                                text-align: center;
                            }
                            .reset {
                                color: #54ADFF;
                                border: 1px solid #54ADFF;
                                background: none;
                            }
                        }
                    }
                }
            }
        }
        .important {
            position: absolute;
            left: 8px;
            font-size: 14px;
            color: red;
        }
    }

    @media screen and (max-width: 1730px) {
        .addhuikuanList {
            .addhuikuanBox {
                .hetongInforBox {
                    margin-top: 10px;
                    .hetongInfor {
                        .Infor_bottom {
                            .fapiaoInfor {
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
                            .fapiaoInfor_a {
                                .fapiaoFoot {
                                    .hetongInfor {
                                        height: 40px;
                                        line-height: 40px;
                                        font-size: 12px;
                                        border-bottom: 1px solid #e6e6e6;
                                        .listStyle {
                                            width: 8px;
                                            height: 8px;
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
                                            }
                                            .el-textarea {
                                                display: inline-block;
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
    @media screen and (max-width: 1280px) {
        .addhuikuanList {
            .addhuikuanBox {
                .hetongInforBox {
                    .el-col-16{
                        width: 80%;
                    }
                    .el-col-12 {
                        width:100%;
                    }
                     .hetongInfor .Infor_bottom .fapiaoInfor_a .fapiaoFoot .inputInfor .infor_b .el-textarea{
                        width: 80%!important;
                    }
                    .fapiaoInfor_a .fapiaoFoot .inputInfor .infor_a .titleInfor {
                        width: 80%!important;
                    }
                    .fapiao_b {
                        padding-left: 0px;
                    }
                }
            }
        }

    }
</style>
