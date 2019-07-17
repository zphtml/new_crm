<template>
    <div class="addhetongList" >
        <el-row class="addhetongBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客保系统</span>><span>补全客户信息</span>
            </p>
            <el-col :span="24" class="consoleTitle" >
                <span class="corporateName">{{ advertiser }}-补全客户信息</span>
            </el-col>
            <el-col :span="24" class="hetongInforBox" >
                <el-col :span="24"  class="hetongInfor">
                    <el-col :span="16" class="Infor_bottom">
                        <el-col :span="24" class="xufeiInfor" v-for="(data,index) in formData"    :key="index">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">客户基本信息(&nbsp;<i style="color: red;">*</i>&nbsp;为必填项)</span>
                            </div>
                            <div class="inputInfor">
                                <div class="infor_a">
                                    <div class="title">{{ $t('titles.customer') }}</div>
                                    <div class="titleInfor">{{ data.advertiser }}</div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">{{ $t('titles.advertiser') }}</div>
                                    <div class="titleInfor">{{ data.true_advertiser }}</div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">产品名称</div>
                                    <div class="titleInfor">{{ data.appname }}</div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">公司官网</div>
                                    <div class="titleInfor">
                                        <a :href="data.website" target="view_window" ><span style="color:rgb(84, 173, 255);">{{ data.website | fileF }}</span></a>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">公司地址</div>
                                    <div class="titleInfor">
                                        {{ data.site | fileF}}
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title">所属行业</div>
                                    <div class="titleInfor">
                                        {{ data.industry | fileF}}
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title"><span class="important">*</span>客户类型</div>
                                    <div class="titleInfor">
                                        <el-radio-group v-model="customer_type " class="radio" @change="customer_change">
                                            <el-radio :label="1">直客</el-radio>
                                            <el-radio :label="2">渠道</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title"><span class="important">*</span>客户所属省份</div>
                                    <div class="titleInfor">
                                        <el-select v-model="data.city" placeholder="请选择">
                                            <el-option
                                                    v-for="(item,index) in cityoption"
                                                    :key="item.name"
                                                    :label="item.name"
                                                    :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="infor_a">
                                    <div class="title"><span class="important">*</span>邮寄地址</div>
                                    <div class="titleInfor"><el-input v-model="data.post_site" class="inputMap" placeholder="请输入内容"  v-on:input="judgeInput"></el-input></div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button class="reset" @click="reset">重置</el-button>
                            <el-button type="primary" @click="jumpNext" :disabled=disabledPull>提交</el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { customerbsInfor,customer_addru } from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let keyData = 1;

    export default {
        data() {
            return {
                advertiser:'',
                tagShow:false,
                tags:[
                    { name: '客户',
                      type: 'primary'
                    }
                ],
                form: {
                    names: [{
                        email:	'',
                        name:	'',
                        position:'',
                        qq:	'',
                        tel:''	,
                        weixin:'',
                        customer_id:'',
                    }]
                },
                customerbsInfor(){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let id = decodeURI(ref[0].split('=')[1]);
                    customerbsInfor({
                        id:id,
                    }).then(response => {
                        this.advertiser = response.advertiser;
                        this.formData[0].advertiser = response.advertiser;
                        this.formData[0].appname = response.appname;
                        this.formData[0].website = response.website;
                        this.formData[0].site = response.site;
                        this.formData[0].industry = response.industry;
                        this.formData[0].type = response.type;

                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_addru:function(){
                    customer_addru({
                        data:this.formData[0],
                    }).then(response => {
                        if(response.code == "200"){
                            this.$notify({
                                title: '成功',
                                message:'此页面将跳转到-客户列表',
                                type: 'success'
                            });
                            this.$router.push({ name: 'kehuliebiao' });
                        }else{
                            this.disabledPull = false;
                        }

                    }).catch(err => {
                        this.disabledPull = false;
                    });
                },
                customer_type:1,
                formData:[{
                    "advertiser":"",
                    "type":"",
                    "industry":"",
                    "website":"",
                    "appname":"",
                    "city":"北京市",
                    "site":"",
                    "post_site":"",
                    "customer_type":1,
                    "tax_identification":"", //纳税人识别号
                    "ticket_address":"",//开票地址
                    "open_account":"",//开户行
                    "account":"",//账号
                    "kp_tel":"",//电话
                    "kbid":'', // 客保ID
                    "submituser":'',
                }],
                cityoption:[
                    {
                        name:' 北京市'
                    },
                    {
                        name:'天津市'
                    },
                    {
                        name:'上海市'
                    },
                    {
                        name:'重庆市'
                    },
                    {
                        name:'河北省'
                    },
                    {
                        name:'河南省'
                    },
                    {
                        name:'云南省'
                    },
                    {
                        name:'辽宁省'  },
                    {
                        name:'黑龙江省'   },
                    {
                        name:'湖南省 '  },
                    {
                        name:'安徽省 '  },
                    {
                        name:'山东省 '  },
                    {
                        name:'新疆维吾尔'   },
                    {
                        name:'江苏省'   },
                    {
                        name:'浙江省 '  },
                    {
                        name:'江西省'   },
                    {
                        name:'湖北省'  },
                    {
                        name:'广西壮族'   },
                    {
                        name:'甘肃省 '  },
                    {
                        name:'山西省 '  },
                    {
                        name:'内蒙古 '  },
                    {
                        name:'陕西省'   },
                    {
                        name:'吉林省' },
                    {
                        name:'福建省'  },
                    {
                        name:'贵州省'  },
                    {
                        name:'广东省'   },
                    {
                        name:'青海省'   },
                    {
                        name:'西藏'  },
                    {
                        name:'四川省'   },
                    {
                        name:'宁夏回族'   },
                    {
                        name:'海南省'   },
                    {
                        name:'台湾省'  },
                    {
                        name:'香港特别行政区'  },
                    {
                        name:'澳门特别行政区'
                    }
                    ],
                judge(){
                    if( this.formData[0].post_site != ""){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                disabledPull:true,
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
            let url=location.href.split('?')[1];
            let ref=url.split('&');
            let Kehuid = decodeURI(ref[0].split('=')[1]);
            this.customerbsInfor();
            this.formData[0].kbid = Kehuid;
            this.formData[0].submituser = this.user.id;
        },
        methods: {
            customer_change(index){
                this.formData[0].customer_type = index;
            },
//跳转
            jumpCustomerList(){
                this.$router.push({ name: 'CustomerSupportSystem' });
            },
            jumpNext(){
                this.$confirm('确认提交，将不可恢复, 是否继续?','提示' , {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disabledPull = true;
                    this.customer_addru();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消新建'
                    });
                });

            },
            judgeInput(){
                this.judge();
            },
            reset(){
                this.formData[0].post_site = "";
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },
            fileFun(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileF(val){
                if(val){
                    return val
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
    .addhetongList {
        .addhetongBox{
            .important {
                position: absolute;
                left:8px;
                font-size: 14px;
                color: red;
            }
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
                                    border: 1px solid #bbbbbb;
                                    font-size: 12px;
                                    border-bottom: none;
                                    .title {
                                        display: inline-block;
                                        width: 25%;
                                        height:100%;
                                        line-height: 40px;
                                        border-right:1px solid #bbbbbb;
                                        padding-left:20px ;
                                        vertical-align: top;
                                        color:#9C9C9C,
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
                                                height:28px!important;
                                                line-height: 27px!important;
                                            }
                                        }
                                        .el-select {
                                            width:30%!important;
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
                                            font-weight: normal;
                                            font-size: 12px;
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
                                .infor_a:last-child{
                                    border-bottom: 1px solid #bbbbbb;
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
                                            color:#9C9C9C;
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
                                                    border: 1px solid #bbbbbb;
                                                    margin:5px auto 0;
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
                                    position: relative;
                                    .add {
                                        display: inline-block;
                                        width:60px;
                                        height:20px;
                                        line-height: 20px;
                                        text-align: center;
                                        border: 1px solid #222F3B;
                                        border-radius: 5px;
                                        position: absolute;
                                        right:0;
                                        top:0;
                                        bottom: 0;
                                        margin:auto;
                                        cursor: pointer;
                                    }
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
                                    max-height:200px;
                                    overflow: hidden;
                                    .infor_a {
                                        width:100%;
                                        height:40px;
                                        border: 1px solid #bbbbbb;
                                        font-size: 12px;
                                        position: relative;
                                        border-bottom: none;
                                        .title {
                                            display: inline-block;
                                            width: 25%;
                                            height:100%;
                                            line-height: 40px;
                                            border-right:1px solid #bbbbbb;
                                            padding-left:20px ;
                                            vertical-align: top;
                                            color: #9C9C9C;
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
                                                    height:28px!important;
                                                    line-height: 27px!important;

                                                }
                                            }
                                            .el-select {
                                                width:30%;
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
                                    .infor_a:last-child{
                                        border-bottom: 1px solid #bbbbbb;
                                    }
                                    .infor_b {
                                        width:100%;
                                        height:120px;
                                        border: 1px solid #bbbbbb;
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
                                                        border: 1px solid #bbbbbb;
                                                        margin:5px auto 0;
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
            }
        }
    }
    @media screen and (max-width: 1380px) {
        .addhetongList {
            .addhetongBox{
                .hetongInforBox {
                    margin-top: 10px;
                    .el-col-16{
                        width: 80%;
                    }

                }
            }
        }
    }
    @media screen and (max-width: 1150px) {
        .addhetongList {
            .addhetongBox{
                .hetongInforBox {
                    margin-top: 10px;
                    .el-col-16, .el-col-12 {
                        width: 100%;
                    }

                }
            }
        }
    }
</style>
