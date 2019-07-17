<template>
    <div class="bondList" >
        <el-row class="bondBox">
            <el-col :span="24">
                <p class="crm_title">
                    <i class="crm_line"></i>
                    <span >打保证金列表</span>
                </p>
            </el-col>
            <el-col :span="24" class="screen" style="margin: 20px 0;">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
                <div class="dateType">
                    <el-select  v-model="date_type" placeholder="请选择" @change="dateTypeChange">
                        <el-option
                                v-for="(item, index) in options_type"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                                :other="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div class="dataInput" >
                    <el-date-picker
                            v-model="dataInput"
                            type="daterange"
                            @change="changedate"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="startInput">
                    <el-select v-model="tuikuan_data" placeholder="是否退款" @change="tuikuanchange">
                        <el-option
                                v-for="(item, index) in tuikuan_dataeData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :other="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="info" size="small" plain   @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="bondTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="bondTable"
                            class="vue-table"
                            height="715"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div >
                                    <div v-if="scope.row.advertiser0">
                                        <div class="xfshow" v-if="scope.row.is_ultimate_shenhe == 0"></div>
                                            {{scope.row.adname}}
                                        <span class="appInfor qu" :class="{ textColor:scope.row.audit == 2 }" v-if="scope.row.advertiser0.customer_type == 2">
                                            渠
                                        </span>
                                        <span class="appInfor zhi" :class="{ textColor:scope.row.audit == 2 }" v-if="scope.row.advertiser0.customer_type == 1">
                                            直
                                        </span>
                                    </div>
                                  <div v-else>
                                      --
                                  </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="合同名称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div >
                                        {{scope.row.title | fileFun}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                label="金额">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div >
                                        {{scope.row.money | currency('')}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="产品线">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div >
                                        {{scope.row.prlina | fileFun }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="是否打款">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div v-if="Number(scope.row.xf_qiane)>0">
                                        未打款
                                    </div>
                                    <div v-else>
                                        已打款
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="创建日期">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div >
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="提交人">
                            <template slot-scope="scope">
                                <div  style="text-align: center">
                                    {{scope.row.submitname}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="是否退款">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div v-if="scope.row.is_ultimate_shenhe != 0">
                                        <div v-if="scope.row.audit == 2 " :class="{ textBorder:scope.row.audit == 2 }">
                                            未通过
                                        </div>
                                        <div v-else>
                                            <div v-if="scope.row.issqtui">
                                                已申请
                                            </div>
                                            <div v-if="scope.row.margin_istui == 1">
                                                已退款
                                            </div>
                                            <div v-if="!scope.row.issqtui && scope.row.margin_istui != 1">
                                                 <span class="color" @click.stop="money(scope.row)" style="cursor: pointer;font-size: 12px;display: inline-block;width:40px; height:20px;
                                  line-height: 22px;
                                  border-radius: 5px;
                                  background: #54ADFF;
                                  color: white;">
                                                    退款
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="scope.row.is_ultimate_shenhe == 0 && scope.row.audit == 2">
                                        未通过
                                    </div>
                                    <div v-else>
                                        审核暂未通过
                                    </div>
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
                </div>
            </el-col>
            <!--弹窗 打保证金退款-->
            <el-dialog title="退款" :visible.sync="addFormVisible"  :close-on-click-modal="false" class="tan_shiftTo" >
                <ul class="shiftTo" v-for="(data,index) in back_money" :key="index">
                    <li  style="margin-top: 10px">
                        <p class="first_p">金额:</p>
                        <p class="last_p" style="color: red">
                            {{isyable_money|currency('')}}
                        </p>
                    </li>
                    <li  style="margin-top: 10px">
                        <p class="first_p">退款金额:</p>
                        <p class="last_p">
                            <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px;outline: none;z-index:9"
                                   type="number" v-model="data.money"
                                   name="mouse2"
                                   placeholder="金额"
                                   v-on:input="back_money_change(data.money)"
                                   onmousewheel="return false;">
                            <span>
                        </span>
                        </p>
                    </li>
                    <li  >
                        <p class="first_p">备注:</p>
                        <p class="last_p">
                        <textarea rows="5" cols="20" v-model="data.note"> </textarea>
                            <span style="color: red;">
                                必填
                            </span>
                        </p>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer" >
						<el-button type="primary" @click="pull_xh" :disabled="back_disabled">确 定</el-button>
                        <el-button @click="addFormVisible=false">取 消</el-button>

			</span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { meijie_margin_da_list,tuimargin } from '@/api/meiti';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"

    export default {
        data() {
            return {
                dataInfor:{
                    search:{
                        date_type:1,
                    },
                },
                date_type:1,
                options_type:[],
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                tuikuan_data:'是否退款',
                tuikuan_dataeData:[],
                screen:[],
                //============
                stateData:'',
                listLoading:true,
                meijie_margin_da_list:function(page,num,val){
                    this.listLoading = true;
                    meijie_margin_da_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {


                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.media_bond_page?this.search_list.media_bond_page:20;
                        this.pageIndex = this.search_list.media_bond_num ?this.search_list.media_bond_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }

                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.bondTable = response.data;
                        this.listLoading = false;
                    }).catch(err => { this.$message.error(err);   this.listLoading = false;});
                },
                meijie_margin_da_listExcel:function(page,num){
                    this.dataInfor.search['search_adname'] = this.search_list.media_bond_account_name;
                    meijie_margin_da_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            if(Number(item.xf_qiane)>0){
                                item['dk_name'] = "未打款";
                            }else{
                                item['dk_name'] = "已打款";
                            };
                            if(item.margin_istui== 0){
                                item['tk_name'] = "未退款";
                            }else{
                                item['tk_name'] = "已退款";
                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '合同名称','金额','创建日期','提交人','是否打款','是否退款','备注'];
                            const filterVal = ['adname', 'appname','title', 'money','ctime','submitname','dk_name','tk_name','note'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '媒体保证金列表');
                        })


                    }).catch(err => { this.$message.error(err);});
                },
                tuimargin:function(id){
                    tuimargin({
                        id: this.is_back_id,
                        data:{
                            money:this.back_money[0].money,
                            note:this.back_money[0].note,
                        }
                    }).then(response => {
                        if(response.code == 200){
                            this.back_disabled = false;
                            this.meijie_margin_da_list(this.page,this.num);
                        }else{
                            this.$message.error(response.msg);
                        }

                    }).catch(err => {
                        this.$message.error(err);
                    });
                },
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                bondTable:[],
                //分页
                page:'20',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
 //退款弹窗
                addFormVisible:false,
                back_disabled:false,
                is_back_id:'',
                isyable_money:'',
                back_money:[{
                    money:'',
                    note:''
                }],
            }
        },
        components: {
            screenInput,
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
            ])
        },
        mounted(){
            this.options_type = criteria.options_type;
            this.tuikuan_dataeData = criteria.tuikuan_dataeData;

            this.dataInfor.search['Search_str'] = this.search_list.media_bond_name;
            this.dataInfor.search['date_type'] = this.search_list.media_bond_date_type?this.search_list.media_bond_date_type:1;
            this.dataInfor.search['start_date'] = this.search_list.media_bond_start_date;
            this.dataInfor.search['end_date'] = this.search_list.media_bond_end_date;
            this.dataInfor.search['istui'] = this.search_list.media_bond_istui;
            this.dataInput = [this.search_list.media_bond_start_date,this.search_list.media_bond_end_date];
            this.date_type = this.search_list.media_bond_date_type?this.search_list.media_bond_date_type:1;
            this.tuikuan_data =this.search_list.media_bond_istui?his.search_list.media_bond_istui:'是否退款';
            this.pageSize =  this.search_list.media_bond_page?this.search_list.media_bond_page:20;
            this.pageIndex = this.search_list.media_bond_num ?this.search_list.media_bond_num :1;
            this.kehuTableLength = this.search_list.media_bond_length ?this.search_list.media_bond_length :1;
            this.meijie_margin_da_list(this.page,this.num);
            this.screen = [
                {
                    name:'搜索',
                    data: this.search_list.media_bond_name
                }
            ];
        },

        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                    media_bond_name: this.dataInfor.search.Search_str,
                    media_bond_date_type: this.dataInfor.search.date_type,
                    media_bond_start_date: this.dataInfor.search.start_date,
                    media_bond_end_date: this.dataInfor.search.end_date,
                    media_bond_istui: this.dataInfor.search.istui,
                    media_bond_page:this.pageSize,
                    media_bond_num:this.pageIndex,
                    media_bond_length:this.kehuTableLength,
                });
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.meijie_margin_da_list(this.page,this.num);
                this.searchDataFun()
            },
            // 搜索日期
            changedate(){
                let start_date = '';
                let end_date = '';
                if(this.dataInput){
                    start_date = moment(this.dataInput[0]).format('YYYY-MM-DD');
                    end_date = moment(this.dataInput[1]).format('YYYY-MM-DD');
                }else{
                    start_date = '';
                    end_date = '';
                }
                this.dataInfor.search.start_date = start_date;
                this.dataInfor.search.end_date = end_date;
                this.meijie_margin_da_list(this.page,this.num);
                this.searchDataFun()
            },
            //是否退款
            tuikuanchange(){
                this.dataInfor.search.istui = this.tuikuan_data;
                this.meijie_margin_da_list(this.page,this.num);
                this.searchDataFun()
            },
//导出
            outExcel(){
                this.meijie_margin_da_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
// 退款
            money(val){
                this.isyable_money = val.money;
                this.addFormVisible=true;
                this.is_back_id = val.id;
                this.back_disabled = false;
            },
            back_money_change(val){

                if(Number(val)>this.isyable_money){
                    this.back_money[0].money = this.isyable_money
                }
                if(Number(val)<0){
                    this.back_money[0].money = 0
                }
            },
            pull_xh(){
                if(this.back_money[0].money == ''){
                        this.$message({
                            type: 'info',
                            message: '请输入退款金额'
                        });
                }else   if(this.back_money[0].note == ''){
                    this.$message({
                        type: 'info',
                        message: '请输入备注'
                    });
                }else{
                    this.$confirm('是否申请提交退款', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.back_disabled = true;
                        this.addFormVisible = false;
                        this.tuimargin()

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.meijie_margin_da_list(this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.num = val;
                this.pageIndex = val;
                this.meijie_margin_da_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.meijie_margin_da_list(this.page,this.num,val);
                this.searchDataFun()
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.pageSize =  20;
                this.pageIndex = 1;
                this.date_type = 1;
                this.dataInput = [];
                this.tuikuan_data = '是否退款';
                this.screen =[
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.meijie_margin_da_list(this.page,this.num,this.dataInfor);
                this.searchData({
                    media_bond_name:'',
                    media_bond_date_type: '',
                    media_bond_start_date: '',
                    media_bond_end_date: '',
                    media_bond_istui:'',
                });
            },
        },
        created() {

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
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/tan.scss";
</style>
