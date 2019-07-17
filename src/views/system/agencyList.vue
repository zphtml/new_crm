<template>
    <div class="addgongsi" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >{{ $t('titles.agent') }}</span>
            </p>
                <el-button type="primary" class="addbtn" @click="showAddAgency">添加{{ $t('titles.agent') }}</el-button>
            <el-col :span="24" class="fapiaoTable">
                <div>
                    <el-table
                            highlight-current-row  border
                            :data="agencyData"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                prop="companyname"
                                :label="$t('titles.customer')">
                        </el-table-column>
                        <el-table-column

                                label="简称">
                            <template slot-scope="scope">
                                <div>
                                    {{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="deleteItem(scope.row)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <el-dialog :title="'添加'+$t('titles.agent')" :visible.sync="dialogFormVisible" @close="dialogFormVisible = false">
            <el-form :model="form">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司简称" :label-width="formLabelWidth">
                    <el-input v-model="form.nick" auto-complete="off"></el-input>
                    <p style="font-size: 12px">(公司简称用来生成公司编号)</p>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAgency">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {getAgentList,addAgent} from '@/api/manager'

    export default {
        data() {
            return {
                agencyData: [],
                form: {
                    name: '',
                    nick: ''
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
            }
        },
        methods:{
            showAddAgency(){
              this.dialogFormVisible = true;
            },
            addAgency(){
                this.dialogFormVisible = false;
                let data=  {
                    'companyname':this.form.name,
                    'title':this.form.nick
                };
                addAgent(data).then(response => {
                    this.getAgency();
                })
            },
            getAgency(){
                getAgentList().then(response => {
                    this.agencyData = response;
                })
            },
            deleteItem(item){
                this.$confirm('是否删除该条记录', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                } ).catch(() => {

                } )
            }
        },
        mounted: function () {
            this.getAgency();
        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .addgongsi {
        .addbtn {
            padding: 0;
            float: right;
            width:100px;
            height:30px;
            margin-bottom: 10px;
        }
    }

</style>
