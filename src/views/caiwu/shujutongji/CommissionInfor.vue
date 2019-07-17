<template>
    <div class="commissionInfor" >
        <el-row class="compactBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpxs_tc">销售提成</span>><span>{{ xs_name }}</span>
            </p>
            <el-col :span="24" class="compactListTabs">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="kehuInfor" >
                    <el-tab-pane label="客户详情" name="first">
                        <div class="btn_down">
                            <span class="zhb" v-bind:class="{ xjColor:zhbshow }" @click="zhbColorBtn(zhbshow)">订单</span>
                            <span class="xj " v-bind:class="{ xjColor:xjshow}" @click="xjColorBtn(xjshow)">公司</span>
                            <img class="iconLeft" src="../../../assets/xuanzhuan_left.png" alt="">
                            <img class="iconRight" src="../../../assets/xuanzhuan_left.png" alt="">
                        </div>
                        <el-date-picker
                                v-model="date_tc"
                                type="daterange"
                                @change="date_xs"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                        <el-col :span="24" class="gongsi"  v-bind:class="{accountShow:accountShow}">
                            <el-col :span="24" style="height: 250px;" >
                                <lineAndBar :screen_lineAndbar="screen_lineAndbar"></lineAndBar>
                            </el-col>
                            <el-col :span="24" class="xsTable">
                                <div>
                                    <el-table
                                            highlight-current-row v-loading="listLoading"  border
                                            :data="Table_kh"
                                            class="vue-table"
                                            height="740"
                                            :default-sort = "{prop: 'date', order: 'descending'}"
                                            style="width: 100%">
                                        <el-table-column
                                                :label="$t('titles.customer')">
                                            <template slot-scope="scope">
                                                <div >
                                                    <img src="http://test.myushan.com/ZPCRM1.png" v-if="scope.$index == 0" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                                    <img src="http://test.myushan.com/ZPCRM2.png" v-if="scope.$index == 1" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                                    <img src="http://test.myushan.com/ZPCRM3.png" v-if="scope.$index == 2" style="width: 25px;vertical-align: middle;margin-right: 10px" alt="">
                                                    <img src="http://test.myushan.com/ZPCRM3.png" v-if="scope.$index > 2" style="width: 25px;vertical-align: middle;margin-right: 10px;opacity: 0" alt="">
                                                    {{ scope.row.advertiser }}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="充值金额">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    {{ scope.row.chongzhimoney | currency('')}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="销售利润">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    {{ scope.row.xiaoshou_lirun | currency('')}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="欠费金额">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    {{ scope.row.qiane | currency('')}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"

                                                label="个人金额">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    {{ scope.row.gefanmoney | currency('')}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="提成">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    {{ scope.row.ticheng_money | currency('')}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- 分页 -->
                                    <div class="block">
                                        <el-pagination
                                                @size-change="handleSizeChange_gs"
                                                @current-change="handleCurrentChange_gs"
                                                :current-page="pageIndex_gs"
                                                :page-sizes="[ 20, 30,40]"
                                                :page-size="pageSize_gs"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="xsTableLength_gs"
                                                style='text-align: right;'>
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col :span="24"  class="dingdan"  v-bind:class="{OrderShow:OrderShow}">
                            <el-col :span="24" class="header">
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;提成</span>
                                <span style="color: #0c91fc;">({{ all_tc | currency('')  }})</span>
                                <span>&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;</span>
                                <span>充值提成</span>
                                <span style="color: #0c91fc;">({{ xf_tc | currency('')  }})</span>
                                <span>&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;</span>
                                <span>退款提成</span>
                                <span style="color: #0c91fc;">({{ tk_tc  | currency('') }})</span>
                                <span>&nbsp;&nbsp;&nbsp;一&nbsp;&nbsp;&nbsp;</span>
                                <span>补款提成</span>
                                <span style="color: #0c91fc;">({{ bk_tc  | currency('') }})</span>
                            </el-col>
                            <el-col :span="24"  class="pie">
                                <el-col :span="4"  class="left_pieInfor">
                                    <Pie_tc :PieData="PieData"></Pie_tc>
                                </el-col>
                                <el-col :span="20"  class="right_pieInfor">
                                    <el-col :span="6" v-for="(data,index) in inforData" :key="index"  class="pieInfor">
                                        <el-col :span="24">
                                            <el-col :span="24" class="left_name" style="text-align: center">
                                                <div class="btnColor " :class="{btnColor_a:'1' == data.ht_state,btnColor_b:'2' == data.ht_state,btnColor_c:'3' == data.ht_state,btnColor_d:'4' == data.ht_state}"></div>
                                                <span>
                                                    {{ data.adstatename }}
                                                </span>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-col :span="24" class="right_infor">
                                                <div class="box " :class="{box_a:'1' == data.ht_state,box_b:'2' == data.ht_state,box_c:'3' == data.ht_state,box_d:'4' == data.ht_state}">
                                                    <div class="box_list">
                                                        <span class="box_list_name">客户数量:</span>
                                                        <span>{{ data.adcount | currency('') }}</span>
                                                    </div>
                                                    <div class="box_list">
                                                        <span class="box_list_name">充值金额:</span>
                                                        <span>{{ data.money | currency('') }}</span>
                                                    </div>
                                                    <div class="box_list">
                                                        <span class="box_list_name">欠费金额:</span>
                                                        <span>{{ data.qiane | currency('') }}</span>
                                                    </div>
                                                    <div class="box_list">
                                                        <span class="box_list_name">销售利润:</span>
                                                        <span>{{ data.lirun | currency('') }}</span>
                                                    </div>
                                                    <div class="box_list">
                                                        <span class="box_list_name">提成金额:</span>
                                                        <span>{{ data.ticheng | currency('') }}</span>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-col>
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="select">
                                <el-select v-model="selectData" placeholder="请选择" @change="selectChange">
                                    <el-option
                                            v-for="(item,index) in selectOptions"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.type">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" class="outExcel" @click="outExcel">导出Excel</el-button>
                            </el-col>
                            <el-col :span="24" class="xsTable">
                                <div>
                                    <el-table
                                            highlight-current-row v-loading="listLoading"  border
                                            :data="xsTable"
                                            class="vue-table"
                                            height="740"
                                            :default-sort = "{prop: 'date', order: 'descending'}"
                                            @row-click="clickTr($event)"
                                            style="width: 100%">
                                        <el-table-column
                                                width="180"
                                                :label="$t('titles.customer')">
                                            <template slot-scope="scope">
                                                <p>{{ scope.row.advertiser }}</p>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="产品线">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.name }}</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="充值金额">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.money | currency('')}}</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="销售利润">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.xs_lirun | currency('')}}</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                sortable
                                                label="欠费金额">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.xf_qiane | currency('')}}</p>
                                                </div>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                header-align="center"
                                                :label="'个人'+$t('titles.fandian')+'金额'">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.gf | currency('')}}</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="提成点">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p>{{ scope.row.ticheng | currency('')}}%</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="提成">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p v-if="scope.row.tc>0" style="color: red">+{{ scope.row.tc | currency('')}}</p>
                                                    <p v-if="scope.row.tc<0" style="color: green">{{ scope.row.tc | currency('')}}</p>
                                                    <p v-if="scope.row.tc==0">{{ scope.row.tc | currency('')}}</p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="充值时间">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <p >
                                                        {{ scope.row.pay_time }}
                                                    </p>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                header-align="center"
                                                label="更多">
                                            <template slot-scope="scope">
                                                <div style="text-align: center">
                                                    <el-popover
                                                            ref="popover4"
                                                            placement="top"
                                                            width="180"
                                                            trigger="click">
                                                        <el-col :span="24">
                                                            <el-col :span="15" style="text-align: left">
                                                                订单状态
                                                            </el-col>
                                                            <el-col :span="9" style="text-align: right">
                                                                <p v-if="scope.row.ht_state == 1" style="margin: 0">
                                                                    新客
                                                                </p>
                                                                <p v-if="scope.row.ht_state == 2" style="margin: 0">
                                                                    老客
                                                                </p>
                                                                <p v-if="scope.row.ht_state == 3" style="margin: 0">
                                                                    老客新媒
                                                                </p>
                                                                <p v-if="scope.row.ht_state == 4" style="margin: 0">
                                                                    公司分配
                                                                </p>
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="24">
                                                            <el-col :span="15" style="text-align: left">
                                                                媒介销售{{$t('titles.fandian')}}
                                                            </el-col>
                                                            <el-col :span="9" style="text-align: right">
                                                                {{ scope.row.xs_fd }}%
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="24">
                                                            <el-col :span="15" style="text-align: left">
                                                                客户{{$t('titles.fandian')}}
                                                            </el-col>
                                                            <el-col :span="9" style="text-align: right">
                                                                {{ scope.row.fandian }}%
                                                            </el-col>
                                                        </el-col>
                                                        <el-col :span="24">
                                                            <el-col :span="15" style="text-align: left">
                                                                客户个人{{$t('titles.fandian')}}
                                                            </el-col>
                                                            <el-col :span="9" style="text-align: right">
                                                                {{ scope.row.kh_grfd }}%
                                                            </el-col>
                                                        </el-col>
                                                    </el-popover>
                                                    <span v-popover:popover4>查看</span>
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
                                                :total="xsTableLength"
                                                style='text-align: right;'>
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-col>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="个人评估" name="second" class="gerenInfor" >
                        <el-col :span="24"   v-loading="loading">
                            <el-radio-group v-model="radio_date" @change="radioDate">
                                <el-radio-button :label="date_year_a"></el-radio-button>
                                <el-radio-button :label="date_year_b"></el-radio-button>
                                <el-radio-button :label="date_year_c"></el-radio-button>
                            </el-radio-group>
                            <el-date-picker
                                    v-model="yearDate"
                                    @change="datepicker"
                                    align="right"
                                    type="year"
                                    :clearable="false"
                                    placeholder="选择年">
                            </el-date-picker>
                            <el-col :span="24">
                                <line_a :line_a=line_a></line_a>
                            </el-col>
                            <el-col :span="24">
                                <line_b :line_b=line_b></line_b>
                            </el-col>
                        </el-col>

                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { contract_listPost,contract_list,productline} from '@/api/kehu';
    import { market_ticheng,market_ticheng_adstate ,market_ad_ticheng,market_new_customer_cn,market_ticheng_zongji,market_lirun_money_zhexian,market_ad_ticheng_line} from '@/api/money';
    import lineAndBar from './Charts/lineAndBar';
    import Pie_tc from './Charts/pie_tc';
    import line_a from './Charts/line_xs_a';
    import line_b from './Charts/line_xs_b';


    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
                listLoading:false,
                activeName:'first',
                loading:false,
                xs_name:'',
                date_tc:[],
                yearDate:moment().format('YYYY'),
                radio_date:moment().format('YYYY'),
                date_year_a:moment().format('YYYY'),
                date_year_b:moment().subtract(1, 'year').format('YYYY'),
                date_year_c:moment().subtract(2, 'year').format('YYYY'),
                date_gr:'',
                all_tc:"",
                xf_tc:'',
                tk_tc:"",
                bk_tc:'',
                tableData:'',
                screen_lineAndbar:"",
                xsTable:[],
                TableData:[],
                zhbshow:false,
                xjshow:true,
                accountShow:true,
                OrderShow:false,
                PieData:'',
                inforData:[],
                selectData:'全部',
                tcName:'/all',
                selectOptions:[
                    {
                        name:'全部',
                        type:''
                    },
                 {
                    name:'充值',
                    type:'/renew'
                },{
                    name:'退款',
                    type:'/tuikuan'
                },{
                    name:'补款',
                    type:'/bukuan'
                }
                ],
                line_a:'',
                line_b:'',
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                xsTableLength:123,
                //公司分页
                page_gs:'20',
                num_gs:'1',
                pageIndex_gs:1,
                pageSize_gs:20,
                xsTableLength_gs:123,
                market_ticheng:function(typeNmae){
                    market_ticheng({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                        type:this.tcName,
                        perpage:this.page,
                        page:this.num,
                    }).then(response => {
                        this.xsTable = response.data;
                        this.xsTableLength =  Number(response.totalCount);
                    }).catch(error => {

                    });
                },
                market_ticheng_adstate:function(){
                    market_ticheng_adstate({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                    }).then(response => {
                        this.PieData = response;
                        this.inforData = response;
                    }).catch(error => {

                    });
                },
                market_ad_ticheng:function () {
                    market_ad_ticheng({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                    }).then(response => {
                        this.TableData = response;
                        this.xsTableLength_gs = Number(response.totalCount);
                    }).catch(error => {

                    });
                },
                market_ad_ticheng_line:function(){

                    market_ad_ticheng_line({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                        lirun:"xiaoshou_lirun"
                    }).then(response => {
                        this.screen_lineAndbar = response;
                    }).catch(error => {

                    });
                },
                market_lirun_money_zhexian:function(date){
                    market_lirun_money_zhexian({
                        id:this.routeId,
                        date:date,
                    }).then(response => {
                        this.loading = false;
                        this.line_a = response;
                    }).catch(error => {

                    });
                },
                market_new_customer_cn:function(date){
                    market_new_customer_cn({
                        id:this.routeId,
                        date:date,
                    }).then(response => {
                        this.loading = false;
                        this.line_b = response;
                    }).catch(error => {

                    });
                },
                market_ticheng_zongji:function(){
                    market_ticheng_zongji({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                    }).then(response => {
                        this.xf_tc = response.xf;
                        this.tk_tc = response.tuikuan;
                        this.bk_tc = response.bukuan;
                        this.all_tc = Number(this.xf_tc) - Number(this.tk_tc) - Number(this.bk_tc)
                    }).catch(error => {

                    });
                },
                market_tichengExcel:function(){
                    market_ticheng({
                        start:moment(this.date_tc[0]).format('YYYY-MM-DD'),
                        end:moment(this.date_tc[1]).format('YYYY-MM-DD'),
                        id:this.routeId,
                        type:this.tcName,
                        perpage:this.xsTableLength,
                        page:this.num,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.ht_state == 1){
                                item['name_kh'] = '新客'
                            }else if(item.ht_state == 2){
                                item['name_kh'] = '老客'
                            }else if(item.ht_state == 3){
                                item['name_kh'] = '老客新媒'
                            }else if(item.ht_state == 4){
                                item['name_kh'] = '公司分配'
                            }
                            if(item.contract_ent == '1970-01-01'){
                                item['contract_ent'] = "至消费结束"
                            }
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'),'产品线','充值金额', '销售利润', '	欠费金额','个人'+this.$t('titles.fandian')+'金额','提成点','提成','客户个人'+this.$t('titles.fandian'),'媒介销售'+this.$t('titles.fandian'),'销售'+this.$t('titles.fandian'),'客户'+this.$t('titles.fandian'),'客户地址','合同开始时间','合同结束时间','充值时间'];
                            const filterVal = ['advertiser', 'name', 'money','xs_lirun','xf_qiane', 'gf','ticheng','tc','kh_grfd','xs_fd','xs_fd','fandian','name_kh','contract_start','contract_ent','pay_time'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '销售提成');
                        })

                    }).catch(error => {

                    });
                },
            }
        },
        components: {
            lineAndBar,
            Pie_tc,
            line_a,
            line_b

        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list'
            ]),
            Table_kh(){
                return this.TableData.filter((o,i) => i >=(this.pageIndex_gs-1)*this.pageSize_gs&&i<=this.pageIndex_gs*this.pageSize_gs-1);
            }
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.date_tc = [this.$route.query.start,this.$route.query.end];
            this.market_ticheng();
            this.market_ticheng_adstate();
            this.market_ticheng_zongji();
            this.screen_lineAndbar = '';
            this.xs_name = this.$route.query.name;
        },
        methods: {
            outExcel(){
                this.market_tichengExcel();
            },
            selectChange(index){
                this.tcName = index;
                this.market_ticheng()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            handleClick(tab){
                if(tab.label == "个人评估"){
                    this.market_new_customer_cn(moment(this.yearDate).format('YYYY'));
                    this.market_lirun_money_zhexian(moment(this.yearDate).format('YYYY'));
                }else{
                    if(!this.zhbshow){
                        this.market_ticheng();
                        this.market_ticheng_adstate();
                        this.market_ticheng_zongji();
                    }else{
                        this.market_ad_ticheng();
                        this.market_ad_ticheng_line();
                    }
                }
            },
            date_xs(){
                if(!this.zhbshow){
                    this.market_ticheng();
                    this.market_ticheng_adstate();
                    this.market_ticheng_zongji();
                }else{
                    this.market_ad_ticheng()
                    this.market_ad_ticheng_line();
                }


            },
            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.market_ticheng();
            },
            handleCurrentChange(val) {
                this.num = val;
                this.market_ticheng();
            },
            //合同分页
            handleSizeChange_gs(val) {
                this.page_gs = val;
                this.pageSize_gs =val;

            },
            handleCurrentChange_gs(val) {
                this.num_gs = val;
            },
            zhbColorBtn(val){
                if( val == true){
                    this.xjshow =  !this.xjshow;
                    this.zhbshow =  !this.zhbshow;
                    this.accountShow = true;
                    this.OrderShow = false;
                    this.market_ticheng_adstate();

                }

            },
            xjColorBtn(val){
                if( val == true){
                    this.zhbshow =  !this.zhbshow;
                    this.xjshow =  !this.xjshow;
                    this.accountShow = false;
                    this.OrderShow = true;
                    this.market_ad_ticheng();
                    this.market_ad_ticheng_line();
                }

            },
            radioDate(index){
                this.line_b = 1;
                this.line_a = 1;
                this.loading = true;
                this.market_new_customer_cn(index);
                this.market_lirun_money_zhexian(index);
            },
            jumpxs_tc(){
                this.$router.go(-1)
            },
            datepicker(){
                this.line_b = 1;
                this.line_a = 1;
                this.loading = true;
                this.market_new_customer_cn(moment(this.yearDate).format('YYYY'));
                this.market_lirun_money_zhexian(moment(this.yearDate).format('YYYY'));
                if(moment(this.yearDate).format('YYYY') == moment(this.yearDate).format('YYYY') || moment(this.yearDate).format('YYYY')  == moment().subtract(1, 'year').format('YYYY') || moment(this.yearDate).format('YYYY')  == moment().subtract(2, 'year').format('YYYY')){
                    this.radio_date = moment(this.yearDate).format('YYYY');
                }else{
                    this.radio_date = "";
                }
            },
        },
        created() {

        },
        filters:{

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .commissionInfor {
        width:100%;
        .kehuInfor {
            .accountShow {
                opacity: -1;
                height:0;
            }
            .OrderShow {
                opacity: 0;
                height:0;
            }
            .el-tabs__item {
                width:150px;
                text-align: center;
            }
            .el-date-editor {
                width:380px;
                height:34px;
                overflow: hidden;
                padding: 0;
                input{
                    height:33px!important;
                    line-height: 33px!important;
                }
                .el-range__icon {
                    line-height: 25px;
                }
            }
            .btn_down {
                float: right;
                position: relative;
                margin-right: 30px;

                .zhb {
                    margin: 7px 20px 7px 0 ;
                }
                .xj {
                    margin-left: 33px;
                }
                .zhb,.xj{
                    width:55px;
                    height:18px;
                    display: block;
                    line-height: 18px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 3px;
                    cursor: pointer;
                    background: #669fe4;
                    color: white;
                }
                .xjColor {
                    color: #499fe2;
                    background: none;
                    border:1px solid #499fe2;
                }
                .iconLeft,.iconRight {
                    width: 15px;
                    border: 0;
                    position: absolute;
                }
                .iconLeft {
                    top: 28px;
                    left: 11px;
                }
                .iconRight {
                    transform:rotate(-180deg);
                    -ms-transform:rotate(-180deg);
                    -moz-transform:rotate(-180deg);
                    -webkit-transform:rotate(-180deg);
                    -o-transform:rotate(-180deg);
                    top: 11px;
                    right: 13px;
                }
            }
            .gongsi{

                .xsTable {
                    .vue-table {
                        .has-gutter{
                            tr{
                                th:first-child{
                                    .cell {
                                        padding-left: 45px;
                                    }
                                }
                            }
                        }
                        .cell{
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            .xfshow {
                                position: absolute;
                                left: 0;
                                top:0;
                                width: 0;
                                height: 0;
                                border-top: 10px solid #ff4081;
                                border-right: 10px solid transparent;
                            }
                            .appInfor {
                                width: 20px;
                                height: 20px;
                                display: inline-block;
                                text-align: center;
                                line-height: 20px;
                                font-size: 12px;
                                border-radius: 50%;
                                display: inline-block;
                            }
                            .appInfor.qu{
                                color: white;
                                background: #FF8754;
                            }
                            .appInfor.zhi{
                                color: white;
                                background: #3F7FFC;
                            }
                        }
                        .operation {
                            color: #54adff;
                            width:100%;
                            height:100%;
                            vertical-align: middle;
                            font-size: 18px;
                            .line{
                                display: inline-block;
                                width:1px;
                                height:24px;
                                background: #bbbbbb;
                                vertical-align: middle;
                                margin:0 12%;
                            }
                            i{
                                cursor: pointer;
                            }
                        }
                        .start_icon {
                            display: inline-block;
                            margin:0 2%;
                            font-size: 16px;

                        }
                    }
                    .addKehu{
                        position: absolute;
                        top: 23px;
                        left: 20px;
                        font-weight: bold;
                        text-decoration: underline;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }

            }
            .dingdan{
                .header {
                    width:100%;
                    height:40px;
                    line-height: 40px;
                    background:#f2f7ff;
                    border:1px solid #83c4f6;
                    margin-top: 10px;
                    font-size: 12px;
                }
                .pie{
                    margin-top: 20px;
                    .left_pieInfor {
                        height:270px;
                    }
                    .right_pieInfor {
                        .pieInfor {
                            height:270px;
                            padding: 30px 20px;
                            position: relative;
                            .left_name {
                                display: inline-block;
                                position: absolute;
                                .btnColor {
                                    width:15px;
                                    height:15px;

                                    display: inline-block;
                                }
                                .btnColor_a {
                                    background: #11b2f7;
                                }
                                .btnColor_b{
                                    background: #63def9 ;
                                }
                                .btnColor_c {
                                    background: #ffafca;
                                }
                                .btnColor_d {
                                    background: #FF6969;
                                }
                                span{
                                    font-size: 12px;
                                    display: inline-block;
                                    vertical-align: top;
                                }
                            }
                            .right_infor {
                                position: absolute;
                                top:55px;
                                left: 0;
                                right:0;
                                margin:auto;
                                width:85%;
                                .box{
                                    width:100%;
                                    height:180px;

                                    padding: 5px;
                                    .box_list {
                                        height:30px;
                                        line-height: 30px;

                                        font-size: 12px;
                                        .box_list_name {
                                            display: inline-block;
                                            width:65px;
                                            text-align: right;
                                        }
                                    }
                                }
                            }
                            .box_a{
                                background: #11b2f7;
                                .box_list {
                                    border-bottom: 1px dashed #0b7bab;
                                }
                            }
                            .box_b{
                                background: rgba(137,219,249,0.8);
                                .box_list {
                                    border-bottom: 1px dashed #63def9;
                                }
                            }
                            .box_c{
                                background: rgba(249,179,209,0.8);
                                .box_list {
                                    border-bottom: 1px dashed #ffafca ;
                                }
                            }
                            .box_d {
                                background: rgba(255,92,88,0.8);
                                .box_list {
                                    border-bottom: 1px dashed #FF6969 ;
                                }
                            }
                        }
                    }
                }
                .select{
                    position: relative;
                    .el-select {
                        width:280px;
                        margin: 10px 0;
                        input{
                            height:30px!important;
                            line-height: 30px!important;
                        }
                    }
                    .outExcel {
                        width:90px;
                        height:30px;
                        line-height: 30px;
                        padding:0;
                        position: absolute;
                        right:0;
                        text-align: center;
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
                        cursor: pointer;
                        z-index:999;
                        font-size: 12px;
                        top: 8px;
                    }
                }
            }

        }
        .gerenInfor {
            .el-date-editor {
                width:160px;
            }
            .el-input__icon {
                line-height: 25px;
            }
            .el-radio-group {
                display: inline-block;
                vertical-align: top;
            }
            .el-radio-button, .el-radio-button__inner {
                margin-right: 5px;
            }
            .el-radio-button:first-child .el-radio-button__inner,.el-radio-button__inner {
                width: 58px;
                text-align: center;
                padding: 0;
                display: block;
                height: 33px;
                line-height: 33px;
                border-radius: 5px;
                border-left:1px solid #dcdfe6;
            }
        }
    }
</style>
