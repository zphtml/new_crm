<template>
    <el-col :span="24" class="remarks">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;">
            <el-col :span="24" style="padding-left: 0;font-weight: bold" v-if="$route.path == '/customer/FundManagement/fillingList/replenishment'">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                补款原因
            </el-col>
            <el-col :span="24" style="padding-left: 0;font-weight: bold" v-else>
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                备注信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;font-size: 12px;background: #f9f9f9;padding: 10px 0">
             <span   class="title" style="width:130px;text-align: left; padding-left:30px;color: rgb(156, 156, 156);display: inline-block;"  v-if="$route.path == '/customer/FundManagement/fillingList/replenishment'">
                    补款原因
                </span>
            <span   class="title" style="width:130px;text-align: left;padding-left:30px;color: rgb(156, 156, 156);display: inline-block"  v-else>
                    备注
                </span>
            <span class="input_search">
                    {{ item.note }}
                </span>
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
          },
          watch:{
              item(val){
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
