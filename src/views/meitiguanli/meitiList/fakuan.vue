<template>
    <div class="bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpht_list">执行框架列表</span>><span @click="jump_ht_infor">合同详情</span>><span>罚款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-罚款</span>
            </el-col>
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor" >
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">罚款信息</span>
                        </div>
                        <div class="titleBox" >
                            <div style="width: 60%;display: inline-block;vertical-align: top">
                                <div  v-for="(data,index) in formData" :key="index">
                                    <div style="height: 30px;margin-bottom: 10px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title" >
                                                罚款金额
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                                <el-input class="inputText" placeholder="罚款金额" v-model="data.money" v-on:input="inputTetx" type="number">
                                                    <template slot="append">元</template>
                                                </el-input>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title">
                                                罚款日期
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                                <el-date-picker  :clearable='false'
                                                                 v-model="data.payment_time"
                                                                 type="date"
                                                                 placeholder="选择日期">
                                                </el-date-picker>
                                            </el-col>
                                        </el-col>
                                    </div>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="5" class="title">
                                            附件信息
                                        </el-col>
                                        <el-col :span="19" class="input_search">
                                            <el-upload
                                                    ref="upload"
                                                    list-type="picture"
                                                    name="File[imageFiles][]"
                                                    action="/api/file/addfile"
                                                    :on-success="handleAvatarSuccess"
                                                    :on-change="handleChange"
                                                    :on-remove = 'removeChange'
                                                    :data="dataObj"
                                                    :auto-upload="false"
                                                    multiple>
                                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button> <span v-if="textShow" style="font-size: 12px;color: #9c9c9c;">未选择任何文件</span>
                                            </el-upload>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>
                            <div style="width: 39%;display: inline-block;vertical-align: top;margin-left: -10px"  v-for="(data,index) in formData" :key="index">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="10" class="title">
                                            罚款原因 <span style="color: red">（必填）</span>
                                        </el-col>
                                        <el-col :span="14" class="input_search">
                                            <el-input
                                                    v-on:input="inputTetx"
                                                    type="textarea"
                                                    :rows="4"
                                                    placeholder="请输入内容"
                                                    v-model="data.note">
                                            </el-input>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>


                        </div>
                    </el-col>


                    <el-col :span="24" class="fujianInfor">
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
    import { meijie_add_fakuan,meijie_add_fakuan_ru } from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                account:'',
                textShow:true,
                agent_company:'',
                disabledPull:true,
                dataInfor:[],
                accountOptions:[],
                meijie_add_fakuan:function(){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let dataId = decodeURI(ref[0].split('=')[1]);
                    meijie_add_fakuan({
                        id:dataId,
                    }).then(response => {
                        this.accountOptions = response.accountlist;
                        this.dataInfor.push(response.contract_info);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].xf_contractid = response.contract_info.id;
                        this.formData[0].advertiser = response.contract_info.advertiser;
                  }). catch(err => {this.$message.error('获取失败');});
                },
                formData:[
                    {
                        "advertiser":"",//公司id
                        "xf_contractid":" ",//合同id
                        "submituser":" ",//提交人id
                        "money":"",//罚款金额
                        'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                        "note":""
                    }
                ],
                companyOptions:[],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1007,
                },
                judge(){
                    if( this.formData[0].money != "" && this.formData[0].note != ""  ){
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
                        this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                        this.meijie_add_fakuan_ru(this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
                meijie_add_fakuan_ru:function(data){
                    meijie_add_fakuan_ru({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 1007;
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
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--合同详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'mediaviewcontract', query: { id: _this.routeId}});
                    }, 500);
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
            this.routeId = this.$route.query.id;
            this.meijie_add_fakuan();
        },
        methods: {
            inputTetx(){
                this.judge()
            },
            //提交
            pullData(){
                let  data = '提交后不可更改，是否继续?'
                this.tan(data)
            },
            handleChange(file, fileList) {
                this.textShow = false;
            },
            removeChange(fileList,file){
                if(file.length == 0){
                    this.textShow = true;
                }else{
                    this.textShow = false;
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
                this.formData[0].payment_time  = moment().format('YYYY-MM-DD');
                this.formData[0].money  = '';
                this.formData[0].note  = '';
                this.$refs.upload.clearFiles();
            },
//跳转
            jumpht_list(){
                this.$router.push({ name: 'MediaProtocolList' });
            },
            jump_ht_infor(){
                this.$router.push({ name: 'mediaviewcontract', query: { id:this.routeId}});
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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .bukuanForm {
        .bukuanBox{
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
            .bukuanInforBox {
                margin-top: 10px;
                .bukuanInfor{
                    min-width: 760px;
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
                                .el-select,.inputNum {
                                    width:80%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                        line-height:29px!important;
                                    }
                                }
                                .el-date-editor{
                                    width:50%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                        line-height:29px!important;
                                    }
                                }
                                .el-textarea {
                                    width:80%;
                                    .el-textarea {
                                        height: 60px;
                                    }
                                }
                                .title{
                                    width: auto;
                                    margin-right: 3%;
                                    display: inline-block;
                                    vertical-align: middle;
                                    position: relative;
                                }
                                .title_top{
                                    width: auto;
                                    margin-right: 3%;
                                    display: inline-block;
                                    vertical-align: top;
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
                                            width:80%;
                                            margin:0 auto;
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
                    border: 1px solid #54ADFF;
                }
            }
        }
        .important {
            position: absolute;
            left:-10px;
            font-size: 14px;
            color: red;
        }
    }
    @media screen and (max-width: 1280px) {
        .bukuanForm {
            .bukuanBox {
                .bukuanInforBox {
                    .bukuanInfor {
                        width:85%;
                        .xufeiInfor {
                            width: 100%;
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:85%;
                }
            }
        }
    }
    @media screen and (max-width: 1100px) {
        .bukuanForm {
            .bukuanBox {
                .bukuanInforBox {
                    .bukuanInfor{
                        width:95%;
                        .xufeiInfor {
                            width: 100%;
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
</style>
