<template>
    <div class="Addkh_bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>付款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-付款</span>
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
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor" >
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">补款信息</span>
                            </div>
                            <div class="titleBox" >
                                <div style="width: 60%;display: inline-block;vertical-align: top">
                                    <div  v-for="(data,index) in formData" :key="index">
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="5" class="title" style="font-size: 16px;color:black">
                                                    打款类型
                                                </el-col>
                                                <el-col :span="19" class="input_search">
                                                    <el-radio-group v-model="data.type">
                                                        <el-radio :label="1">预付</el-radio>
                                                        <el-radio :label="2">垫付</el-radio>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="5" class="title" style="font-size: 16px;color:black">
                                                    打款金额
                                                </el-col>
                                                <el-col :span="19" class="input_search">
                                                    <el-input type="text" class="inputNum inputText" placeholder="请输入内容"  >
                                                        <template slot="append">元</template>
                                                    </el-input>
                                                    <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 36px;top: 4px;width: 248px;outline: none;z-index:9"
                                                           type="number" v-model="data.money"
                                                           name="mouse2"
                                                           placeholder="请输入金额" v-on:input="bukuanchange"
                                                           onmousewheel="return false;">
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="5" class="title">
                                                   打款日期
                                                </el-col>
                                                <el-col :span="19" class="input_search">
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
                                                <el-col :span="5" class="title">
                                                    广告主名称
                                                </el-col>
                                                <el-col :span="19" class="input_search">
                                                    <el-select v-model="cu_ad_id" filterable placeholder="请选择" @change="cu_ad_id_change">
                                                        <el-option
                                                                v-for="(item,key) in accountOptions"
                                                                :key="key"
                                                                :label="item.advertiser"
                                                                :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-col>
                                        </div>
                                    </div>
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="5" class="title">
                                                附件信息
                                            </el-col>
                                            <el-col :span="19" class="input_search">
                                                <el-upload
                                                        ref="upload"
                                                        list-type="picture"
                                                        name="File[imageFiles][]"
                                                        action="/api/file/addfile"
                                                        :on-success="handleAvatarSuccess"
                                                        :on-change="handleChange"
                                                        :on-remove = 'removeChange'
                                                        :data="dataObj"
                                                        :auto-upload="false"
                                                        multiple>
                                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button> <span v-if="textShow" style="font-size: 12px;color: #9c9c9c;">未选择任何文件</span>
                                                </el-upload>
                                            </el-col>
                                        </el-col>
                                    </div>
                                </div>
                                <div style="width: 39%;display: inline-block;vertical-align: top;margin-left: -10px"  v-for="(data,index) in formData" :key="index">
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="7" class="title" style="font-size: 16px;color:black;text-align: left">
                                                备注信息
                                            </el-col>
                                            <el-col :span="17" class="input_search">
                                                <el-input
                                                        type="textarea"
                                                        :rows="6"
                                                        placeholder="请输入内容"
                                                        v-model="data.note">
                                                </el-input>
                                            </el-col>
                                        </el-col>
                                    </div>
                                </div>
                            </div>
                    </el-col>
                    <el-col :span="24" class="fujianInfor">
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
    import { add_zhuankuan,add_margin_to_media_ru,customer_advertiser_list } from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                disabledPull:true,
                dataInfor:[],
                cu_ad_id:'',
                accountOptions:[],
                textShow:true,
                agent_company:'',
                formData:[
                    {
                        "advertiser":"",//公司id
                        "xf_contractid":" ",//合同id
                        "submituser":" ",//提交人id
                        "money":"",//充值金额
                        "company":"",//代理公司
                        "appname":"",
                        'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                        "note":"",
                        'cu_ad_id':'',
                        'type':1,
                        "market":'',//销售
                    }
                ],
                margin_yue:0,
                add_zhuankuan:function(){
                    add_zhuankuan({
                        id:this.routeId,
                    }).then(response => {
                        this.dataInfor.push(response.contractinfo);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].xf_contractid = response.contractinfo.id;
                        this.formData[0].advertiser = response.contractinfo.advertiser;
                        this.formData[0].appname = response.contractinfo.appname;
                        this.formData[0].market = response.contractinfo.market;
                        this.agent_company = response.contractinfo.agent_company;
                        this.margin_yue = response.contractinfo.margin_yue;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_list:function(){

                    customer_advertiser_list({
                        id:this.accounts.id,
                    }).then(response => {
                        this.accountOptions = response.list;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                companyOptions:[],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':31,
                },
                judge(){
                    if( this.formData[0].money != ""  ){
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
                        this.add_margin_to_media_ru(this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
                add_margin_to_media_ru:function(data){
                    add_margin_to_media_ru({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 31;
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
            this.customer_advertiser_list();
            this.add_zhuankuan()
        },
        methods: {
            bukuanchange(){
                this.judge();
            },
            cu_ad_id_change(index){
                this.formData[0].cu_ad_id = this.cu_ad_id
            },
            //提交
            pullData(){
                if(this.formData[0].type == 1){
                    if(Number(this.formData[0].money)>Number(this.margin_yue)){
                        this.$message('打款金额不能大于保证金余额');
                    }else {
                        let data = '提交后不可更改，是否继续?';
                        this.tan(data)
                    }
                }else{
                    let data = '提交后不可更改，是否继续?';
                    this.tan(data)
                }

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
                if(this.dateShow == false){
                    this.add_picifile(this.dataObj['File[yid]'])
                }
            },
            //重置
            reset(){
                this.formData[0].payment_time  = moment().format('YYYY-MM-DD');
                this.formData[0].money  = '';
                this.formData[0].note  = '';
                this.$refs.upload.clearFiles();
            },
//跳转
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id: this.routeId}});
            },
        },
        created() {

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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    @media screen and (max-width: 1300px) {
        .ku_addBox {
            .Addkh_bukuanForm {
                .kh_left_box{
                    width: 75%;
                }
            }

        }
    }
    @media screen and (max-width: 1200px) {
        .Addkh_bukuanForm {
            .ku_addBox {
                .kh_left_box{
                    width: 85%;
                }
            }
        }

    }
    @media screen and (max-width: 1150px) {
        .Addkh_bukuanForm {
            .ku_addBox {
                .kh_left_box{
                    width: 90%;
                }
            }
        }

    }
</style>
