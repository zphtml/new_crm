<template>
    <div class="chanpinLine" >
        <el-row class="chanpinLineBox">
            <p class="crm_title" style="height: 40px;line-height: 40px">
                <i class="crm_line"></i>
                <span >产品线</span>
                <el-button type="primary" class="addchanpin" @click="addchanpin">新增产品线</el-button>
            </p>

            <el-col :span="24" class="lineTable">
                <div>
                    <el-table :data="lineTable"  height="740"    style="width: 100%">

                        <el-table-column type="expand" >
                            <template slot-scope="props">
                                <div v-for="(item,index) in props.row.zi" class="trBox">
                                    <div class="first_div div_up" ><span style="opacity: 0">top</span></div>
                                    <div class="line_a div_up">
                                        {{ item.name }}
                                    </div>
                                    <div class="line_b div_up">
                                        {{item.title }}
                                    </div>
                                    <div  class="line_d div_up">
                                           <span v-if="item.fk_type == 0 ">
                                        {{ $t('titles.fandian') }}类
                                    </span>
                                        <span v-if="item.fk_type == 1 ">
                                            询价类
                                    </span>
                                    </div>

                                    <div  class="line_c div_up">
                                        <span style="text-decoration: underline;color: #54cdff;cursor: pointer" @click="Tan_xiugai(item)">编辑</span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="产品线">
                            <template slot-scope="scope">
                                <div class="tdbox" style="position: absolute;width: 30px;height: 28px;background: white;left: -38px;" v-if="scope.row.zi.length == 0"></div>
                                <div >
                                    {{scope.row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="简称">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    {{scope.row.title }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="产品线类型">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <span v-if="scope.row.fk_type == 0 ">
                                        {{ $t('titles.fandian') }}类
                                    </span>
                                    <span v-if="scope.row.fk_type == 1">
                                            询价类
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <div style="text-align: center">
                                    <span style="text-decoration: underline;color: #54cdff;cursor: pointer" @click="Tan_xiugai(scope.row)">编辑</span>
                                </div>
                            </template>

                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <!--新增-->
        <el-dialog title="新增产品线" :visible.sync="tan_addline"  @close="close" :close-on-click-modal="false" class="tan_Modify" >
            <el-form :label-position="labelPosition"  @close="close" label-width="120px" :model="addline">
                <el-form-item label="一级名称">
                    <el-select
                            v-model="oneName"
                            style="width: 200px;"
                            @change="lineSelect"
                            placeholder="产品线">
                        <el-option
                                v-for="(item,key) in lineoptions"
                                :key="item.name"
                                :label="item.name"
                                :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品线名称">
                    <el-input v-model="addline.name" v-on:input="linechange" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input v-model="addline.title" v-on:input="linechange" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="是否是询价产品">
                    <el-radio-group v-model="add_fk_type " class="radio" @change="addline_change">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_addline" :disabled = pullshow >确 定</el-button>
                        <el-button @click="tan_addline = false" >取 消</el-button>
			</span>
        </el-dialog>
        <!--编辑-->
        <el-dialog title="编辑" :visible.sync="userModify" @close="close"  :close-on-click-modal="false" class="tan_Modify" >
            <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                <el-form-item label="名称">
                    <el-input v-model="formLabelAlign.name" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item label="简称">
                    <el-input v-model="formLabelAlign.title" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="是否是询价产品">
                    <el-radio-group v-model="fk_type " class="radio" @change="fk_change">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_name" >确 定</el-button>
                        <el-button @click="userModify = false" >取 消</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { meijie_prlin_list ,prlin_up,prlin_addru} from '@/api/meiti';
    import state from '@/components/shenhe/sh_state';
    import moment from "moment"
    export default {
        data() {
            return {
                dataInfor : {
                    search:{
                    },
                },
                screen:'',
                stateData:'',
                listLoading:true,
                labelPosition: 'right',
                lineOpctionName:[],
                meijie_prlin_list:function(page,num,val){
                    meijie_prlin_list({
                        page:page,
                        num:num,
                        search:val,
                    }).then(response => {
                        this.lineTable = response;
                        this.lineOpctionName = [{
                            name:'新建父级产品线',
                            id:0,
                            yushan_type:110901
                        }];
                        for(let a = 0;a<response.length;a++){
                            this.lineOpctionName.push(response[a])
                        }
//                        this.kehuTableLength =  response;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //审核状态
                audit_count:'',
//信息，款项
                clickColor:true,
                click_Color:false,
//表格
                lineTable:[],
 //新增
                tan_addline:false,
                lineoptions:[],
                oneName:'新建父级产品线',
                fk_type:0,
                add_fk_type:0,
                addline:{
                    parent_id:0,
                    name:'',
                    title:'',
                    fk_type:0,
                    yushan_type:'110901',
            },
                pullshow:true,
//编辑
                userModify:false,
                lineInforId:'',
                formLabelAlign: {
                    name: '',
                    title: '',
                    fk_type:0,
                },
                open(val) {
                    this.$confirm('是否修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    if(val == 'bianji'){
                        this.prlin_up(this.formLabelAlign);
                        this.userModify = false;
                    }else{
                        this.prlin_addru();
                        this.tan_addline = false;
                    }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                },
                prlin_addru:function () {
                    prlin_addru({
                        data:this.addline
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.meijie_prlin_list(this.page,this.num,this.dataInfor);
                        }else{
                            this.$message.error('上传失败');
                        }
//
                    }). catch(err => {this.$message.error('获取失败');});
                },
                prlin_up:function(data){
                    prlin_up({
                        id:this.lineInforId.id,
                        data:data
                    }).then(response => {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.meijie_prlin_list(this.page,this.num,this.dataInfor);
                    }). catch(err => {this.$message.error('获取失败');});
                },
                //分页
                page:'',
                num:'1',
                pageIndex:1,
                pageSize:20,
                kehuTableLength:12,
                showPllFun(){
                    if(  this.addline.name !="" && this.addline.title !="" && this.addline.type !=""){
                        this.pullshow = false;
                    }else{
                        this.pullshow = true;
                    }
                },
            }
        },
        components: {
            state
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            for(let i = 0;i<this.audit_action.length;i++){
                if(this.audit_action[i].action_name == 'waichu'){
                    this.audit_count = this.audit_action[i].audit_count;
                }
            }
            this.meijie_prlin_list(this.page,this.num,this.dataInfor);
            this.screen =
                {
                name:'审核状态',
                data:[
                    {
                        label:'全部',
                        value:'',
                    },
                    {
                        label:'未审核',
                        value:'0',
                    },
                    {
                        label:'已通过',
                        value:'1',
                    },
                    {
                        label:'未通过',
                        value:'2',
                    }
                ],
            };

        },
        methods: {
            fk_change(index){
                this.formLabelAlign.fk_type = index;
            },
            addline_change(index){
                this.addline.fk_type = index;
            },
            addchanpin(){
                this.tan_addline = true;
                this.lineoptions =  this.lineOpctionName;
            },
            qingjia(){},
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
//分页
            handleSizeChange(val) {
                this.page = val;
                this.pageSize =val;
                this.meijie_prlin_list(this.page,this.num,this.dataInfor);
            },
            handleCurrentChange(val) {
                this.num = val;

                this.meijie_prlin_list(this.page,this.num,this.dataInfor);
            },
//添加
            pull_addline(){
                this.open('add');
            },
            lineSelect(index){
                this.addline.parent_id = this.lineoptions[index].id;
                this.addline.yushan_type = this.lineoptions[index].yushan_type;
                this.showPllFun();
            },
            linechange(){
                this.showPllFun();
            },
//编辑
            Tan_xiugai(val){
                this.lineInforId = val;
                this.userModify = true;
                this.formLabelAlign.name =this.lineInforId.name;
                this.formLabelAlign.title =this.lineInforId.title;

            },
            close(){
                this.tan_addline = false;
                this.userModify = false;
            },
            pull_name(){
                this.open('bianji');
            },
//点击tr
            clickTr(val){


            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },
            fileFun(val){
                if(val){
                    return val.name
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
    .chanpinLine {
        width:100%;
        .chanpinLineBox {
            .addchanpin {
                height:32px;
                font-size: 12px;
                float: right;
            }
            .screen {
                margin-bottom: 20px;
                .qingjia {
                    height:32px;
                    font-size: 12px;
                    margin-right: 10px;
                }

                .distributionButton {
                    float: right;
                    display: inline-block;
                    vertical-align: top;

                    .dropdownBut {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .el-button {
                        width:90px;
                        height:32px;
                        font-size: 12px;
                        vertical-align: top;
                    }
                    .textInfor {
                        width:65px;
                        height:32px;
                        display: inline-block;
                        font-size: 14px;
                        position: relative;
                        margin-left: 30px;
                        span{
                            cursor: pointer;
                        }
                        .clickColor {
                            color: #0587ff;
                        }
                        .click_Color {
                            color: #0587ff;
                        }
                        span:hover{
                            color: #0587ff;
                        }
                        .topText {
                            position: absolute;
                            top:0;
                            left:0;
                        }
                        .line{
                            width:1px;
                            height: 40px;
                            background: #e3e3e3;
                            transform:rotate(45deg);
                            -ms-transform:rotate(45deg); 	/* IE 9 */
                            -moz-transform:rotate(45deg); 	/* Firefox */
                            -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                            -o-transform:rotate(45deg);
                            position: absolute;
                            left: 30px;
                            top: -2px;
                        }
                        .bottomText{
                            position: absolute;
                            bottom:0;
                            right:0;
                        }
                    }
                }
            }
            .lineTable {
                .el-table__body tr td{
                    padding: 0;
                    box-sizing: border-box;
                    .trBox {
                        width: 100%;
                        display: block;
                        height: 35px;
                    }
                    .trBox:hover{
                        background: #eff1f5;
                    }
                    .div_up {
                        display: inline-block;
                        box-sizing: border-box;
                        float: left;
                        height:35px;
                        line-height: 35px;
                        border-bottom: 1px solid #dedcd8;

                    }
                    .first_div {
                        width:4.4%;
                    }
                    .line_b,.line_c ,.line_d{
                        text-align: center;
                    }
                    .line_a{
                        width: 24%;
                        padding-left: 30px;
                    }
                    .line_b{
                        width: 24%;
                    }
                    .line_d{
                        width: 24%;
                    }
                    .line_c{
                        width: 23.5%;
                    }
                }

            }
            .el-table__body tr:hover{
                background: white;
             }
            .el-table--enable-row-hover .el-table__body tr:hover>td,.el-table--enable-row-hover .el-table__body tr:hover>td .tdbox{
                background: white;
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

</style>
