<template>
    <div class="qd_dakuanForm ku_addBox" >
        <el-row class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpkehuList">客户列表</span>><span  @click="jumpAdvertisementList">广告主</span>><span>{{ name }}</span>
            </p>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  >
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">客户基本信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in formData" :key="index">
                        <div style="height: 30px;margin-bottom: 5px;" >
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    广告主名称
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="data.advertiser" v-on:input ="addchange"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    简称
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="data.advertiser_for_short" v-on:input ="addchange"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" >
                                    开户域名
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="data.url" v-on:input ="addchange"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    联系人
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="data.linkman" v-on:input ="addchange"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 30px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    联系电话
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <el-input v-model="data.tel" v-on:input ="addchange"></el-input>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
                </el-col>

            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box" v-for="(data,index) in formData" :key="index">
                    <el-col :span="24" class="topInfor"  >
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">开票信息</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        纳税人识别号
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.tax_identification"  :disabled="kaipiao_infor"  v-on:input ="addchange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        开户行
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.open_account"  :disabled="kaipiao_infor" v-on:input ="addchange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        地址
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.ticket_address"  :disabled="kaipiao_infor" v-on:input ="addchange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        账号
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.account" :disabled="kaipiao_infor" v-on:input ="addchange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        电话
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.kp_tel" :disabled="kaipiao_infor" v-on:input ="addchange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="foot_btn">
                        <el-button type="primary" @click="pullData" :disabled=pullshow>提交</el-button>
                        <el-button class="reset" @click="reset">重置</el-button>
                    </el-col>
                </el-col>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { customer_advertiser_addru,customer_advertiser_upadvertiser,customer_advertiser_info} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let appname = '';
    export default {
        data() {
            return {
                routeId:'',
                name:'',
                kaipiao_infor:false,
                formData:[
                    {
                        "advertiser":"",
                        "customer_id":"",
                        "advertiser_for_short":"",
                        "ctime":moment().format('YYYY-MM-DD'),
                        "linkman":"",
                        "tel":"",
                        "url":"",
                        "tax_identification":'',
                        "open_account":'',
                        "ticket_address":'',
                        "account":'',
                        "kp_tel":"",
                    }
                ],
                pullshow:true,
                customer_advertiser_info:function(){

                    customer_advertiser_info({
                        id: this.routeId,
                    }).then(response => {
                        this.formData = [
                            {
                                "advertiser":response.data.advertiser,
                                "customer_id":response.data.customer_id,
                                "advertiser_for_short":response.data.advertiser_for_short,
                                "ctime":response.data.ctime,
                                "linkman":response.data.linkman,
                                "tel":response.data.tel,
                                "url":response.data.url,
                                "tax_identification":response.data.tax_identification,
                                "open_account":response.data.open_account,
                                "ticket_address":response.data.ticket_address,
                                "account":response.data.account,
                                "kp_tel":response.data.kp_tel,
                            }
                        ];
                        if(this.$route.query.name == 2){
                            if(response.data.tax_identification){
                                let data = 'false';

                                this.roles.filter(function(item){
                                    if(item == "/api/customer/upcustomerinfo"){
                                        data = 'true';
                                    }
                                });
                                if(data == "true"){
                                    this.kaipiao_infor = false;
                                }else{
                                    this.kaipiao_infor = true;
                                }

                            }else{
                                this.kaipiao_infor = false;
                            }
                        }
                        this.showPllFun();
                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_upadvertiser(){
                    customer_advertiser_upadvertiser({
                        id: this.routeId,
                        data:this.formData[0],
                    }).then(response => {
                        if(response.code == 200){
                            this.$notify({
                                title: '提交成功',
                                message: '此页面将跳转到-广告主',
                                type: 'success'
                            });
                            let _this = this;
                            setTimeout(function(){
                                window.history.back();
                            }, 1000);
                        }else{
                            this.pullshow = false;
                            this.$message.error('提交失败！');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_addru:function(){
                    customer_advertiser_addru({
                        data:this.formData[0],
                    }).then(response => {
                        if(response.code == 200){
                            this.$notify({
                                title: '提交成功',
                                message: '此页面将跳转到-广告主',
                                type: 'success'
                            });
                            let _this = this;
                            setTimeout(function(){
                                _this.$router.push({ name: 'Advertiser' ,query: { id: _this.routeId,cp:1}});
                            }, 1000);
                        }else{
                            this.pullshow = false;
                            this.$message.error('提交失败！');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                showPllFun(){
                    if(  this.formData[0].advertiser !="" &&
                        this.formData[0].advertiser_for_short !="" &&
                        this.formData[0].linkman !="" &&
                        this.formData[0].tel !=""&&
                        this.formData[0].url !=""){
                        this.pullshow = false;
                    }else{
                        this.pullshow = true;
                    }
                },

            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            if(this.$route.query.name == 1){
                this.formData[0].customer_id =   this.routeId;
                this.name = "添加广告主";
            }else if(this.$route.query.name == 2){
                this.name = "修改广告主";
                this.customer_advertiser_info()
            }

        },
        methods: {
            addchange(){
                this.showPllFun();
            },
            pullData(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.pullshow = true;

                    if(this.$route.query.name == 1){
                        this.customer_advertiser_addru()
                    }else if(this.$route.query.name == 2){
                        this.customer_advertiser_upadvertiser()
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            reset(){
                this.formData = [
                    {
                        "advertiser":"",
                        "advertiser_for_short":"",
                        "ctime":moment().format('YYYY-MM-DD'),
                        "linkman":"",
                        "tel":"",
                        "url":"",
                        "tax_identification":'',
                        "open_account":'',
                        "ticket_address":'',
                        "account":'',
                        "kp_tel":"",
                    }
                ];
            },
//跳转
            jumpkehuList(){
                this.$router.push({ name: 'kehuliebiao' });
            },
            jumpAdvertisementList(){
                window.history.back();
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
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .qd_dakuanForm {
        .inputTextColor {
            .el-input-group__append {
                background:#f5f7f9 !important;
                color: black;
            }
        }
    }


    .qd_dakuanForm {
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
                            .dakuanTable {
                                 thead th,  thead th > .cell{
                                    background: white !important;
                                }
                            }
                            .infor_a {
                                padding:0 20px;
                                margin-top: 18px;
                                .el-select,.inputText {
                                    width:80%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                        font-size: 12px;
                                    }
                                }
                                .el-date-editor{
                                    width:50%;
                                    height:30px;
                                    input{
                                        height:29px!important;
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
                                                height:27px!important;
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
                        .vue-table{
                            border: 1px solid #bebbb5!important;
                            .el-table__empty-block {
                                height: 100px !important;
                                min-height: 100px !important;
                            }
                        }
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
        .qd_dakuanForm {
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
        .qd_dakuanForm {
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
        .qd_dakuanForm {
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
