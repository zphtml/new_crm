<template>
    <div class="addhetongList" >
        <el-row class="addhetongBox kebaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpMeitiList">媒体列表</span>><span>添加媒体</span>
            </p>

            <el-col :span="24" class="xiadanInforBox" >
                <el-col :span="24"  class="xiadanInfor">
                    <el-col :span="24" class="Infor_top">
                        <el-col :span="12" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">客户基本信息 &nbsp;&nbsp;( <i style="color: red;font-size: 14px">*</i> 为必填项,不能为空)</span>
                            </div>
                            <el-col :span="24" class="Infor_top"  >
                                <el-col :span="12">
                                    <div class="inputInfor" v-for="(data,index) in formData">
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i> {{ $t('titles.customer') }}</span>
                                            <el-input v-model="data.advertiser" size="mini" class="inputNum"  placeholder="请输入内容"   v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"><i class="important">*</i> 所属省</span>
                                                <el-select size="mini" v-model="data.city" filterable placeholder="请选择">
                                                    <el-option
                                                            v-for="(item,index) in cityoption"
                                                            :key="item.name"
                                                            :label="item.name"
                                                            :value="item.name">
                                                    </el-option>
                                                </el-select>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"><i class="important">*</i>公司地址</span>
                                           <el-input v-model="data.site" size="mini" class="inputNum"  placeholder="请输入内容"   v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"><span class="important">*</span>邮寄地址</span>
                                           <el-input v-model="data.post_site" size="mini" class="inputNum" placeholder="请输入内容"   v-on:input="inputTetx"></el-input>
                                        </div>
                                    </div>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="12" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">联系人信息 &nbsp;&nbsp;( <i style="color: red;font-size: 14px">*</i> 为必填项,不能为空)</span>
                            </div>
                            <el-col :span="24" class="Infor_top" >
                                <el-col :span="12">
                                    <div class="inputInfor">
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>联系人</span>
                                            <el-input v-model="name " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>

                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>邮箱</span>
                                            <el-input v-model="email " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>职位</span>
                                            <el-input v-model="position " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> 联系电话</span>
                                            <el-input v-model="tel " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx_a"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">微信/QQ</span>
                                            <el-input v-model="qq " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx_a"></el-input>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="20">
                                    <p style="margin-top: 20px;text-align: right;color: rgb(196, 196, 196);">
                                        注： 联系电话和微信/QQ可任选一项
                                    </p>
                                </el-col>
                            </el-col>
                            <el-col :span="18" class="foot_btn">
                                <el-button type="primary" @click="pullData" :disabled=disabledPull>提交</el-button>
                                <el-button class="reset" @click="reset">重置</el-button>
                            </el-col>
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
    import { addcontacts } from '@/api/kehu';
    import { meijie_customer_addru } from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    let keyData = 1;

    export default {
        data() {
            return {
                tagShow:false,
                tags:[
                    { name: '客户',
                        type: 'primary'
                    }
                ],
                'email':'',
                'name':'',
                'position':'',
                'qq':'',
                'tel':''	,
                'weixin':'',
                'customer_id':'',
                showName:"",
                formData:[{
                    "advertiser":"",
                    "customer_type":'3',
                    "type":'1',
                    "city":"北京市",
                    "site":"",
                    "post_site":"",//邮件地址
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
                tan(data) {
                    this.$confirm('提交后不可更改，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.meijie_customer_addru(this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
                meijie_customer_addru:function(data){
                    meijie_customer_addru({
                        data:data
                    }).then(response => {
                        if(response.code == 200){
                            this.customer_id =response.data.id;
                          let form = {
                              'email':this.email,
                              'name':this.name,
                              'position':this.position,
                              'qq':this.qq,
                              'tel':this.tel	,
                              'weixin':this.weixin,
                              'customer_id':this.customer_id,
                          }
                          this.addcontacts(form);
                            let _this = this;
                            setTimeout(function(){
                                _this.$router.push({ name: 'MediaList' });
                            }, 1000);
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                addcontacts(data){
                    addcontacts(data).then(response => {
                        this.$message({
                            message: '添加媒体成功',
                            type: 'success'
                        });
                        this.$notify({
                            title: '上传成功',
                            message: '此页面将跳转到-媒体列表',
                            type: 'success'
                        });
                    }). catch(err => {this.$message.error('获取失败');});
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
            this.formData[0].submituser = this.user.id;

        },
        methods: {
//跳转
            jumpMeitiList(){
                this.$router.push({ name: 'MediaList' });
            },
            inputTetx_a(){
                if(this.tel !="" || this.qq !="" ){
                    this.showName = 1;
                    this.inputTetx();

                }else{
                    this.showName = "";
                    this.inputTetx()
                }
            },
            inputTetx(){
                if(  this.formData[0].advertiser != ""&&
                    this.formData[0].site != ""&&
                    this.formData[0].post_site  != ""&&
                    this.name !="" && this.email !="" && this.position !="" && this.showName !="" ){
                    this.disabledPull = false;
                }else{
                    this.disabledPull = true;
                }
            },
            pullData(){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                let phone = /^1[3|4|5|6|7|8][0-9]{9}$/;
                if(!reg.test(this.email)){
                    this.$message({
                        message: '请输入正确邮箱',
                        type: 'warning'
                    });
                }else if(this.tel !=""){
                    if(!phone.test(this.tel)){
                        this.$message({
                            message: '请输入正确手机号',
                            type: 'warning'
                        });
                    }else{
                        this.tan()
                    }
                }else{
                    this.tan()
                }



            },
            reset(){
                this.formData[0].post_site = "";
                this.formData[0].site = '';
                this.formData[0].advertiser = '';
                this.form.email  = "" ;
                this.name  = "";
                this.qq  = "";
                this.tel  = "";
                this.position  = "";

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
        .kebaoBox {
            .xiadanInforBox {
                margin-top: 10px;
                .xiadanInfor{
                    .Infor_top {
                        margin-bottom: 20px;
                    }
                    .hetongInfor {
                        height:30px;
                        line-height: 30px;
                        font-size: 12px;
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
                                margin-top: 10px;
                                min-width: 460px;
                                .el-select,.el-date-editor,.inputNum {
                                    width:60%;
                                }
                                .el-textarea {
                                    width:60%;
                                    .el-textarea {
                                        height: 60px;
                                    }
                                }
                                .title{
                                    width: 95px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    text-align: right;
                                    margin-right: 20px;
                                    color: #9C9C9C;
                                    position: relative;
                                    .important {
                                        position: absolute;
                                        color: red;
                                        font-size: 20px;
                                        left: 0px;
                                        top: 0;
                                        bottom: 0;
                                        margin: auto;
                                        display: inline-block;
                                    }
                                }
                                .title_top{
                                    width: 70px;
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
                margin-top: 150px;
                min-width: 460px;
                padding-right: 14%;
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
