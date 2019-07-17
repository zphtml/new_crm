<template>
    <el-col :span="24" class="product contractmessage">
        <el-col :span="24" class="ct_InforBox" style="padding: 0;">
            <el-col :span="24" class="ct_left_box" style="padding: 0;">
                <el-col :span="24" class="topInfor" style="padding: 0;">
                    <div class="titleInfor">
                        <span class="listStyle"></span>
                        <span class="listText"> 购买产品信息</span>
                    </div>
                    <div class="titleBox"  v-for="(data,index) in inforData" :key="index">
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    类型
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.state | fileLeixing}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    {{$t('titles.Addcustomers')}}
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.prlin.name}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    合同金额
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.contract_money}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    媒介{{ $t('titles.fandian') }}
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.rebates_proportion}}%
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    代理{{ $t('titles.fandian') }}
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.dl_fandian}}%
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    销售媒介{{ $t('titles.fandian') }}
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.m_xsfd}}%  <i v-if="inforTrue" style="margin:9px 0 0 20px;margin-right: 10px;cursor: pointer" @click="add_xg" class="el-icon-edit"></i>
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    显示金额
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.show_money}}
                                </el-col>
                            </el-col>
                        </div>
                        <div style="height: 23px;margin-bottom: 5px;">
                            <el-col :span="24"  class="infor_a">
                                <el-col :span="7"   class="title" >
                                    合同有效期
                                </el-col>
                                <el-col :span="17"  class="input_search">
                                    {{data.contract_start | start}} 至 {{data.contract_end | end}}
                                </el-col>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-col>
        </el-col>
    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { up_meijie_markey_fandian } from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                inforData:[],
                inforTrue:false,
                infor_xg_True:false,
                up_meijie_markey_fandian:function(famdian){
                    up_meijie_markey_fandian({
                        id:this.$route.query.id,
                        fandian:famdian,
                    }).then(response => {
                        if(response.code == 200) {
                            this.$message({
                                showClose: true,
                                message: response.mes,
                                type: 'success'
                            });
                            this.$emit('media_acounr');
                        }else{
                            this.$message({
                                showClose: true,
                                message: '提交失败！',
                                type: 'error'
                            });
                        }
                    }).catch(error => {
                        this.mejierenewinfo();
                    });
                },
            }
        },
          filters: {
            current: function (value) {
              if(value=='' || value==null){
                return '--'
              }else{
                return value
              }
            },
            start:function (val) {
              return   moment(val*1000).format('YYYY-MM-DD')
            },
            end:function (val) {
              if(val<=0){
                return '消费结束'
              }else{
                return moment(val*1000).format('YYYY-MM-DD')
              }
            },
              fileLeixing(val){
                  if(val == 1){
                      return '直开'
                  }else if(val == 2){
                      return '拼框'
                  }else if(val == 3){
                      return '套壳'
                  }
              },
          },
          watch:{
              item(val){
                  this.inforData = [];
                  this.inforData.push(val);
                  let _this = this;
                  this.roles.filter(function(item){
                      if(item == "/api/renew-huikuan/mei_market_fandian"){
                          _this.inforTrue = true;
                      }
                      if(item == "/api/renew-huikuan/up_meijie_markey_fandian"){
                          _this.infor_xg_True = true;
                      }
                  })
            },
          },
        methods:{
            add_xg(){
                this.$prompt('销售媒介'+this.$t('titles.fandian'), '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.up_meijie_markey_fandian(value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
            ])
        },
      created() {

      },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "../../styles/crmStyle/infor";
    .product{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
    }

</style>
