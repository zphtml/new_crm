<template>
    <el-row style="" class="fenpeishangwu">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   客户列表>
               </span>

            <template v-if="who=='business'">
                分配商务
            </template>
            <template v-else>
                分配销售
            </template>
        </p>
        <el-col :span="24" style="margin-top: 20px">
            <el-col :span="24" >
                <div class="screen">
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
                    <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
                    <el-button type="primary" size="small" style="float: right" @click="moretan">一键修改</el-button>

                </div>
            </el-col>


        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
            <el-table
                    highlight-current-row v-loading="listLoading"
                    :data="fenpei_table"
                    height="740"
                    class="vue-table"
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="advertiser"
                        sortable="custom"
                        min-width="200"
                        :label="$t('titles.customer')">
                </el-table-column>
                <el-table-column
                        prop="appname"
                        label="简称"
                        min-width="200"
                        sortable="custom">
                </el-table-column>
                <el-table-column
                        min-width="100"
                        label="负责商务">
                    <template slot-scope="scope">
                        <template v-if="scope.row.business0">
                            {{scope.row.business0.name}}
                        </template>
                        <template v-else>
                            --
                        </template>
                    </template>

                </el-table-column>
                <el-table-column
                        min-width="100"
                        label="负责销售">
                    <template slot-scope="scope">
                        <template v-if="scope.row.business0">
                            {{scope.row.submituser0.name}}
                        </template>
                        <template v-else>
                            --
                        </template>

                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="100">
                    <template slot-scope="scope">

                        <img src="../../../assets/pen.png" style="width:18px;height:18px" @click="tan(scope.row)" alt="">
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" style="text-align: right;margin-top: 20px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[15, 20, 30, 40]"
                        :page-size="size"
                        :current-page="current"

                        layout="sizes, prev, pager, next, jumper"
                        :total="TableLength">
                </el-pagination>
            </el-col>
        </el-col>
        <el-dialog title="一键修改" :visible.sync="addFormVisibleReceive"  class="tan_fenpei"  @close="addFormVisibleReceive = false;"  size="tiny" >
            <div :span="24">
                <el-input
                        placeholder="名称搜索"
                        icon="search"
                        size="mini"
                        v-model="inputSearch">
                </el-input>
            </div>
            <div style="margin-top: 20px;margin-bottom: 20px;">
                <el-table
                        highlight-current-row v-loading="listLoading"
                        :data="modificationData"
                        class="vue-table"
                        height="350"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="选择">
                        <template slot-scope="scope">
                            <input :id="scope.row.id" :key="scope.row.id" type="radio" name="item">
                            <label :for="scope.row.id"></label>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-if="who=='business'"
                            prop="name"
                            label="商务">
                    </el-table-column>
                    <el-table-column
                            v-else
                            prop="name"
                            label="销售">
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: right">
                <el-button type="primary" @click="changeshangwu">确定</el-button>
                <el-button @click="addFormVisibleReceive=false">取消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { customer_list1 ,Roler_users,Upmarket} from '@/api/kehu';
    import {mapGetters} from 'vuex';
    import screenInput from '@/components/search/search';
    import criteria from '@/components/search/criteria';  //获取条件
    import moment from "moment"

    export default {
        name: 'dashboard',
        components: {
            screenInput
        },
        data() {
            return {
                searchInfor:[],

                // 搜索时间
                date_type:1,
                options_type:[],
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                //  -----------------------------------
                screen :[],
                buss:[],
                mark:[],
                changeid:[],
                who:'',
                TableLength:0,
                current:1,
                size:20,
                allid:[],
                radio2:'',
                appname: '',
                select: 'advertiser',
                inputSearch:'',
                addFormVisibleReceive:false,
                listLoading:true,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                fenpei_table: [],
                custable(){
                    customer_list1(this.user, this.searchInfor,this.current,this.size).then(response => {
                        this.TableLength=response.list.totalCount;
                        this.fenpei_table=response.list.data;
                        this.listLoading = false;
                    }).catch(error => {

                    });
                },
                Roler_users(name){
                    Roler_users(this.user,name).then(response => {
                        this.buss=response;
                        this.mark=response;

                    }).catch(error => {

                    });
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
            modificationData(){
                let _this = this;
                let dataTable = this.mark;
                dataTable =  dataTable.filter(function(item){
                    if(item.name.indexOf(_this.inputSearch)>=0 ){
                        return item
                    }
                });
                return dataTable
            }
        },
        created() {
            this.options_type = criteria.options_type;
            this.screen = {
                infor:'false',
            };

            this.searchInfor={};
            this.searchInfor.Search_type=this.select;
            this.custable( );
            let name = '';
            if(this.$route.query.id=='1'){
                this.who='business';
                name='销售助理'
            }else{
                this.who="submituser";
                name='销售'

            }

            this.Roler_users(name)
        },

        methods: {
            huitui(){
                this.$router.go(-1)
            },
            //搜索日期条件选择
            dateTypeChange(){
                this.searchInfor.date_type = this.date_type;
                this.custable();

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
                this.searchInfor.start_date = start_date;
                this.searchInfor.end_date = end_date;
                this.custable();

            },

            //搜索
            search(val){
                this.searchInfor.Search_str = val;
                this.custable();
            },
//清除
            searchClear(){
                this.searchInfor = {};
                this.custable();
            },
            tan(val){
                this.changeid=[val];
                this.addFormVisibleReceive=true;
            },
            moretan(){
                if(this.allid.length>0){
                    this.changeid=this.allid;
                    this.addFormVisibleReceive=true;
                }else{
                    this.$message({
                        message: '请选择客户！！',
                        type: 'warning'
                    });
                }

            },

            changeshangwu(){

                let id=$("input[name='item']:checked").attr('id');//给谁
                if(id){
                    let arr=[];
                    for(let i=0;i<this.changeid.length;i++){
                        arr.push(this.changeid[i].id)
                    }
                    let str=arr.join(",");

                    Upmarket(str,id,this.who).then(response => {
                        this.addFormVisibleReceive=false;
                        this.custable()
                    }).catch(error => {

                    });
                }else{
                    this.$message({
                        message: '请选择商务！！',
                        type: 'warning'
                    });
                }


            },

            //多选
            handleSelectionChange(val) {
                this.allid=val;
            },
            //一页展示多少条
            handleSizeChange(val) {
                this.size=val
                this.custable();
            },
            //当前第几页
            handleCurrentChange(val) {
                this.current=val
                this.custable( );
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/search.scss";

</style>
