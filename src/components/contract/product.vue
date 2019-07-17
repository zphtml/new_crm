<template>
    <el-col :span="24" class="product">
<!--===========================合同详情===============================================================-->
        <el-col :span="24" class="ct_InforBox" style="padding: 0;"
                v-if="this.$route.path =='/customer/contractManagement/compactList/viewcontract'|| this.$route.path =='/MediaManagement/MediacontractManagement/MediaaccounttList/Mediaviewcontract'">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 购买产品信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData" :key="index">
                        <div  v-for="(item,key) in data.prlin" :key="key">
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                   <span class="title" style="display: inline-block;width: 120px;">
                                        产品线
                                    </span>
                                     <span   class="input_search">
                                        {{ item.name }}
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                  <span class="title" style="display: inline-block;width: 120px;">
                                        {{ $t('titles.fandian') }}
                                  </span>
                                     <span class="input_search">
                                        {{ item.fandian }}
                                    </span>
                                </el-col>
                            </div>
                        </div>

                    </div>
                </el-col>
            </el-col>
        </el-col>
<!--==============================协议详情====================================================================-->
        <el-col :span="24" class="ct_InforBox" style="padding: 0;" v-if="this.$route.path =='/customer/contractManagement/ProtocolList/agreementDetails'">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 购买产品信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData" :key="index">
                        <div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                 <span class="title" style="display: inline-block;width: 120px;">
                                        产品线
                                 </span>
                                     <span      class="input_search">
                                        {{data.mht.prlin.name}}
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                  <span class="title" style="display: inline-block;width: 120px;">
                                        个人{{$t('titles.fandian')}}
                                  </span>
                                     <span     class="input_search">
                                        <span v-if="data.kh_grfd">
                                            {{data.kh_grfd}}%
                                        </span>
                                        <span v-else>
                                            0
                                        </span>
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                               <span class="title" style="display: inline-block;width: 120px;">
                                        税点
                               </span>
                                     <span       class="input_search">
                                        <span v-if="data.gf_shuidian">
                                            {{data.gf_shuidian}}%
                                        </span>
                                        <span v-else>
                                         0
                                        </span>
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                  <span class="title" style="display: inline-block;width: 120px;">
                                        合同金额
                                  </span>
                                     <span     class="input_search">
                                        {{data.rencontract.money}}
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                <span class="title" style="display: inline-block;width: 120px;">
                                        {{ $t('titles.fandian') }}比例
                                </span>
                                     <span      class="input_search">
                                        {{data.rencontract.fandian}}%
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                   <span class="title" style="display: inline-block;width: 120px;">
                                        现金{{ $t('titles.fandian') }}
                                   </span>
                                     <span     class="input_search">
                                        {{data.rencontract.xj_fandian}}%
                                    </span>
                                </el-col>
                            </div>

                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                      <span class="title" style="display: inline-block;width: 120px;">
                                        显示金额
                                      </span>
                                     <span   class="input_search">
                                        {{data.rencontract.xianshijine}}
                                    </span>
                                </el-col>
                            </div>
                            <div style="height: 23px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                       <span class="title" style="display: inline-block;width: 120px;">
                                        合同有效期
                                       </span>
                                     <span   class="input_search">
                                        {{data.contract_start | start}} 至 {{data.contract_end | end}}
                                    </span>
                                </el-col>
                            </div>

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
        mounted(){

        },
          filters: {
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            },
            start:function (val) {
              return   moment(val*1000).format('YYYY-MM-DD')
            },
            end:function (val) {
              if(val<=0){
                return '消费结束'
              }else{
                return moment(val*1000).format('YYYY-MM-DD')
              }
            }
          },
          watch:{
              item(val){
                  this.inforData = [];
                  this.inforData.push(val);
              },
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
    .product{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }

    }

</style>
