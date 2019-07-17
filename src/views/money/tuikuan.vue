<template>
    <el-row style="" class="tuikuanInfor">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   退款列表>
               </span>
            退款详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">
                        {{data.advertiser0 | curr1}}-退款详情</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>

            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <tuikuan :item="data"></tuikuan>
                    <!--基本信息横条结束-->
                    <fukuan :invalInfor="invalInfor"></fukuan>

                    <el-col :span="24" style="position: relative;"  v-if="$route.query.name == '退款到总账户'">
                        <el-tooltip content="跳转媒介合同" placement="top" effect="light" v-if="metaccount &&mht_id!=null&&mht_id!=''" >
                            <i class="el-icon-menu"  @click="jump_mj_xieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 17px;cursor: pointer"></i>
                        </el-tooltip>
                        <el-button  style="padding: 5px 15px;height: auto;width: auto;position: absolute;right: 35px;top: 14px;" type="primary" @click="meijie_htclick" v-if="metaccount">修改账户当前媒介合同</el-button>
                        <add_meijie_account :item="meida_account"  @media_account_Infor = media_account_Infor></add_meijie_account>
                        <mediacontract :item="data.contractinfo"></mediacontract>
                    </el-col>
                    <el-col  v-if="$route.query.name == '退款到总账户'" style="position: relative">
                        <el-tooltip content="跳转协议合同" placement="top" effect="light">
                            <i class="el-icon-menu" @click="jumpxieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                        </el-tooltip>
                        <contractmessage :item="data.contractinfo" :xf_qiane="data.xf_qiane"></contractmessage>
                    </el-col>

                </el-col>
                <el-col :lg="12" style="padding-top: 10px">
                    <shenheInfor :screen="screen"  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <remarks style="margin-top: 14px;" :item="data"></remarks>
                    <!--备款账户-->
                    <beikuan_account ref="beikuan_account_click"></beikuan_account>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { customersConsole} from '@/api/kehu';
    import { refundmoney_info,get_files,refundmoney_kehu_shenhe1,refundmoney_kehu_shenhe2,refundmoney_account_z_shenhe1,refundmoney_account_z_shenhe2,refundmoney_account_p,shenheapi_a} from '@/api/money';
    import { flow_fz_show } from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import tuikuan from '@/components/money/tuikuan';
    import fukuan from '@/components/money/fukuan';
    import remarks from '@/components/contract/remarks';
    import beikuan_account from '@/components/contract/beikuan_account';

    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import mediacontract from '@/components/contract/mediacontract';
    import contractmessage from '@/components/contract/contractmessage';
    import add_meijie_account from '@/components/cusmessage/media_account';
    import Vue from 'vue';
    import moment from "moment"
    let audit={};
    export default {
        name: 'dashboard',
        components: {
            add_meijie_account,
            mediacontract,
            contractmessage,
            accounticon,
            fukuan,
            tuikuan,
            enclosure,
            remarks,
            beikuan_account,
            shenheInfor,
        },
        data() {
            return {
                mht_id:'',
                routeId:'',
                xf_contractid:'',
                screen:{},
                meida_account:{},
                metaccount:false,
                type1:'',
                which:'',
                enclo:[],
                invalInfor:[],
                star:3,
                input:'',
                data:{},
                id:'',
                a_users:'',
                historyName:'',
                audit_countAll:'',
                audit_countAllData:[],
                audit:'',
                audit_count:'',
                current:{},
                addFormVisibleReceive:false,
                flag:0,
                textarea2:'',
                shenhe:[],
                hisData:[],
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
                        this.refundmoney_info();
                        this.$refs.beikuan_account_click.beikuan_account_click();

                    }).catch(error => {
                        this.refundmoney_info();
                    });
                },
                audit_history:function(){

                    audit_history({
                        id:this.routeId,
                        gongneng: this.historyName,
                    }).then(response => {
                        this.hisData = response;
                        if(this.$route.query.name == '退款到客户'){
                            this.screen = {
                                audit_countAll:this.audit_countAll,
                                audit:this.audit,
                                audit_count:this.audit_count,
                                hisData:response,
                                tuikuanId:this.data.contractinfo.mht_id,
                                shenhe:this.shenhe,
                                dataInfor: this.data,
                            };
                        }else{
                            this.flow_fz_show()
                        }

                    }).catch(error => {

                    });
                },
                flow_fz_show(){
                    flow_fz_show({
                        name:"tuikuan",
                        id:this.routeId,
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit_countAllData:this.audit_countAllData,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData: this.hisData,
                            a_users:this.a_users,
                            tuikuanId:this.data.contractinfo.mht_id,
                            shenhe:this.shenhe,
                            dataInfor: this.data,
                            isHtml:'tuikuan',
                            zi:response,
                        };
                    }).catch(error => {

                    });
                },
                refundmoney_info:function(){
                    refundmoney_info(this.routeId).then(response => {

                        this.data=response.data;
                        this.xf_contractid = response.data.xf_contractid;
                        this.id=response.data.id;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        if(this.$route.query.name != '退款到客户'){
                            this.a_users = response.data.account0.a_users;
                            this.mht_id = response.data.account0.mht_id;
                        }

                        if(response.data.payment_type==14){
                            //退款到客户
                            this.pinkuang('refund_kehu')
                            this.historyName =  'refund_kehu'
                        }else if(response.data.payment_type==15){
                            //退款到总账户的直开
                            this.pinkuang('refund_account_z');
                            this.historyName =  'refund_account_z'
                        }

                        this.audit_history();
                        this.customersConsole(response.data.advertiser0.id);
                        this.get_files()
                    }).catch(error => {

                    });
                },
                get_files:function(val){
                    get_files(this.routeId,4).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid:this.routeId,
                            type:4,
                            tui_name:this.$route.query.name,
                        }];
                    }).catch(error => {

                    });
                },
                customersConsole(id){
                    customersConsole({
                        id:id
                    }).then(response => {
                        this.invalInfor = response;
                    }).catch(error => {

                    });
                },
            }
        },
        filters: {

            curr: function (value) {
                if (value == '' || value == null) {
                    return '--'
                } else {
                    return value.name
                }
            },
            curr1: function (value) {
                if (value == '' || value == null) {
                    return '--'
                } else {
                    return value.advertiser
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
            let _this = this;
            this.roles.filter(function(item){
                if(item == "/api/meijie-contract/add-contract"){
                    _this.metaccount = true;
                }
            });
            this.routeId = this.$route.query.id;
            this.mountedData();
            this.$refs.beikuan_account_click.beikuan_account_click();
        },
        methods: {
            ...mapActions([
                'searchData',
                'Account',
            ]),
//跳转媒介合同
            jump_mj_xieyi(){
                this.$router.push({ name: 'mediaviewcontract' ,query: { id:this.mht_id}});
            },
// 跳转到协议
            jumpxieyi(){
                this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

            },
            mountedData(){
                this.refundmoney_info();
            },
            history(){
                this.audit_history()
            },
            shenheInfor(val){
                if(this.data.payment_type == 14){
                    this.shenheapi_a(val.shenheInfor,this.routeId,'refundmoney_kehu_shenhe'+val.shenheInfor.shenhe)
                }else if(this.data.payment_type == 15){
                    this.shenheapi_a(val.shenheInfor,this.routeId,'refundmoney_account_z_shenhe'+val.shenheInfor.shenhe)
                }
            },
            newcontact(val){
                this.refundmoney_info();
            },
            huitui(){
                this.$router.go(-1)
            },
//修改账户当前媒介合同
            meijie_htclick(){
                this.meida_account = {
                    isTan:true,
                    data:this.data,
                    istype:"xufei",
                    accountData:[this.a_users],
                    dataInfor:this.data
                }
            },
            media_account_Infor(){
                this.mountedData()
            },
            //审核，退款客户，直开，拼框
            pinkuang(name){

                this.type1=name;
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == name){
                        this.audit_countAll = this.audit_action[i].audit_count;
                        this.audit_countAllData = this.audit_action[i];
                        this.shenhe =this.audit_action[i].shenhe;
                    }
                }
            },
            shenhe1(){
                if(this.flag==1){
                    refundmoney_kehu_shenhe1(audit,this.routeId).then(response => {
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
                    refundmoney_kehu_shenhe2(audit,this.routeId).then(response => {
                        this.addFormVisibleReceive=false
                        if(audit.audit==1){
                            this.current.ershen=true;
                            this.current.eryu=true;
                        }else if(audit.audit==2){
                            this.current.ershen=true;
                            this.current.eryu=false;
                        }
                    }).catch(error => {

                    });
                }else if(this.flag==3){

                }
            },
            shenhez(){
                if(this.flag==1){
                    refundmoney_account_z_shenhe1(audit,this.routeId).then(response => {
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
                    refundmoney_account_z_shenhe2(audit,this.routeId).then(response => {
                        this.addFormVisibleReceive=false
                        if(audit.audit==1){
                            this.current.ershen=true;
                            this.current.eryu=true;
                        }else if(audit.audit==2){
                            this.current.ershen=true;
                            this.current.eryu=false;
                        }
                    }).catch(error => {

                    });
                }else if(this.flag==3){

                }
            },
            shenhep(){
                if(this.flag==1){
                    refundmoney_account_p(audit,this.routeId).then(response => {
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

                }else if(this.flag==3){

                }
            },

        },
        watch:{

        },
    }
</script>

