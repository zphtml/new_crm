<template>
    <el-col :span="24" class="accountmessage">
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
                <el-col :span="24" class="topInfor">
                    <div class="titleInfor" style="position: relative">
                        <span class="listStyle"></span>
                        <span class="listText">开票基本信息</span>
                        <div  style="position:absolute;right: 0;top: 0;">
                            <el-button type="primary" style="width: 81px;" @click="visible">编辑
                            </el-button>
                        </div>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title">
                                    广告主名称
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                        {{data.guanggaozhu | fun}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    {{ $t('titles.nick') }}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                     {{data.appname}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    公司
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                     {{data.advertiser0.advertiser}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    开票主体
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                       {{data.agenCompany.companyname}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    税目
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                     {{data.fptype.name}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    类型
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                      <span v-if="data.type2 == 1">专票</span>
                                      <span v-if="data.type2 == 2">普票</span>
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    收支类型
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                   {{data.shouzhi | shouzhi}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    提交人
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                  {{data.submituser0.name}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title"  style="font-size: 16px;color:#669fe4;font-weight: 600">
                                    开票金额
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 16px;color:#669fe4;font-weight: 600">
                                    {{data.money | currency('')}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    开票日期
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                    {{data.kp_time | cur}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    发票号
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                        {{data.fp_on}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>

        </el-col>
    </el-col>
</template>
<script>
  import {mapGetters} from 'vuex';
  import moment from "moment"
  export default {
    data() {
      return {
        input: "",
        account: true,
        inforData:[],
      }
    },
    filters: {
      current: function (value) {
        if (value == '' || value == null) {
          return '--'
        } else {
          return value
        }
      },
        fun(val){
          if(val){
              return val.advertiser
          }else{
              return '---'
          }

        },
      shouzhi: function (value) {
        if (value == 1) {
          return '开出'
        } else if (value ==2){
          return '收到'
        }
      },
      matnum:function (str){
        if(str) {
          var newStr = "";
          var count = 0;

          if(str.indexOf(".")==-1){
            for(var i=str.length-1;i>=0;i--){
              if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
              }else{
                newStr = str.charAt(i) + newStr;
              }
              count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
          }else{
            for(var i = str.indexOf(".")-1;i>=0;i--){
              if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
              }else{
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
              }
              count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
          }
          return str;
        }else{
          return 0;
        }

      },
      cur: function (value) {
          if(value){
              return moment(value*1000).format('YYYY-MM-DD')
          }else{
              return "---"
          }

      },
    },
    watch: {
        item(val){
            this.inforData = [];
            this.inforData.push(val);
      },
    },
    methods: {
      visible(){
        this.$emit('visible','1' );
      }
    },
    computed: {
      ...mapGetters([
        'user',
      ])
    },
    created() {

    },
    props: ['item']
  }
</script>
<style rel="stylesheet/scss" lang="scss">
    .accountmessage {
        .cusmessage {
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #737373;
        }
        .el-select .el-input {
            width: 110px;
        }
        .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 180px;
        }

        .el-input__inner {
            height: 24px !important;
            line-height: 24px !important;
        }
        .el-input-group {
            width: 250px;
        }

        .el-button--primary {
            /*margin-left: 14px;*/
            font-size: 12px;
            width: 43px;
            height: 23px;
            color: #fff;
            background-color: #20a0ff;
            border-color: #20a0ff;
        }
        .el-button--default {
            font-size: 12px;
            width: 43px;
            height: 23px;
        }
        .el-button {
            padding: 0;
        }
        .el-button--text {
            margin-left: 8px;
            border: none;
            color: #000;
            background: 0 0;
            font-size: 12px;
            padding-left: 0;
            padding-right: 0;
        }

    }

</style>
