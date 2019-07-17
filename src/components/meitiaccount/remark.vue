<template>
    <el-col :span="24" class="ct">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="14" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                备注信息
            </el-col>
            <el-col :span="10" style="text-align: right;padding: 0">
                    <el-button type="primary" v-if="account==true" @click="account=false" size="mini">编辑</el-button>
                    <el-button type="primary" v-if="account==false" @click="uploadaccount">保存</el-button>
                    <el-button v-if="account==false" @click="account=true">取消</el-button>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0">
            <el-col :span="6" style="border: 1px solid #e6e6e6;padding: 0">

                <el-col :span="24" class="cusmessage" style="color: #9c9c9c;border-bottom: 0;height: 60px;line-height: 60px;">
                    填写备注
                </el-col>

            </el-col>
            <el-col :span="18" style="border: 1px solid #e6e6e6;padding: 0">

                <el-col :span="24" class="cusmessage" style="color: #222f3b;border-bottom: none;height: 60px;line-height: 60px;">
                    <span v-if="account==true">{{item.note | curr}}</span>
                    <el-input   type="textarea" v-model="item1.note" placeholder="请输入内容" v-if="account==false"></el-input>
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
                input:"",
              radio: '2',
              quin:'',
              affer:{
                submituser:"",
                contract_id:"",
                appname:"",
                server_type:"",
                promote_url:"",
                pingbidiyu:"",
                tel:"",
                prlin_id:"",
                fandian:"",
                qudao:"",
                state:"",
                a_users:"",
                a_password:"",
                note:"",
                appid:"",
                avid:""
              },
            }
        },
          filters: {
            server: function (value,options) {
              for(let i=0;i<options.length;i++){
                if(options[i].value==value){
                  return options[i].label
                }
              }
            },
            qudao: function (value) {
              if(value>0){
                return '是'
              }else{
                return '否'
              }
            },
            qudao1: function (value) {
              if(value){
                return value.advertiser
              }else{
                return '无'
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
            }
          },
          watch:{
          },
      methods:{
        uploadaccount(){
          this.affer.submituser=this.user.id;
          this.affer.contract_id=this.item1.contract_id;
          this.affer.appname=this.item1.appname;
          this.affer.promote_url=this.item1.promote_url;
          this.affer.tel=this.item1.tel;
          this.affer.prlin_id=this.item1.prlin_id;
          this.affer.fandian=this.item1.fandian;
          this.affer.state=this.item1.state;
          this.affer.qudao=this.item1.qudao;
          this.affer.a_users=this.item1.a_users;
          this.affer.a_password=this.item1.a_password;
          this.affer.note=this.item1.note;
          this.affer.appid=this.item1.appid;
          this.affer.avid=this.item1.avid;
          this.affer.pingbidiyu=this.item1.pingbidiyu;
          this.affer.server_type=this.item1.server_type;
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
        props: ['item','account']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .ct{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

</style>
