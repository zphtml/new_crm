<template>
    <el-row style="" class="viewcontract">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   返回上一级>
               </span>
            查看合同
        </p>
        <div style="position: absolute;top: 0;right: 0;" >
            <img src="http://test.myushan.com/ZPCRMzuofei.png" style="width: 60px;" alt="" v-if="data.iszuofei == 1" >
            <img src="http://test.myushan.com/ZPCRMjieshu.png" style="width: 60px;"  v-if="data.iszuofei == 2" alt="">
        </div>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | ad}}-{{data.prlin | cur}}</span>
                <span style="display: inline-block;width: 80px;vertical-align: middle;margin-left:10px;margin-right: 20px;">
                      <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                        <svg class="icon" aria-hidden="true" style="width: 18px;height: 18px;vertical-align:middle;color: #54ADFF;vertical-align: middle;" v-if="data.isguidang == 1">
                            <use xlink:href="#icon-guidang"></use>
                        </svg>
                   </span>
            </el-col>
        </el-col>
        <el-col :span="24" style="position: relative">
            <div class="mj_type">
                <span class="title">协议状态</span>
                <span  v-if="data.iszuofei != 1">
                    <span class="type_btn" @click="over" v-if="data.iszuofei != 2">结束</span>
                    <span class="type_btn" @click="abolish" v-if="data.iszuofei != 2">作废</span>
                    <span class="type_btn" @click="postpone" v-if="data.iszuofei == 2">延期</span>
                </span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="协议详情" name="first">
                    <el-col :span="24" style="margin-top:10px;padding: 0">
                        <metioperation :item="data" ref="operationData" @meiti_operactionChange="meiti_operactionChange"></metioperation>
                        <el-col :lg="16"  style="padding: 0!important;">

                            <el-row :gutter="24">
                                <el-col :lg="12" style="padding-right: 10px">
                                    <!--基本信息横条-->
                                    <contracttable :item="data"></contracttable>
                                </el-col>
                                <el-col :lg="12" style="padding-right: 10px">
                                    <!--购买产品信息-->
                                    <product :item="data" @media_acounr="media_acounr"></product>
                                </el-col>
                            </el-row>

                            <!--付费信息-->
                            <payment :item="data"></payment>

                            <!--付费信息结束-->
                        </el-col>
                        <el-col :lg="8" style="padding-top: 10px;position: relative">
                            <div  style="position: absolute;right: 5px;top: 5px;">
                                <el-button type="primary" style="padding: 5px 8px;width: auto;height: auto"    @click="puu_yes()" :disabled="disabledGuidang" v-if="data.is_ultimate_shenhe == 1 && data.audit == 1 && data.isguidang != 1">归档</el-button>
                                <span style="display: inline-block;color: #54adff;font-size: 12px;margin-left: -16px" v-if="data.is_ultimate_shenhe == 1 && data.audit == 1 && data.isguidang == 1">
                            <svg class="icon" aria-hidden="true" style="width: 18px">
                              <use xlink:href="#icon-tongguo"></use>
                            </svg>
                               <span>
                                   已归档
                               </span>
                         </span>
                            </div>
                            <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                            <!--附件-->
                            <enclosure style="padding-left: 10px" :item="enclo" @newcontact="newcontact"></enclosure>
                            <remarks :item="data"></remarks>
                        </el-col>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="历史记录" name="second">
                    <meiti_historylist ref="mt_his" ></meiti_historylist>
                </el-tab-pane>
                <el-tab-pane label="转出账户" name="account">
                    <el-row class="account">
                        <el-col :span="24" style="margin: 10px 0" >
                            <el-checkbox v-model="accountchecked" @change="allcheck"> 全选 </el-checkbox>
                            <span style="font-size: 13px;margin-left: 50px">转入到:</span>
                            <el-select v-model="accountvalue"  size="mini" placeholder="请选择"   >
                                <el-option
                                        v-for="item in Newaccountoptions"
                                        :key="item.id"
                                        :label="item.title"

                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-button type="primary" style="float: right;padding: 5px 8px;width: auto;height: auto" @click="pullzhuanchu_account" :disabled="disabled_account" >确 定</el-button>

                        </el-col>
                        <el-table
                                highlight-current-row border
                                :data="dataInforTable"
                                class="vue-table"
                                ref="multipleTable"
                                style="width: 100%">
                            <el-table-column
                                    label="筛选">
                                <template slot-scope="scope">
                                    <div class="checkboxFour" >
                                        <input type="checkbox"  :checked="scope.row.checkId" id="checkboxFourInput"  @change="changebox($event.target.checked,scope.$index )"  name="" />
                                        <label for="checkboxFourInput"  style="cursor: pointer">
                                            <span></span>
                                        </label>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    label="账户名称">
                                <template slot-scope="scope">
                                    <div style="text-align: center">
                                        <span @click="textName(scope.$index )" style="display: block;width: 100%;height: 100%;">
                                            {{ scope.row.a_users}}
                                        </span>
                                    </div>
                                </template>
                            </el-table-column>


                        </el-table>
                    </el-row>



                </el-tab-pane>
            </el-tabs>
        </el-col>



    </el-row>
</template>

<script>
    /*eslint-disable */
    import { meijie_contract_guidang} from '@/api/kehu';
    import {copyaccount, account_list_m,meijie_customer_contract_listConsole } from '@/api/meiti';
    import { audit_history} from '@/api/contract';
    import { shenheapi_a,get_files} from '@/api/money';
    import { meijie_contract_info} from '@/api/meitiaccount';
    import shenheInfor from '@/components/shenhe/index';
    import enclosure from '@/components/contract/enclosure';
    import remarks from '@/components/contract/remarks';
    import contracttable from '@/components/contract/contract';
    import product from '@/components/meitiaccount/product';
    import payment from '@/components/contract/payment';
    import accounticon from '@/components/cusmessage/accountIcon';
    import metioperation from '@/components/contract/meiti_operation';
    import meiti_historylist from './historyList';

    import {mapGetters} from 'vuex';
    import moment from "moment"
    let audit={}
    export default {
        name: 'ct',
        components: {
            accounticon,
            remarks,
            payment,
            product,
            contracttable,
            shenheInfor,
            enclosure,
            metioperation,
            meiti_historylist
        },
        data() {
            return {
                routeId:'',
                activeName:'first',
                screen:{},
                headerInfor:[],
                enclo:[],
                disabledGuidang:false,
                flag:0,
                star:3,
                textarea2:'',
                addFormVisibleReceive:false,
                input:'',
                which:'',
                data:{},
                Billing:true,
                current:{},
                setcontact:true,
                contact:[1,2,3],
                goornot:false,
                sangoornot:false,
                yishen:false,
                ershen:'',
                sanji:false,
                sanshen:false,
                customer:true,
                eryu:'',
                audit:'',
                audit_count:'',
                shenhe:[],
                get_files:function(){
                    get_files( this.routeId,1003).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid: this.routeId,
                            type:1003,
                        }];
                    }).catch(error => {

                    });
                },
                meijie_contract_info:function(){
                    meijie_contract_info( this.routeId).then(response => {
                        this.headerInfor = [];
                        this.headerInfor.push(response.data)
                        this.data=response.data;
                        this.audit_count = response.data.audit_count;
                        this.audit = response.data.audit;
                        this.disabledGuidang = false;
                        this.audit_history();
                        this.get_files();
                    }).catch(error => {

                    });
                },
                meijie_contract_guidang:function(){
                    meijie_contract_guidang({
                        data: this.routeId,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '归档成功',
                                type: 'success'
                            });
                            this.meijie_contract_info();
                        }else{
                            this.$message.error('归档失败');
                            this.disabledGuidang = false;
                        }
                    }).catch(error => {

                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'meijie_contract',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData:[],
                            shenhe: this.shenhe,
                        };
                        this.screen.hisData = response;
                    }).catch(error => {

                    });
                },
                shenheapi_a:function(audit,id,num){
                    shenheapi_a(audit,id,num).then(response => {
                        this.addFormVisibleReceive=false;
                        if(audit.audit==1){
                            this.current.ershen=true;
                            this.current.eryu=true;
                        }else if(audit.audit==2){
                            this.current.ershen=true;
                            this.current.eryu=false;
                        }
                        this.meijie_contract_info();
                    }).catch(error => {
                        this.meijie_contract_info();
                    });
                },
// 账户
                dataInforTable:[],
                accountchecked:false,
                checkedId:true,
                accountvalue:'',
                disabled_account:false,
                Newaccountoptions:[],
                meijie_customer_contract_listConsole:function(){
                    meijie_customer_contract_listConsole({
                        id:this.data.advertiser,
                    }).then(response => {
                        this.Newaccountoptions = response.list.data
                    }). catch(err => {this.$message.error('获取失败');});
                },
                account_list_m(val){
                    account_list_m({
                        id:this.routeId,
                    }).then(response => {
                        this.dataInforTable = response.list.data;
                        for(var i = 0;i<response.data.length;i++){
                            this.dataInforTable['checkId'] = 'false';
                        }
                    }). catch(err => {});
                },
                copyaccount(data){
                    copyaccount({
                        account_list:data,
                        mhtid:this.accountvalue,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                showClose: true,
                                message: '修改成功' ,
                                type: 'success'
                            });
                            this.meijie_customer_contract_listConsole()
                            this.account_list_m()

                        }else{
                            this.$message({
                                showClose: true,
                                message: '提交失败',
                                type: 'error'
                            });
                        }
                        this.disabled_account = false;
                        this.$emit('meiti_operactionChange');
                    }). catch(err => {this.$message.error('获取失败');});
                },

            }
        },


        filters: {
            cur: function (value) {
                if(value){
                    return value.name
                }else{
                    return '--'
                }
            },
            ad:function (value) {
                if(value){
                    return value.advertiser
                }else{
                    return '--'
                }
            },

        },
        mounted(){
            this.routeId = this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'meijie_contract'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }


//            if(sessionStorage.getItem("mt_xieyi") == 'second'){
//                this.$refs.mt_his.history();
//                this.activeName = 'second';
//            }else if(sessionStorage.getItem("mt_xieyi") == 'account'){
//                this.activeName = 'account';
//                this.meijie_customer_contract_listConsole()
//                this.account_list_m()
//            }else{
//                this.activeName = 'first';
//                this.mt_xieyi();
//            }
            this.mt_xieyi();

        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action',
                'accounts',
            ])
        },
        methods: {
            mt_xieyi(){
                this.meijie_contract_info();
            },
// 结束
            over(){
                this.$refs.operationData.over();

            },
// 作废
            abolish(){
                this.$refs.operationData.abolish();
            },
//  延期
            postpone(){
                this.$refs.operationData.postpone();
            },
            // 切换分页
            handleClick(){
                if(this.activeName == 'second'){
                    this.$refs.mt_his.history();
                }else if(this.activeName == 'account'){
                    this.meijie_customer_contract_listConsole()
                    this.account_list_m()
                }else{
                    this.meijie_contract_info();
                }
//                sessionStorage.setItem('mt_xieyi',this.activeName )
            },
// 操作
            meiti_operactionChange(){
                this.meijie_contract_info();
            },
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'meijie_contract_shenhe'+val.shenheInfor.shenhe)
            },
            history(){
                this.audit_history()
            },
            puu_yes(){
                this.$confirm('是否归档?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.meijie_contract_guidang();

                    this.$message('归档中....');
                    this.disabledGuidang = true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消归档'
                    });
                });
            },
            huitui(){
                this.$router.go(-1)
            },

            del(val){
                this.contact.splice(val, 1);
            },
            newcontact(val){
                this.meijie_contract_info();
            },
            /*新建联系人*/
            xinnew(){
                this.contact.push(this.contact.length)
            },
            media_acounr(){
                this.meijie_contract_info();
            },
// 转出账户
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
            textName(val){
                this.dataInforTable = this.dataInforTable.filter(function(item,i){
                    if(i == val){
                        item.checkId =  !item.checkId;
                    }
                    return item
                });
            },
            pullzhuanchu_account(){
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
                    this.copyaccount(data);
                    this.disabled_account = true;

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消提交'
                    });
                });


            },
        },
        watch:{
            customer:function(val){

            },
        },
        created() {


        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
