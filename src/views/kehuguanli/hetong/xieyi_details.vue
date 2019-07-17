<template>
    <el-row style="" class="xy_viewcontract">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
            查看合同
        </p>
        <div style="position: absolute;top: 0;right: 0;"  v-for="(item,index) in headerInfor" :key="index">
            <img src="http://test.myushan.com/ZPCRMweishenhe.png" style="width: 60px;" alt="" v-if='item.audit != 2 && item.is_ultimate_shenhe == 0'>
            <img src="http://test.myushan.com/ZPCRMweitongguo.png" style="width: 60px;" alt=""  v-if="item.audit == 2 "  >
            <img src="http://test.myushan.com/ZPCRMzuofei.png" style="width: 60px;" alt="" v-if="item.iszuofei == 1" >
            <img src="http://test.myushan.com/ZPCRMjieshu.png" style="width: 60px;"  v-if="item.iszuofei == 2" alt="">
        </div>

        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24" v-for="(item,index) in headerInfor" :key="index">
                <span style="font-size: 22px;vertical-align: middle">{{item.advertiser0 | curr}}-{{item.mht.prlin | cur}}</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.submituser0 |  curr1 }}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.advertiser0.business0 | curr1}}</b>
                   </span>
            </el-col>
        </el-col>
        <el-col :span="24" style="position: relative">
            <div class="mj_type">
                <span class="title">协议状态</span>
                <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                    <span class="type_btn" @click="over" v-if="data.iszuofei != 2">结束</span>
                    <span class="type_btn" @click="abolish" v-if="data.iszuofei != 2">作废</span>
                    <span class="type_btn" @click="postpone" v-if="data.iszuofei == 2">延期</span>
                </span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="协议详情" name="first">
                    <el-col :span="24" style="margin-top:10px">
                        <operation :item="data" ref="operationData" @operactionChange="operactionChange" style="margin: 10px 0;"></operation>
                        <el-row :gutter="24">
                            <el-col :span="16">
                                <!--合同操作-->
                                <el-col :lg="24" style="padding: 0">
                                    <el-col :lg="12" style="padding-right: 10px">
                                        <!--基本信息横条-->
                                        <contracttable :item="data"></contracttable>
                                    </el-col>
                                    <el-col :lg="12" style="padding-left: 10px">
                                        <!--购买产品信息-->
                                        <product :item="data"></product>
                                    </el-col>
                                </el-col>

                                <!--购买产品信息结束-->
                                <!--付费信息-->
                                <payment :item="data"></payment>

                            </el-col>
                            <el-col :lg="8" style="margin-top: 10px">
                                <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                                <!--付费信息结束-->
                                <remarks :item="data"></remarks>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="历史记录" name="second">
                    <historylist ref="his" ></historylist>
                </el-tab-pane>
                <el-tab-pane label="账户列表" name="account"  v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                    <accountlist ref="accountClick" ></accountlist>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive" @close="addFormVisibleReceive = false" size="tiny" >

            <div style="margin-top: 20px;margin-bottom: 20px;">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">审核备注</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea2">
                    </el-input>
                </span>
            </div>
            <div style="text-align: right">
                <el-button type="primary" @click="tbn">确定</el-button>
                <el-button @click="addFormVisibleReceive=false">取消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { contractinfo,contract_shenhe1,contract_shenhe2,audit_history} from '@/api/contract';
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import { shenheapi_a} from '@/api/money';
    import remarks from '@/components/contract/remarks';
    import contracttable from '@/components/contract/contract';
    import product from '@/components/contract/product';
    import payment from '@/components/contract/payment';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import operation from '@/components/contract/operation';
    import historylist from './historyList';
    import accountlist from '../accountList/accountList';
//
    import {mapGetters} from 'vuex';
    import moment from "moment"
    let audit={};
    export default {
        name: 'ct',
        components: {
            accounticon,
            remarks,
            payment,
            product,
            contracttable,
            shenheInfor,
            operation,
            historylist,
            accountlist
        },
        data() {
            return {
                routeId:'',
// 分页
                activeName:'first',
                screen:{},
                headerInfor:[],
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
                audit_countAll:'',
                audit:'',
                audit_count:'',
                shenhe:[],
                contractinfo:function(){
                    contractinfo( this.routeId).then(response => {
                        this.data=response.data;
                        this.headerInfor = [];
                        this.headerInfor.push(response.data);
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        this.audit_history();
                    }).catch(error => {

                    });
                },
                shenheapi_a:function(audit,id,num){
                    shenheapi_a(audit,id,num).then(response => {
                        this.addFormVisibleReceive=false
                        if(audit.audit==1){
                            this.current.ershen=true;
                            this.current.eryu=true;
                        }else if(audit.audit==2){
                            this.current.ershen=true;
                            this.current.eryu=false;
                        }
                        this.contractinfo();
                    }).catch(error => {
                        this.contractinfo();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'contract',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData:[],
                            shenhe:this.shenhe,
                        };
                        this.screen.hisData = response;
                    }).catch(error => {

                    });
                },
            }
        },
        filters: {
            curr: function (value) {
                if (value) {
                    return value.advertiser
                } else {
                    return '--'
                }
            },
            curr1: function (value) {
                if(value){
                    return value.name
                }else {
                    return '--'
                }
            },
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
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        mounted(){
            this.routeId =  this.$route.query.id;
//            if(sessionStorage.getItem("xieyi") == 'second'){
//                this.$refs.his.history();
//                this.activeName = 'second';
//            }else if(sessionStorage.getItem("xieyi") == 'account'){
//                this.activeName = 'account';
//                this.$refs.accountClick.accountClick();
//            }else{
//                this.activeName = 'first';
//                this.xiyiInfor();
//            }
            this.xiyiInfor();
        },
        methods: {
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
                if(this.activeName == 'second') {

                    this.$refs.his.history();
                }else if(this.activeName == 'account'){

                    this.$refs.accountClick.accountClick();
                }else{
                    this.xiyiInfor();
                }
//                sessionStorage.setItem('xieyi',this.activeName )
            },
            xiyiInfor(){



                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'contract'){
                        this.audit_countAll = this.audit_action[i].audit_count;
                        this.shenhe =this.audit_action[i].shenhe;
                    }
                }
                this.contractinfo();
            },
            history(){
                this.audit_history()
            },
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'contract_shenhe'+val.shenheInfor.shenhe)
            },
            huitui(){
                this.$router.go(-1)
            },
            tbn(){
                audit.note=this.textarea2;
                if(this.flag==1){
                    contract_shenhe1(audit, this.routeId).then(response => {
                        this.addFormVisibleReceive=false
                        if(audit.audit==1){
                            this.current.yishen=true;
                            this.current.goornot=true;
                        }else if(audit.audit==2){
                            this.current.yishen=true;
                            this.current.goornot=false;
                        }
                    }).catch(error => {

                    });
                }else if(this.flag==2){
                    contract_shenhe2(audit, this.routeId).then(response => {
                        this.addFormVisibleReceive=false
                        if(audit.goin==1){
                            this.current.ershen='shen';
                            this.current.eryu=true;

                        }else if(audit.goin==2){
                            this.current.ershen='shen';
                            this.current.eryu=false;

                        }else if(audit.goin==3){
                            this.current.ershen='yushen';
                            this.current.eryu=true;
                            this.current.sanji=true;

                        }else if(audit.goin==4){
                            this.current.sanshen=true;
                            this.current.sangoornot=true

                        }else if(audit.goin==5){
                            this.current.sanshen=true;
                            this.current.sangoornot=false

                        }
                    }).catch(error => {

                    });
                }


            },
            del(val){
                this.contact.splice(val, 1);
            },
            /*新建联系人*/
            xinnew(){
                this.contact.push(this.contact.length)
            },
// 延期
            operactionChange(){
                this.xiyiInfor();
            },
        },
        watch:{
            customer:function(val){

            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .xy_viewcontract {
        position: relative;
        .mj_type {
            position: absolute;
            right: 0;
            top:10px;
            font-size: 13px;
            z-index: 9;
            .type_btn {
                padding: 3px 5px;
                margin: 0 2px;
                background: #669fe4;
                border-radius: 5px;
                color: white;
                cursor: pointer;
            }
        }
    }

</style>
