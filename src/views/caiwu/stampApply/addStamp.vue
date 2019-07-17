<template>
    <div class="ku_addBox">
        <el-row class="addhuikuanBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span @click="jumpstampList">申请盖章列表</span>><span>添加申请 </span>
            </p>
            <el-col :span="24" class="kh_InforBox">
                <el-col :span="16" class="kh_left_box">
                    <el-col :span="24" class="topInfor"  v-for="(data,index) in formData"  :key="index">
                        <div class="titleInfor">
                            <span class="listStyle"></span>
                            <span class="listText">申请基本信息</span>
                        </div>
                        <div class="titleBox">

                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title" style="font-size: 16px;color:black">
                                        类型
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-select v-model="data.type" filterable placeholder="请选择"  >
                                            <el-option
                                                    v-for="(item,key) in stamp_typeOptions"
                                                    :key="key"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-col>
                            </div>
                            <div style="height: 30px;margin-bottom: 5px;">
                                <el-col :span="24"  class="infor_a">
                                    <el-col :span="4" class="title"  >
                                        公司
                                    </el-col>
                                    <el-col :span="20" class="input_search">
                                        <el-input class="inputText" type="text" v-model="data.advertiser" placeholder="请输入内容"  v-on:input="judgeData">
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
                                <span class="listText">备注信息
                                <span style="color: red">
                                    (必填)
                                </span>
                                </span>
                            </div>
                            <div class="inputInfor"  v-for="(data,index) in formData"  :key="index">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-on:input="judgeData"
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
    import {gaizhang_addru} from '@/api/money';
    import moment from "moment"

    export default {
        data() {
            return {
                dataInfor:[],
                textarea: '',
                formData: [{
                    "advertiser": "",
                    "submituser": "",
                    "type": 1,
                    "note": ""
                }],
                stamp_typeOptions:[{
                    name:'盖章',
                    id:1,
                }],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':10010,
                },
                b_company:'',
                b_companyOptions:[],

                disabledPull:true,

                //上传
                gaizhang_addru:function(val){
                    gaizhang_addru({
                        data:val
                    }).then(response => {
                        if(response.code == '200'){
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 10010;
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
                        message: '此页面将跳转到--盖章申请列表',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'stampList'   });
                    }, 500);
                },
                judge(){
                    if( this.formData[0].advertiser != "" && this.formData[0].note != "" ){
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
                        this.gaizhang_addru(this.formData[0])
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
            this.formData[0].submituser = this.user.id;
        },
        methods: {

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
            jumpstampList(){
                this.$router.push({name: 'stampList'});
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
