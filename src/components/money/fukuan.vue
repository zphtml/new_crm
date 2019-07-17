<template>
    <el-col :span="24" class="Replenishment">
        <el-col :span="24" class="ct_InforBox">
            <el-col :span="24" class="ct_left_box">
                <el-col :span="24" class="topInfor"  v-for="(data,index) in inforData" :key="index" >
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText">开票信息</span>
                    </div>
                    <div class="titleBox">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    纳税人识别号
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span >
                                 {{data.tax_identification | current}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    开户行
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                    {{data.open_account | current}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    开票地址
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                      {{data.ticket_address | current}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    账号
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                       {{data.account | current}}
                                    </span>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="5" class="title" >
                                    电话
                                </el-col>
                                <el-col :span="19" class="input_search">
                                    <span style="font-size: 12px;">
                                    {{data.kp_tel | current}}
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
            pay: function (value,a) {
              if(value==14){
                return '退款到客户'
              }else if(value==15){
                return '退款到总账户---'+a
              }
            },

          },
          watch:{
              invalInfor(val){
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
        props: ['invalInfor']
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
