<template>
<el-col :span="24" class="media_account">
    <el-dialog title="修改账户当前媒介合同" :visible.sync="add_media_account"  @close="add_media_account=false" class="media_shenhe" size="tiny" >
        <div style="margin-bottom: 20px;">
            <div style="display: inline-block;height: 30px;line-height: 30px;    width: 100%;" class="note">
                <div :span="24">
                    <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right" v-if="shenheVal.istype == 'bond'">产品线：</div>
                    <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right" v-else>账户：</div>
                    <div style="display: inline-block;vertical-align: middle;width: 200px;">
                        <el-radio-group v-model="checkList" @change="mht_account_change(data,key)" v-for="(data,key) in accountData" :key="key">
                            <el-radio :label="key" style="display: block;margin:0 0 5px 0 ;width: 230px" >{{data}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                <div :span="24">
                    <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right">媒介合同：</div>
                    <div style="display: inline-block">
                        <el-select size="mini"   v-model="mht_value" placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in mht_options"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                    </div>
                </div>
            </div>
        </div>
        <div style="text-align: center;padding-bottom: 20px">
            <el-button type="primary" @click="add_metia_account()"  style="padding: 10px 15px;height: auto;width: auto;">确定</el-button>
            <el-button @click="add_media_account=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
        </div>
    </el-dialog>
</el-col>

</template>
<script>
  import { audit_history} from '@/api/contract';
    import { mapGetters } from 'vuex';
  import { productmcontract,updateaccountrenew ,upmarginmht} from '@/api/kehu';
    import moment from "moment"
    export default {
        data() {
            return {
                shenheVal:[],
                checkList:0,
                accountData:[],
                mht_options:[],
                mht_value:'',
                account_id:'',
                iszhuankuan:'',
                xf_id:'',
                add_media_account:false,
                updateaccountrenew(){
                    updateaccountrenew({
                        id:this.xf_id,
                        account: this.account_id,
                        mhtid:this.mht_value,
                        iszhuankuan:this.iszhuankuan,
                    }).then(response=> {
                        if(response.code == 200){
                            this.$message({
                                message: '修改媒介合同成功，请稍后',
                                type: 'success'
                            });
                            this.add_media_account = false;
                            this.$emit('media_account_Infor');
                        }
                    }). catch(err => {this.$message.error(err);});
                },
                productmcontract:function(dataId){
                    productmcontract({
                        id:dataId,
                    }).then(response=> {
                        this.mht_options = response;
                    }). catch(err => {this.$message.error(err);});
                },
                upmarginmht(){
                    upmarginmht({
                        bondId:this.xf_id,
                        id:this.mht_value,
                    }).then(response=> {
                        this.add_media_account = false;
//                        this.$emit('media_account_Infor')
                    }). catch(err => {this.$message.error(err);});
                },
            }
        },

      filters: {


      },
        methods:{
            mht_account_change(data,key){
                this.mht_value = "";
                if(key == 0){
                    this.account_id = this.shenheVal.dataInfor.data.zczhanghu.id;
                    this.productmcontract(this.shenheVal.dataInfor.contract_zhuanchu.mht.product_line);
                }else{
                    this.account_id = this.shenheVal.dataInfor.data.zrzhanghu.id;
                    this.productmcontract(this.shenheVal.dataInfor.contract_zhuanru.mht.product_line);
                }
            },
            add_metia_account(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.shenheVal.istype == "bond"){
                        this.upmarginmht();
                    }else{
                        this.updateaccountrenew();
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            item(val){
                this.shenheVal = val;
                this.accountData =  val.accountData;
                this.add_media_account = val.isTan;
                if(val.istype == 'zhuankuan'){
                    this.account_id = val.dataInfor.data.account;
                    this.xf_id = val.dataInfor.data.id;
                    this.iszhuankuan = 1;
                    this.productmcontract(this.shenheVal.dataInfor.contract_zhuanchu.mht.product_line);
                }else{
                    this.account_id = val.dataInfor.account;
                    this.xf_id = val.dataInfor.id;
                    this.productmcontract(val.dataInfor.contractinfo.contractproduct[0].id);
                }

            },
        },
        props: ['item',]
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .media_account {
        .media_shenhe {
            .el-dialog {
                width:500px;

                .el-dialog__body{
                    padding: 20px 50px;
                    color: #000000;
                    .note {
                        margin-top: 15px;
                    }
                }
            }

        }
        .el-dialog__header {
            position: relative;
            padding:0!important;
            height:40px;
            line-height: 45px;
            text-align: center;
            background: #dde2e8;
            .el-dialog__title {
                color: #606987;
                font-size: 18px;
            }
            .el-dialog__headerbtn {
                position: absolute;
                right:10px;
                top:0;
                bottom: 0;
                margin:auto;
            }
        }
    }

</style>
