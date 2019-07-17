<template>
    <div class="fenpei_balanceList" >
        <el-row class="fenpei_balanceBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span  @click="jumpCustomerList">客户列表</span>><span @click="jumpConsole">客户控制台</span>><span>分配余额</span>
            </p>
            <el-col :span="24" class="fenpei_balanceTiele">
                <span class="corporateName">{{ titleName }}-分配合同回款</span>
                <div class="fenpei_num">
                    <span >
                        可分配余额:
                    </span>
                    <span>
                      {{ fenpei_number  | currency('')}}
                    </span>
                </div>
                <el-button type="primary" class="right_btn" @click="fenpei">一键分配</el-button>
            </el-col>
            <el-col :span="24" class="fenpei_balanceTable">
                <div>
                    <el-table
                            highlight-current-row v-loading="listLoading"  border
                            :data="fenpei_balanceTable"
                            class="vue-table"
                            height="700"
                            style="width: 100%">
                        <el-table-column
                                width="160"
                                label="合同编号">
                            <template slot-scope="scope">
                                {{scope.row.contract_no}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="产品线">
                            <template slot-scope="scope">
                                {{scope.row.product_line}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="contract_money"
                                label="合同金额">
                            <template slot-scope="scope">
                                {{scope.row.money  | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                :label="'合同'+$t('titles.fandian')">
                            <template slot-scope="scope">
                                {{scope.row.fandian  | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="hetong_yu_e"
                                label="合同余额">
                            <template slot-scope="scope">
                                {{scope.row.hetong_yu_e | currency('')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="ctime"
                                label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.ctime | ctimeData}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="建议分配">
                            <template slot-scope="scope">
                                {{scope.row.xf_qiane | fenpeiData}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="180"
                                label="分配额度">
                            <template slot-scope="scope">
                                <div class="operation" style="position: relative">
                                    <input style="line-height: normal; border: none;font-size: 12px;height: 24px; width: 100px;padding-left:20px;outline: none;z-index:9"
                                           type="number" v-model="scope.row.inputData"
                                           name="mouse2"
                                           placeholder="请输入金额"
                                           onmousewheel="return false;">
                                    <span @click="ping(scope.$index)">平!</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="tableFoot">
                    <el-button type="primary" class="pull" @click="pullTable">提交</el-button>
                    <el-button class="reset" @click="restTable">重置</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters} from 'vuex';
    import { fphuikuan ,fphuikuanru} from '@/api/kehu';
    import moment from "moment"
    let inputText = '';
    let ref ='';
    export default {
        data() {
            return {
                titleName:'',
                fenpei_number:'',
                listLoading:true,
//表格
                fenpei_balanceTable:[],
                fphuikuan:function(id){
                    fphuikuan({
                        id:id,
                    }).then(response => {
                        response.contract_list =      response.contract_list.filter(function(item,i) {
                             item['inputData'] = 0;
                            item['hetong_yu_e'] =Number(item.huikuan)+Number(item.bukuan)- Number(item.yu_e);
                            return item
                        });
                        this.titleName = response.costomer.advertiser;
                        this.fenpei_number = response.costomer.undistributed_yu_e;
                        this.fenpei_balanceTable = response.contract_list;
                        this.listLoading = false;
                    }). catch(err => {this.$message.error('获取失败');});
                },
                fphuikuanru:function(data){
                    fphuikuanru({
                        data:data,
                    }).then(response => {
                        this.success();
                    }). catch(err => {this.$message.error('获取失败');});
                },
                success() {
                    this.$notify({
                        title: '提交成功',
                        message: '此页面将跳转到--客户控制台',
                        type: 'success'
                    });
                    let _this = this;
                    setTimeout(function(){
                        _this.$router.push({ name: 'console',query: { type:1} });
                    }, 500);
                },
                tan(data) {
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.fphuikuanru(data);
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        watch:{
            user:function(newValue){

            },
        },
        mounted(){
            let url=location.href.split('?')[1];
            ref = decodeURI(url.split('&')[0].split('=')[1]);
            this.fphuikuan(ref);
        },
        methods: {
            ping(index){
                if(Number(this.fenpei_balanceTable[index].hetong_yu_e)<0){
                    this.fenpei_balanceTable[index].inputData = -(Number(this.fenpei_balanceTable[index].hetong_yu_e).toFixed(2))
                }else{
                    this.fenpei_balanceTable[index].inputData = Number(this.fenpei_balanceTable[index].hetong_yu_e).toFixed(2)
                }

            },
            fenpei(){
                this.fenpei_balanceTable = this.fenpei_balanceTable.filter(function(item,i) {
                    if(item.xf_qiane){
                        item.inputData = item.xf_qiane;
                    }
                    return item
                })
            },
            pullTable(){
                let data = {
                    "advertiser":ref,
                    "ht_id":[],
                    "pmoney":[]
                };
                let num =0 ;
                for(var i = 0;i<this.fenpei_balanceTable.length;i++){
                    num+=Number(this.fenpei_balanceTable[i].inputData);
                    data.ht_id.push(this.fenpei_balanceTable[i].id);
                    data.pmoney.push(this.fenpei_balanceTable[i].inputData);
                }
                this.tan(data);
            },
            restTable(){
                this.fenpei_balanceTable = this.fenpei_balanceTable.filter(function(item,i) {
                    item.inputData = 0;
                    return item
                });
            },
 //跳转控制台
            jumpConsole(){
                this.$router.push({ name: 'console' ,query: { type:1} });
            },
//跳转返回客户列表
            jumpCustomerList(){
                this.$router.push({ name: 'kehuliebiao' });
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
                    return val
                }else{
                    return '---'
                }
            },
            fenpeiData(val){
                if(val){
                    return val
                }else{
                    return '暂无建议'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .fenpei_balanceList {
        width:100%;
        .fenpei_balanceTiele {
            margin: 10px 0;
            .corporateName {
                font-size: 22px;
                margin-right: 10px;
            }
            .fenpei_num {
                display: inline-block;
                font-size: 16px;
                color: #54ADFF;
            }
            .right_btn {
                float: right;
                padding: 0;
                height:30px;
                width:90px;
            }
        }
        .fenpei_balanceBox {
            .fenpei_balanceTable {

                .vue-table {
                    max-height:600px;
                    .cell{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        .icon_xiugai {
                            font-size: 18px;
                        }
                        .operation {
                            width:140px;
                            height:100%;
                            vertical-align: middle;
                            font-size: 18px;
                            border:1px solid #bbbbbb;
                            border-radius: 3px;
                            overflow: hidden;
                            .el-input {
                                display: inline-block;
                                width:100px;
                                input{
                                    height:29px!important;
                                    border-radius: 0;
                                    font-size: 12px;
                                    border:none;
                                }
                            }
                            span{
                                display: inline-block;
                                width:34px;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                font-size: 12px;
                                background: #5cb85c;
                                color: white;
                                cursor: pointer;
                            }
                        }
                    }

                    .start_icon {
                        display: inline-block;
                        margin:0 2%;
                        font-size: 16px;

                    }
                }
                .tableFoot{
                    text-align: right;
                    margin-top:20px;
                    button{
                        width:80px;
                        height:30px;
                        line-height: 30px;
                        padding: 0;
                    }
                    .reset {
                        color: #54ADFF;
                        border:1px solid #54ADFF;
                    }
                }
            }

        }

    }
</style>
