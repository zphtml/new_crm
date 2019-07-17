<template>
    <el-col :span="24" class="product">
        <el-col :span="24" style="margin-top:20px;height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;">
            <el-col :span="24" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                执行框架列表
            </el-col>
        </el-col>
        <el-col :span="24">
            <el-table
                    highlight-current-row v-loading="listLoading"  border
                    :data="TableData"
                    class="table"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    style="width: 100%">
                <el-table-column
                        label="媒介合同">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.mht | mhtFun }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="负责商务">
                    <template slot-scope="scope">
                        <div style="text-align: center">
                            {{scope.row.advertiser0 | nameFun}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('titles.Addcustomers')">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.contractproduct[0].name }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        header-align="center"
                        label="创建时间">
                    <template slot-scope="scope">
                        <div style="text-align: center">
                            {{scope.row.ctime | ctimeData}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        header-align="center"
                        label="合同属性">
                    <template slot-scope="scope">
                        <div style="text-align: center">
                              <span v-if="scope.row.contract_state == 1">
                                                    新客
                                                </span>
                            <span v-if="scope.row.contract_state == 2">
                                                   老客
                                                </span>
                            <span v-if="scope.row.contract_state == 3">
                                                   老客新开
                                                </span>
                            <span v-if="scope.row.contract_state == 4">
                                                    公司分配
                                                </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="审核状态">
                    <template slot-scope="scope">
                        <stateDiv :stateData='scope.row' ></stateDiv>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

    </el-col>
</template>
<script>
    import { mapGetters } from 'vuex';
    import stateDiv from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                input:"",
                stateData:'',
                inforData:[],
                TableData:[],
                listLoading:false,
                audit_count:"",
            }
        },
        components: {
            stateDiv,
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action'
            ])
        },
        mounted(){

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },
            fileFun(val){
                if(val){
                    return val
                }else{
                    return '---'
                }
            },
            fileFun1(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            mhtFun(val){
                if(val){
                    if(val.title){
                        return val.title
                    }else{
                        return '--'
                    }
                }else{
                    return '--'
                }
            },
            nameFun(val){
                if(val){
                    if(val.business0){
                        return val.business0.name
                    }else{
                        return '--'
                    }
                }else{
                    return '---'
                }
            },
        },
          watch:{
              xieyiData(val){
                  for(let i = 0;i<this.audit_action.length;i++){
                      if(this.audit_action[i].action_name == 'contract'){
                          this.audit_count = this.audit_action[i].audit_count;
                      }
                  }
                  for(let n = 0;n<val.data.length;n++){
                      val.data[n]['audit_countType'] = this.audit_count;
                  }
                  this.TableData = val.data;
              },
          },

      created() {

      },
        props: ['xieyiData']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    .product{
        .cusmessage{
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 17px;
            border-bottom: 1px solid #e6e6e6;
        }
        .table{
            margin-top: 20px;
        }
    }

</style>
