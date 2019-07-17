<template>
    <el-row style="" class="bond_infor">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   保证金列表>
               </span>
            保证金详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">
                    {{data.advertiser0 | curr1}}
                    <!--<span  @click="jumpxieyi" style="cursor: pointer"></span>-->
                    -保证金详情</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>
            </el-col>


        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <replenishment :item="data"></replenishment>
                    <el-col :span="24" style="position: relative">
                        <el-tooltip content="跳转媒介合同" placement="top" effect="light" v-if="metaccount &&mht_id!=''" >
                            <i class="el-icon-menu"  @click="jump_mj_xieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 17px;cursor: pointer"></i>
                        </el-tooltip>
                        <mediacontract :item="data.contractinfo"></mediacontract>
                    </el-col>

                </el-col>
                <el-col :lg="12">
                    <shenheInfor :screen="screen"  @shenheInfor = shenheInfor @media_account=media_account @history =history></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <!--基本信息横条结束-->
                    <remarks style="margin-top: 14px;" :item="data"></remarks>
                </el-col>

            </el-row>

        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { margin_info,get_files,shenheapi_a} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import replenishment from '@/components/money/bondInfor';
    import mediacontract from '@/components/contract/mediacontract';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
        name: 'dashboard',
        components: {
            accounticon,
            replenishment,
            mediacontract,
            enclosure,
            remarks,
            shenheInfor,
        },
        data() {
            return {
                mht_id:'',//媒介id
                routeId:'',
                xf_contractid:'',
                screen:{},
                meida_account:{},
                metaccount:false,
                which:'',
                star:3,
                id:'',
                enclo:[],
                addFormVisibleReceive:false,
                flag:0,
                textarea2:'',
                audit_countAll:'',
                audit:'',
                audit_count:'',
                current:{},
                data:{},
                shenhe:[],
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
                        this.margin_info();
                    }).catch(error => {
                        this.margin_info();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'baozhengjin',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit: this.audit,
                            audit_count:this.audit_count ,
                            hisData:[],
                            xufei:'isbond',
                            shenhe:this.shenhe,
                            dataInfor:this.data,
                        };
                        this.screen.hisData = response;
                    }).catch(error => {

                    });
                },
                margin_info:function(){
                    margin_info( this.routeId).then(response => {
                        this.xf_contractid = response.data.xf_contractid;
                        this.data=response.data;
                        this.id=response.data.id;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        if(response.data.contractinfo.mht){
                            this.mht_id =response.data.contractinfo.mht.id;
                        }else{
                            this.mht_id ='';
                        }

                        this.audit_history();
                        this.get_files();
                    }).catch(error => {

                    });
                },
                get_files:function(val){
                    get_files( this.routeId,31).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid: this.routeId,
                            type:31
                        }];
                    }).catch(error => {

                    });
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action',
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
            jumpxieyi(){
                this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

            },
            mountedData(){
                this.margin_info();
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'baozhengjin'){
                        this.audit_countAll = this.audit_action[i].audit_count;
                        this.shenhe =this.audit_action[i].shenhe;
                    }
                };
            },
            history(){
                this.audit_history()
            },
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'margin_m_shenhe'+val.shenheInfor.shenhe)
            },
            media_account(){
                this.mountedData();
            },
            newcontact(val){
                this.margin_info();
            },
//修改账户当前媒介合同
            meijie_htclick(){
                this.meida_account = {
                    isTan:true,
                    data:this.data,
                    istype:"bond",
                    accountData:[this.data.contractinfo.contractproduct[0].name],
                    dataInfor:this.data
                }
            },
            media_account_Infor(){
                this.mountedData()
            },
            huitui(){
                this.$router.go(-1)
            },
        },
        watch:{

        },
        filters: {
            curr: function (value) {
                if(value==1){
                    return '预付'
                }else if(value==2){
                    return '垫付'
                }else{
                    return '--'
                }
            },
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD')
            },
            curr1: function (value) {
                if (value == '' || value == null) {
                    return '--'
                } else {
                    return value.advertiser
                }
            },
        },
        created() {


        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";

</style>
