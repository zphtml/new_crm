<template>
    <div class="cha" :key="contact">
        <template v-if="setcontact==false &&　contact!=0">
            <el-col :span="24" style="margin-top: 10px;margin-bottom: 10px;line-height: 1px;height: 30px;">
                <el-col :span="6" style="font-size: 12px">{{contact}}号联系人</el-col>
                <el-col :span="10" style="border-top: 1px solid #000"></el-col>
                 <button class="tongguo" style="margin-left: 20px;" @click="del(contact)">删除</button>
            </el-col>

        </template>
        <template v-if="setcontact==true &&　contact!=0">
            <el-col :span="24" style="margin-top: 10px;margin-bottom: 10px;line-height: 1px;height: 30px;">
                <el-col :span="6" style="font-size: 12px">{{contact}}号联系人</el-col>
                <el-col :span="18" style="border-top: 1px solid #000"></el-col>
            </el-col>

        </template>
        <el-col :span="24" style="color: #737373;font-size: 12px;">
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>联系人</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                      <span v-if="setcontact==true">{{item.name | current}}</span>
                      <el-input size="mini"  v-model="item1.name" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>联系电话</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                      <span v-if="setcontact==true">{{item.tel | current}}</span>
                      <el-input size="mini"  v-model="item1.tel" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>邮箱</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <span v-if="setcontact==true">{{item.email | current}}</span>
                    <el-input size="mini"  v-model="item1.email" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>职位</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                     <span v-if="setcontact==true">{{item.position | current}}</span>
                     <el-input size="mini"  v-model="item1.position" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>微信</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                       <span v-if="setcontact==true">{{item.weixin | current}}</span>
                       <el-input size="mini"  v-model="item1.weixin" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
            <el-col :span="24">
                <span style="display: inline-block;width: 65px;height: 30px;line-height: 30px;text-align: right"><span style="color: red">*</span>QQ</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                        <span v-if="setcontact==true">{{item.qq | current}}</span>
                        <el-input size="mini"  v-model="item1.qq" placeholder="请输入内容" v-if="setcontact==false" @change="set"></el-input>
                </span>
            </el-col>
        </el-col>
    </div>

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
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            }
          },
          watch:{
            contact(val){

            },
          },
        methods:{
          set(){
            this.$emit('newcontact', [this.item1,this.contact]);
          },
          del(val){
            this.$emit('del', [val,this.item1.id]);
          }
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
      created() {

      },
        props: ['contact','setcontact','item','item1']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .cha{
        .tongguo{
            width: 43px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border: none;
            color: #fff;
            font-size: 12px;
            border-radius: 5px;
            background: #54adff;
            margin-top: -10px;
        }
        .el-button--default{
            font-size: 12px;
            width: 43px;
            height: 23px;
        }
    }

</style>
