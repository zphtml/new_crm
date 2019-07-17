<template>
    <div class="kehuaccountList" >
        <el-row class="kehuaccountBox">
            <el-col :span="24"  class="screen" >
                <screenInput  :screen=screen @search="search" @searchClear="searchClear" style="display: inline-block"></screenInput>
            </el-col>
            <el-col :span="24" style="text-align: right;margin-bottom: 10px">
                <el-button style="padding: 5px 15px;height: auto;font-size: 12px;width: auto" @click="addaccount" type="primary" class="addaccount">添加账户</el-button>
                <el-button style="padding: 5px 15px;height: auto;font-size: 12px;width: auto" @click="zr_account" type="primary" class="addaccount">转入账户</el-button>
                <el-button style="padding: 5px 15px;height: auto;font-size: 12px;width: auto" @click="add_gl_account" type="primary" class="addaccount">添加关联账户</el-button>
                <el-button style="padding: 5px 15px;height: auto;font-size: 12px;width: auto" type="primary" class="outExcel" @click="outExcel">导出Excel</el-button>

            </el-col>
            <el-col :span="24" class="kehuaccountTable">
                <el-table
                        highlight-current-row v-loading="listLoading"  border
                        :data="kehuaccountTable"
                        tooltip-effect="dark"
                        class="vue-table"
                        height="740"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="简称">
                        <template slot-scope="scope">
                            <div @click="jumpmessage(scope.row)">
                                {{scope.row.appname | fileFun}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="广告主">
                        <template slot-scope="scope">
                            <div style="text-align: center" @click="jumpmessage(scope.row)">
                                {{scope.row.guanggaozhu | fileFun}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            :label="$t('titles.nick')">
                        <template slot-scope="scope">
                            <div style="text-align: center" @click="jumpmessage(scope.row)">
                                {{scope.row.product | fileFun}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="关联账户名称">
                        <template slot-scope="scope">
                            <div @click="jumpmessage(scope.row)">
                                <span v-if="scope.row.alias">
                                    {{scope.row.alias }}
                                </span>
                                <span v-else>
                                  ---
                                </span>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            label="账户用户名">
                        <template slot-scope="scope">
                            <div @click="jumpmessage(scope.row)">
                                {{scope.row.a_users | fileFun}}
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            label="总消耗">
                        <template slot-scope="scope">
                            <div  @click="jumpmessage(scope.row)">
                                {{scope.row.total_cost  | currency('')}}
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            label="总充值">
                        <template slot-scope="scope">
                            <div @click="jumpmessage(scope.row)">
                                {{scope.row.total_pay  | currency('')}}
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="开始时间">
                        <template slot-scope="scope">
                            <div style="text-align: center" @click="jumpmessage(scope.row)">
                                {{scope.row.ctime | ctimeData}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="到期时间">
                        <template slot-scope="scope">
                            <div @click="jumpmessage(scope.row)" style="text-align: center">
                                {{scope.row.endtime | ctimeData}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <div  style="text-align: center" >
                                 <span class="color" v-if="scope.row.endtime== '4092599349'" @click="jieshu(scope.row.id)">
                                        结束
                                    </span>
                                <span v-else>
                                        已结束
                                    </span>
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
            </el-col>
        </el-row>
        <el-dialog title="转入账户" :visible.sync="addFormVisible1"  @close="close"  :close-on-click-modal="false" class="tan_shiftTo" >
            <el-col :span="24" class="Tan_select">
                <el-select size="mini" v-model="accountvalue" placeholder="请选择" @change="accountchange">
                    <el-option
                            v-for="(item,index) in accountoptions"
                            :key="item.id"
                            :label="item.accountName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="24" class="Tan_table">
                <el-col :span="24" class="Tan_header">
                    <el-col :span="8" class="left" >
                        <span @click="allcheck">
                            全选
                        </span>
                    </el-col>
                    <el-col :span="16" class="right">
                        账户名称
                    </el-col>
                </el-col>
                <el-col :span="24" class="TanBox" >
                    <el-col :span="24" class="Tan_body" v-for="(data,key) in dataInforTable" :key="key">
                        <el-col :span="8" class="left">
                            <div class="checkboxFour" >
                                <input type="checkbox"  :checked="data.checkId" id="checkboxFourInput"  @change="changebox($event.target.checked,key )"  name="" />
                                <label for="checkboxFourInput"  style="cursor: pointer">
                                    <span></span>
                                </label>
                            </div>
                        </el-col>
                        <el-col :span="16" class="right"  style="cursor: pointer">
                            <span @click="textName(key)" style="display: block;width: 100%;height: 100%;">
                                {{ data.a_users }}
                            </span>
                        </el-col>
                    </el-col>


                </el-col>

            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pullzhuanru" >确 定</el-button>
                <el-button @click="addFormVisible1 = false" >取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加相关账户" :visible.sync="add_xg_FormVisible1"  @close="close"  :close-on-click-modal="false" class="tan_shiftTo" >
            <el-col :span="24" style="margin-bottom: 10px">
                <el-button @click="new_add_gl_account" type="primary"  size="mini">新增关联账户</el-button>
            </el-col>
            <el-col :span="24" class="Tan_table TanBox"  v-loading="listLoading_table">
                <el-col :span="24" class="Tan_header ">
                    <el-col :span="6" class="left" >
                      选择
                    </el-col>
                    <el-col :span="18" class="right">
                        账户名称
                    </el-col>
                </el-col>
                <el-col :span="24" class="TanBox" >
                    <el-col :span="24" class="Tan_body" v-for="(data,key) in gl_all_account" :key="key">
                        <el-col :span="6" class="left">
                            <div style="text-align: center">
                                <el-radio v-model="radio" :label='key' @change="radioChange(data,key)"></el-radio>
                            </div>
                        </el-col>
                        <el-col :span="18" class="right"  style="cursor: pointer">
                          <div>
                              {{   data.alias }}
                          </div>
                            <div class="right_input" v-if="data.data == 0">
                                <el-input v-model="add_gl_name" placeholder="请输入内容" v-on:input ="add_gl_change"></el-input>
                                <span style="display: inline-block;color: #4bbe9e;margin-left: 4px;" @click="add_ok">
                                   <img src="../../../assets/xz.png" style="width: 16px;display: inline-block;vertical-align: middle" alt="">
                                </span>
                                <span style="display: inline-block;color: #f75976;margin-left: 4px;"  @click="add_no">
                                    <img src="http://test.myushan.com/ZPCRMqx.png" style="width: 16px;display: inline-block;vertical-align: middle" alt="">
                                </span>
                            </div>
                        </el-col>
                    </el-col>
                </el-col>

            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pull_gl_zhuanru" >确 定</el-button>
                <el-button @click="close" >取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { customer_contract_list,contract_account ,copy_account,ad_account_gl,account_upalias,end_account} from '@/api/kehu';

    import { account_listAllPost } from '@/api/meiti';
    import screenInput from '@/components/search/meitiList';
    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
                dataInfor : {
                    search:{},
                },
                checkedId:true,
                account_Id:'',
                screen:'',
                listLoading:true,
                listLoading_table:true,
                multipleSelection: [],
                gl_all_account:[],
                radio:0,
                add_gl_name:'',
                addtrue:0,
                pulldata:{
                    account_list:[],
                    alias:'',
                },
                keyNum:0,
                account_listAllPost:function(page,num,val){
                    account_listAllPost({
                        id:this.routeId,
                        data:this.user.auth_key,
                        page:page,
                        num:num,
                        search:val,
                    }).then(response => {
                        this.kehuaccountTable = response.list.data;
                        this.kehuTableLength =  response.list.totalCount;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                account_listAllPostExcel:function(page,num,val){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let uriId = decodeURI(ref[0].split('=')[1]);

                    account_listAllPost({
                        id:uriId,
                        data:this.user.auth_key,
                        page: this.kehuTableLength,
                        num:1,
                        search:this.dataInfor,
                    }).then(response => {
                        this.tableData =  response.list.data.filter(function(item,i) {
                            if(item.advertiser0){
                                item['advertiserName'] = item.advertiser0.advertiser;
                            }
                            item.endtime = moment(new Date(parseInt(item.endtime) * 1000)).format('YYYY-MM-DD');

                            return item
                        });
                        require.ensure([], () => {
                            const { export_json_to_excel } = require('@/vendor/Export2Excel');
                            const tHeader = [this.$t('titles.customer'), '简称', '广告主',this.$t('titles.nick'),'关联账户名称','产品线','账户用户名','密码','主手机号','总消耗','总充值','到期时间'];
                            const filterVal = ['advertiserName', 'appname','guanggaozhu','product','alias','prlin', 'a_users','a_password','tel','total_cost','total_pay','endtime'];
                            const list = this.tableData;
                            const data = this.formatJson(filterVal, list);
                            export_json_to_excel(tHeader, data, '账户列表');
                        })
                    }). catch(err => {this.$message.error('获取失败');});
                },
                copy_account:function(data){
                    copy_account({
                        id:this.routeId,
                      data:{
                          account_list:data
                      }
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                type: 'success',
                                message: response.msg,
                            });
                            this.account_listAllPost(this.page,this.num,this.dataInfor);
                            this.customer_contract_list();
                        }else{
                            this.$message.error('提交失败！');
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                ad_account_gl:function(){
                    ad_account_gl({
                        id:this.$route.query.gsId,
                    }).then(response => {
                        this.listLoading_table = false;
                        this.gl_all_account = response.data;
                        this.pulldata.alias = response.data[0].alias;
                        this.radio = 0;
                    }). catch(err => {});
                },
                account_upalias(data){
                    account_upalias({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.listLoading = true;
                            this.account_listAllPost(this.page,this.num,this.dataInfor);
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                kehuaccountTable:[],
                addFormVisible1:false,//转入
                add_xg_FormVisible1:false,//添加相关账户
                tableData:'',
                accountvalue:'',
                accountoptions:[],
                dataInforTable:[],
                customer_contract_list:function(){
                    customer_contract_list({
                        data:this.accounts.id,
                    }).then(response => {
                        let _this = this;

                        this.accountoptions = response.list.data.filter(function(item,i){
                            if(item.iszuofei !=1 && item.id !=_this.routeId){
                                item["accountName"] = item.title+'(产品线:'+item.prlin+')';
                                return item
                            }
                        });
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_account:function(id){
                    contract_account({
                        id:id,
                    }).then(response => {
                        this.dataInforTable = response.data;
                        for(var i = 0;i<response.data.length;i++){
                            this.dataInforTable['checkId'] = 'false';
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                end_account:function(id){
                    end_account({
                        id:id,
                    }).then(response => {
                        if(response.cdoe == 200) {
                            this.$message({
                                message: '提交成功消息',
                                type: 'success'
                            });


                            this.dataInfor.search['Search_str'] = this.search_list.kehu_account_text;
                            this.dataInfor.search['search_adname'] = this.search_list.kehu_accountName;
                            this.dataInfor.search['serach_yuming'] = this.search_list.kehu_yuming;
                            this.account_listAllPost(this.page, this.num, this.dataInfor);
                            this.screen = [
                                {
                                    name: '搜索',
                                    data: this.search_list.kehu_account_text,
                                    data_account: this.search_list.kehu_accountName,
                                    data_yuming:this.search_list.kehu_yuming
                                }
                            ];
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                table_Data:[{
                    name:1,
                }],
                //分页
                page:'20',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
            }
        },
        components: {
            screenInput
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
                'search_list'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        methods: {
            ...mapActions([
                'Account',
                'searchData'
            ]),
            accountClick(){
                this.routeId = this.$route.query.id;
                this.dataInfor.search['Search_str'] = this.search_list.kehu_account_text;
                this.dataInfor.search['search_adname'] = this.search_list.kehu_accountName;
                this.dataInfor.search['serach_yuming'] = this.search_list.kehu_yuming;

                this.account_listAllPost(this.page,this.num,this.dataInfor);
                this.screen =[
                    {
                        name:'搜索',
                        data: this.search_list.kehu_account_text,
                        data_account: this.search_list.kehu_accountName,
                        data_yuming:this.search_list.kehu_yuming
                    }
                ];
            },
//合同结束
            jieshu(val){
                this.$confirm(' 是否结束?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.end_account(val);
                    this.listLoading = true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            outExcel(){
                this.account_listAllPostExcel();
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            addaccount(){
                let url=location.href.split('?')[1];
                let ref=url.split('&');
                let uriId = decodeURI(ref[0].split('=')[1]);
                this.$router.push({ name: 'newAccount' , query: { id: uriId,gsId:this.$route.query.gsId}});

            },
            zr_account(){
                this.addFormVisible1 = true;
                this.accountvalue = '';
                this.dataInforTable = [];
                this.customer_contract_list();
            },
            add_gl_account(){
                this.listLoading_table = true;
                this.add_xg_FormVisible1 = true;
                this.ad_account_gl();
            },
            handleSelectionChange(val){
                this.pulldata.account_list = [];
                this.multipleSelection = val;
                for(let a = 0;a<val.length;a++){
                    this.pulldata.account_list.push(val[a].id);
                }
            },
            radioChange(val,num){
                this.pulldata.alias = val.alias;
                this.keyNum = num;
            },
            new_add_gl_account(){
                if(this.addtrue == 0){
                    this.gl_all_account.unshift({
                        data:0,
                        alias:'',
                    });
                }
                this.radio = 0;
                this.addtrue = 1;
            },
            add_gl_change(){
//                this.pulldata.alias = this.add_gl_name;
            },
            add_ok(){
                if(this.add_gl_name !=""){
                    this.gl_all_account[0].data = 1;
                    this.gl_all_account[0].alias = this.add_gl_name;
                    this.addtrue = 0;
                    this.pulldata.alias = this.add_gl_name;
                }
            },
            add_no(){
                this.gl_all_account.splice(0,1);
                this.addtrue = 0;
                if(this.keyNum >0){
                    this.radio = this.keyNum-1;
                }
            },
            pull_gl_zhuanru(){
                    if(this.pulldata.account_list.length == 0){
                        this.$message.error('请选择账户列表中选择账户后再提交！');
                    }else{
                        this.$confirm('是否提交?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            if(this.add_gl_name == "" && this.gl_all_account[0].data == 0 &&  this.keyNum == 0){
                                this.$message.error('请输入要提交的关联账户名称！')
                            }else{
                                if(this.gl_all_account[0].data == 0 &&  this.keyNum == 0){
                                    this.pulldata.alias =  this.add_gl_name;
                                }
                                this.account_upalias(this.pulldata);
                                this.addtrue = 0;
                                this.add_xg_FormVisible1 = false;
                            }

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });


                    }

            },
            textName(val){
                this.dataInforTable = this.dataInforTable.filter(function(item,i){
                    if(i == val){
                        item.checkId =  !item.checkId;
                    }
                    return item
                });
            },
            allcheck(){
              if(this.checkedId == true){
                  this.checkedId = false;
                  this.dataInforTable = this.dataInforTable.filter(function(item,i){
                       item.checkId = true;
                      return item
                  });
              }else{
                  this.checkedId = true;
                  this.dataInforTable = this.dataInforTable.filter(function(item,i){
                       item.checkId = false;
                      return item
                  });
              }

            },
            changebox(val,key){

                this.dataInforTable[key]['checkId'] = val;
            },
            //款项
            infor(){
                this.screen = {
                    name:'审核状态',
                    data:[
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
                    infor:'true',
                };
                this.click_Color = false;
                this.clickColor = true;
            },
            Money(){
                this.screen = {
                    name:'审核状态',
                    data:[
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
                    infor:'false',
                };
                this.click_Color = true;
                this.clickColor = false;
            },
            //分配
            handleCommand(handleCommand){

                this.$router.push({ name: 'fenpeishangwu' , query: { id: handleCommand}});
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.account_listAllPost(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;
                this.account_listAllPost(this.page,this.num,this.dataInfor);
            },
//搜索
            search(val){
                this.dataInfor = val;
                this.account_listAllPost(this.page,this.num,val);
                this.searchData({
                    kehu_account_text:val.search.Search_str,
                    kehu_accountName:val.search.search_adname,
                    kehu_yuming:val.search.serach_yuming,
                });
            },
//清除
            searchClear(){
                 this.dataInfor = {
                    search:{},
                };
                this.account_listAllPost(this.page,this.num,this.dataInfor);
                this.searchData({
                    kehu_account_text:'',
                    kehu_accountName:'',
                    kehu_yuming:'',
                });
            },
            jumpmessage(val){
                let url=location.href.split('?')[1];
                let ref=url.split('&');
                let uriId = decodeURI(ref[0].split('=')[1]);
                this.$router.push({ name: 'modifyAccount',query: { id:val.id,accountId:uriId,gsId:this.$route.query.gsId,} });
            },
            accountchange(index){
                this.account_Id = index;
                this.contract_account(index);
            },
            close(){
                this.addtrue = 0;
                this.addFormVisible1 = false;
                this.add_xg_FormVisible1 = false;

            },
            pullzhuanru(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = [];
                    this.dataInforTable.filter(function(item){
                        if(item.checkId == true){
                            data.push(item.id)
                        }
                    });
                    this.addFormVisible1 = false;
                    this.copy_account(data);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消提交'
                    });
                });


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
    .kehuaccountList {
        width:100%;
        .kehuaccountBox {
            .screen {
                .outExcel {
                    border:1px solid #54ADFF;
                    background: none;
                    color: #54ADFF;
                    float: right;
                    font-size: 12px;
                    margin-left:10px;
                }
                .addaccount{
                    float: right;
                    font-size: 12px;
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
                    .addHu {
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
            .kehuaccountTable {
                .vue-table {
                    .cell{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        .add {
                            display: inline-block;
                            width:20px;
                            height:20px;
                            text-align: center;
                            line-height: 22px;
                            background: #54adff;
                            color: white;
                            border-radius: 50%;
                            margin-left: 5px;
                            .icon{
                                cursor: pointer;
                                font-size: 14px;
                                font-weight: normal;
                            }
                        }
                    }
                    .appInfor {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        text-align: center;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius: 50%;
                    }
                    .appInfor.qu{
                        color: white;
                        background: #FF8754;
                    }
                    .appInfor.zhi{
                        color: white;
                        background: #3F7FFC;
                    }
                    .el-table__header{
                        thead {
                            th:nth-last-child(2){
                                .cell {

                                    text-align: center;
                                }
                            }
                        }
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
                    .operation {
                        width:100%;
                        height:100%;
                        vertical-align: middle;
                        font-size: 18px;
                        text-align: center;
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
                    span.color{
                        cursor: pointer;
                        font-size: 12px;
                        display: inline-block;
                        width:40px;
                        height:20px;
                        line-height: 22px;
                        border-radius: 5px;
                        background: #54ADFF;
                        color: white;
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
        .tan_shiftTo {
            .el-dialog  {
                width:420px;
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
                .dialog-footer {
                    margin-top: 337px;
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .el-dialog__body {
                padding:10px 20px  ;
            }
            .Tan_select {
                width: 100%;
                margin-bottom: 10px;
                .el-select {
                    width:100%;
                }
            }
            .Tan_table{
                width:100%;
                height:300px;
                border:1px solid #dfdfe0;
                .Tan_header {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    .left {
                        text-align: center;

                        span{
                            font-size: 12px;
                            display: inline-block;
                            width:40px;
                            height:20px;
                            text-align: center;
                            line-height: 20px;
                            border: 1px solid #969a9e;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    }
                }
                .TanBox {
                    width:100%;
                    height:267px;
                    overflow: auto;
                    .Tan_body {
                        height:30px;
                        line-height: 30px;
                        .left{
                            .el-radio__label {
                                display: none;
                            }
                            .checkboxFour {
                                width: 15px;
                                height: 15px;
                                background: white;
                                box-sizing: border-box;
                                position: relative;
                                margin:8px auto;
                                cursor: pointer;
                                input{
                                    opacity: 0;
                                    position: absolute;
                                    width: 20px;
                                    height: 20px;
                                    left: -3px;
                                    top: -3px;
                                    z-index:888;
                                }
                                label {
                                    display: block;
                                    width: 105%;
                                    height: 105%;
                                    cursor: pointer;
                                    z-index: 1;
                                    background: white;
                                    border: 1px solid #bfcbd9;
                                }
                                label span{
                                    display: inline-block;
                                    width: 8px;
                                    height: 4px;
                                    position: absolute;
                                    top: 4px;
                                    left: 3px;
                                    border: 2px solid white;
                                    border-top: none;
                                    border-right: none;
                                    border-radius: 0;
                                    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                    /* opacity: 0; */
                                    -moz-transform: rotate(-45deg);
                                    -ms-transform: rotate(-45deg);
                                    -webkit-transform: rotate(-45deg);
                                    transform: rotate(-45deg);
                                }
                                input[type=checkbox]:checked + label {
                                    background: #66a0e6;
                                }
                            }
                        }
                        .right{
                            .right_input {
                                .el-input {
                                    display: inline-block;
                                    width:190px;
                                    input{
                                        width:190px;
                                        height:26px!important;
                                        line-height: 25px;
                                    }
                                }

                            }
                        }
                    }
                }

                .Tan_body:nth-child(even){
                    background: #f7f7f8;
                }
            }
        }
    }
    /*滚轴*/
    .TanBox  ::-webkit-scrollbar{
        width: 7px;
        height: 16px;
        border-radius:0;
        background-color: white;
    }

    /*定义滚动条的轨道，内阴影及圆角*/
    .TanBox   ::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: white;
    }
    /*定义滑块，内阴影及圆角*/
    .TanBox   ::-webkit-scrollbar-thumb{
        /*width: 10px;*/
        height: 10px;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px white;
        background-color: rgba(205,211,237,.4);
    }
    @media(max-width: 1280px) {
        .kehuaccountTable {
            .vue-table {
                .operation {
                    font-size: 12px!important;
                }
            }
        }
    }
</style>
