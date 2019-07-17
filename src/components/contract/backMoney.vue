<template>
    <el-col :span="24" class="product">
        <el-col :span="24" style="margin-top:20px;height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                    相关回款
            </el-col>
        </el-col>

        <!--合同详情-->
        <el-col :span="24" style="margin-top: 10px;padding: 0" >
            <el-col :span="24" style="border: 1px solid #e6e6e6;padding: 0;border-bottom: none">
                <el-col :span="8" class="cusmessage" style="color: #9c9c9c;border-right: 1px solid #e6e6e6">
                    回款金额
                </el-col>
                <el-col :span="8" class="cusmessage" style="color: #9c9c9c">
                    平抵金额
                </el-col>
                <el-col :span="8" class="cusmessage" style="color: #9c9c9c">
                    回款时间
                </el-col>
            </el-col>
            <el-col :span="24" style="padding: 0">
                <el-col :span="24" style="border: 1px solid #e6e6e6;padding: 0" v-for="(item,index) in inforData" :key="index">
                    <el-col :span="8" class="cusmessage" style="border-right: 1px solid #e6e6e6">
                        {{ item.money | currency('')}}
                    </el-col>
                    <el-col :span="8" class="cusmessage" >
                        {{ item.pmoey | currency('')}}
                    </el-col>
                    <el-col :span="8" class="cusmessage" >
                        {{ item.payment_time | start}}
                    </el-col>
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
                  this.inforData = val;
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
