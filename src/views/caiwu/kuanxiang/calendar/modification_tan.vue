<template>
    <el-row >
        <el-col :span="24">
            <!--弹窗 新增回款-->
            <el-dialog title="修改回款"  :visible.sync="addFormVisible" @close="addFormVisible = false"  :close-on-click-modal="false" class="tan_shiftTo" >
                <ul class="shiftTo" >
                    <li>
                        <p  class="first_p" style="width: 65px">回款日期</p>
                        <p class="last_p" style="position: relative">
                            <el-date-picker
                                    :clearable=false
                                    v-model="back_date"
                                    type="date"
                                    range-separator="-"
                                    size="mini"
                                    style="width: 150px"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </p>
                    </li>
                    <li>
                        <p  class="first_p" style="width: 65px;">回款金额</p>
                        <p class="last_p" style="position: relative">
                            <el-input class="tan_input" type="text"></el-input>
                            <input style="line-height: normal; border: none;font-size: 12px;height: 23px;padding-left: 10px ;position: absolute;left: 2px;top: 4px;width: 147px;outline: none;z-index:9"
                                   type="number" v-model="money"
                                   name="mouse2"
                                   placeholder="回款金额"
                                   onmousewheel="return false;">
                        </p>
                    </li>
                    <li>
                        <p  class="first_p" style="width: 65px;    vertical-align: top;">回款备注</p>
                        <p class="last_p" style="position: relative">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea_note">
                            </el-input>
                        </p>
                    </li>
                </ul>
                <span slot="footer" class="dialog-footer">
						<el-button type="primary"  @click="pull_backMoney" >确 定</el-button>
                        <el-button  @click="addFormVisible = false">取 消</el-button>
			</span>
            </el-dialog>
        </el-col>

    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { huikuan_plan_list ,up_pla} from '@/api/kehu';
    import moment from "moment"
    export default {
        name: 'dashboard',
        data() {
            return {

                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now()- 8.64e7;//不算今天往后禁止
                    }
                },

//点击日期查看回款列表
                huikuan_plan_list:function (val) {
                    huikuan_plan_list({
                        start_date:this.tableDateArray,
                        end_date:this.tableDateArray,
                        page:this.pageSize,
                        num:this.num,
                    }).then(response => {
                        this.listLoading = false;
                        if(response.code == '200'){
                            this.huikuanTable = response.data.data;
                            this.backMoneyTableLength = response.data.totalCount
                        }else{
                            this.$message.error('获取失败');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
                // 弹
                addFormVisible:false,
                adnameId:'',
                back_date:'',
                money:'',
                textarea_note:'',
 //修改回款
                up_pla(){
                    this.addFormVisible = false;
                    up_pla({
                        id:this.adnameId,
                        submituser:this.user.id,
                        receivable_day:moment(this.back_date).format('YYYY-MM-DD'),
                        money:this.money,
                        note:this.textarea_note,
                    }).then(response => {
                        if(response.code == '200'){
                            this.huikuan_plan_list();
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('getNewDate', )
                        }else{
                            this.$message.error('获取失败');
                        }
                    }). catch(err => {this.$message.error('获取失败');});
                },
            }
        },
        components: {

        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        mounted(){

        },
        methods: {

 //修改回款
            set_backmoney(val){
                var time= moment(new Date(parseInt(val.receivable_day) * 1000)).format('YYYY-MM-DD') ;
                let newDate =  moment().format('YYYY-MM-DD')
                let releaseDate = moment(newDate);
                let currentDate = moment(time);
                let diff = releaseDate.diff(currentDate);
                let diffDuration = moment.duration(diff);
                if(diffDuration.days()>0){
                 this.back_date =  moment().format('YYYY-MM-DD');
                }else{
                    this.back_date = time;
                }
                this.adnameId = val.id;
                this.money =val.money;
                this.addFormVisible = true;
            },
            //提交
            pull_backMoney(){
                if(this.money == ''){
                    this.$message({
                        message: '请输入回款金额',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('是否修改回款任务, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.up_pla()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消添加'
                        });
                    });
                }


            },
        },
        watch:{

        },
        filters: {
            ctimeData(val){
                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">

</style>
