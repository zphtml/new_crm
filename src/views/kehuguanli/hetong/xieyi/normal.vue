    <template>
        <el-row>
            <el-col :span="24" class="compactFirtsTitle screen">
                <div class="searchInput">
                    <input type="text" class="search" placeholder="请输入关键字" v-model='inputText' >
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
                    <el-select v-model="guidang" placeholder="是否归档" @change="searchGuidang">
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
                            :data="compactListTable"
                            class="vue-table"
                            height="740"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="200"
                                label="公司名称">
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
                                min-width="150"
                                label="产品线">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{ scope.row.prlin }}
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
        </el-row>
    </template>

    <script>
        /*eslint-disable */
        import {mapGetters,mapActions} from 'vuex';
        import { contract_listPost,contract_list,productline} from '@/api/kehu';
        import stateDiv from '@/components/shenhe/sh_state';
        import criteria from '@/components/search/criteria';  //获取条件
        import moment from "moment"
        export default {

            data() {
                return {
                    dataInfor : {
                        search:{
                            iszuofei:'0'
                        },
                    },
                    inputText:'',
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
                    compactListTable:[],
                    audit_count:'',
                    listLoading:true,
                    pr_id:{},

                    //合同table
                    contract_listPost:function(page,num,val){
                        this.listLoading = true;
                        contract_listPost({
                            page: this.pageSize,
                            num: this.pageIndex,
                            search:this.dataInfor,
                        }).then(response => {
                            for(let i = 0;i<response.list.data.length;i++){
                                response.list.data[i]['audit_countType'] = this.audit_count;
                            }
                            this.compactListTable = response.list.data;

                            this.kehuTableLength =  response.list.totalCount;
                            this.pageSize =  this.search_list.xieyihetong_page?this.search_list.xieyihetong_page:20;
                            this.pageIndex = this.search_list.xieyihetong_num ?this.search_list.xieyihetong_num :1;
                            if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                                this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                                this.searchDataFun();
                            }
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败'); this.listLoading = false;});
                    },
                    //导出
                    tableData:[],
                    contract_listPostExcel:function(){

                            contract_listPost({
                                page: this.kehuTableLength,
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
                                    export_json_to_excel(tHeader, data, '正常合同');
                                })

                            }). catch(err => {this.$message.error('获取失败');});

                    },
                    //分页
                    page:'20',
                    num:'1',
                    pageIndex:1,
                    pageSize:20,
                    kehuTableLength:12,
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() >= Date.now();
                        }
                    },
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
            watch:{
                user:function(newValue){
                },
            },
            methods: {
                ...mapActions([
                    'searchData',
                    'Account',
                ]),
                lineData(val){
                    this.selectLineData = val;
                },
                normalClick(){
                    this.options_type = criteria.options_type;
                    this.shenheData = criteria.shenheData;
                    this.guidangData = criteria.guidangData;
                    for(let i = 0;i<this.audit_action.length;i++){
                        if(this.audit_action[i].action_name == 'contract'){
                            this.audit_count = this.audit_action[i].audit_count;
                        }
                    }
                    this.dataInfor.search['Search_str'] = this.search_list.xieyihetong_name;
                    this.dataInfor.search['date_type'] = this.search_list.xieyihetong_date_type?this.search_list.xieyihetong_date_type:1;
                    this.dataInfor.search['start_date'] = this.search_list.xieyihetong_start_date;
                    this.dataInfor.search['end_date'] = this.search_list.xieyihetong_end_date;
                    this.dataInfor.search['shenhe'] = this.search_list.xieyihetong_shenhe;
                    this.dataInfor.search['isguidang'] = this.search_list.xieyihetong_guidang;
                    this.dataInfor.search['pr_id'] = this.search_list.xieyihetong_selectLine;
                    this.inputText = this.search_list.xieyihetong_name;
                    this.dataInput = [this.search_list.xieyihetong_start_date,this.search_list.xieyihetong_end_date];
                    this.date_type = this.search_list.xieyihetong_date_type?this.search_list.xieyihetong_date_type:1;
                    this.shenhe = this.search_list.xieyihetong_shenhe;
                    this.guidang = this.search_list.xieyihetong_guidang;
                    this.selectLine = this.search_list.xieyihetong_selectLine;
                    this.pageSize =  this.search_list.xieyihetong_page?this.search_list.xieyihetong_page:20;
                    this.pageIndex = this.search_list.xieyihetong_num ?this.search_list.xieyihetong_num :1;
                    this.kehuTableLength = this.search_list.xieyihetong_length ?this.search_list.xieyihetong_length :1;
                    this.contract_listPost(this.page,this.num,this.dataInfor);
                },
                searchDataFun(){
                    this.searchData({
                        xieyihetong_name: this.dataInfor.search.Search_str,
                        xieyihetong_date_type: this.dataInfor.search.date_type,
                        xieyihetong_start_date: this.dataInfor.search.start_date,
                        xieyihetong_end_date: this.dataInfor.search.end_date,
                        xieyihetong_shenhe: this.dataInfor.search.shenhe,
                        xieyihetong_guidang: this.dataInfor.search.isguidang,
                        xieyihetong_selectLine: this.dataInfor.search.pr_id,
                        xieyihetong_page:this.pageSize,
                        xieyihetong_num:this.pageIndex,
                        xieyihetong_length:this.kehuTableLength
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
                            iszuofei:'0',
                            date_type:1,
                        }
                    };
                    this.pageSize =  20;
                    this.pageIndex = 1;
                    this.kehuTableLength = 0;
                   this.inputText = '';
                    this.shenhe = '';
                    this.guidang = '';
                    this.selectLine = '';
                    this.dataInput = [];
                    this.date_type = 1;
                    this.contract_listPost();
                    this.searchData({
                        xieyihetong_name: '',
                        xieyihetong_date_type: '',
                        xieyihetong_start_date: '',
                        xieyihetong_end_date: '',
                        xieyihetong_shenhe: '',
                        xieyihetong_guidang: '',
                        xieyihetong_selectLine: '',
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
                    let  advertiserName = '';
                    if(val.advertiser0){
                        advertiserName = val.advertiser0.advertiser
                    }
                    this.Account({
                        id:val.advertiser,
                        name:advertiserName
                    })
                },
                //正常分页
                handleSizeChange(val) {
                    this.page = val;
                    this.pageSize =val;
                    if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                        this.contract_listPost();

                    }
                    this.searchDataFun();
                },
                handleCurrentChange(val) {
                    this.pageIndex = val;
                    this.contract_listPost();
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
