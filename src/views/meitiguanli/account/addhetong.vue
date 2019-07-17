<template>
    <div class="addcontractList ku_addBox" >
        <el-row class="addhetongBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumphetong">上一级</span>><span>添加合同</span>
            </p>
            <el-col :span="24" class="consoleTitle" v-for="(data,index) in titleData"  :key="index">
                <span class="corporateName">{{ data.advertiser }}</span>
                <div class="appInfotBox">
                    <span class="appInfor qu" v-if="data.customer_type == 2" >
                          渠
                    </span>
                    <span class="appInfor zhi"  v-if="data.customer_type == 1">
                         直
                    </span>
                </div>
                <div class="name">
                    <span class="nameColor">负责销售 </span> <span>{{data.submituser0 | fileFunName}}</span>
                    <span class="nameColor lastName">负责商务 </span><span>{{data.business0 | fileFunName}}</span>
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
                                <el-col :span="24"  class="infor_a" v-for="(data,index) in formData"  :key="index" >
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
                                        <el-input v-model="data.contract_no" placeholder="自动填写" v-on:input="inputTetx"></el-input>
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
                                                         style="width: 135px;"
                                                         v-model="data.contract_start"
                                                         type="date"
                                                         placeholder="选择日期">
                                        </el-date-picker>
                                        <span>
                                            ~
                                        </span>
                                        <el-date-picker  :clearable='false'
                                                         v-model="data.contract_end"
                                                         style="width: 135px;margin: 0;"
                                                         type="date"
                                                         placeholder="选择日期" >
                                        </el-date-picker>
                                    </el-col>
                                </el-col>
                            </div>
                            <span style="margin-right: 10px;font-size: 12px;margin-left: 20%;color: #9c9c9c;">
                                            * 结束时间为空则认为合同截止日期为： 至消费结束
                            </span>
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
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">付款信息</span>
                        </div>
                        <div class="titleBox" v-for="(data,index) in formData"  :key="index">
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        付款方式
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-radio-group v-model="payment_type" @change="payment_typeChange">
                                            <el-radio :label="1">预付</el-radio>
                                            <el-radio :label="2">垫付</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        结算方式
                                    </el-col>
                                    <el-col :span="20" class="input_search ">
                                        <el-radio-group v-model="is_jstype" class="radio_a" >
                                            <el-radio :label="0">普通方式</el-radio>
                                            <el-radio :label="1">按消耗结算</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 10px;" v-if="show_zhouqi">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        回款周期
                                    </el-col>
                                    <el-col :span="20" class="input_search" style="height: 30px;" >
                                        <el-input class="inputText inputTextColor" placeholder="自动计算" v-model="data.zhouqi"   @change="judgeChange" >
                                            <template slot="append">天</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">产品线</span>
                        </div>
                        <div class="titleBox">
                            <div style="height: 30px;margin-bottom: 5px;" v-for="(data,key) in formLine"  :key="index">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        产品线
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="data.line"  placeholder="请选择" :disabled="data.close">
                                            <el-option-group
                                                    v-for="(item,key) in lineoptions"
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
                                        <span style="margin-left: 28px;margin-right: 10px; font-size: 12px;">
                                            {{ $t('titles.fandian') }}
                                        </span>
                                        <div class="ht_input" v-if="!data.close">
                                            <el-input :placeholder="$t('titles.fandian') " v-model="data.fandian" :disabled="data.close" style="width: 100px;margin: 0;"></el-input>
                                            <span style="display: inline-block;margin-right: 5px">%</span>
                                        </div>
                                        <div class="ht_input" v-if="data.close" style="background:#f5f7f9;border: 1px solid #e4e0d9; ">
                                            <el-input :placeholder="$t('titles.fandian') " v-model="data.fandian" :disabled="data.close" style="width: 100px;margin: 0;"></el-input>
                                            <span style="display: inline-block;margin-right: 5px">%</span>
                                        </div>
                                        <span v-if="!data.close">
                                            <span class="addbut" @click="addbut(data)">添加</span>
                                        </span>
                                        <img v-if="data.close" @click="closebtn(data,key)" src="../../../assets/cha_close.png" style="width: 15px;display: inline-block;vertical-align: middle;cursor: pointer" alt="">
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
    import { contract_add_new,contract_num,Roler_users ,contract_addru_new,productline,contract_no_num} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    export default {
        data() {
            return {
                routeId:'',
                guanggaozhu:'',
                xiaoshou:'',
                titleData:[],
                advert:'',
                advertOptions:[],
                agent_company:'',
                agent_companyOptions:[],
                meitiNum:'',
                payment_type:1,
                xishouNmae:'',
                show_zhouqi:false,
                payment_typeOptions:[
                    {
                        name:'预付',
                        id:'1'
                    },{
                        name:'垫付',
                        id:'2'
                    }
                ],
                money:'',
                fandian:'',
                xianshijine:'',
                disabledPull:true,
                is_jstype:0,
                formData:[
                    {
                        "advertiser":"",     //公司id
                        "submituser":"",	//提交人
                        "market":"",		//销售id
                        "agent_company":"",   // 代理公司 id
                        "contract_no":"自动填写", //合同编号LZAD_16_201711801
                        "appname":"",
                        "contract_start": moment().format('YYYY-MM-DD'),   //合同开始时间
                        "contract_end":"",	// 合同结束时间
                        "payment_type":"1",	//	 付款方式
                        "zhouqi":0,			// 周期
                        "fandian":[],
                        'product_line':[],
                        "is_jstype":0,		// 结算方式 0普通方式  1按消耗
                        "note":" "		// 备注
        }
                ],
                formLine:[
                    {
                        line:"",
                        fandian:"",
                        close:false,
                    }
                ],
                //产品线
                line:'',
                lineId:'',
                lineName:'',
                fandianText:"",
                linrType:0,
                lineoptions:[],
                addLine:[],
                //上传文件
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1006,
                },
                NewId:'',
                contract_no_num:function(){
                    contract_no_num({
                        id:this.$route.query.htId,
                    }).then(response => {
                        this.NewId = response;
                        this.formData[0].contract_no = this.NewId;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_add_new:function(data){
                    contract_add_new({
                        id:this.routeId,
                    }).then(response => {
                        this.titleData.push(response.customer);
                        this.agent_companyOptions = response.daili;
                        this.formData[0].market = response.customer.submituser0.id;
                        this.formData[0].advertiser = response.customer.id;
                        this.formData[0].appname = response.customer.appname;
                        this.formData[0].submituser = this.user.id;
                        this.guanggaozhu = response.customer.advertiser;
                        this.xiaoshou =  response.customer.submituser0.name;
                        this.lineoptions = response.prlist;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_num:function () {
                    contract_num().then(response => {
                        this.meitiNum = response;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                contract_addru_new:function(data){
                    contract_addru_new(
                        {data:data}
                    ).then(response => {
                            this.$message({
                                message: '新增合同成功',
                                type: 'success'
                            });
                            this.dataObj['File[yid]'] = response.data.id;
                            this.$refs.upload.submit();
                        this.$notify({
                            title: '上传成功',
                            message: '此页面将跳转到-媒介列表',
                            type: 'success'
                        });
                        let _this = this;
                        setTimeout(function(){
                            _this.$router.push({ name: 'MediaList' });
                        }, 1000);
                    }). catch(err => {this.$message.error('获取失败');});
                },
                judge(){
                        if(this.formData[0].agent_company != ""&&
                            this.formData[0].contract_no != ""&&
                                this.linrType != 0 &&
                            this.formData[0].contract_start  != ""){
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
                        if( this.formData[0].contract_end != ''){
                            this.formData[0].contract_end = moment(this.formData[0].contract_end).format('YYYY-MM-DD');
                        }
                        for(let n = 0;n< this.formLine.length;n++){
                            if(this.formLine[n].close  == true){
                                this.formData[0].fandian.push( this.formLine[n].fandian);
                                this.formData[0].product_line.push(this.formLine[n].line);
                            }
                        };
                        this.disabledPull = true;
                        this.contract_addru_new(this.formData[0])
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
            if(this.$route.query.htId){
                this.contract_no_num();
            }
            this.xishouNmae = this.user.name;
            this.contract_add_new();
            this.contract_num();
        },
        methods: {
            is_jstype_change(index){
                this.formData[0].is_jstype = index;
            },
//点击添加产品线
            addTable(){
                if(this.fandianText != "" && this.line != ""){
                    this.addLine.push({
                        name:this.lineName,
                        fandian:this.fandianText,
                        nameID: this.lineId,
                    });
                    this.linrType = 1;
                    this.judge()
                }else{
                    if(this.fandianText == "" ){
                        this.$message({
                            message: this.$t('titles.fandian')+'不可为空',
                            type: 'warning'
                        });
                    }else   if(this.line == "" ){
                        this.$message({
                            message: '请选择产品线',
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: '产品线,'+ this.$t('titles.fandian') +'不能为空',
                            type: 'warning'
                        });
                    }

                }

            },
            searchAccomplish(index){
                    let reg = /^[\u4E00-\u9FA5]+$/;
                this.lineName = index.name;
                  this.lineId = index.id;
            },
            deleteTd(key){
                this.addLine.splice(key, 1);
                if(this.addLine.length>0){
                    this.linrType = 1;
                }else{
                    this.linrType = 0;
                }
                this.judge()
            },
//点击添加产品线修改
            addbut(val){
                if(val.line == ""){
                    this.$message({
                        message: '请选择产品线',
                        type: 'warning'
                    });
                }else if(val.fandian == ""){
                    this.$message({
                        message: this.$t('titles.fandian')+'不可为空',
                        type: 'warning'
                    });
                }else {
                    val.close = true;
                    this.formLine.push({
                        line:'',
                        fandian:'',
                        close:false,
                    });
                    this.linrType = 1;
                    this.judge()
                }

            },
            closebtn(val,key){
                this.formLine.splice(key,1);
                for(let n = 0;n< this.formLine.length;n++){
                    if(this.formLine[n].close  == true){
                        this.linrType = 1;
                        break;
                    }else{
                        this.linrType = 0
                    }
                }
                this.judge()
            },
//==========================================================================
            inputTetx(){},
            agent_companyChange(index){
                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].agent_company = this.agent_companyOptions[index].id;
                    if(this.$route.query.htId){
                        this.formData[0].contract_no = this.NewId;
                    }else{
                        this.formData[0].contract_no = this.agent_companyOptions[index].title +'_'+ this.user.id +'_'+ moment().format('YYYYMMDD')+ this.meitiNum;
                    }
                    this.judge()
                }

            },
            judgeChange(){
                this.judge()
            },
            payment_typeChange(index){
                if(index == 1){
                    this.formData[0].zhouqi = '0';
                    this.show_zhouqi = false;
                }else{
                    this.show_zhouqi = true;
                }
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
                data = '提交后不可更改，是否继续?';
                this.tan(data)
            },
            Reset(){
                this.formData = [
                    {
                        "advertiser":"",     //公司id
                        "submituser":"",	//提交人
                        "market":"",		//销售id
                        "agent_company":"",   // 代理公司 id
                        "contract_no":"", //合同编号LZAD_16_201711801
                        "appname":"",
                        "contract_start": moment().format('YYYY-MM-DD'),   //合同开始时间
                        "contract_end":"",	// 合同结束时间
                        "payment_type":"1",	//	 付款方式
                        "zhouqi":0,			// 周期
                        "fandian":[],
                        'product_line':[],
                        "is_jstype":0,		// 结算方式 0普通方式  1按消耗
                        "note":" "		// 备注
                    }
                ];
                this.is_jstype = 0;
                this.agent_company = '';
                this.addLine = [];
                this.line = '';
                this.fandianText = '';
                this.$refs.upload.clearFiles();
            },
            jumphetong(){
                this.$router.go(-1)
            },
            jumpConsole(){
                this.$router.push({ name: 'console',query: { type:1} });
            },
 //======================================================================上传文件======================================
            beforeAvatarUpload(file) {
//                if(file.type !='application/pdf' ){
//                    this.$message.error('只能上传Excel文件!');
//                    return false;
//                }

            },
            handleChange(file) {

            },
            remove(){
            },
            progress(){

            },
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
