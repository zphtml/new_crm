<template>
    <el-row  >
        <el-col :span="24" class="meti_operation" >
            <el-row   v-for="(data,index) in operation" :key="index">
                <el-col :span="24" >
                    <el-col :span="3" class="left_operation">
                        <p class="title">余额</p>
                        <p class="num">
                            {{Number( data.balance )  | currency('') }}

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
                                         {{Number( data.dakuan)| currency('') }}
                                     </span>
                                    </span>
                                <span v-if="data.iszuofei != 1">
                                    <span class="title_name" @click="dakuanTan(data)">分配款</span>
                                    <span class="title_name" @click="zhuanchuTan(data)">转出</span>
                                </span>

                            </div>
                            <div class="right list_next">
                                   <span class="name">
                                         <span class="money_name">
                                           充值
                                       </span>
                                       <span style="font-size: 12px;color: black">
                                            {{ data.yu_e  | currency('') }}
                                       </span>

                                   </span>
                            </div>
                        </div>
                        <div class="list">
                            <div class="left list_next">
                                <span class="title">保证金</span>
                                <span class="name">
                                        <span class="money_name">
                                            客户保证金
                                        </span>
                                     <span style="font-size: 12px;color: black">
                                      {{ data.margin_money | currency('')  }}
                                     </span>
                                    </span>
                                    <span class="title_name" @click="dakuanBondTan(data)"  v-if="data.iszuofei == 0" >打保证金</span>
                            </div>
                            <div class="right list_next">
                                   <span class="name">
                                         <span class="money_name">
                                           媒体保证金
                                       </span>
                                       <span style="font-size: 12px;color: black">
                                            {{ data.margin_meiti  | currency('') }}
                                       </span>

                                   </span>

                            </div>
                        </div>
                        <div class="list">
                            <div class="left list_next">
                                <span class="title">补款相关</span>
                                <span class="name">
                                        <span class="money_name">
                                            补款
                                        </span>
                                     <span style="font-size: 12px;color: black">
                                         {{Number( data.bukuan)| currency('') }}
                                     </span>
                                    </span>
                                     <span class="title_name" @click="jumpbukuan(data)"  v-if="data.iszuofei == 0" >补款</span>


                            </div>
                            <div class="right list_next">
                                   <span class="name">
                                         <span class="money_name">
                                           罚款相关
                                       </span>
                                       <span style="font-size: 12px;color: black">
                                            {{ data.fakuan  | currency('') }}
                                       </span>

                                   </span>
                                <span class="title_name" @click="fakuanBondTan(data)"  v-if="data.iszuofei == 0" >罚款</span>
                            </div>
                        </div>
                        <div class="list">
                            <div class="left list_next">
                                <span class="title">备款相关</span>
                                <span class="name">
                                        <span class="money_name">
                                            备款余额
                                        </span>
                                     <span style="font-size: 12px;color: black">
                                       {{ data.beikuan_yue | currency('') }}
                                     </span>
                                    </span>
                                <span v-if="data.iszuofei != 1">
                                    <span class="title_name" @click="jumpbeikuan(data)">备款</span>
                                    <span class="title_name" @click="jumpbeikuandikou(data)">备款抵扣</span>
                                </span>
                            </div>
                        </div>
                    </el-col>
                </el-col>

            </el-row>

        </el-col>
        <!--弹窗 延期-->
        <el-dialog title="延期" :visible.sync="addFormVisible2"  @close="addFormVisible2 = false" :close-on-click-modal="false" class="tan_shiftTo" >
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
						<el-button type="primary"  @click="pull_yq" >确 定</el-button>
                        <el-button @click="addFormVisible2=false">取 消</el-button>
			</span>
        </el-dialog>
        <!--弹窗 转出-->
        <el-dialog title="转出" :visible.sync="addFormVisible"  @close="addFormVisible = false" :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo" v-for="(data,index) in zhuanchuData" :key="index">
                <li>
                    <p class="first_p">余额</p><p class="last_p">
                    {{Number( data.dakuan)- Number( data.yu_e) | currency('') }}
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
                               onmousewheel="return false;"></p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanchu" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
        </el-dialog>
        <!--弹窗 分配款-->
        <el-dialog title="打款" :visible.sync="addFormVisible1" @close="addFormVisible1 = false" :close-on-click-modal="false" class="tan_shiftTo" >
            <ul class="shiftTo" v-for="(data,index) in inforData" :key="index">
                <li>
                    <p class="first_p">转入类型</p>
                    <p class="last_p">分配款打款
                    </p>
                </li>
                <li>
                    <p class="first_p">可分配余额</p><p class="line-"> {{ advertiserName }}</p>
                </li>
                <li>
                    <p class="first_p">可分配余额</p><p class="line"> {{ undistributed_yu_e | currency('') }}</p>
                </li>
                <li>
                    <p class="first_p">余额</p>
                    <p  class="last_p" style="height: 30px; line-height: 30px">
                        {{ data.hetong_yu_e | currency('') }}
                        <span class="right_span" @click="pingzhang">平账</span> </p>
                </li>
                <li>
                    <p  class="first_p">打款</p>
                    <p class="last_p" style="position: relative">
                        <el-input class="tan_input" type="text" ></el-input>
                        <input style="line-height: normal; border: none;font-size: 12px;height: 23px;padding-left: 10px ;position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                               type="number" v-model="shiftToInput"
                               name="mouse2"
                               placeholder="单行输入"
                               onmousewheel="return false;">
                    </p>
                </li>
                <li>
                    <p class="first_p">合同类型</p>
                    <p class="last_p" v-if="data.type == 1">
                        普通合同
                    </p>
                    <p class="last_p" v-if="data.type == 2">
                        框架合同
                    </p>
                </li>
                <li>
                    <p class="first_p">产品线</p>
                    <p class="last_p">
                        {{data.name}}
                    </p>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="pullzhuanru" :disabled="disabledPull">确 定</el-button>
                        <el-button @click="addFormVisible1 = false" >取 消</el-button>
			</span>
        </el-dialog>
        <!--转出账户-->
        <el-dialog title="转出账户" :visible.sync="addFormVisible3"  @close="addFormVisible3 = false"  :close-on-click-modal="false" class="meiti_tan_shiftTo_zhuanchu" >
            <el-col :span="24" class="Tan_table">
                <el-col :span="24" class="Tan_header">
                    <el-col :span="8" class="left" >
                        <span @click="allcheck">
                            全选
                        </span>
                    </el-col>
                    <el-col :span="16" class="right">
                        账户名称
                    </el-col>
                </el-col>
                <el-col :span="24" class="TanBox" >
                    <el-col :span="24" class="Tan_body" v-for="(data,key) in dataInforTable" :key="key">
                        <el-col :span="8" class="left">
                            <div class="checkboxFour" >
                                <input type="checkbox"  :checked="data.checkId" id="checkboxFourInput"  @change="changebox($event.target.checked,key )"  name="" />
                                <label for="checkboxFourInput"  style="cursor: pointer">
                                    <span></span>
                                </label>
                            </div>
                        </el-col>
                        <el-col :span="16" class="right"  style="cursor: pointer">
                            <span @click="textName(key)" style="display: block;width: 100%;height: 100%;">
                                {{ data.a_users}}
                            </span>
                        </el-col>
                    </el-col>


                </el-col>

            </el-col>
            <el-col :span="24" style="margin: 10px 0" >
                <el-col :span="4" style="    height: 39px;line-height: 35px;">
                    转入到:
                </el-col>
                <el-col :span="20">
                    <el-select v-model="accountvalue" placeholder="请选择"   >
                        <el-option
                                v-for="item in Newaccountoptions"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>

            </el-col>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pullzhuanchu_account" :disabled="disabled_account" >确 定</el-button>
                <el-button @click="addFormVisible3 = false" >取 消</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex';
     import moment from "moment"
    let out_id = '';
    import {
        meijie_contract_jieshu,meijie_contract_zuofei,fpdakuan,meijie_customer_contract_listConsole,
        copyaccount, account_list_m,fpdakuanru,meijie_zhuankuan,
        meijie_zhuankuanruPost } from '@/api/meiti';
    import {contract_yanqi} from '@/api/kehu';
    export default {
        data() {
            return {
                routeId:'',
                operation:[],
//---------------结束作废
// 结束
                meijie_contract_jieshu(){
                    meijie_contract_jieshu({
                        data:  this.routeId,
                    }).then(() => {
                        this.$emit('meiti_operactionChange');
                    }). catch(err => {this.$message.error(err);});
                },
// 作废
                meijie_contract_zuofei(){
                    meijie_contract_zuofei({
                        data:  this.routeId,
                    }).then(() => {
                        this.$emit('meiti_operactionChange');
                    }). catch(err => {this.$message.error(err);});
                },
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
                            this.meijie_contract_jieshu()
                        }else if(dataName == '作废'){
                            this.meijie_contract_zuofei()
                        }

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                },
// 延期
                addFormVisible2:false,//延期
                yanqiData:'',
                contract_end:'',
                dateInput:'',//日历延期
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
                            this.$emit('meiti_operactionChange');
                        }else{
                            this.$message({
                                showClose: true,
                                message: '提交失败',
                                type: 'error'
                            });
                        }

                    }). catch(err => {this.$message.error(err);});
                },
//分配款
                advertiser:'',
                addFormVisible1:false,//打款
                inforData:[],
                advertiserName:'',
                undistributed_yu_e:'',
                shiftToInput:'',
                disabledPull:false,
                fpdakuan:function(data){
                    this.advertiser = data.advertiser;
                    fpdakuan({
                        data:data.id,
                        id:data.advertiser,
                    }).then(response => {
                        this.inforData = [];
                        response.contract_list[0]['hetong_yu_e'] =Number( response.contract_list[0].dakuan)- Number( response.contract_list[0].yu_e);
                        this.inforData.push(response.contract_list[0]);
                        this.advertiserName = response.costomer.advertiser;
                        this.undistributed_yu_e = response.costomer.dakuan_undistributed_yu_e
                    }). catch(err => {this.$message.error(err);});
                },
                fpdakuanru:function(data){
                    fpdakuanru({
                        data:data,
                    }).then(response => {

                        if(response.code == '200'){
                            this.$message({
                                type: 'success',
                                message: response.msg
                            });
                            this.$emit('meiti_operactionChange');
                        }else{
                            this.$message.error('err')
                        }
                        this.disabledPull = false
                    }). catch(err => {this.$message.error(err);});
                },
                tan(data) {
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                        this.addFormVisible1 = false;
                        this. disabledPull = true;
                        this.fpdakuanru(data)

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                        this. disabledPull = false;

                    });
                },
//转出
                addFormVisible:false, //转出
                zhuanchuData:[],
                outInput:'',
                z_yu_e:'',
                meijie_zhuankuan(id){
                    meijie_zhuankuan({
                        id:id,
                    }).then(response => {
                        if(response.code == 500){
                            this.$message({
                                message: response.msg ,
                                type: 'warning'
                            });
                        }else{
                            this.zhuanchuData = [];
                            this.z_yu_e = Number( response.contractinfo.dakuan)- Number( response.contractinfo.yu_e)
                            this.zhuanchuData.push(response.contractinfo);
                            this.addFormVisible = true;
                        }
                    }). catch(err => {this.$message.error(err);});
                },
                meijie_zhuankuanruPost:function(data){
                    meijie_zhuankuanruPost({
                        data:data,
                    }).then(response => {
                        if(response.code == '200'){
                            this.$message({
                                message: '转出成功',
                                type: 'success'
                            });
                            this.addFormVisible = false;
                            this.$emit('meiti_operactionChange');
                        }
                    }). catch(err => {this.$message.error(err);});
                },
                zc_Tan(data) {
                    this.$confirm('提交后不可更改, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                        this.meijie_zhuankuanruPost(data);
                        this.addFormVisible = false;
                    }).catch(() => {
                        this. disabledPull = false;

                    });
                },
// 账户
                addFormVisible3:false,
                checkedId:true,
                dataInforTable:[],
                accountvalue:'',
                Newaccountoptions:[],
                disabled_account:false,
                account_list_m(val){
                    account_list_m({
                        id:val,
                    }).then(response => {
                        this.dataInforTable = response.list.data;
                        for(var i = 0;i<response.data.length;i++){
                            this.dataInforTable['checkId'] = 'false';
                        }
                    }). catch(err => {this.$message.error(err);});
                },
                meijie_customer_contract_listConsole:function(){
                    meijie_customer_contract_listConsole({
                        id:this.operation[0].advertiser,
                    }).then(response => {
                        this.Newaccountoptions = response.list.data
                    }). catch(err => {this.$message.error(err);});
                },
                copyaccount(data){
                    copyaccount({
                        account_list:data,
                        mhtid:this.accountvalue,
                    }).then(response => {
                        if(response.code == 200){
                            this.$message({
                                showClose: true,
                                message: '修改成功' ,
                                type: 'success'
                            });
                            this.addFormVisible3 = false;

                        }else{
                            this.$message({
                                showClose: true,
                                message: '提交失败',
                                type: 'error'
                            });
                        }
                        this.disabled_account = false;
                        this.$emit('meiti_operactionChange');
                    }). catch(err => {this.$message.error(err);});
                },

            }
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
        computed: {
            ...mapGetters([
                'user',
                'accounts',
            ])
        },
        methods: {

// 结束
            over(){
                this.tanInfor('确认结束此合同，将不可恢复, 是否继续?','结束','over');
            },
// 作废
            abolish(){
                if(Number(this.operation[0].dakuan)==0&& Number(this.operation[0].yu_e)==0 && Number(this.operation[0].bukuan)==0&& Number(this.operation[0].margin_money)==0
                    && Number(this.operation[0].margin_meiti)==0&& Number(this.operation[0].beikuan_yue)==0 ){
                    this.tanInfor('确认作废此合同，将不可恢复, 是否继续?','作废','abolish',);
                }else{
                    this.$message({
                        message: '系统检测账户有金额，无法作废',
                        type: 'warning'
                    });

                }



            },
// 补款
            jumpbukuan(val){
                this.$router.push({ name: 'MediaFilling' ,query: { id: val.id}});
            },
// 备款
            jumpbeikuan(val){
                this.$router.push({ name: 'Reserve' ,query: { id: val.id}});
            },
// 备款抵扣
            jumpbeikuandikou(val){
                this.$router.push({ name: 'Provisionoffset' ,query: { id: val.id}});
            },
//  延期
            postpone(){//延期
                this.yanqiData =  this.operation[0];
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
//分配款
            dakuanTan(val){
                this.fpdakuan(val);
                this.addFormVisible1 = true;
            },
            pingzhang(){
                if(Number(this.inforData[0].hetong_yu_e)<0){
                    this.shiftToInput = -Number(this.inforData[0].hetong_yu_e)
                }else{
                    this.shiftToInput = Number(this.inforData[0].hetong_yu_e)
                }
            },
 //分配款
            pullzhuanru(){
                let data = {
                    "advertiser": this.advertiser,
                    "ht_id":[],
                    "pmoney":[],
                    "backmoney_type":this.backmoney_type
                };
                data.ht_id.push(this.inforData[0].id);
                data.pmoney.push(this.shiftToInput);
                if(this.shiftToInput){
                    if(Number(this.shiftToInput)>this.undistributed_yu_e){
                        this.$message({
                            message: '警告哦，打款金额不可大于'+this.undistributed_yu_e,
                            type: 'warning'
                        });
                    }else{
                        this.tan(data);
                    }
                }else{
                    this.$message({
                        message: '警告哦，打款金额不能为空',
                        type: 'warning'
                    });
                }

            },
//转出
            zhuanchuTan(val){
                out_id = val.id;
                this.meijie_zhuankuan(val.id)
            },
            pullzhuanchu(){
                if(Number(this.outInput)> Number(this.z_yu_e)){
                    this.$message({
                        message: '警告哦，转出金额不可大于'+this.z_yu_e,
                        type: 'warning'
                    });
                }else{
                    let data = {
                        id:out_id,
                        money:this.outInput,
                    };
                    this.zc_Tan(data)

                }
            },
//保证金打款
            dakuanBondTan(val){
                this.$router.push({ name: 'console_addBondDakuan' ,query: { id: val.id}});
            },
// 补款
            fakuanBondTan(val){
                this.$router.push({ name: 'Mediafakuan' ,query: { id: val.id}});
            },
// 跳转账户
            jumpaccount(val){
                this.addFormVisible3 = true;
                this.meijie_customer_contract_listConsole()

                this.account_list_m(val.id)
            },
            // 转出账户
            allcheck(){
                if(this.checkedId == true){
                    this.checkedId = false;
                    this.dataInforTable = this.dataInforTable.filter(function(item){
                        item.checkId = true;
                        return item
                    });
                }else{
                    this.checkedId = true;
                    this.dataInforTable = this.dataInforTable.filter(function(item){
                        item.checkId = false;
                        return item
                    });
                }
            },
            textName(val){
                this.dataInforTable = this.dataInforTable.filter(function(item,i){
                    if(i == val){
                        item.checkId =  !item.checkId;
                    }
                    return item
                });
            },
            changebox(val,key){
                this.dataInforTable[key]['checkId'] = val;
            },
            pullzhuanchu_account(){
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = [];
                    this.dataInforTable.filter(function(item){
                        if(item.checkId == true){
                            data.push(item.id)
                        }
                    });
                    this.copyaccount(data);
                    this.disabled_account = true;

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消提交'
                    });
                });


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
                    return val
                }else{
                    return '暂无建议'
                }
            },
        },
        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .meti_operation {

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
    .meiti_tan_shiftTo_zhuanchu {
        .add_gl_account {
            padding: 0 15px;
            height:30px;
            margin-bottom: 10px;
        }
        .el-dialog  {
            width:420px;
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
            .dialog-footer {
                margin-top: 337px;
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
        .el-dialog__body {
            padding:10px 20px  ;
        }
        .Tan_table{
            width:100%;
            height:300px;
            border:1px solid #dfdfe0;
            .Tan_header {
                width: 100%;
                height: 30px;
                line-height: 30px;
                .left {
                    text-align: center;

                    span{
                        font-size: 12px;
                        display: inline-block;
                        width:40px;
                        height:20px;
                        text-align: center;
                        line-height: 20px;
                        border: 1px solid #969a9e;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
            }
            .TanBox {
                width:100%;
                height:267px;
                overflow: auto;
                .Tan_body {
                    height:30px;
                    line-height: 30px;
                    .left{
                        .el-radio__label {
                            display: none;
                        }
                        .checkboxFour {
                            width: 15px;
                            height: 15px;
                            background: white;
                            box-sizing: border-box;
                            position: relative;
                            margin:8px auto;
                            cursor: pointer;
                            input{
                                opacity: 0;
                                position: absolute;
                                width: 20px;
                                height: 20px;
                                left: -3px;
                                top: -3px;
                                z-index:888;
                            }
                            label {
                                display: block;
                                width: 105%;
                                height: 105%;
                                cursor: pointer;
                                z-index: 1;
                                background: white;
                                border: 1px solid #bfcbd9;
                            }
                            label span{
                                display: inline-block;
                                width: 8px;
                                height: 4px;
                                position: absolute;
                                top: 4px;
                                left: 3px;
                                border: 2px solid white;
                                border-top: none;
                                border-right: none;
                                border-radius: 0;
                                filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
                                /* opacity: 0; */
                                -moz-transform: rotate(-45deg);
                                -ms-transform: rotate(-45deg);
                                -webkit-transform: rotate(-45deg);
                                transform: rotate(-45deg);
                            }
                            input[type=checkbox]:checked + label {
                                background: #66a0e6;
                            }
                        }
                    }
                    .right{
                        .right_input {
                            .el-input {
                                display: inline-block;
                                width:190px;
                                input{
                                    width:190px;
                                    height:25px!important;
                                    line-height: 25px;
                                }
                            }

                        }
                    }
                }
            }

            .Tan_body:nth-child(even){
                background: #f7f7f8;
            }
        }
    }
</style>
