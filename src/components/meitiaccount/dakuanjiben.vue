<template>
    <el-col :span="24" class="contractmessage">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                打款基本信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;background:rgb(249, 248, 247) " v-for="(data,index) in inforData" :key="index">
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">{{ $t('titles.advertiser') }}</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                            {{data.advertiser0 | curr1}}
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">APP名称</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                        {{data.appname  | curr}}
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">打款主体</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                     {{data.bcompany  | zhuti}}
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">打款类型</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;" v-if="data.ftype == 1 ">
                     实时付
                    </span>
                    <span style="display: inline-block;height: 30px;line-height: 30px;" v-if="data.ftype == 2 ">
                      周期付
                    </span>
                    <span style="display: inline-block;height: 30px;line-height: 30px;" v-if="data.type == 3 ">
                      保证金
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">提交人</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                    {{data.submituser0 | cur }}
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">打款金额</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                       {{data.b_money | currency('')}}
                    </span>
                </el-col>


            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">打款日期</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                          {{data.b_time | time }}
                    </span>
                </el-col>


            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">汇款人</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                          {{data.huikuanren | curr }}
                    </span>
                </el-col>

            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">收款人</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                           {{data.shoukuanren | curr }}
                    </span>
                </el-col>



            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">收款开户行</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                        {{data.kaihuhang | curr }}
                    </span>
                </el-col>


            </el-col>
            <el-col :span="24">
                <el-col :span="4" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;color: #9c9c9c;">收款账号</span>
                </el-col>
                <el-col :span="20" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                         {{data.zhanghu | curr }}
                    </span>
                </el-col>
            </el-col>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                account:true,
                inforData:[],
            }
        },
          filters: {
            curr1: function (value) {
              if (value == '' || value == null) {
                return '--'
              } else {
                return value.advertiser
              }
            },
            zhuti: function (value) {
              if (value == '' || value == null) {
                return '--'
              } else {
                return value.companyname
              }
            },
            current: function (value) {
              if(value==1){
                return '普通合同'
              }else{
                return '框架合同'
              }
            },
            curr:function (val) {
              if(val){
                return val
              }else{
                return '--'
              }
            },
            cur: function (value) {
              if(value){
                return value.name
              }else{
                return '--'
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
            time: function (value) {
              return moment(value*1000).format('YYYY-MM-DD')
            },
          },
          watch:{
              item(val){
               this.inforData = [];
               this.inforData.push(val);
            },
          },
        methods:{
          set(){
            this.$emit('newcontact', [this.item1,this.contact]);
          },
          del(val){
            this.$emit('del', [val,this.item1.id]);
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
<style rel="stylesheet/scss"  lang="scss">
    .contractmessage{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
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
        .el-button--default{
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
