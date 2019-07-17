<template>
    <el-row style="height: 100%;width: 100%; position: absolute;" class="loginweixinBox" :class="{lodinImg:lodinImg}">
        <div v-if="lodinImg">
            <figure style="position: absolute;right: 0;left: 0;top: 0;bottom: 0;margin: auto;z-index: 999">
                <div class="dot white"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </figure>
        </div>
        <el-row style="margin:50px 0; "  v-if="!lodinImg">
            <el-col :span="24" style="text-align: center">
                <img src="http://test.myushan.com/ZPCRMlogo_1.png" alt="" style="width: 300px;">
            </el-col>
            <el-col :span="24">
                <el-col :span="24">
                    <div class="login1" style="margin: 10px auto;">
                        <div style="padding: 0 15px">
                            <el-form id="login-form" autoComplete="on" :model="loginForm"  ref="loginForm" :rules="loginRules">
                                <el-form-item prop="username">

                                    <el-col :span="24" class="el-input" style="margin-top: 20px;">
                                        <el-input type="text" name="username"  v-model="loginForm.username" autoComplete="on" class="username" placeholder="登录名/邮箱"/>
                                    </el-col>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-col :span="24" style="margin-top: 10px;">
                                        <el-input type="password"  name="password" class="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码" />
                                    </el-col>
                                </el-form-item>
                                <div style="padding-top: 30px;text-align: center">
                                    <el-button type="primary" class="load" style="padding: 12px 80px" @click="handleLogin">
                                        绑定
                                    </el-button>
                                </div>
                                <a @click="back" style="font-size: 12px;color: blue;margin-top: 20px;display: block;text-align: center">返回首页</a>
                            </el-form>
                        </div>
                    </div>
                </el-col>
            </el-col>
        </el-row>

    </el-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import { wxlogin } from '@/api/login';
    import { auditaction } from '@/api/kehu';
    export default {
        name: 'login',
        data() {
            const validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                code:'',
                access_token:'',
                refresh_token:'',
                lodinImg:true,
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    password: [
                        { required: true, trigger: 'blur', validator: validatePass }
                    ]
                },
//微信获取code
                wxlogin(){
                    wxlogin({
                        code:this.code
                    }).then(res => {

                        if(res.data == 'false'){
                            this.access_token  = res.access_token;
                            this.refresh_token  = res.refresh_token;
                            this.lodinImg = false;
                        }else{
                            this.weixinLogin(res).then(() => {
                                this.$router.push({ name: 'homePage' });
                                this.auditaction();
                                this.searchData({
                                    none:''
                                });

                            }).catch(() => {
                                this.$notify.error({
                                    title: '错误',
                                    message: '无该账户'
                                });
                            });
                        }

                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
                auditaction:function(){

                    auditaction({
                    }).then(response => {

                        this.audit_action(response)
                    }). catch(() => {this.$message.error('获取失败');});
                },
            }
        },
        mounted(){
            var href = window.location.href;
           let newCode =  href.substring(window.location.href.indexOf('?code='),window.location.href.indexOf('&state='));
            this.code = newCode.substring(6);
            this.wxlogin()
        },
        methods: {
            ...mapActions([
                'LoginByEmail',
                'weixinLogin',
                'searchData',
                'audit_action',
            ]),
            handleLogin() {
                this.loading = true;
                let _this = this;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        _this.loginForm.access_token = this.access_token;
                        _this.loginForm.refresh_token = this.refresh_token;
                        _this.LoginByEmail(_this.loginForm).then(response => {
                            if(response == 'true'){
                                this.$router.push({ name: 'homePage' });
                                this.auditaction();
                                this.searchData({
                                    none:''
                                });
                                window.location.reload();
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
            back(){
                history.back(-1)
            },
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .loginweixinBox{
        width:100%;
        height:100%;
        background-position: center;
        background-size: cover;
        min-height:730px ;
        position: relative;
        overflow:hidden;
        .user,.pwd{
            margin-left: 20px;
            border: 0;
            /*border-bottom: 1px solid rgb(0,175,233);*/
            border-bottom: 1px solid rgb(153,153,153);
        }
        .login1{
            width: 290px;
            height: 286px;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0px 0px 6px #d9d9d9;
            .login1_header {
                height: 40px;
                display: flex;
                .btn{
                    width:50%;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                }
                .active_btn {
                    background: -webkit-linear-gradient(#01b8ee, #3299e5);
                    color: white;
                }
            }
        }



    }
/*--------------------------------------*/
    .lodinImg{
        background: white;
    }
    figure {
        position: absolute;
        margin: auto;
        top: 0; bottom: 0; left: 0; right: 0;
        width: 6.250em; height: 6.250em;
        animation: rotate 2.4s linear infinite;
    }
    .white {
        top: 0; bottom: 0; left: 0; right: 0;
        background: white;
        animation: flash 2.4s linear infinite;
        opacity: 0;
    }
    .dot {
        position: absolute;
        margin: auto;
        width: 2.4em; height: 2.4em;
        border-radius: 100%;
        transition: all 1s ease;
    }
    .dot:nth-child(2) { top: 0; bottom: 0; left: 0; background: #FF4444; animation: dotsY 2.4s linear infinite; }
    .dot:nth-child(3) { left: 0; right: 0; top: 0; background: #FFBB33; animation: dotsX 2.4s linear infinite; }
    .dot:nth-child(4) { top: 0; bottom: 0; right: 0; background: #99CC00; animation: dotsY 2.4s linear infinite; }
    .dot:nth-child(5) { left: 0; right: 0; bottom: 0; background: #33B5E5; animation: dotsX 2.4s linear infinite; }

    @keyframes rotate {
        0% { transform: rotate( 0 ); }
        10% { width: 6.250em; height: 6.250em; }
        66% { width: 2.4em; height: 2.4em; }
        100%{ transform: rotate(360deg); width: 6.250em; height: 6.250em; }
    }

    @keyframes dotsY {
        66% { opacity: .1; width: 2.4em; }
        77%{ opacity: 1; width: 0; }
    }
    @keyframes dotsX {
        66% { opacity: .1; height: 2.4em;}
        77%{ opacity: 1; height: 0; }
    }

    @keyframes flash {
        33% { opacity: 0; border-radius: 0%; }
        55%{ opacity: .6; border-radius: 100%; }
        66%{ opacity: 0; }
    }

</style>
