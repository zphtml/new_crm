<template>
    <div class="kehu_compactList" >
        <el-row class="compactBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span style="cursor: pointer" @click="jumphetong">上一级</span> > <span>{{ typeName }}</span>

            </p>
            <el-col :span="24" class="compactListTabs screen">
                <customerDiv :screen=screen  @search="search" @searchClear="searchClear" style="display: inline-block"></customerDiv>
                <el-button type="primary" class="outExcel" @click="outExcel">导出Excel</el-button>
                <el-button type="primary" class="addhetong" @click="addhetong" v-if="this.$route.query.type == 1">添加合同</el-button>
                <el-button type="primary" class="addhetong" @click="addhetong_kj" v-if="this.$route.query.type == 2">添加执行框架</el-button>
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
                                {{scope.row.advertiser0 | fileFun1}}
                                <span class="appInfor qu" v-if="scope.row.customer_type == 2">
                                                    渠
                                                </span>
                                <span class="appInfor zhi" v-if="scope.row.customer_type == 1">
                                                    直
                                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :label="$t('titles.advertiser')">
                            <template slot-scope="scope">
                                {{scope.row.advertiser0 | fileFun2}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="简称">
                            <template slot-scope="scope">
                                {{scope.row.appname}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="this.$route.query.type == 1"
                                label="产品线">
                            <template slot-scope="scope">
                                <div class="linBox">
                                    <span   v-for="(data,index) in scope.row.rencontract" >
                                            {{ data.productline.name }}
                                       <i class="lineSpan">
                                            /
                                        </i>
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="this.$route.query.type == 2"
                                label="产品线">
                            <template slot-scope="scope">
                                <div class="linBox">
                                    <span >
                                        {{ scope.row.prlin }}
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                sortable
                                min-width="100"
                                label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.ctime | ctimeData}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="this.$route.query.type == 1"
                                label="归档">
                            <template slot-scope="scope">
                                  <span v-if="scope.row.isguidang == 1">
                                        已归档
                                  </span>
                                <span v-if="scope.row.isguidang == 0">
                                        未归档
                                  </span>
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
                                {{scope.row.submitname }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="添加子合同">
                            <template slot-scope="scope">
                                <div style="cursor: pointer;text-align: center"   v-if="scope.row.audit == 2">
                                    <div class="add" style="display: inline-block;width: 20px;height: 20px;background: rgb(187, 187, 187);border-radius: 50%;line-height: 20px;color: white;">
                                        <img src="../../../assets/jia.png" style="width: 20px;height: 20px;" alt="">
                                    </div>
                                </div>
                                <div style="cursor: pointer;text-align: center" @click.stop="add_zi(scope.row)" v-if="scope.row.audit != 2">
                                    <div class="add" style="display: inline-block;width: 20px;height: 20px;background: #54adff;border-radius: 50%;line-height: 20px;color: white;">
                                        <img src="../../../assets/jia.png" style="width: 20px;height: 20px;" alt="">
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <!--执行框架去除，取消与合同关联-->
                        <!--<el-table-column-->
                                <!--v-if="this.$route.query.type == 1"-->
                                <!--label="新增执行框架" >-->
                            <!--<template slot-scope="scope">-->
                                <!--<div v-if="Number(scope.row.audit_count) > 2 ">-->
                                    <!--<div style="cursor: pointer" @click.stop="addxieyi(scope.row)" >-->
                                        <!--<div class="add" style="display: inline-block;width: 20px;height: 20px;background: #54adff;border-radius: 50%;text-align: center;line-height: 20px;color: white;">-->
                                            <!--<img src="../../../assets/jia.png" style="width: 20px;height: 20px;" alt="">-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div v-if="Number(scope.row.audit_count) <= 2 ">-->
                                    <!--<div v-if="Number(scope.row.audit_count) == 2 && Number(scope.row.audit) == 1 ">-->
                                        <!--<div style="cursor: pointer" @click.stop="addxieyi(scope.row)" v-if="Number(scope.row.audit_count) <= 2 ">-->
                                            <!--<div class="add" style="display: inline-block;width: 20px;height: 20px;background: #54adff;border-radius: 50%;text-align: center;line-height: 20px;color: white;">-->
                                                <!--<img src="../../../assets/jia.png" style="width: 20px;height: 20px;" alt="">-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                   <!--<div v-else>-->
                                       <!--<div style="cursor: pointer"  v-if="Number(scope.row.audit_count) < 2 " @click.stop="addNo(scope.row)">-->
                                           <!--<div class="add" style="display: inline-block;width: 20px;height: 20px;background: #bbbbbb;border-radius: 50%;text-align: center;line-height: 20px;color: white;">-->
                                               <!--<img src="../../../assets/jia.png" style="width: 20px;height: 20px;" alt="">-->
                                           <!--</div>-->
                                       <!--</div>-->
                                   <!--</div>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
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
        <!--弹窗 转出-->
        <el-dialog title="添加执行框架" :visible.sync="addFormVisible"  @close="close"   :close-on-click-modal="false" class="tan_addxieyi" >
            <el-col :span="24">
                <el-col :span="6">媒介合同</el-col>
                <el-col :span="18">
                    <el-select v-model="mht" filterable  placeholder="请选择"  v-on:input ="mhtChange">
                        <el-option
                                v-for="(item,key) in mhtOptions"
                                :key="item.title"
                                :label="item.title"
                                :value="key">
                        </el-option>
                    </el-select>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin: 5px 0;">
                <el-col :span="6"  v-if="customer_type == 2">渠道{{ $t('titles.fandian') }}</el-col>
                <el-col :span="6" v-if="customer_type == 1">个人{{ $t('titles.fandian') }}</el-col>

                <el-col :span="18" >
                    <el-input v-model="kh_grfd" placeholder="请输入内容" type="number" v-on:input ="addfandian"></el-input>（%）
                </el-col>
            </el-col>
            <el-col :span="24" style="margin: 5px 0;">
                <el-col :span="6">税点</el-col>
                <el-col :span="18" >
                    <el-input v-model="gf_shuidian" placeholder="请输入内容" type="number" v-on:input ="addfandian"></el-input>（%）
                </el-col>
            </el-col>
            <el-col :span="24" style="margin: 5px 0;">
                <el-col :span="6">{{ $t('titles.fandian') }}</el-col>
                <el-col :span="18">
                    {{ fandian }}
                </el-col>
            </el-col>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanchu" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { customer_contract_list_new,productline,xieyicustomer_contract_list,contract_add,hetongAddru} from '@/api/kehu';
    import customerDiv from  '@/components/search/contract';
    import stateDiv from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {

        data() {
            return {
                routeId:'',
                dataInfor : {
                    search:{
                        customer_type:1,
                    },
                },
                addFormVisible:false,
                typeName:'',
                screen:'',
                stateData:'',
                //正常合同
                mht:'',
                dataInforNum:0,
                kh_grfd:'0.00',
                gf_shuidian:'6',
                formData:[
                    {
                        "advertiser":"",     //公司id
                        "submituser":"",	//提交人
                        "market":"",		//销售id
                        "agent_company":"",   // 代理公司 id
                        "contract_no":"", //合同编号LZAD_16_201711801
                        "appname":"",
                        "contract_start": moment().format('YYYY-MM-DD'),   //合同开始时间
                        "contract_end":"",	// 合同结束时间
                        "payment_type":"1",	//	 付款方式
                        "zhouqi":0,			// 周期
                        "fandian":[],
                        'product_line':[],
                        'mht_id':'',
                        'kh_grfd':'0.00',
                        'gf_shuidian':'6',
                        'contract_new_id':'',
                        "is_jstype":0,		// 结算方式 0普通方式  1按消耗
                        "note":" "		// 备注
                    }
                ],
                customer_type:'1',
                advertiser:'',
                mhtOptions:[],
                fandian:'',
                activeName: 'first',
                inputText:'',
                dataInput:[],
                startValueProperty:'合同属性',
                optionsProperty:[],
                startValueStart:'审核状态',
                optionsStart:[],
                startValueProduct:'产品线',
                optionsProduct:[],
                startValuePigeonhole:'是否归档',
                optionsPigeonhole:[],
                compactListTable:[],
                compactListTable1:[],
                audit_count:'',
                listLoading:true,
                //产品线
                productline(){
                    productline({
                    }).then(response => {
                        let pr_id = {
                            name:'产品线',
                            data:[]
                        };
                        response.unshift({
                            name:'全部',
                            zi:[{
                                id:'',
                                name:'全部',
                            }]
                        });
                        pr_id.data.push(response);
                        this.screen = [
                            {
                                name:'审核状态',
                                data:[
                                    {
                                        label:'全部',
                                        value:'',
                                    },
                                    {
                                        label:'未审核',
                                        value:'0',
                                    },
                                    {
                                        label:'已通过',
                                        value:'1',
                                    },
                                    {
                                        label:'未通过',
                                        value:'2',
                                    }
                                ],
                            },{
                                name:'合同属性',
                                data:[
                                    {
                                        label:'全部',
                                        value:'',
                                    },
                                    {
                                        label:'普通合同',
                                        value:'1',
                                    },
                                    {
                                        label:'框架合同',
                                        value:'0',
                                    }
                                ],
                            },{
                                name:'是否归档',
                                data:[
                                    {
                                        label:'全部',
                                        value:'',
                                    },
                                    {
                                        label:'已归档',
                                        value:'1',
                                    },
                                    {
                                        label:'未归档',
                                        value:'0',
                                    },
                                ],
                            },
                        ];
                        this.screen.push(pr_id)
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //合同table
                customer_contract_list_new:function(page,num,val){
                    if(this.$route.query.type == 1){
                        customer_contract_list_new({
                            data:this.routeId,
                            page:page,
                            num:num,
                            search:val,

                        }).then(response => {
                            for(let i = 0;i<response.list.data.length;i++){
                                response.list.data[i]['audit_countType'] = this.audit_count;
                            }
                            this.compactListTable = response.list.data;

                            this.hetongTableLength =  response.list.totalCount;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }else  if(this.$route.query.type == 2){
                        xieyicustomer_contract_list({
                            data:this.routeId,
                            page:page,
                            num:num,
                            search:val,
                        }).then(response => {
                            for(let i = 0;i<response.list.data.length;i++){
                                response.list.data[i]['audit_countType'] = this.audit_count;
                            }
                            this.compactListTable = response.list.data;

                            this.hetongTableLength =  response.list.totalCount;
                            this.listLoading = false;
                        }). catch(err => {this.$message.error('获取失败');});
                    }


                },
                contract_add:function(data){
                    contract_add({
                        id:data,
                    }).then(response => {
                        this.mhtOptions = response.data.meijie_list;
                        this.formData[0].advertiser =response.data.contract_info.advertiser;
                        this.formData[0].submituser =response.data.contract_info.submituser;
                        this.formData[0].agent_company =response.data.contract_info.agent_company;
                        this.formData[0].contract_no =response.data.contract_info.contract_no;
                        this.formData[0].contract_start =response.data.contract_info.contract_start;
                        this.formData[0].contract_end =response.data.contract_info.contract_end;
                        this.formData[0].payment_type =response.data.contract_info.payment_type;
                        this.formData[0].zhouqi =response.data.contract_info.zhouqi;
                        this.formData[0].is_jstype =response.data.contract_info.is_jstype;
                        this.formData[0].note =response.data.contract_info.note;
                        this.customer_type = response.data.advertiser.customer_type;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                hetongAddru:function(data){
                    hetongAddru(
                        {data:data}
                    ).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '新增执行框架成功',
                                type: 'success'
                            });
                        }else{
                            this.addFormVisible = true;
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                //导出
                tableData:[],
                customer_contract_list_newExcel:function(){
                    if(this.$route.query.type == 1){
                        customer_contract_list_new({
                            data:this.routeId,
                            page: this.hetongTableLength,
                            num:1,

                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.list.data.filter(function(item,i) {
                                if(item.advertiser0){
                                    item['advertiseraccount'] = item.advertiser0.advertiser;
                                    item['guanggaozhu'] = item.advertiser0.true_advertiser;
                                    if(item.advertiser0.business0){
                                        item['advertiserName'] = item.advertiser0.business0.name;
                                    }
                                }
                                if(item.isguidang == 1){
                                    item['guidang'] = "归档"
                                }else{
                                    item['guidang'] = "未归档"
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

                                let lineName =[];
                                for(let a = 0;a<item.rencontract.length;a++){
                                    lineName.push(item.rencontract[a].productline.name);
                                };
                                item['lineName'] = lineName.toString();


                                item.ctime = moment(new Date(parseInt(item.ctime) * 1000)).format('YYYY-MM-DD');
                                return item
                            })
                            require.ensure([], () => {
                                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                                const tHeader = [this.$t('titles.customer'), this.$t('titles.advertiser'),'简称', '产品线', '创建时间','归档','提交人'];
                                const filterVal = ['advertiseraccount','guanggaozhu', 'appname', 'lineName','ctime', 'guidang','submitname'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '合同');
                            })

                        }). catch(err => {this.$message.error('获取失败');});
                    }else  if(this.$route.query.type == 2){
                        xieyicustomer_contract_list({
                            data:this.routeId,
                            page: this.hetongTableLength,
                            num:1,
                            search:this.dataInfor,
                        }).then(response => {
                            this.tableData =  response.list.data.filter(function(item,i) {
                                if(item.advertiser0){
                                    item['advertiseraccount'] = item.advertiser0.advertiser;
                                    item['guanggaozhu'] = item.advertiser0.true_advertiser;
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
                                const tHeader = [this.$t('titles.customer'),this.$t('titles.advertiser'), '简称', '产品线', '创建时间', '合同属性','提交人'];
                                const filterVal = ['advertiseraccount','guanggaozhu', 'appname', 'prlin','ctime', 'contract_state','submitname'];
                                const list = this.tableData;
                                const data = this.formatJson(filterVal, list);
                                export_json_to_excel(tHeader, data, '执行框架');
                            })

                        }). catch(err => {this.$message.error('获取失败');});
                    }


                },
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                hetongTableLength:12,
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
            customerDiv,

        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            if(this.$route.query.type == 1){
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'contract_new'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
            }else  if(this.$route.query.type == 2){
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'contract'){
                        this.audit_count = this.audit_action[i].audit_count;
                    }
                }
            }

            if(this.$route.query.type == 1){
                this.typeName = '合同列表'
            }else if(this.$route.query.type == 2){
                this.typeName = '执行框架列表'
            }
            this.customer_contract_list_new(this.page,this.num,this.dataInfor);
            this.productline();

        },
        methods: {
            //添加执行框架
            addxieyi(val){
                this.formData[0].market =val.market;
                this.formData[0].contract_new_id =val.id;
                this.addFormVisible = true;
                this.contract_add(val.id)
            },
            addNo(){

            },
            addfandian(){
                if(this.kh_grfd == ""){
                    this.kh_grfd = '0.00'
                }
                if(this.gf_shuidian == ""){
                    this.gf_shuidian = '6'
                }

            },
            mhtChange(index){
                this.dataInforNum = 1;
                this.formData[0].fandian = [];
                this.formData[0].product_line = [];
                this.fandian =this.mhtOptions[index].fandian;
                this.formData[0].fandian.push(this.mhtOptions[index].fandian);
                this.formData[0].product_line.push(this.mhtOptions[index].product_line);
                this.formData[0].mht_id = (this.mhtOptions[index].id);
            },
            close(){
                this.addFormVisible = false;
            },
            pullzhuanchu(){
                if(this.dataInforNum ==  1){
                    this.$confirm('确认提交?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.formData[0].kh_grfd = this.kh_grfd;
                        this.formData[0].gf_shuidian = this.gf_shuidian;
                        this.addFormVisible = false;
                        this.hetongAddru( this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }else{
                    this.$message({
                        message: '请选择一条媒介合同',
                        type: 'warning'
                    });
                }


            },
            jumphetong(){
                this.$router.go(-1)
            },
            add_zi(val){
                this.$router.push({ name: 'addTheContract_customer' , query: { id:val.advertiser,htId: val.contract_no}});
            },
            addhetong(){
                if(this.$route.query.type == 1){
                    this.$router.push({ name: 'addTheContract' , query: { id: this.routeId}});
                }

            },
            addhetong_kj(){
                this.$router.push({ name: 'addTheContract_xy' , query: { id: this.routeId}});

            },
            changedate(){},
            searchproperty(){

            },
            //导出
            outExcel(){
                this.customer_contract_list_newExcel()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //搜索
            search(val){
                this.dataInfor = val;
                this.customer_contract_list_new(this.page,this.num,val);
            },
//清除
            searchClear(){
                this.dataInfor= {
                    search:{
                        iszuofei:'0',
                        customer_type:1,
                    }
                };
                this.customer_contract_list_new(this.page,this.num,this.dataInfor);

            },
            //tr跳转
            clickTr(val){
                if(this.$route.query.type == 1){
                    this.$router.push({ name: 'viewcontract' , query: { id: val.id}});
                }else if(this.$route.query.type == 2){
                    this.$router.push({ name: 'agreementDetails' , query: { id: val.id}});
                }
            },
            addHetong(val){
                this.$router.push({ name: 'newContrac' , query: { id: val.id}});
            },
            //正常分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.dataInfor.search['iszuofei'] = 0;
                this.customer_contract_list_new(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;

                this.customer_contract_list_new(this.page,this.num,this.dataInfor);
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
            fileFun1(val){
                if(val){
                    return val.advertiser
                }else{
                    return '---'
                }
            },
            fileFun2(val){
                if(val){
                    if(val.true_advertiser){
                        return val.true_advertiser
                    }else{
                        return '--'
                    }
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
    .kehu_compactList {
        width:100%;
        .compactBox {

            .screen {
                margin-bottom: 20px;
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
        .compactListTabs {
            .outExcel {
                float: right;
                border:1px solid #54ADFF;
                background: none;
                color: #54ADFF;
                z-index: 999;
                height:32px;
                line-height: 10px;
                line-height: 9px;
                font-size: 12px;
            }
            .addhetong {
                float: right;
                height:32px;
                line-height:9px;
                font-size: 12px;
                margin-right: 10px;
            }
            .tabsList {
                .el-tabs__item{
                    padding: 0 50px;
                }

            }
            .compactFirtsTitle {
                margin:0;
            }
            .compactFirtsTable {
                margin-top: 20px;
                .vue-table {
                    .operation {
                        font-size: 12px!important;
                        text-align: center;
                        width:20px;
                        height:20px;
                        border:1px solid black;
                        line-height: 18px;
                        cursor: pointer;
                    }

                    .signal {
                        span{
                            width:4px;
                            display: inline-block;
                            margin: 0 -1px;
                            vertical-align: bottom;
                            background: #e0e0e0;
                        }
                        span:first-child{
                            height: 4px;
                        }
                        span:nth-child(2){
                            height: 8px;
                        }
                        span:nth-child(3){
                            height: 12px;
                        }
                        span:nth-child(4){
                            height: 16px;
                        }
                        span:nth-child(5){
                            height: 20px;
                        }
                    }
                    .one {
                        span:first-child{
                            background: #ff4811;
                        }
                    }
                    .tow{
                        span:first-child{
                            background: #ff4811;
                        }
                        span:nth-child(2){
                            background: #fe9e00;
                        }
                        span:nth-child(3){
                            background: #ffc000;
                        }
                        span:nth-child(4){
                            background: #8fc31f;
                        }
                        span:nth-child(5){
                            background: #22ac38;
                        }
                    }
                    .three{
                        span:first-child{
                            background: #ff4811;
                        }
                        span:nth-child(2){
                            background: #fe9e00;
                        }
                        span:nth-child(3){
                            background: #ffc000;
                        }
                    }
                    .four{
                        span:first-child{
                            background: #ff4811;
                        }
                        span:nth-child(2){
                            background: #fe9e00;
                        }
                        span:nth-child(3){
                            background: #ffc000;
                        }
                        span:nth-child(4){
                            background: #8fc31f;
                        }
                    }
                    .five{
                        span:first-child{
                            background: #ff4811;
                        }
                        span:nth-child(2){
                            background: #fe9e00;
                        }
                        span:nth-child(3){
                            background: #ffc000;
                        }
                        span:nth-child(4){
                            background: #8fc31f;
                        }
                        span:nth-child(5){
                            background: #22ac38;
                        }
                    }
                    .start_icon {
                        display: inline-block;
                        margin:0 2%;
                        font-size: 16px;

                    }
                }
            }
        }
        .tan_addxieyi{
            .el-dialog {
                width:400px;
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }
                .el-input {
                    width:210px;
                }
                .infor {
                    width:100%;
                }
                .el-dialog__footer {
                   padding: 10px;
                }

            }
    }
    }
</style>
