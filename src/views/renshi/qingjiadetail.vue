<template>
       <el-row style="" class="replenishment1">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   请假列表>
               </span>
                我要请假
           </p>
           <el-col :span="24" style="margin-top:10px">
                   <el-col :lg="14">
                       <el-col :span="24" style="padding: 0">
                           <el-col :span="24" style="height: 30px;line-height: 30px;border-bottom: 1px solid #e6e6e6;color: #222f3b;font-size: 12px;padding: 0">
                               <el-col :span="24" style="padding-left: 0">
                                   <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                                   请假信息
                               </el-col>
                           </el-col>
                           <el-col :span="24" style="margin-top: 10px;padding: 0">
                               <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       请假类型
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       请假时间
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                                       请假天数
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                       请假事由
                                   </el-col>
                               </el-col>
                               <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-select v-model="slei" placeholder="请选择" filterable>
                                           <el-option
                                                   v-for="(item,key) in leixing"
                                                   :key="item.label"
                                                   :label="item.label"
                                                   :value="item.id">
                                           </el-option>
                                       </el-select>

                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b">
                                       <el-date-picker  :clearable='false'
                                                        v-model="start"
                                                        type="date"
                                                        placeholder="选择日期">
                                       </el-date-picker>
                                       ~
                                       <el-date-picker  :clearable='false'
                                                        v-model="end"
                                                        type="date"
                                                        placeholder="选择日期">
                                       </el-date-picker>

                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b;position: relative">
                                       <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 36px;top: 4px;width: 200px;outline: none;z-index:9"
                                              type="number" v-model="date"
                                              placeholder="*如果请假半天请输入0.5"
                                              onmousewheel="return false;">
                                   </el-col>
                                   <el-col :span="24" class="cusmessage" style="color: #222f3b;border-bottom: none">
                                       <el-input v-model="note" placeholder="请输入内容" ></el-input>
                                   </el-col>
                               </el-col>
                           </el-col>
                       </el-col>
                       <el-col :span="24">
                           <p style="font-size: 12px;color: #222f3b;margin-top: 10px;">
                               剩余年假天数：{{user.nianjia}}
                               &nbsp;
                               &nbsp;
                               (每年3月1日会清除前一年剩余年假)
                           </p>
                           <p style="font-size: 12px;color: #c4c4c4;margin-top: 10px;">
                                <el-col :span="1">注：</el-col>
                                <el-col :span="20">
                                    1、病假需出具医院证明 <br>
                                    2、请假必须通过审核才算生效（提交后为未审核状态） <br>
                                    3、提交后不可更改 <br>
                                </el-col>
                           </p>
                       </el-col>
                       <el-col :span="24" style="text-align: right">
                           <el-button style="padding: 8px 20px" type="primary"  @click="submitForm">提交</el-button>
                           <el-button style="padding: 8px 20px" @click="resetForm">重置</el-button>
                       </el-col>
                   </el-col>

           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { qingjia_addru} from '@/api/renshi';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit;
    export default {
      name: 'dashboard',
      data() {
        return {
          slei:'',
          note:'',
          leixing:[
            {
              label:'事假',
              id:'事假'
            },
            {
              label:'病假',
              id:'病假'
            },
            {
              label:'婚假',
              id:'婚假'
            },
            {
              label:'丧假',
              id:'丧假'
            },
            {
              label:'公假',
              id:'公假'
            },
            {
              label:'年假',
              id:'年假'
            },
            {
              label:'工伤',
              id:'工伤'
            },
            {
              label:'产假',
              id:'产假'
            },
            {
              label:'护理假',
              id:'护理假'
            },
            {
              label:'其他',
              id:'其他'
            },

          ],
          star:3,
          input:'',
          current:{},
          data:{},
          date:'',
          id:"",
          start:'',
          end:'',
            tan:function(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data={
                        "submituser":this.user.id,
                        "type":this.slei,
                        "starttime":moment(this.start).format('YYYY-MM-DD'),
                        "endtime":moment(this.end).format('YYYY-MM-DD'),
                        "day":this.date,
                        "shiyou":this.note
                    }
                    qingjia_addru(data).then(response => {
                        if(response.code == 200){
                            this.$notify({
                                title: '提交成功',
                                message: '此页面将跳转到-请假列表',
                                type: 'success'
                            });
                            let _this = this;
                            setTimeout(function(){
                                _this.$router.push({ name: 'leave' });
                            }, 1000);
                        }else{
                            this.$message.error('提交失败！');
                        }
                    }).catch(error => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
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
            if(this.slei==''){
            this.$message.error('类型不能为空');
          }else if(this.start=='' || this.end==''){
            this.$message.error('时间不能为空');
          }else if(this.date=='' || this.date==0){
            this.$message.error('天数大于0');
          }else if(this.note==''){
            this.$message.error('事由不能为空');
          }else if(this.slei == "年假"){
              if(Number(this.user.nianjia)<Number(this.date)){
                  this.$message.error('请假天数不得大于年假天数！');
              }else{
                this.tan()
              }
            }else{
                this.tan()



          }

        },
        resetForm(){
          this.slei='';
          this.start='';
          this.end='';
          this.date='';
          this.note='';
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
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .replenishment1 {
        .el-date-editor.el-input {
            width: 120px;
            .el-input__icon {
                left:-5px;
                line-height: 0;
            }
            .el-input__inner {
                padding: 0px 0px 0 30px;
            }
        }
        .el-select .el-input {
            width: 200px;
        }

        .el-input-group {
            width: 200px;
        }
        .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 200px;
            input {
                border: none;
                height: 100% !important;
            }
        }

        .el-input__inner {
            height: 24px !important;
            line-height: 24px !important;
        }

        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid rgb(230,230,230);
        }
    }

</style>
