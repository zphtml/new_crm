<template>
    <el-row class="ku_addBox" >
        <el-col :span="24" class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>补款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-补款</span>
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
            <el-col>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="补款充值" name="first">
                            <el-col :span="24" class="kh_InforBox">
                                <el-col :span="16" class="kh_left_box">
                                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                                        <div class="titleInfor">
                                            <span class="listStyle"></span>
                                            <span class="listText">补款信息</span>
                                        </div>
                                        <div class="titleBox" v-for="(data,index) in formData"  :key="index">
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
                                                        <!--<el-input v-model="data.ggz_name" type="number" v-on:input="fandianData"  placeholder="自动填写" :disabled="true"></el-input>-->
                                                    </el-col>
                                                </el-col>
                                            </div>
                                            <div style="height: 30px;margin-bottom: 5px;">
                                                <el-col :span="24"  class="infor_a" v-for="(data,index) in formData"  :key="index">
                                                    <el-col :span="4" class="title">
                                                        账户名称
                                                    </el-col>
                                                    <el-col :span="20" class="input_search">
                                                        <el-select v-model="account" filterable placeholder="请选择" @change="changeaccount">
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

                                                        <!--<el-input v-model="data.cp_name" type="number" v-on:input="fandianData" placeholder="自动填写" :disabled="true"></el-input>-->
                                                    </el-col>
                                                </el-col>
                                            </div>

                                            <div >
                                                <div style="height: 30px;margin-bottom: 5px;">
                                                    <el-col :span="24"  class="infor_a">
                                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                                            账户币
                                                        </el-col>
                                                        <el-col :span="20" class="input_search">
                                                            <el-input v-model="data.show_money" type="text" style="width: 155px;"></el-input>
                                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 155px;outline: none;z-index:9"
                                                                   type="number" v-model="data.show_money"
                                                                   name="mouse2"
                                                                   placeholder="请输入金额" v-on:input="fandianData"
                                                                   onmousewheel="return false;">
                                                            <span style="font-size: 12px;margin-right: 10px">现金{{ $t('titles.fandian') }}： {{ data.xj_fandian }}%</span>
                                                            <span style="font-size: 12px">账户币{{ $t('titles.fandian') }}： {{ data.rebates_proportion }}%</span>

                                                        </el-col>
                                                    </el-col>
                                                </div>
                                                <div style="height: 30px;margin-bottom: 10px;">
                                                    <el-col :span="24"  class="infor_a">
                                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                                            金额
                                                        </el-col>
                                                        <el-col :span="20" class="input_search">
                                                            <el-input class="inputText" placeholder="自动计算" v-model="data.money" :disabled="true">
                                                                <template slot="append">元</template>
                                                            </el-input>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                                <div style="height: 30px;margin-bottom: 10px;">
                                                    <el-col :span="24"  class="infor_a">
                                                        <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                                            应收金额
                                                        </el-col>
                                                        <el-col :span="20" class="input_search">
                                                            <el-input class="inputText" placeholder="自动计算" v-model="data.ys_money" :disabled="true">
                                                                <template slot="append">元</template>
                                                            </el-input>
                                                        </el-col>
                                                    </el-col>
                                                </div>
                                            </div>

                                            <div style="height: 30px;margin-bottom: 5px;">
                                                <el-col :span="24"  class="infor_a">
                                                    <el-col :span="4" class="title">
                                                        补款日期
                                                    </el-col>
                                                    <el-col :span="20" class="input_search" >
                                                        <el-date-picker  :clearable='false'
                                                                         v-model="data.payment_time"
                                                                         type="date"
                                                                         placeholder="选择日期"
                                                                         @change="inforData">
                                                        </el-date-picker>
                                                    </el-col>
                                                </el-col>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="24" class="fujianInfor">
                                        <el-col :lg="12" class="leftInfor">
                                            <el-col :span="24" class="titleInfor">
                                                <span class="listStyle"></span>
                                                <span class="listText">附件信息</span>
                                            </el-col>
                                            <el-col :span="24" class="fujian">
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

                                            </el-col>
                                        </el-col>
                                        <el-col :lg="12" class="rightInfor">
                                            <div class="titleInfor">
                                                <span class="listStyle"></span>
                                                <span class="listText">补款原因    <span style="color: red">（必填）</span></span>
                                            </div>
                                            <div class="inputInfor"  v-for="(data,index) in formData"  :key="index">
                                                <el-input
                                                        type="textarea"
                                                        :rows="2"
                                                        v-on:input="noteData"
                                                        placeholder="请输入备注"
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
                                        <div class="titleBox" v-for="(data,index) in dataInfor"  :key="index">
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
                                                        合同类型
                                                    </el-col>
                                                    <el-col :span="17"  class="textInfor">
                                                        <span v-if="data.type == 1">普通</span>
                                                        <span v-if="data.type == 2">框架</span>
                                                    </el-col>
                                                </el-col>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-col>
                            </el-col>

                    </el-tab-pane>
                    <el-tab-pane label="暂不充值" name="second">
                        <bukuan ref="bukuan"></bukuan>
                    </el-tab-pane>
                </el-tabs>
            </el-col>

        </el-col>
        <!--弹窗 -->
        <el-dialog title="补款" :visible.sync="addFormVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false"  class="tan_shiftTo" >
            <div style="width: 100%;text-align: center">
                <el-button type="primary" @click="bukuanClick" size="mini">补款并充值</el-button>
                <el-button type="primary" @click="no_bukuanClick" size="mini">只补款不充值</el-button>
            </div>


        </el-dialog>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { add_renew,renewHuikuan,account_to_product,addbukuanbi,customer_advertiser_list,adtoaccount} from '@/api/kehu';
    import bukuan from './bukuan';
//
    import moment from "moment"
    let inputText = '';
    let accountId = '';
    export default {
        data() {
            return {
                routeId:'',
                activeName:'first',
                addFormVisible:true,
                cp_show:true,
                ggz_show:true,
                dataInfor:[],
                fd_type:'',
                formData:[{
                    'advertiser':'',//公司id
                    'submituser':'' ,//提交人id
                    'type':'' ,//合同type
                    'xf_contractid':  '',//合同id
                    'market': '',//销售id
                    'account': '',//账户id
                    'appname': '',//APPname
                    'rebates_proportion': '',//充值返点
                    'xj_fandian':'',
                    'money':'',//充值金额
                    'ys_money':'',
                    'show_money': '',//显示金额
                    'payment_type': '311',//付款类型
                    'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                    'note':'',//备注
                    'cu_ad_id':'',
                    'ggz_name':'',
                    'cp_name':'',
                }],
                ggz:'',
                ggzOptions:[],
                fenqiData:{},
                dateShow:true,
                indexNum:0,
                fileList:[],
                account:'',
                accountOptions:[],
                fukuanValue:'',
                lookFandian:'',
                dataObj:{
                    'File[yid]':'',
                    'File[type]':165,
                },
                returned:0,
                form: [],
                fukuanOptions:[
                    {
                    name:'预付',
                    id:'1'
                },{
                    name:'垫付',
                    id:'2'
                }],
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let newDormData = Object.assign({},  this.formData[0]);
                        newDormData.money =  newDormData.ys_money;
                        this.addbukuanbi(newDormData)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                        this.disabledPull = false;
                    });
                },
                add_renew(id){
                    add_renew({
                        id:id,
                    }).then(response => {
                        this.customer_advertiser_list(response.data.contract.advertiser);
                        this.dataInfor = [];
                        let contractData = response.data.contract;
                        this.fd_type = response.data.contract.fd_type;
                        this.dataInfor.push(response.data.contract);
                        this.formData[0].rebates_proportion = response.data.contract.rencontract.fandian;
                        this.formData[0].xj_fandian = response.data.contract.rencontract.xj_fandian;

                        accountId = response.data.contract.id;
                        this.formData[0].advertiser = response.data.contract.advertiser;
                        this.formData[0].xf_contractid = response.data.contract.id;
                        if(response.data.contract.market0){
                            this.formData[0].market = response.data.contract.market0.id;
                        }else{
                            this.formData[0].market = '';
                        }
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].type =  response.data.contract.type;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                    if(this.formData[0].account != ""&&  this.formData[0].money != ""&& this.formData[0].show_money != "" && this.formData[0].payment_time !=""&& this.formData[0].note !=""){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                addbukuanbi(val){
                    addbukuanbi({
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 165;
                            let _this = this;
                            this.$refs.upload.submit();
                            this.success()
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
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
                disabledPull:true,
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
            }
        },
        components: {
            bukuan
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
        },
        methods: {
 //初始页面查询
            bukuanClick(){
                this.addFormVisible = false;
                this.bukuan();
                this.activeName = 'first';
            },
            no_bukuanClick(){
                this.activeName = 'second';
                this.addFormVisible = false;
                this.$refs.bukuan.bukuandata();

            },
            bukuan(){
                let url=location.href.split('?')[1];
                let ref=url.split('&');
                this.add_renew(decodeURI(ref[0].split('=')[1]));

            },
//  补款
            handleClick(){

                if(this.activeName == 'first'){
                    this.bukuan();
                }else{

                    this.$refs.bukuan.bukuandata();
//
                }
            },
            fandianData()   {
                    this.judge();
                this.formData[0].ys_money = ((Number(this.formData[0].show_money)/(1+(Number(this.formData[0].rebates_proportion)/100)))*(1-Number(this.formData[0].xj_fandian)/100)).toFixed(2);
                this.formData[0].money = (Number(this.formData[0].show_money)/(1+(Number(this.formData[0].rebates_proportion)/100))).toFixed(2);

            },
            noteData(){
                this.judge();
            },
            ggzaccount(val){
                this.adtoaccount(this.ggzOptions[val].id);
                this.formData[0].ggz_name = this.ggzOptions[val].advertiser
            },
            changeaccount(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].account = this.accountOptions[index].id;
                    this.formData[0].appname = this.accountOptions[index].appname;
                    this.formData[0].cu_ad_id = this.accountOptions[index].cu_ad_id;
                }
                this.account_to_product(this.accountOptions[index].id);
                this.judge()
            },
            inforData(){
                this.judge()
            },
            //提交
            pullData(){
                let data = '';
                if(this.$refs.upload.uploadFiles.length == 0 &&  this.formData[0].note == ''){
                     data = '系统检测到您未添加上传附件和备注，是否继续?'
                }else if(this.$refs.upload.uploadFiles.length == 0 &&  this.formData[0].note != ''){
                     data = '系统检测到您未添加上传附件，是否继续?'
                }else if(this.$refs.upload.uploadFiles.length != 0 &&  this.formData[0].note == ''){
                    data = '系统检测到您未添加备注，是否继续?'
                }else{
                    data = '提交后不可更改，是否继续?'
                }
              this.tan(data)
            },
            //上传成功
            handleAvatarSuccess(){
                this.success();
            },
            //重置
            reset(){

                 this.formData[0].payment_time  = moment().format('YYYY-MM-DD');;
                this.formData[0].money  = '';
                this.formData[0].show_money  = '';
                this.formData[0].note  = '';
                this.account = '';
                this.fukuanValue = '';

                this.$refs.upload.clearFiles();
          },
//跳转
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id:this.routeId}});
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
    .ku_addBox{
        .input_search {
            .el-input-group__append {
                background: #f5f7f9!important;
                color: black;
            }
        }

        .fenqi_Infor {
            padding:0 10px 0 20px;

            .fenqi_box {
                border: 1px dashed #bebbb5;
                .fenqiheraer{
                    width: 100%;
                    height: 30px;
                    font-size: 12px;
                    color: #9c9c9c;
                    padding-left: 20px;
                }
                .fenqibody {
                    width: 100%;
                    font-size: 12px;
                    color: #9c9c9c;
                    padding-left: 20px;
                    .moneyInput,.showmoneyInput,.dateInput {
                        .el-input{
                            width:100%!important;
                            margin-left: 0!important;
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }


</style>
