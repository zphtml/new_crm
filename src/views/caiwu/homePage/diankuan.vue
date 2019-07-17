<template>
       <el-row style="" class="Alladvances">
           <p class="crm_title">
               <i class="crm_line"></i>
               <span  style="cursor: pointer" @click="huitui">
                   财务总览>
               </span>
                总垫款

           </p>

           <el-col :span="24" style="margin-top:10px">
               <div style="margin-bottom: 20px;height: 20px;">
                   <el-button type="primary" style="float: right" size="mini" @click="out">导出</el-button>
                   <div style="float: left">
                        <span style="font-size: 12px;    margin-top: 8px;"> 截止日期：</span>
                       <el-date-picker
                               size="mini"
                               v-model="dataInput"
                               type="date"
                               :clearable="false"
                               @change="changedate"
                               style="width: 160px"
                               placeholder="选择日期范围"
                               :picker-options="pickerOptions0">
                       </el-date-picker>
                    </div>

               </div>
               <el-table
                       v-loading="loading"
                       :data="item"
                       show-summary
                       class="vue-table"
                       border
                       height="600"
                       style="width: 100%">
                   <el-table-column
                           width="200"
                            :label="$t('titles.customer')">
                       <template slot-scope="scope">
                           {{scope.row.advertiser}}
                       </template>
                   </el-table-column>
                   <el-table-column
                           width="100"
                           label="销售">
                       <template slot-scope="scope">
                           {{scope.row.market}}
                       </template>
                   </el-table-column>
                   <el-table-column
                           width="100"
                           label="AE">
                       <template slot-scope="scope">
                           {{scope.row.ae}}
                       </template>
                   </el-table-column>
                   <el-table-column
                           width="150"
                           label="垫款/逾期">
                       <template slot-scope="scope">
                           <p>{{scope.row.yue  }}</p>
                           <p style="font-size:14px;color:red;">{{scope.row.yuqi }}</p>
                       </template>
                   </el-table-column>
                   <el-table-column
                           label="回款记录">
                       <template slot-scope="scope">
                            <template v-for="item in scope.row.huikuan_record">
                                <span style="display: inline-block;text-align: center;vertical-align: middle">
                                    <p>({{item.money}})</p>
                                    <p>{{item.payment_time}}</p>
                                </span>
                                <span style="display: inline-block;width: 30px;height: 1px;vertical-align: middle;border: 1px solid #ccc" class="heng"></span>

                            </template>


                       </template>
                   </el-table-column>
               </el-table>
           </el-col>
       </el-row>
</template>

<script>
    /*eslint-disable */
    import { diankuan_compare} from '@/api/money';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit;
    export default {
      name: 'dashboard',
      data() {
        return {
          item:[],
            loading:true,
            dataInput: moment().format('YYYY-MM-DD'),
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            diankuan_compare(){
                this.loading = true;
                diankuan_compare({
                    date:moment(this.dataInput).format('YYYY-MM-DD'),
                }).then(response => {
                    this.loading = false;
                    this.item=response.diankuan_huikuan_record
                }).catch(error => {

                });
            },
        }
      },
      computed: {
        ...mapGetters([
          'user',
          'roles'
        ])
      },
      filters: {
        cur: function (value) {
          return moment(value*1000).format('YYYY-MM-DD')
        },
      },
      methods: {
          //选择日期
          changedate(){

             this.diankuan_compare()

          },

        out(){
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel');
            const tHeader = [this.$t('titles.customer'),
              '销售','AE', '垫款总额（元）','逾期金额','逾期比例'];
            const filterVal = ['advertiser','market', 'ae','yue','yuqi','percent'];
            const list = this.item;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '总垫款');
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v =>
              filterVal.map(j => {
                  if(j== 'percent'){
                      const total = Number(v['yue'].replace(/,/gi,''));
                      const yuqi = Number(v['yuqi'].replace(/,/gi,''));
                      return yuqi/total * -1;
                  }else{
                      return v[j];
                  }
              })
          )
        },
        huitui(){
            this.$router.push({ name: 'FinancialOverview' });
        },
        submitForm(){

        },

      },
      watch: {
        id: function (val) {
        },
      },
      created() {
        this.diankuan_compare()
      }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
