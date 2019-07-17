<template>
    <el-row style="" class="replenishment">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   保证金列表>
               </span>
            保证金退款详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-保证金详情</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>
            </el-col>


        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <replenishment :item="data"></replenishment>

                    <mediacontract :item="data.contractinfo"></mediacontract>
                </el-col>
                <el-col :lg="12" style="padding-top: 10px">
                    <shenheInfor :screen="screen"  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <!--基本信息横条结束-->
                    <remarks style="margin-top: 14px;" :item="data"></remarks>
                </el-col>

            </el-row>

        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { get_files,shenheapi_a} from '@/api/money';
    import { meijie_margin_tui_info } from '@/api/meiti';

    import { audit_history} from '@/api/contract';
    import replenishment from '@/components/money/bondInfor';
    import mediacontract from '@/components/contract/mediacontract';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import {mapGetters} from 'vuex';
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
                routeId:'',
                screen:{},
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
                        this.meijie_margin_tui_info();
                    }).catch(error => {
                        this.meijie_margin_tui_info();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'meiti-margin-tuikuan',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit: this.audit,
                            audit_count:this.audit_count ,
                            hisData:[],
                            isHtml:'dikou',
                            shenhe:this.shenhe,
                        };
                        this.screen.hisData = response;
                    }).catch(error => {

                    });
                },
                meijie_margin_tui_info:function(){
                    meijie_margin_tui_info( this.routeId).then(response => {
                        this.data=response.data;
                        this.id=response.data.id;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
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
            this.routeId = this.$route.query.id;
            this.meijie_margin_tui_info();
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'meiti-margin-tuikuan'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }

        },
        methods: {
            history(){
                this.audit_history()
            },
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'meijie_margin_tui_shenhe'+val.shenheInfor.shenhe)
            },
            newcontact(val){
                this.meijie_margin_tui_info();
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
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";

</style>
