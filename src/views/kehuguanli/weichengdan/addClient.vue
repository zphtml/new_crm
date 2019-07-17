<template>
    <div class="kebaoList" >
        <el-row class="kebaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpKebaoList">客保系统</span>><span>新建客户</span>
            </p>
            <el-col :span="24" class="xiadanInforBox" >
                <el-col :span="24"  class="xiadanInfor">
                    <el-col :span="24" class="Infor_top">
                        <el-col :span="12" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">客户基本信息 &nbsp;&nbsp;( <i style="color: red;font-size: 14px">*</i> 为必填项,不能为空)</span>
                            </div>
                            <el-col :span="24" class="Infor_top">
                                <el-col :span="12">
                                    <div class="inputInfor">
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i> {{ $t('titles.customer') }}</span>
                                            <el-input v-model="advertiser " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i> {{ $t('titles.Addcustomers') }}</span>
                                            <el-input v-model="true_advertiser " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title" > <i class="important">*</i>简称</span>
                                            <el-input v-model="appname " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>公司官网</span>
                                            <el-input v-model="website " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">客户类型</span>
                                            <el-select v-model="type" size="mini" placeholder="请选择">
                                                <el-option
                                                        v-for="(item,index) in typeoptions"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">所属行业</span>
                                            <el-select v-model="industry " size="mini" placeholder="请选择">
                                                <el-option
                                                        v-for="(item,index) in industryoption"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">所属省</span>
                                            <el-select v-model="city" size="mini" placeholder="请选择">
                                                <el-option
                                                        v-for="(item,index) in cityoption"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">公司地址</span>
                                            <el-input v-model="site" size="mini" class="inputNum" placeholder="请输入内容"></el-input>
                                        </div>
                                    </div>
                                </el-col>
                            </el-col>
                        </el-col>
                        <el-col :span="12" class="xufeiInfor">
                            <div class="hetongInfor">
                                <span class="listStyle"></span>
                                <span class="listText">联系人信息 &nbsp;&nbsp;( <i style="color: red;font-size: 14px">*</i> 为必填项,不能为空)</span>
                            </div>
                            <el-col :span="24" class="Infor_top">
                                <el-col :span="12">
                                    <div class="inputInfor">
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>联系人</span>
                                            <el-input v-model="name " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>

                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>邮箱</span>
                                            <el-input v-model="email " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> <i class="important">*</i>职位</span>
                                            <el-input v-model="position " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title"> 联系电话</span>
                                            <el-input v-model="tel " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx_a"></el-input>
                                        </div>
                                        <div class="infor_a">
                                            <span class="title">微信/QQ</span>
                                            <el-input v-model="qq " size="mini" class="inputNum" placeholder="请输入内容"  v-on:input="inputTetx_a"></el-input>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="20">
                                    <p style="margin-top: 20px;text-align: right;color: rgb(196, 196, 196);">
                                       注： 联系电话和微信/QQ可任选一项
                                    </p>
                                </el-col>
                            </el-col>
                            <el-col :span="18" class="foot_btn">
                                <el-button type="primary" @click="pull" :disabled=disabled>提交</el-button>
                                <el-button class="reset">重置</el-button>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-col>

            </el-col>

        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import {kebao_is_conflict,Addcustomerbs} from '@/api/kehu';

    import moment from "moment"
    export default {

        data() {
            return {
                advertiser:'',
                appname :'',
                true_advertiser:'',
                type:'企业',
                website:'http://www.',
                industry:'APP/教育学习',
                city:'北京市',
                email:	'',
                name:	'',
                position:'',
                qq:	'',
                tel:''	,
                showName:"",
                cityoption:[
                    {
                    name:' 北京市'
                    },
                    {
                    name:'天津市'
                    },
                    {
                    name:'上海市'
                    },
                    {
                    name:'重庆市'
                    },
                    {
                    name:'河北省'
                    },
                    {
                    name:'河南省'
                    },
                    {
                    name:'云南省'
                    },
                    {
                    name:'辽宁省'  },
                    {
                    name:'黑龙江省'   },
                    {
                    name:'湖南省 '  },
                    {
                    name:'安徽省 '  },
                    {
                    name:'山东省 '  },
                    {
                    name:'新疆维吾尔'   },
                    {
                    name:'江苏省'   },
                    {
                    name:'浙江省 '  },
                    {
                    name:'江西省'   },
                    {
                    name:'湖北省'  },
                    {
                    name:'广西壮族'   },
                    {
                    name:'甘肃省 '  },
                    {
                    name:'山西省 '  },
                    {
                    name:'内蒙古 '  },
                    {
                    name:'陕西省'   },
                    {
                    name:'吉林省' },
                    {
                    name:'福建省'  },
                    {
                    name:'贵州省'  },
                    {
                    name:'广东省'   },
                    {
                    name:'青海省'   },
                    {
                    name:'西藏'  },
                    {
                    name:'四川省'   },
                    {
                    name:'宁夏回族'   },
                    {
                    name:'海南省'   },
                    {
                    name:'台湾省'  },
                    {
                    name:'香港特别行政区'  },
                    {
                    name:'澳门特别行政区'
                    }],
                industryoption:[
                    {
                    name: "APP/教育学习"
                },{
                   name: "APP/系统工具"
                },{
                   name: "APP/旅游出行" },{
                   name: "APP/网络购物" },{
                   name: "APP/金融理财" },{
                   name: "APP/拍摄影音" },{
                   name: "APP/社交通讯" },{
                   name: "APP/健康医疗" },{
                   name: "APP/新闻阅读" },{
                   name: "APP/生活服务" },{
                   name: "APP/资讯阅读" },{
                   name: "APP/游戏" },{
                   name: "APP/平台直播" },{

                   name: "本地信息" },{
                   name: "旅游住宿" },{
                   name: "电商" },{
                   name: "资讯" },{
                   name: "社交" },{
                   name: "商务服务" },{
                   name: "金融服务" },{
                   name: "彩票" },{
                   name: "游戏" },{
                   name: "教育培训" },{
                   name: "车辆物流" },{
                   name: "房地产建筑装修" },{
                   name: "家庭日用品" },{
                   name: "软件" },{
                   name: "网络服务" },{
                   name: "成人用品" },{
                   name: "箱包饰品" },{
                   name: "医疗服务" },{
                   name: "智能制造"},{
                   name: "食品保健品"},{
                   name: "通讯服务设备"},{
                   name: "生活服务"},{
                   name: "电子电工"},{
                   name: "机械设备"},{
                   name: "化工原料制品"},{
                   name: "安全安保"},{
                   name: "办公文教"},{
                   name: "出版传媒"},{
                   name: "电脑硬件"},{
                   name: "服装鞋帽"},{
                   name: "家用电器"},{
                   name: "节能环保"},{
                   name: "礼品"},{
                   name: "美容化妆"},{
                   name: "农林牧渔"},{
                   name: "手机数码"},{
                   name: "运动休闲娱乐"},{
                   name: "学术公管社会组织"},{
                   name: "国际组织"},{
                   name: "其他"}],
                typeoptions:[
                    {
                    name:'企业'
                },{
                    name:'个人'
                }],
                site:"",
                kebao_is_conflict:function(data,name,kehu_name,advertiser_name){
                    kebao_is_conflict({
                        url:data,
                        name:name,
                        advertiser:kehu_name,
                        true_advertiser:advertiser_name,
                    }).then(response => {
                        if(response.count == 0){
                            this.tanInfor()
                        }else{
                            this.open()
                        }

                    }).catch(err => {

                    });
                },
                Addcustomerbs:function(data){
                    Addcustomerbs({
                        data:data,
                    }).then(response => {
                            this.$notify({
                                title: '上传成功',
                                message: '此页面将跳转到--客保系统',
                                type: 'success'
                            });
                            let _this = this;
                            _this.$router.push({ name: 'CustomerSupportSystem' });
                        this.disabled = true;
                    }).catch(err => {
                        this.disabled = false;
                    });
                },
                open() {
                    this.$notify({
                        title: '警告',
                        message: '提交信息与数据库重复，请重新输入公司',
                        type: 'warning'
                    });
                },
                tanInfor(id) {
                    this.$confirm('确认新建此客户，将不可恢复, 是否继续?','新建客户' , {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.disabled = true;
                        this.$message({
                            type: 'success',
                            message: '新建成功!'

                        });
                        this.disabled = true;
                        let type= '';
                        if(this.type == "企业"){
                            type = 1;
                        }else{
                            type = 2;
                        }
                        let data = {
                            advertiser:this.advertiser,
                            true_advertiser:this.true_advertiser,
                            appname:this.appname,
                            type:type,
                            website:this.website,
                            industry:this.industry,
                            site:this.site,
                            audit:1,
                            ytime:0,
                            email:	this.email,
                            name:this.name,
                            position:	this.position,
                            qq:this.qq,
                            tel:this.tel,
                            submituser:this.user.id,
                        };
                            this.Addcustomerbs(data)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消新建'
                        });
                    });
                },
                disabled:true,
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

        },
        methods: {
            jumpKebaoList(){
                this.$router.push({ name:'CustomerSupportSystem'});
            },
            inputTetx_a(){
                if(this.tel !="" || this.qq !="" ){
                    this.showName = 1;
                    this.inputTetx()
                }else{
                    this.showName = "";
                    this.inputTetx()
                }
            },
            inputTetx(){
                if(this.advertiser != "" && this.appname != "" && this.website !="" && this.true_advertiser !="" && this.name !="" && this.email !="" && this.position !="" && this.showName !="" ){
                        this.disabled = false;
                }else{
                    this.disabled = true;
                }
            },
            pull(){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                let phone = /^1[3|4|6|5|7|8][0-9]{9}$/;
                if(!reg.test(this.email)){
                    this.$message({
                        message: '请输入正确邮箱',
                        type: 'warning'
                    });
                }else if(this.tel !=""){
                    if(!phone.test(this.tel)){
                        this.$message({
                            message: '请输入正确手机号',
                            type: 'warning'
                        });
                    }else{
                        this.kebao_is_conflict(this.website,this.appname,this.advertiser,this.true_advertiser)
                    }
                }else{
                    this.kebao_is_conflict(this.website,this.appname,this.advertiser,this.true_advertiser)
                }
            },
        },
        created() {

        },
        filters:{

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .kebaoList {
        width:100%;
        .kebaoBox {
            .xiadanInforBox {
                margin-top: 10px;
                .xiadanInfor{
                    .Infor_top {
                        margin-bottom: 20px;
                    }
                    .hetongInfor {
                        height:30px;
                        line-height: 30px;
                        font-size: 12px;
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
                            .infor_a {
                                padding:0 20px;
                                margin-top: 10px;
                                min-width: 460px;
                                .el-select,.el-date-editor,.inputNum {
                                    width:60%;
                                }
                                .el-textarea {
                                    width:60%;
                                    .el-textarea {
                                        height: 60px;
                                    }
                                }
                                .title{
                                    width: 95px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    text-align: right;
                                    margin-right: 20px;
                                    color: #9C9C9C;
                                    position: relative;
                                    .important {
                                        position: absolute;
                                        color: red;
                                        font-size: 20px;
                                        left: 0px;
                                        top: 0;
                                        bottom: 0;
                                        margin: auto;
                                        display: inline-block;
                                    }
                                }
                                .title_top{
                                    width: 70px;
                                    display: inline-block;
                                    vertical-align: top;
                                }
                                .upload {
                                    width:80%;
                                    height: 60px;
                                    text-align: center;
                                    display: inline-block;
                                    border:1px solid #e6e6e6;
                                    line-height: 60px;
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
                                            width:80%;
                                            margin:0 auto;
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
                    }
                }
            }
            .foot_btn {
                text-align: right;
                margin-top: 150px;
                min-width: 460px;
                padding-right: 14%;
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

</style>
