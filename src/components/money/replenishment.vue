<template>
    <div>
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
                <el-col :span="24" class="topInfor"  v-for="(data,index) in inforData" :key="index">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">补款基本信息</span>
                    </div>
                    <div class="titleBox">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" style="font-size: 16px;color:#669fe4;font-weight: 600">
                                    补款金额
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 16px;color:#669fe4;font-weight: 600">
                                        {{data.money | currency('')}}元
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path != '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    补账户币
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                        {{data.show_money | currency('')}}元
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path != '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    备款账户
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span v-if="data.account0">
                                        {{data.account0.a_users }}
                                    </span>
                                    <span v-else>
                                        --
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path != '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    媒介{{$t('titles.fandian')}}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.contractinfo.rebates_proportion}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path != '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    代理{{$t('titles.fandian')}}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.contractinfo.dl_fandian}}%
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
                        <div style="height: 23px;margin-bottom: 5px;"v-if="data.payment_type == 311">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" style="font-size: 15px;">
                                    补款账户币
                                </el-col>
                                <el-col :span="19" class="input_search" style="font-size: 15px;">
                                    <span >
                                        {{data.show_money | currency('')}}元
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="data.payment_type == 311">
                            <el-col :span="24"  class="infor_a" >
                                <el-col :span="5" class="title" style="font-size: 15px;">
                                    补款账户
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 14px;">
                                       {{data.account0.a_users}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path == '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    广告主名称
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                    <span  v-if="data.cu_ad_info">
                                        {{data.cu_ad_info.guanggaozhu}}
                                    </span>
                                    <span v-else>
                                        ---
                                    </span>
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;" v-if="path == '/customer/FundManagement/fillingList/replenishment'">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    {{$t('titles.fandian')}}
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{Number(data.rebates_proportion)}}%
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    补款主体
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.contractinfo.agent_company}}
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
                                <el-col :span="5" class="title" >
                                    补款日期
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.payment_time | curr}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>

        </el-col>
    </div>

</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                inforData:[],
                path:'',
            }
        },
          filters: {
            curr: function (value) {
              return moment(value*1000).format('YYYY-MM-DD')
            },
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            },
            cur: function (value) {
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
                this.path = this.$route.path;
            },
          },
        methods:{

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
    @import "src/styles/crmStyle/infor.scss";
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
