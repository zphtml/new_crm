<template>
    <el-col :span="24" class="order">
        <el-col :span="24" class="ct_InforBox" style="padding: 0;"  >
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 充值信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData" >
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="color: rgb(102, 159, 228);font-size: 16px;font-weight: bold">
                                    付款方式
                                </el-col>
                                <el-col :span="20" class="input_search" style="color: rgb(102, 159, 228);font-size: 16px;font-weight: bold" v-if="!data.relevance_id">
                                     <span v-if="data.payment_type == 1">
                                            预付
                                        </span>
                                    <span v-if="data.payment_type ==2">
                                        垫付
                                    </span>
                                </el-col>
                                <el-col :span="20" class="input_search" style="color: rgb(102, 159, 228);font-size: 16px;font-weight: bold" v-else>
                                    <span>退款充值</span>
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
                                    账户名称
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    {{data.account0.a_users}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="fk_type=== 0">
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
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="fk_type=== 0">
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
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="fk_type=== 0">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 14px;color: black">
                                    {{$t('titles.fandian')}}类型
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 14px;color: black">
                                    <div v-if="data.contractinfo.fd_type == 1">
                                        账户{{$t('titles.fandian')}}
                                    </div>
                                    <div v-if="data.contractinfo.fd_type == 2" >
                                        现金{{$t('titles.fandian')}}
                                    </div>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    充值金额
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.ys_money}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="fk_type=== 0">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    应收金额
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.money | currency('')}}
                                    <span style="margin-left: 5%;font-size: 12px">
                                       现金  {{ $t('titles.fandian') }}:  {{data.contractinfo.contract_fdinfo.xj_fandian | currency('')}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"  v-if="fk_type=== 1">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    应收金额
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.money | currency('')}}
                                    <span style="margin-left: 5%">
                                         {{ $t('titles.fandian') }}: {{data.rebates_proportion | currency('')}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;font-size: 16px;color: black"  v-if="fk_type=== 1">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="4" class="title" style="font-size: 16px;color: black">
                                    媒体报价
                                </el-col>
                                <el-col :span="20" class="input_search" style="font-size: 16px;color: black">
                                    {{data.show_money | currency('')}}
                                </el-col>
                            </el-col>
                        </div>
                        <div  v-if="fk_type=== 1">
                            <div style="height: 23px;margin-bottom: 5px;" v-if="1 == inforTrue ">
                                <el-col :span="24"  class="infor_a" v-if="item.contractinfo.mht">
                                    <el-col :span="4" class="title" >
                                        媒体实付
                                    </el-col>
                                    <el-col :span="20" class="input_search" >
                                        计算公式:{{ item.show_money }}/(1+{{ item.contractinfo.mht.rebates_proportion}}%)*(1-{{ item.contractinfo.mht.dl_fandian  }}%) =   {{Number(item.show_money) / (1+Number(item.contractinfo.mht.rebates_proportion)/100) *(1-Number(item.contractinfo.mht.dl_fandian)/100) | currency('')}} | DB实付:{{item.xf_cost | currency('')}}
                                    </el-col>
                                </el-col>
                                <el-col :span="24"  class="infor_a" v-else>
                                    <el-col :span="4" class="title" >
                                         <span style="color: red">媒体实付</span>
                                    </el-col>
                                    <el-col :span="20" class="input_search" >
                                        <span style="color: red">---</span>
                                    </el-col>
                                </el-col>
                            </div>

                        </div>
                        <div style="height: 23px;margin-bottom: 5px;font-size: 16px;color: black" >
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
                        <div  v-if="fk_type=== 0">
                            <div style="height: 23px;margin-bottom: 5px;" v-if="1 == inforTrue ">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        实付金额
                                    </el-col>
                                    <el-col :span="20" class="input_search" v-if="item.contractinfo.mht">
                                        计算公式:{{ item.show_money }}/
                                        (1+{{ item.contractinfo.mht.rebates_proportion}}%)
                                        *(1-{{ item.contractinfo.mht.dl_fandian  }}%) =
                                        {{Number(item.show_money) /
                                    (1+Number(item.contractinfo.mht.rebates_proportion)/100)
                                    *(1-Number(item.contractinfo.mht.dl_fandian)/100) | currency('')}} | DB实付:{{item.xf_cost | currency('')}}
                                    </el-col>
                                    <el-col :span="20" v-else>
                                        ---
                                    </el-col>
                                </el-col>
                            </div>
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
                                    提交人
                                </el-col>
                                <el-col :span="20" class="input_search">
                                    {{data.submituser0.name}}
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="ct_left_box" style="padding: 0;" v-if="fk_type=== 1">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">分期详情</span>
                    </div>
                </el-col>
                <el-col :span="24" style="background: #f9f8f7">
                    <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;">
                        <el-col :span="24" style="padding-left: 0">
                            <el-col :span="24">
                                同批次充值：
                                金额总计：{{item.picimoney_sum | currency('')}}
                                &nbsp;
                                &nbsp;
                                媒体报价总计：{{item.picishowmoney_sum | currency('')}}
                            </el-col>
                        </el-col>
                    </el-col>
                    <el-col :span="24" style="padding: 0">
                        <el-col :lg="3" style="border: 1px solid #e6e6e6;padding: 0;">
                            <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                分期
                            </el-col>
                        </el-col>
                        <el-col :lg="21" style="border: 1px solid #e6e6e6;padding: 0">
                            <el-col :lg="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                    金额
                                </el-col>
                            </el-col>
                            <el-col :lg="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                    媒体报价
                                </el-col>
                            </el-col>
                            <el-col :lg="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                    充值日期
                                </el-col>
                            </el-col>
                            <el-col :lg="6" style="padding: 0">
                                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                    BD实付
                                </el-col>

                            </el-col>
                        </el-col>
                    </el-col>
                    <template v-for="(i,key) in item.picilist">
                        <el-col :span="24" style="padding: 0;border-top: none">
                            <el-col :span="3" style="border: 1px solid #e6e6e6;padding: 0;border-top: none">
                                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                    第{{key+1}}期
                                </el-col>
                            </el-col>
                            <el-col :span="21" style="border: 1px solid #e6e6e6;padding: 0;border-top: none">
                                <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                    <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                        {{i.money | currency('')}}
                                    </el-col>
                                </el-col>
                                <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                    <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                        {{i.show_money | currency('')}}
                                    </el-col>
                                </el-col>
                                <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding: 0">
                                    <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                        {{i.payment_time | cur}}
                                    </el-col>
                                </el-col>
                                <el-col :span="6" style="padding: 0">
                                    <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                                        {{i.xf_cost | currency('')}}
                                    </el-col>

                                </el-col>
                            </el-col>
                        </el-col>
                    </template>
                    <el-col :span="24" style="text-align: left;font-size: 12px;color: black;margin:5px 0 10px 0">
                        *注意：审核将会把同批次充值也一起审核
                    </el-col>
                </el-col>

            </el-col >
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
                inforTrue:2,
                fk_type:'',
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ])
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
                'roles',
            ])
        },
        watch:{
            item(val){
                this.inforData = [];
                this.inforData.push(val);
                let _this = this;
                this.fk_type = this.inforData[0].contractinfo.contractproduct[0].fk_type;
                this.roles.filter(function(item){
                    if(item == "/api/renew-huikuan/mei_true_fandian"){
                        _this.inforTrue = 1;
                    }
                })
            },
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "../../styles/crmStyle/infor";
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
