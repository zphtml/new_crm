<template>
    <el-col :span="24" class="contractmessage">
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
            <el-col :span="24" class="topInfor"  v-for="(data,index) in inforData" :key="index">
                <div class="titleInfor">
                    <span class="listStyle"></span>
                    <span class="listText">合同基本信息</span>
                </div>
                <div class="titleBox">
                    <div style="height: 23px;margin-bottom: 5px;">
                        <el-col :span="24"  class="infor_a">
                            <el-col :span="5" class="title" >
                                {{ $t('titles.advertiser') }}
                            </el-col>
                            <el-col :span="19" class="input_search">
                                    <span >
                                        {{data.advertiser0 |curr1}}
                                    </span>
                            </el-col>
                        </el-col>
                    </div>
                    <div style="height: 23px;margin-bottom: 5px;">
                        <el-col :span="24"  class="infor_a">
                            <el-col :span="5" class="title" >
                                实付金额
                            </el-col>
                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                     计算公式:{{data.jisuangongshi}} | DB实付:{{data.xf_cost | currency('')}}
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
                                合同编号
                            </el-col>
                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                    {{data.contractinfo.contract_no}}
                                    </span>
                            </el-col>
                        </el-col>
                    </div>
                    <div style="height: 23px;margin-bottom: 5px;">
                        <el-col :span="24"  class="infor_a">
                            <el-col :span="5" class="title" >
                                合同类型
                            </el-col>
                            <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                        {{data.contractinfo.type | current}}
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
                account:true,
                inforData:[],
            }
        },
          filters: {
            current: function (value) {
              if(value==1){
                return '普通合同'
              }else{
                return '框架合同'
              }
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
    .contractmessage{
        .cusmessage{
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
