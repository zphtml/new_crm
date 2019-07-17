<template>
    <el-col :span="24" class="ct">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="14" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                媒介付款基本信息
            </el-col>
            <el-col :span="10" style="text-align: right;padding: 0">
                    <el-button type="primary"  @click="mj_fk" v-if="fkMoney_show" size="mini">编辑</el-button>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0">
            <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c">
                    付款类型
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c" v-if="item.mt_payment_type == 2">
                    付款日
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c" v-if="item.mt_payment_type == 2">
                    付款周期
                </el-col>
            </el-col>
            <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">
                <el-col :span="24" class="cusmessage" style="color: #222f3b">
                    <div v-if="item.mt_payment_type == 1">
                        预付
                    </div>
                    <div v-if="item.mt_payment_type == 2">
                        垫付
                    </div>
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b" v-if="item.mt_payment_type == 2">
                    {{item.dk_date | curr}}
                </el-col>
                <el-col :span="24" class="cusmessage" style="color: #222f3b" v-if="item.mt_payment_type == 2">
                    {{item.dk_zhouqi }}
                </el-col>

            </el-col>
        </el-col>
        <!--弹窗 媒介付款详情-->
        <el-dialog title="媒介付款详情" :visible.sync="addFormVisible"  class="tan_shiftTo" >
            <ul class="shiftTo"  v-for="(data,index) in formData" :key="index">
                <li>
                    <p  class="first_p">付款方式</p>
                    <p class="last_p">
                        <el-radio-group v-model="data.payment_type">
                            <el-radio   :label="1" >预付</el-radio>
                            <el-radio   :label="2" >垫付</el-radio>
                        </el-radio-group>
                    </p>
                </li>
                <li v-if="data.payment_type == 2">
                    <p class="first_p">周期</p>
                    <p class="last_p">
                        <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; position: absolute;left: 0px;padding-left:27px;outline: none;z-index:9"
                               type="number" v-model="data.dk_zhouqi"
                               name="mouse2"
                               placeholder="周期"
                               v-on:input="fk_zhouqi"
                               onmousewheel="return false;">
                        <span>
                            天
                        </span>
                    </p>
                </li>
                <li v-if="data.payment_type == 2">
                    <p class="first_p">付款日</p>
                    <p class="last_p">
                        <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; position: absolute;left: 0px;padding-left:27px;outline: none;z-index:9"
                               type="number" v-model="data.dk_date"
                               name="mouse2"
                               v-on:input="fk_day"
                               placeholder="付款日"
                               onmousewheel="return false;">
                        <span>
                            号（1-31号）
                        </span>
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer" style="text-align: center">
						<el-button type="primary" @click="pull_xh" >确 定</el-button>

			</span>
        </el-dialog>
    </el-col>
</template>
<script>

    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                input:"",
              radio: '2',
              quin:'',
                fkMoney_show:false,
                addFormVisible:false,
                formData:[{
                    accountid:'',
                    dk_zhouqi:1,
                    payment_type:1,
                    dk_date:1,
                }],
              affer:{
                submituser:"",
                contract_id:"",
                appname:"",
                server_type:"",
                promote_url:"",
                pingbidiyu:"",
                tel:"",
                prlin_id:"",
                fandian:"",
                qudao:"",
                state:"",
                a_users:"",
                a_password:"",
                note:"",
                appid:"",
                avid:""
              },
            }
        },
          filters: {
            curr:function (val) {
              if(val){
                return val
              }else{
                return '--'
              }
            },
          },
          watch:{
              item(){
                  let _this = this;
                  this.roles.filter(function(item){
                      if(item == "/api/meijie-contract/add-contract"){
                          _this.fkMoney_show = true;
                      }
                  });
              },
          },
          methods:{
          mj_fk(){
              this.addFormVisible = true;
          },
          pull_xh(){
          this.$emit('fk_inforClick', this.formData[0]);
            this.account = true;
            this.addFormVisible = false;
        },
              fk_zhouqi(){
                  if(Number(this.formData[0].dk_zhouqi)<1){
                      this.formData[0].dk_zhouqi = 1;
                  }
                  this.formData[0].dk_zhouqi =Math.round(this.formData[0].dk_zhouqi)
              },
              fk_day(){
                  if(Number(this.formData[0].dk_date)>31){
                      this.formData[0].dk_date = 31;
                  }else if(Number(this.formData[0].dk_date)<1){
                      this.formData[0].dk_date = 1;
                  }
                  this.formData[0].dk_date =Math.round(this.formData[0].dk_date)
              },
      },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        props: ['item' ,'account']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .ct{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .tan_shiftTo {
            .el-dialog {
                width:360px;
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }
                .el-dialog__body {
                    padding: 10px 20px;
                    .shiftTo {
                        margin:0;
                        padding:0;
                        list-style: none;
                        .el-date-editor.el-input {
                            width:150px;
                        }
                        p{
                            font-size: 12px;
                            display: inline-block;
                            margin:0;
                        }
                        li{
                            height: 30px;
                            .first_p {
                                width:90px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .last_p{
                                width:170px;
                                position: relative;
                                .el-select {
                                    height:30px;
                                    input{
                                        height: 30px !important;
                                        line-height: 30px!important;
                                    }
                                }
                            }
                            p{
                                .right_span{
                                    width:40px;
                                    height:25px;
                                    border-radius: 3px;
                                    background: #f0f2f5;
                                    text-align: center;
                                    line-height: 25px;
                                    font-size: 12px;
                                    display: inline-block;
                                    border:1px solid #bbbbbb;
                                    float: right;
                                    margin-top: 2.5px;
                                    cursor: pointer;
                                }
                                .tan_input,.yanqi {
                                    height:30px;
                                    width:100%;
                                    input{
                                        height: 30px!important;
                                        line-height:29px!important;
                                    }
                                    .el-input__icon {
                                        vertical-align: top;
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                    }

                }
                .dialog-footer {
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .el-input__icon {
                line-height: 20px!important;
            }
        }
    }

</style>
