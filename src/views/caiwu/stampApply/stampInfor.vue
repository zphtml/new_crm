<template>
    <el-row style="" class="replenishment">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span @click="jumpstampList">申请盖章列表</span>><span>申请详情 </span>
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <!--基本信息横条-->
                    <stampInfor :item="data"></stampInfor>
                    <!--基本信息横条结束-->
                    <remarks style="margin-top: 14px;" :item="data"></remarks>

                </el-col>
                <el-col :lg="12" style="padding-top: 10px">
                    <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact} from '@/api/kehu';
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import { gaizhang_info,get_files,back_money1,back_money2,shenheapi_a} from '@/api/money';
    import { audit_history} from '@/api/contract';
    import stampInfor from '@/components/money/stampInfor';
    import remarks from '@/components/contract/remarks';
    import enclosure from '@/components/contract/enclosure';
    import shenheInfor from '@/components/shenhe/index';
    import {mapGetters} from 'vuex';
    export default {
        name: 'dashboard',
        components: {
            stampInfor,
            enclosure,
            remarks,
            shenheInfor,
        },
        data() {
            return {
                routeId:'',
                customer_Data_type:'',
                screen:{},
                which:'',
                account:true,
                input:'',
                current:{},
                enclo:[],
                data:{},
                id:"",
                addFormVisibleReceive: false,
                flag: 0,
                textarea2: '',
                audit_countAll:'',
                audit:'',
                audit_count:'',
                headerInfor:[],
                shenhe:[],
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
                        this.gaizhang_info();
                    }).catch(error => {
                        this.gaizhang_info();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id: this.routeId,
                        gongneng:'gaizhang',
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
                gaizhang_info(){
                    gaizhang_info( this.routeId).then(response => {
                        this.data=response.data;
                        this.id=response.data.id;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        this.headerInfor = [];
                        this.headerInfor.push(response.data);
                        this.audit_history();
                        this.get_files()
                    }).catch(error => {

                    });
                },
                get_files: function (val) {
                    get_files( this.routeId,'10010').then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid: this.routeId,
                            type:10010
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
                'audit_action'
            ])
        },
        mounted(){
            this.routeId = this.$route.query.id;
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'gaizhang'){
                    this.audit_countAll = this.audit_action[i].audit_count;
                    this.shenhe =this.audit_action[i].shenhe;
                }
            }
            this.gaizhang_info();
        },

        methods: {
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor, this.routeId,'gaizhang_shenhe'+val.shenheInfor.shenhe)
            },
            history(){
                this.audit_history()
            },
            newcontact(val){
                this.gaizhang_info();
            },
            //跳转
            jumpstampList(){
                this.$router.push({name: 'stampList'});
            },

        },
        watch: {

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
        },
    }
</script>
