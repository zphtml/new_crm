<template>
    <el-col :span="24" class="mediacontract" style="padding: 0;" v-if="bukuan_show">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;margin-top: 10px;font-weight: bold">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                媒介合同基本信息
            </el-col>
        </el-col>
        <!--客户-->
        <el-col :span="24" style="border: 1px solid #e1dfdc;margin-top: 10px;font-size: 12px;padding: 0;" v-for="(data,index) in inforData" :key="index"  v-if="$route.path != '/MediaManagement/MediaFundManagement/refund_list/refund_listInfor'">
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介公司名称</span>
                <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;" v-if="data.mht">
                    {{data.mht.advertiser0 | fileFun}}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介合同名称</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.mht">
                    {{data.mht | fileFuntitle}}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
            <el-col :span="24" v-if="inforTrue == 1">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">媒介{{$t('titles.fandian')}}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.mht">
                    {{data.mht.rebates_proportion }}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
            <el-col :span="24" v-if="inforTrue == 1">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">代理{{$t('titles.fandian')}}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.mht">
                    {{data.mht.dl_fandian }}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">{{$t('titles.Addcustomers')}}</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;" v-if="data.mht">
                    {{data.mht.prlin | fileFunPrlin}}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">类型</span>
                <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;" v-if="data.mht">
                    {{data.mht.state | fileLeixing}}
                </span>
                <span v-else>
                    ---
                </span>
            </el-col>
        </el-col>
        <!--媒介-->
        <el-col :span="24" style="border: 1px solid #e1dfdc;margin-top: 10px;font-size: 12px;padding: 0;" v-for="(data,index) in inforData" :key="index" v-else>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介公司名称</span>
                <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{data.advertiser0 | mediafileFun}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">媒介合同名称</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    {{data | fileFuntitle}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">产品线</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    {{data.prlin | fileFunPrlin}}
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 23px;line-height: 23px;text-align: right;color: #9c9c9c">类型</span>
                <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{data.state | fileLeixing}}
                </span>
            </el-col>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                bukuan_show:true,
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
                    return val.advertiser
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
