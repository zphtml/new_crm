<template>
    <el-col :span="24" class="baohanxufei">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="8" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                保证金列表
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;">

            <el-table
                    :data="item"
                    show-summary
                    class="vue-table"
                    border
                    height="300"
                    style="width: 100%">
                <el-table-column
                        prop="appname"
                        :label="$t('titles.customer')">
                    <template slot-scope="scope">
                        {{scope.row.advertiser}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="合同名称">
                    <template slot-scope="scope">
                        {{scope.row.title}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="金额">
                    <template slot-scope="scope">
                        {{scope.row.money | currency('')}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.ctime | time}}
                    </template>
                </el-table-column>
            </el-table>
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
                account:true,
              tabledata:[],
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
            matnum:function (str){
              str=str.toString()
              if(str) {

                var newStr = "";
                var count = 0;

                if(str.indexOf(".")==-1){
                  for(var i=str.length-1;i>=0;i--){
                    if(count % 3 == 0 && count != 0){
                      newStr = str.charAt(i) + "," + newStr;
                    }else{
                      newStr = str.charAt(i) + newStr;
                    }
                    count++;
                  }
                  str = newStr + ".00"; //自动补小数点后两位
                }else{
                  for(var i = str.indexOf(".")-1;i>=0;i--){
                    if(count % 3 == 0 && count != 0){
                      newStr = str.charAt(i) + "," + newStr;
                    }else{
                      newStr = str.charAt(i) + newStr; //逐个字符相接起来
                    }
                    count++;
                  }
                  str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
                }
                return str;
              }else{
                return 0;
              }

            },
            time: function (value) {
              return moment(value*1000).format('YYYY-MM-DD')
            },
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
        props: ['item','bi','fu']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .baohanxufei{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .el-select .el-input {
            width: 110px;
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
