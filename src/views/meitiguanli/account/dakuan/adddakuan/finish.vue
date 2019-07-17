<template>
    <el-row class="finish">
        <el-col :span="20" >
            <el-col :span="24" >
                <el-col :span="24" class="header">
                    <el-col :span="24" >
                        <span class="title"></span>
                        打款基本信息
                    </el-col>
                </el-col>
                <el-col :span="24" class="cusmessage"  >
                    <el-col :span="12"  style="font-weight: 600;font-size: 14px">
                        <span class="name">实付金额 :</span>
                        {{affer.b_money | currency('')}}
                    </el-col>

                    <el-col :span="12">
                        <span class="name">付款类型 :</span>
                        <el-radio-group v-model="affer.ftype" size="mini" >
                            <el-radio :label="1">实时付</el-radio>
                            <el-radio :label="2">周欺付</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-col>
                <el-col :span="24" class="cusmessage"  >
                    <el-col :span="12">
                        <span class="name">应付金额 :</span>
                        {{affer.dk_money | currency('')}}
                    </el-col>
                    <el-col :span="12">
                        <span class="name">打款日期:</span>
                        <el-date-picker
                                :clearable='false'
                                v-model="ptime"
                                type="date"
                                size="mini"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-col>

                </el-col>
                <el-col :span="24" class="cusmessage" >
                    <el-col :span="12">
                        <span class="name">抵扣金额:</span>
                        -{{affer.dikou_money | currency('')}}
                    </el-col>
                    <el-col :span="12">
                        <span class="name">打款主体:</span>
                        <el-select  size="mini" v-model="affer.b_company" placeholder="请选择" filterable>
                            <el-option

                                    v-for="(item,key) in AgentCompany"
                                    :key="item.id"
                                    :label="item.companyname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
                <el-col :span="12" >
                    <el-col :span="24" class="header">
                        <el-col :span="24" >
                            <span class="title"></span>
                            上传附件
                        </el-col>
                    </el-col>
                    <el-col :span="24" style="margin-top: 10px;padding: 0">
                        <div class="upload">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    ref="upload"
                                    list-type="picture"
                                    name="File[imageFiles][]"
                                    action="/api/file/addfile"
                                    :data="dataObj"
                                    :file-list="fileList"
                                    :auto-upload="false"
                                    multiple>
                                <el-button slot="trigger" style="width: 80px;" size="small" type="primary">选取文件</el-button>
                            </el-upload>
                        </div>
                    </el-col>
                </el-col>

                <el-col :span="12"  >
                    <el-col :span="24" class="header">
                        <el-col :span="24"  >
                            <span class="title"></span>
                            备注信息
                        </el-col>
                    </el-col>
                    <el-col :span="24" style="margin-top: 10px;padding: 0">
                            <el-input type="textarea"   :rows="2" placeholder="请填写备注"  v-model="affer.note"></el-input>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="24" style="text-align: center;margin-top: 30px;">
                <el-button type="primary" size="small" @click="back_deduction">上一步</el-button>
                <el-button type="primary" size="small" @click="submiter" :disabled="dis">提交</el-button>
            </el-col>
        </el-col>
    </el-row>

</template>

<script>
    /*eslint-disable */
    import { meijie_dakuan_add_ru} from '@/api/meitiaccount';
    import {mapGetters} from 'vuex';
    import moment from "moment"
    export default {
        name: 'dashboard',

        data() {
            return {
                dikou_data:[],
                dakuan:[],
                dikou:[],
                heji:0,
                ptime:moment().format('YYYY-MM-DD'),
                affer:{
                    amount:'',
                    dakuan_type:1,
                    advertiser:'',
                    submituser:'',
                    dk_money:0,
                    dikou_money:0,
                    b_money:'0',
                    b_company:'',
                    b_time:'',
                    tk_type:[],
                    ftype:1,
                    note:'',
                    renew_idin:[],
                },
                AgentCompany:[],
                dataObj:{
                    'File[yid]':'',
                    'File[type]':33,
                },
                dis:false,
                fileList:[],
                meijie_dakuan_add_ru(){
                    meijie_dakuan_add_ru(this.affer).then(response => {
                        this.dataObj['File[yid]'] =  response.data.id;
                        this.dataObj['File[type]'] = 33;
                        this.$refs.upload.submit();
                        this.$message('提交成功');
                        this.success();
                    }).catch(error => {

                    });
                },
                success() {
                    this.$notify({
                        title: '上传成功',
                        message: '此页面将跳转到--客户控制台',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'mediaConsole'  ,query: { type:1} });
                    }, 500);
                },
                pull_dakuan() {
                    this.$confirm('是否上传文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.heji = 0;
                        let renew_idin=[];
                        let fk_money = [];
                        let tukuan_idin = [];
                        let tk_money = [];
                        let tk_type = [];
                        let _this = this;
                       this.dakuan.filter(function (item, i) {
                            if(item.Tablechecked == true){
                                _this.heji+=Number(item.dikou_money);
                                renew_idin.push(item.id);
                                fk_money.push(item.dikou_money);
                            }
                        });
                        this.dikou.filter(function (item, i) {
                            if(item.Tablechecked == true){
                                tukuan_idin.push(item.id);
                                tk_money.push(item.dikou_money);
                                tk_type.push(item.type);
                            }
                            return item
                        });
                        this.affer.tk_type=tk_type;
                        this.affer.b_time=moment(this.ptime).format('YYYY-MM-DD');
                        this.affer.advertiser=this.$route.query.id;
                        this.affer.renew_idin=renew_idin;
                        this.affer.fk_money=fk_money;
                        this.affer.tukuan_idin=tukuan_idin;
                        this.affer.tk_money=tk_money;
                        this.affer.submituser=this.user.id;
                        this.affer.amount = this.heji;
                        this.meijie_dakuan_add_ru();
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消上传'
                            });
                    });
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
        },
        methods: {
            finishData(val,val1,val2){
                this.dikou_data = val1;
                this.AgentCompany = val1.dakuan.meiti;
                this.dakuan = val1.dakuan.dakuan;
                this.dikou = val2.dikou.dikou;
                this.affer.dk_money = val2.dikou.dakuan_heji;
                this.affer.dikou_money = val2.dikou.backMoney_heji;
                this.affer.b_money = val2.dikou.dakuan_heji  - val2.dikou.backMoney_heji ;
            },

            // 提交
            submiter(){
                if( this.affer.b_money<0){
                    this.$message('应付打款不能小于0');
                }else if(this.affer.b_company==''){
                    this.$message('打款主体不能为空');
                }else if(this.ptime=='' || this.ptime=='Invalid date'){
                    this.$message('时间不能为空');
                }else{
                    this.pull_dakuan()
                }

            },

            back_deduction(){
                this.$emit('steps',this.dikou_data);
            },

        },
        created() {


        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">

    .finish {
        .header{
            height: 30px;
            line-height: 30px;
            color: #222f3b;
            font-size: 12px;
            padding: 0;
            .title{
                display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;
            }
        }
        .box {
            margin-top: 20px;
        }

        .cusmessage{
            height: 40px;
            font-size: 12px;
            line-height: 40px;
            padding-left: 30px;
            .name{
                display: inline-block;
                width: 80px;
            }
        }
        .el-upload-dragger{
            height: 60px;
            line-height: 60px;
        }
    }

</style>
