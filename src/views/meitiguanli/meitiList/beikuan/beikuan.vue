<template>
    <div class="bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpht_back">返回上一级></span><span>备款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-备款</span>
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
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"   v-for="(data,index1) in formData" :key="index1">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">备款信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index2) in formData" :key="index2">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" >
                                    <el-col :span="4" class="title">
                                        账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="account" filterable placeholder="请选择" @change="changeaccount">
                                            <el-option
                                                    v-for="(item,key) in accountOptions"
                                                    :key="item.id"
                                                    :label="item.a_users"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <div class="addInfor" @click="addaccount">
                                            <span class="addaccount">？</span>
                                            <span class="addaccountText">没有你要的账户？点击添加</span>
                                        </div>

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
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            付款类型
                                        </el-col>
                                        <el-col :span="20" class="input_search" >
                                            <el-radio-group v-model="data.payment_type">
                                                <el-radio   :label="1" >预付</el-radio>
                                                <el-radio   :label="2" >垫付</el-radio>
                                            </el-radio-group>
                                            <span style="font-size: 12px;color: red;margin-left: 20px" v-if="data.payment_type == 1"><i style="color: red;margin-right: 5px">*</i>预付需财务打款</span>
                                        </el-col>
                                    </el-col>
                                </div>
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
                                        <img src="../../../../assets/add.png" alt="">
                                             添加附件
                                        </span>
                                    </div>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col :lg="12" class="rightInfor">
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">备注信息</span>
                            </div>
                            <div class="inputInfor"  v-for="(data,index3) in formData" :key="index3">
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
            <!--弹窗 保证金转入-->
            <el-dialog title="新增账户"  :visible.sync="addFormVisible1_bond" @close="addFormVisible1_bond = false"  :close-on-click-modal="false" class="tan_shiftTo" >
                <ul class="shiftTo" v-for="(data,index4) in addforData" :key="index4">
                    <li>
                        <p class="first_p" style="font-weight: bold;font-size: 14px">媒介合同</p>
                        <p class="last_p" style="font-weight: bold;font-size: 14px">
                            {{mht | fileFun}}
                        </p>
                    </li>
                    <li>
                        <p class="first_p">账户名称</p>
                        <p class="last_p">
                            <el-input type="text"  v-model="data.a_users"></el-input>
                        </p>
                    </li>
                    <li>
                        <p class="first_p">账户密码</p>
                        <p class="last_p">
                            <el-input style="width: 100px;" type="password" v-model="data.a_password" placeholder="请输入内容" v-if="passwordData == true"  ></el-input>
                            <el-input style="width: 100px;"  v-model="data.a_password" placeholder="请输入内容"  v-else  @blur="passame"></el-input>
                            <img src="../../../../assets/yan.png" @click="passwordData = !passwordData" style="width: 15px;cursor: pointer;margin-top: 2px;margin-left: 5px;vertical-align: middle;" alt="">
                        </p>
                    </li>
                    <li>
                        <p class="first_p">付款类型</p>
                        <p class="last_p">
                            <el-radio-group v-model="data.payment_type">
                                <el-radio :label="1">预付</el-radio>
                                <el-radio :label="2">垫付</el-radio>
                            </el-radio-group>
                        </p>
                    </li>
                    <li  v-if="data.payment_type == 2">
                        <p class="first_p">付款日</p>
                        <p class="last_p">
                            <input style="border: 1px solid #dcdfe6;width: 80px;line-height: normal; font-size: 12px;height: 24px; position: absolute;left: 0px;padding-left:27px;outline: none;z-index:9"
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
                <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanru" >确 定</el-button>
                        <el-button @click="addFormVisible1_bond = false" >取 消</el-button>
			</span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { add_beikuan,add_beikuan_ru,beikuan_account_add_ru } from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                textShow:true,
                routeId:'',
// =======================================================
                dataInfor:[],
                account:'',
                accountOptions:[],
                mht:'',
                passwordData:true,
                formData:[
                    {
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
                        'payment_type':1,
                    }
                ],
                addforData:[
                    {
                        contract_id:'',
                        submituser:'',
                        payment_type:1,
                        a_users:"",
                        a_password:"",
                        prlin_id:'',
                        fandian:'',
                        dk_date:'1',
                        avid:'',//公司id
                    }
                ],
                addFormVisible1_bond:false,
                add_beikuan:function(){
                    add_beikuan({
                        id: this.routeId,
                    }).then(response => {
                        this.dataInfor  = [];
                        this.accountOptions = response.accountlist;
                        this.dataInfor.push(response.contract_info);
                       this.mht = response.contract_info.mht;
                        this.addforData[0].avid = response.contract_info.advertiser;
                        this.addforData[0].prlin_id = response.contract_info.product_line;
                        this.addforData[0].fandian = response.contract_info.rebates_proportion;
                        this.addforData[0].submituser = this.user.id;
                        this.addforData[0].contract_id = this.routeId;
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].advertiser = response.contract_info.advertiser;
                        this.formData[0].xf_contractid = this.routeId;
                        this.formData[0].rebates_proportion = response.contract_info.rebates_proportion;
                        this.formData[0].dl_fandian = response.contract_info.dl_fandian;
                        this.formData[0].product_line = response.contract_info.product_line;
                        if(this.$route.query.account_id){
                            this.account = Number(this.$route.query.account_id);
                            this.formData[0].account = Number(this.$route.query.account_id);
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,
                judge(){
                    if( this.formData[0].money !== "" && this.account !=="" ){
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
                        this.add_beikuan_ru(this.formData[0]);
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
                add_beikuan_ru:function(data){

                    add_beikuan_ru({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.disabledPull = true;

                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 331;
                            this.$refs.upload.submit();
                            if(this.$refs.upload.uploadFiles.length == 0){
                                this.success();
                            }

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
                beikuan_account_add_ru:function () {
                    beikuan_account_add_ru({
                        data:this.addforData[0],
                    }).then(response => {
                        if(response.code == "200"){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.addFormVisible1_bond = false;
                            this.add_beikuan();
                        }else{
                            this.$message.error('提交失败');
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
            this.add_beikuan()
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
// 新增账户
            pullzhuanru(){
                let pattern  =new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                if(this.addforData[0].a_users==""){

                    this.$message({
                        message: '账户不能为空',
                        type: 'warning'
                    });
                }else if( this.addforData[0].a_password==""){
                    this.$message({
                        message: '密码不能为空',
                        type: 'warning'
                    });
                }else{
                    this.addforData[0].a_users =    this.addforData[0].a_users.replace(/\s+/g,"");
                    this.addforData[0].a_password =   this.addforData[0].a_password.replace(/\s+/g,"");
                    this.$confirm( '提交后不可更改，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.beikuan_account_add_ru();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }

            },
            fk_day(){
                if(Number(this.addforData[0].dk_date)>31){
                    this.addforData[0].dk_date = 31;
                }else if(Number(this.addforData[0].dk_date)<1){
                    this.addforData[0].dk_date = 1;
                }
                this.addforData[0].dk_date =Math.round(this.addforData[0].dk_date)
            },
            changeaccount(val){
                this.formData[0].account = val;
                this.judge()
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
