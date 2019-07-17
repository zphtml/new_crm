<template>
    <el-row style="" class="tuikuan">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   媒体退款列表>
               </span>
            媒体退款详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-媒体退款详情</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>

            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <media_tuikuan :item="data"></media_tuikuan>
                    <el-col :span="24" style="position: relative">
                        <el-tooltip content="跳转媒介合同" placement="top" effect="light" >
                            <i class="el-icon-menu" v-if="mht_id!=''"  @click="jump_mj_xieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 17px;cursor: pointer"></i>
                        </el-tooltip>
                        <mediacontract :item="data.contractinfo"></mediacontract>
                    </el-col>
                    <el-col :span="24" style="position: relative">
                        <el-tooltip content="跳转协议合同" placement="top" effect="light">
                            <i class="el-icon-menu" @click="jumpxieyi"  v-if="xf_contractid!=''" style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                        </el-tooltip>
                        <contractmessage  :item="data.contractinfo" :xf_qiane="data.xf_qiane"></contractmessage>
                    </el-col>

                </el-col>
                <el-col :lg="12" style="padding-top: 10px">
                    <shenheInfor :screen="screen"  @shenheInfor = shenheInfor></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <remarks style="margin-top: 14px;" :item="data"></remarks>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { meitituikuan_info} from '@/api/meiti';
    import { get_files,refundmoney_kehu_shenhe1,refundmoney_kehu_shenhe2,refundmoney_account_z_shenhe1,refundmoney_account_z_shenhe2,refundmoney_account_p,shenheapi_a} from '@/api/money';
    import { flow_fz_show } from '@/api/meitiaccount';
    import { audit_history} from '@/api/contract';
    import media_tuikuan from '@/components/money/media_tuikuan';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import mediacontract from '@/components/contract/mediacontract';
    import contractmessage from '@/components/contract/contractmessage';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit={};
    export default {
        name: 'dashboard',
        components: {
            mediacontract,
            contractmessage,
            accounticon,
            media_tuikuan,
            enclosure,
            remarks,
            shenheInfor,
        },
        data() {
            return {
                mht_id:'',
                xf_contractid:'',
                routeId:'',
                screen:{},
                meida_account:{},
                metaccount:false,
                type1:'',
                which:'',
                enclo:[],
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
                        this.meitituikuan_info();
                    }).catch(error => {
                        this.meitituikuan_info();
                    });
                },
                audit_history:function(){

                    audit_history({
                        id: this.routeId,
                        gongneng: this.historyName,
                    }).then(response => {
                        this.hisData = response;
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData:response,
                            isHtml:'dikou',
                            tuikuanId:this.data.contractinfo.mht_id,
                            shenhe:this.shenhe,
                            dataInfor: this.data,
                        };
                    }).catch(error => {

                    });
                },
                meitituikuan_info:function(){
                    meitituikuan_info( this.routeId).then(response => {
                        this.data=response.data.contract;
                        this.xf_contractid = response.data.contract.xf_contractid;
                        if(response.data.contract.contractinfo.mht){
                            this.mht_id = response.data.contract.contractinfo.mht.id;
                        }else{
                            this.mht_id = '';
                        }
                        this.id=response.data.contract.id;
                        this.audit = response.data.contract.audit;
                        this.audit_count = response.data.contract.audit_count;
                        //退款到总账户的直开
                        this.pinkuang('meijie_tuikuan');
                        this.historyName =  'meijie_tuikuan';
                        this.audit_history();
                        this.get_files(response.data.contract.xf_id)
                    }).catch(error => {

                    });
                },
                get_files:function(val){
                    get_files(val,4).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            type:4,
                        }];
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
            this.routeId = this.$route.query.id;
            this.mountedData();
        },
        methods: {
//跳转媒介合同
            jump_mj_xieyi(){
                this.$router.push({ name: 'mediaviewcontract' ,query: { id:this.mht_id}});
            },
// 跳转到协议
            jumpxieyi(){
                this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

            },
            mountedData(){
                this.meitituikuan_info();
            },
            shenheInfor(val){
//                if(this.data.payment_type == 14){
//                    this.shenheapi_a(val.shenheInfor, this.routeId,'refundmoney_kehu_shenhe'+val.shenheInfor.shenhe)
//                }else if(this.data.payment_type == 15){
//                    this.shenheapi_a(val.shenheInfor, this.routeId,'meitituikuan_shenhe'+val.shenheInfor.shenhe)
//                }
                this.shenheapi_a(val.shenheInfor, this.routeId,'meitituikuan_shenhe'+val.shenheInfor.shenhe)
            },
            newcontact(val){
                this.meitituikuan_info();
            },
            huitui(){
                this.$router.go(-1)
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
        },
        watch:{

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
