<template>
    <el-row  class="operation">
        <el-row   v-for="(data,index) in operation" :key="index">
            <el-col :span="24" >
                <el-col :span="3" class="left_operation">
                    <p class="title">余额</p>
                    <p class="num">
                        {{Number( data.balance) | currency('') }}

                    </p>
                </el-col>
                <el-col :span="21" class="right_operation">
                            <div class="list">
                                <div class="left list_next">
                                    <span class="title">充值相关</span>
                                    <span class="name">
                                        <span class="money_name">
                                            认款
                                        </span>
                                     <span style="font-size: 12px;color: black">
                                           {{ data.huikuan | currency('') }}
                                     </span>
                                    </span>
                                    <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                         <span class="title_name" @click="shiftTo()">转入</span>
                                        <span class="title_name" @click="rollOut()">转出</span>
                                    </span>

                                </div>
                               <div class="right right_line list_next">
                                   <span class="name">
                                         <span class="money_name">
                                           充值
                                       </span>
                                       <span style="font-size: 12px;color: black">
                                              {{ data.yu_e  | currency('') }}
                                       </span>

                                   </span>
                                   <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                        <span v-if="data.iszuofei != 2">
                                            <span class="title_name"  @click="jumpOrders()">下单</span>
                                            <span class="title_name"  @click="jumpxufei()" >充值</span>
                                        </span>
                                        <span class="title_name" @click="jumptuikuan()">退款</span>
                                        <span class="title_name" @click="jumpzhuankuan()">转款</span>
                                   </span>

                               </div>



                            </div>
                    <div class="list">
                        <div class="left list_next">
                                <span class="title">补款相关</span>
                                <span class="name">
                               <span class="money_name">
                                        公司补款
                                    </span>
                                     <span style="font-size: 12px;color: black">
                                          {{ data.bukuan | currency('')  }}
                                    </span>

                                </span>
                            <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                 <span class="title_name" @click="jumpbukuan_money()">补款</span>
                            </span>

                                <span class="infor">注:公司给客户补款</span>
                        </div>
                        <div class="left right_line list_next">
                               <span class="name">
                                  <span class="money_name">
                                    客户罚款
                                </span>
                                    <span style="font-size: 12px;color: black">
                                        {{ data.kehu_bukuan | currency('')  }}
                                   </span>

                               </span>
                            <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                 <span class="title_name" @click="jump_bukuan()">罚款</span>
                            </span>

                            <span class="infor">注:客户给我们罚款</span>
                        </div>

                     </div>
                    <div class="list">
                        <div class="left list_next">
                            <span class="title">保证金</span>
                            <span class="name">
                                 <span class="money_name">
                                    保证金
                                </span>
                                  <span style="font-size: 12px;color: black">
                                       {{ data.margin_money | currency('') }}
                                </span>
                            </span>
                            <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                <span class="title_name" @click="bond_shiftTo()">转入</span>
                                <span class="title_name" @click="bond_rollOut()">转出</span>
                            </span>
                        </div>
                        <div class="left right_line list_next">
                             <span class="name">
                                 <span class="money_name">
                                    保证金余额
                                </span>
                                 <span style="font-size: 12px;color: black">
                                       {{ data.margin_yue | currency('') }}
                                 </span>
                             </span>
                            <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                <span class="title_name" @click="jumpbond()">付款</span>
                            </span>
                            <span class="infor">注:给媒体付保证金</span>
                        </div>
                     </div>

                    <div class="list">
                        <div class="left list_next">
                            <span class="title">打款相关</span>
                            <span class="name" v-if="data.advertiser0.customer_type == 2">
                                <span class="money_name">
                                    渠道打款
                                </span>
                                  <span style="font-size: 12px;color: black">
                                {{Number( data.qd_money)| currency('') }}
                                </span>
                                </span>
                            <span class="name" v-if="data.advertiser0.customer_type == 1">个人打款    {{Number( data.qd_money)| currency('') }}</span>
                            <span v-if="data.iszuofei != 1 && data.audit != 0 && data.is_ultimate_shenhe != 0">
                                  <span v-if="data.iszuofei != 2">
                                    <span class="title_name"  @click="jumpqudao()">渠道打款</span>
                                   </span>
                            </span>

                        </div>
                     </div>
                </el-col>
            </el-col>

        </el-row>
        <!--弹窗 转入-->
        <el-dialog title="认款转入"  :visible.sync="addFormVisible1" @close="addFormVisible1 = false"  :close-on-click-modal="false" class="tan_shiftTo" >

            <ul class="shiftTo" >
                <li>
                    <p class="first_p"> <el-radio       size="mini" v-model="from_tuikuan" label="0">未分配余额</el-radio></p><p class="last_p"> {{ undistributed_yu_e | currency('') }} </p>
                </li>
                <li>
                    <p class="first_p"><el-radio v-model="from_tuikuan" label="1">未使用退款</el-radio></p><p class="last_p"> {{ tuikuan_undistributed_yu_e | currency('') }}</p>
                </li>
                <li>
                    <p  class="first_p">转入</p>
                    <p class="last_p" style="position: relative">
                        <el-input class="tan_input" type="text" ></el-input>
                        <input style="line-height: normal; border: none;font-size: 12px;height: 23px; position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                               type="number" v-model="shiftToInput"
                               name="mouse2"
                               v-on:input="Number(shiftToInput)<0?shiftToInput=0:shiftToInput"
                               placeholder="输入金额"
                               onmousewheel="return false;">
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanru" :disabled="shiftToInput==''">确 定</el-button>
                        <el-button @click="addFormVisible1 = false" >取 消</el-button>
			</span>
        </el-dialog>
        <!--弹窗 补款-->
        <el-dialog :title="type_lx"  :visible.sync="addFormVisible3" @close="addFormVisible3 = false"  :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo" v-for="(data,index) in inforData" :key="index">
                <li>
                    <p  class="first_p"><span style="color: red;font-size: 14px"> *</span>转入金额</p>
                    <p class="last_p" style="position: relative">
                        <el-input class="tan_input" type="text" ></el-input>
                        <input style="line-height: normal; border: none;font-size: 12px;height: 23px; position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                               type="number" v-model="shiftToInput"
                               name="mouse2"
                               placeholder="单行输入"
                               onmousewheel="return false;">
                    </p>
                </li>
                <li >
                    <p class="first_p"  style="vertical-align: top;"><span style="color: red;font-size: 14px"> *</span>转入说明</p>
                    <p class="last_p">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="note">
                        </el-input>
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanru('bu')" :disabled="disabledPull">确 定</el-button>
                        <el-button @click="addFormVisible3 = false" >取 消</el-button>
			</span>
        </el-dialog>

        <!--弹窗 转出-->
        <el-dialog title="转出"  :visible.sync="addFormVisible" @close="addFormVisible = false"  :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo" v-for="(data,index) in zhuanchuData" :key="index">
                <li>
                    <p class="first_p">广告主名称</p>
                    <p class="last_p">
                        <el-select v-model="out_name_ggz" clearable  placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in out_ggzoptions"
                                    :key="item.advertiser"
                                    :label="item.advertiser"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </li>
                <li v-if="isBond">
                    <p class="first_p">余额</p><p class="last_p">
                    {{Number( data.margin_yue) | currency('') }}
                </p>
                </li>
                <li v-else>
                    <p class="first_p">余额</p><p class="last_p">
                    {{Number( data.huikuan)+Number(data.bukuan)- Number( data.yu_e) | currency('') }}
                </p>
                </li>
                <li>
                    <p  class="first_p">转出</p>
                    <p class="last_p" style="position: relative">
                        <el-input class="tan_input" type="text"></el-input>
                        <input style="line-height: normal; border: none;font-size: 12px;height: 23px;padding-left: 10px ;position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                               type="number" v-model="outInput"
                               name="mouse2"
                               placeholder="单行输入"
                               onmousewheel="return false;">
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pullzhuanchu" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
        </el-dialog>
        <!--弹窗 保证金转入-->
        <el-dialog title=" 保证金转入"  :visible.sync="addFormVisible1_bond" @close="addFormVisible1_bond = false"  :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo" v-for="(data,index) in inforData" :key="index">
                <li>
                    <p class="first_p" style="font-weight: bold;font-size: 14px">转入类型</p>
                    <p class="last_p" style="font-weight: bold;font-size: 14px">
                        保证金
                    </p>
                </li>
                <li >
                    <p class="first_p"  style="vertical-align: top;">说明</p>
                    <p class="last_p">
                        <el-input
                                type="textarea"

                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="note">
                        </el-input>
                    </p>
                </li>
                <li>
                    <p class="first_p">广告主名称</p>
                    <p class="last_p">
                        <el-select v-model="name_ggz" clearable  placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in ggzoptions"
                                    :key="item.advertiser"
                                    :label="item.advertiser"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </li>
                <li>
                    <p class="first_p">可认领余额</p><p class="last_p"> {{ undistributed_yu_e | currency('') }}</p>
                </li>
                <li>
                    <p  class="first_p">转入</p>
                    <p class="last_p" style="position: relative">
                        <el-input class="tan_input" type="text" ></el-input>
                        <input style="line-height: normal; border: none;font-size: 12px;height: 23px; position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                               v-on:input ="bond_num"
                               type="number" v-model="shiftToInput"
                               name="mouse2"
                               placeholder="单行输入"
                               onmousewheel="return false;">
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanru('bao')" :disabled="disabledPull">确 定</el-button>
                        <el-button @click="addFormVisible1_bond = false" >取 消</el-button>
			</span>
        </el-dialog>
        <!--弹窗 延期-->
        <el-dialog title="延期"  :visible.sync="addFormVisible2" @close="addFormVisible2 = false"  :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo">
                <li>
                    <p class="first_p">结束日期</p><p class="last_p"> {{ contract_end |  ctimeData}}</p>
                </li>
                <li>
                    <p  class="first_p">延长日期</p>
                    <p class="last_p">
                        <el-date-picker  :clearable='false'
                                         v-model="dateInput"
                                         type="date"
                                         placeholder="选择日期"
                                         class="yanqi">
                        </el-date-picker>
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pull_yq" >确 定</el-button>
                        <el-button @click="addFormVisible2 = false">取 消</el-button>
			</span>
        </el-dialog>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { contract_yanqi,zhuankuan_marigin,contract_jieshu,contract_zuofei,customer_advertiser_list,fphuikuanru ,fphuikuanConsole,zhuankuan_marginru,zhuankuan,zhuankuanruPost} from '@/api/kehu';
     import moment from "moment"
    let out_id = '';
    export default {
        data() {
            return {
                routeId:'',
                operation:[],
                inforData:[],
//  结束
                contract_jieshu(){
                    contract_jieshu({
                        data: this.routeId,
                    }).then(response => {
                        this.$emit('operactionChange');
                    }). catch(err => {this.$message.error(err);});
                },
//  作废
                contract_zuofei(id){
                    contract_zuofei({
                        data: this.routeId,
                    }).then(response => {
                        this.$emit('operactionChange');
                    }). catch(err => {this.$message.error(err);});
                },
// 客户补款
                addFormVisible3:false,
// 资金池转入
                addFormVisible1:false,
                ggzoptions:[],
                out_ggzoptions:[],
                type_lx:'认款  ',
                backmoney_type:"1",
                lxoptions:[
                    {
                        name:'认款  ',
                        id:'1',
                    },
                ],
                bkoptions:[
                    {
                        name:'客户补款',
                        id:'3',
                    },
                ],
                note:'',
                name_ggz:'',
                from_tuikuan:'0',
                undistributed_yu_e:'',
                tuikuan_undistributed_yu_e:'',
                shiftToInput:'',
                disabledPull:false,
                fphuikuanConsole:function(data){
                    fphuikuanConsole({
                        data:this.operation[0].advertiser,
                        id: this.routeId,
                    }).then(response => {
                        this.inforData = [];
                        response.contract_list[0]['hetong_yu_e'] =Number( response.contract_list[0].huikuan)+Number( response.contract_list[0].bukuan)- Number( response.contract_list[0].yu_e);
                        this.inforData.push(response.contract_list[0]);
                        this.advertiserName = response.costomer.advertiser;
                        this.undistributed_yu_e = response.costomer.undistributed_yu_e;
                        this.tuikuan_undistributed_yu_e = response.costomer.tuikuan_undistributed_yu_e;
                    }). catch(err => {this.$message.error(err);});
                },
                customer_advertiser_list:function(){
                    customer_advertiser_list({
                        id:this.operation[0].advertiser,
                    }).then(response => {
                        this.ggzoptions = response.list;
                        this.out_ggzoptions = response.list;
                    }). catch(err => {this.$message.error(err);});
                },
                fphuikuanru:function(data){
                    fphuikuanru({
                        data:data,
                    }).then(response => {
                        if(response.code== '200'){
                            this.$message({
                                type: 'success',
                                message: response.msg
                            });
                            this.addFormVisible3 = false;
                            this. disabledPull = false;
                        }else{
                            this.$message.error(response.msg);
                            this. disabledPull = false;

                        }

                    }). catch(err => {this.$message.error(err);this. disabledPull = false;
                    });
                },
                tan(data) {
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.fphuikuanru(data);
                        this.addFormVisible1 = false;
                        this.addFormVisible1_bond = false;
                        this. disabledPull = true;
                        this.$emit('operactionChange');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                        this. disabledPull = false;

                    });
                },
                zhuankuan_marginru:function(data){
                    zhuankuan_marginru({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '转出成功',
                                type: 'success'
                            });
                            this.$emit('operactionChange');
                        }
                    }). catch(err => {this.$message.error(err);});
                },
                zhuankuanruPost:function(data){
                    zhuankuanruPost({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '转出成功',
                                type: 'success'
                            });
                            this.$emit('operactionChange');

                        }
                    }). catch(err => {this.$message.error(err);});
                },
// 资金池转出
                addFormVisible:false, //转出
                zhuanchuData:[],
                out_name_ggz:'',
                out_ggzoptions:[],
                isBond:false,
                outInput:'',
                z_yu_e:'',
                zhuankuan(){
                    zhuankuan({
                        id: this.routeId,
                    }).then(response => {
                        if(response.code == 500){
                            this.$message({
                                message: response.msg ,
                                type: 'warning'
                            });
                        }else{
                            this.zhuanchuData = [];
                            this.z_yu_e = Number( response.contractinfo.huikuan)+Number(response.contractinfo.bukuan)- Number( response.contractinfo.yu_e);
                            this.zhuanchuData.push(response.contractinfo);
                            this.addFormVisible = true;
                        }
                    }). catch(err => {this.$message.error(err);});
                },
//保证金转入
                addFormVisible1_bond:false,
// 保证金转出
                zhuankuan_marigin(){

                    zhuankuan_marigin({
                        id: this.routeId,
                    }).then(response => {
                        if(response.code == 500){
                            this.$message({
                                message: response.msg ,
                                type: 'warning'
                            });
                        }else{
                            this.zhuanchuData = [];
                            this.z_yu_e = response.contractinfo.margin_money;
                            this.zhuanchuData.push(response.contractinfo);
                            this.addFormVisible = true;
                        }
                    }). catch(err => {this.$message.error(err);});
                },
//归档弹窗
                tanInfor(dataText,dataName) {
                    this.$confirm(dataText,dataName , {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                      if(dataName == '结束'){

                            this.contract_jieshu()
                        }else if(dataName == '作废'){
                            this.contract_zuofei()
                        }

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                },
//延期
                addFormVisible2:false,//延期
                dateInput:'',
                yanqiData:'',
                contract_end:'',
                contract_yanqi:function(id,date){
                    contract_yanqi({
                        id:id,
                        date:date,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                showClose: true,
                                message: response.mes ,
                                type: 'success'
                            });
                            this.$emit('operactionChange');
                        }else{
                            this.$message({
                                showClose: true,
                                message: '提交失败',
                                type: 'error'
                            });
                        }

                    }). catch(err => {this.$message.error(err);});
                },
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'accounts',
            ])
        },
        mounted(){
            this.routeId = this.$route.query.id;
        },
        watch:{
            item(val){
                this.routeId = this.$route.query.id;
                this.operation = [];
                this.operation.push(val)
            },
        },

        methods: {
//账户
            //查看
            accountList(val){
                this.$router.push({ name: 'accountList',query: { id:  this.routeId,gsId:this.operation[0].advertiser} });
            },
// 结束
            over(){
                this.tanInfor('确认结束此合同，将不可恢复, 是否继续?','结束',);
            },
// 作废
            abolish(){

        if(Number(this.operation[0].huikuan)==0&& Number(this.operation[0].bukuan)==0 && Number(this.operation[0].yu_e)==0&& Number(this.operation[0].kehu_bukuan)==0
            && Number(this.operation[0].margin_money)==0&& Number(this.operation[0].margin_yue)==0 && Number(this.operation[0].qd_money)==0){
            this.tanInfor('确认作废此合同，将不可恢复, 是否继续?','作废');
                }else{
            this.$message({
                message: '系统检测账户有金额，无法作废',
                type: 'warning'
            });

                }

            },
//下单
            jumpOrders(val){
                this.$router.push({ name: 'orders',query: { id:  this.routeId} });
            },
// 充值
            jumpxufei(val){
                this.$router.push({ name: 'renewal' ,query: { id:  this.routeId}});
            },
// 退款
            jumptuikuan(val){
                this.$router.push({ name: 'refund' ,query: { id:  this.routeId}});
            },
// 转款
            jumpzhuankuan(val){
                this.$router.push({ name: 'TransferOfFunds' ,query: { id:  this.routeId}});
            },
// 补款
            jumpbukuan(val){
                this.$router.push({ name: 'filling',query: { id:  this.routeId}});
            },
// 补账户币
            jumpbukuan_money(val){
                this.$router.push({ name: 'fillingaccountMoney' ,query: { id:  this.routeId}});
            },
// 渠道打款
            jumpqudao(val){
                this.$router.push({ name: 'AddChannelsMoney' ,query: { id:  this.routeId}});
            },
            jumpbond(val){
                this.$router.push({ name: 'addBond' ,query: { id: this.routeId}});
            },
// 资金转入
            shiftTo(val){
                this.fphuikuanConsole();
                this.customer_advertiser_list();
                this.addFormVisible1 = true;
                this.name_ggz = '';
                this.type_lx = '认款  ';
                this.shiftToInput = "";
                this.note = "";
                this.backmoney_type = "1";
            },
            jump_bukuan(){
                this.fphuikuanConsole();
                this.customer_advertiser_list();
                this.addFormVisible3 = true;
                this.name_ggz = '';
                this.type_lx = '客户补款  ';
                this.shiftToInput = "";
                this.note = "";
                this.backmoney_type = "3";
            },

            pingzhang(val){
                if(val){
                    this.shiftToInput  =  val;
                }else{
                    this.shiftToInput  =  '';
                }
            },
            pullzhuanru(val){
                let data = {
                    "advertiser":this.operation[0].advertiser,
                    "ht_id":[],
                    "pmoney":[],
                    'backmoney_type':this.backmoney_type,
                    'cu_ad_id':this.name_ggz,
                    'note':this.note,
                };
                data.ht_id.push(this.inforData[0].id);
                data.pmoney.push(this.shiftToInput);
                if(val == 'bu' ){
                     if(this.shiftToInput == ''){
                        this.$message({
                            message: '转入金额不能为空',
                            type: 'warning'
                        });
                    }else if(this.note == ''){
                        this.$message({
                            message: '转入说明不能为空',
                            type: 'warning'
                        });
                    } else{
                        this.tan(data);
                    }

                }else if(val == 'bao' ){
                    this.tan(data);
                }else{
                    data.from_tuikuan = this.from_tuikuan;
                    if(this.from_tuikuan == 0){
                        if(Number(this.shiftToInput)>this.undistributed_yu_e){
                            this.$message({
                                message: '警告哦，转入金额不可大于'+this.undistributed_yu_e,
                                type: 'warning'
                            });
                        }else{
                            this.tan(data);
                        }
                    }else{
                        if(Number(this.shiftToInput)>this.tuikuan_undistributed_yu_e){
                            this.$message({
                                message: '警告哦，转入金额不可大于'+this.tuikuan_undistributed_yu_e,
                                type: 'warning'
                            });
                        }else{
                            this.tan(data);
                        }
                    }

                }

            },
//资金转出
            rollOut(){
                this.isBond = false;
                out_id =  this.routeId;
                this.zhuankuan();
                this.out_name_ggz = '';
                this.customer_advertiser_list();
            },
            pullzhuanchu(){
                if(Number(this.outInput)> Number(this.z_yu_e)){
                    this.$message({
                        message: '警告哦，转出金额不可大于'+this.z_yu_e,
                        type: 'warning',

                    });
                }else{
                    let data = {
                        id:out_id,
                        money:this.outInput,
                        'cu_ad_id':this.out_name_ggz
                    };
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(this.isBond){
                            this.zhuankuan_marginru(data);
                        }else{
                            this.zhuankuanruPost(data);
                        }

                        this.addFormVisible = false;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
            },
 //保证金转入
            bond_shiftTo(val){
                this.fphuikuanConsole();
                this.customer_advertiser_list();
                this.addFormVisible1_bond = true;
                this.shiftToInput = "";
                this.name_ggz = '';
                this.note = "";
                this.backmoney_type = "2";
            },
            bond_num(){
                if(Number(this.shiftToInput)<0){
                    this.shiftToInput = 0;
                }
            },
//保证金转出
            bond_rollOut(val){
                this.isBond = true;
                out_id =  this.routeId;
                this.zhuankuan_marigin();
                this.out_name_ggz = '';
                this.customer_advertiser_list();
            },
 //延期
            postpone(val){
//                this.contract_yanqi(val);
                this.yanqiData = this.operation[0];
                this.contract_end = this.operation[0].contract_end;
                this.addFormVisible2 = true;
            },
            pull_yq(){
                if(this.dateInput){
                    let date =  moment(this.dateInput).format('YYYY-MM-DD');
                    this.contract_yanqi(this.yanqiData.id,date);
                    this.addFormVisible2 = false;
                }else{
                    this.$message({
                        showClose: true,
                        message: '请填写日期后提交',
                        type: 'warning'
                    });
                }
            },
        },
        created() {

        },
        filters:{
            ctimeData(val){
                if(val){
                    if(val != 0){
                        var time=new Date(parseInt(val) * 1000);
                        return   moment(time).format('YYYY-MM-DD')
                    }
                }

            },
            filfun(val){
                if(val == ''){
                    return '--'
                }else{
                    return val
                }
            },
            filfunName(val){
                if(val ){
                    return val.name
                }else{
                    return '--'
                }
            },
            fenpeiData(val){
                if(val){
                    return Number(val).toFixed(2)
                }else{
                    return '暂无建议'
                }
            },
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .operation {

        background: #f9f8f7;
        font-size: 13px;
        .left_operation {
            text-align: center;
            padding-top: 20px;
            .title {
                color: #9c9c9c;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .num {
                font-size: 16px;
            }
        }
        .right_operation {
            .list{
                height:35px;
                line-height: 35px;
                border-bottom: 1px dashed #d9d9d9 ;
                display: flex;
                .list_next {
                    width:50%;
                    box-sizing: border-box;

                    .title {
                        font-size: 13px;
                        font-weight: bold;
                        display: inline-block;
                        width: 80px;
                    }
                    .name {
                        color: #9c9c9c;
                        width:45%;
                        min-width: 158px;
                        display: inline-block;
                    }
                    .money_name {
                        margin-right: 10px;
                    }
                    .title_name {
                        padding: 3px 5px;
                        margin: 0 2px;
                        background: #669fe4;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                    }
                    .infor {
                        font-size: 12px;
                        color: #9c9c9c;
                    }
                }
                .right_line {
                    padding-left: 15px;
                    border-left: 1px dashed black;
                }
            }
            .list:last-child{
                border-bottom: none;
            }
        }

    }
    .tan_shiftTo {
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
            .el-dialog__body {
                padding: 10px 20px;
                .shiftTo {
                    margin:0;
                    padding:0;
                    list-style: none;
                    p{
                        font-size: 12px;
                        display: inline-block;
                        margin:0;
                    }
                    li{
                        margin: 5px 0;
                        .first_p {
                            width:100px;
                            text-align: right;
                            margin-right: 30px;
                        }
                        .last_p{
                            width:150px;
                            .el-select {
                                height:30px;
                                input{
                                    height: 29px !important;
                                    line-height: 29px!important;
                                }
                                .el-input__icon {
                                    height: 30px !important;
                                    line-height: 29px !important;
                                }
                            }
                        }
                        p{
                            .right_span{
                                width:40px;
                                height:25px;
                                border-radius: 3px;
                                background: #f0f2f5;
                                text-align: center;
                                line-height: 25px;
                                font-size: 12px;
                                display: inline-block;
                                border:1px solid #bbbbbb;
                                float: right;
                                margin-top: 2.5px;
                                cursor: pointer;
                            }
                            .tan_input,.yanqi {
                                height:30px;
                                width:100%;
                                input{
                                    height: 29px!important;
                                    line-height:29px!important;
                                }
                                .el-input__prefix {
                                    .el-input__icon {
                                        height: 30px !important;
                                        line-height: 29px !important;
                                    }
                                }
                            }
                        }
                    }
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

    }
</style>
