<template>
    <div class="advertiser" >
        <el-row class="customerBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">上一级</span>><span>广告主</span>
            </p>
            <el-col :span="24" class="customerTable ">
                <el-col :span="18">
                    <div class="leftBox">
                        <div class="title">
                            <div class="distributionButton">
                                <el-button type="primary" class="add_ggz" @click="add_ggz">添加广告主</el-button>
                            </div>
                        </div>
                            <el-table
                                     v-loading="listLoading"  border
                                    ref="singleTable"
                                    :data="customerTable"
                                    class="table"
                                    height="740"
                                    highlight-current-row
                                    @current-change="handleCurrentChange"
                                    @row-click="clickTr($event)"
                                    style="width: 100%">
                            <el-table-column
                                    label="广告主">
                                <template slot-scope="scope">
                                    {{scope.row.advertiser}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="简称">
                                <template slot-scope="scope">
                                    {{scope.row.advertiser_for_short  }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="联系人">
                                <template slot-scope="scope">
                                    {{scope.row.linkman   }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="联系电话">
                                <template slot-scope="scope">
                                    {{scope.row.tel }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="开户域名">
                                <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline">
                                       {{scope.row.url }}
                                </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="创建时间">
                                <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline">
                                       {{scope.row.ctime | ctimeData}}
                                </span>
                                </template>
                            </el-table-column>
                                <el-table-column
                                        :label="$t('titles.nick')">
                                    <template slot-scope="scope">
                                <span style="display: inline-block;min-width:25px;cursor: pointer;text-decoration: underline;font-size: 16px;color: #66b1ff;" @click="add_cp(scope.row.advertiser)">
                                     添加
                                </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        header-align="center"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <div style="text-align: center;">
                                            <img src="../../../assets/xq.png" style="width:20px;height:20px;cursor: pointer;"  @click.stop="ggz_infor(scope.row)" alt="">
                                            <span class="line"></span>
                                            <img src="../../../assets/pen.png" style="width:20px;height:20px;cursor: pointer;" @click.stop="xiugai(scope.row)"  alt="">
                                        </div>
                                    </template>
                                </el-table-column>

                        </el-table>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="rightBox" style="    margin-top: 40px;">
                        <el-col :span="24"  class="chanpin_box">
                            <el-col :span="24" class="chanpin_title">
                                <el-col :span="12"  class="title_left">
                                    {{ $t('titles.nick') }}
                                </el-col>
                                <el-col :span="12"  class="title_right">
                                    简称
                                </el-col>
                            </el-col>
                            <el-col :span="24" class="chanpin_body">
                                <el-col :span="24" class="box" v-for="(data,index) in product0" :key="index">
                                    <el-col :span="12"  class="title_left">
                                        {{ data.product }}
                                    </el-col>
                                    <el-col :span="12"  class="title_right">
                                        {{ data.product_short_name }}
                                    </el-col>
                                </el-col>

                            </el-col>
                        </el-col>

                    </div>
                </el-col>

            </el-col>
            <!--新增-->
            <el-dialog title="新增广告主" :visible.sync="tan_add_ggz"  @close="close_ggz" :close-on-click-modal="false" class="tan_Modify" >
                <el-form :label-position="labelPosition" label-width="120px" :model="addline">
                    <el-form-item label="广告主名称">
                        <el-input v-model="addline.advertiser" v-on:input ="linechange"  style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input v-model="addline.advertiser_for_short" v-on:input ="linechange" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="开户域名">
                        <el-input v-model="addline.url" v-on:input ="linechange" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="addline.linkman" v-on:input ="linechange" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="addline.tel" v-on:input ="linechange" style="width: 200px;"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_add_ggz" :disabled = pullshow >确 定</el-button>
                        <el-button @click="tan_add_ggz = false" >取 消</el-button>
			</span>
            </el-dialog>
            <!--新增-->
            <el-dialog title="新增产品"  :visible.sync="tan_add_cp"  :close-on-click-modal="false" @close="close_cp" class="tan_Modify" >
                <el-form :label-position="labelPosition" label-width="120px" :model="addline_cp">
                    <el-form-item label="广告主">
                        {{ggz_name}}
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <el-input v-model="addline_cp.product" v-on:input ="linechange_cp" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input v-model="addline_cp.product_short_name" v-on:input ="linechange_cp" style="width: 200px;"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_add_cp" :disabled = pullshow_cp >确 定</el-button>
                        <el-button @click="tan_add_cp = false" >取 消</el-button>
			</span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { customer_advertiser_list,customer_advertiser_addru,products ,advertiser_to_product} from '@/api/kehu';
    import moment from "moment"
    export default {
        data() {
            return {
                routeId:'',
                dataInfor : {
                    search:{},
                },
                ggz_name:'',
                search_input:'',
                screen:'',
                listLoading:true,
                customerTable:[],
                product0:[],
                //弹窗广告主
                tan_add_ggz:false,
                labelPosition: 'right',
                chanpinId:'',
                isCp:"",
                addline:{
                    "advertiser":"",
                    "customer_id":"",
                    "advertiser_for_short":"",
                    "ctime":moment().format('YYYY-MM-DD'),
                    "linkman":"",
                    "tel":"",
                    "url":"",
                },
                //弹窗 产品
                tan_add_cp:false,
                advertiserId:'',
                currentRow:[],
                addline_cp:{
                    "advertiser":"",
                    "product":"",
                    "product_short_name":""
                },
                customer_advertiser_list:function(){
                    customer_advertiser_list({
                        id:this.routeId,
                     }).then(response => {
                        this.customerTable = response.list;
                        this.listLoading = false;
                        let _this = this;
                        if(this.isCp  == 1){
                            this.chanpinId = response.list[response.list.length -1].id;
                            this.ggz_name=response.list[response.list.length -1].advertiser;
                            this.addline_cp.advertiser = response.list[response.list.length -1].id;
                        }else{
                            this.chanpinId = response.list[0].id;

                        }
                        this.advertiser_to_product();

                        setTimeout(function(){
                            if(_this.isCp == 1){
                                _this.$refs.singleTable.setCurrentRow(_this.customerTable[_this.customerTable.length -1]);
                            }else{
                                _this.$refs.singleTable.setCurrentRow(_this.customerTable[0]);
                            }

                        },1000)

                     }).catch(err => {{}});
                },
                customer_advertiser_addru:function(){
                    customer_advertiser_addru({
                        data:this.addline,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            this.tan_add_ggz = false;
                            this.customer_advertiser_list();

                        }else{
                            this.$message.error('提交失败！');
                        }
                    }).catch(err => { this.$message.error('获取失败');});
                },

                advertiser_to_product:function(){
                    advertiser_to_product({
                        id:this.chanpinId,
                    }).then(response => {

                        if(this.isCp  == 1){
                            if(response.data.length == 0 ){
                                this.$confirm('系统检测新加广告主未填写产品，是否填写?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.tan_add_cp = true;
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消'
                                    });
                                });
                            }
                            }
                        this.product0 = response.data;

                    }).catch(err => { this.$message.error('获取失败');});
                },

                products:function(){
                    products({
                        data:this.addline_cp,
                    }).then(response => {
                        this.advertiser_to_product();

                    }).catch(err => { this.$message.error('获取失败');});
                },
                pullshow:true,
                showPllFun(){
                    if(  this.addline.advertiser !="" &&
                        this.addline.advertiser_for_short !="" &&
                        this.addline.linkman !="" &&
                        this.addline.tel !="" &&
                        this.addline.url !=""){
                        this.pullshow = false;
                    }else{
                        this.pullshow = true;
                    }
                },
                pullshow_cp:true,
                showPllFun_cp(){
                    if( this.addline_cp.product !="" &&
                        this.addline_cp.product_short_name !=""){
                        this.pullshow_cp = false;
                    }else{
                        this.pullshow_cp = true;
                    }
                },
            }
        },
        components: {
        },
        computed: {
            ...mapGetters([
                'user',
            ]),
        },
        watch:{
            user:function(newValue){
            },
        },
        mounted(){
            this.routeId = this.$route.query.id;
            this.isCp = this.$route.query.cp;
            this.customer_advertiser_list(this.page,this.num,this.dataInfor);
        },
        methods: {
            //跳转
            jumpCustomerList(){
                this.$router.go(-1);
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            clickTr(val){
                this.chanpinId = val.id;
                this.advertiser_to_product();
                this.addline_cp.advertiser = val.id;
                this.isCp = 2;
            },
            add_ggz(){
//                this.tan_add_ggz = true;
//                this.addline.customer_id = this.$route.query.id;
                this.$router.push({ name: 'AddAdvertisement' ,query: { id: this.routeId,name:1}});
            },
            add_cp(val){
                this.ggz_name = val;
                this.tan_add_cp = true;
            },
            linechange(){
                this.showPllFun();
            },
            linechange_cp(){
                this.showPllFun_cp();
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                this.chanpinId = val.id;
            },
            close_ggz(){
                this.tan_add_ggz = false;
            },
            close_cp(){
                this.tan_add_cp = false;
            },
            pull_add_ggz(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.customer_advertiser_addru()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });

            },
            pull_add_cp(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tan_add_cp = false;
                    this.products()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            ggz_infor(val){
                this.$router.push({ name: 'advertisementInfor' ,query: { id: val.id}});
            },
            xiugai(val){
                this.$router.push({ name: 'AddAdvertisement' ,query: { id:val.id,name:2}});
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            fileFunaccount(val){
                if(val){
                    return val
                }else{
                    return "---"
                }
            },
            start(val){
              if(val == 1){
                  return "已审核"
              }else{
                  return "未通过"
              }
            },

            fileFunName(val){
                if(val){
                    if(val[0]){
                        return val[0].name
                    }else{
                        return '---'
                    }

                }else{
                    return '---'
                }
            },
            fileFunTel(val){
                if(val){
                    if(val[0]){
                        return val[0].tel
                    }else{
                        return '---'
                    }
                }else{
                    return '---'
                }
            },
            fileFun(val){
             if(val){
                 if(val.name){
                     return val.name
                 }else{
                     return '---'
                 }

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
    .advertiser {
        width:100%;
        .customerBox {
            .customerTable {
                margin-top: 10px;
                .leftBox {
                    padding-right: 20px;
                    .title {
                        margin-bottom: 10px;
                        .search {
                            width:220px;
                            display: inline-block;
                            input {
                                height:30px!important;
                                line-height: 29px!important;
                            }

                        }
                        .distributionButton {
                            display: inline-block;
                            .add_ggz {
                                cursor: pointer;
                                z-index:999;
                                padding: 0;
                                width:95px;
                                height:32px;
                                line-height: 32px;
                                font-size: 12px;
                            }
                        }
                    }
                    .table {
                         tr{
                            height:40px;
                             td{
                                 width:100%;
                                 overflow: hidden;
                                 white-space: nowrap;
                                 border:none;
                                 .line{
                                     width:1px;
                                     height: 20px;
                                     background: #e3e3e3;
                                     display: inline-block;
                                     margin:0 6px;
                                 }
                             }

                        }

                        .info-row {}
                        .el-table__header thead tr th{
                            border-bottom: none;
                        }
                         .cell, .td-text {
                            width:100%;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            color: #000;
                            padding-left: 20px;
                             font-size: 12px;
                        }
                         tbody tr:nth-child(even){
                            background: #f8f9fb;
                        }
                         tbody tr:nth-child(odd){
                            background-color: #fff;
                        }
                        .cell{
                            width:100%;
                            overflow: hidden;
                            text-overflow:ellipsis;
                        }
                        .appInfor {
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            text-align: center;
                            line-height: 20px;
                            font-size: 12px;
                            border-radius: 50%;
                        }
                        .appInfor.qu{
                            color: white;
                            background: #FF8754;
                        }
                        .appInfor.zhi{
                            color: white;
                            background: #3F7FFC;
                        }
                        /*thead{*/
                            /*tr{*/
                                /*th:first-child{*/
                                    /*.cell{*/
                                        /*padding-left:40px;*/
                                    /*}*/
                                /*}*/
                            /*}*/
                        /*}*/
                    }
                    .table  ::-webkit-scrollbar{
                        width: 7px;
                        height: 16px;
                        border-radius:0;
                        background-color: white;
                    }

                    /*定义滚动条的轨道，内阴影及圆角*/
                    .table   ::-webkit-scrollbar-track{
                        border-radius: 10px;
                        background-color: white;
                    }
                    /*定义滑块，内阴影及圆角*/
                    .table   ::-webkit-scrollbar-thumb{
                        /*width: 10px;*/
                        height: 10px;
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px white;
                        background-color: rgba(205,211,237,.4);
                    }
                    .addKehu{
                        position: absolute;
                        top: 23px;
                        left: 20px;
                        font-weight: bold;
                        text-decoration: underline;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
                .rightBox{
                    height:785px;
                    padding-left: 20px;
                    .header{
                        margin-bottom: 10px;
                        .add_ggz {
                            cursor: pointer;
                            padding: 0;
                            z-index:999;
                            width:95px;
                            height:32px;
                            line-height: 32px;
                            font-size: 12px;
                        }
                    }

                    .chanpin_box {
                        height:740px;
                        border:1px solid #dcdad6;
                        font-size: 12px;
                        .chanpin_title {
                            height:38px;
                            line-height: 38px;
                            background: #f8f7f6;
                            .title_left{
                                padding-left: 35px;
                            }
                        }
                        .chanpin_body {
                            height:100%;
                            padding:0 15px;
                            .box{
                                height:43px;
                                line-height: 43px;
                                border-bottom: 1px dashed #bebbb5;
                                .title_left {
                                    padding-left:17px;
                                }
                            }
                        }
                    }
                }

            }
            .tan_Modify {
                .el-dialog__header {
                    position: relative;
                    padding:0;
                    height:40px;
                    line-height: 45px;
                    text-align: center;
                    background: #dde2e8;
                    font-size: 12px;
                    position: relative;
                    .el-dialog__title {
                        color: #606987;
                    }
                    .el-dialog__headerbtn {
                        position: absolute;
                        right:10px;
                        top:0;
                        bottom: 0;
                        margin:auto;
                    }
                }

                .el-form-item {
                    margin-bottom: 10px;
                }
                .el-dialog {
                    width:400px;
                }
            }
        }
        .el-table .success-row {
            background: #f0f9eb!important;
        }
    }
</style>
