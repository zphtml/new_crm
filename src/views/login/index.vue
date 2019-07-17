<template>
    <div class="kehuaccountList" >
        <el-row class="loginHeader">
            <el-row :span="24" class="headerImg">
                <img src="http://test.myushan.com/ZPCRMlogo_1.png" alt="经纬">
            </el-row>
        </el-row>
        <el-row class="login">
            <img src="http://test.myushan.com/ZPCRMBackground.jpg" style="position: absolute;width: 100%;height: 100%;z-index: -1" alt="">
            <div class="loginBox">

                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
                    <!--<img src="../../assets/Base.png" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 0" alt="">-->
                    <div class="loginBOx_header">
                        <div class="btn left_btn" @click="show_login('账户登录')"  :class="{btn_active:login_active}">
                            <a href="javascript:;" @click="show_login('账户登录')">账户登录</a>
                        </div>
                        <div class="btn right_btn"  @click="show_login('扫码登录')" :class="{btn_active:!login_active}" >
                            <a href="javascript:;" @click="show_login('扫码登录')" >扫码登录</a>
                        </div>
                    </div>
                    <div class="accountNum" v-show="login_active">
                        <el-form-item prop="account" style=" margin-bottom: 20px;">
                            <el-input type="text" class="textInput" v-model="ruleForm2.username" auto-complete="off" placeholder="账号" @change="accountInput"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass" style=" margin-bottom:15px;">
                            <el-input type="password" class="textInput" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
                        </el-form-item>
                        <div class="raido">
                            <el-checkbox v-model="ruleForm2.checked" checked  class="remember">记住密码</el-checkbox>
                            <!--<span class="forgotPassword">忘记密码 &nbsp;?</span>-->
                        </div>
                        <el-form-item style="width:100%;">
                            <el-button type="primary" style="width:100%;" class="loginPull" @click.native.prevent="handleSubmit2" @keyup="handleSubmit2" :loading="logining">立刻登录</el-button>
                        </el-form-item>
                    </div>
                    <div class="weixin" v-show="!login_active">
                        <div id="wxId"></div>
                    </div>
                </el-form>
            </div>
            <div class="foot">
                <p>
                    ©北京谋士网络科技有限公司版权所有
                </p>
                <p>
                    &nbsp;
                </p>
            </div>
        </el-row>

    </div>
</template>


<script>
    import {mapActions } from 'vuex';
    import { auditaction } from '@/api/kehu';
    require('./js/wxLogin.js')
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                logining: false,
                login_active:true,
                ruleForm2: {
                    username:'',
                    password: '',
                    checked:true,
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                auditaction:function(){

                    auditaction({
                    }).then(response => {

                        this.audit_action(response)
                    }). catch(() => {this.$message.error('获取失败');});
                },
            };
        },
        mounted(){
            if(JSON.parse(localStorage.getItem('accountNumber'))){
                this.ruleForm2.username = JSON.parse(localStorage.getItem('accountNumber')).username;
                this.ruleForm2.password = JSON.parse(localStorage.getItem('accountNumber')).password;
            }else{
                this.ruleForm2.username = '';
                this.ruleForm2.password = '';
            }
            new WxLogin({
                self_redirect:false,
                id:"wxId",
                appid: "wxadee3ea20ad3233a",
                scope: "snsapi_login",
                redirect_uri: "http%3a%2f%2fc.lzad.cc%2f%23%2fwechat_login",
                style: "black",
                href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9'
            });
        },
        created(){
            let component = this;
            document.onkeydown = function(e){
              if(e.which == '13'){
                  component.handleSubmit2();
              }
            }
    },
        methods: {
            ...mapActions([
                'LoginByEmail',
                'audit_action',
                'searchData',
            ]),
            show_login(val){
                val=='账户登录'?this.login_active = true:this.login_active = false;
            },
            accountInput(){
                if(this.ruleForm2.username == ""){
                    this.ruleForm2.password = '';
                }
            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2() {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        _this.LoginByEmail(_this.ruleForm2).then(response => {
                            if(response == 'true'){
                                this.$router.push({ name: 'homePage' });
                                this.auditaction();
                                this.searchData({
                                    none:''
                                });
                                // window.location.reload();
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: '账户或密码错误'
                                });
                            }
                        });

                    } else {
                        return false;
                    }

                });
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">


    html,body{
        width:100%;
        height:100%;
        #app,.kehuaccountList {
            width:100%;
            height:100%;
            .loginHeader{
                position: relative;
                height: 20%;
                .headerImg {
                    height: 100%;
                    img{
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        margin: auto;
                    }
                }
            }

            .login{
                width:100%;
                height:80%;
                background-size: 100% 100%;
                overflow: hidden;
                .loginBox {
                    width:470px;
                    margin: 20px auto 0;
                    background: url("../../assets/Base.png") ;
                    background-size: 100% 100%;
                    .login-container {
                        background-clip: padding-box;
                        width: 100%;
                        position: relative;
                        padding:27px 50px;

                        .loginBOx_header {
                            height: 40px;
                            line-height: 40px;
                            margin-bottom: 10px;
                            .btn{
                                float: left;
                                width: 50%;
                                text-align: center;
                                cursor: pointer;
                            }
                            .btn:hover{
                                color: #109cc5;
                            }
                            .left_btn {
                                border-right: 1px solid #7f8184;
                                box-sizing: border-box;
                            }
                            .btn_active {
                                color: #109cc5;
                                font-weight: bold;

                            }
                        }
                        .accountNum {
                            padding-top: 25px;
                            .raido {
                                height:24px;
                                line-height: 24px;
                                .remember {
                                    .el-checkbox__inner {
                                        width:20px;
                                        height:20px;
                                        border-radius: 50%;
                                        background: none;
                                        border: 1px solid #d6d4cf;
                                    }
                                    .el-checkbox__label {
                                        font-weight: normal;
                                        font-size: 12px;
                                    }
                                    .el-checkbox__inner::after{
                                        width:7px;
                                        height:7px;
                                        background:#0dc8f5 ;
                                        border:1px solid #10a3cd;
                                        border-radius: 50%;
                                        left: 4.6px;
                                        top: 4.6px;
                                    }
                                }
                                .forgotPassword {
                                    float: right;
                                    font-size: 12px;
                                    cursor: pointer;
                                }
                            }
                            .loginPull {
                                height:47px;
                                color: white;
                                font-size: 14px;
                                border:1px solid #109cc5;
                                margin-top: 13px;
                            }
                        }
                        .weixin {
                            width: 100%;
                           padding-left: 30px;
                        }

                    }
                }

            }
            .foot {
                position: absolute;
                bottom:0;
                left:0;
                right:0;
                margin: auto;
                text-align: center;
                font-size: 12px;
                p:first-child{
                    margin-bottom: 0px;
                }
                p:last-child{
                    color: #87051D;
                    margin-top: 5px;
                }
            }
        }

    }


    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
