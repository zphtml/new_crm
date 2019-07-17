<template>
    <el-col :span="24" class="baohanxufei">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="8" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                包含充值信息
            </el-col>
            <el-col :span="16" style="padding-left: 0">
                账户币：
                <span style="color: red">
                    {{showmoney  | currency('')}}
                </span>
                &nbsp;
                &nbsp;
                实付金额：
                <span style="color: red">
                    {{s_money  | currency('')}}
                </span>
                <el-button  type="success" plain   style="float: right;padding: 5px" size="small"  @click="export2Excel">导出Excel</el-button>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;">

            <el-table
                    :data="tabledata"
                    show-summary
                    class="vue-table"
                    border
                    height="300"
                    style="width: 100%">

                <el-table-column
                        label="账户名称">
                    <template slot-scope="scope">
                        <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            {{scope.row.a_users}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="账户币">
                    <template slot-scope="scope">
                        {{scope.row.show_money }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="xf_cost"
                        label="实付金额">
                    <template slot-scope="scope">
                        {{scope.row.xf_cost }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fk_money"
                        label="抵扣金额">
                    <template slot-scope="scope">
                        {{scope.row.fk_money }}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'媒体'+$t('titles.fandian')">
                    <template slot-scope="scope">

                        {{scope.row.rebates_proportion}}%

                    </template>
                </el-table-column>
                <el-table-column
                        :label="'代理'+$t('titles.fandian')">
                    <template slot-scope="scope">
                        {{scope.row.dl_fandian}}%
                    </template>
                </el-table-column>
                <el-table-column
                        label="充值时间">
                    <template slot-scope="scope">
                        {{scope.row.payment_time | time}}
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;font-weight:bold;;margin-top: 20px;">
            <el-col :span="8" style="padding-left: 0">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
               抵扣信息
            </el-col>
            <el-col :span="16" style="padding-left: 0">
                账户币：
                <span style="color: red">
                    {{show_dikou_money  | currency('')}}
                </span>
                &nbsp;
                &nbsp;
                抵扣金额：
                <span style="color: red">
                    {{s_dikou__money  | currency('')}}
                </span>

            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;padding: 0;font-size: 12px;">
            <el-table
                    :data="bank_tabledata"
                    class="vue-table"
                    border

                    show-summary
                    height="300"
                    style="width: 100%">
                <el-table-column
                        label="账户名称">
                    <template slot-scope="scope">
                        <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            {{scope.row.a_users}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="抵扣类型">
                    <template slot-scope="scope">
                        {{scope.row.type  | typeName}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="账户币">
                    <template slot-scope="scope">
                        {{scope.row.show_money  | currency('')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fk_money"
                        label="抵扣金额">
                    <template slot-scope="scope">
                        {{scope.row.fk_money | currency('')}}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'媒体'+$t('titles.fandian')">
                    <template slot-scope="scope">
                        {{scope.row.rebates_proportion}}%
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'代理'+$t('titles.fandian')">
                    <template slot-scope="scope">
                        {{scope.row.dl_fandian}}%
                    </template>
                </el-table-column>
                <el-table-column
                        label="充值时间">
                    <template slot-scope="scope">
                        {{scope.row.payment_time | time}}
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
                dakuan_data:[],
                input:"",
                account:true,
                showmoney:0,
                s_money:0,
                show_dikou_money:'',
                s_dikou__money:'',
                tabledata:[],
                bank_tabledata:[],
            }
        },
          filters: {
            time: function (value) {
              return moment(value*1000).format('YYYY-MM-DD')
            },
              typeName(val){
                  if(val == 1){
                      return '退款'
                  }else if(val == 2){
                      return '保证金退款'
                  }else if(val == 3){
                      return '补款'
                  }else if(val == 4){
                      return '备款账户退款'
                  }
              },
          },
          watch:{
              item(val){
                  this.dakuan_data = val;
                  this.tabledata = val.renew;
                   this.showmoney= 0;
                   this.s_money= 0;
                  this.s_dikou__money = 0;
                  this.show_dikou_money = 0;
                  for(let i=0;i< this.tabledata.length;i++){
                      this.showmoney+=Number( this.tabledata[i].show_money);
                      this.s_money+=Number( this.tabledata[i].xf_cost);
                  }
                  for(let i=0;i< val.tuikuan.length;i++){
                      this.show_dikou_money+=Number( val.tuikuan[i].show_money);
                      this.s_dikou__money+=Number( val.tuikuan[i].fk_money);
                  }
                  this.bank_tabledata = val.tuikuan
            },
          },
        methods:{
          set(){
            this.$emit('newcontact', [this.item1,this.contact]);
          },
          del(val){
            this.$emit('del', [val,this.item1.id]);
          },
            //导出excel
            export2Excel(){
                let newTable = [],
                 tableList = [];
                newTable = JSON.parse(JSON.stringify(this.dakuan_data));
                newTable.tuikuan.map(function (item) {
                    item.xf_cost = -  item.fk_money;
                })
                tableList = JSON.parse(JSON.stringify(newTable.renew.concat( newTable.tuikuan )));
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                    const tHeader = ['账户名称','类型','账户币','实付金额','媒体'+this.$t('titles.fandian'),'代理'+this.$t('titles.fandian'),'充值时间'];
                    const filterVal = ['a_users','type', 'show_money','xf_cost','rebates_proportion','dl_fandian','payment_time'];
                    const list = tableList;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '打款');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if(j == 'payment_time'){
                        v[j] =  moment(v[j]*1000).format('YYYY-MM-DD');
                    }
                    if(j == 'type'){
                        if( v[j] == 1){
                            v[j]  =  '退款';
                        }else if( v[j] == 2){
                            v[j]  =  '保证金退款';
                        }else if( v[j] == 3){
                            v[j]  =  '补款';
                        }else if( v[j] == 4){
                            v[j]  =  '备款账户退款';
                        }

                    }

                   return v[j]
                }))
            },
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
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
