<template>
    <div class="bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpht_list">执行框架列表</span>><span @click="jump_ht_infor">合同详情</span>><span>补款</span>
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
            </el-col>
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="18" class="kh_left_box">
                    <el-col :span="24" class="topInfor" >
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">补款信息</span>
                        </div>
                        <div class="titleBox" >
                            <div style="width: 60%;display: inline-block;">
                                <div style="width: 100%;display: inline-block;vertical-align: top;margin-bottom: 10px">
                                    <el-col :span="24"  class="infor_a" >
                                        <el-col :span="7"class="title">
                                            补款到备款账户
                                        </el-col>
                                        <el-col :span="17"class="input_search" style="padding-left: 30px">
                                            <el-radio-group v-model="is_t_beikuan_account" @change="changeType">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="2">否</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-col>

                                </div>
                                <div style="width: 100%;display: inline-block;vertical-align: top" >
                                    <div  v-for="(data,index) in formData" :key="index">
                                        <div style="height: 30px;margin-bottom: 5px;" v-if="b_account">
                                            <el-col :span="24"  class="infor_a" >
                                                <el-col :span="7"class="title">
                                                    备款账户
                                                </el-col>
                                                <el-col :span="17"class="input_search">
                                                    <el-select v-model="account" filterable placeholder="请选择" @change="changeaccount">
                                                        <el-option
                                                                v-for="(item,key) in accountOptions"
                                                                :key="item.id"
                                                                :label="item.a_users"
                                                                :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="7"class="title" >
                                                    补款账户币
                                                </el-col>
                                                <el-col :span="17"class="input_search">
                                                    <el-input v-model="data.show_money" type="text" style="width: 290px;"></el-input>
                                                    <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left: 20px;top: 4px;width: 288px;outline: none;z-index:9"
                                                           type="number" v-model="data.show_money"
                                                           name="mouse2"
                                                           placeholder="请输入金额" v-on:input="bukuanData"
                                                           onmousewheel="return false;">
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <!--<el-col :span="24"></el-col>-->
                                                <el-col :span="7"class="title" >
                                                    媒体{{$t('titles.fandian')}}
                                                </el-col>
                                                <el-col :span="17"class="input_search">
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
                                                <el-col :span="7"class="title" >
                                                    补款金额
                                                </el-col>
                                                <el-col :span="17"class="input_search">
                                                    <el-input class="inputText" placeholder="自动计算" v-model="data.money" :disabled="true">
                                                        <template slot="append">元</template>
                                                    </el-input>
                                                </el-col>
                                            </el-col>
                                        </div>
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="7"class="title">
                                                    补款日期
                                                </el-col>
                                                <el-col :span="17"class="input_search">
                                                    <el-date-picker  :clearable='false'
                                                                     v-model="data.payment_time"
                                                                     type="date"
                                                                     placeholder="选择日期">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-col>
                                        </div>
                                    </div>
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="7"class="title">
                                                附件信息
                                            </el-col>
                                            <el-col :span="17"class="input_search">
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
                                                    :rows="11"
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
    import { add_bukuanGet,add_bukuan_ru } from '@/api/meiti';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                is_t_beikuan_account:1,
                b_account:true,
                account:'',
                textShow:true,
                agent_company:'',
                disabledPull:true,
                dataInfor:[],
                accountOptions:[],
                add_bukuanGet:function(){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let dataId = decodeURI(ref[0].split('=')[1]);
                    add_bukuanGet({
                        id:dataId,
                    }).then(response => {
                        this.accountOptions = response.accountlist;
                        this.dataInfor.push(response.contract_info);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].xf_contractid = response.contract_info.id;
                        this.formData[0].mht_id = response.contract_info.id;
                        this.formData[0].advertiser = response.contract_info.advertiser;
                        this.formData[0].appname = response.contract_info.appname;
                        this.formData[0].dl_fandian = response.contract_info.dl_fandian;
                        this.formData[0].rebates_proportion = response.contract_info.rebates_proportion;
                        this.agent_company = response.contract_info.agent_company;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                formData:[
                    {
                        'account':'',//备款id
                        'show_money':'',//账户币
                        "advertiser":"",//公司id
                        "xf_contractid":" ",//合同id
                        "mht_id":"",
                        "submituser":" ",//提交人id
                        "money":"",//充值金额
                        "appname":"",
                        'dl_fandian':'',
                        'rebates_proportion':'',
                        'is_t_beikuan_account':'',
                        'payment_time': moment().format('YYYY-MM-DD'),//付款时间 2017-11-01
                        "note":""
                    }
                ],
                companyOptions:[],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':31,
                },
                judge(){
                    if(this.is_t_beikuan_account == 2){
                        if( this.formData[0].show_money != "" ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else{
                        if( this.formData[0].show_money != "" && this.formData[0].account != ""){
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
                        this.disabledPull = true;
                        this.formData[0].payment_time = moment(this.formData[0].payment_time).format('YYYY-MM-DD');
                        this.add_bukuan_ru(this.formData[0]);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
                add_bukuan_ru:function(data){
                    add_bukuan_ru({
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
            this.add_bukuanGet();
        },
        methods: {
            //选择抵扣还是备款
            changeType(){
                if(this.is_t_beikuan_account == 2){
                    this.b_account = false;
                    this.account = '';
                    this.formData[0].account ='';
                }else{
                    this.b_account = true;
                }
                this.formData[0].is_t_beikuan_account = this.is_t_beikuan_account;
                this.judge()
            },
            // 账户币
            bukuanData(){
                this.formData[0].money = (Number(this.formData[0].show_money)/(1+(Number(this.formData[0].rebates_proportion)/100))*(1-(Number(this.formData[0].dl_fandian)/100))).toFixed(2);
                this.judge()
            },
            //提交
            pullData(){
                let  data = '提交后不可更改，是否继续?'
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
            changeaccount(index){
                this.formData[0].account = this.account;
                this.judge()
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
                this.formData[0].show_money = '';
                this.formData[0].account = '';
                this.b_account = true;
                this.account = '';
                this.is_t_beikuan_account = 1;
                this.$refs.upload.clearFiles();
            },
//跳转
            jumpht_list(){
                this.$router.push({ name: 'MediaProtocolList' });
            },
            jump_ht_infor(){
                this.$router.push({ name: 'mediaviewcontract', query: { id:this.routeId}});
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
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
</style>
