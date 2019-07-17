    <template>
       <el-row>
           <el-col :span="24" class="compactFirtsTitle screen">
               <div class="searchInput">
                   <input type="text" class="search" placeholder="请输入关键字" v-model='inputText'   >
                   <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                       <use xlink:href="#icon-11"></use>
                   </svg>
               </div>
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
                   <el-select v-model="selectLine" placeholder="请选择产品线" @change="searchAccomplish">
                       <el-option-group
                               v-for="(item,key) in selectLineData"
                               :key="item.name"
                               :label="item.name">
                           <el-option
                                   v-for="(item,index) in item.zi"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.id">
                           </el-option>
                       </el-option-group>
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
           <el-col :span="24" class="compactFirtsTable">
               <div >
                   <el-table
                           highlight-current-row v-loading="listLoading"  border
                           :data="compactListTable1"
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
                               :label="$t('titles.advertiser')">
                           <template slot-scope="scope">
                               <div :class="{ textBorder:scope.row.audit == 2 }">
                                   {{scope.row.guanggaozhu |fileFun}}
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="媒介合同">
                           <template slot-scope="scope">
                               <div :class="{ textBorder:scope.row.audit == 2 }">
                                   {{ scope.row.contract_no }}
                               </div>
                           </template>
                       </el-table-column>
                       <el-table-column
                               label="负责商务">
                           <template slot-scope="scope">
                               <div :class="{ textBorder:scope.row.audit == 2 }">
                                   {{scope.row.advertiser0 | nameFun}}
                               </div>
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
                               label="合同属性">
                           <template slot-scope="scope">
                               <div :class="{ textBorder:scope.row.audit == 2 }">
                                   <div :class="{ textBorder:scope.row.audit == 2 }">
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
                               @size-change="handleSizeChange_last"
                               @current-change="handleCurrentChange_last"
                               :current-page.sync="pageIndex_last"
                               :page-sizes="[ 20, 30,40]"
                               :page-size="pageSize_last"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="hetongTableLength_last"
                               style='text-align: right;'>
                       </el-pagination>
                   </div>
               </div>
           </el-col>
       </el-row>
    </template>

    <script>
        /*eslint-disable */
        import {mapGetters,mapActions} from 'vuex';
        import { contract_listPost,contract_list,productline} from '@/api/kehu';
        import criteria from '@/components/search/criteria';  //获取条件
        import stateDiv from '@/components/shenhe/sh_state';
        import moment from "moment"
        export default {

            data() {
                return {
                    dataInfor : {
                        search:{
                            iszuofei:'1'
                        },
                    },
                    inputText:'',
                    stateData:'',
                    // 搜索时间
                    date_type:1,
                    options_type:[],
                    dataInput: [],
                    shenhe:'',
                    shenheData:[],
                    selectLine:'',
                    selectLineData:[],
                    guidang:'',
                    guidangData:[],
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() >= Date.now();
                        }
                    },
                    screen:[],

                    //-----------------------------
                    compactListTable1:[],
                    audit_count:'',
                    listLoading:true,
                    //合同table
                    contract_listPost:function(page,num,val){
                        this.dataInfor.search['iszuofei'] = 1;
                        this.listLoading = true;
                            contract_listPost({
                                page: this.pageSize_last,
                                num: this.pageIndex_last,
                                search:this.dataInfor,
                            }).then(response => {
                                for(let i = 0;i<response.list.data.length;i++){
                                    response.list.data[i]['audit_countType'] = this.audit_count;
                                }
                                this.compactListTable1 = response.list.data;

                                this.hetongTableLength_last =  response.list.totalCount;
                                this.pageSize_last =  this.search_list.xieyi_zf_hetong_page?this.search_list.xieyi_zf_hetong_page:20;
                                this.pageIndex_last = this.search_list.xieyi_zf_hetong_num ?this.search_list.xieyi_zf_hetong_num :1;
                                if(Math.ceil(this.hetongTableLength_last /this.pageSize_last)<  this.pageIndex_last){
                                    this.pageIndex_last= Math.ceil(this.hetongTableLength_last /this.pageSize_last);
                                    this.searchDataFun();
                                }
                                this.listLoading = false;
                            }). catch(err => {this.$message.error('获取失败'); this.listLoading = false;});


                    },
                    //导出
                    tableData:[],
                    contract_listPostExcel:function(){
                            contract_listPost({
                                page: this.hetongTableLength,
                                num:1,
                                search:this.dataInfor,
                            }).then(response => {
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
                                    item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                                    return item
                                })
                                require.ensure([], () => {
                                    const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                    const tHeader = [this.$t('titles.customer'), '简称', '媒介合同','负责商务', '创建时间', '合同属性','提交人'];
                                    const filterVal = ['advertiseraccount', 'appname', 'contract_no','advertiserName','ctime', 'contract_state','submitname'];
                                    const list = this.tableData;
                                    const data = this.formatJson(filterVal, list);
                                    export_json_to_excel(tHeader, data, '作废合同');
                                })


                            }). catch(err => {this.$message.error('获取失败');});


                    },
                    //作废合同
                    dataInput_last:'',
                    compactListTable_last:'',
                    //分页
                    page_last:'20',
                    num_last:'1',
                    pageIndex_last:1,
                    pageSize_last:20,
                    hetongTableLength_last:12,
                    date:{start:'',end:''}
                }
            },


            components: {
                stateDiv,

            },
            computed: {
                ...mapGetters([
                    'user',
                    'audit_action',
                    'search_list'
                ])
            },
            methods: {
                ...mapActions([
                    'searchData',
                    'Account',
                ]),
                lineData(val){
                    this.selectLineData = val;
                },
                abrogateClick(){
                    this.options_type = criteria.options_type;
                    this.shenheData = criteria.shenheData;
                    this.guidangData = criteria.guidangData;
                    for(let i = 0;i<this.audit_action.length;i++){
                        if(this.audit_action[i].action_name == 'contract'){
                            this.audit_count = this.audit_action[i].audit_count;
                        }
                    }
                    this.dataInfor.search['Search_str'] = this.search_list.xieyi_zf_hetong_name;
                    this.dataInfor.search['date_type'] = this.search_list.xieyi_zf_hetong_date_type?this.search_list.xieyi_zf_hetong_date_type:1;
                    this.dataInfor.search['start_date'] = this.search_list.xieyi_zf_hetong_start_date;
                    this.dataInfor.search['end_date'] = this.search_list.xieyi_zf_hetong_end_date;
                    this.dataInfor.search['shenhe'] = this.search_list.xieyi_zf_hetong_shenhe;
                    this.dataInfor.search['isguidang'] = this.search_list.xieyi_zf_hetong_guidang;
                    this.dataInfor.search['pr_id'] = this.search_list.xieyi_zf_hetong_selectLine;
                    this.inputText = this.search_list.xieyi_zf_hetong_name;
                    this.dataInput = [this.search_list.xieyi_zf_hetong_start_date,this.search_list.xieyi_zf_hetong_end_date];
                    this.date_type = this.search_list.xieyi_zf_hetong_date_type?this.search_list.xieyi_zf_hetong_date_type:1;
                    this.shenhe = this.search_list.xieyi_zf_hetong_shenhe;
                    this.selectLine = this.search_list.xieyi_zf_hetong_selectLine;
                    this.guidang =  this.search_list.xieyi_zf_hetong_guidang;
                    this.pageSize_last =  this.search_list.xieyi_zf_hetong_page?this.search_list.xieyi_zf_hetong_page:20;
                    this.pageIndex_last = this.search_list.xieyi_zf_hetong_num ?this.search_list.xieyi_zf_hetong_num :1;
                    this.hetongTableLength_last = this.search_list.xieyi_zf_hetong_length ?this.search_list.xieyi_zf_hetong_length :1;

                    this.contract_listPost();
                },
                searchDataFun(){
                    this.searchData({
                        xieyi_zf_hetong_name: this.dataInfor.search.Search_str,
                        xieyi_zf_hetong_date_type: this.dataInfor.search.date_type,
                        xieyi_zf_hetong_start_date: this.dataInfor.search.start_date,
                        xieyi_zf_hetong_end_date: this.dataInfor.search.end_date,
                        xieyi_zf_hetong_shenhe: this.dataInfor.search.shenhe,
                        xieyi_zf_hetong_guidang: this.dataInfor.search.isguidang,
                        xieyi_zf_hetong_selectLine: this.dataInfor.search.pr_id,
                        xieyi_zf_hetong_page:this.pageSize_last,
                        xieyi_zf_hetong_num:this.pageIndex_last,
                        xieyi_zf_hetong_length:this.hetongTableLength_last
                    });
                },
                //搜索日期条件选择
                dateTypeChange(){
                    this.dataInfor.search.date_type = this.date_type;
                    this.contract_listPost();
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
                    this.contract_listPost();
                    this.searchDataFun();
                },
// 审核状态
                //审核
                searchstart(){
                    this.dataInfor.search.shenhe = this.shenhe;
                    this.contract_listPost();
                    this.searchDataFun();
                },
                searchAccomplish(index){
                    this.dataInfor.search.pr_id = this.selectLine;
                    this.contract_listPost();
                    this.searchDataFun();
                },
// 归档
                searchGuidang(index){
                    this.dataInfor.search.isguidang = this.guidang;
                    this.contract_listPost();
                    this.searchDataFun();
                },

                //搜索
                searchInput(){
                    this.dataInfor.search.Search_str = this.inputText;
                    this.contract_listPost();
                    this.searchDataFun();

                },
//清除
                searchClear(){
                    this.dataInfor= {
                        search:{
                            iszuofei:'1'
                        }
                    };
                    this.pageSize_last =  20;
                    this.pageIndex_last = 1;
                    this.inputText = '';
                    this.shenhe = '';
                    this.guidang = '';
                    this.selectLine = '';
                    this.dataInput = [];
                    this.date_type = 1;
                    this.contract_listPost();
                    this.searchData({
                        xieyi_zf_hetong_name: '',
                        xieyi_zf_hetong_date_type: '',
                        xieyi_zf_hetong_start_date: '',
                        xieyi_zf_hetong_end_date: '',
                        xieyi_zf_hetong_shenhe: '',
                        xieyi_zf_hetong_guidang: '',
                        xieyi_zf_hetong_selectLine: '',
                    });

                },
                //---------------
                //导出
                outExcel(){
                    this.contract_listPostExcel()
                },
                formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))
                },
                //tr跳转
                clickTr(val){
                    this.$router.push({ name: 'agreementDetails' , query: { id: val.id,gsId:val.advertiser}});
                    this.Account(val)
                },
                //作废分页
                handleSizeChange_last(val) {
                    this.page_last = val;
                    this.pageSize_last =val;

                    if(Math.ceil(this.hetongTableLength_last /this.pageSize_last) >= this.pageIndex_last){
                        this.contract_listPost(this.page_last,this.num_last,this.dataInfor);
                    }
                    this.searchDataFun();

                },
                handleCurrentChange_last(val) {
                    this.pageIndex_last = val;
                    this.contract_listPost(this.page,this.num_last,this.dataInfor);
                    this.searchDataFun();

                },
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
                        return val.business0.name
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
        @import "src/styles/crmStyle/search.scss";
    </style>
