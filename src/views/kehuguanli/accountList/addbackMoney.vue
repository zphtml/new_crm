<template>
    <div class="addcontractList ku_addBox" >
        <el-row class="addhetongBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumphetong">上一级</span>><span>添加结算单</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in titleData" :key="index">
                <span class="corporateName">{{ data.advertiser }}</span>
                <div class="appInfotBox">
                    <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">合同基本信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData"  :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        {{ $t('titles.advertiser') }}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                      <span style="margin-left: 20px">
                                          {{ guanggaozhu }}
                                      </span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        回款金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input type="number" v-model="data.money" v-on:input="moneyChange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        账户币
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input type="number" v-model="data.show_money" v-on:input="moneyChange"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        结算周期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-date-picker  :clearable='false'
                                                         style="width: 140px;"
                                                         v-model="data.contract_start"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                        <span>
                                            ~
                                        </span>
                                        <el-date-picker  :clearable='false'
                                                         v-model="data.contract_end"
                                                         style="width: 140px;margin: 0;"
                                                         type="date"
                                                         placeholder="选择日期" >
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>

                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        负责销售
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="font-size: 12px;margin-left: 20px">
                                            {{ xishouNmae }}
                                        </span>
                                    </el-col>
                                </el-col>
                            </div>

                        </div>
                    </el-col>
                </el-col>
            </el-col>

            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
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
                            <el-button type="primary" @click="pullData" :disabled=disabledPull>提交</el-button>
                            <el-button class="reset" @click="Reset">重置</el-button>
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
    import { contract_add_new ,contract_accounts_addru} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                guanggaozhu:'',
                titleData:[],
                xishouNmae:'',


                disabledPull:true,
                formData:[
                    {
                        "advertiser":"",     //公司id
                        "submituser":"",	//提交人
                        "show_money":'',
                        "contract_start": moment().format('YYYY-MM-01'),   //合同开始时间
                        "contract_end":moment().format('YYYY-MM-DD'),	// 合同结束时间
                        'money':'',
                        "note":" "		// 备注
        }
                ],


                //上传文件
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1005,
                },

                contract_add_new:function(data){
                    contract_add_new({
                        id:this.routeId,
                    }).then(response => {
                        this.titleData.push(response.customer);
                        this.formData[0].advertiser = response.customer.id;
                        this.formData[0].submituser = this.user.id;
                        this.guanggaozhu = response.customer.advertiser;
                    }). catch(err => {this.$message.error('获取失败');});
                },

                contract_accounts_addru:function(data){
                    contract_accounts_addru(
                        {data:data}
                    ).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '新增合同成功',
                                type: 'success'
                            });
                            this.dataObj['File[yid]'] = response.data.id;
                            this.$refs.upload.submit();
                        this.$notify({
                            title: '上传成功',
                            message: '此页面将跳转到-客户列表',
                            type: 'success'
                        });
                        let _this = this;
                        setTimeout(function(){
                            _this.$router.push({ name: 'kehuliebiao' });
                        }, 1000);
                        }else{
                            this.disabledPull = true;
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                        if(this.formData[0].money != ""&&this.formData[0].show_money != ""){
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
                        this.formData[0].contract_start = moment(this.formData[0].contract_start).format('YYYY-MM-DD');
                        this.formData[0].contract_end = moment(this.formData[0].contract_end).format('YYYY-MM-DD');
                        this.disabledPull = true;
                        this.contract_accounts_addru(this.formData[0])
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                        this.disabledPull = false;

                    });
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
            this.xishouNmae = this.user.name;
            this.contract_add_new();
        },
        methods: {
            moneyChange(){
                this.judge();
            },
            pullData(){
                let data ='';
                data = '提交后不可更改，是否继续?';
                this.tan(data)
            },
            Reset(){
                this.formData = [
                    {
                        "advertiser":"",     //公司id
                        "submituser":"",	//提交人
                        "contract_start": moment().format('YYYY-MM-DD'),   //合同开始时间
                        "contract_end":"",	// 合同结束时间
                        'money':'',
                        "note":" "		// 备注
                    }
                ];
                this.$refs.upload.clearFiles();
            },
            jumphetong(){
                this.$router.go(-1)
            },

 //======================================================================上传文件======================================

            errorImg(){
                this.$message.error('文件上传失败,qinglianxi ');
            },
            handleAvatarSuccess(){

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
            fileDataFun(val){
                if(val){
                    return val
                }else{
                    return '自动生成，无需填写'
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
    .addcontractList {
        .kh_InforBox .kh_left_box .topInfor .titleBox .infor_a .input_search .el-radio-group .el-radio {
            width:65px;
        }
        .okbut{
            background: #08d9a8;
        }
        .addbut{
            background: #499fe2;
        }
        .addbut,.okbut{
            width: 40px;
            height: 20px;
            display: inline-block;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
            color: white;
            border-radius: 3px;
            cursor: pointer
        }

    .ht_input{
        display: inline-block;
        background: white;
        font-size: 12px;
        margin-right: 10px;
        input{
            border: none!important;
        }
    }
}
    .addcontractList .kh_InforBox .kh_left_box .topInfor .titleBox .infor_a .input_search .el-radio-group .el-radio{
        width: 60px!important;
    }

    @media screen and (max-width: 1300px) {
        .ku_addBox .kh_InforBox .kh_left_box .topInfor .titleBox .infor_a .input_search .el-select{
            width: 170px!important;
            .el-input {
                width: 100%!important;
            }
        }
    }

</style>
