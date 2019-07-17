<template>
    <div class="kebaoList" >
        <el-row class="kebaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                客保系统
            </p>
            <el-col :span="24" class="screen">
                <screenInput  :screen=screen  @search="search" @searchClear="searchClear" style="display: inline-block;vertical-align: top"></screenInput>
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
                    <el-select v-model="chengdan" placeholder="是否成单" @change="searchstart">
                        <el-option
                                v-for="(item, index) in options_chengdan"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :other="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                <el-button type="success" class="outExcel" plain @click="outExcel">导出Excel</el-button>
                <div class="distributionButton">
                    <div class="dropdownBut">
                          <el-button  type="primary" @click="jumpnewCustomer">
                              新建客户
                          </el-button >
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="kebaoTable">
                <div >
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="kebaoTable"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                width="240"
                                :label="$t('titles.customer')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                :label="$t('titles.advertiser')">
                            <template slot-scope="scope">
                                {{scope.row.true_advertiser | fileFun}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                label="创建时间">
                            <template slot-scope="scope">
                               {{ scope.row.ctime | ctimeData  }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="80"
                                label="所属人">
                            <template slot-scope="scope">
                                {{scope.row.submituser0.name}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="80"
                                prop="fapiao"
                                label="客保时间 ">
                            <template slot-scope="scope">
                                {{scope.row.r_time | t_timeDate}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            header-align="center"
                            min-width="80"
                            label="状态">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                已通过
                            </div>
                        </template>
                    </el-table-column>
                        <el-table-column
                                header-align="center"
                               width="200"
                                label="操作">
                            <template slot-scope="scope">

                                <div class="operation" v-if="scope.row.ytime == 0">
                                    <div v-if="scope.row.is_claim == 0">
                                        <span @click="type_z(scope.row )">
                                             <svg class="icon" aria-hidden="true" style="width: 18px;height: 18px;">
                                            <use xlink:href="#icon-zhengzhuanhuan"></use>
                                        </svg>
                                            转正
                                        </span>
                                        <span   @click="type_f(scope.row.id )" >
                                             <svg class="icon" aria-hidden="true" style="width: 18px;height: 18px">
                                                <use xlink:href="#icon-shanchu"></use>
                                            </svg>
                                            放弃
                                        </span>
                                        <span @click="type_x(scope.row.id )" v-if="scope.row.is_xu == 0">
                                            <svg class="icon" aria-hidden="true" style="width: 18px;height: 18px">
                                                <use xlink:href="#icon-xucaitong"></use>
                                            </svg>
                                             续保
                                         </span>
                                        <span  v-if="scope.row.is_xu == 1" style="opacity: 0">
                                            <svg class="icon" aria-hidden="true" style="width: 18px;height: 18px;">
                                                <use xlink:href="#icon-xucaitong"></use>
                                            </svg>
                                             续保
                                         </span>
                                        <span  v-if="scope.row.is_claim == 1" style="opacity: 0">
                                        <svg  class="icon" aria-hidden="true" style="width: 18px;height: 18px;">
                                                <use xlink:href="#icon-shanchu"></use>
                                            </svg>
                                             放弃
                                         </span>
                                    </div>
                                    <div v-else style="text-align: center;color: red;">
                                        该客户已放弃
                                    </div>
                                </div>

                                <div v-else style="text-align: center;color: green ">
                                    该客户已成单
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
    import { market_kebao_list,market_kebao_list_post,kh_customerbs } from '@/api/kehu';
    import criteria from '@/components/search/criteria';  //获取条件
    import screenInput from '@/components/search/search';
    import moment from "moment"
    export default {

        data() {
            return {
                dataInfor : {
                    search:{
                    },
                },
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                chengdan:'是否成单',
                options_chengdan:[],
                //---------------------------
                screen:'',
                listLoading:true,
                market_kebao_list_post:function(page,num,val){
                    this.listLoading = true;
                    market_kebao_list_post({
                        id:this.user.id,
                        page: this.pageSize,
                        num: this.pageIndex,
                        search:this.dataInfor,
                    }).then(response => {
                        this.kebaoTable = response.list.list;
                        this.kehuTableLength =  response.list.totalCount;
                        this.pageSize =  this.search_list.kehu_kebao_page?this.search_list.kehu_kebao_page:20;
                        this.pageIndex = this.search_list.kehu_kebao_num ?this.search_list.kehu_kebao_num :1;
                        if(Math.ceil(this.kehuTableLength /this.pageSize)<  this.pageIndex){
                            this.pageIndex= Math.ceil(this.kehuTableLength /this.pageSize);
                            this.searchDataFun();
                        }

                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');  this.listLoading = false;});
                },
                market_kebao_list_postExcel:function(){
                    market_kebao_list({
                        id:this.user.id,
                        page:this.kehuTableLength ,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {

                        this.tableData =  response.list.list.filter(function(item,i) {
                            if(item.submituser0){
                                item['submituserName'] = item.submituser0.name;
                            }

                            var time=new Date(parseInt(item.r_time) * 1000);
                            item['rtime'] =  moment(item.r_time).format('YYYY-MM-DD') +' / '+ moment(item.r_time).add(3, 'M').format('YYYY-MM-DD')

                            item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称','创建时间', '所属人','客保时间'];
                            const filterVal = ['advertiser', 'appname', 'ctime','submituserName','rtime'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '客保列表');
                        })


                    }). catch(err => {this.$message.error('获取失败');});
                },
//表格
                kebaoTable:[],
                market_kebao_list:function(page,num){
                    market_kebao_list({
                        id:this.user.id,
                        page:page,
                        num:num,
                    }).then(response => {
                        this.kebaoTable = response.list.list;
                        this.kehuTableLength =  response.list.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //客保放弃
                kh_customerbs:function(val,data){
                    kh_customerbs({
                        id:val,
                        data:data,
                    }).then(response => {
                        this.market_kebao_list(this.page,this.num);
                    }). catch(err => {this.$message.error('获取失败');});
                },

                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                //归档弹窗
                tanInfor(dataText,dataName,id) {
                    this.$confirm(dataText,dataName , {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                         if(dataName == '放弃'){
                            let data = {
                                "is_claim":"1",
                            };
                            this.kh_customerbs(id,data)
                        }else if(dataName == '续保'){
                            let data = {
                                "is_xu":"1",
                                "audit":"0"
                            };
                            this.kh_customerbs(id,data);
                        }

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                },
            }
        },
        components: {
            screenInput
        },
        computed: {
            ...mapGetters([
                'user',
                'search_list',
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.options_chengdan = criteria.options_chengdan;
            this.dataInfor.search['Search_str'] = this.search_list.kehu_kebao_name;
            this.dataInfor.search['start_date'] = this.search_list.kehu_kebao_start_date;
            this.dataInfor.search['end_date'] = this.search_list.kehu_kebao_end_date;
            this.dataInfor.search['is_chengdan'] = this.search_list.kehu_kebao_is_chengdan;
            this.dataInput = [this.search_list.kehu_kebao_start_date,this.search_list.kehu_kebao_end_date];
            this.chengdan = this.search_list.kehu_kebao_is_chengdan?this.search_list.kehu_kebao_is_chengdan:'是否成单';
            this.pageSize =  this.search_list.kehu_kebao_page?this.search_list.kehu_kebao_page:20;
            this.pageIndex = this.search_list.kehu_kebao_num ?this.search_list.kehu_kebao_num :1;
            this.kehuTableLength = this.search_list.kehu_kebao_length ?this.search_list.kehu_kebao_length :1;

            this.market_kebao_list_post(this.page,this.num,this.dataInfor);
            this.screen = [
              {
                  name:'搜索',
                  data: this.search_list.kehu_kebao_name
              }
          ]
        },
        methods: {
            ...mapActions([
                'searchData'
            ]),
            searchDataFun(){
                this.searchData({
                   kehu_kebao_name: this.dataInfor.search.Search_str,
                   kehu_kebao_start_date: this.dataInfor.search.start_date,
                   kehu_kebao_end_date: this.dataInfor.search.end_date,
                   kehu_kebao_is_chengdan:this.dataInfor.search.is_chengdan,
                    kehu_kebao_page:this.pageSize,
                    kehu_kebao_num:this.pageIndex,
                    kehu_kebao_length:this.kehuTableLength
                });
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
                this.market_kebao_list_post(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
            //是否成单
            searchstart(val){
                this.dataInfor.search.is_chengdan = val;
                this.market_kebao_list_post(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },

            outExcel(){
                this.market_kebao_list_postExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                if(Math.ceil(this.kehuTableLength /this.pageSize) >= this.pageIndex){
                    this.market_kebao_list_post(this.page,this.num,this.dataInfor);
                }
                this.searchDataFun();
            },
            handleCurrentChange(val) {

                this.pageIndex = val;
                this.market_kebao_list_post(this.page,this.num,this.dataInfor);
                this.searchDataFun();
            },
//搜索
            search(val){
                this.dataInfor.search.Search_str = val;
                this.market_kebao_list_post(this.page,this.num,val);
                this.searchDataFun();
            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{},
                };
                this.screen = [
                    {
                        name:'搜索',
                        data: ''
                    }
                ];
                this.pageSize =  20;
                this.pageIndex = 1;
                this.kehuTableLength = 0;
                 this.dataInput= [];
                 this.chengdan = '是否成单';
                this.market_kebao_list_post(this.page,this.num, this.dataInfor);
                this.searchData({
                   kehu_kebao_name:'',
                   kehu_kebao_start_date: '',
                   kehu_kebao_end_date: '',
                   kehu_kebao_is_chengdan: '',
                });
            },
//跳转
            jumpnewCustomer(val){
                this.$router.push({ name: 'newCustomer'});
            },
 //操作
            type_z(val){
                this.$router.push({ name: 'AddCustomerInformation',query: { id: val.id} });
                localStorage.removeItem('kebaoAccounts');
            },
            type_f(val){
                this.tanInfor('确认放弃此客户，将不可恢复, 是否继续?','放弃',val);
            },
            type_x(val){
                this.tanInfor('确认续保此客户，将不可恢复, 是否继续?','续保',val);
            }
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            t_timeDate(val){
                var time=new Date(parseInt(val) * 1000);
                return  moment(time).format('YYYY-MM-DD') +' / '+ moment(time).add(3, 'M').format('YYYY-MM-DD')
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
    .kebaoList {
        width:100%;
        .kebaoBox {

            .screen {
                margin-bottom: 20px;
                .outExcel {
                    float: right;
                    height:32px;
                    line-height: 10px;
                    font-size: 12px;
                    margin-left:10px;
                }
                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;
                    .dropdownBut {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
                        font-size: 12px;
                        vertical-align: top;
                    }
                    .outExcel {
                        border:1px solid #54ADFF;
                        background: none;
                        color: #54ADFF;
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

        }

    }

</style>
