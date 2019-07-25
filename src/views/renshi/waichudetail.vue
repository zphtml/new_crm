<template>
       <el-row style="" class="waichuInfor">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   外出列表>
               </span>
                我要外出
           </p>
           <el-col :span="24" style="margin-top:10px">
                   <el-col :lg="18">
                       <el-col :span="24" style="padding: 0">
                           <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                               <el-col :span="24" style="padding-left: 0">
                                   <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                   外出信息
                               </el-col>
                           </el-col>
                           <el-col :span="24" style="margin-top: 10px;padding: 0">
                               <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出公司
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出联系人
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出公司地址
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       外出时间
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                       外出事由
                                   </el-col>
                               </el-col>
                               <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input  size="mini" v-model="company" placeholder="请输入公司名称" ></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input  size="mini" v-model="name" placeholder="请输入联系人名称" ></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-input  size="mini" v-model="address" placeholder="请输入公司地址" ></el-input>
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-date-picker  size="mini" :clearable='false'
                                                        v-model="start"
                                                        type="datetime"
                                                        placeholder="选择日期">
                                       </el-date-picker>
                                       ~
                                       <el-date-picker  size="mini" :clearable='false'
                                                        v-model="end"
                                                        type="datetime"
                                                        placeholder="选择日期">
                                       </el-date-picker>

                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b;border-bottom: none">
                                       <el-input  size="mini" v-model="note" placeholder="请输入内容" ></el-input>
                                   </el-col>
                               </el-col>
                           </el-col>
                       </el-col>
                       <el-col :span="24">
                           <p style="font-size: 12px;color: #c4c4c4;margin-top: 10px;">
                                <el-col :span="1">注：</el-col>
                                <el-col :span="20">
                                    1、请严格遵守此系统提交申请单 <br>
                                    2、请假必须通过审核才算生效（交后为未审核状态） <br>
                                    3、外出请注意安全 <br>
                                </el-col>
                           </p>
                       </el-col>
                       <el-col :span="24" style="text-align: right">
                           <el-button type="primary" @click="submitForm">提交</el-button>
                           <el-button @click="resetForm">重置</el-button>
                       </el-col>
                   </el-col>

           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { waichu_addru} from '@/api/renshi';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit;
    export default {
      name: 'dashboard',
      data() {
        return {
          note:'',
          company:'',
          name:'',
          address:'',
          input:'',
          data:{},
          start:'',
          end:'',
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
          if(this.company==''){
            this.$message.error('公司名称不能为空');
          }else if(this.start=='' || this.end==''){
            this.$message.error('时间不能为空');
          }else if(this.name==''){
            this.$message.error('联系人不能为空');
          }else if(this.address==''){
            this.$message.error('联系地址不能为空');
          }else if(this.note==''){
            this.$message.error('事由不能为空');
          }else{
            let data={
              "submituser":this.user.id,
              "gongsi":this.company,
              "lianxiren":this.name,
              "dizhi":this.address,
              "starttime":moment(this.start).format('YYYY-MM-DD HH:mm:ss'),
              "endtime":moment(this.end).format('YYYY-MM-DD HH:mm:ss'),
              "shiyou":this.note
            }
            waichu_addru(data).then(response => {
                if(response.code == 200) {
                    this.$notify({
                        title: '提交成功',
                        message: '此页面将跳转到-外出列表',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function () {
                        _this.$router.push({name: 'goOut'});
                    }, 1000);
                }else{
                    this.$message.error('提交失败！');
                }
            }).catch(error => {

            });
          }

        },
        resetForm(){
          this.start='';
          this.end='';
          this.note='';
          this.company='';
          this.name='';
          this.address='';
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
    .waichuInfor {
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
