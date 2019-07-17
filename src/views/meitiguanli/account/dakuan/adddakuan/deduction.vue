<template>
    <el-row class="media_deduction">
        <el-col :span="24" >
            <el-col :span="24">
                <div style="float: left;margin-top: 35px">
                    <el-checkbox   v-model="checkedAll_tui" @change="checkboxALlChange()"> 全选</el-checkbox>
                    <el-input size="mini" v-model="tk_input" placeholder="请输账户名称" style="width: 250px; "></el-input>
                    <el-select v-model="type_name" placeholder="请选择" size="mini">
                        <el-option
                                v-for="(item,index) in type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="float: right;margin-right: 20px">
                    <div>
                       <span style="display: inline-block;width: 120px;font-size: 13px">
                           打款金额：
                       </span>{{dakuan_heji | currency('')}}
                    </div>
                    <div style="margin: 5px 0;">
                       <span  style="display: inline-block;width: 120px;font-size: 13px">
                            抵扣金额：
                       </span>
                        {{ backMoney_heji | currency('')}}
                    </div>
                    <div :class="{redColor:Number(dakuan_heji)-Number(backMoney_heji)<0,greenColor:Number(dakuan_heji)-Number(backMoney_heji)>=0}">
                       <span  style="display: inline-block;width: 120px;font-size: 13px">
                            应付打款：
                       </span>
                        {{Number(dakuan_heji)- Number(backMoney_heji)| currency('')}}
                    </div>
                </div>
            </el-col>
                <el-table
                        :data="BackMoneyTabblefun"
                        border
                        class="vue-table"
                        style="width: 100%">
                    <el-table-column
                            width="50"
                            label="选择">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.Tablechecked" @change="checkboxChange(scope.row,'tui')"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="可用抵扣款">
                        <template slot-scope="scope">
                            {{ scope.row.type | typeName}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="账户名称">
                        <template slot-scope="scope">
                            <div style="width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;padding-left: 30px;position: relative">
                                <span v-if="scope.row.yu_e" style="position: absolute;font-size: 12px;width: 18px;height: 18px;border-radius: 50%;border: 1px solid orange;color: orange;text-align: center;line-height: 18px;left: 0;top: 0;">备</span>
                                <span v-if="scope.row.a_users">
                                                                                            {{scope.row.a_users}}
                                            </span>
                                <span v-else>
                                                --
                                            </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="付款日">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                {{scope.row.dk_date | matnum}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="付款类型">
                        <template slot-scope="scope">
                            <div style="width: 100%;text-align: center">
                                {{scope.row.mt_payment_type | type}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            :label="$t('titles.fandian')">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                {{scope.row.rebates_proportion}}%
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="充值时间">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                {{scope.row.payment_time | cur}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            header-align="center"
                            label="余额">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                {{scope.row.dakuan_yue | matnum}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="120"
                            header-align="center"
                            label="抵扣金额">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <input style="line-height: normal; border: 1px solid #000;font-size: 12px;height: 24px; width: 100px;padding-left:20px;outline: none;z-index:9"
                                       v-if="scope.row.dikou_show"
                                       type="number" v-model="scope.row.dikou_money"
                                       name="mouse2"
                                       @focus="dikou_focus(scope.row)"
                                       v-on:input="dikou_moneyChange(scope.row)"
                                       placeholder="请输入金额"
                                       onmousewheel="return false;">
                                <span  v-if="!scope.row.dikou_show">{{scope.row.dikou_money}}</span>
                            </div>
                        </template>
                    </el-table-column>


                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                            @size-change="BackMoneyhandleSizeChange"
                            @current-change="BackMoneyhandleCurrentChange"
                            :current-page="BackMoneypageIndex"
                            :page-sizes="[ 20, 30,40]"
                            :page-size="BackMoneypageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="BackMoneykehuTableLength"
                            style='text-align: right;'>
                    </el-pagination>
                </div>
            <el-col :span="24" style="margin-top: 20px">
                <el-button style="float: left" type="primary" size="mini" @click="back_paydakuan">上一步</el-button>
                <el-button style="float: right" type="primary" size="mini" @click="next_finish">下一步</el-button>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    /*eslint-disable */
    import { mcont_tuikuan_list} from '@/api/meitiaccount';
    import {mapGetters} from 'vuex';
    import moment from "moment"
    export default {
        name: 'dashboard',
        data() {
            return{
                //搜索
                tk_input:'',
                type_name:'',
                type_options:[{
                    label:'全部',
                    value:'',
                }, {
                        label:'退款',
                        value:1,
                    },{
                        label:'保证金退款',
                        value:2,
                    },{
                        label:'补款',
                        value:3,
                    },{
                        label:'备款账户退款',
                        value:4,
                    },],
                //
                BackmoneynumData:0,
                dakuan_heji:0,
                backMoney_heji:0,
                BackMoneynum_clome:0,

                //表格
                backMoneyItem:[],
                BackMoneypage:'10',
                BackMoneynum:'1',
                BackMoneypageIndex:1,
                BackMoneypageSize:20,
                BackMoneykehuTableLength:12,
                mcont_tuikuan_list:function(){
                    mcont_tuikuan_list({
                        id:this.$route.query.id
                    }).then(response => {
                        this.backMoneyItem = response.filter(function (item, i) {
                            item['Tablechecked'] = false;

                            item['dikou_money'] = 0;
                            item['dikou_show'] = false;
                            return item
                        });
                        this.BackMoneykehuTableLength = response.length
                    }).catch(error => {

                    });
                },
                //全选
                checkedAll_tui:false,
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'roles'
            ]),
            BackMoneyTabblefun(){
                let BackMoneytableData = [];
                let _this = this;
                BackMoneytableData =this.backMoneyItem.filter(function (item, i) {
                    if(item.mt_payment_type == null){
                        item.mt_payment_type = "--";
                    }
                    if(item.a_users == null){
                        item.a_users = "--";
                    }
                    if(item.a_users){
                        if(item.a_users.indexOf(_this.tk_input)>=0 ){
                            if(item.type.indexOf(_this.type_name)>=0 ){
                                return item
                            }
                        }
                    }

                });
                return BackMoneytableData.filter((o,i) => i >=(this.BackMoneypageIndex-1)*this.BackMoneypageSize&&i<=this.BackMoneypageIndex*this.BackMoneypageSize-1);
            },
        },
        methods: {
            deductionData(val){
                this.BackmoneynumData = 0;
                this.backMoney_heji = 0;
                this.BackMoneynum_clome = 0;
                this.dakuan_heji = val.dakuan.dakuan_money
                this.mcont_tuikuan_list({mhtid:val.dakuan.mhtid})
            },
            //筛选
            checkboxChange(val){
                if(val.Tablechecked == true){
                    val.dikou_money = val.dakuan_yue;
                    val.dikou_show = true;
                    this.BackmoneynumData = Number(this.backMoney_heji) + Number(val.dikou_money);
                }else{
                    val.dikou_show = false;
                    this.BackmoneynumData = Number(this.backMoney_heji) - Number(val.dikou_money);
                    val.dikou_money = 0;
                }
                this.backMoney_heji=this.BackmoneynumData;
            },
            dikou_focus(val){
                this.BackMoneynum_clome = Number(this.backMoney_heji)-Number(val.dikou_money);
            },
            dikou_moneyChange(val){
                if(Number(val.dikou_money)>Number(val.dakuan_yue)){
                    val.dikou_money = val.dakuan_yue;
                }else if(Number(val.dikou_money<0)){
                    val.dikou_money = 0;
                }
                this.backMoney_heji = Number(this.BackMoneynum_clome) + Number(val.dikou_money);
            },
            //全选
            checkboxALlChange(){
                let numberData = 0;
                if(this.checkedAll_tui){
                        this.backMoneyItem = this.backMoneyItem.filter(function (item, i) {
                        item['Tablechecked'] = true;
                        item.dikou_show = true;
                        item.dikou_money = item.dakuan_yue;
                        numberData +=Number(item.dikou_money);
                        return item
                    });
                    this.backMoney_heji = numberData;
                }else{
                    this.backMoneyItem = this.backMoneyItem.filter(function (item, i) {
                        item['Tablechecked'] = false;
                        item.dikou_show = false;
                        item.dikou_money = 0;
                        return item
                    });
                    this.backMoney_heji = "0.00";
                }
            },
            //退款分页
            BackMoneyhandleSizeChange(val) {
                this.BackMoneypage = val;
                this.BackMoneypageSize =val;
            },
            BackMoneyhandleCurrentChange(val) {
                this.BackMoneynum = val;
                this.BackMoneypageIndex = val;
            },

            //上一步
            back_paydakuan(){
                this.$emit('steps',{type:0});
            },
            //下一步
            next_finish(){
                if(Number(this.dakuan_heji)- Number(this.backMoney_heji)>=0){
                    this.$emit('steps',{
                        type:2,
                        dikou:{
                            dikou:this.backMoneyItem,
                            dakuan_heji:Number(this.dakuan_heji),
                            backMoney_heji: Number(this.backMoney_heji)
                        },
                    });
                }else{
                    this.$message('应付打款必须大于0！！');
                }

            },
        },
        created() {

        },
        filters: {
            cur: function (value) {
                return moment(value*1000).format('YYYY-MM-DD')
            },
            matnum: function (value) {
                if(value){
                    return value
                }else{
                    return '--'
                }
            },
            type: function (value) {
                if(value == 1){
                    return "预付"
                }else if(value == 2){
                    return "垫付"
                }else{
                    return '--'
                }
            },
            typeName(val){
                if(val == 1){
                    return '退款'
                }else if(val == 2){
                    return '保证金退款'
                }else if(val == 3){
                    return '补款'
                }else if(val == 4){
                    return '备款账户退款'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
.media_deduction{
    .redColor {
        color: red;
    }
    .greenColor {
        color: green;
    }
}

</style>
