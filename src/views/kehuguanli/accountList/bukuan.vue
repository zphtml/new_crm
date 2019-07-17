<template>
    <div class="Addkh_bukuanForm ku_addBox" >
        <el-row class="bukuanBox">
            <el-col :span="24" class="kh_InforBox" >
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor" >
                            <div class="titleInfor">
                                <span class="listStyle"></span>
                                <span class="listText">补款信息</span>
                            </div>
                            <div class="titleBox" >
                                <div style="width: 60%;display: inline-block;vertical-align: top">
                                    <div  v-for="(data,index) in formData">
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="5" class="title" style="font-size: 16px;color:black">
                                                    补款金额
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
                                                    补款日期
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
                                        <div style="height: 30px;margin-bottom: 5px;">
                                            <el-col :span="24"  class="infor_a">
                                                <el-col :span="5" class="title" >
                                                    补款主体
                                                </el-col>
                                                <el-col :span="19" class="input_search">
                                                    <div class="inputBox" style="background: none;border: none">
                                                        {{  agent_company }}
                                                    </div>
                                                </el-col>
                                            </el-col>
                                        </div>
                                    </div>
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a" style="height: auto;">
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
                                <div style="width: 39%;display: inline-block;vertical-align: top;margin-left: -10px"  v-for="(data,index) in formData">
                                    <div style="height: 30px;margin-bottom: 5px;">
                                        <el-col :span="24"  class="infor_a">
                                            <el-col :span="7" class="title" style="font-size: 16px;color:black;text-align: left">
                                                备注信息
                                            </el-col>
                                            <el-col :span="17" class="input_search">
                                                <el-input
                                                        type="textarea"
                                                        :rows="7"
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
    import { add_bukuanGet,add_bukuan_ru,customer_advertiser_list } from '@/api/kehu';
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
                add_bukuanGet:function(){
                    let url=location.href.split('?')[1];
                    let ref=url.split('&');
                    let dataId = decodeURI(ref[0].split('=')[1]);
                    add_bukuanGet({
                        id:dataId,
                    }).then(response => {
                        this.dataInfor = [];
                        this.dataInfor.push(response.contract_info);
                        this.formData[0].submituser = this.user.id;
                        this.formData[0].xf_contractid = response.contract_info.id;
                        this.formData[0].advertiser = response.contract_info.advertiser;
                        this.formData[0].appname = response.contract_info.appname;
                        this.agent_company = response.contract_info.agent_company;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                customer_advertiser_list:function(){

                    customer_advertiser_list({
                        id:this.accounts.id,
                    }).then(response => {
                        this.accountOptions = response.list;
                    }). catch(err => {this.$message.error('获取失败');});
                },
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
                    }
                ],
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
        methods: {
            bukuandata(){
                this.routeId =  this.$route.query.id;
                this.customer_advertiser_list();
                this.add_bukuanGet()
            },
            bukuanchange(){
                this.judge();
            },
            cu_ad_id_change(index){
                this.formData[0].cu_ad_id = this.cu_ad_id
            },
            //提交
            pullData(){
                let data = '提交后不可更改，是否继续?';
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
