<template>
    <div class="examine">
        <el-col :span="24" style="height: 30px;line-height: 30px;color: #222f3b;font-size: 12px;padding: 0;background: white">
            <el-col :span="16" style="padding-left:10px;font-weight: bold">
                <span style="display: inline-block;width: 8px;height: 8px;border-radius: 100%;background: #222f3b;"></span>
                审核状态
            </el-col>
        </el-col>
        <el-col :span="24" style="font-size: 12px;background: #f9f8f7;margin-left:10px;">
            <el-col :span="24" class="shenheBox" style="margin-top: 10px;padding: 0 10px 10px 10px">
                <template  v-for="(item,key) in dataAll"   >
                    <el-col :span="24" style="padding: 0">
                        <span style="width: 145px;display: inline-block;" v-if="item.shenhe == 0 || item.shenhe == 1 ">
                            <span v-if="item.name==undefined">
                                {{ key+1 }}级未审核
                            </span>
                            <span v-else > {{item.name}}</span>
                            <el-tooltip :content= shenheName[key+1] placement="top" effect="light">
                                <div style="display: inline-block">
                                    <span style="display: inline-block;width: 75px;overflow: hidden;vertical-align: middle;height: 20px;text-align: center;text-overflow:ellipsis;white-space: nowrap;">({{ shenheName[key+1] }})</span>
                                </div>
                            </el-tooltip>
                        </span>

                        <div style="display: inline-block" v-if="item.zi">
                            <div style="display: inline-block" v-if="item.zi.state == 0">
                                <div v-if="item.zi.fu_flow == 'beikuan'">
                                    <el-tooltip content="请在子流程中进行审核" placement="top" effect="light">
                                        <button class="tongguo" style="margin-left: 20px;" v-if="item.shenhe == 1" >通过</button>
                                    </el-tooltip>
                                    <el-tooltip content="请在子流程中进行审核" placement="top" effect="light">
                                        <button class="notongguo" v-if="item.shenhe == 1" >不通过</button>
                                    </el-tooltip>
                                </div>
                                <div v-else>

                                        <button class="tongguo" @click="yigo(key,item.name)" style="margin-left: 20px;" v-if="item.shenhe == 1" >通过</button>
                                    <button class="notongguo" @click="yinogo(key)"  v-if="item.shenhe == 1" >不通过</button>
                                </div>
                            </div>
                            <div style="display: inline-block" v-if="item.zi.state != 0">
                                <button class="tongguo" style="margin-left: 20px;" @click="yigo(key,item.name)" v-if="item.shenhe == 1" >通过</button>
                                <button class="notongguo" @click="yinogo(key)" v-if="item.shenhe == 1" :disabled="item.zi.state == 0">不通过</button>
                            </div>
                            <el-tooltip content="Bottom center" placement="bottom" effect="light">
                            </el-tooltip>

                        </div>

                        <div style="display: inline-block" v-else >
                            <button class="tongguo" style="margin-left: 20px;" @click="yigo(key,item.name)" v-if="item.shenhe == 1">通过</button>
                            <button class="notongguo" @click="yinogo(key)" v-if="item.shenhe == 1">不通过</button>
                        </div>

                        <span style="width: 145px;display: inline-block;color: #54adff;" v-if="item.shenhe == 2 || item.shenhe == 3">
                             <span v-if="!item.name">   {{ key+1 }}级已审核</span>
                            <span v-else> {{item.name}}</span>
                          <el-tooltip :content= shenheName[key+1] placement="top" effect="light">
                                  <div style="display: inline-block">
                                    <span style="display: inline-block;width: 75px;overflow: hidden;vertical-align: middle;height: 20px;text-align: center;text-overflow:ellipsis;white-space: nowrap;">({{ shenheName[key+1] }})</span>
                                </div>
                            </el-tooltip>
                        </span>

                        <span style="display: inline-block;color: #54adff;margin-left: 20px;height: 28px;line-height: 28px" v-if="item.shenhe == 2">
                            <img src="../../styles/images/dui.png" alt="" style="width: 18px;height:18px;display: inline-block;vertical-align: middle">
                            已通过
                         </span>
                        <span style="display: inline-block;color: #f75976;margin-left: 20px;height: 28px;line-height: 28px"  v-if="item.shenhe == 3">
                               <img src="../../styles/images/cuo.png" alt="" style="width: 18px;height:18px;display: inline-block;vertical-align: middle">
                              未通过
                         </span>
                        <div style="display: inline-block" v-if="item.zi">
                            <span style="margin-left:10px;text-decoration: underline;color: #4683c4;cursor: pointer" v-if="item.zi.state == 0" @click="jumpHtml(item.zi)">子流程进行中</span>
                            <span style="margin-left:10px;text-decoration: underline;color: green;cursor: pointer" v-if="item.zi.state == 1" @click="jumpHtml(item.zi)">子流程已完成</span>
                            <span style="margin-left:10px;text-decoration: underline;color: #951754;cursor: pointer" v-if="item.zi.state == 2" @click="jumpHtml(item.zi)">子流程被驳回</span>
                        </div>
                    </el-col>
                    <el-col :span="24" class="iconShenhe">
                      <span style="width: 85px;display: inline-block;text-align: center;color: #54adff;">
                             <img src="../../styles/images/xia.png" alt="" style="width: 18px;height: 18px;"  >
                      </span>
                    </el-col>
                </template>
            </el-col>
        </el-col>

<!--通过-->
        <pass_type ref="pass_click" @pass_infor="pass_infor"></pass_type>
<!--不通过-->
        <noPass_type ref="noPass_click" @noPass_infor="noPass_infor"></noPass_type>
<!--审核--修改账户当前媒介合同-->
        <mediaContract_type ref="mediaContract_click" @shenhe_zhuan_account="shenhe_zhuan_account" @mediaContract_infor="mediaContract_infor" @shenhe_media_account="shenhe_media_account"></mediaContract_type>
<!--退款到总账户-媒介判定-->
        <media_type ref="media_click"  @media_infor="media_infor" ></media_type>
<!--拆分备款账户-->
        <recharge_type ref="beikuanClick" @recharge_infor="recharge_infor" @caifen_type="caifen_type"></recharge_type>
<!--下单判定-->
        <xiadan_type ref="xiadanClick" @xiadan_infor="xiadan_infor"></xiadan_type>
<!--审核备注-->
        <remark_infor ref="shenhe_remark"></remark_infor>

    </div>

</template>
<script>
    import { mapGetters } from 'vuex';
    import recharge_type from './dialog/recharge_type';
    import media_type from './dialog/media_type';
    import xiadan_type from './dialog/xiadan_type';
    import remark_infor from './remark/remark';
    import pass_type from './dialog/pass_type';
    import noPass_type from './dialog/noPass_type';
    import mediaContract_type from './dialog/mediaContract_type';
    export default {
        data() {
            return {
                shenheVal:[],
                shenheName:[],
                dataAll:[],
                audit_countAll:'',
            }
        },
        methods:{
//通过------------------------------------------------
            yigo(key,val){
                if(val=="媒介审核"){
                    this.$refs.media_click.media_click(this.shenheVal, key);
                }else if(val == "下单判定"){
                    this.$refs.xiadanClick.xiadanClick(this.shenheVal, key);
                }else if(val == "充值方式"){
                    this.$refs.beikuanClick.beikuanClick(this.shenheVal, key);
                } else{
                    if(this.shenheVal.xufei){
                        if(key+1 == this.shenheVal.audit_countAll){
                            if(this.shenheVal.xufei == "isbond"){
                                this.$refs.mediaContract_click.mediaContract_click(this.shenheVal, key, "isbond");
                            }else if(this.shenheVal.xufei == "iszhuankuan"){
                                this.$refs.mediaContract_click.mediaContract_click(this.shenheVal, key,"iszhuankuan");
                            }else{
                                this.$refs.pass_click.pass_click(this.shenheVal, key);
                            }
                        }else{
                            this.$refs.pass_click.pass_click(this.shenheVal, key);
                        }
                    }else{
                        if(this.shenheVal.isHtml == 'dikou' && key+1  == this.shenheVal.audit_countAll ){

                            const h = this.$createElement;
                            this.$confirm('审核通过后将无法抵扣, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.$refs.pass_click.pass_click(this.shenheVal, key);
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                });
                            });
                        }else{
                            this.$refs.pass_click.pass_click(this.shenheVal, key);
                        }
                    }
                }
            },
//不通过---------------------------------------------------------
            yinogo(key){
                this.$refs.noPass_click.noPass_click(key);
            },

            // 退款
            addmediaChange_tuikuan(){
                this.addaccount_tuikuan ="";
            },
            addaccountChange_tuikuan(val){
                this.addMedia_tuikuan = "1";
            },
            //审核通过
            pass_infor(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 2;
                this.$emit('shenheInfor', data);
            },
            //审核不通过
            noPass_infor(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 3;
                this.$emit('shenheInfor', data);
            },
            //修改账户当前媒介合同
            mediaContract_infor(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 2;
                this.$emit('shenheInfor', data);
            },
            shenhe_zhuan_account(){
                this.$emit('zhuan_account');
            },
            shenhe_media_account(){
                this.$emit('media_account');
            },
            //媒介判定
            media_infor(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 2;
                this.$emit('shenheInfor', data);
            },
            //充值方式
            recharge_infor(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 2;
                this.$emit('shenheInfor', data);
            },
            //拆分备款账户
            caifen_type(data){
                this.dataAll[data.shenheInfor.shenhe-1].shenhe = 2;
                this.$emit('shenheInfor', data);
            },
            //下单判定
            xiadan_infor(data){
                this.$emit('shenheInfor', data);
            },
//            备款跳转
            jumpHtml(val){
                if(val.fu_flow =="tuikuan"){
                    this.$router.push({ name:'media_refund_List'});
                }else{
                    this.$router.push({ name: val.zi_flow ,query: { id: val.ziid}});
                }
            },
        },
        computed: {
            ...mapGetters([
                'user',
                'roles',
                'audit_action'
            ])
        },
        filters: {
            ty:function (value) {
                if(value==1){
                    return '通过'
                }else if(value==2){
                    return '驳回'
                }else if(value==3){
                    return '预审通过'
                }
            },
        },
        components: {
            recharge_type,
            xiadan_type,
            media_type,
            remark_infor,
            pass_type,
            noPass_type,
            mediaContract_type
        },
        watch:{
            screen(val){
                this.shenheVal = val;
                this.dataAll = [];

                for(let n in val.shenhe){
                    if(!val.shenhe[n]){
                        val.shenhe[n]  = "暂无分配"
                    }else if(typeof val.shenhe[n] !='string'){
                        val.shenhe[n] = val.shenhe[n].join(',')
                    }
                }
                this.shenheName = val.shenhe;


                this.audit_countAll =  val.audit_countAll;
                let data = 0;


                val.audit_countAll<val.audit_count ? val.audit_countAll = val.audit_count:'';

                for(let i = 0;i<val.audit_countAll;i++){

                    if((i+1)<val.audit_count){
                        this.dataAll.push({
                            'shenhe':2,
                        })
                    }else if((i+1) == val.audit_count){
                        data = i;
                        if(val.audit == 0){
                            this.dataAll.push({
                                'shenhe':1,
                            },);

                        }else  if(val.audit == 1){
                            this.dataAll.push({
                                'shenhe':2,
                            })
                        }else  if(val.audit == 2){
                            this.dataAll.push({
                                'shenhe':3,
                            })
                        }
                    }else if((i+1) >val.audit_count){
                        this.dataAll.push({
                            'shenhe':0,
                        })

                    }

                }

                if( this.dataAll[data].shenhe == 3 || this.dataAll[data].shenhe == 1){
                    if(data+1<val.audit_countAll){
                        this.dataAll[data+1].shenhe = 0;
                    }
                }else  if( this.dataAll[data].shenhe == 2){
                    if(data+1<val.audit_countAll){
                        this.dataAll[data+1].shenhe = 1;
                    }
                };
                if(val.isHtml == "jumpzi"){
                    for(let a = 0;a<val.zi.length;a++){
                        if(val.zi[a].fu_audit){
                            val.zi[a].fu_audit = Number( val.zi[a].fu_audit)-1;
                            this.dataAll[ val.zi[a].fu_audit]['zi'] = val.zi[a];
                        }
                    }
                }else if(val.isHtml == "xiadan"){
                    for(let i = 0;i<this.audit_action.length;i++){
                        if(this.audit_action[i].action_name == 'xiadan'){
                            for(let a = 0;a<this.audit_action[i].audit_alias.length;a++){
                                if(this.audit_action[i].audit_alias[a].audit_type){
                                    let dataNum  = Number( this.audit_action[i].audit_alias[a].audit_type)-1;
                                    this.dataAll[dataNum]['name'] = this.audit_action[i].audit_alias[a].title;
                                }
                            }
                        }
                    }
                }else if(val.isHtml == "tuikuan"){
                    for(let i = 0;i<this.audit_action.length;i++){
                        if(this.audit_action[i].action_name == 'refund_account_z'){
                            for(let a = 0;a<val.audit_countAllData.audit_alias.length;a++){
                                if(val.audit_countAllData.audit_alias[a].audit_type){
                                    let dataNum  = Number( val.audit_countAllData.audit_alias[a].audit_type)-1;
                                    this.dataAll[dataNum]['name'] = this.audit_action[i].audit_alias[a].title;
                                }
                            }

                        }
                    }
                            if(val.zi.length>0){
                                val.zi[0].fu_audit = Number( val.zi[0].fu_audit)-1;
                                this.dataAll[val.zi[0].fu_audit]['zi'] = val.zi[0];

                            }
                }else if(val.isHtml == "renew"){
                    for(let i = 0;i<this.audit_action.length;i++){
                        if(this.audit_action[i].action_name == 'renew'){
                            for(let a = 0;a<this.audit_action[i].audit_alias.length;a++){
                                if(this.audit_action[i].audit_alias[a].audit_type){
                                    let dataNum  = Number( this.audit_action[i].audit_alias[a].audit_type)-1;
                                    this.dataAll[dataNum]['name'] = this.audit_action[i].audit_alias[a].title;
                                }
                            }
                        }
                    }
                }
//          audit_count   当前是第几审核
//          audit   0未审核 1通过 2驳回
//     审核备注
                this.$refs.shenhe_remark.shenhe_remark(this.shenheVal);
            },
        },
        props: ['screen']
    }
</script>

<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "./css/index";


</style>
