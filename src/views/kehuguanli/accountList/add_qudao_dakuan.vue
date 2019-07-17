<template>
    <div class="qd_dakuanForm ku_addBox" >
        <el-row class="xufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpxieyiList">协议列表</span>><span  @click="jump_xy_infor">协议详情</span>><span>渠道打款</span>
            </p>
            <el-col :span="24" class="consoleTitle"  v-for="(data,index) in dataInfor" :key="index">
                <span class="corporateName">{{ data.advertiser0.advertiser }}-渠道打款</span>
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
                                        金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" v-model="data.b_money" placeholder="请输入内容" style="width: 170px"  v-on:input="moneyChange">
                                            <template slot="append">元</template>
                                        </el-input>
                                        <span>税点：{{ data.shuidian }}%</span>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        实际金额
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText inputTextColor" v-model="data.sj_money" placeholder="自动计算" :disabled="true" v-on:input="judgeData">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        汇款人
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText inputTextColor" v-model="data.huikuanren" v-on:input="judgeData"></el-input>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title">
                                        打款主体
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="account" filterable placeholder="请选择" @change="changeaccount">
                                            <el-option
                                                    v-for="(item,key) in accountOptions"
                                                    :key="key"
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
                            <div style="border: 1px dashed #499fe2;padding: 5px 0;">
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            收款人
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText inputTextColor" v-model="data.shoukuanren" v-on:input="judgeData"></el-input>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            收款开户行
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText inputTextColor" v-model="data.kaihuhang" v-on:input="judgeData"></el-input>
                                        </el-col>
                                    </el-col>
                                </div>
                                <div style="height: 30px;margin-bottom: 5px;">
                                    <el-col :span="24"  class="infor_a">
                                        <el-col :span="4" class="title">
                                            收款账号
                                        </el-col>
                                        <el-col :span="20" class="input_search">
                                            <el-input class="inputText inputTextColor" v-model="data.zhanghu" v-on:input="judgeData"></el-input>
                                        </el-col>
                                    </el-col>
                                </div>
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
                            <span class="listText">历史记录</span>
                        </div>
                        <div class="TableBox">
                           <div class="tableHead">
                               <div class="tr">收款人</div>
                               <div class="tr"> 开户行</div>
                               <div class="tr">账号</div>
                               <div class="tr">操作</div>
                           </div>
                            <div class="tablebody" v-for="(data,index) in dakuanTable" :key="index">
                                <div class="tr">{{ data.shoukuanren }}</div>
                                <div class="tr">{{ data.kaihuhang }}</div>
                                <div class="tr">{{ data.zhanghu }}</div>
                                <div class="tr">  <span class="addbutton" @click="add_zh(data)">使用</span></div>
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
    import { add_qddakuan,add_qddakuan_ru} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let appname = '';
    export default {
        data() {
            return {
                routeId:'',
                contract_money: 0, //合同余额
                dataInfor:[],
                formData:[{
                    "contract_id":"",//合同
                    "submituser":"",//提交人id
                    "advertiser":"",//公司id
                    "b_money":"",
                    "b_company":"",
                    "b_time": moment().format('YYYY-MM-DD'),
                    "huikuanren":"",
                    "shoukuanren":"",
                    "kaihuhang":"",
                    "zhanghu":"",
                    "note":"",
                    'shuidian':'',
                    "sj_money":"",

                }],
                dakuanTable:[],
                fenqiData:{},
                fk_type:0,
                dateShow:true,
                indexNum:0,
                fileList:[],
                account:'',
                accountOptions:[],
                fukuanValue:'',
                lookFandian:'',
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1001,
                },
                returned:0,
                form: [],
                fukuanOptions:[
                    {
                    name:'预付',
                    id:'1'
                },{
                    name:'垫付',
                    id:'2'
                }],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                add_qddakuan(id){
                    add_qddakuan({
                        id:this.routeId,
                    }).then(response => {
                        this.formData[0].contract_id = response.contractinfo.rencontract.contract_id;
                       this.formData[0].submituser = this.user.id;
                        this.formData[0].advertiser = response.contractinfo.advertiser;
                        this.formData[0].shuidian = response.contractinfo.qd_shuidian;
                        this.accountOptions = response.agentCompany;
                        this.dataInfor = [];
                        this.dataInfor.push(response.contractinfo);
                        this.dakuanTable = response.zuijin;
                    }).catch(err => {});
                },
                judge(){
                    if(this.formData[0].b_money != ""&& this.formData[0].b_company != ""&& this.formData[0].huikuanren != ""&& this.formData[0].shoukuanren != "" && this.formData[0].kaihuhang != "" && this.formData[0].zhanghu != ""){
                        this.disabledPull = false;
                    }else{
                        this.disabledPull = true;
                    }
                },
                add_qddakuan_ru(val){
                    add_qddakuan_ru({
                        data:val,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.disabledPull = true;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 1001;
                            let _this = this;
                            this.$refs.upload.submit();

                            this.success()
                        }else{
                            this.disabledPull = false;
                            this.$message({
                                message: response.msg,
                                type: 'warning'
                            });
                        }

                    }).catch(err => {});
                },
                disabledPull:true,
                tan(data) {

                    this.$confirm(data, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabledPull = true;
                        this.formData[0].b_time = moment(this.formData[0].b_time).format('YYYY-MM-DD');
                      this.add_qddakuan_ru(this.formData[0]);

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
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
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.add_qddakuan();
        },
        methods: {
            add_zh(val){
                this.formData[0].shoukuanren = val.shoukuanren;
                this.formData[0].kaihuhang = val.kaihuhang;
                this.formData[0].zhanghu = val.zhanghu;
                this.judge();
            },
            fandianData()   {
                if(this.fk_type == 0){
                    this.judge();
                    this.formData[0].show_money = (Number(this.formData[0].money)*(1+(Number(this.formData[0].rebates_proportion)/100))).toFixed(2);
                    if(this.returned != 0){
                        let num = this.formData[0].money/this.returned;
                        let Snum = this.formData[0].show_money/this.returned;
                        for(var i = 0;i<this.returned;i++){
                            this.form[i].money = num.toFixed(2);
                            this.form[i].show_money = Snum.toFixed(2);
                        }
                    }
                }else{
                    this.judge();
                    if(this.returned != 0){
                        let num = this.formData[0].money/this.returned;
                        let Snum = this.formData[0].show_money/this.returned;
                        for(var i = 0;i<this.returned;i++){
                            this.form[i].money = num.toFixed(2);
                            this.form[i].show_money = Snum.toFixed(2);
                        }
                    }
                }

            },
            changeaccount(index){

                let reg = /^[\u4E00-\u9FA5]+$/;
                if(!reg.test(index)) {
                    this.formData[0].b_company = this.accountOptions[index].id;
                }
                this.judge();
            },
            fukuanchange(index){
                this.formData[0].payment_type = index;
                this.judge()
            },
            moneyChange(){
                this.formData[0].sj_money =   (Number(this.formData[0].b_money)/(100+Number(this.formData[0].shuidian))*100).toFixed(2);
                this.judge()
            },
            judgeData(){
                this.judge()
            },
            //筛选
            changeFenqi(index){
                this.form = [];
                this.indexNum = index;
                if(index == '0'){
                    this.form = [];
                    this.dateShow = true;
                }else{
                    this.dateShow = false;
                    for(var i = 0;i<index;i++){
                        this.form.push({
                            money:(this.formData[0].money/this.returned).toFixed(2),
                            show_money:(this.formData[0].show_money/this.returned).toFixed(2),
                            payment_time:'',
                        })
                    }
                }
                this.judge();
            },
            fenqiDate(val){
                if(val == 0){

                    for(var i = 0;i<this.form.length;i++){
                        this.form[i].payment_time = moment(this.form[0].payment_time).add(i, 'months').format('YYYY-MM-DD')
                    }
                }
                this.judge();
            },
            //提交
            pullData(){
                let data = data = '提交后不可更改，是否继续?';
              this.tan(data)
            },
            //上传成功
            handleAvatarSuccess(){
                this.success();
            },
            //重置
            reset(){
                this.formData = [{
                    "contract_id":"",//合同
                    "submituser":"",//提交人id
                    "advertiser":"",//公司id
                    "b_money":"",
                    "b_company":"",
                    "b_time": moment().format('YYYY-MM-DD'),
                    "huikuanren":"",
                    "shoukuanren":"",
                    "kaihuhang":"",
                    "zhanghu":"",
                    "note":""
                }];

                this.$refs.upload.clearFiles();
          },
//跳转
            jumpxieyiList(){
                this.$router.push({ name: 'ProtocolList' });
            },
            jump_xy_infor(){
                this.$router.push({ name: 'agreementDetails' , query: { id:this.routeId}});
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
        created() {

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/addform.scss";
    .qd_dakuanForm {
        .inputTextColor {
            .el-input-group__append {
                background:#f5f7f9 !important;
                color: black;
            }
        }
    }


    .qd_dakuanForm {
        .xufeiBox{
            .consoleTitle{
                margin:10px 0;
                .corporateName {
                    font-size: 22px;
                }
                .appInfotBox {
                    height: 30px;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 30px;
                    .appInfor {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        text-align: center;
                        line-height: 20px;
                        font-size: 12px;
                        border-radius: 50%;
                        margin:0 100px 0 0px ;
                    }
                    .appInfor.qu{
                        color: white;
                        background: #FF8754;
                    }
                    .appInfor.zhi{
                        color: white;
                        background: #3F7FFC;
                    }
                }

                .name {
                    height:30px;
                    line-height: 30px;
                    font-size: 12px;
                    display: inline-block;
                    margin: 0;
                    vertical-align: top;
                    position: relative;
                    .hoverTishi {
                        width:225px;
                        height:20px;
                        line-height: 20px;
                        display: inline-block;
                        background: #cfc6c6;
                        position: absolute;
                        top:-20px;
                        margin:0;
                        .color{
                            color: #54adff;
                            cursor: pointer;
                        }
                    }
                    .show {
                        -webkit-transition:opacity 1s;
                        opacity:0;
                        pointer-events:auto;
                    }
                    .chaxun {
                        width:14px;
                        height:14px;
                        line-height: 15px;
                        text-align: center;
                        font-size: 12px;
                        display: inline-block;
                        border-radius: 50%;
                        color: white;
                        background: #bbbbbb;
                        cursor: pointer;
                    }
                    .chaxun:hover  .hoverTishi{
                        display: none;
                    }
                    .nameColor {
                        color: #9C9C9C;
                    }
                    .lastName {
                        margin-left: 10px;
                    }
                }
            }
            .xufeiInforBox {
                margin-top: 10px;
                .xiadanInfor{
                    min-width: 560px;
                    .Infor_bottom {
                        margin-bottom: 20px;
                    }
                    .hetongInfor {
                        height:30px;
                        line-height: 30px;
                        font-size: 12px;
                        border-bottom:1px solid #e6e6e6;
                        .listStyle{
                            width:8px;
                            height:8px;
                            display: inline-block;
                            background: #000;
                            border-radius: 50%;
                        }
                        .listText {
                            margin-left: 10px;
                        }
                    }
                    .inforTitle {
                        font-size: 12px;
                        .el-col {
                            padding-left: 20px;
                            .inforBox {
                                margin-top:20px;
                            }
                            .title {
                                margin-right: 20px;
                            }
                        }
                    }
                    .xufeiInfor {
                        padding-right: 50px;
                    }
                    .xufeiInfor,.fukuanInfor {
                        font-size: 12px;
                        .inputInfor {
                            .dakuanTable {
                                 thead th,  thead th > .cell{
                                    background: white !important;
                                }
                            }
                            .infor_a {
                                padding:0 20px;
                                margin-top: 18px;
                                .el-select,.inputText {
                                    width:80%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                        font-size: 12px;
                                    }
                                }
                                .el-date-editor{
                                    width:50%;
                                    height:30px;
                                    input{
                                        height:29px!important;
                                    }
                                }
                                .el-textarea {
                                    width:80%;
                                    .el-textarea {
                                        height: 60px;
                                    }
                                }
                                .title{
                                    width: 60px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    position: relative;
                                    color: #9C9C9C;
                                    .important {
                                        position: absolute;
                                        left:-10px;
                                        font-size: 14px;
                                        color: red;
                                    }
                                }
                                .inputBox{
                                    display: inline-block;
                                    width:80%;
                                    height: 30px;
                                    vertical-align: middle;
                                    .fenqiInput {
                                        padding:0 5px;
                                        .el-date-editor {
                                            width:100%;
                                        }
                                        input{
                                            width:100%;
                                            height:29px!important;
                                            border-radius: 0;
                                            font-size: 12px;
                                        }
                                    }
                                }
                                .el-radio__input {
                                    .el-radio__inner {
                                        border-color: #bfcbd9;
                                        background: none;
                                        border-radius: 0;
                                        width: 15px;
                                        height: 15px;
                                    }
                                }
                                .el-radio__label {
                                    color: #000;
                                    font-weight:normal;
                                    font-size: 12px;
                                }
                                .is-checked {
                                    .el-radio__inner::after {
                                        content: '';
                                        width: 9px;
                                        height: 5px;
                                        position: absolute;
                                        top: 3px;
                                        left: 3px;
                                        border: 3px solid #bbbbbb;
                                        border-top: none;
                                        border-right: none;
                                        background: transparent;
                                        border-radius: 0;
                                        filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                        /* opacity: 0; */
                                        -moz-transform: rotate(-45deg);
                                        -ms-transform: rotate(-45deg);
                                        -webkit-transform: rotate(-45deg);
                                        transform: rotate(-45deg);
                                    }
                                }
                                .title_top{
                                    width: 60px;
                                    display: inline-block;
                                    vertical-align: top;
                                    color: #9C9C9C;
                                }
                                .upload {
                                    width:80%;
                                    height: 60px;
                                    text-align: center;
                                    display: inline-block;
                                    border:1px solid #e6e6e6;
                                    line-height: 60px;
                                    .upload-demo {
                                        width:100%;
                                        height:100%;
                                        .el-upload {
                                            width:100%;
                                            height:100%;
                                            .el-upload-dragger{
                                                width:100%;
                                                height:100%;
                                                border-radius: 0;
                                            }
                                        }
                                        .el-upload-list {
                                            margin-top: -25px;
                                        }
                                    }
                                    .el-button {
                                        color: #fff;
                                        background-color: #3B546B;
                                        border-color: #3B546B;
                                    }
                                }
                                .action {
                                    width:80%;
                                    display: inline-block;
                                    text-align: center;
                                    .actionDiv {
                                        display: inline-block;
                                        height:60px;
                                        text-align: center;
                                        vertical-align: top;
                                        span{
                                            display: inline-block;
                                            margin-bottom:10px;
                                        }
                                        .actionDiv_num {
                                            text-align: center;
                                            height:30px;
                                            line-height: 30px;
                                            width:100%;
                                            margin:0 auto;
                                            input{
                                                border: none;
                                                height:27px!important;
                                            ;
                                            }
                                        }
                                        .actionDiv_num_a {
                                            border: 1px solid #e6e6e6;
                                        }
                                        .actionDiv_num_b {
                                            border-top:1px solid #e6e6e6;
                                        }
                                    }
                                    .actionDiv_b{
                                        width:35%;
                                    }
                                    .actionDiv_a ,.actionDiv_c{
                                        width:29%;
                                    }
                                }
                            }

                        }

                    }
                    .fukuanInfor {
                        padding-left: 50px;
                        .vue-table{
                            border: 1px solid #bebbb5!important;
                            .el-table__empty-block {
                                height: 100px !important;
                                min-height: 100px !important;
                            }
                        }
                    }

                }
            }
            .foot_btn {
                text-align: right;
                margin-top: 20px;
                padding-right: 10%;
                button{
                    width:80px;
                    height:30px;
                    padding: 0;
                    line-height: 30px;
                    text-align: center;
                }
                .reset {
                    color: #54ADFF;
                    border: 1px solid #54ADFF;
                }
            }
        }
    }
    @media screen and (max-width: 1480px) {
        .qd_dakuanForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:85%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:90%;
                }
            }
        }
    }
    @media screen and (max-width: 1350px) {
        .qd_dakuanForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:85%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:95%;
                }
            }
        }
    }
    @media screen and (max-width: 1280px) {
        .qd_dakuanForm {
            .xufeiBox {
                .xufeiInforBox {
                    .xiadanInfor {
                        width:95%;
                        .xufeiInfor {
                            padding-right: 15px;
                        }
                        .fukuanInfor {
                            padding-left: 15px;
                        }
                    }
                }
                .foot_btn {
                    width:100%;
                }
            }
        }
    }
    @media screen and (max-width: 1020px) {
        .Infor_bottom {
            .el-col-12 {
                width: 70%;
            }
        }
    }


</style>
