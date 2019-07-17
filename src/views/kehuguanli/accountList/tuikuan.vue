<template>
    <div class="tuikuanForm ku_addBox" >
        <el-row class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>退款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-退款</span>
                <div class="appInfotBox">
                    <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.market0 | fileFunName}}</span>
                    <span class="nameColor lastName">负责商务 </span><span>{{data.business}}</span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">充值信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData" :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        退款方式
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="data.payment_type"  @change="tuikuanchange">
                                            <el-radio   label="15" >退款到总账户</el-radio>
                                            <el-radio  label="14" >退款到客户</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div v-if="kh_show">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            广告主名称
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-select v-model="ggz" filterable placeholder="请选择" @change="ggzaccount">
                                                <el-option
                                                        v-for="(item,key) in ggzOptions"
                                                        :key="key"
                                                        :label="item.advertiser"
                                                        :value="key">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a" v-for="(data,index) in formData" :key="index">
                                        <el-col :span="4" class="title">
                                            账户名称
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-select v-model="accountName" filterable placeholder="请选择" @change="accountChange">
                                                <el-option
                                                        v-for="(item,key) in accountOptions"
                                                        :key="key"
                                                        :label="item.a_users"
                                                        :value="key">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                </div>

                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            产品名称
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <div style="width: 290px;height: 30px;background:#f5f7f9; border: 1px solid #e4e0d9;margin-left: 20px;padding-left: 18px;font-size: 14px;color: #c3c9d6;">
                                                <span v-if="cp_show">自动填写</span>
                                                <span v-if="!cp_show"> {{ data.cp_name }}</span>
                                            </div>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>

                            <div v-if="true == showM">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                                {{$t('titles.fandian')}}类型
                                            </el-col>
                                            <el-col :span="20" class="input_search">
                                                <div v-if="fd_type == 1" style="    margin-left: 20px;">
                                                    账户{{$t('titles.fandian')}}
                                                </div>
                                                <div v-if="fd_type == 2" style="    margin-left: 20px;">
                                                    现金{{$t('titles.fandian')}}
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </div>
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            退款金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input  type="text"  style="width: 155px;"></el-input>
                                            <input style="width: 155px;line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:18px;top: 4px;outline: none;z-index:9"
                                                   type="number" v-model="data.money"
                                                   name="mouse2"
                                                   placeholder="请输入金额" v-on:input="fandianData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>

                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            账户币
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" :placeholder="placeholderName" v-model="data.show_money" style="width: 155px;" :disabled="disabledaccountMoney">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <span style="font-size: 12px">账户{{ $t('titles.fandian') }}： {{ data.rebates_proportion || '0' }}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                            应退金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" :placeholder="placeholderName" v-model="data.ys_money" style="width: 155px;" :disabled="disabledaccountMoney">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <span style="font-size: 12px">现金{{ $t('titles.fandian') }}： {{ data.xj_fandian || '0'}}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>
                            <div v-if="true == showM1">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                           退款金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input  type="text" class="inputNum inputText">
                                                <template slot="append">元</template>
                                            </el-input>
                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;    padding-left: 11px;top: 10px;width: 262px;outline: none;z-index:9"
                                                   type="number" v-model="data.money"
                                                   name="mouse2"
                                                   placeholder="请输入金额" v-on:input="fandianData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>


                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                       退款日期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-date-picker  :clearable='false'

                                                         v-model="data.payment_time"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="fujianInfor">
                        <el-col :lg="12" class="leftInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">附件信息</span>
                            </div>
                            <div class="fujian">
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        ref="upload"
                                        list-type="picture"
                                        name="File[imageFiles][]"
                                        action="/api/file/addfile"
                                        :on-success="handleAvatarSuccess"
                                        :data="dataObj"
                                        :auto-upload="false"
                                        multiple>
                                    <div class="add_fujian">
                                        <span class="fujian_icon" >
                                        <img src="../../../assets/add.png" alt="">
                                             添加附件
                                        </span>
                                    </div>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col :lg="12" class="rightInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">备注信息 <span style="color: red;">(必填)</span> </span>
                            </div>
                            <div class="inputInfor"  v-for="(data,index) in formData">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入备注"
                                        v-on:input="inforData"
                                        v-model="data.note">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button type="primary" @click="pullData" :disabled=disabledPull>提交</el-button>
                            <el-button class="reset" @click="reset">重置</el-button>
                        </el-col>
                    </el-col>
                </el-col>
                <el-col :span="8" class="kh_right_box">
                    <el-col :span="24">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">合同信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in dataInfor">
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" >
                                    <el-col :span="7" class="title" >
                                        {{ $t('titles.customer') }}
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{  data.advertiser0.advertiser  }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        {{ $t('titles.agent') }}
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.agent_company }}
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 25px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="7" class="title" >
                                        {{$t('titles.Addcustomers')}}
                                    </el-col>
                                    <el-col :span="17"  class="textInfor">
                                        {{ data.mht.prlin.name }}
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { add_refundmoney_z,add_refundmoney_ru_z,account_to_product,customer_advertiser_list,adtoaccount} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let accountId = '';
    let appname = '';
    export default {
        data() {
            return {
                routeId:'',
                dataInfor:[],
                kh_show:true,
                cp_show:true,
                ggz_show:true,
                accountName:'',
                accountOptions:[],
                accountShow:true,
                fd_type:'1',
                disabledaccountMoney:true,
                placeholderName:'自动计算',

                tuikuanOptions:[{
                    name:'退款到客户',
                    id:14,
                },{
                    name:'退款到总账户',
                    id:15,
                },],
                showM:true,
                showM1:false,
                disabledPull:true,
                indexData:'15',
                formData:[{
                    "advertiser":"",
                    "submituser":"",
                    "product_line":"",
                    "type":"",
                    "xf_contractid":"",
                    "market":"",
                    "payment_type":"15",
                    "payment_time":moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                    "money":"",
                    'ys_money':'',
                    "rebates_proportion":"",
                    'xj_fandian':'',//现金返点
                    "show_money":"",
                    "account":"",
                    "appname":"",
                    "note":"",
                    "cu_ad_id":'',
                    'ggz_name':'',
                    'cp_name':'',
                }],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':4,
                },
                ggz:'',
                ggzOptions:[],
                add_refundmoney_ru_z:function (accountId,val) {
                    add_refundmoney_ru_z({
                        id:accountId,
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 4;
                            let _this = this;
                            this.$refs.upload.submit();
                            this.success()
                        }else{
                            this.disabledPull = false;
                            this.$message.error(response.msg)
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--协议详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'agreementDetails' , query: { id: _this.routeId}});
                    }, 500);
                },
                add_refundmoney_z: function (id) {
                    add_refundmoney_z({
                        id: id,
                    }).then(response => {
                        if(response.contract_info.contractproduct[0].fk_type !== 0){
                            this.disabledaccountMoney = false;
                            this.placeholderName='请输入账户币'
                        }
                        this.fd_type = response.contract_info.fd_type;
                        this.customer_advertiser_list(response.contract_info.advertiser);
                        this.dataInfor.push(response.contract_info);
                        this.formData[0].advertiser = response.contract_info.advertiser;
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].rebates_proportion = response.contract_info.rencontract.fandian;
                        this.formData[0].xj_fandian =  response.contract_info.rencontract.xj_fandian;
                        this.formData[0].product_line = response.contract_info.mht.product_line;
                        this.formData[0].type = response.contract_info.type;
                        this.formData[0].xf_contractid = response.contract_info.id;
                        accountId = response.contract_info.id;
                        if(response.contract_info.market0){
                            this.formData[0].market = response.contract_info.market0.id;
                        }else{
                            this.formData[0].market = '';
                        }

                    }).catch(err => {
                    });
                },
                account_to_product(id){
                    account_to_product({
                        id:id,
                    }).then(response => {

                        if(response.msg.advertiser){
                            this.formData[0].ggz_name = response.msg.advertiser;
                            this.cp_show = false;
                        }else{
                            this.cp_show = true;
                        }
                        if( response.msg.advertiser){
                            this.formData[0].cp_name =  response.msg.product;
                            this.ggz_show = false;
                        }else{
                            this.ggz_show = true;

                        }



                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_list(id){
                    customer_advertiser_list({
                        id:id,
                    }).then(response => {
                        this.ggzOptions = response.list;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                adtoaccount(id){
                    adtoaccount({
                        id:id,
                        contractid:this.routeId,
                    }).then(response => {
                        this.accountOptions = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                    if(this.indexData == 15){
                        if( this.formData[0].account != ""&& this.formData[0].money != ""&&  this.formData[0].payment_time != "" && this.formData[0].show_money !="" && this.formData[0].note !="" ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else{
                        if( this.formData[0].money != ""&& this.formData[0].note !=""  ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }

                },
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(this.formData[0].payment_type == 14){
                            let data = Number(this.dataInfor[0].huikuan)+Number(this.dataInfor[0].bukuan)- Number(this.dataInfor[0].yu_e);
                            if(Number( this.formData[0].money ) >Number(this.dataInfor[0].huikuan)+Number(this.dataInfor[0].bukuan)- Number(this.dataInfor[0].yu_e)){
                                this.$message({
                                    message: "退款金额不得大于本合同余额("+data+")",
                                    type: 'warning'
                                });
                            }else{
                                this.disabledPull = true;
                                this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                                this.formData[0].account = '';
                                this.formData[0].appname = '';
                                this.formData[0].cu_ad_id = '';
                                this.add_refundmoney_ru_z(accountId,this.formData[0]);
                            }
                        }else{
                            this.disabledPull = true;
                            let money = this.formData[0].money;
                            let ys_money =  this.formData[0].ys_money;
                            this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                            let formData = JSON.stringify(this.formData);
                            let formData1 = JSON.parse(formData);
                            formData1[0].ys_money = money;
                            formData1[0].money = ys_money;
                            this.add_refundmoney_ru_z(accountId,formData1[0]);
                        }


                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'accounts'
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.add_refundmoney_z(decodeURI(ref[0].split('=')[1]));

        },
        methods: {
            //跳转
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id:this.routeId}});
            },
            ggzaccount(val){
                this.adtoaccount(this.ggzOptions[val].id);
                this.formData[0].ggz_name = this.ggzOptions[val].advertiser
            },
            accountChange(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].account = this.accountOptions[index].id;
                    this.formData[0].appname = this.accountOptions[index].appname;
                    this.formData[0].cu_ad_id = this.accountOptions[index].cu_ad_id;
                }
                this.account_to_product(this.accountOptions[index].id);
                this.judge()
            },

            tuikuanchange(index){
                this.indexData = index;
                this.formData[0].payment_type = index;
                if(index == 15){
                    this.showM = true;
                    this.showM1 = false;
                    this.accountShow = true;
                    this.kh_show = true;
                }else{
                    this.showM = false;
                    this.showM1 = true;
                    this.accountShow = false;
                    this.kh_show = false;

                }
                this.judge()
            },
            fandianData(){
                if(this.dataInfor[0].contractproduct[0].fk_type === 0){
                    if(this.fd_type == 1){
                        this.formData[0].show_money = (Number(this.formData[0].money)*(1+(Number(this.formData[0].rebates_proportion)/100))).toFixed(2);
                        this.formData[0].ys_money = Number(this.formData[0].money)*(1-(Number(this.formData[0].xj_fandian)/100)).toFixed(2);
                    }else{
                        this.formData[0].show_money = (Number(this.formData[0].money)/(1-(Number(this.formData[0].rebates_proportion)/100))).toFixed(2);
                    }
                }

                this.judge()
            },
            inforData(){
                this.judge()
            },
            //提交
            pullData(){
                let  data = '提交后不可更改，是否继续?'
                this.tan(data)
            },
            //上传成功
            handleAvatarSuccess(){
                this.success();
                if(this.dateShow == false){
                    this.add_picifile(this.dataObj['File[yid]'])
                }
            },
            reset(){
                this.formData[0].appname  = '';
                this.formData[0].payment_time  = moment().format('YYYY-MM-DD');;
                this.formData[0].money  = '';
                this.formData[0].show_money  = '---';
                this.formData[0].show_money  = '---';
                this.formData[0].payment_type  = '15';
                this.accountName = '';
                this.tuikuanValue = '退款到总账户';
                this.$refs.upload.clearFiles();
            },

        },
        filters:{
            fileFun(val){
                if(val){
                    return val
                }else{
                    return '---'
                }
            },
            fileFunName(val){
                if(val){
                    return val.name
                }else{
                    return '---'
                }
            },
        },
        created() {

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .tuikuanForm {
        .input_search {
            .inputTextColor {
                .el-input-group__append {
                    background: #f5f7f9!important;
                    color: black;
                }
            }

        }
        .kh_InforBox .kh_left_box .topInfor .titleBox .infor_a .input_search .el-radio-group .el-radio{
            width: 85px!important;
        }
    }
</style>
