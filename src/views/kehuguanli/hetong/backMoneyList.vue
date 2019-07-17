    <template>
        <div class="compactList" >
            <el-row class="compactBox">
                <p class="crm_title">
                    <i class="crm_line"></i>
                    <span>结算单列表</span>
                </p>
                <el-col :span="24" class="compactListTabs screen" style="margin-bottom: 5px">
                    <customerDiv :screen=screen  @search="search"  style="display: inline-block;vertical-align: top"></customerDiv>
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

                    <div class="dataInput" style="  border-left: none!important">
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
                        <el-select v-model="shenhe" placeholder="请选择审核" @change="searchstart">
                            <el-option
                                    v-for="(item, index) in shenheData"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                    :other="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="startInput" >
                        <el-select v-model="guidang" placeholder="请选择" @change="searchGuidang">
                            <el-option
                                    v-for="(item, index) in guidangData"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                    :other="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                </el-col>
                <el-col :span="24" class="excelButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>

                </el-col>
                <el-col :span="24" class="compactFirtsTable">
                    <div >
                        <el-table
                                highlight-current-row v-loading="listLoading"  border
                                :data="compactListTable"
                                class="vue-table"
                                height="740"
                                @row-click="clickTr($event)"
                                style="width: 100%">
                            <el-table-column
                                    width="200"
                                    :label="$t('titles.customer')">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.advertiser0 | fileFun1}}
                                        <span class="appInfor qu" v-if="scope.row.customer_type == 2">
                                                    渠
                                                </span>
                                        <span class="appInfor zhi" v-if="scope.row.customer_type == 1">
                                                    直
                                                </span>
                                    </div>

                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="170"
                                    label="结算周期">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.contract_start | ctimeData}} 至{{scope.row.contract_end | ctimeData}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="金额">
                                <template slot-scope="scope">
                                    {{scope.row.money }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="账户币">
                                <template slot-scope="scope">
                                    {{scope.row.show_money }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    sortable
                                    min-width="100"
                                    label="创建时间">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="归档">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                  <span v-if="scope.row.isguidang == 1">
                                        已归档
                                  </span>
                                    <span v-if="scope.row.isguidang == 0">
                                        未归档
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
                            <el-table-column
                                    label="提交人">
                                <template slot-scope="scope">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.submitname }}
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
                                    :total="hetongTableLength"
                                    style='text-align: right;'>
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </template>

    <script>
        /*eslint-disable */
        import {mapGetters,mapActions} from 'vuex';
        import { contract_accounts_list} from '@/api/kehu';
        import customerDiv from '@/components/search/search';
        import criteria from '@/components/search/criteria';  //获取条件
        import stateDiv from '@/components/shenhe/sh_state';
        import moment from "moment"
        export default {

            data() {
                return {
                    dataInfor : {
                        search:{
                            customer_type:1,
                            date_type:1,
                        },
                    },
                    screen:'',
                    date_type:1,
                    options_type:[],
                    dataInput: [],
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() >= Date.now();
                        }
                    },
                    shenhe:'',
                    shenheData:[],
                    options_c:[],
                    guidang:[],
                    guidangData:[],
                    //-----------------------
                    compactListTable:[],
                    audit_count:'',
                    listLoading:true,

                    //合同table
                    contract_accounts_list:function(page,num,val){
                        this.dataInfor.search['iszuofei'] = 0;
                        this.listLoading = true;
                        contract_accounts_list({
                            data:'All',
                            page: this.pageSize,
                            num: this.pageIndex,
                            search:this.dataInfor,
                        }).then(response => {
                            for(let i = 0;i<response.list.data.length;i++){
                                response.list.data[i]['audit_countType'] = this.audit_count;
                            }

                            this.hetongTableLength =  response.list.totalCount;
                            this.pageSize =  this.search_list.back_hetong_page?this.search_list.back_hetong_page:20;
                            this.pageIndex = this.search_list.back_hetong_num ?this.search_list.back_hetong_num :1;
                            if(Math.ceil(this.hetongTableLength /this.pageSize)<  this.pageIndex){
                                this.pageIndex= Math.ceil(this.hetongTableLength /this.pageSize);
                                this.searchDataFun();
                            }
                            this.compactListTable = response.list.data;

                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');     this.listLoading = false;});

                    },
                    //导出
                    tableData:[],
                    contract_accounts_listExcel:function(){
                        contract_accounts_list({
                            data:'All',
                            page: this.hetongTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            let data = [];
                            let tHeaderData =  [this.$t('titles.customer'), '简称', '媒介合同','负责商务', '创建时间', '合同属性',
                                '金额','账户币','结算周期','归档编号','归档人','归档日期'
                                ,'账期','提交人','备注'];
                            let filterValData =  ['advertiseraccount', 'appname', 'contract_no','advertiserName','ctime', 'contract_state',
                                'money','show_money','zhouqi','guidang_no','guidangUser_name','guidang_time'
                                ,'zhouqi','submitname','note'];
                            this.tableData =  response.list.data.filter(function(item,i) {
                                if(item.advertiser0){
                                    item['advertiseraccount'] = item.advertiser0.advertiser;

                                    if(item.advertiser0.business0){
                                        item['advertiserName'] = item.advertiser0.business0.name;
                                    }
                                }
                                if(item.contract_state == 1){
                                    item.contract_state =  '新客'
                                }else if(item.contract_state == 2){
                                    item.contract_state =  '老客'
                                }else if(item.contract_state == 3){
                                    item.contract_state =  '老客新开'
                                }else if(item.contract_state == 4){
                                    item.contract_state =  '公司分配'
                                }
                                if(item.guidangUser){
                                    item['guidangUser_name'] = item.guidangUser.name
                                }
                                if(item.guidang_time){
                                    item['guidang_time'] =moment(new Date(parseInt(item.guidang_time) * 1000)).format('YYYY-MM-DD');
                                }
                                item.zhouqi = moment(Number(item.contract_start) * 1000).format('YYYY-MM-DD')+'至'+  moment(Number(item.contract_end) * 1000).format('YYYY-MM-DD')

                                item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                                return item
                            })
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = tHeaderData;
                                const filterVal = filterValData;
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '结算单列表');
                            })

                        }). catch(err => {this.$message.error('获取失败');});

                    },
                    //分页
                    page:'20',
                    num:'1',
                    pageIndex:1,
                    pageSize:20,
                    hetongTableLength:12,
                }
            },
            components: {
                stateDiv,
                customerDiv,

            },
            computed: {
                ...mapGetters([
                    'user',
                    'audit_action',
                    'search_list',
                ])
            },
            watch:{
                user:function(newValue){
                },
            },
            mounted(){
                this.options_type = criteria.options_type;
                this.shenheData = criteria.shenheData;
                this.guidangData = criteria.guidangData;
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'contract_accounts'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
                this.screen =[
                    {
                        name:'搜索',
                        data: this.search_list.back_hetong_name
                    }
                ];
                this.dataInfor.search['Search_str'] = this.search_list.back_hetong_name;

                this.dataInfor.search['date_type'] = this.search_list.back_hetong_date_type?this.search_list.back_hetong_date_type:1;
                this.dataInfor.search['start_date'] = this.search_list.back_hetong_start_date;
                this.dataInfor.search['end_date'] = this.search_list.back_hetong_end_date;
                this.dataInfor.search['shenhe'] = this.search_list.back_hetong_shenhe;
                this.dataInfor.search['isguidang'] = this.search_list.back_hetong_guidang;
                this.dataInput = [this.search_list.back_hetong_start_date,this.search_list.back_hetong_end_date];
                this.date_type = this.search_list.back_hetong_date_type?this.search_list.back_hetong_date_type:1;
                this.shenhe = this.search_list.back_hetong_shenhe;
                this.guidang = this.search_list.back_hetong_guidang;
                this.pageSize =  this.search_list.back_hetong_page?this.search_list.back_hetong_page:20;
                this.pageIndex = this.search_list.back_hetong_num ?this.search_list.back_hetong_num :1;
                this.hetongTableLength = this.search_list.back_hetong_length ?this.search_list.back_hetong_length :1;

                this.contract_accounts_list(this.page,this.num,this.dataInfor);


            },
            methods: {
                ...mapActions([
                    'searchData',
                ]),
                searchDataFun(){
                    this.searchData({
                        back_hetong_name: this.dataInfor.search.Search_str,
                        back_hetong_date_type: this.dataInfor.search.date_type,
                        back_hetong_start_date: this.dataInfor.search.start_date,
                        back_hetong_end_date: this.dataInfor.search.end_date,
                        back_hetong_shenhe: this.dataInfor.search.shenhe,
                        back_hetong_guidang: this.dataInfor.search.isguidang,
                        back_hetong_page:this.pageSize,
                        back_hetong_num:this.pageIndex,
                        back_hetong_length:  this.hetongTableLength,
                    });
                },
                //搜索日期条件选择
                dateTypeChange(){
                    this.dataInfor.search.date_type = this.date_type;
                    this.contract_accounts_list(this.page,this.num);
                    this.searchDataFun();
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
                    this.contract_accounts_list(this.page,this.num);
                    this.searchDataFun();
                },
                // 审核状态
                searchstart(index){
                    this.dataInfor.search.shenhe = this.shenhe;
                    this.contract_accounts_list(this.page,this.num);
                    this.searchDataFun();
                },
                // 归档
                searchGuidang(index){
                    this.dataInfor.search.isguidang = this.guidang;
                    this.contract_accounts_list(this.page,this.num);
                    this.searchDataFun();
                },

                //搜索
                search(val){
                    this.dataInfor.search.Search_str = val;
                    this.contract_accounts_list(this.page,this.num);
                    this.searchDataFun();
                },
                //清除
                searchClear(){
                    this.dataInfor= {
                        search:{
                            iszuofei:'0',
                            customer_type:1,
                            date_type:1,
                        }
                    };
                    this.screen =[
                        {
                            name:'搜索',
                            data: ''
                        }
                    ];
                    this.pageSize =  20;
                    this.pageIndex = 1;
                    this.hetongTableLength = 0;
                    this.shenhe = '';
                    this.dataInput = [];
                    this.date_type = 1;
                    this.contract_accounts_list(this.page,this.num);
                    this.searchData({
                        back_hetong_name: '',
                        back_hetong_date_type: '',
                        back_hetong_start_date: '',
                        back_hetong_end_date: '',
                        back_hetong_shenhe: '',
                        back_hetong_guidang: '',
                    });

                },

                //-----------
                //导出
                outExcel(){
                    this.contract_accounts_listExcel()
                },
                formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))
                },


                //tr跳转
                clickTr(val){
                    this.$router.push({ name: 'backMoneyInfor' , query: { id: val.id}});
                },
                addHetong(val){
                    this.$router.push({ name: 'newContrac' , query: { id: val.id}});
                },
                //正常分页
                handleSizeChange(val) {
                    this.page = val;
                    this.pageSize =val;

                    if(Math.ceil(this.hetongTableLength /this.pageSize) >= this.pageIndex){
                        this.contract_accounts_list(this.page,this.num);
                    }
                    this.searchDataFun();
                },
                handleCurrentChange(val) {
                    this.pageIndex = val;
                    this.contract_accounts_list(this.page,this.num,this.dataInfor);
                    this.searchDataFun();
                },
            },
            created() {

            },
            filters:{
                ctimeData(val){
                    var time=new Date(parseInt(val) * 1000);
                    return   moment(time).format('YYYY-MM-DD')
                },
                fileFun1(val){
                    if(val){
                        return val.advertiser
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

        .compactList {
            width:100%;
            .compactListTabs {
                .compactFirtsTable {
                    margin-top: 20px;
                }
            }
            .excelButton {
                text-align: right;
                .outExcel {
                    float: right;
                    border:1px solid #54ADFF;
                    background: none;
                    color: #54ADFF;
                    z-index: 999;
                    height:32px;
                    line-height: 10px;
                    font-size: 12px;
                }

            }
        }
    </style>
