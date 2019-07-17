<template>
    <el-row class="calendar">
        <el-col :span="24" >
            <el-col :span="24" style="padding: 0">
                <el-date-picker
                        style="margin-bottom: 10px"
                        v-model="month"
                        @change="getdate"
                        type="month"
                        size="mini"
                        placeholder="选择月">
                </el-date-picker>
            </el-col>
            <el-col :span="24" style="padding: 0">
                <el-col :span="15" style="padding: 0">
                    <Progress  ref="get_money"></Progress>
                </el-col>
                <el-col :span="9" style="padding-top: 32px">
                    <el-button  type="primary" size="mini" @click="add_backnoney">新增回款</el-button>
                </el-col>
            </el-col>
            <el-col :span="24" style="padding: 0">
                <el-radio-group v-model="look_infor_name" size="mini" style="margin:0 0 10px 0"  @change="change_look">
                    <el-radio-button label="日历视图"></el-radio-button>
                    <el-radio-button label="公司视图"></el-radio-button>
                </el-radio-group>
            </el-col>
            <!--显示日历视图-->
            <el-col :span="24" v-if="look_infor_name == '日历视图'" style="padding: 0">
                <el-col :span="15" style="padding-left: 0">
                    <el-col :span="24" style="padding: 0" v-loading="listLoading" >
                        <div class="header">
                            <div class="list">
                                周一
                            </div>
                            <div class="list">
                                周二
                            </div>
                            <div class="list">
                                周三
                            </div>
                            <div class="list">
                                周四
                            </div>
                            <div class="list">
                                周五
                            </div>
                            <div class="list week">
                                周六
                            </div>
                            <div class="list week">
                                周日
                            </div>
                        </div>
                        <div class="body">
                            <div class="list" v-for="(data,key) in dateArry"  :class="{today :data.date == today,click:key==isactive}" @click="look_infor(data,key)">
                                <div v-if="data.infor != ''" >
                                    <div class="solar_date" >
                                        {{data.num}}
                                    </div>
                                    <template>
                                        <back_money_pie  style="float: right" v-if="key == 10" ></back_money_pie>
                                    </template>
                                    <div class="back_money " >
                                        <img src="./jiao.png" style="width: 25px;" alt="">
                                    </div>
                                    <div  slot="reference"  style="font-size: 12px;margin-top: 7px;color: red;text-align: center">
                                            {{data.infor| currency('') }}
                                    </div>
                                    <div style="font-size: 12px;">
                                        <el-progress status="success"  :text-inside="true" :stroke-width="14" :percentage="data.jindu"></el-progress>
                                    </div>
                                </div>
                                <div v-else >
                                    <div class="solar_date">
                                        {{data.num}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <!--<el-col :span="24" style="padding-right: 20px">-->
                    <!--<div class="h_calendar_exp">-->
                    <!--<span>-->
                    <!--<span class="color_1"></span>已还款-->
                    <!--</span>-->
                    <!--<span>-->
                    <!--<span class="color_2"></span>未还款-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</el-col>-->
                </el-col>
                <el-col :span="9">
                    <div v-show="click_date" style="width: 100%;height: 400px;line-height:400px;border: 1px dashed black;text-align: center">
                        <span style="font-size: 12px">点击日历视图查看</span>
                    </div>
                    <tableList ref="dateList" v-show="!click_date" ></tableList>

                </el-col>
                <el-col :span="24" style="padding: 0">
                <p class="crm_title" style="margin: 10px 0">
                    <i class="crm_line"></i>
                    <span  style="cursor: pointer" >
                   逾期列表 <span style="font-size: 12px">({{this.start_date}}-{{this.end_date}})</span>
               </span>
                </p>
                </el-col>

                <el-col :span="24">
                    <el-table
                            highlight-current-row v-loading="list_y_Loading"  border
                            :data="recordTable"
                            class="vue-table"
                            height="430"
                            style="width: 100%;">
                        <el-table-column
                                label="公司名称">
                            <template slot-scope="scope">
                                {{scope.row.ad_name }}

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="计划回款">
                            <template slot-scope="scope">
                                {{scope.row.plan| currency('') }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="实际回款">
                            <template slot-scope="scope">
                                {{scope.row.repay | currency('') }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="负责销售">
                            <template slot-scope="scope">
                                {{scope.row.uname }}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>

            </el-col>
            <!--显示表格-->
            <el-col :span="24"  style="padding: 0" v-if="look_infor_name == '公司视图'">
                <div style="text-align: right;margin-bottom: 10px">
                    <el-button type="primary" size="mini" @click="getExcel">导出</el-button>
                </div>
                <el-table
                        highlight-current-row v-loading="list_g_Loading"  border
                        :data="overdueTable"
                        class="vue-table"
                        height="600"
                        style="width: 100%;">
                    <el-table-column
                            label="公司名称">
                        <template slot-scope="scope">
                            {{scope.row.adname }}

                        </template>
                    </el-table-column>
                    <el-table-column
                            label="计划回款">
                        <template slot-scope="scope">
                            {{scope.row.money| currency('') }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="实际回款">
                        <template slot-scope="scope">
                            {{scope.row.huikuan | currency('') }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="回款百分比">
                        <template slot-scope="scope">
                            <!--<span :class="{colorGreen:Number(scope.row.huikuan)*100/Number(scope.row.money)>=100}">-->
                            <!--</span>-->
                            {{ scope.row.ratio }}%

                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="负责销售">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                {{scope.row.name  }}

                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                            header-align="center"
                            label="查看详情">
                        <template slot-scope="scope">
                                <div  slot="reference" style="font-size: 13px;text-decoration: underline;color: #2caf37;cursor: pointer;text-align: center" @click="examineInfor(scope.row)">查看</div>
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
                            :total="backMoneyTableLength"
                            style='text-align: right;'>
                    </el-pagination>
                </div>
                <modification_tan ref="set_huikuan" @getNewDate="getNewDate"></modification_tan>

            </el-col>
            <!--弹窗 新增回款-->
            <el-dialog title="新增回款"  :visible.sync="addFormVisible" @close="addFormVisible = false"  :close-on-click-modal="false" class="tan_shiftTo tan2" >
                <ul class="shiftTo" >
                    <li>
                        <p class="first_p" style="width: 65px">公司名称</p>
                        <p class="last_p" style="width: 200px">
                            <el-select filterable v-model="company_name" clearable  placeholder="请选择">
                                <el-option
                                        v-for="(item,index) in companyData"
                                        :key="item.id"
                                        :label="item.advertiser"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                        <i class="el-icon-loading" v-if="loading_icon"></i>
                    </li>
                    <li>
                        <p  class="first_p" style="width: 65px">回款日期</p>
                        <p class="last_p" style="position: relative">
                            <el-date-picker
                                    :clearable=false
                                    v-model="back_date"
                                    type="date"
                                    range-separator="-"
                                    size="mini"
                                    style="width: 200px"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </p>
                    </li>
                    <li>
                        <p  class="first_p" style="width: 65px;">回款金额</p>
                        <p class="last_p" style="position: relative;width: 200px">
                            <el-input class="tan_input" type="text"></el-input>
                            <input style="line-height: normal; border: none;font-size: 12px;height: 23px;padding-left: 10px ;position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                                   type="number" v-model="money"
                                   name="mouse2"
                                   placeholder="回款金额"
                                   onmousewheel="return false;">
                        </p>
                    </li>
                    <li>
                        <p  class="first_p" style="width: 65px;    vertical-align: top;">回款备注</p>
                        <p class="last_p" style="position: relative;width: 200px">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea_note">
                            </el-input>
                        </p>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_backMoney" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
            </el-dialog>
            <!--弹窗 查看详情-->
            <el-dialog title="公司回款列表"  :visible.sync="companyDetails" @close="companyDetails = false"  :close-on-click-modal="false" class="tan_shiftTo tan1" >
                <span style="font-size: 13px;margin: 5px 0 10px 0;">
                   公司名称:  {{adname}}
                </span>
                <el-table
                        class="vue-table"
                        border
                        height="450"
                        :data="advertiserList">
                    <el-table-column label="回款日期">
                        <template slot-scope="scope">
                            {{scope.row.receivable_day | ctimeData }}
                        </template>
                    </el-table-column>
                    <el-table-column label="计划回款">
                        <template slot-scope="scope">
                            {{scope.row.money  }}
                        </template>
                    </el-table-column>
                    <el-table-column   label="实际回款">
                        <template slot-scope="scope">
                            {{scope.row.huikuan  }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="修改">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span style="text-decoration: underline;cursor: pointer;color: green" @click="set_backmoney(scope.row)">修改</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>

        </el-col>

    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { customer_listPost,huikuan_plan_addru,get_huikuan_plan_group ,up_pla,get_overdue_ad,huikuan_plan_list_ad,huikuan_ad_plan_list} from '@/api/kehu';
    import tableList from './tableList';
    import Progress from './Progress ';
    import modification_tan from './modification_tan';

    import back_money_pie from '../echart/pie';
    import moment from "moment"
    export default {
        name: 'dashboard',
        data() {
            return {
                month:moment().format('YYYY-MM-01'),
                today:moment().format('YYYY-MM-DD'),
                click_date:true,
                listLoading:true,
                isactive:-1,
 //显示日历视图-----------------
                this_date:'',
                dateArry:{},
                getDateArry:function () {
                    this.list_date = [];
                    let n = 0;
                    let week = moment(this.this_date).days()==0?7:moment(this.this_date).days();
                    let alldate = moment(this.this_date).daysInMonth() + week-1;
                   this.dateArry = {}

                    for(let a = 1;a<=42;a++){
                        if(a<moment(this.this_date).days()){
                            this.dateArry['null'+a] = {
                                name:'',
                                date:'null'+a,
                                num:'',
                                infor:'',
                            }

                        }else if(n<moment(this.this_date).daysInMonth()){
                            n++;
                            let formatName = '';
                            if(n<10){
                                formatName =  moment(this.this_date).format('YYYY') +'-'+ moment(this.this_date).format('MM')+'-'+'0'+n;
                            }else{
                                formatName =  moment(this.this_date).format('YYYY') +'-'+ moment(this.this_date).format('MM')+'-'+n;
                            }
                            this.dateArry[moment().format(formatName)] = {
                                name:'',
                                date:moment().format(formatName),
                                num:n,
                                infor:'',
                            }

                        }else{
                            this.dateArry['null'+a] = {
                                name:'',
                                date:'null'+a,
                                num:'',
                                infor:'',
                            }

                        }

                    }
                },
//新增回款
                addFormVisible:false,
                loading_icon:true,
                company_name:'',
                companyData:[],
                money:'',
                // company
                textarea_note:'',
                back_date:moment().format('YYYY-MM-DD'),
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now()- 8.64e7;//不算今天往后禁止
                    }
                },
                customer_listPost:function(page,num,val){
                    customer_listPost({
                        page:'999999',
                        num:'1',
                        search:{
                            search:{
                                qiankuan:1,
                            }
                        }
                    }).then(response => {
                        this.loading_icon = false;
                        this.companyData = response.list.data;
                    }). catch(err => {this.$message.error('获取失败');this.loading_icon = false;});
                },
                huikuan_plan_addru:function(){
                    this.addFormVisible = false;
                    huikuan_plan_addru({
                        advertiser:this.company_name,
                        submituser:this.user.id,
                        receivable_day:this.back_date,
                        money:this.money,
                        note:this.textarea_note,
                    }).then(response => {
                            if(response.code == '200'){
                                if(this.look_infor_name == '日历视图'){
                                    this.get_huikuan_plan_group();
                                    this.get_overdue_ad()
                                }else{
                                    this.huikuan_plan_list_ad()
                                }
                                this.$refs.get_money.get_money(this.month );
                            }else{
                                this.$message.error('获取失败')
                            }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                get_huikuan_plan_group:function(){
                    get_huikuan_plan_group({
                        start_date:moment(this.month).format('YYYY-MM-DD'),
                        end_date:moment(this.month).format('YYYY-MM-'+moment(this.this_date).daysInMonth()),
                    }).then(response => {
                        if(response.code == '200'){

                            this.getDateArry()
                            for(let data in response.data){
                                this.dateArry[data].infor = response.data[data].money
                                this.dateArry[data].jindu = Number((response.data[data].jindu).toFixed(2))
                            }
                            this.listLoading = false;
                        }else{
                            this.$message.error('获取失败')
                        }

                    }). catch(err => {this.$message.error('获取失败');this.loading_icon = false;});
                },
  //未回款逾期列表
                list_y_Loading:true,
                recordTable:[],
                start_date:'',
                end_date:'',
                get_overdue_ad:function (start_date,end_date) {
                    get_overdue_ad({
                        start_date:this.start_date,
                        end_date:this.end_date,
                        page:999,
                        num:1,
                    }).then(response => {
                        this.list_y_Loading = false;
                        if(response.code == '200'){
                            this.recordTable = response.data;
                        }else{
                            this.$message.error('获取失败');
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
 //显示表格---------------------------------------------------
                look_infor_name:'日历视图',
                overdueTable:[],
                advertiser_oneday_List:[],
                list_g_Loading:true,
                companyDetails:false,
                adname:'',
//分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                backMoneyTableLength:12,
                huikuan_plan_list_ad:function (val) {
                    this.list_g_Loading = true;
                    huikuan_plan_list_ad({
                        start_date:moment(this.month).format('YYYY-MM-DD'),
                        end_date:moment(this.month).format('YYYY-MM-'+moment(this.this_date).daysInMonth()),
                        page:this.pageSize,
                        num:this.num,
                    }).then(response => {
                        this.list_g_Loading = false;
                        if(response.code == '200'){
                            this.overdueTable = response.data.data;
                            this.backMoneyTableLength = response.data.totalCount
                        }else{
                            this.$message.error('获取失败');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //点击日期查看回款列表
                advertiser_id:'',
                advertiserList:[],
                huikuan_ad_plan_list:function (val) {
                    huikuan_ad_plan_list({
                        start_date:moment(this.month).format('YYYY-MM-DD'),
                        end_date:moment(this.month).format('YYYY-MM-'+moment(this.this_date).daysInMonth()),
                        page:'99999',
                        num:1,
                        advertiser_id:this.advertiser_id,
                    }).then(response => {
                        if(response.code == '200'){
                            this.advertiserList = response.data;
                        }else{
                            this.$message.error('获取失败');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
 //修改回款日期
                set_backmoney(val){
                    this.$refs.set_huikuan.set_backmoney(val );
                },
            }
        },
        components: {
            back_money_pie,
            tableList,
            Progress,
            modification_tan
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        mounted(){
             this.this_date =  moment(this.month).format('YYYY-MM-DD');
             this.get_huikuan_plan_group();
            if(this.this_date == moment().format('YYYY-MM-01')){
                this.start_date = moment().format('YYYY-MM-01');
                this.end_date = moment().format('YYYY-MM-DD');
            }else{
                this.start_date = val;
                this.end_date = moment(val).format('YYYY-MM-'+moment(val).daysInMonth())
            }
            this.$refs.get_money.get_money(this.month );
            this.get_overdue_ad()
        },
        methods: {
            getdate(){
                if(this.look_infor_name == '日历视图'){
                    this.listLoading = true;
                    this.this_date = moment(this.month).format('YYYY-MM-DD');
                    this.get_huikuan_plan_group();
                    this.get_overdue_ad()
                    this.$refs.dateList.backmoneytableChange(this.advertiser_oneday_List );
                }else{
                    this.huikuan_plan_list_ad()
                }
                this.$refs.get_money.get_money(this.month );
            },
 //  查看展示方式
            change_look(){
                if(this.look_infor_name == '日历视图'){
                    this.this_date = moment(this.month).format('YYYY-MM-DD');
                    this.get_huikuan_plan_group();
                    this.listLoading = true;
                    this.get_overdue_ad();
                    this.$refs.dateList.backmoneytableChange(this.advertiser_oneday_List );
                }else{
                    this.huikuan_plan_list_ad()
                    this.list_g_Loading = true;
                }
            },
 //查看还款计划
            look_infor(val,index){
                if(val.num != ''){
                    this.click_date = false;
                    this.isactive=index;
                    this.advertiser_oneday_List = val;
                    this.$refs.dateList.backmoneytableChange(this.advertiser_oneday_List );
                }

            },
//新增回款
            add_backnoney(){
                this.loading_icon = true;
                this.addFormVisible = true;
                this.customer_listPost()
            },
//提交
            pull_backMoney(){

                if(this.company_name == ''){
                    this.$message({
                        message: '请选择公司名称',
                        type: 'warning'
                    });
                }else if(this.money == ''){
                    this.$message({
                        message: '请输入回款金额',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('是否新增回款任务, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.huikuan_plan_addru();


                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消添加'
                        });
                    });
                }
            },
 // ----------------------------------表格--------------------------
 //  导出
            getExcel(){
                huikuan_plan_list_ad({
                    start_date:moment(this.month).format('YYYY-MM-DD'),
                    end_date:moment(this.month).format('YYYY-MM-'+moment(this.this_date).daysInMonth()),
                    page:99999,
                    num:1,
                }).then(response => {
                    this.list_g_Loading = false;
                    if(response.code == '200'){
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '计划回款', '实际回款','回款百分比','负责销售'];
                            const filterVal = ['adname', 'money','huikuan', 'ratio','name'];
                            const list = response.data.data;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '回款计划列表');
                        })
                    }else{
                        this.$message.error('获取失败');
                    }
                }). catch(err => {this.$message.error('获取失败');});
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
 // 查看详情
            examineInfor(val){
                this.advertiserList = [];
                this.companyDetails = true;
                this.adname = val.adname;
               this.advertiser_id =  val.advertiser;
               this.huikuan_ad_plan_list();
            },
            //分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.huikuan_plan_list_ad()
            },
            handleCurrentChange(val) {
                this.num = val;
                this.huikuan_plan_list_ad()
            },
//还款修改刷新
            getNewDate(){
                this.$refs.get_money.get_money(this.month );
                this.huikuan_plan_list_ad();
            },
        },
        watch:{

        },
        filters: {
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/tan.scss";

    .calendar {
        .header {
            width: 100%;
            background: #e0f4d8;
            display: flex;
            .list {
                width:14.285714285714286%;
                height: 35px;
                line-height: 35px;
                text-align: center;
                margin-left: 5px;
                display: inline;
                color: #25992e;
                font-size: 14px;
                font-family: "Microsoft YaHei";
            }
            .week {
                color: #ed6d23;
            }
        }
        .body {
            width: 100%;
            .list {
                width: 14.285714285714286%;
                height: 66px;
                float: left;
                border: 1px solid #f3f3f4;
                cursor: pointer;
                position: relative;
                .solar_date {
                    width: 25px;
                    font-size: 18px;
                    font-weight: 600;
                    padding: 6px 20px 0;
                    line-height: 23px;
                    height: 23px;
                    color: #555;
                    z-index: 999;
                }
                .el-progress-bar__outer {
                    background: #c0c9de;
                }
            }
            .list:hover{
                background:#dadff7;
            }
            .back_money {
               position: absolute;
                left: 0;
                top: 0;
                z-index: 99;
            }
            .modify {
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 99;
            }
            .today {
                border: 2px solid #ff8817;
                box-sizing: border-box;
            }
            .click {
                background: #dadff7;
                color: white;
            }
        }
        .h_calendar_exp {
            width: 560px;
            height: 65px;
            margin-top: 5px;
            font-size: 12px;
            text-align: right;
            .color_1 {
                display: inline-block;
                width: 20px;
                height: 10px;
                background: #9BD16F;
            }
            .color_2 {
                display: inline-block;
                width: 20px;
                height: 10px;
                background: #D07070;
            }
        }
        .tan1 {
            .el-dialog {
                width: 600px;
                margin-top: 30px!important;
            }
        }
        .tan2 {
            .el-dialog {
                width: 400px;
                margin-top: 30px!important;
            }
        }
        .colorGreen {
            color: #19da18;
        }
    }
</style>
