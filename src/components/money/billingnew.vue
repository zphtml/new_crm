<template>
    <el-col :span="24" class="billing">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                开票资料 <span style="color: #54adff">查看客户资质</span>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;border: 1px solid #e1dfdc;" v-for="(data,index) in inforData" :key="index" >
            <el-col :span="24">
                <el-col :span="5" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">纳税人识别号</span>
                </el-col>
                <el-col :span="19" class="input_search">
                   <span style="display: inline-block;height: 30px;line-height: 30px;">
                         {{data.tax_identification}}
                    </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="5" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">开户行</span>
                </el-col>
                <el-col :span="19" class="input_search">
                  <span style="display: inline-block;height: 30px;line-height: 30px;">
                                        {{data.open_account}}
                               </span>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="5" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">开票地址</span>
                </el-col>
                <el-col :span="19" class="input_search">
                  <span style="display: inline-block;height: 30px;line-height: 30px;">
                                       {{data.ticket_address}}
                               </span>
                </el-col>

            </el-col>
            <el-col :span="24">
                <el-col :span="5" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">账号</span>
                </el-col>
                <el-col :span="19" class="input_search">
                  <span style="display: inline-block;height: 30px;line-height: 30px;">
                                       {{data.account}}
                               </span>
                </el-col>

            </el-col>
            <el-col :span="24">
                <el-col :span="5" class="title" style="text-align: right">
                    <span style="display: inline-block;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">电话</span>
                </el-col>
                <el-col :span="19" class="input_search">
                  <span style="display: inline-block;height: 30px;line-height: 30px;">
                                      {{data.kp_tel}}
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
            }
          },
          watch:{
              item(val){
                this.inforData = [];
                  if(val.guanggaozhu){
                      this.inforData.push(val.guanggaozhu);
                  }else{
                      this.inforData.push(val.advertiser0);
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
                'user',
            ])
        },
      created() {

      },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .billing{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #737373;
        }
    }

</style>
