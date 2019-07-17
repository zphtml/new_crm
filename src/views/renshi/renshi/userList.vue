<template>
    <div class="fenpeiBox">
        <el-dialog title="选择用户"  :visible.sync="userDialogVisible"  @close="close" >
            <input type="text" class="searchInput" placeholder="请输入关键字" v-model='input' @keyup='show($event)'>
            <el-table
                    ref="multipleTable"
                    :data="addDatatable"
                    tooltip-effect="dark"
                    class="vue-table"
                    height="300"
                    style="width: 100%"
                    @select="selectData">
                <el-table-column
                        type="selection">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="bumen"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="item_name"
                        label="角色"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="pullTable">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getUserList} from '@/api/user'

    export default {
        data() {
            return {
                input:'',
                usersData: [],
                tbData:[],
                multipleSelection: [],
                //分页
                pageAccountIndex: 1,
                pageAccountSize:10000,
                kehuTableAccountLength:'',
            }
        },
        props: ['userDialogVisible'],
        computed: {
            addDatatable(){
                let tableData = [];
                let _this = this;
                tableData = _this.tbData.filter(function (item, i) {
                    if(item.name.indexOf(_this.input)>=0 ){
                        return item
                    }
                })
                this.kehuTableAccountLength = tableData.length;
                return tableData.filter((o,i) => i >=(this.pageAccountIndex-1)*this.pageAccountSize&&i<=this.pageAccountIndex*this.pageAccountSize-1);
            },

        },
        methods: {
            selectData(row){

                this.multipleSelection = row;
            },
            show(ev){
                if(ev.keyCode == '13'){
                    this.getUserListData(this.page,this.num);
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {

            },
            getUserListData(page,num) {
                getUserList({
                    page:page,
                    num:num,
                    search:{Search_str:this.input,is_delete:0},
                }).then(response => {
                    this.tbData = response.data;
                    this.kehuTableLength = response.totalCount;
                })
            },
            //分页
            handleSizeAccountChange(val) {
                this.pageAccountSize = val;
            },
            handleCurrentAccountChange(val) {
                this.pageAccountIndex = val;
//                this.tbData[0].forEach( row => {
//                    this.$refs.multipleTable.toggleRowSelection( row );
//                });

            },
            close(){
                this.userDialogVisible = false;
            },
            pullTable(){
                let data= [];
                for(let i =0;i<this.multipleSelection.length;i++){
                    data.push(this.multipleSelection[i].id);
                }
                this.$emit('userId', {userId: data});
            },
        },
        mounted: function () {
            this.getUserListData(this.page,this.num);

        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    .fenpeiBox {
        .searchInput {
            width:120px;
            height:30px;
            margin-bottom: 5px;
            input{
                height: 29px!important;
                line-height: 29px!important;
            }
        }
        .el-dialog {
            width:700px;
            .el-dialog__body {
                padding:10px 20px;

            }
        }


    }
</style>
