<template>
    <div class="ku_addBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>转款</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-转款</span>
                <div class="appInfotBox">
                   <span class="appInfor qu" v-if="data.advertiser0.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.advertiser0.customer_type == 1">
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
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">回款基本信息</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        协议名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="margin-left: 20px;font-size: 12px;color: black;">{{ mhtTitle }}</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转出账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="account" filterable placeholder="请选择" @change="accountChnage">
                                            <el-option
                                                    v-for="(item,key) in zc_accountOptions"
                                                    :key="item.a_users"
                                                    :label="item.a_users"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 14px;color:black">
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
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        转款金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" v-model="data.money" placeholder="请输入内容"  v-on:input="moneyChange">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转出{{$t('titles.fandian')}}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="margin-left: 20px;font-size: 12px;color: black;">{{ data.to_rebates_proportion }}%</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转出账户币
                                    </el-col>
                                    <el-col :span="20" class="input_search colorText">
                                        <el-input class="inputText colorText" v-model="data.to_show_money" :disabled="true" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转入协议名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="xf_contractid" filterable placeholder="请选择"  @change="xf_contractidChange">
                                            <el-option
                                                    v-for="(item,key) in xf_contractidOptions"
                                                    :key="key"
                                                    :label="item.title"
                                                    :value="key">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转入账户名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="to_account" filterable placeholder="请选择" @change="to_accountChange">
                                            <el-option
                                                    v-for="(item,key) in to_accountOptions"
                                                    :key="item.a_users"
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
                                        转入{{$t('titles.fandian')}}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="margin-left: 20px;font-size: 12px;color: black;">{{ data.rebates_proportion }}%</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        转入账户币
                                    </el-col>
                                    <el-col :span="20" class="input_search colorText">
                                        <el-input class="inputText colorText" v-model="data.show_money" :disabled="true" placeholder="请输入内容"  v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
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
    import {add_zhuankuan_ru,add_zhuankuan,contract_to_account} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                dataInfor:[],
                mhtTitle:'',
                textarea: '',
                xf_contractid:'',
                to_account:'',
                account:'',
                fd_type:"",
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1002,
                },
                formData: [{
                    "advertiser":"",
                    "money":"",
                    "rebates_proportion":"",
                    "show_money":"",
                    "note":"",
                    "submituser":"",
                    "xf_contractid":"",
                    "to_account":"",
                    "zc_contractid":"",
                    "account":"",
                    "cu_ad_id":"",
                    "to_rebates_proportion":'',
                    "to_show_money":'',
                }],
                zc_accountOptions:[],
                xf_contractidOptions:[],
                to_accountOptions:[],
                b_company:'',
                //账户信息
                add_zhuankuan:function(val){
                    add_zhuankuan({
                        id:val,
                    }).then(response => {
                        this.dataInfor.push(response.contractinfo);
                        this.mhtTitle = response.contractinfo.mht.title;
                        this.xf_contractidOptions = response.contract_list;
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].zc_contractid = response.contractinfo.id;
                        this.fd_type  = response.contractinfo.fd_type;
                        this.formData[0].advertiser = response.contractinfo.advertiser;
                        this.formData[0].to_rebates_proportion = response.contractinfo.rencontract.fandian;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_to_account:function(val,name){
                    contract_to_account({
                        id:val,
                    }).then(response => {
                        if(name == 'zc'){
                            this.zc_accountOptions = response;
                        }else{
                            this.to_accountOptions =  response;
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                disabledPull:true,

                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--转款列表',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'TransferOfFundsList' });
                    }, 500);
                },
                judge(){
                    if( this.formData[0].account != ""&& this.formData[0].xf_contractid != ""&& this.formData[0].to_account != ""&&this.formData[0].money != ""  ){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                add_zhuankuan_ru(data){
                    add_zhuankuan_ru({
                        data:data,
                    }).then(response => {
                        if(response.code == 200){
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 1002;
                            this.$refs.upload.submit();
                            this.success()
                        }else{
                            this.$message.error('提交失败！');
                            this.disabledPull = false;
                        }

                    }).catch(err => {
                        this.$message.error('提交失败！');
                        this.disabledPull = false;
                    });
                },
                tan(data) {
                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabledPull = true;
                        this.add_zhuankuan_ru(this.formData[0])
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
            this.add_zhuankuan(decodeURI(ref[0].split('=')[1]));
            this.contract_to_account(decodeURI(ref[0].split('=')[1]),'zc');

        },
        methods: {
            accountChnage(index){
                this.formData[0].account = this.zc_accountOptions[index].id;
            },
            xf_contractidChange(index){

                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].xf_contractid = this.xf_contractidOptions[index].id;
                    this.contract_to_account(this.xf_contractidOptions[index].id,'zr');
                    this.formData[0].rebates_proportion =  this.xf_contractidOptions[index].fandian;
                }
                this.to_account = '';
                this.formData[0].to_account = "";
                this.moneyChange();
                this.judge();
            },
            to_accountChange(index){
                this.formData[0].to_account = this.to_accountOptions[index].id;
                this.formData[0].cu_ad_id =  this.to_accountOptions[index].cu_ad_id;

                this.judge();
            },
            moneyChange(){
                if(this.formData[0].rebates_proportion !=""){
                    if(this.fd_type ==1){
                        this.formData[0].show_money = (Number(this.formData[0].money)*(1+Number((this.formData[0].rebates_proportion))/100)).toFixed(2);
                    }else{
                        this.formData[0].show_money = (Number(this.formData[0].money)/(1-Number((this.formData[0].rebates_proportion))/100)).toFixed(2);
                    }
                }
                if(this.fd_type ==1){
                    this.formData[0].to_show_money = (Number(this.formData[0].money)*(1+Number((this.formData[0].to_rebates_proportion))/100)).toFixed(2);
                }else{
                    this.formData[0].to_show_money = (Number(this.formData[0].money)/(1-Number((this.formData[0].to_rebates_proportion))/100)).toFixed(2);
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
                let data = '提交后不可更改，是否继续?';
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
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id:this.$route.query.id}});
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
