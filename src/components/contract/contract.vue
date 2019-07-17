<template>
    <el-col :span="24" class="ct" style="padding: 0!important;">
        <el-col :span="24" class="ct_InforBox" style="padding: 0!important;">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 合同基本信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData">
                        <div style="height: 23px;margin-bottom: 5px;" v-if="urlData == '/MediaManagement/MediacontractManagement/MediaProtocolList/mediaviewcontract'">
                            <el-col :span="24"  class="infor_a">
                                  <span  class="title" style="display: inline-block;width: 120px">
                                    合同名称
                                </span>
                                  <span class="input_search">
                                    {{data.title }}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                        <span  class="title" style="display: inline-block;width: 120px">
                                    合同编号
                                       </span>
                                  <span class="input_search">
                                    {{data.contract_no  | curr}}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"
                             v-if="urlData != '/MediaManagement/MediacontractManagement/MediaProtocolList/mediaviewcontract'&&  urlData != '/MediaManagement/MediacontractManagement/MediaaccounttList/Mediaviewcontract'">
                            <el-col :span="24"  class="infor_a">
                                  <span  class="title" style="display: inline-block;width: 120px">
                                    {{ $t('titles.advertiser') }}
                                  </span>
                                  <span class="input_search">
                                    {{data.cu_ad_info | currInfor}}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"
                             v-if="urlData != '/MediaManagement/MediacontractManagement/MediaProtocolList/mediaviewcontract'&&  urlData != '/MediaManagement/MediacontractManagement/MediaaccounttList/Mediaviewcontract'">

                            <span   class="infor_a">
                                <span  class="title" style="display: inline-block;width: 120px">
                                    APP名称/{{ $t('titles.nick') }}
                                </span>
                                  <span class="input_search">
                                     {{data.appname  | curr}}
                                 </span>
                            </span>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                 <span  class="title" style="display: inline-block;width: 120px">
                                    {{ $t('titles.agent') }}
                                 </span>
                                <span class="input_search">
                                        {{data.agent_company | curr }}
                                  </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                   <span  class="title" style="display: inline-block;width: 120px">
                                    简称
                                   </span>
                                  <span class="input_search">
                                    {{data.title| curr }}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                  <span  class="title" style="display: inline-block;width: 120px">
                                    提交人
                                  </span>
                                  <span class="input_search">
                                    {{data.submituser0.name  | curr}}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <span  class="title" style="display: inline-block;width: 120px">
                                    负责销售
                                </span>
                                  <span class="input_search">
                                    {{data.market0  | cur}}
                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                               <span  class="title" style="display: inline-block;width: 120px">

                               </span>
                                <span class="input_search">

                                </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;"
                             v-if="urlData == '/MediaManagement/MediacontractManagement/MediaProtocolList/mediaviewcontract'">
                            <el-col :span="24"  class="infor_a">
                                 <span  class="title" style="display: inline-block;width: 120px">

                                 </span>
                                <span  class="input_search">

                                </span>
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
                urlData:'',
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
            curr:function (val) {
                if(val){
                    return val
                }else{
                    return '--'
                }
            },
            cur: function (value) {
                if(value){
                    return value.name
                }else{
                    return '--'
                }
            },
            currInfor: function (value) {
                if(value.guanggaozhu){
                    return value.guanggaozhu
                }else{
                    return '--'
                }
            }
        },
        watch:{
            item(val){
                this.inforData = [];
                this.inforData.push(val);
                this.urlData =  this.$route.path;
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
    .ct{
        padding: 0;
        .cusmessage{
            height: 23px;
            font-size: 12px;
            line-height: 23px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }

    }

</style>
