<template>
    <div class="addMt_contractList ku_addBox" >
        <el-row class="addhetongBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpMeitiList">媒体列表</span>><span>添加合同</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in titleData" :key="index">
                <span class="corporateName">{{ data.advertiser }}</span>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.submituser0 | fileFunName}}</span>
                </div>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData" :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">合同基本信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData" :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        媒体公司
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <span style="margin-left: 20px;font-size: 16px"> {{ guanggaozhu }}</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        {{ $t('titles.agent') }}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="agent_company" filterable  placeholder="请选择" @change="agent_companyChange">
                                            <el-option
                                                    v-for="(item,key) in agent_companyOptions"
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
                                        合同编号
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                           <span style="margin-left: 20px;font-size: 12px">
                                            {{ data.contract_no }}
                                        </span>
                                    </el-col>
                                </el-col>
                            </div>

                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        合同名称
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.title" placeholder="请输入内容" v-on:input="judgeChange">></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        合同类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="type " class="radio" @change="Typeradio">
                                            <el-radio :label="1">普通合同</el-radio>
                                            <el-radio :label="2">框架合同</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;"  v-if="2 == hetongType">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        保证金
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input v-model="data.margin" class="inputNum" placeholder="请输入内容"  v-on:input="judgeChange"></el-input>
                                        <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:15px;top: 4px;width: 265px;outline: none;z-index:9"
                                               type="number" v-model="data.margin"
                                               name="mouse2"
                                               placeholder="请输入保证金" v-on:input="judgeChange"
                                               onmousewheel="return false;">
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" >
                                        媒体类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="state " class="radio" @change="statechange">
                                            <el-radio :label="1">直开</el-radio>
                                            <el-radio :label="2">框架</el-radio>
                                            <el-radio :label="3">套壳</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
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
                            <span class="listText">购买产品信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData" :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a" v-for="(data,index) in formData" :key="index">
                                    <el-col :span="4" class="title">
                                        产品线
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="product_line" filterable placeholder="请选择" @change="product_lineChange">

                                            <el-option-group
                                                    v-for="(item,key) in product_lineOptions"
                                                    :key="item.name"
                                                    :label="item.name">
                                                <el-option
                                                        v-for="(item,index) in item.zi"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-option-group>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        合同金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input type="text" class="num inputText" v-model="data.contract_money" placeholder="请输入金额"  v-on:input="judgeChange">
                                            <template slot="append">元</template>
                                        </el-input>
                                        <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:15px;top: 4px;width: 265px;outline: none;z-index:9"
                                               type="number" v-model="data.contract_money"
                                               name="mouse2"
                                               placeholder="请输入金额" v-on:input="judgeChange"
                                               onmousewheel="return false;">
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        账户{{$t('titles.fandian')}}
                                    </el-col>
                                    <el-col :span="20" class="input_search" >
                                        <el-input type="text"class="meitiInput inputText" :placeholder="'请输入'+$t('titles.fandian')">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:15px;top: 4px;width: 265px;outline: none;z-index:9"
                                               type="number" v-model="data.rebates_proportion"
                                               name="mouse2"
                                               :placeholder="'请输入'+$t('titles.fandian')" v-on:input="judgeChange"
                                               onmousewheel="return false;">
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        现金{{$t('titles.fandian')}}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input type="text" v-model="data.dl_fandian"   v-on:input="judgeChange" class="fandianInput inputText" :placeholder="'请输入'+$t('titles.fandian')">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:15px;top: 4px;width: 265px;outline: none;z-index:9"
                                               type="number" v-model="data.dl_fandian"
                                               name="mouse2"
                                               :placeholder="'请输入'+$t('titles.fandian')" v-on:input="judgeChange"
                                               onmousewheel="return false;">
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        销售媒介{{$t('titles.fandian')}}
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input type="text" v-model="data.m_xsfd"  v-on:input="judgeChange" class="fandianInput inputText"  :placeholder="'请输入'+$t('titles.fandian')">
                                            <template slot="append">%</template>
                                        </el-input>
                                        <input style="line-height: normal; border: none;font-size: 12px;height: 24px; position: absolute;left: 22px;padding-left:15px;top: 4px;width: 265px;outline: none;z-index:9"
                                               type="number" v-model="data.m_xsfd"
                                               name="mouse2"
                                               :placeholder="'请输入'+$t('titles.fandian')" v-on:input="judgeChange"
                                               onmousewheel="return false;">
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        合同有效期
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-date-picker  :clearable='false'
                                                         style="width: 135px;margin-left: 20px;"
                                                         v-model="data.contract_start"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                        <span>
                                            ~
                                        </span>
                                        <el-date-picker  :clearable='false'
                                                         style="width: 135px;margin: 0;"
                                                         v-model="data.contract_end"
                                                         type="date"
                                                         placeholder="选择日期" >
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                            <span style="margin-right: 10px;font-size: 12px;margin-left: 20%;color: #9c9c9c;">
                                            * 结束时间为空则认为合同截止日期为： 至消费结束
                            </span>
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
    import { meijie_contract_add,meijie_contract_num,productline,meijie_contract_addru } from '@/api/meiti';

    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                htId:'',
                guanggaozhu:'',
                xiaoshou:'',
                titleData:[],
                advert:'',
                advertOptions:[],
                agent_company:'',
                agent_companyOptions:[],
                mht:'',
                mhtOptions:[],
                meitiNum:'',
                hetongType:1,
                payment_type:'',
                product_line:'',
                product_lineOptions:[],
                money:'',
                fandian:'',
                xianshijine:'',
                disabledPull:true,
                inforTrue:false,
                type:1,
                state:1,
                //上传文件
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1003,
                },
                formData:[
                    {
                        market:'',
                        "advertiser":"",
                        "submituser":"",
                        "is_meijie":"1",
                        "agent_company":"",
                        "contract_no":"自动填写",
                        "title":"",
                        "type":1,
                        "margin":"",
                        "state":1,
                        "product_line":"",
                        "contract_money":"", //合同金额
                        "rebates_proportion":"",
                        "dl_fandian":"",
                        "show_money":"",
                        'm_xsfd':'0',
                        "contract_start":moment().format('YYYY-MM-DD'),
                        "contract_end":"",
                        "note":""
                    }
                ],
                meijie_contract_add:function(data){
                    meijie_contract_add({
                        id:data,
                    }).then(response => {
                        this.titleData.push(response.customer);
                        this.agent_companyOptions = response.daili;
                        this.mhtOptions = response.meijielist;
                        this.formData[0].advertiser = response.customer.id;
                        this.formData[0].appname = response.customer.appname;
                        this.formData[0].submituser = this.user.id;
                        this.guanggaozhu = response.customer.advertiser;
                        this.xiaoshou =  response.customer.submituser0.name;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                meijie_contract_num:function () {
                    meijie_contract_num().then(response => {
                        this.meitiNum = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                productline(){
                    productline({
                    }).then(response => {
                        this.product_lineOptions = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                meijie_contract_addru:function(data){
                    meijie_contract_addru(
                        {data:data}
                    ).then(response => {
                        if(response.code == 200){
                            this.$message({
                                message: '新增合同成功',
                                type: 'success'
                            });
                            this.$notify({
                                title: '上传成功',
                                message: '此页面将跳转到-协议详情',
                                type: 'success'
                            });
                            this.dataObj['File[yid]'] = response.data.id;
                            this.$refs.upload.submit();
                            let _this = this;

                            setTimeout(function(){
                                _this.$router.push({ name: 'mediaviewcontract', query: { id: response.data.id}});
                            }, 1000);
                        }

                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                    if(this.hetongType == 1){
                        if(    this.formData[0].agent_company != ""&&
                            this.formData[0].m_xsfd != ""&&
                            this.formData[0].title != ""&&
                            this.formData[0].product_line  != ""&&
                            this.formData[0].contract_money  != ""&&
                            this.formData[0].rebates_proportion  != ""&&
                            this.formData[0].dl_fandian   != ""&&
                            this.formData[0].contract_start   != ""
                          ){
                            this.disabledPull = false;
                        }else{
                            this.disabledPull = true;
                        }
                    }else{
                        if(
                            this.formData[0].agent_company != ""&&
                            this.formData[0].m_xsfd != ""&&
                            this.formData[0].title != ""&&
                            this.formData[0].product_line  != ""&&
                            this.formData[0].margin  != ""&&
                            this.formData[0].contract_money  != ""&&
                            this.formData[0].rebates_proportion  != ""&&
                            this.formData[0].dl_fandian   != ""&&
                            this.formData[0].contract_start   != ""){
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
                        this.formData[0].contract_start = moment(this.formData[0].contract_start).format('YYYY-MM-DD');
                        if( this.formData[0].contract_end != ''){
                            this.formData[0].contract_end = moment(this.formData[0].contract_end).format('YYYY-MM-DD');
                        }
                        this.meijie_contract_addru(this.formData[0])
                        this.disabledPull = true;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
            ])

        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;

            let url=location.href.split('?')[1];
            let ref=url.split('&');
            this.meijie_contract_add( this.routeId);

            this.meijie_contract_num();
            this.productline();
            this.formData[0].market = this.user.id;
            let _this = this;
            this.roles.filter(function(item){
                if(item == "/api/renew-huikuan/up_meijie_markey_fandian"){
                    _this.inforTrue = true;
                }
            })
        },
        methods: {
            agent_companyChange(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].agent_company = this.agent_companyOptions[index].id;
                    this.formData[0].contract_no = this.agent_companyOptions[index].title +'_'+ this.user.id +'_'+ moment().format('YYYYMMDD')+ this.meitiNum;
                    this.judge()
                }

            },
            Typeradio(index){
                if(index == 2){
                    this.hetongType = 2;
                }else{
                    this.hetongType = 1;
                }
                this.formData[0].type = index;
                this.judge()
            },
            statechange(index){
                this.formData[0].state = index;
            },
            product_lineChange(index){
                this.formData[0].product_line =index;
                this.judge()
            },
            judgeChange(){
                this.judge()
            },
            payment_typeChange(index){
                this.formData[0].payment_type = index;
                this.judge()
            },
            fandianData(){
                if(this.money != "" && this.fandian != "" )
                    this.xianshijine = ((Number(this.money)*(1+(Number(this.fandian)/100))).toFixed(2));
                this.judge()
            },
            pullData(){
                let data ='';
                if(this.formData[0].note == ''){
                    data = '系统检测到您未添加备注，是否继续?'
                }else{
                    data = '提交后不可更改，是否继续?'
                }
                this.tan(data)
            },
            handleAvatarSuccess(){

            },
//跳转
            jumpMeitiList(){
                this.$router.push({ name: 'MediaList' });
            },
            Reset(){
                this.formData[0].title = "";
                this.formData[0].contract_money = "";
                this.formData[0].rebates_proportion = "";
                this.formData[0].dl_fandian = "";
                this.formData[0].m_xsfd = "";

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
    .addMt_contractList .kh_InforBox .kh_left_box .topInfor .titleBox .infor_a .input_search .el-radio-group .el-radio {
        width: 60px!important;
    }
</style>
