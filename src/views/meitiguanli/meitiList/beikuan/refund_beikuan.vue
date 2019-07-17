<template>
    <div class="bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpht_back">返回上一级></span><span>备款退款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-备款退款</span>
                <div class="appInfotBox">
                    <span class="appInfor qu" v-if="data.advertiser0.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.advertiser0.customer_type == 1">
                         直
                    </span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="16" class="kh_left_box" v-for="(data,index) in formData" :key="index">
                    <el-col :span="24" class="topInfor" >
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">备款信息</span>
                        </div>
                        <div class="titleBox" >
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" >
                                    <el-col :span="4" class="title">
                                        账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search" style="padding-left: 30px">
                                       {{data.a_users}}
                                    </el-col>
                                </el-col>
                            </div>
                            <div >
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" >
                                            备款账户币
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input v-model="data.show_money" type="text" style="width: 290px;"></el-input>
                                            <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 288px;outline: none;z-index:9"
                                                   type="number" v-model="data.show_money"
                                                   name="mouse2"
                                                   placeholder="请输入金额" v-on:input="beikuanData"
                                                   onmousewheel="return false;">
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <!--<el-col :span="24"></el-col>-->
                                        <el-col :span="4" class="title" >
                                            媒体{{$t('titles.fandian')}}
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <span style="    margin-left: 20px;">
                                              {{data.rebates_proportion}}%
                                            </span>
                                            <span style="font-size: 12px;text-align: right; color: #9c9c9c;margin-left: 100px;">代理{{$t('titles.fandian')}}:</span>
                                            <span>{{data.dl_fandian}}%</span>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 10px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title" >
                                            金额
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText" placeholder="自动计算" v-model="data.money" :disabled="true">
                                                <template slot="append">元</template>
                                            </el-input>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            充值日期
                                        </el-col>
                                        <el-col :span="20" class="input_search" >
                                            <el-date-picker  :clearable='false'
                                                             v-model="data.payment_time"
                                                             type="date"
                                                             placeholder="选择日期">
                                            </el-date-picker>
                                        </el-col>
                                    </el-col>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="fujianInfor">
                        <el-col :span="12" class="rightInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">备注信息</span>
                            </div>
                            <div class="inputInfor"  >
                                <el-input
                                        type="textarea"
                                        :rows="2"
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { beikuan_account_info,refund_money_add_ru_beikuan } from '@/api/meiti';
    import moment from "moment"
    export default {
        data() {
            return {
                textShow:true,
                routeId:'',
// =======================================================
                dataInfor:[],
                passwordData:true,
                formData:[
                    {
                        "a_users":'',
                        "rebates_proportion":'',//媒体返点
                        'dl_fandian':'',//代理返点
                        'money':'',//充值金额
                        "show_money":"",//账户币
                        "submituser":" ",//提交人id
                        "advertiser":"",//公司id
                        "xf_contractid":" ",//合同id
                        "note":"",
                        'account':'',
                        'payment_time': moment().format('YYYY-MM-DD'),
                        'product_line':'',
                    }
                ],
                beikuan_account_info:function(){
                    beikuan_account_info({
                        id: this.routeId,
                    }).then(response => {
                        this.dataInfor  = [];
                        this.dataInfor.push(response.data);

                        this.formData[0].account = response.data.id;
                        this.formData[0].a_users = response.data.a_users;
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].advertiser = response.data.meijieContract.advertiser;
                        this.formData[0].xf_contractid = response.data.meijieContract.id;
                        this.formData[0].rebates_proportion = response.data.meijieContract.rebates_proportion;
                        this.formData[0].dl_fandian = response.data.meijieContract.dl_fandian;
                        this.formData[0].product_line = response.data.meijieContract.product_line;


                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,
                judge(){
                    if( this.formData[0].money !== ""){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabledPull = true;
                        this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                        this.refund_money_add_ru_beikuan(this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
                dataObj:{
                    'File[yid]':'',
                    'File[type]':331,
                },
                refund_money_add_ru_beikuan:function(data){

                    refund_money_add_ru_beikuan({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.success();
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
                        }

                    }).catch(err => {

                    });
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--合同详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'mediaviewcontract', query: { id: _this.routeId}});
                    }, 500);
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.beikuan_account_info()
        },
        methods: {
//==========================
            addaccount(){
                this.addFormVisible1_bond = true;
            },
// 账户币
            beikuanData(){
                this.formData[0].money = (Number(this.formData[0].show_money)/(1+(Number(this.formData[0].rebates_proportion)/100))*(1-(Number(this.formData[0].dl_fandian)/100))).toFixed(2);
                this.judge()
            },
            //重置
            reset(){
                this.formData[0].money  = '';
                this.formData[0].note  = '';
                this.$refs.upload.clearFiles();
            },

//==========================

            bukuanchange(){
                this.judge();
            },
            //提交
            pullData(){
                let  data = '提交后不可更改，是否继续?';
                this.tan(data)
            },
            handleChange(file, fileList) {
                this.textShow = false;
            },
            removeChange(fileList,file){
                if(file.length == 0){
                    this.textShow = true;
                }else{
                    this.textShow = false;
                }
            },
            //上传成功
            handleAvatarSuccess(){
                this.success();
            },

//跳转
            jumpht_back(){
                this.$router.go(-1)
            },
        },
        created() {

        },
        filters:{
            fileFun(val){
                if(val){
                    return val.prlin
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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    @import "./css/beikuan.scss";

</style>
