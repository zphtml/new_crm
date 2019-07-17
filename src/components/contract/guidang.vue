<template>
    <el-col :span="24"  >
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;"  >
            <el-col :span="14" style="padding-left: 0;font-weight: bold">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                归档信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;background: rgb(249, 248, 247);padding: 5px 0"     >
            <el-row v-if="inforData.is_ultimate_shenhe == 1 && inforData.audit == 1 && inforData.isguidang == 1">
                <el-col :span="24"  >
                    <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">归档人</span>
                    <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{inforData.guidangUser | user}}
                </span>
                </el-col>
                <el-col :span="24" >
                    <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">归档日期</span>
                    <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{inforData.guidang_time | time}}
                </span>
                </el-col>
                <el-col :span="24" >
                    <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">归档编号</span>
                    <span style="display: inline-block;height: 23px;line-height: 23px;margin-left:20px;">
                    {{inforData.guidang_no}}
                </span>
                </el-col>
            </el-row>
            <el-row  v-else>
                <el-col :span="24">
                    <div>
                   <span  style="width: 145px;display: inline-block;margin-left: 30px">
                       归档
                   </span>
                        <span v-if="inforData.is_ultimate_shenhe == 1 && inforData.audit == 1 && inforData.isguidang != 1">
                         <el-button  size="mini"   type="primary"   @click="puu_yes()">是</el-button>
                    </span>
                        <span v-else>
                         <el-button size="mini"  type="primary"  :disabled="inforData.isguidang != 1" >是</el-button>
                    </span>
                    </div>
                </el-col>
            </el-row>
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
                inforData:'',
                account:true,
            }
        },

          watch:{
              item(val){
                  this.inforData = val;
            },
          },
        methods:{
            puu_yes(val){
                this.$emit('puu_yes');
            }
        },

        computed: {
            ...mapGetters([
                'user',
            ]),
          item1: function () {
            var obj={};
            obj=JSON.parse(JSON.stringify(this.item));
            return obj
          }
        },
        filters:{
            user(val){
                if(val){
                    return val.name
                }else{
                    return '--'
                }
            },
            time(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            }
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">

</style>
