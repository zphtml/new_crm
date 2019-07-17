<template>
    <div class="fapiaoList" >
        <el-row class="fapiaoBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >发票种类</span>
            </p>
            <el-col :span="24" class="screen">
                <el-button type="primary" class="qingjia" @click="showAddInvoice">添加发票种类</el-button>
            </el-col>
            <el-col :span="24" class="fapiaoTable">
                <div>
                    <el-table
                            highlight-current-row  border
                            :data="invoiceData"
                            class="vue-table"
                            height="740"
                            style="width: 100%">
                        <el-table-column
                                prop="daili.companyname"
                                :label="$t('titles.advertiser')">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                header-align="center"
                                label="发票种类">
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

        <el-dialog title="添加发票种类" :visible.sync="dialogFormVisible" @close="dialogFormVisible = false">
            <el-form :model="form">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-select v-model="form.company" placeholder="请选择公司">
                        <el-option
                                v-for="(item,index) in companys"
                                :key="item.id"
                                :label="item.companyname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票种类" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addInvoice">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {getInvoiceList,addInvoice,getAgentList} from '@/api/manager'

    export default {
        components: {
        },
        data() {
            return {
                invoiceData: [],
                form: {
                    company: '',
                    name: ''
                },
                companys:[],
                formLabelWidth: '120px',
                dialogFormVisible: false,
            }
        },
        methods:{
            showAddInvoice(){
                this.dialogFormVisible = true;
            },
            addInvoice(){
                this.dialogFormVisible = false;
                addInvoice({advertiser:this.form.company,name:this.form.name}).then(response => {
                    this.getInvoice();
                })
            },
            getInvoice(){
                getInvoiceList().then(response => {
                    this.invoiceData = response;
                })
            },
            getAgency(){
                getAgentList().then(response => {
                    this.companys = response;
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
            this.getInvoice();
            this.getAgency();
        }
    }
</script>
