<template>
    <el-col :span="24" class="accountmessage" >
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;" v-for="(item,index) in inforData" :key="index">
            <el-col :span="14" style="padding-left: 0;font-weight: bold">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                账户信息
            </el-col>
            <el-col :span="10" style="text-align: right;padding: 0">
                <template v-if="item.state==1">
                    <el-button type="primary" v-if="account==true" @click="account=false" size="mini">编辑</el-button>
                    <el-button type="primary" v-if="account==false" @click="setin">保存</el-button>
                    <el-button v-if="account==false" @click="account=true">取消</el-button>
                </template>
            </el-col>
        </el-col>



        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;background: rgb(249, 248, 247);"  v-for="(data,key1) in inforData" :key="key1">
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">账户名</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                      <span v-if="account==true">{{data.a_users}}</span>
                      <el-input v-model="item1.a_users" placeholder="请输入内容" v-if="account==false"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">密码</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                      <span v-if="account==true">
                          {{data.a_password}}
                      </span>
                      <el-input v-model="item1.a_password" placeholder="请输入内容" v-if="account==false"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">URL</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                      <span v-if="account==true">{{data.promote_url}}</span>
                      <el-input v-model="item1.promote_url" placeholder="请输入内容" v-if="account==false"></el-input>
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
                input:"",
                inforData:[],
                account:true,
            }
        },
          filters: {
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            }
          },
          watch:{
              item(val){
                  this.inforData = [];
                  this.inforData.push(val);
            },
          },
        methods:{
          setin(){

              if(this.item1.a_users==""){
                  this.$message({
                      message: '账户名不能为空',
                      type: 'warning'
                  });
              }else if(this.item1.a_password==""){
                  this.$message({
                      message: '密码不能为空',
                      type: 'warning'
                  });
              }else{
                  this.item1.a_users = this.item1.a_users.replace(/\s+/g,"");
                  this.item1.a_password =  this.item1.a_password.replace(/\s+/g,"");
                   this.account=true;
                    this.$emit('setin', this.item1);
              }

          },
          del(val){
            this.$emit('del', [val,this.item1.id]);
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
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .accountmessage{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .el-select .el-input {
            width: 250px;
        }
        .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 180px;
        }
        .el-input__inner {
            height: 24px !important;
            line-height: 24px !important;
        }
        .el-input-group {
            width: 250px;
        }

        .el-button--primary {
            /*margin-left: 14px;*/
            font-size: 12px;
            width: 43px;
            height: 23px;
            color: #fff;
            background-color: #20a0ff;
            border-color: #20a0ff;
        }
        .el-button--default{
            font-size: 12px;
            width: 43px;
            height: 23px;
        }
        .el-button {
           padding: 0;
        }
        .el-button--text {
            margin-left: 8px;
            border: none;
            color: #000;
            background: 0 0;
            font-size: 12px;
            padding-left: 0;
            padding-right: 0;
        }

    }

</style>
