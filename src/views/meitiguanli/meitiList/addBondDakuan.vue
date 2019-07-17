<template>
    <div class="ku_addBox BondBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpht_list">执行框架列表</span>><span @click="jump_ht_infor">合同详情</span>><span>打保证金</span>
            </p>
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  style="position: relative" v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor" style="margin-bottom: 10px">
                            <span class="listStyle"></span>
                            <span class="listText">客户保证金列表</span>
                        </div>
                        <div class="top_dateAndTable" style="padding: 20px 0">
                            <div class="table">
                                <el-table
                                        border
                                        ref="multipleTable"
                                        :data="dk_table"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            type="selection"
                                            width="55">
                                    </el-table-column>
                                    <el-table-column
                                            :label="$t('titles.customer')">
                                        <template slot-scope="scope">
                                            <div style="color: #222F3B">
                                                {{ scope.row.adname }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="App名称">
                                        <template slot-scope="scope">
                                            <div style="color: #222F3B">
                                                {{ scope.row.adappname }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="150"
                                            label="金额">
                                        <template slot-scope="scope">
                                            {{ scope.row.money }}
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                </el-col>

            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">打款基本信息</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        打款金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" v-model="data.b_money" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        打款主体
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
                                        打款日期
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
                            <div class="inputInfor"  v-for="(data,index) in formData" :key="index">
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
    import { add_qddakuan} from '@/api/kehu';
    import {mcont_margin_list,meijie_margin_add,meijie_margin_add_ru} from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                textarea: '',
                formData: [{
                    "advertiser": '',
                    "submituser": '',
                    "b_money": "",
                    "b_company": "",
                    "b_time":  moment().format('YYYY-MM-DD'),
                    "note": "",
                    "ftype":'1',
                    "renew_idin":[],
                    "ht_id":'',//合同id
                }],
                numberData:0,
                dk_table:[],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':33,
                },
                tableClick:false,
                b_company:'',
                b_companyOptions:[],
                disabledPull:true,
                //列表
                mcont_margin_list:function(){
                    mcont_margin_list({
                        data:{
                            mhtid:this.routeId,
                        },
                    }).then(response => {
                        this.dk_table = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //账户信息
                meijie_margin_add:function(val){
                    meijie_margin_add({
                        id:this.accounts.id,
                    }).then(response => {
                        this.b_companyOptions = response.AgentCompany;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //上传
                meijie_margin_add_ru:function(val){
                    meijie_margin_add_ru({
                        data:val
                    }).then(response => {
                        if(response.code == '200'){
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 33;
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
                        message: '此页面将跳转到--合同详情',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'mediaviewcontract', query: { id: _this.routeId}});
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
                        this.meijie_margin_add_ru(this.formData[0])
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
                'user',
                'accounts'
            ])
        },
        watch: {
            user: function (newValue) {

            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.formData[0].advertiser = this.accounts.id;
            this.formData[0].submituser = this.user.id;
            this.formData[0].ht_id =this.$route.query.id;

                this.mcont_margin_list();
            this.meijie_margin_add();

        },
        methods: {
            //跳转
            //跳转
            jumpht_list(){
                this.$router.push({ name: 'MediaProtocolList' });
            },
            jump_ht_infor(){
                this.$router.push({ name: 'mediaviewcontract', query: { id: this.routeId}});
            },
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
            //表格
            handleSelectionChange(val){
                this.formData[0].renew_idin = [];
                this.numberData = 0;
                if(val.length>0){
                    this.tableClick = true;
                }else{
                    this.tableClick = false;
                }
                for(let a = 0;a<val.length;a++){
                    this.formData[0].renew_idin.push(val[a].id);
                    this.numberData +=Number(val[a].money)
                }
            },
            //提交
            pullData(){
                let data = '';
                 if(this.tableClick){
                    if(Number(this.formData[0].b_money)>=this.numberData){
                        data = '提交后不可更改，是否继续?';
                        this.tan(data)
                    }else{
                        this.$message({
                            message: '输入金额不能小于勾选的金额',
                            type: 'warning'
                        });
                    }
                }else{
                    data = '提交后不可更改，是否继续?';
                    this.tan(data)
                }

            },
            rever(){
                this.formData[0].b_money = "";
                this.formData[0].b_company = "";
                this.formData[0].note = "";
                this.formData[0].b_time =  moment().format('YYYY-MM-DD');
                this.b_company = "";
                this.$refs.upload.clearFiles();
                this.judge();
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
    .BondBox {
        .kh_InforBox {
            .top_dateAndTable {
                background: #F2F7ff ;
                .dateClass {
                    width:250px;
                    height:30px;
                    padding:0;
                    margin:10px 0 5px 20px;
                    input{
                        height:20px!important;
                    }
                    .el-range-separator {
                        width:20px;
                    }
                }
                .table {
                    width:100%;
                    padding: 0 20px;

                    .el-table--border th ,td{
                        border-right-color:#bebbb5;
                        border-bottom-color:#bebbb5;
                    }
                    .el-table--border td:last-child{
                        border-right: none;
                    }
                    .el-table td, .el-table th{
                        height: 29px!important;
                    }
                    .el-table thead th, .el-table thead th > .cell,.el-table th, .el-table tr{
                        background: #F2F7ff !important;
                    }
                    .el-table {
                        border: 1px solid #bebbb5 ;
                        .el-table__header-wrapper {
                            height:30px;
                            font-size: 12px;
                            thead>th > .cell {
                                background: #F2F7ff!important;
                            }
                        }
                        .el-table__body-wrapper {
                            background: #F2F7ff;
                        }
                    }

                }
            }
        }
    }

</style>
