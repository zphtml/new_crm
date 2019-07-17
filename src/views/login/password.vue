<template>
    <el-col :span="14" class="setUpRighrPassword Password">
        <p class="crm_title">
            <i class="crm_line"></i>
             <span style="font-size: 14px;color: #222F3B;">修改密码</span>
        </p>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="90px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label=""  style="margin: 0;">
                    <p class="text_infor">*密码不能少于6位</p>
                </el-form-item>

                <el-form-item label="确认密码" prop="newpassword">
                    <el-input type="password" v-model="ruleForm2.newpassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item style=" text-align: right;">
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
                <!--<pullImg :Upload = Upload  @postImg= postImg ></pullImg>-->
            </el-form>

    </el-col>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { uppassword } from '@/api/login'
    import pullImg from '@/components/Upload/Upload'
    let imgKey = '';
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(value.length<6){
                        callback(new Error('密码不能少于6位'))
                    }else{
                        if (this.ruleForm2.newpassword !== '') {
                            this.$refs.ruleForm2.validateField('newpassword');
                        }

                    }

                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    password: '',
                    pass: '',
                    newpassword: '',

                },
                rules2: {
                    password: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    newpassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],

                },
                open() {
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.uppassword();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                },
                uppassword:function(){
                    uppassword({
                        id:this.user.id,
                        data:this.ruleForm2
                    }).then(response =>{
                        if(response.code == 200){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                        localStorage.setItem('CRM-User', JSON.stringify(response.data));
                        window.location.reload()
                        }else{
                            this.$message.error('错误，'+response.msg);
                        }
                    }).catch(err=>{});
                },
            };
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        components: {
            pullImg,
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        this.open()
                    } else {

                        return false;
                    }
                });
            },
            postImg(val){
                imgKey = val;

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .setUpRighrPassword{
        padding-left: 20px;
        vertical-align: top;
        .demo-ruleForm {
            margin-top: 20px;
            .el-form-item {
                margin-bottom: 20px;
                .el-form-item__label {
                    font-size: 12px;
                    color: #7D7D7D;
                }
                .text_infor {
                    font-size: 12px;
                    color: #7D7D7D;
                }
            }
        }
    }
</style>
