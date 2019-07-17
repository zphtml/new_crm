<template>
    <el-col >


        <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive6"  @close="addFormVisibleReceive6=false" class="media_shenhe" size="tiny" >
            <div >
                <el-button  style="padding: 5px 15px;height: auto;width: auto;margin-bottom: 10px" type="primary" @click="meijie_htclick">修改账户当前媒介合同</el-button>
            </div>
            <div style="margin-bottom: 20px;">
                <span style="display: inline-block;width: 75px;height: 30px;line-height: 30px;text-align: right;color: #9c9c9c">审核备注</span>
                <span style="display: inline-block;height: 30px;line-height: 30px;margin-left:20px;">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </span>
            </div>
            <div style="text-align: right;padding-bottom: 20px">
                <el-button type="primary" @click="tbn"  :disabled="disabledPull" style="padding: 10px 15px;height: auto;width: auto">确定</el-button>
                <el-button @click="addFormVisibleReceive6=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
        <!-- 修改账户当前媒介合同（保证金）------------------------------------------------------------------------------------------------------------------------->
        <el-dialog title="修改账户当前媒介合同" :visible.sync="addFormVisibleReceive5"  @close="addFormVisibleReceive5=false" class="media_shenhe" size="tiny" >
            <div style="margin-bottom: 20px;">
                <div style="display: inline-block;height: 30px;line-height: 30px;    width: 100%;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right">账户：</div>
                        <div style="display: inline-block;vertical-align: middle;width: 200px;">
                            <el-radio-group v-model="checkList" @change="mht_account_change(data,key)" v-for="(data,key) in accountData"  :key="key" >
                                <el-radio :label="key" style="display: block;margin:0 0 5px 0 ;width: 230px" >{{data}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 80px;text-align: right">媒介合同：</div>
                        <div style="display: inline-block">
                            <el-select size="mini" style="width: 250px" v-model="mht_value" placeholder="请选择">
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
                <el-button @click="addFormVisibleReceive5=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>

    </el-col>

</template>
<script>
    import { mapGetters } from 'vuex';
    import { renew_beikuan_account } from '@/api/money';
    import { productmcontract ,upmarginmht,updateaccountrenew} from '@/api/kehu';

    export default {
        data() {
            return {
                xf_id:'',
                type:'',
                addFormVisibleReceive6:false,
                addFormVisibleReceive5:false,
                bondId:'',
                account_id:"",
                shenheVal:[],
                textarea:'',
                disabledPull:false,
                checkList:0,
                shneheKey:0,
                iszhuankuan:'',
                accountData:[],
  //修改媒介合同
                mht_value:'',
                mht_options:[],
                productmcontract:function(dataId){
                    productmcontract({
                        id:dataId,
                    }).then(response=> {
                        this.mht_options = response;
                    }). catch(err => {this.$message.error(err);});
                },
                upmarginmht(){
                    this.addFormVisibleReceive5 = false;
                    upmarginmht({
                        bondId:this.bondId,
                        id:this.mht_value,
                    }).then(response=> {

                        this.$emit('shenhe_media_account');
                    }). catch(err => {this.$message.error(err);});
                },
                updateaccountrenew(){
                    this.addFormVisibleReceive5 = false;

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
                            this.$emit('shenhe_zhuan_account');
                        }else{
                            this.disabledmj_Pull = false;
                        }
                    }). catch(err => {this.$message.error(err);this.disabledmj_Pull = false;});
                },
            }
        },
        methods:{
            mediaContract_click(val,key,type){
                this.type = type;
                this.shenheVal = val;
                this.accountData = [];
                this.shneheKey = key;
                this.textarea = '';
                if( this.type  == 'isbond'){
                    this.accountData.push(this.shenheVal.dataInfor.contractinfo.contractproduct[0].name);
                }else if( this.type  == 'iszhuankuan'){
                    this.account_id = this.shenheVal.dataInfor.data.zczhanghu.id;
                    this.accountData.push(this.shenheVal.dataInfor.data.zczhanghu.a_users,this.shenheVal.dataInfor.data.zrzhanghu.a_users);
                    this.iszhuankuan = "1";
                    this.xf_id = this.shenheVal.dataInfor.data.id;

                }
                this.bondId = this.shenheVal.dataInfor.id;
                this.addFormVisibleReceive6 = true;
                this.disabledPull = false;
            },
            tbn(){
                this.disabledPull = true;
                this.addFormVisibleReceive6 = false;
                this.$emit('mediaContract_infor', {shenheInfor: {
                        shenhe:this.shneheKey+1,
                        audit:1,
                        auditu:this.user.id,
                        note:this.textarea2,
                    }});
            },
//            保证金
            // 修改媒介合同
            meijie_htclick(){
                this.addFormVisibleReceive5 = true;
                this.addFormVisibleReceive6 = false;
                if( this.type  == 'isbond'){
                    this.productmcontract(this.shenheVal.dataInfor.contractinfo.contractproduct[0].id)

                }else if( this.type  == 'iszhuankuan'){
                    this.productmcontract(this.shenheVal.dataInfor.contract_zhuanchu.mht.product_line);
                }
            },

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
            //下单判定提交---------------------------------------------------------------------------
            add_metia_account(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.shenheVal.xufei == "isbond"){
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
                'roles',
                'audit_action'
            ])
        },
    }
</script>

