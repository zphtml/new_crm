<template>
    <el-col :span="24" class="ct" style="padding: 0;">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="14" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                账号信息
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0">
            <el-col :span="24" style="padding: 0">
                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: none">
                    用户名:
                 <span style="color: black;margin-left: 10px">
                    {{item.a_users }}
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
              radio: '2',
              quin:'',
            }
        },
          watch:{
          },
      methods:{
        uploadaccount(){
          this.affer.submituser=this.user.id
          this.affer.contract_id=this.item1.contract_id
          this.affer.appname=this.item1.appname
          this.affer.promote_url=this.item1.promote_url
          this.affer.tel=this.item1.tel
          this.affer.prlin_id=this.item1.prlin_id
          this.affer.fandian=this.item1.fandian
          this.affer.state=this.item1.state
          this.affer.qudao=this.item1.qudao
          this.affer.a_users=this.item1.a_users
          this.affer.a_password=this.item1.a_password
          this.affer.note=this.item1.note
          this.affer.avid=this.item1.avid
          this.affer.appid=this.item1.appid
          this.affer.pingbidiyu=this.item1.pingbidiyu
          this.affer.server_type=this.item1.server_type
          this.$emit('account_updataru', this.affer);
          this.account = true;
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
      created() {

      },
        props: ['item' ,'account']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .ct{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
        }
    }

</style>
