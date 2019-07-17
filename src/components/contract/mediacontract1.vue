<template>
    <el-col :span="24" class="mediacontract">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                媒介合同基本信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;" v-for="(data,index) in inforData" :key="index">
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介公司名称</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                       {{data.mht.advertiser0 | fileFun}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介合同名称</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                   {{data.mht | fileFuntitle}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">产品线</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                     {{data.mht.prlin | fileFunPrlin}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">类型</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    {{data.mht.state | fileLeixing}}
                </span>
            </el-col>
            <el-col :span="24" v-if="inforTrue">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介{{ $t('titles.fandian') }}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                        {{data.mht.rebates_proportion}}%
                </span>
            </el-col>
            <el-col :span="24" v-if="inforTrue">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">代理{{ $t('titles.fandian') }}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                                          {{data.mht.dl_fandian}}%
                </span>
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
                inforTrue:false,
            }
        },
        computed: {
            ...mapGetters([
                'roles',
            ])
        },
        filters:{
            fileFun(val){
                if(val){
                    return val.madname
                }else{
                    return '---'
                }
            },
            fileFuntitle(val){
                if(val){
                    return val.title
                }else{
                    return '---'
                }
            },
            fileFunPrlin(val){
                if(val){
                    return val.name
                }else{
                    return '---'
                }
            },
            fileLeixing(val){
                if(val == 1){
                    return '直开'
                }else if(val == 2){
                    return '拼框'
                }else if(val == 3){
                    return '套壳'
                }
            },
        },
          watch:{
              item(val){
                this.inforData = [];
                  this.inforData.push(val);
                  let _this = this;
                  this.roles.filter(function(item){
                      if(item == "/api/renew-huikuan/mei_true_fandian"){
                          _this.inforTrue = true;
                      }
                  })
            },
          },
        mounted(){
        },
        methods:{
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ])
        },
      created() {

      },
        props: {
            item:{
                type: Object,
                default: function () {
                    return {advertiser0:{},prlin:{}}
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .mediacontract{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

</style>
