<template>
    <div class="bondList" >
        <el-row class="bondBox">
            <el-col :span="24" class="screen" style="margin: 0;">
                <div class="searchInput">
                    <input type="text" class="search" placeholder="请输入公司名/账户/用户" v-model='inputText' >
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
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" size="small" plain   @click="outExcel">导出Excel</el-button>
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
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
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
                                <div v-else="scope.row.advertiser0">
                                    --
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="广告主">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.guanggaozhu | fileFun}}
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
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.money | currency('')}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                        <el-table-column
                                header-align="center"
                                :label=" $t('titles.Addcustomers')">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.prlina | fileFun }}
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
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                        {{scope.row.ctime | ctimeData}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="审核状态">
                            <template slot-scope="scope">
                                <state :stateData=scope.row ></state>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="提交人">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
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
                                                <div v-if="scope.row.margin_istui == 1">
                                                    已退款
                                                </div>
                                                <div v-else>
                                                    已申请
                                                </div>
                                            </div>
                                            <div v-else>
                                                             <span class="color" @click.stop="money(scope.row.id)" style="cursor: pointer;font-size: 12px;display: inline-block;width:40px; height:20px;
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
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { margin_m_list,ktuimargin } from '@/api/kehu';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"

    export default {
        data() {
            return {
                dataInfor: {
                    search:{
                        date_type:1
                    }
                },
                inputText:'',
                screen:[],
                // 搜索时间
                date_type:1,
                options_type:[],
                dataInput: [],
                shenhe:'',
                shenheData:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //---------------------
                listLoading:true,
                activeName:'first',
                margin_m_list:function(){
                    this.listLoading = true;
                    margin_m_list({
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.listLoading = false;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
                        this.kehuTableLength =  response.totalCount;
                        this.pageSize =  this.search_list.bond_page?this.search_list.bond_page:20;
                        this.pageIndex = this.search_list.bond_num ?this.search_list.bond_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }
                        this.bondTable = response.data;
                    }). catch(err => {this.$message.error(err);  this.listLoading = false;});
                },
                margin_m_listExcel:function(page,num){
                    margin_m_list({
                        page:this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['adname'] = item.advertiser0.advertiser;
                            }
                            if(item.audit == 2){
                                item['isTuikuan'] = "作废";
                            }else{
                                if(item.issqtui){
                                    if(item.margin_istui == 1){
                                        item['isTuikuan'] = "已退款";
                                    }else{
                                        item['isTuikuan'] = "已申请";
                                    }
                                }else{
                                    item['isTuikuan'] = "未退款";
                                }
                            }

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '广告主',this.$t('titles.nick'),'简称', '金额', '产品线','创建日期','提交人','备注','是否退款'];
                            const filterVal = ['adname','guanggaozhu','product', 'appname', 'money', 'prlina','ctime','submitname','note','isTuikuan'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '保证金退款列表');
                        })


                    }). catch(err => {this.$message.error(err);});
                },
                ktuimargin:function(id){
                    ktuimargin({
                        id:id
                    }).then(response => {
                        if(response.code == 200){
                            this.dataInfor.Search_str = this.search_list.bond_name;
                            this.margin_m_list(this.page,this.num,this.dataInfor);
                        }else{
                            this.$message.error(response.msg);
                        }

                    }). catch(err => {this.$message.error(err);});
                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                bondTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
            ])
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            searchDataFun(){
                this.searchData({
                   bond_name: this.dataInfor.search.Search_str,
                   bond_date_type: this.dataInfor.search.date_type,
                   bond_start_date: this.dataInfor.search.start_date,
                   bond_end_date: this.dataInfor.search.end_date,
                   bond_shenhe: this.dataInfor.search.shenhe,
                   bond_selectLine: this.dataInfor.search.pr_id,
                    bond_page:this.pageSize,
                    bond_num:this.pageIndex,
                    bond_length:this.kehuTableLength
                });
            },
            bondClick:function(data){
                this.options_type = criteria.options_type;
                this.shenheData = criteria.shenheData;
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'baozhengjin'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
                this.dataInfor.search['Search_str'] = this.search_list.bond_name;
                this.dataInfor.search['date_type'] = this.search_list.bond_date_type?this.search_list.bond_date_type:1;
                this.dataInfor.search['start_date'] = this.search_list.bond_start_date;
                this.dataInfor.search['end_date'] = this.search_list.bond_end_date;
                this.dataInfor.search['shenhe'] = this.search_list.bond_shenhe;
                this.inputText = this.search_list.bond_name;
                this.dataInput = [this.search_list.bond_start_date,this.search_list.bond_end_date];
                this.date_type = this.search_list.bond_date_type?this.search_list.bond_date_type:1;
                this.shenhe = this.search_list.bond_shenhe;
                this.pageSize =  this.search_list.bond_page?this.search_list.bond_page:20;
                this.pageIndex = this.search_list.bond_num ?this.search_list.bond_num :1;
                this.kehuTableLength = this.search_list.bond_length ?this.search_list.bond_length :1;

                this.margin_m_list(this.page,this.num);

            },
            //搜索日期条件选择
            dateTypeChange(){
                this.dataInfor.search.date_type = this.date_type;
                this.margin_m_list();
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
                this.margin_m_list();
                this.searchDataFun();
            },
// 审核状态
            //审核
            searchstart(){
                this.dataInfor.search.shenhe = this.shenhe;
                this.margin_m_list();
                this.searchDataFun();
            },
//搜索
            searchInput(){
                this.dataInfor.search.Search_str = this.inputText;
                this.margin_m_list();
                this.searchDataFun();
            },
//清除
            searchClear(){
                this.dataInfor= {
                    search:{
                        date_type:1
                    }
                };
                this.pageSize =  20;
                this.pageIndex = 1;
                this.inputText = '';
                this.shenhe = '';
                this.dataInput = [];
                this.date_type = 1;
                this.margin_m_list(this.page,this.num,this.dataInfor);
                this.searchData({
                   bond_name: '',
                   bond_date_type: '',
                   bond_start_date: '',
                   bond_end_date: '',
                   bond_shenhe: '',
                });
            },
//导出
            outExcel(){
                this.margin_m_listExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            // 退款
            money(val){
                this.$confirm('是否申请提交退款', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ktuimargin(val)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.margin_m_list(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.margin_m_list(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },

//点击tr
            clickTr(val){
                this.$router.push({ name: 'bondListInfor', query: { id: val.id} });
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
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/search.scss";
</style>
