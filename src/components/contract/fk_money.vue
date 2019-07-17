<template>
    <el-col :span="24" class="mediacontract" >
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;margin-top: 10px;font-weight: bold" v-if="inforTrue == 1">
            <el-col :span="24" style="padding-left: 0" >
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                媒介付款基本信息
            </el-col>
        </el-col>
        <!--媒介-->
        <el-col :span="24" style="margin-top: 10px;font-size: 12px;" v-for="(data,index) in inforData" :key="index"  v-if="inforTrue == 1">
           <el-col :span="24" style="border: 1px solid #e1dfdc;">
               <el-col :span="24">
                   <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">付款类型</span>
                   <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{data.account0.mt_payment_type | fileLeixing}}
                </span>
               </el-col>
               <el-col :span="24" v-if="data.account0.mt_payment_type  == 2">
                   <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">付款周期</span>
                   <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    {{data.account0.dk_zhouqi}}
                </span>
               </el-col>
               <el-col :span="24"  v-if="data.account0.mt_payment_type  == 2">
                   <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">付款日</span>
                   <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    {{data.account0.dk_date | fileFuntitle}}
                </span>
               </el-col>
           </el-col>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                inforTrue:2,
                inforData:[],
            }
        },
        computed: {
            ...mapGetters([
                'roles'
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
            mediafileFun(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileFuntitle(val){
                if(val){
                    return val
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
                    return '预付'
                }else if(val == 2){
                    return '垫付'
                }else {
                    return '--'
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
                        _this.inforTrue = 1;
                    }
                })
            },
        },
        props: {
            item: {
                type: Object,
                default:function () {
                    return {mht:{}}
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "../../styles/crmStyle/infor";
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
