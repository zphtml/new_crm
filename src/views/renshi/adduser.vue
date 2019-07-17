<template>
       <el-row style="" class="addUser">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   用户列表>
               </span>
                新建账号
           </p>
           <el-col :span="24" style="margin-top:10px">
                   <el-col :lg="14">
                       <el-col :span="24" style="padding: 0">
                           <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                               <el-col :span="24" style="padding-left: 0">
                                   <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                   新建用户
                               </el-col>
                           </el-col>
                           <el-col :span="24" style="margin-top: 10px;padding: 0">
                               <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       部门
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       用户名
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       密码
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       重复密码
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       姓名
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       手机号
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       邮箱
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       工作时间
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       入职时间
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                       员工属性
                                   </el-col>
                               </el-col>
                               <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       &nbsp; &nbsp;&nbsp;{{ this.$route.query.role }}
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini" v-model="users" placeholder="请输入内容" ></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini" v-model="password" placeholder="请输入内容" type="password"></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini" v-model="repassword" placeholder="请输入内容"  type="password"></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini" v-model="name" placeholder="请输入内容"></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini" v-model="tel" placeholder="请输入内容"></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input size="mini"  v-model="email" placeholder="请输入内容"></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-date-picker  size="mini" :clearable='false'
                                                        v-model="stime"
                                                        type="date"
                                                        placeholder="选择日期">
                                       </el-date-picker>
                                   </el-col>
                                   <el-col :span="24"  class="cusmessage" style="color: #222f3b">
                                       <el-date-picker  size="mini" :clearable='false'
                                                        v-model="etime"
                                                        type="date"
                                                        placeholder="选择日期">
                                       </el-date-picker>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage radio" style="color: #222f3b;border-bottom: none">
                                       <el-radio class="radio" v-model="radio" label="1">正式员工</el-radio>
                                       <el-radio class="radio" v-model="radio" label="0">试用员工</el-radio>
                                   </el-col>
                               </el-col>
                           </el-col>
                       </el-col>
                       <el-col :span="24" style="text-align: right;margin-top: 10px">
                           <el-button type="primary" @click="submitForm"  :loading="loadingPull">提交</el-button>
                           <el-button @click="resetForm">重置</el-button>
                       </el-col>
                   </el-col>
           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { addusers} from '@/api/renshi';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit;
    export default {
      name: 'dashboard',
      data() {
        return {
          users:'',
          password:'',
          repassword:'',
          name:'',
          tel:'',
          email:'',
          stime:'',
          etime:'',
          radio:'0',
            loadingPull:false,
            tan() {
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingPull = true;
                    let data={
                        "username":this.users,
                        "name":this.name,
                        "email":this.email,
                        "password":this.password,
                        "phone":this.tel,
                        "istrue":this.radio,
                        "jobtime":moment(this.stime).format('YYYY-MM-DD'),
                        "intime":moment(this.etime).format('YYYY-MM-DD'),
                        "role": this.$route.query.basic_role,
                        "bumen":this.$route.query.bumen,
                    };
                    addusers(data).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        }else{
                            if(response.email && response.username){
                                this.$message.error(response.email[0]+response.username[0]);
                            }else if(response.email){
                                this.$message.error(response.email[0]);
                            }else if(response.username){
                                this.$message.error(response.username[0]);
                            }

                        }
                        this.loadingPull = false;
                    }).catch(error => {
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            }
        }
      },
      computed: {
        ...mapGetters([
          'user',
          'roles'
        ])
      },
      methods: {
        newcontact(val){
          this.enclo[val].showImg=true;
        },
        huitui(){
          this.$router.go(-1)
        },
        submitForm(){
          let tel=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
          let pass=/^[\w]{6,12}$/;
          let email=/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
          if(this.users=='' && this.users.length<2){
            this.$message.error('用户名长度大于2');
          }else if(this.stime==''){
            this.$message.error('工作时间不能为空');
          }else if(this.etime==''){
            this.$message.error('入职时间不能为空');
          }else if(this.name==''){
            this.$message.error('姓名不能为空');
          }else if(!(tel.test(this.tel))){
            this.$message.error('手机号格式不对');
          }else if(!(email.test(this.email))){
            this.$message.error('非正式邮箱');
          }else if(!(pass.test(this.password))){
            this.$message.error('密码格式为6-12位，只能是字母、数字和下划线');
          }else if(this.password != this.repassword){
            this.$message.error('重复密码与密码不符');
          }else{
              this.tan()
          }
        },
        resetForm(){
          this.users='';
          this.name='';
          this.password='';
          this.repassword='';
          this.tel='';
          this.email='';
          this.stime='';
          this.etime='';
        },
      },
      watch: {
        id: function (val) {
        },
      },
      created() {



      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    .addUser {
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid rgb(230,230,230);
            .el-input__inner {
                border:none;
            }
        }
    }

</style>
