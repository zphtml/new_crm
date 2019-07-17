<template>
    <el-row style="" class="TransferOfFundsInfor">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span style="cursor: pointer" @click="zhuankuan">
                   转款列表>
               </span>
            转款详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24" >
                <span style="font-size: 22px;vertical-align: middle">
                        <!--<span @click="jumpxieyi" style="cursor: pointer">-->
                          <!---->
                    <!--</span>-->
  {{advertiser0}}
                    -转款详情</span>
                <accounticon :customer_Data_type="customer_Data_type"></accounticon>
                <el-tooltip content="跳转客户控制台" placement="top" effect="light" v-if="btn_jump">
                    <i class="el-icon-menu" @click="jumpconsole"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                </el-tooltip>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-col :span="24" style="position: relative;">
                        <!--is_ultimate_shenhe-->
                        <el-button  style="padding: 5px 15px;height: auto;width: auto;position: absolute;right: 18px;top: 14px;"  type="primary" @click="meijie_htclick" v-if="metaccount">修改账户当前媒介合同</el-button>
                        <add_meijie_account :item="meida_account"  @media_account_Infor = media_account_Infor></add_meijie_account>
                    </el-col>
                    <!--转出金额-->
                    <zhuankuanMoneyOut :item="data"></zhuankuanMoneyOut>

                    <!--转出信息-->
                    <zhuankuanOut :item="data"></zhuankuanOut>

                    <!--转入信息-->
                    <zhuankuanInto :item="data"></zhuankuanInto>
                    <!--付款信息-->
                </el-col>
                <el-col :lg="12">
                    <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history @zhuan_account="zhuan_account"></shenheInfor>
                    <enclosure :item="enclo" @newcontact="newcontact"></enclosure>
                    <remarks style="margin-top: 14px;" :item="noteData"></remarks>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact,zhuankuan_info} from '@/api/kehu';
    import { shenheapi_a,get_files} from '@/api/money';
    import { contractinfo,contract_shenhe1,contract_shenhe2,audit_history} from '@/api/contract';
    import order from '@/components/money/order';
    import zhuankuanOut from '@/components/money/zhuankuanOut';
    import zhuankuanMoneyOut from '@/components/money/zhuankuanMoneyOut';
    import enclosure from '@/components/contract/enclosure';
    import zhuankuanInto from '@/components/money/zhuankuanInto';
    import remarks from '@/components/contract/remarks';
    import shenheInfor from '@/components/shenhe/index';
    import accounticon from '@/components/cusmessage/accountIcon';
    import add_meijie_account from '@/components/cusmessage/media_account';
    import Vue from 'vue';
    import moment from "moment"
    let audit={}
    export default {
        name: 'dashboard',
        components: {
            add_meijie_account,
            accounticon,
            zhuankuanOut,
            zhuankuanMoneyOut,
            zhuankuanInto,
            remarks,
            order,
            enclosure,
            shenheInfor,
        },
        data() {
            return {
                btn_jump:false,
                routeId:'',
                xf_contractid:'',
                customer_Data_type:'',
                advertiser0:'',
                screen:{},
                meida_account:{},
                metaccount:false,
                which: '',
                star: 3,
                input: '',
                id:'',
                enclo:[],
                addFormVisibleReceive:false,
                flag:0,
                textarea2:'',
                current:{},
                data:{},
                noteData:{},
                audit_countAll:'',
                audit:'',
                audit_count:'',
                shenhe:[],
                matnum:function (str){
                    if(str) {
                        var newStr = "";
                        var count = 0;

                        if(str.indexOf(".")==-1){
                            for(var i=str.length-1;i>=0;i--){
                                if(count % 3 == 0 && count != 0){
                                    newStr = str.charAt(i) + "," + newStr;
                                }else{
                                    newStr = str.charAt(i) + newStr;
                                }
                                count++;
                            }
                            str = newStr + ".00"; //自动补小数点后两位
                        }else{
                            for(var i = str.indexOf(".")-1;i>=0;i--){
                                if(count % 3 == 0 && count != 0){
                                    newStr = str.charAt(i) + "," + newStr;
                                }else{
                                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                                }
                                count++;
                            }
                            str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
                        }
                        return str;
                    }else{
                        return 0;
                    }

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
                        this.zhuankuan_info();
                    }).catch(error => {
                        this.zhuankuan_info();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id:this.routeId,
                        gongneng:'zhuankuan',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData:[],
                            xufei:'iszhuankuan',
                            shenhe:this.shenhe,
                            dataInfor:this.data,
                        };
                        this.screen.hisData = response;

                    }).catch(error => {

                    });
                },
                zhuankuan_info(){

                    zhuankuan_info({
                        id:this.routeId
                    }).then(response => {
                        this.Account({
                            id:response.data.advertiser,
                            name:response.data.advertiser0.advertiser
                        })
                        this.btn_jump = true;

                        this.advertiser0 = response.data.advertiser0.advertiser;
                        this.noteData=response.data;
                        this.xf_contractid = response.data.xf_contractid;
                        this.data=response;
                        this.customer_Data_type = response.contract_zhuanru.advertiser0;
                        this.audit = response.data.audit;
                        this.audit_count = response.data.audit_count;
                        this.audit_history();
                        this.get_files();
                    }).catch(error => {

                    });
                },
                get_files:function(val){
                    get_files(this.routeId,1002).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid:this.routeId,
                            type:1002
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
            this.mountedData();
        },
        methods: {
            ...mapActions([
                'searchData',
                'Account',
            ]),
// 跳转到协议
            jumpxieyi(){
                this.$router.push({ name: 'agreementDetails' ,query: { id:this.xf_contractid}});

            },
            mountedData(){
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'zhuankuan'){
                        this.audit_countAll = this.audit_action[i].audit_count;
                        this.shenhe =this.audit_action[i].shenhe;
                    }
                }
                this.zhuankuan_info();
                let _this = this;
                this.roles.filter(function(item){
                    if(item == "/api/meijie-contract/add-contract"){
                        _this.metaccount = true;
                    }
                });
            },
//修改账户当前媒介合同
            meijie_htclick(){
                this.meida_account = {
                    isTan:true,
                    data:this.data,
                    istype:"zhuankuan",
                    accountData:[this.data.data.zczhanghu.a_users,this.data.data.zrzhanghu.a_users],
                    dataInfor:this.data
                }
            },
            media_account_Infor(){
                this.mountedData()
            },
            shenheInfor(val){
                this.shenheapi_a(val.shenheInfor,this.routeId,'zhuankuan_shenhe'+val.shenheInfor.shenhe)
            },
            history(){
                this.audit_history()
            },
            zhuan_account(){
                this.mountedData();
            },
            zhuankuan(){
                this.$router.go(-1)
            },
            newcontact(val){
                this.zhuankuan_info();
            },
// 跳转控制台
            jumpconsole(){
                this.$router.push({ name: 'console' ,query: { type:1} });
            },
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
            currname: function (value) {
                if (value) {
                    return value.advertiser
                } else {
                    return '--'
                }
            },
            curr1: function (value) {
                if(value){
                    if(value.market0){
                        return value.market0.name
                    }else{
                        return '--'
                    }
                }else {
                    return '--'
                }
            },
        },
        watch:{

        },
    }
</script>
<style rel="stylesheet/scss" scoped lang="scss">
    @import "src/styles/crmStyle/title.scss";
    .zhi {
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 100%;
        color: #54adff;
        border: 1px solid #54adff;
    }
</style>
