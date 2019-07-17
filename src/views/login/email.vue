<template>
    <el-col :span="14" class="setUpRighrPassword Password">
        <p class="crm_title">
            <i class="crm_line"></i>
             <span style="font-size: 14px;color: #222F3B;">账号绑定</span>
        </p>
            <el-form :model="user" :rules="rules2" ref="user" label-width="90px" class="demo-ruleForm">
                <el-form-item label="邮箱账号" prop="email">
                    <span v-if="account">
                        {{item1.email}}
                        <svg class="icon" aria-hidden="true" style="width: 18px;color: #54adff" @click="account=false">
                          <use xlink:href="#icon-xiugai"></use>
                        </svg>
                    </span>
                    <el-input type="text" v-model="user.email" auto-complete="off" v-if="!account"></el-input>
                    <!--<svg class="icon" aria-hidden="true" style="color: #54adff" v-if="!account" @click="account=true">
                        <use xlink:href="#icon-cha"></use>
                    </svg>-->
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <span v-if="account1">
                        {{item1.phone}}
                        <svg class="icon" aria-hidden="true" style="width: 18px;color: #54adff" @click="account1=false">
                          <use xlink:href="#icon-xiugai"></use>
                        </svg>
                    </span>
                    <el-input type="text" v-model="user.phone" auto-complete="off" v-if="!account1"></el-input>
                    <!--<svg class="icon" aria-hidden="true" style="color: #54adff" v-if="!account1" @click="account1=true">
                        <use xlink:href="#icon-cha"></use>
                    </svg>-->

                </el-form-item>
                <el-form-item style=" text-align: right;">
                    <el-button type="primary" @click="submitForm('user')">提交</el-button>
                    <el-button @click="resetForm('user')">重置</el-button>
                </el-form-item>
            </el-form>

    </el-col>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { uppassword ,upusersinfo} from '@/api/login'
    export default {
        data() {

            var validatePass = (rule, value, callback) => {
              if(!(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(value))){
                callback(new Error('请输入正确的电话号码'));
              }else{
                callback();
              }
            };
            return {
              account:true,
              account1:true,
                ruleForm2: {
                    email: '',
                    tel: '',

                },
                rules2: {
                  phone: [
                       { required: true, message: '请输入电话', trigger: 'blur' },
                       { validator: validatePass, trigger: 'blur,change' },

                    ],
                    email: [
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
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

                  upusersinfo(this.user.id,{phone:this.user.phone,email:this.user.email}).then(response => {
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
                  }).catch(error => {
                      this.$message.error(error);
                  });

                },
            };
        },
        computed: {
            ...mapGetters([
                'user',
            ]),
          item1: function () {
            var obj={};
            obj=JSON.parse(JSON.stringify(this.user));
            return obj

          }
        },
        mounted(){

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

            resetForm() {
                window.location.reload()
            }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
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
