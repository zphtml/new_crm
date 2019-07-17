<template>
    <el-col :span="24" class="remarks">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                备注信息:
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;">
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;text-align: right;color: #9c9c9c">备注</span>
                <span style="display: inline-block;margin-left:20px;;vertical-align: top;width:195px;">
                    {{item.note | noteNull}}
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
            }
        },
          filters: {
              noteNull(val){
                  if(val == ""){
                   return '---'
                  }else{
                      return val
                  }
              },
          },
          watch:{
            contact(val){

            },
          },
        methods:{

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
    .remarks{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

</style>
