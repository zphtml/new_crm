<template>
    <div class="ku_addBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>添加公司回款</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser }}-回款详情</span>
                <div class="appInfotBox">
                   <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.submituser0.name | fileFunName }}</span>
                    <span class="nameColor lastName">负责商务 </span><span>{{data.business | fileFunName}}</span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">回款基本信息</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        回款金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" type="number" v-model="data.b_money" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        回款主体
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="b_company" filterable placeholder="请选择" @change="changeb_company">
                                            <el-option
                                                    v-for="(item,key) in b_companyOptions"
                                                    :key="item.companyname"
                                                    :label="item.companyname"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        回款日期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-date-picker  :clearable='false'
                                                         @change="judgeData"
                                                         v-model="data.b_time"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        回款人
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.huikuanren" placeholder="请输入内容"></el-input>
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
                                <span class="listText">备注信息</span>
                            </div>
                            <div class="inputInfor"  v-for="(data,index) in formData"  :key="index">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入备注"
                                        v-model="data.note">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="24" class="foot_btn">
                            <el-button type="primary" :disabled=disabledPull @click="pullData">提交</el-button>
                            <el-button  type="primary" class="reset" @click="rever">重置</el-button>
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
    import {addhuikuanru,add_huikuan} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                dataInfor:[],
                textarea: '',
                formData: [{
                    "advertiser": "",
                    "submituser": "",
                    "b_money": "",
                    "b_company": "",
                    "appname": "",
                    "b_time":  moment().format('YYYY-MM-DD'),
                    "huikuanren": "",
                    "note": ""
                }],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':3,
                },
                b_company:'',
                b_companyOptions:[],
                //账户信息
                add_huikuan:function(val){
                    add_huikuan({
                        id:val,
                    }).then(response => {
                        this.b_companyOptions.push(response.agentCompany);
                        this.b_companyOptions =  this.b_companyOptions[0];
                        this.dataInfor.push(response.customer);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].advertiser = response.customer.id;
                        this.formData[0].appname = response.customer.appname;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,

                //上传
                addhuikuanru:function(val){
                    addhuikuanru({
                        data:val
                    }).then(response => {
                        if(response.code == '200'){
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 3;
                            let _this = this;
                            if(this.$refs.upload.uploadFiles.length == 0){
                                this.success();
                            }
                            this.$refs.upload.submit();
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.meg,
                                type: 'warning'
                            });
                        }

                    }).catch(err => {
                        this.disabledPull = false;
                    });
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--客户控制台',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'console' ,query: { type:1} });
                    }, 500);
                },
                judge(){
                    if( this.formData[0].b_money != ""&& this.formData[0].b_company != ""&& this.formData[0].b_time != "" ){
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
                        this.formData[0].b_time = moment(this.formData[0].b_time).format('YYYY-MM-DD');
                        this.addhuikuanru(this.formData[0])
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });

                    });
                },
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        watch: {
            user: function (newValue) {

            },
        },
        mounted(){
            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.add_huikuan(decodeURI(ref[0].split('=')[1]));

        },
        methods: {

            changeb_company(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].b_company = this.b_companyOptions[index].id;
                }
                this.judge();

            },
            judgeData(){
                this.judge();
            },
            handleAvatarSuccess(){
                this.success();
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
            rever(){
                this.formData[0].b_money = "";
                this.formData[0].b_company = "";
                this.formData[0].note = "";
                this.formData[0].huikuanren = "";
                this.formData[0].b_time =  moment().format('YYYY-MM-DD');
                this.b_company = "";
                this.$refs.upload.clearFiles();
                this.judge();
            },
//跳转
            jumpCustomerList(){
                this.$router.push({name: 'kehuliebiao'});
            },
            jumpConsole(){
                this.$router.push({name: 'console' ,query: { type:1} });
            },
            back(){
                this.$router.push({name: 'AddCustomerInformation'});
            }
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
                    return val
                }else{
                    return '---'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/crmStyle/addform.scss";

</style>
