<template>
    <el-col >
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;background: white">
            <el-col :span="16" style="padding-left:10px;font-weight: bold">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                审核备注
            </el-col>
        </el-col>
        <el-col :span="24" style="padding-left: 20px;padding-top: 20px">
            <el-col :span="24" class="shenhe_note" v-for="(data,index) in this.shenheVal" :key="index">
                <div class="top_icon"></div>

                <div class="box" :class="{box_no:data.type == 2}">
                    <div class="header" style=" color:rgb(163, 165, 167);">
                        <span class="name">
                            {{data.users0 | no_name}}
                        </span>
                        <span class="date">
                           {{data.catated_at | cur}}
                        </span>
                    </div>
                    <div class="note">
                        <div class="left_icon">

                            <img src="../../../styles/images/dui.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type != 2">
                            <img src="../../../styles/images/cuo.png" alt="" style="width: 18px;display: inline-block;vertical-align: middle;"  v-if="data.type == 2">

                        </div>
                        <div class="right_note">
                            {{data.note | note}}
                        </div>
                    </div>
                </div>
            </el-col >
        </el-col>
    </el-col>

</template>
<script>
    import moment from "moment"
    export default {
        data() {
            return {
                shenheVal:[],
            }
        },
        methods:{
            shenhe_remark(val){
                this.shenheVal = val.hisData;
            },
        },
        filters: {
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD HH:mm:ss')
            },
            note(val){
                if(val == ''){
                    return "无"
                }else{

                }return val
            },
            no_name:function (val) {
                if(val){
                    return val.name
                }else{
                    return '--'
                }
            },
        },

    }
</script>

<style rel="stylesheet/scss"  lang="scss">

</style>
