<template>
    <el-col :span="24" class="order">
        <el-col :span="24" class="ct_InforBox" style="padding: 0;" >
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 下单信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData" >
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="color: rgb(102, 159, 228);font-size: 16px;font-weight: bold">
                                    付款方式
                                </el-col>
                                <el-col :span="20" class="input_search" style="color: rgb(102, 159, 228);font-size: 16px;font-weight: bold">
                                     <span v-if="data.payment_type == 1">
                                            预付
                                        </span>
                                    <span v-if="data.payment_type ==2">
                                        垫付
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    付款时间
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    {{data.payment_time  | cur}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    广告主
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <span v-if="data.cu_ad_info.guanggaozhu">
                                        {{data.cu_ad_info.guanggaozhu}}
                                    </span>
                                    <span v-else>
                                         ---
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    {{ $t('titles.nick') }}
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <span v-if="data.cu_ad_info.product">
                                        {{data.cu_ad_info.product}}
                                    </span>
                                    <span v-else>
                                         ---
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    服务类型
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <span v-if="data.account0.server_type == '130001'">
                                        优化服务+页面
                                    </span>
                                    <span v-if="data.account0.server_type == '130002'">
                                        页面
                                    </span>
                                    <span v-if="data.account0.server_type == '130003'">
                                        优化服务
                                    </span>
                                    <span v-if="data.account0.server_type == '130004'">
                                        无服务
                                    </span>
                                    <span v-if="data.account0.server_type == '130005'">
                                        监督
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    充值金额
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.ys_money | currency('')}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    应收金额
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.money | currency('')}}
                                    <span style="margin-left: 5%;font-size: 12px">
                                       现金  {{ $t('titles.fandian') }}: {{data.contractinfo.contract_fdinfo.xj_fandian | currency('')}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;font-size: 16px;color: black">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    账户币
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.show_money | currency('')}}
                                    <span style="margin-left: 5%;font-size: 12px">
                                       账户  {{ $t('titles.fandian') }}: {{data.contractinfo.contract_fdinfo.fandian | currency('')}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="data.contractinfo.mht">
                            <el-col :span="24"  class="infor_a" >
                                <el-col :span="4" class="title" >
                                    实付金额
                                </el-col>
                                <el-col :span="20" class="input_search" >
                                    计算公式:{{data.jisuangongshi}} | DB实付:{{data.xf_cost | matnum}}
                                </el-col>

                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"  v-else>
                            <el-col :span="24"  class="infor_a" >
                                <el-col :span="4" class="title" >
                                    <span style="color: red;">实付金额</span>
                                </el-col>
                                <el-col :span="20" class="input_search" style="color: red;">
                                   <span style="color: red;">0</span>
                                </el-col>
                            </el-col>
                        </div>
                        <div v-if="data.pay_day">
                            <div style="height: 23px;margin-bottom: 5px;" >
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        预计还款期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        {{data.pay_day}}
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    客户URL
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <a :href="data.xiadan.url" target="_blank">
                                       <span v-if="data.xiadan">{{data.xiadan.url}}</span>
                                    </a>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title">
                                    开户性质
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    <span v-if="data.xiadan">{{data.xiadan.xingzhi}}</span>
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
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                inforData:[],
            }
        },
          filters: {
              cur: function (value) {
                  return moment(value*1000).format('YYYY-MM-DD')
              },
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
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
    .order{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .redColor {
            color: red;
        }
    }

</style>
