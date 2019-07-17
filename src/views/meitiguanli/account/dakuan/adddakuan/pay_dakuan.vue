<template>
    <el-row class="media_pay_dakuan">
        <el-row v-for="(data,index) in inforData" :key="index">
            <el-col :span="24" class="list" >
                <el-col :span="12" style="">
                    <span class="title"> 充值时间: </span>
                    <el-date-picker
                            v-model="mt_date"
                            type="daterange"
                            size="mini"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width: 250px">
                    </el-date-picker>
                </el-col>
                <el-col :span="12">
                    <span class="title">付款类型: </span>
                    <el-radio-group    size="mini" v-model="data.meiti_payment_type" >
                        <el-radio  label="">全部</el-radio>
                        <el-radio   label="1">预付</el-radio>
                        <el-radio  label="2">垫付</el-radio>
                    </el-radio-group>
                </el-col>
            </el-col>
            <el-col :span="24"  class="list">
              <el-col :span="12"  style="padding-left: 10px">
                  <span class="title">付款日: </span>
                  <el-input type="number" size="mini" style="display: inline-block;width:100px;"  v-model="data.dk_date"></el-input>
              </el-col>
                <el-col :span="12" style="padding-left: 10px">
                    <span class="title">执行框架: </span>
                    <el-select
                            v-model="data.mhtid"
                            multiple
                            filterable
                            collapse-tags
                            style="width: 300px"
                            size="mini"
                            placeholder="请选择">
                        <el-option
                                v-for="(item,index) in frameOptions"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span>
                    <i class="el-icon-loading" style="font-size: 12px" v-if="el_loading"></i>
                </span>
                </el-col>
            </el-col>
        </el-row>

        <el-col :span="24" style="text-align: center">
            <el-button  type="primary" @click="look">查询</el-button>
        </el-col>
        <el-col :span="24" v-show="dakuan_show">
            <el-col :span="24" style="margin-bottom: 10px">
                <el-checkbox v-model="checkedAll" @change="checkboxALlChange('bei')">全选</el-checkbox>
                <el-input style="width: 200px;margin-left: 10px" size="mini" v-model="dk_input" placeholder="请输账户名称" ></el-input>
                <span style="float: right;font-size: 13px">
                        打款金额：
                        <span style="font-size: 18px">
                            {{ heji | currency('')}}
                        </span>
                    </span>
            </el-col>
          <el-col :span="24">
              <el-table
                      :data="dakuan_Table"
                      border
                      class="vue-table"
                      style="width: 100%">
                  <el-table-column
                          width="50"
                          label="选择">
                      <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.Tablechecked" @change="checkboxChange(scope.row,'bei')"></el-checkbox>
                      </template>
                  </el-table-column>
                  <el-table-column
                          label="账户名称">
                      <template slot-scope="scope">
                          <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                              <span v-if="scope.row.yu_e" style="position: absolute;font-size: 12px;width: 18px;height: 18px;border-radius: 50%;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>
                              {{scope.row.a_users}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column

                          label="付款周期">
                      <template slot-scope="scope">
                          <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                              <span v-if="scope.row.yu_e" style="position: absolute;font-size: 12px;width: 18px;height: 18px;border-radius: 50%;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>
                              {{scope.row.dk_zhouqi | matnum}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column
                          label="付款日">
                      <template slot-scope="scope">
                          <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                              <span v-if="scope.row.yu_e" style="position: absolute;font-size: 12px;width: 18px;height: 18px;border-radius: 50%;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>
                              {{scope.row.dk_date | matnum}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column
                          label="付款类型">
                      <template slot-scope="scope">
                          <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                              <span v-if="scope.row.yu_e" style="position: absolute;font-size: 12px;width: 18px;height: 18px;border-radius: 50%;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>
                              {{scope.row.payment_type | type}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column
                          header-align="center"
                          :label="$t('titles.fandian')">
                      <template slot-scope="scope">
                          <div style="text-align: center">
                              {{scope.row.rebates_proportion}}%
                          </div>

                      </template>
                  </el-table-column>
                  <el-table-column
                          header-align="center"
                          label="欠额">
                      <template slot-scope="scope">
                          <div style="text-align: center">
                              {{scope.row.xf_qiane | matnum}}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column
                          width="120"
                          header-align="center"
                          label="打款金额">
                      <template slot-scope="scope">
                          <div style="text-align: center">
                              <input style="line-height: normal; border: 1px solid #000;font-size: 12px;height: 24px; width: 100px;padding-left:20px;outline: none;z-index:9"
                                     v-if="scope.row.dikou_show"
                                     type="number"
                                     v-model="scope.row.dikou_money"
                                     name="mouse2"
                                     @focus="dikou_focus(scope.row)"
                                     v-on:input="dikou_moneyChange(scope.row)"
                                     placeholder="请输入金额"
                                     onmousewheel="return false;">
                              <span  v-if="!scope.row.dikou_show">{{scope.row.dikou_money}}</span>
                          </div>
                      </template>
                  </el-table-column>
              </el-table>
              <!-- 分页 -->
              <div class="block">
                  <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page.sync="pageIndex"
                          :page-sizes="[ 20, 30,40]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="kehuTableLength"
                          style='text-align: right;'>
                  </el-pagination>
              </div>
          </el-col>
            <el-col :span="24"  style="text-align: right">
                <el-button type="primary" size="mini" @click="next">下一步</el-button>
            </el-col>

        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { meijie_dakuan_add,mcont_renew_list} from '@/api/meitiaccount';
    import {mapGetters} from 'vuex';
    import moment from "moment"
    export default {
        name: 'dashboard',
        components: {

        },
        data() {
            return{
                el_loading:true,
                dakuan_show:false,
                inforData:[{
                    advertiser:'',
                    meiti_payment_type:'',
                    dk_date:'',
                    mhtid:[],
                    start_date:'',
                    end_date:'',
                }],
                meiti:[],
                mt_date:[moment().format('YYYY-01-01'),moment().format('YYYY-MM-DD')],
                //获取媒体
                frameOptions:[],
                meijie_dakuan_add(){
                    meijie_dakuan_add( this.inforData[0].advertiser).then(response => {
                        this.el_loading = false;
                        this.frameOptions=response.m_contract_list;
                        this.meiti=response.AgentCompany
                    }).catch(error => {

                    });
                },
                // 充值，备款
                Tabblefun:[],
                checkedAll:false,
                dk_input:'',
                page:'10',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                xufei_table:[],
                mcont_renew_list:function (mhtid) {
                    mcont_renew_list(mhtid).then(response => {
                        this.Tabblefun = response.filter(function (item, i) {
                            item['Tablechecked'] = false;
                            item['dikou_money'] = 0;
                            item['dikou_show'] = false;
                            return item
                        });
                    }).catch(error => {

                    });
                },
            //    打款金额合计
                heji:0,
                num_clome:0,


            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
            dakuan_Table:function(){
                let tableData = [];
                let _this = this;
                tableData =this.Tabblefun.filter(function (item, i) {

                    if(item.mt_payment_type == null){
                        item.mt_payment_type = "--";
                    }
                    if(!item.a_users){
                        item.a_users = '';
                    }
                    if(item.a_users.indexOf(_this.dk_input)>=0 ){
                        return item
                    }
                });
                this.kehuTableLength = tableData.length;
                return tableData.filter((o,i) => i >=(this.pageIndex-1)*this.pageSize&&i<=this.pageIndex*this.pageSize-1);
            },
        },
        methods: {
            //查看
            look(){
                this.inforData[0].start_date = moment(this.mt_date[0]).format('YYYY-MM-DD');
                this.inforData[0].end_date = moment(this.mt_date[1]).format('YYYY-MM-DD');
                this.heji = 0;
                 this.num_clome = 0;
                 this.dakuan_show = true;
                this.mcont_renew_list(this.inforData[0]);

            },
            //选择备款账户
            //单选
            checkboxChange(val){
                if(val.Tablechecked == true){
                    val.dikou_money = val.xf_qiane;
                    val.dikou_show = true;
                    this.numData = Number(this.heji) + Number(val.dikou_money);
                }else{
                    val.dikou_show = false;
                    this.numData = Number(this.heji) - Number(val.dikou_money);
                    val.dikou_money = 0;
                }
                this.heji=this.numData;
            },
            //全选
            checkboxALlChange(){
                let numberData = 0;
                if(this.checkedAll){
                    this.Tabblefun = this.Tabblefun.filter(function (item, i) {
                        item['Tablechecked'] = true;
                        item.dikou_show = true;
                        item.dikou_money = item.xf_qiane;
                        numberData +=Number(item.dikou_money);
                        return item
                    });
                    this.heji = numberData;
                }else{
                    this.Tabblefun = this.Tabblefun.filter(function (item, i) {
                        item['Tablechecked'] = false;
                        item.dikou_show = false;
                        item.dikou_money = 0;
                        return item
                    });
                    this.heji = "0.00";
                }
            },
            //打款输入
            dikou_focus(val,name){
                this.num_clome = Number(this.heji)-Number(val.dikou_money);
            },
            dikou_moneyChange(val){
                if(Number(val.dikou_money)>Number(val.xf_qiane)){
                    val.dikou_money = val.xf_qiane;
                }else if(Number(val.dikou_money<0)){
                    val.dikou_money = 0;
                }
                this.heji = Number(this.num_clome) + Number(val.dikou_money);
            },
            //备款分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex = val;
            },


            //下一步
            next(){
                if(Number(this.heji)>0){
                    this.$emit('steps',{
                        type:1,
                        dakuan:{
                            mhtid:this.inforData[0].mhtid,
                            dakuan:this.Tabblefun,
                            meiti:this.meiti,
                            dakuan_money:this.heji
                        }});
                }else{
                    this.$message('打款金额必须大于0！！');
                }
                // this.inforData[0].mhtid

            },
        },
        created() {
            this.inforData[0].advertiser = this.$route.query.id;
            this.meijie_dakuan_add();

        },
        filters: {
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD')
            },
            matnum: function (value) {
                if(value){
                    return value
                }else{
                    return '--'
                }
            },
            type: function (value) {
                if(value == 1){
                    return "预付"
                }else if(value == 2){
                    return "垫付"
                }else if(value == 19){
                    return "罚款"
                }else{
                    return '--'
                }
            }
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
.media_pay_dakuan{
    .list {
        margin:10px 0;
        .title {
            font-size: 13px;
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 10px;
        }
    }
}

</style>
