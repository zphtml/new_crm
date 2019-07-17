<template>
    <el-row >
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   渠道打款列表>
               </span>
            查看详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24">
                <span style="font-size: 22px;vertical-align: middle">{{data.advertiser0 | curr1}}-打款详情</span>
                <el-tooltip content="跳转客户控制台" placement="top" effect="light" v-if="btn_show">
                    <i class="el-icon-menu" @click="jumpconsole"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                </el-tooltip>
            </el-col>

        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="14">
                    <dakuanjiben :item="data"></dakuanjiben>
                </el-col>
                <el-col :lg="10" style="padding:10px 0;">
                    <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <!--附件-->
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <remarks style="margin-top: 14px;" :item="data"></remarks>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { get_files,shenheapi_a} from '@/api/money';
    import { meijie_dakuan_shenhe1,meijie_dakuan_shenhe2} from '@/api/meitiaccount';
    import { qddakuan_info} from '@/api/kehu';
    import { audit_history} from '@/api/contract';
    import dakuanjiben from '@/components/meitiaccount/dakuanjiben';
    import baohanxufei from '@/components/meitiaccount/baohanxufei';
    import shenheInfor from '@/components/shenhe/index';
    import remarks from '@/components/meitiaccount/remarks';
    import enclosure from '@/components/contract/enclosure';
    import {mapGetters,mapActions} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
        name: 'dashboard',
        components: {
            remarks,
            dakuanjiben,
            baohanxufei,
            shenheInfor,
            enclosure
        },
        data() {
            return {
                btn_show:false,
                routeId:'',
                screen:{},
                data:{},
                star:3,
                id:'',
                enclo:[],
                renew:[],
                which: '',
                current:{},
                addFormVisibleReceive:false,
                flag:0,
                textarea2:'',
                audit_countAll:'',
                audit:'',
                audit_count:'',
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
                        this.qddakuan_info()
                    }).catch(error => {
                        this.qddakuan_info()
                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'qd_dakuan',
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
                qddakuan_info(){
                    qddakuan_info({
                        id: this.routeId
                    }).then(response => {
                        this.Account({
                            id:response.data.advertiser,
                            name:response.data.advertiser0.advertiser,
                        });
                        this.btn_show = true;
                        this.data=response.data;
                        this.id=response.data.id;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        this.audit_history();
                        this.get_files()
                    }).catch(error => {

                    });
                },
                get_files:function(val){
                    get_files( this.routeId,1001).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid: this.routeId,
                            type:1001
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

            this.routeId =  this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'qd_dakuan'){
                    this.audit_countAll= this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.qddakuan_info();
        },
        methods: {
            ...mapActions([
                'searchData',
                'Account',
            ]),
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'qddakuan_shenhe'+val.shenheInfor.shenhe)
            },
            history(){
                this.audit_history()
            },
            huitui(){
                this.$router.go(-1)
            },
            del(val){
                this.contact.splice(val, 1);
            },
            newcontact(val){
                this.qddakuan_info();
            },
            // 跳转控制台
            jumpconsole(){
                this.$router.push({ name: 'console' ,query: { type:1} });
            },
        },
        watch:{

        },
        created() {

        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";

</style>
