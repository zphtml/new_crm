<template>
    <el-row class="indexPage">
        <div v-if="bj_show" style="width: 170px;position: fixed;left: 0;bottom: 0;top: 0;background: #000;opacity:.5;z-index: 99;"></div>
        <el-col :span="24"  style="padding-left: 10px;margin-top: 10px;">
            <el-row style="" class="userlist_index">
                <p class="crm_title">
                    <i class="crm_line"></i>
                    <span  @click="homePage">首页</span>><span>公告</span>
                </p>
                <el-col :span="24" style="margin-top:10px">
                    <el-col :span="10" style="padding: 5px;">
                        <el-col :span="24" style="border: 1px solid #999;padding: 5px;height: 800px;overflow: auto">
                            <el-button type="primary" style="margin-bottom: 15px;padding: 0;" @click="xintian">新增标题</el-button>
                            <el-tree
                                    :data="treeData"
                                    class="user_tree"
                                    @node-click="handleNodeClick"
                                    :props="defaultProps"
                                    node-key="id"
                                    :expand-on-click-node="false"
                                    :render-content="renderContent"
                            >
                            </el-tree>
                        </el-col>
                    </el-col>
                    <el-col :span="14" style="padding: 5px">
                        <el-col :span="24" style="border: 1px solid #999;height: 800px;" v-if="!isShow">
                            <el-col :span="24" style="padding: 5px;">
                                <el-col :span="8" style="font-size: 18px;color: #54adff">
                                    {{name}}：
                                </el-col>
                                <el-col :span="16" >
                                    <el-button type="primary" style="float: right;padding: 0" @click="pullInfor">发公告</el-button>
                                </el-col>
                            </el-col>
                            <el-col :span="24" style="margin-top: 15px;padding:0 10px;">
                                <el-table
                                        highlight-current-row border
                                        :data="addDatatable"
                                        class="vue-table"
                                        height="650"
                                        style="width: 100%">
                                    <el-table-column
                                            label="标题">
                                        <template slot-scope="scope">
                                            <div >
                                                {{ scope.row.title }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="创建日期">
                                        <template slot-scope="scope">
                                            <div >
                                                {{scope.row.created_at | ctimeData}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            label="备注">
                                        <template slot-scope="scope">
                                            <div style="text-align: center">
                                                    {{scope.row.content}}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            label="提交人">
                                        <template slot-scope="scope">
                                            <div style="text-align: center">
                                                <div >
                                                    {{scope.row.submitname}}
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            header-align="center"
                                            label="下载查看">
                                        <template slot-scope="scope">
                                            <div style="text-align: center" v-if="scope.row.file">
                                                <a style="display: inline-block;width: 100%;height: 100%;" :href="'http://c.lzad.cc/'+scope.row.file.file" target="_blank">下载查看</a>
                                                <!--<a style="display: inline-block;width: 100%;height: 100%;" :href="'http://192.168.8.115:8083/'+scope.row.file.file" target="_blank">下载查看</a>-->
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            label="删除">
                                        <template slot-scope="scope">
                                            <div style="text-align: center">
                                                <el-button type="primary" style="padding: 5px 8px;" @click="deleteTd(scope.row)">删除</el-button>

                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                            @size-change="handleSizeAccountChange"
                                            @current-change="handleCurrentAccountChange"
                                            :current-page="pageAccountIndex"
                                            :page-sizes="[ 20, 30,40]"
                                            :page-size="pageAccountSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="kehuTableAccountLength"
                                            style='text-align: right;'>
                                    </el-pagination>
                                </div>
                            </el-col>
                        </el-col  >
                        <el-col :span="24" style="border: 1px solid #999;height: 800px;line-height: 800px;text-align: center" v-else>
                            <span>
                                请选择公告列表
                            </span>
                        </el-col>
                    </el-col>
                </el-col>
            </el-row>
        </el-col>
        <el-dialog title="新增标题" :visible.sync="addFormVisible1" @close="closeTab()"  class="tanBox" :close-on-click-modal="false" >
            <el-form :model="form">
                <el-form-item label="请输入标题" >
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" >
                <el-button @click="closeTab" style="padding: 12px 20px">取 消</el-button>
                <el-button type="primary" @click="pull_account" >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="发公告" :visible.sync="dialogFormVisible" class="tanBox"   @close="dialogFormVisible == false" :close-on-click-modal="false">
            <el-col :span="24">
                <el-col :span="6">标题</el-col>
                <el-col :span="18">
                    <el-input v-model="pullTitle" auto-complete="off"></el-input>
                </el-col>
            </el-col>
            <el-col :span="24" style="margin: 10px 0">
                <el-col :span="6">备注</el-col>
                <el-col :span="18">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </el-col>
            </el-col>
            <el-col :span="24">
                <el-col :span="6">附件</el-col>
                <el-col :span="18">
                    <el-upload
                            class="upload-demo"
                            drag
                            ref="upload"
                            status="uploading"
                            list-type="picture"
                            name="File[imageFiles][]"
                            :on-success="handleAvatarSuccess"
                            :on-preview="Uploadpreview"
                            :on-error="handleAvatarError"
                            :on-change="UploadChange"
                            action="/api/file/addfile"
                            :data="dataObj"
                            :auto-upload="false">
                            <div style="width: 100%;height: 100%;line-height: 178px">
                                <span class="fujian_icon" >
                                     添加附件
                                </span>
                            </div>

                    </el-upload>
                </el-col>
            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pulltitle" :loading="pullDisabled">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>

</template>

<script>
    /*eslint-disable */
    import { article_class_list,add_article_class,delete_ar_class,up_ar_class,article_addru,article_list,article_delete} from '@/api/renshi';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';
    import moment from "moment"
    export default {
        name: 'dashboard',
        components:{
        } ,
        data() {
            return {
                bj_show:false,
 //==========================================
                form: {
                    name: '',
                },
                name:'',
                treeData: [],
                isShow:true,
                //分页
                defaultProps: {
                    children: 'child',
                    label: 'name'
                },
                addDatatable:[],
                fuid:"",
                pageAccountIndex: 1,
                pageAccountSize:20,
                kehuTableAccountLength:0,
                page:'20',
                num:'1',
                addFormVisible1:false,
                dialogFormVisible:false,
                pullTitle:"",
                textarea:'',
                dataObj:{
                    'File[yid]':'',
                    'File[type]':1019,
                },
                deleteID:'',
                pullDisabled:false,
                Uploadfild:true,
                percentageNum:0,
                article_class_list(){
                    article_class_list().then(response => {
                        this.treeData=response;
                    }).catch(error => {

                    });
                },
                article_list(data){
                    article_list({
                        page:this.page,
                        num:this.num,
                        data:{
                            fuid:this.fuid,
                            submituser:this.user.id
                        }
                    }).then(response => {
                        this.addDatatable = response.data;
                        this.kehuTableAccountLength = response['page-count'];
                    }).catch(error => {

                    });
                },
//添加
                add_article_class:function(data){
                    add_article_class({
                        data:data
                    }).then(response => {
                        if(response.code=='200'){
                            this.addFormVisible1 = false;
                            this.bj_show = false;
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.article_class_list();
//                            this.treeData.push({ id: response.data.id, name: value, child: [] ,basic_role:value, parent_id:0});
                        }else{
                            this.addFormVisible1 = true;
                            this.$message.error('添加失败！');
                        }
                    }).catch(error => {

                    });
                },
                //删除
                delete_ar_class:function(data){
                    delete_ar_class({
                        id:data
                    }).then(response => {
                        if(response.code=='200'){
                            this.addFormVisible1 = false;
                            this.bj_show = false;
                            this.article_class_list();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }else{
                            this.addFormVisible1 = true;
                            this.$message.error('删除失败！');
                        }
                    }).catch(error => {

                    });
                },
                //删除上传不成功文件
                article_delete:function () {
                    article_delete({
                        id:this.deleteID
                    }).then(response => {

                    }).catch(error => {

                    });
                },

                //修改
                up_ar_class:function(data,lin){
                    up_ar_class({
                        id:data.id,
                        data:lin,
                    }).then(response => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.article_class_list();
                    }).catch(error => {

                    });
                },
                article_addru:function (data) {
                    article_addru({
                        data:{
                            fuid:this.fuid,
                            title:this.pullTitle,
                            content:this.textarea,
                            submituser:this.user.id,
                        },
                    }).then(response => {
                        if(response.code == 200){
                            this.deleteID = response.data.id;
                            this.dataObj['File[yid]'] =  response.data.id;
                            this.dataObj['File[type]'] = 1019;
                            this.$refs.upload.submit();
                            this.pullTitle = "";
                            this.textarea = "";
                        }else{
                            this.$message.error('提交失败');
                        }
                    }).catch(error => {

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
// ============================================================================
            xintian(){
                this.addFormVisible1 = true;
                this.bj_show = true;
            },
            closeTab(){
                this.addFormVisible1 = false;
                this.bj_show = false;
            },
//新增
            pull_account(){
                let lin={
                    name:this.form.name,
                    parent_id:0
                };
                this.add_article_class(lin)
            },
            //点击查看
            handleNodeClick(data) {
                this.isShow = false;
                this.fuid = data.id;
                this.article_list();
                this.name = data.name;
            },
            //分页
            handleSizeAccountChange(val) {
                this.pageAccountSize = val;
                this.article_list()
            },
            handleCurrentAccountChange(val) {
                this.pageAccountIndex = val;
                this.article_list()
            },
            UploadChange(file){
                const isLt2M = file.size / 1024 / 1024 < 20;
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 20MB!',
                        type: 'warning'
                    });
                    this.$refs.upload.clearFiles();
                }
            },
            Uploadpreview(file){
            },
            Uploadprogress(event, file, fileList){
                this.percentageNum = event.percent;
            },
            handleAvatarSuccess(res, file){
                if(res.msg =='上传失败' ){
                    this.$message({
                        message: '上传失败',
                        type: 'warning'
                    });
                    this.$refs.upload.clearFiles();
                    this.pullDisabled = false;
                }else{
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.$refs.upload.clearFiles();
                    this.pullDisabled = false;
                    this.dialogFormVisible = false;
                    this.article_list();
                }

            },
//删除不成功的问件
            handleAvatarError(){
                this.article_delete();
                this.$message.error('文件上传错误');
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class='yilist' style='width:100%;'>
                    <span>
                    <span>{node.label}</span>
                </span>
                <span style="float: right;"  class='addel'>
                    <el-button style='width:20px;height:20px;padding:0;margin-left:20px'  on-click={ () => this.append(store, data) }>+</el-button>
                <el-button style='width:20px;height:20px;padding:0;' on-click={ () => this.remove(store, data)}>-</el-button>
                <el-button type="text" on-click={ () => this.cname(store, data)}>修改名称</el-button>
                </span>
                </span>);
            },
            //  添加
            append(store, data) {
                this.$prompt('请输入名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder:'输入名称'
                }).then(({ value }) => {
                    this.$message({
                        type: 'info',
                        message: '正在添加'
                    });
                    let lin={
                        name:value,
                        parent_id:data.id
                    };
                    this.add_article_class(lin)
                });

            },
//  删除
            remove(store, data) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete_ar_class(data.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

//   修改
            cname(store, data) {
                this.$prompt('请输入名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder:'输入名称'
                }).then(({ value }) => {
                    documnet.get
                    this.$message({
                        type: 'info',
                        message: '正在修改'
                    });
                    let lin={
                        name:value,
                    };
                    this.up_ar_class(data,lin);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
//新增
            pull_account(){
                let lin={
                    name:this.form.name,
                    parent_id:0
                };
                this.add_article_class(lin)
            },
 //发布公告
            pullInfor(){
                this.dialogFormVisible = true;
                this.percentageNum = 0;
            },
//上传标题
            pulltitle(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.$refs.upload.uploadFiles.length == 0){
                        this.$message({
                            message: '请先选择上传文件',
                            type: 'warning'
                        });
                    }else if( this.pullTitle == ""){
                        this.$message({
                            message: '请先输入标题',
                            type: 'warning'
                        });
                    }else{
                        this.article_addru();
                        this.pullDisabled = true;
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });

            },
            //删除文件
            deleteTd:function (val) {
                article_delete({
                    id:val.id
                }).then(response => {
                    this.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.article_list();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });


                }).catch(error => {

                });
            },
            //跳转首页
            homePage(){
                this.$router.push({ name: 'homePage' });
            }
 //==============================================================================
        },
        watch: {

        },
        mounted(){
            this.article_class_list();
        },
        filters: {
            ctimeData(val){
                var time = new Date(parseInt(val) * 1000);
                return moment(time).format('YYYY-MM-DD')
            },
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .indexPage {
        .ui{
            margin-top: 60px;
            font-size: 14px;
            text-align: center;
            list-style: none;
        }
        .ui li{
            cursor: pointer;
            height: 50px;
            line-height: 50px;
            width:100px;
            list-style: none;
        }
        .ui li:hover{
            color: #54ADFF;
        }
        .userlist_index {
            .vue-table {
                border: 1px solid #fff !important;
            }
            .yilist {
                position: relative;
            }
            .user_tree {
                border: none;
                .el-tree-node__content {
                    line-height: 36px;
                }
                .el-tree-node__content:hover .addel{
                    opacity: 1;
                    z-index:1;
                }
            }
            .addel{
                position: absolute;
                padding: 0px;
                margin: 0px;
                top: 0px;
                right: 0px;
                opacity: 0;
                z-index:-1;
            }
            .el-date-editor.el-input {
                width: 120px;
                .el-input__icon {
                    left:-5px;
                }
                .el-input__inner {
                    padding: 0px 0px 0 30px;
                }
            }
            .el-select .el-input {
                width: 200px;
            }

            .el-input-group {
                width: 200px;
            }

            .search_text {
                width:150px;
                height:30px;
                input{
                    height: 29px !important;
                    line-height: 30px!important;
                }
            }

            .el-button--primary {
                /*margin-left: 14px;*/
                font-size: 12px;
                width: 80px;
                height: 30px;
                line-height: 7px;
                color: #fff;
                background-color: #20a0ff;
                border-color: #20a0ff;
            }
            /*.vue-table{*/
                /*.el-button--text{*/
                    /*font-size: 14px;*/
                    /*width: 20px;*/
                    /*height: 20px;*/
                    /*border-radius: 100%;*/
                    /*padding: 0;*/
                    /*color:#54adff;*/
                    /*text-decoration: underline;*/
                /*}*/
            /*}*/
            .right_box {
                width:100%;
                height:650px;
                overflow: auto;
                .box-card:hover{
                    background: #f5f2f0;
                }
                .el-card__header {
                    padding: 5px 20px;
                    font-size: 14px;
                }
                .el-card__body {
                    height:50px;
                    padding: 0;
                    font-size: 14px;
                }
            }
            .el-button--text {
                margin-left: 8px;
                border: none;
                color: #000;
                background: 0 0;
                font-size: 12px;
                padding-left: 0;
                padding-right: 0;
            }
            .tan_Modify {
                .el-dialog {
                    width:400px;
                    .el-form-item {
                        margin: 10px 0;
                    }
                }

            }
        }
        .tanBox {
            .el-dialog {
                width:360px;
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
                .dialog-footer {
                    button.el-button{
                        width:80px;
                        height: 30px!important;
                        text-align: center;
                        line-height: 30px;
                        padding: 0;
                        margin:0 10px;
                    }
                }
            }
            .upload-demo{
                width:100%;
                .el-upload {
                    width:100%;
                    .el-upload-dragger {
                        width:100%;
                    }
                }
            }
        }
        /*滚轴*/
        .right_box  ::-webkit-scrollbar{
            width: 7px;
            height: 16px;
            border-radius:0;
            background-color: white;
        }

        /*定义滚动条的轨道，内阴影及圆角*/
        .right_box   ::-webkit-scrollbar-track{
            border-radius: 10px;
            background-color: white;
        }
        /*定义滑块，内阴影及圆角*/
        .right_box   ::-webkit-scrollbar-thumb{
            /*width: 10px;*/
            height: 10px;
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px white;
            background-color: rgba(205,211,237,.4);
        }
    }
    @media screen and (max-width:800px){
        .crm_header {
            .nav-logo-container{
                display: none;
            }
        }
        .logoImg{
            display: none!important;
        }
    }
</style>

