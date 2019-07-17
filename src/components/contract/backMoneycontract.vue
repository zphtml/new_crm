<template>
    <el-col :span="24" class="ct" style="padding: 0!important;">
        <el-col :span="24" class="ct_InforBox" style="padding: 0!important;">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 结算单基本信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData" :key="index">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                 <span  class="title" style="display: inline-block;width: 120px;font-size: 16px;color: black">
                                 金额
                                 </span>
                                <span class="input_search" style="font-size: 16px;color: black">
                                       {{data.money}}
                                  </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                 <span  class="title" style="display: inline-block;width: 120px;">
                                 账户币
                                 </span>
                                <span class="input_search" >
                                       {{data.show_money}}
                                  </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                 <span  class="title" style="display: inline-block;width: 120px">
                                 结算周期
                                 </span>
                                <span class="input_search">
                                        {{data.contract_start | cur }} 至{{data.contract_end | cur }}
                                  </span>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                  <span  class="title" style="display: inline-block;width: 120px">
                                    提交人
                                  </span>
                                  <span class="input_search">
                                    {{data.submituser0.name }}
                                </span>
                            </el-col>
                        </div>
                        <!--<div style="height: 23px;margin-bottom: 5px;">-->
                            <!--<el-col :span="24"  class="infor_a">-->
                                <!--<span  class="title" style="display: inline-block;width: 120px">-->
                                    <!--负责销售-->
                                <!--</span>-->
                                  <!--<span class="input_search">-->
                                    <!--{{data.market0 }}-->
                                <!--</span>-->
                            <!--</el-col>-->
                        <!--</div>-->
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
            cur: function (value) {
                return moment(value * 1000).format('YYYY-MM-DD')
            },
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
