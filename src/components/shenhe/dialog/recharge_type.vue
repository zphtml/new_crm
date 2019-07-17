<template>
    <div>
        <el-dialog title="审核备注" :visible.sync="addFormVisibleReceive3"  @close="addFormVisibleReceive3=false" class="media_shenhe" size="tiny" >
            <div style="margin-bottom: 20px;">
                <div class="title">审核</div>
                <div class="xufei_a">
                    <p>选择该充值媒体打款情况:</p>
                    <el-radio v-model="addMedia" label="1" @change="addmediaChange" >直接打款给媒体</el-radio>
                </div>
                <div class="xufei_b">
                    <p>
                        从备款账户转入:
                    </p>
                    <el-radio-group v-model="addaccount" @change="addaccountChange(data)" v-for="(data,index) in beikuanaccount" :key="index" :disabled = addaccountDIsabled>
                        <el-radio  :label="data.id" style="display: block;width: 300px;">
                            {{data.a_users}}（余额(币):({{data.account_yue| currency('') }})
                            <span style="color: red;" v-if="Number(data.yu_e)<Number(xf_monet)">,余额不足</span>）
                        </el-radio>
                        <div style="padding-left: 50px" v-if="addaccount == data.id">
                            <span style="display: inline-block;width: 95px;font-size: 12px">转入金额(币)：</span>
                            <div style="display: inline-block;position:relative;" >
                                <input style="border: 1px solid #dcdfe6;width: 100%;line-height: normal; font-size: 12px;    height: 30px;padding-left:27px;outline: none;z-index:9"
                                       type="number" v-model="fk_money"
                                       name="mouse2"
                                       v-on:input="fk_moneyChange"
                                       onmousewheel="return false;">
                            </div>
                        </div>
                    </el-radio-group>
                </div>
                <div style="text-align: right">
                    <el-button type="primary" size="mini" @click="add_beikuan_account" >拆分</el-button>
                </div>
                <div>
                    <el-checkbox v-model="mediaChecked" :disabled = mediaDIsabled>该账户始终从该备款账户抵扣</el-checkbox>
                </div>

                <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;width: 75px;">备注：</div>
                        <div style="display: inline-block">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea3">
                            </el-input>
                        </div>
                    </div>

                </div>
            </div>
            <div style="text-align: left;padding-bottom: 20px">
                <el-button type="primary" @click="btnMedia()"  :disabled="disabledPull" style="padding: 10px 15px;height: auto;width: auto;">确定</el-button>
                <el-button @click="addFormVisibleReceive3=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
        <!--添加备款账户------------------------------------------------------------------------------------------------------------------------>
        <el-dialog title="拆分充值" :visible.sync="addFormVisibleReceive8"  @close="addFormVisibleReceive8 = false" class="media_shenhe" size="tiny" >
            <div style="text-align: left;margin: 10px 0">
                <span style="width: 73px;display: inline-block;font-size: 18px;font-weight: bold"> 账户币:</span>
                <span >
                    <span :style="{color:beikian_account_monry>0?'green':'red',fontSize:'18px',fontWeight:'bold'}">
                          {{beikian_account_monry}}
                    </span>
                </span>
            </div>
            <div style="text-align: left;margin-bottom: 10px" >
                <el-radio-group v-model="xufei_type_radio" @change="radio_type_change">
                    <el-radio :label="2">备款账户</el-radio>
                    <el-radio :label="1">直接打款给媒体</el-radio>
                </el-radio-group>
            </div>
            <div style="text-align: left">
                <span style="width: 73px;display: inline-block">媒介:</span>
                <el-select size="mini" v-model="media_list" @change="media_list_change" placeholder="请选择">
                    <el-option
                            v-for="item in media_list_data"
                            :key="item.id"
                            :label="item.advertiser"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div style="text-align: left;margin: 10px 0">
                <span style="width: 73px;display: inline-block">媒介合同:</span>
                <el-select size="mini" v-model="media_contract" @change="media_contract_change" placeholder="请选择">
                    <el-option
                            v-for="(item,key) in media_contractoptions"
                            :key="key"
                            :label="item.title"
                            :value="key">
                    </el-option>
                </el-select>
            </div>
            <div style="text-align: left;" v-if="xufei_type_radio == 2">
                <div>
                    <span style="width: 73px;display: inline-block">备款账户:</span>
                    <el-select size="mini" v-model="beikuan_account" placeholder="请选择" @change="add_beikuan_trable">
                        <el-option
                                v-for="(item,key) in beikuan_accountoptions"
                                :key="key"
                                :label="item.a_users"
                                :value="key">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 5px 80px" :style="{color:Number(beikuan_account_yu_e)<0?'red':'green'}">
                    余额(币)： {{beikuan_account_yu_e}}
                </div>
            </div>
            <div style="margin: 5px 0 ">
                <span style="width: 73px;display: inline-block">转入币:</span>
                <el-input  v-model="beikuan_money" size="mini" style="display: inline-block;width: 180px"></el-input>
                <el-button style="float: right" type="primary" size="mini" @click="btn_account">添加</el-button>
            </div>
            <div>
                <el-table
                        highlight-current-row   border
                        :data="beikuanTable"
                        class="vue-table"
                        height="200"
                        style="width: 100%;">
                    <el-table-column
                            label="类型">
                        <template slot-scope="scope">
                        <span v-if="scope.row.radio_type == 2">
                           备款账户
                        </span>
                            <span v-else>
                           直接打款给媒体
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="媒介合同">
                        <template slot-scope="scope">
                            {{scope.row.meijie_a_users|| ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="备款账户">
                        <template slot-scope="scope">
                            {{scope.row.a_users|| '--'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="转入币">
                        <template slot-scope="scope">
                            {{ scope.row.beikuan_money}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="删除">
                        <template slot-scope="scope">
                            <div style="text-align: center;color: red"  >
                                <i class="el-icon-delete" @click="delete_beikuan(scope.row.id,scope)" style="font-size: 12px"  ></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: center;padding: 20px 0">
                <el-button type="primary" :disabled="beikuan_disabledPull" @click="pull_beikuan_account()" style="padding: 10px 15px;height: auto;width: auto;">确定</el-button>
                <el-button @click=" addFormVisibleReceive8 = false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>
    </div>


</template>
<script>
    import { mapGetters } from 'vuex';
    import { renew_beikuan_account } from '@/api/money';
    import { company_productline_contracts,product_line_company} from '@/api/kehu';
    import { productmcontract,upmarginmht } from '@/api/kehu';
    export default {
        data() {
            return {
                addFormVisibleReceive3:false,
                addMedia:'',
                addaccount:'',
                mediaDIsabled:true,
                mediaChecked:false,
                beikuanaccount:[],
                textarea3:'',
                disabledPull:false,




                addFormVisibleReceive8:false,
                xufei_type_radio:2,
                beikuanTable:[],
                new_beikuanTable:{},
                beikuan_money:0,
                beikuan_disabledPull:false,
                shenheVal:[],
                shneheKey:0,
                textarea:'',
                beikian_account_monry:'',
                fk_money:'',
                media_id:'',
                media_list:'',
                media_list_data:[],
                media_contract:'',
                media_contractoptions:[],

                beikuan_account:'',
                beikuan_account_yu_e:0,
                beikuan_accountoptions:[],
                product_line_company:function(page,num,val){
                    product_line_company({
                        product_line:this.shenheVal.dataInfor.contractinfo.contractproduct[0].id,
                    }).then(response => {
                        this.media_list_data = response.data
                    }). catch(err => {this.$message.error('获取失败');});

                },
                company_productline_contracts:function(val){
                    company_productline_contracts({
                        customer_id:val,
                        product_line:this.shenheVal.dataInfor.contractinfo.contractproduct[0].id,
                    }).then(response => {
                        this.media_contractoptions = response.data
                    }). catch(err => {this.$message.error('获取失败');});

                },
                mht_value:'',
                addaccountDIsabled:false,
                xf_monet:"",
                disabledmj_Pull:false,
                show_money:'',
// 下单
//退款
                addMedia_tuikuan:'0',
                textarea4:'',
                renew_beikuan_account:function(id,val='n'){
                    if(this.shenheVal.dataInfor.account0.mht_id){
                        renew_beikuan_account({
                            id:id,
                            account:this.shenheVal.a_users,
                        }).then(response => {
                            if(val == 'chai'){
                                this.beikuan_accountoptions = response;
                                this.beikuan_account = '';
                                this.new_beikuanTable = {};
                                this.beikuan_account_yu_e = 0;

                            }else{
                                this.addMedia = "0";
                                this.beikuanaccount = response;
                                if(response.length>0){
                                    for(let a = 0;a<response.length;a++){
                                        if(response[a].selected == 1){
                                            this.addaccount = response[a].id;
                                            this.mediaDIsabled = false;
                                            this.mediaChecked = true;
                                            this.addMedia = "";
                                            return
                                        }else{
                                            this.addMedia = "1";
                                            this.addaccount = '';
                                        }
                                    }
                                }else{
                                    this.addMedia = "1";
                                }
                            }


                        }).catch(error => {
                        });
                    }
                },
            }
        },
        methods:{
            beikuanClick(val,key){
                this.addFormVisibleReceive3 = true;
                this.shenheVal = val;
                this.renew_beikuan_account(this.shenheVal.dataInfor.account0.mht_id);
                this.fk_money = this.shenheVal.dataInfor.show_money;
                this.show_money =  this.shenheVal.dataInfor.show_money;
                this.xf_monet = this.shenheVal.xf_monet;
                this.shneheKey = key;
            },
            //充值，下单 直接打款给媒体
            addmediaChange(){
                this.addaccount ="";
                this.mediaChecked = false;
                this.mediaDIsabled = true;
            },
            //充值，下单   从备款账户转入
            addaccountChange(val){
                this.addMedia = "0";
                this.mediaDIsabled = false;
                if(val.selected == 1){
                    this.mediaChecked = true;
                }else{
                    this.mediaChecked = false;
                }
            },
            //充值，下单 转入金额
            fk_moneyChange(){
                if(Number(this.fk_money)>Number(this.show_money)){
                    this.fk_money = this.show_money;
                }else  if(Number(this.fk_money)<0){
                    this.fk_money = 0;
                }else if(this.fk_money === ''){
                    this.fk_money = 0;
                }
            },
            //提交
            btnMedia(){
                this.disabledPull = true;
                let beikuan_account_gl = "";
                if(this.mediaChecked){
                    beikuan_account_gl = 1;
                }else{
                    beikuan_account_gl = 0;
                }

                if(this.shenheVal.dataInfor.contractinfo.mht == null){
                    this.$message({
                        message: '请选择当前媒介合同',
                        type: 'warning'
                    });
                }else{
                    let add_account_beikuan = {};
                    if(this.addMedia != 1){
                        add_account_beikuan['fk_money'] = Number(this.fk_money)/(1+(Number(this.shenheVal.dataInfor.contractinfo.contract_fdinfo.fandian)/100))*(1-(Number(this.shenheVal.dataInfor.contractinfo.contract_fdinfo.xj_fandian)/100))
                    }
                    add_account_beikuan['mht_id'] = this.shenheVal.dataInfor.contractinfo.mht.id;
                    add_account_beikuan['beikuan_account_id'] = this.addaccount;
                    let data ={
                        shenhe:this.shneheKey+1,
                        audit:1,
                        is_chaifen:0,
                        auditu:this.user.id,
                        note:this.textarea3,
                        beikuan_account_data:[add_account_beikuan],
                        beikuan_account_gl:beikuan_account_gl
                    };
                    this.$emit('recharge_infor', {shenheInfor: data});
                    this.addFormVisibleReceive3 = false;
                }


            },

//            ==============================================================拆分
//充值，下单 添加备款战鼓
            add_beikuan_account(){
                this.beikuan_money = 0;
                this.media_list = '';
                this.media_contract = '';
                this.beikuanTable = [];
                this.new_beikuanTable = {};
                this.beikuan_account = "";
                this.beikuan_accountoptions = [];
                this.media_contractoptions = [];
                this.beikuan_accountoptions = [];
                this.beikian_account_monry = this.shenheVal.dataInfor.show_money;
                this.product_line_company();
                this.beikuan_disabledPull = false;
                this.addFormVisibleReceive8 = true;
            },


            // 选择媒介
            media_list_change(val){
                this.media_contract = '';
                this.beikuan_account = "";
                this.beikuan_accountoptions = [];
                this.beikuan_account_yu_e = 0;
                this.company_productline_contracts(val);
            },

// 选择备款账户
            radio_type_change(val){
                if(val == 2){
                    this.media_id != ''?this.renew_beikuan_account( this.media_id,'chai'):'';
                }else{
                    this.media_contract = '';
                }
            },
//选择媒介合同
            media_contract_change(val){
                this.beikuan_account_yu_e = 0;
                this.media_id = this.media_contractoptions[val].id;
                if(this.xufei_type_radio == 2){
                    this.renew_beikuan_account(this.media_contractoptions[val].id,'chai')
                }else{
                    this.media_contractoptions[val].mht_id = this.media_contractoptions[val].id;
                    this.media_contractoptions[val].newid = '';
                    this.media_contractoptions[val].radio_type = 1;
                    this.media_contractoptions[val].a_users = '';
                    this.media_contractoptions[val].meijie_a_users = this.media_contractoptions[val].title;
                    this.new_beikuanTable = this.media_contractoptions[val];
                }
            },
//添加备款账户
            add_beikuan_trable(val){
                this.beikuan_accountoptions[val].mht_id =this.media_contractoptions[this.media_contract].id;
                this.beikuan_accountoptions[val].newid = this.beikuan_accountoptions[val].id;
                this.beikuan_accountoptions[val].meijie_a_users = this.media_contractoptions[this.media_contract].title;

                this.beikuan_accountoptions[val].radio_type = 2;
                this.beikuan_account_yu_e =   this.beikuan_accountoptions[val].account_yue;
                this.new_beikuanTable = this.beikuan_accountoptions[val];
            },
            //添加
            btn_account(){
                if(Number(this.beikuan_money)>Number(this.beikian_account_monry)){
                    this.$message({
                        message: '输入金额不能大于账户币',
                        type: 'warning'
                    });
                }else if(Number(this.beikuan_account_yu_e)-Number(this.beikuan_money)<0 && this.xufei_type_radio == 2){
                    this.$message({
                        message: '输入金额不能大于备款账户（币）',
                        type: 'warning'
                    });
                }else{
                    if(Object.keys(this.new_beikuanTable ).length>0){
                        this.new_beikuanTable.beikuan_money = this.beikuan_money;
                        this.beikuanTable.unshift(this.new_beikuanTable)
                    }
                    console.log( this.beikuanTable)
                    let obj = {};
                    let data =  this.beikuanTable.reduce((cur,next) => {
                        obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
                        return cur;
                    },[])
                    this.beikuanTable = data;
                    let sum = 0;
                    for(let a in this.beikuanTable){
                        sum+=Number(this.beikuanTable[a].beikuan_money);
                    }
                    this.beikian_account_monry =  Number( this.shenheVal.dataInfor.show_money)-sum;
                }
            },
            //提交
            pull_beikuan_account(){

                let _this = this;
                if( this.beikuanTable.length == 0){
                    this.$message({
                        message: '请选择备款账户/媒介合同',
                        type: 'warning'
                    });
                }else if( this.beikian_account_monry != 0){
                    this.$message({
                        message: '未分配完或者超出分配金额',
                        type: 'warning'
                    });
                }else{
                    this.beikuan_disabledPull = true;
                    let add_pull_beikuan_data = [];
                    let _this = this;
                    this.beikuanTable.map(function (item) {
                        add_pull_beikuan_data.push({
                            mht_id:item.mht_id,
                            fk_money:Number(item.beikuan_money)/(1+(Number(_this.shenheVal.dataInfor.contractinfo.contract_fdinfo.fandian)/100))*(1-(Number(_this.shenheVal.dataInfor.contractinfo.contract_fdinfo.xj_fandian)/100)),
                            beikuan_account_id:item.newid,
                        })
                    });
                    let data ={
                        is_chaifen:1,
                        shenhe:this.shneheKey+1,
                        audit:1,
                        auditu:this.user.id,
                        note:this.textarea3,
                        beikuan_account_data:add_pull_beikuan_data,
                        beikuan_account_gl:0
                    };
                    this.$emit('caifen_type', {shenheInfor: data});
                    this.addFormVisibleReceive8 = false;
                    this.addFormVisibleReceive3 = false;
                }
            },

// 删除
            delete_beikuan(id,scope){
                this.beikuanTable.splice(scope.$index,1);
                let sum = 0;
                for(let a in this.beikuanTable){
                    sum+=Number(this.beikuanTable[a].beikuan_money);
                }
                this.beikian_account_monry =  Number( this.shenheVal.dataInfor.show_money)-sum;

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

