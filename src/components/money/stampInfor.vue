<template>
    <el-col :span="24" class="Replenishment">
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
                <el-col :span="24" class="topInfor">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">申请基本信息</span>
                    </div>
                    <div class="titleBox" v-for="(data,index) in inforData">
                        <div style="height: 23px;margin-bottom: 5px;" >
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" style="font-size: 16px;color:#669fe4;font-weight: 550">
                                    公司名称
                                </el-col>
                                <el-col :span="19" class="input_search" style="font-size: 16px;color:#669fe4;font-weight: 550">
                                    <span >
                                         {{data.advertiser   }}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    提交时间
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                          {{data.ctime | cur}}
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
                                    <span >
                                          {{data.submituser0.name}}
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
    .Replenishment{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #737373;
        }
    }

</style>
