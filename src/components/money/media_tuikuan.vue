<template>
    <el-col :span="24" class="Replenishment">
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
                <el-col :span="24" class="topInfor"  v-for="(data,index) in inforData" :key="index">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">媒体退款基本信息</span>
                    </div>
                    <div class="titleBox">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" style="font-size: 16px;color:#669fe4;font-weight: 550">
                                    退款金额
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 16px;color:#669fe4;font-weight: 550">
                                        {{data.xf_cost | currency('')}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" style="font-size: 14px;color: black">
                                    {{$t('titles.fandian')}}类型
                                </el-col>
                                <el-col :span="19" class="input_search" style="font-size: 14px;color: black">
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
                                <el-col :span="5" class="title" >
                                    媒体{{ $t('titles.fandian') }}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.contractinfo.mht .rebates_proportion}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    代理{{ $t('titles.fandian') }}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.contractinfo.mht .dl_fandian}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    账户币
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                          {{data.show_money | currency('')}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="data.payment_type == 15">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    账户名称
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                        {{data.account0.a_users}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    退款日期
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                      {{data.payment_time | cur}}
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
              pay: function (value) {
                  if(value==14){
                      return '退款到客户'
                  }else if(value==15){
                      return '退款到总账户'
                  }
              },
              fileLeixing(val){
                  if(val){
                      if(val.state == 1){
                          return '直开'
                      }else if(val.state == 2){
                          return '拼框'
                      }else if(val.state == 3){
                          return '套壳'
                      }
                  }

              },
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            },
              cur: function (value) {
                  return moment(value*1000).format('YYYY-MM-DD')
              },
            curr1: function (value) {
              if (value == '' || value == null) {
                return '--'
              } else {
                return value.advertiser
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
    @import "../../styles/crmStyle/infor";
    .Replenishment{
        padding:0!important;
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

</style>
