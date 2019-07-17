<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>查看发票</span>
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen="screen" @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
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
                <div class="startInput"  >
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
                <div class="startInput"  >
                    <el-select v-model="backMoney" placeholder="筛选回款" @change="changeBackMoney">
                        <el-option
                                v-for="(item, index) in backMoneyData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :other="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <div class="distributionButton">
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="fapiaoTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="fapiaoTable"
                            class="vue-table"
                            height="740"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @row-click="clickTr($event)"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                 :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                <div :class="{ textBorder:scope.row.audit == 2 }">
                                {{scope.row.adname | fileFun}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                prop="is_huikuan"
                                sortable
                                width="230"
                                :label="label">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <div :class="{ textBorder:scope.row.audit == 2 }">
                                    {{scope.row.money | currency('')}}
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
    import {mapActions,mapGetters} from 'vuex';
    import { fapiaoPost } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    const currency = require('@/../node_modules/vue2-filters/src/other/currency');
    import moment from "moment"
    export default {
        data() {
            return {
                //搜索条件
                dataInfor : {
                    search:{
                        f_type:1,
                    },
                },
                dataInput:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                screen:'',
                shenhe:'',
                shenheData:[],
                backMoney:'',
                backMoneyData:[],
                //-----------------------------------
                stateData:'',
                label:'',
                listLoading:true,
                fapiaoPost:function(page,num,val){
                    fapiaoPost({
                        page:page,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {
                        let num= 0;
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                            num += Number(response.data[i].money)
                        }
                        this.fapiaoTable = response.data;

                        this.kehuTableLength =  response.totalCount;
                        this.label = '发票金额'+'(总数:'+  currency.default(response.money_sum,'') +')';
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                fapiaoPostExcel:function(){
                    this.dataInfor.search['f_type'] = 1;
                    fapiaoPost({
                        page:  this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['advertiseraccount'] = item.advertiser0.advertiser;

                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        })
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '发票金额', '创建时间','提交人'];
                            const filterVal = ['advertiseraccount', 'appname', 'money','ctime','submitname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '发票列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                fapiaoTable:[],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
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
                'accounts'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.shenheData = criteria.shenheData;
            this.backMoneyData = criteria.backMoneyData;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'Invoice'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.screen =[
                {
                    name:'搜索',
                    data: this.accounts.name
                }
            ];
            this.dataInfor.search['Search_str'] = this.accounts.name;
            this.fapiaoPost(this.page,this.num,this.dataInfor);
        },
        methods: {
            ...mapActions([
                'searchData',
            ]),
            //导出
            outExcel(){
                this.fapiaoPostExcel()
            },

            //查找日期
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
                this.fapiaoPost(this.page,this.num);
            },
            //审核
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.fapiaoPost(this.page,this.num);
            },
            changeBackMoney(){
                this.dataInfor.search.is_huikuan  = this.backMoney;
                this.fapiaoPost(this.page,this.num);
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {

                this.page = val;
                this.pageSize =val;
                this.fapiaoPost(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {

                this.num = val;

                this.fapiaoPost(this.page,this.num,this.dataInfor);
            },
            //搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.fapiaoPost(this.page,this.num);
                this.searchData({
                    fapiao_name:val
                });
            },
//清除
            searchClear(){
                this.dataInfor = {
                    search:{
                        f_type:1,
                    },
                };
                this.screen = [
                    {
                        name:'搜索',
                        data:''
                    }
                ]
                this.dataInput = [];
                this.shenhe = '';
                this.backMoney = '';
                this.fapiaoPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    fapiao_name:''
                });
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'fapiao',query: { id:val.id} });
            },
            //跳转
            jumpCustomerList(){
                this.$router.push({ name: 'kehuliebiao' });
            },
            jumpConsole(){
                this.$router.push({ name: 'console'  ,query: { type:1} });
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);;
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
    .fapiaoList {
        width:100%;
        .fapiaoBox {

            .screen {
                margin-bottom: 20px;
                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
                    }
                    .dropdownBut {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
                        line-height: 10px;
                        font-size: 12px;
                        vertical-align: top;
                    }
                    .textInfor {
                        width:65px;
                        height:32px;
                        display: inline-block;
                        font-size: 14px;
                        position: relative;
                        margin-left: 30px;
                        span{
                            cursor: pointer;
                        }
                        .clickColor {
                            color: #0587ff;
                        }
                        .click_Color {
                            color: #0587ff;
                        }
                        span:hover{
                            color: #0587ff;
                        }
                        .topText {
                            position: absolute;
                            top:0;
                            left:0;
                        }
                        .line{
                            width:1px;
                            height: 40px;
                            background: #e3e3e3;
                            transform:rotate(45deg);
                            -ms-transform:rotate(45deg); 	/* IE 9 */
                            -moz-transform:rotate(45deg); 	/* Firefox */
                            -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                            -o-transform:rotate(45deg);
                            position: absolute;
                            left: 30px;
                            top: -2px;
                        }
                        .bottomText{
                            position: absolute;
                            bottom:0;
                            right:0;
                        }
                    }
                }
            }
            .fapiaoTable {
                .vue-table {
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

    }
    @media(max-width: 1280px) {
        .fapiaoTable {
            .vue-table {
                .operation {
                    font-size: 12px!important;
                }
            }
        }
    }
</style>
