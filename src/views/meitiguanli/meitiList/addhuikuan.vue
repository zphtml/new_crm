<template>
    <div class="addhuikuanList ku_addBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">媒体列表</span>><span @click="jumpConsole">客户控制台</span>><span>添加媒体回款</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser }}-回款详情</span>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">回款基本信息</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        回款金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" v-model="data.b_money" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        回款主体
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="b_company" filterable placeholder="请选择" @change="changeb_company">
                                            <el-option
                                                    v-for="(item,key) in b_companyOptions"
                                                    :key="item.companyname"
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
                                        回款日期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-date-picker  :clearable='false'
                                                         @change="judgeData"
                                                         v-model="data.b_time"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        回款人
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.huikuanren" placeholder="请输入内容"></el-input>
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
                            <el-button type="primary" :disabled=disabledPull @click="pullData">提交</el-button>
                            <el-button  type="primary" class="reset" @click="rever">重置</el-button>
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
    import {addhuikuanru,add_huikuan} from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                dataInfor:[],
                textarea: '',
                formData: [{
                    "advertiser": "",
                    "submituser": "",
                    "b_money": "",
                    "b_company": "",
                    "appname": "",
                    "b_time":  moment().format('YYYY-MM-DD'),
                    "huikuanren": "",
                    "note": ""
                }],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':3,
                },
                b_company:'',
                b_companyOptions:[],
                //账户信息
                add_huikuan:function(val){
                    add_huikuan({
                        id:val,
                    }).then(response => {
                        this.b_companyOptions.push(response.agentCompany);
                        this.b_companyOptions =  this.b_companyOptions[0];
                        this.dataInfor.push(response.customer);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].advertiser = response.customer.id;
                        this.formData[0].appname = response.customer.appname;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,

                //上传
                addhuikuanru:function(val){
                    addhuikuanru({
                        data:val
                    }).then(response => {
                        if(response.code == '200'){
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 3;
                            let _this = this;
                            this.$refs.upload.submit();
                            _this.success();
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
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
                        _this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
                    }, 500);
                },
                judge(){
                    if( this.formData[0].b_money != ""&& this.formData[0].b_company != ""&& this.formData[0].b_time != "" ){
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
                        this.formData[0].b_time = moment(this.formData[0].b_time).format('YYYY-MM-DD');
                        this.addhuikuanru(this.formData[0])
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
                'user'
            ])
        },
        watch: {
            user: function (newValue) {

            },
        },
        mounted(){
            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.add_huikuan(decodeURI(ref[0].split('=')[1]));

    },
        methods: {
            changeb_company(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].b_company = this.b_companyOptions[index].id;
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
//跳转
            jumpCustomerList(){
                this.$router.push({ name: 'MediaList' });
            },
            jumpConsole(){
                this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
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
                    return val
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
                        .xufeiInfor {
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
                                        height: 28px;
                                        line-height: 40px;
                                        padding-left: 20px;
                                        position: relative;
                                        .el-input {
                                            display: inline-block;
                                            height: 100%;
                                            input {
                                                border: none;
                                                height: 28px !important;
                                                line-height: 27px;
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
                        .xufeiInfor_a {
                            .xufei_a {
                                padding-right: 20px;
                            }
                            .xufei_b {
                                padding-left: 20px;

                            }
                            .xufeiFoot {
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
                                        font-size: 12px;
                                        position: relative;
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
                                            width: 74%;
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
                                                    line-height: 27px;
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
                                        height: 70px;
                                        font-size: 12px;
                                        .title {
                                            display: inline-block;
                                            width: 25%;
                                            height: 100%;
                                            line-height: 40px;
                                            padding-left: 20px;
                                            vertical-align: top;
                                            color: #9C9C9C;
                                        }
                                        .upload-demo {
                                            width: 74.3%;
                                            display: inline-block;
                                            height:100%;
                                            line-height: 70px;
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
                                        .el-textarea {
                                            display: inline-block;
                                            width: 74.3%;
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
                            .xufeiInfor_a {
                                .xufeiFoot {
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
</style>
