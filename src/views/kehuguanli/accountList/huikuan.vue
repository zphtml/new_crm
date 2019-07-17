<template>
    <div class="kuhuList" >
        <el-row class="kuhuBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>查看回款</span>
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
                    <el-button type="success" plain  size="small" @click="outExcel">导出Excel</el-button>
                </div>
            </el-col>
            <el-col :span="24" class="kuhuTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kuhuTable"
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
                                    {{scope.row.b_money | currency('')}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="回款时间">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.b_time | ctimeData}}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                header-align="center"
                                label="创建日期">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.ctime | ctimeData}}
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
                                {{scope.row.submitname}}
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
    import { huikuan_listPost } from '@/api/kehu';
    import screenInput from '@/components/search/search';
    import state from '@/components/shenhe/sh_state';
    import criteria from '@/components/search/criteria';  //获取条件
    const currency = require('@/../node_modules/vue2-filters/src/other/currency');
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor:{
                    search:{
                    },
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                shenhe:'',
                shenheData:[],
                screen:[],

                //---------------
                stateData:'',
                label:'',
                listLoading:'',
                huikuan_listPost:function(page,num,val){
                    huikuan_listPost({
                        page:page,
                        num:num,
                        search:this.dataInfor,
                    }).then(response => {
                        for(let i = 0;i<response.data.length;i++){
                            response.data[i]['audit_countType'] = this.audit_count;
                        }
//
                        this.label = '回款金额'+'(总数:'+  currency.default(response.money_sum,'')  +')';
                        this.kuhuTable = response.data;
                        this.kehuTableLength =  response.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                huikuan_listPostExcel:function(){

                    huikuan_listPost({
                        page:this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['advertiseraccount'] = item.advertiser0.advertiser;

                            }
                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            item.b_time = moment(new Date(parseInt(item.b_time) * 1000)).format('YYYY-MM-DD');

                            return item
                        })
                        let _this = this;
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '回款金额', '回款时间','创建日期','提交人'];
                            const filterVal = ['advertiseraccount', 'appname', 'b_money','b_time','ctime','submitname'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '回款列表');
                        })

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',

//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                kuhuTable:[],
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
                'accounts',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.shenheData = criteria.shenheData;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'backmoney'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.dataInfor = {
                search:{
                    Search_str:this.accounts.name,
                },
            }
            this.huikuan_listPost(this.page,this.num,  this.dataInfor);
            this.screen = [
                {
                    name:'搜索',
                    data: this.accounts.name,
                }
            ];

        },
        methods: {
            ...mapActions([
                'Account'
            ]),
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
                this.huikuan_listPost(this.page,this.num);
            },
            // 审核状态
            searchstart(index){
                this.dataInfor.search.shenhe = this.shenhe;
                this.huikuan_listPost(this.page,this.num);
            },

            //导出
            outExcel(){
                this.huikuan_listPostExcel()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;

                this.huikuan_listPost(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;
                this.huikuan_listPost(this.page,this.num,this.dataInfor);
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.huikuan_listPost(this.page,this.num,val);
            },
//清除
            searchClear(){
                this.dataInput = [];
                this.shenhe = '';
                this.date_type= 1;
                this.dataInfor = {
                    search:{
                        date_type:1,
                    },
                };
                this.dataInfor.search['Search_str'] = this.accounts.name;
                this.screen =[
                    {
                        name:'搜索',
                        data: this.accounts.name
                    }
                ];
                this.huikuan_listPost(this.page,this.num);
            },
//点击tr
            clickTr(val){
                this.$router.push({ name: 'huikuan1',query: { id:val.id} });
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
    .kuhuList {
        width:100%;
        .kuhuBox {

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
            .kuhuTable {
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
        .kuhuTable {
            .vue-table {
                .operation {
                    font-size: 12px!important;
                }
            }
        }
    }
</style>
