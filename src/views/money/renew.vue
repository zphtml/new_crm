<template>
    <el-row style="" class="orderdetails">
        <p class="crm_title">
            <i class="crm_line"></i>
            <span  style="cursor: pointer" @click="huitui">
                   上一级>
               </span>
            充值详情
        </p>
        <el-col :span="24" style="margin-top:10px">
            <el-col :sm="24" v-for="(item,index) in headerInfor" :key="index">
                <span style="font-size: 22px;vertical-align: middle">
                      {{item.advertiser0 | curr}}
                    -充值详情</span>
                <accounticon :customer_Data_type="data.advertiser0"></accounticon>
                <span style="vertical-align: middle;color: #9c9c9c;font-size: 12px;">
                       负责销售&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.contractinfo |  curr1 }}</b>
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       负责商务&nbsp;&nbsp; <b style="font-weight: 700;color: #222f3b">{{item.contractinfo.business}}</b>
                   </span>
            </el-col>
        </el-col>
        <el-col :span="24" style="margin-top:10px">
            <el-row :gutter="20">
                <el-col :lg="16">
                    <!--基本信息横条-->
                    <order :item="data" ></order>
                    <!--相关回款-->
                    <backMoney :item="backMoney_infor"></backMoney>
                    <el-col :span="24" style="position: relative;">
                        <el-tooltip content="跳转媒介合同" placement="top" effect="light" v-if="metaccount &&mht_id!=null&&mht_id!=''" >
                            <i class="el-icon-menu"  @click="jump_mj_xieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 17px;cursor: pointer"></i>
                        </el-tooltip>
                        <el-button  style="padding: 5px 15px;height: auto;width: auto;position: absolute;right: 35px;top: 14px;" type="primary" @click="meijie_htclick"  v-if="metaccount && data.is_ultimate_shenhe != 1">修改账户当前媒介合同</el-button>
                        <add_meijie_account :item="meida_account"  @media_account_Infor = media_account_Infor></add_meijie_account>
                        <mediacontract :item="data.contractinfo"></mediacontract>
                    </el-col>
                    <el-col :span="24" style="position: relative">
                        <el-tooltip content="跳转协议合同" placement="top" effect="light">
                            <i class="el-icon-menu" @click="jumpxieyi"  style="font-size: 22px;color: #54adff ;position: absolute;right: 10px;top: 22px;cursor: pointer"></i>
                        </el-tooltip>

                        <contractmessage :item="data.contractinfo" :xf_qiane="data.xf_qiane"></contractmessage>
                    </el-col>

                </el-col>
                <el-col :lg="8" style="padding-top: 10px">
                    <shenheInfor :screen=screen  @shenheInfor = shenheInfor @history =history></shenheInfor>
                    <!--附件-->
                    <enclosure :item="enclo" @newcontact="newcontact" ></enclosure>
                    <!--备注-->
                    <remarks :item="data"></remarks>
                    <!--媒介付款基本信息-->
                    <fk_money :item="data"></fk_money>
                    <!--备款账户-->
                    <beikuan_account ref="beikuan_account_click"></beikuan_account>
                </el-col>
            </el-row>
        </el-col>
        <!--弹窗 媒介付款详情-->
        <el-dialog title="媒介付款详情" :visible.sync="addFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false"  class="tan_shiftTo" >
            <ul class="shiftTo"  v-for="(data,index) in formData" :key="index">
                <li>
                    <p  class="first_p">付款方式</p>
                    <p class="last_p">
                        <el-radio-group v-model="data.payment_type">
                            <el-radio   :label="1" >预付</el-radio>
                            <el-radio   :label="2" >垫付</el-radio>
                        </el-radio-group>
                    </p>
                </li>
                <li v-if="data.payment_type == 2" style="margin-top: 10px">
                    <p class="first_p">周期:</p>
                    <p class="last_p">
                        <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; padding-left:27px;outline: none;z-index:9"
                               type="number" v-model="data.dk_zhouqi"
                               name="mouse2"
                               placeholder="周期"
                               v-on:input="fk_zhouqi"
                               onmousewheel="return false;">
                        <span>
                            天
                        </span>
                    </p>
                </li>
                <li v-if="data.payment_type == 2">
                    <p class="first_p">付款日:</p>
                    <p class="last_p">
                        <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px;padding-left:27px;outline: none;z-index:9"
                               type="number" v-model="data.dk_date"
                               name="mouse2"
                               v-on:input="fk_day"
                               placeholder="付款日"
                               onmousewheel="return false;">
                        <span>
                            号（1-31号）
                        </span>
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer" style="text-align: center">
						<el-button type="primary" @click="pull_xh" >确 定</el-button>

			</span>
        </el-dialog>
    </el-row>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    /*eslint-disable */
    import { changecustomers ,apicustomers,contacts,addcontacts,custmobercontact,renew_to_huikuan,account_upkuan} from '@/api/kehu';
    import { renewinfo,get_files,shenheapi} from '@/api/money';
    import { contractinfo,contract_shenhe1,contract_shenhe2} from '@/api/contract';
    import { customer_list ,Roler_users,customers} from '@/api/kehu';
    import order from '@/components/money/order';
    import accounticon from '@/components/cusmessage/accountIcon';
    import mediacontract from '@/components/contract/mediacontract';
    import contractmessage from '@/components/contract/contractmessage';
    import remarks from '@/components/contract/remarks';
    import beikuan_account from '@/components/contract/beikuan_account';
    import fk_money from '@/components/contract/fk_money';
    import enclosure from '@/components/contract/enclosure';
    import backMoney from '@/components/contract/backMoney';
    import shenheInfor from '@/components/shenhe/index';
    import add_meijie_account from '@/components/cusmessage/media_account';
    import { audit_history} from '@/api/contract';
    export default {
        name: 'dashboard',
        components: {
            add_meijie_account,
            accounticon,
            mediacontract,
            contractmessage,
            enclosure,
            remarks,
            fk_money,
            backMoney,
            order,
            shenheInfor,
            beikuan_account
        },
        data() {
            return {
                screen:{},
                xf_contractid:'',//合同id
                mht_id:'',//媒介合同id
                meida_account:{},
                metaccount:false,
                headerInfor:[],
                pici:'order',
                id:'',
                enclo:[],
                which:'',
                account:true,
                current:{},
                data:{},
                backMoney_infor:[],
                star:3,
                input:'',
                routerId:'',
                addFormVisibleReceive:false,
                flag:0,
                textarea2:'',
                setcontact:true,
                contact:[1,2,3],
                customer:true,
                goornot:false,
                sangoornot:false,
                yishen:false,
                ershen:'',
                sanji:false,
                sanshen:false,
                audit_countAll:'',
                shenhe:[],
                xf_monet:'',
                a_users:'',
                addFormVisible:false, //消耗
                formData:[{
                    accountid:'',
                    dk_zhouqi:'1',
                    payment_type:1,
                    dk_date:1,
                }],
                shenheapi:function(audit,id,num){
                    shenheapi(audit,id,num).then(response => {
                        this.addFormVisibleReceive=false;
                        if(audit.audit==1){
                            this.current.ershen=true;
                            this.current.eryu=true;
                        }else if(audit.audit==2){
                            this.current.ershen=true;
                            this.current.eryu=false;
                        }
                        this.renewinfo();
                        this.$refs.beikuan_account_click.beikuan_account_click();

                    }).catch(error => {
                        this.renewinfo();
                    });
                },
                audit_history:function(){
                    audit_history({
                        id:this.routerId,
                        gongneng:'renew',
                    }).then(response => {
                        this.screen = {
                            audit_countAll:this.audit_countAll,
                            audit:this.audit,
                            audit_count:this.audit_count,
                            hisData:[],
                            a_users:this.a_users,
                            shenhe:this.shenhe,
                            xufei:'isxufei',
                            isHtml:'renew',
                            xf_monet:this.xf_monet,
                            dataInfor: this.data,
                        };
                        this.screen.hisData = response;
                    }).catch(error => {

                    });
                },
                renewinfo:function(){
                    renewinfo(this.routerId).then(response => {
                        this.headerInfor = [];
                        this.xf_contractid = response.data.contract.xf_contractid;
                        this.mht_id = response.data.contract.account0.mht_id;
//
                        this.headerInfor.push(response.data.contract);
                        this.id=response.data.contract.id;
                        this.audit = response.data.contract.audit;
                        this.audit_count = response.data.contract.audit_count;
                        this.data=response.data.contract;
                        this.xf_monet = response.data.contract.xf_cost;
                        this.a_users = response.data.contract.account0.a_users;
                        this.audit_history();
                        this.audit_count = response.data.contract.audit_count;
                        this.audit = response.data.contract.audit;
                        this.get_files();
                        let _this = this;
                        this.formData[0].accountid = response.data.contract.account0.id;
                        this.roles.filter(function(item){
                            if(item == "/api/meijie-contract/add-contract"){
                                _this.metaccount = true;
                                if(response.data.contract.account0.mt_payment_type == null   ){
                                    _this.addFormVisible = true;
                                }
                            }
                        });
                    }).catch(error => {
                    });
                },
                account_upkuan:function () {
                    let data = {};
                    if(this.formData[0].payment_type == 1){
                        data = {
                            accountid:this.formData[0].accountid,
                            payment_type:this.formData[0].payment_type,
                            dk_zhouqi:'',
                            dk_date:'',
                        }
                    }else{
                        data ={
                            accountid:this.formData[0].accountid,
                            payment_type:this.formData[0].payment_type,
                            dk_zhouqi:this.formData[0].dk_zhouqi,
                            dk_date:this.formData[0].dk_date,
                        }
                    }

                    account_upkuan(data).then(response => {
                        if(response.msg == "修改账户成功"){
                            this.addFormVisible = false;
                            this.$message({
                                message: '修改账户成功',
                                type: 'success'
                            });
                            this.renewinfo();
                            this.renew_to_huikuan();
                        }else{
                            this.$message.error('修改账户失败');
                        }
                    }).catch(error => {

                    });
                },
                get_files:function(){
                    get_files(this.routerId,4).then(response => {
                        this.enclo = [{
                            data:response.data,
                            audit_count:this.audit_count,
                            audit:this.audit,
                            yid:this.routerId,
                            type:4
                        }];
                    }).catch(error => {

                    });
                },
                renew_to_huikuan:function(){
                    renew_to_huikuan({
                        id:this.routerId,
                    }).then(response => {
                        this.backMoney_infor = response.data
                    }).catch(error => {

                    });
                },
                audit:'',
                audit_count:'',
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
            this.mountedData()

            this.$refs.beikuan_account_click.beikuan_account_click();
        },
        methods: {
            ...mapActions([
                'searchData',
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
                this.routerId = this.$route.query.id;
                for(let i = 0;i<this.audit_action.length;i++){
                    if(this.audit_action[i].action_name == 'renew'){
                        this.audit_countAll = this.audit_action[i].audit_count;
                        this.shenhe =this.audit_action[i].shenhe;
                    }
                }
                this.renewinfo();
                this.renew_to_huikuan();
                let _this = this;
                this.roles.filter(function(item){
                    if(item == "/api/meijie-contract/add-contract"){
                        _this.medaixf = "media"
                    }
                });
            },
            history(){
                this.audit_history()
            },
            newcontact(val){
                this.renewinfo();
            },
            huitui(){
                this.$router.go(-1)
            },
            del(val){
                this.contact.splice(val, 1);

            },
            shenheInfor(val){
                this.shenheapi(val.shenheInfor,this.routerId,val.shenheInfor.shenhe)
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
 /*新建联系人*/
            xinnew(){
                this.contact.push(this.contact.length)
            },
            close(){
                this.addFormVisible = false;
            },
            pull_xh(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.account_upkuan();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            fk_zhouqi(){
             if(Number(this.formData[0].dk_zhouqi)<1){
                    this.formData[0].dk_zhouqi = 1;
                }
                this.formData[0].dk_zhouqi =Math.round(this.formData[0].dk_zhouqi)
            },
            fk_day(){
                if(Number(this.formData[0].dk_date)>31){
                    this.formData[0].dk_date = 31;
                }else if(Number(this.formData[0].dk_date)<1){
                    this.formData[0].dk_date = 1;
                }
                this.formData[0].dk_date =Math.round(this.formData[0].dk_date)
            },
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

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/tan.scss";
</style>
