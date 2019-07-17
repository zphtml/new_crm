<template>
<!-----下单判定----------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <el-dialog title="下单判定" :visible.sync="addFormVisibleReceive7"  @close="addFormVisibleReceive7=false" class="media_shenhe" size="tiny" >
            <div style="margin-bottom: 20px;">
                <div style="display: inline-block;height: 30px;line-height: 30px;    width: 100%;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 130px;text-align: right">选择下单媒介合同：</div>
                    </div>
                </div>
                <div style="display: inline-block;height: 30px;line-height: 30px;    width: 100%;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right;color: #afafaf">产品线：</div>
                        <div style="display: inline-block;vertical-align: middle;width: 200px;color: #afafaf">
                            {{ xiadan_line }}
                        </div>
                    </div>
                </div>
                <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right">媒介合同：</div>
                        <div style="display: inline-block">
                            <el-select size="mini" v-model="mht_value" placeholder="请选择">
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
                <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 75px;text-align: right">备注：</div>
                        <div style="display: inline-block">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea7">
                            </el-input>
                        </div>
                    </div>

                </div>
            </div>
            <div style="text-align: center;padding-bottom: 20px">
                <el-button type="primary" @click="add_metia_account()"  style="padding: 10px 15px;height: auto;width: auto;">确定</el-button>
                <el-button @click="addFormVisibleReceive7=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
</template>
<script>
    import { mapGetters } from 'vuex';
    import {productmcontract, updateaccountrenew,upmarginmht } from '@/api/kehu';


    import moment from "moment"
    export default {
        data() {
            return {
                addFormVisibleReceive7:false,
                shenheVal:[],
                shneheKey:0,
                disabledmj_Pull:false,
// 下单
                xiadan_line:"",
                textarea7:'',
                iszhuankuan:'',
                mht_value:'',
                mht_options:[],
                bondId:'',
                xf_id:'',
                account_id:'',

                upmarginmht(){
                    upmarginmht({
                        bondId:this.bondId,
                        id:this.mht_value,
                    }).then(response=> {
                        this.addFormVisibleReceive5 = false;

                        this.$emit('media_account');
                    }). catch(err => {this.$message.error(err);});
                },
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
                            this.$emit('xiadan_infor', {shenheInfor: {
                                    shenhe:this.shneheKey+1,
                                    audit:1,
                                    auditu:this.user.id,
                                    note:this.textarea7,
                                }});
                            this.addFormVisibleReceive7 = false;
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

            }
        },
        methods:{
            xiadanClick(val,key){
                this.shenheVal = val;
                this.shneheKey = key;
                this.addFormVisibleReceive7 = true;
                this.account_id = this.shenheVal.dataInfor.account;
                this.xf_id =  this.shenheVal.dataInfor.id;
                this.xiadan_line = this.shenheVal.dataInfor.contractinfo.contractproduct[0].name;
                this.productmcontract(this.shenheVal.dataInfor.contractinfo.contractproduct[0].id);
            },
            add_metia_account(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateaccountrenew();

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
                'roles',
                'audit_action'
            ])
        },

    }
</script>

