<template>
    <div class="examine">

        <el-dialog title="媒介判定" :visible.sync="addFormVisibleReceive4"  @close="addFormVisibleReceive4=false" class="media_shenhe" size="tiny" >
            <div style="margin-bottom: 20px;">
                <div class="xufei_a">
                    <p>选择该笔退款路径:</p>
                    <el-radio v-model="addMedia_tuikuan" label="0" @change="addmediaChange_tuikuan" >从媒体退现金</el-radio>
                </div>
                <div class="xufei_b">
                    <p>
                        退款到备款账户:
                    </p>
                    <el-radio-group v-model="addaccount_tuikuan" @change="addaccountChange_tuikuan(data)" v-for="(data,index) in beikuanaccount"  :key="index" >
                        <el-radio  :label="data.id" style="display: block;width: 300px;">{{data.a_users}}（余额:{{data.yu_e}}）</el-radio>
                    </el-radio-group>
                </div>

                <div style="display: inline-block;height: 30px;line-height: 30px;" class="note">
                    <div :span="24">
                        <div style="display: inline-block;vertical-align: top;">备注：</div>
                        <div style="display: inline-block">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="textarea4">
                            </el-input>
                        </div>
                    </div>

                </div>
            </div>
            <div style="text-align: left;padding-bottom: 20px">
                <el-button type="primary" @click="btnMedia()"  :disabled="disabledPull" style="padding: 10px 15px;height: auto;width: auto;">确定</el-button>
                <el-button @click="addFormVisibleReceive4=false" style="padding: 10px 15px;height: auto;width: auto">取消</el-button>
            </div>
        </el-dialog>

    </div>

</template>
<script>
    import { mapGetters } from 'vuex';
    import { renew_beikuan_account } from '@/api/money';
    export default {
        data() {
            return {
                shenheVal:[],
                shneheKey:0,
                addFormVisibleReceive4:false,
                beikuanaccount:[],
                renew_beikuan_account:function(){
                    if(this.shenheVal.dataInfor.account0.mht_id){
                        renew_beikuan_account({
                            id:this.shenheVal.dataInfor.account0.mht_id,
                            account:this.shenheVal.a_users,
                        }).then(response => {
                            this.beikuanaccount = response;
                        }).catch(error => {
                        });
                    }
                },
                textarea4:'',
                disabledPull:false,
                addMedia_tuikuan:'0',
                addaccount_tuikuan:"",
            }
        },
        methods:{
            media_click(val,key){
                this.shenheVal = val;
                this.shneheKey = key;
                this.disabledPull = false;
                this.addFormVisibleReceive4 = true;

                this.xf_monet = this.shenheVal.xf_monet;
                this.renew_beikuan_account();

            },
            // 退款
            addmediaChange_tuikuan(){
                this.addaccount_tuikuan ="";
            },

            addaccountChange_tuikuan(val){
                this.addMedia_tuikuan = "1";
            },
            btnMedia(){
                this.disabledPull = true;
                    this.addFormVisibleReceive4 = false;
                    this.$emit('media_infor', {shenheInfor: {
                            shenhe:this.shneheKey+1,
                            audit:1,
                            auditu:this.user.id,
                            note:this.textarea4,
                            bk_account:this.addaccount_tuikuan,
                            to_beikuanaccount:this.addMedia_tuikuan
                        }});
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

<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    .examine {
        .el-button--default{
            font-size: 12px;
            width: 43px;
            height: 23px;
        }
        .media_shenhe {
            .el-dialog {
                width:500px;
                margin-top: 30px!important;
                .el-dialog__body{
                    padding: 20px 50px;
                    color: #000000;
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    .xufei_a {
                        font-size: 14px;
                        p{
                            font-weight: bold;
                        }
                        .el-radio {
                            margin:5px 0;
                            .el-radio__label {
                                font-size: 12px;
                            }
                        }
                    }
                    .xufei_b {
                        font-size: 14px;
                        margin-bottom: 5px;
                        p{
                            font-weight: bold;
                        }
                        .el-radio {
                            margin:5px 0;
                            padding-left: 20px;
                            .el-radio__label {
                                font-size: 14px;
                            }
                        }
                    }
                    .note {
                        margin-top: 15px;
                        textarea{
                            height: 80px!important;
                        }
                    }
                }
            }

        }
        .el-dialog__header {
            position: relative;
            padding:0;
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
        .shenhe_note{
            width:100%;
            height:80px;
            border-left:1px solid #d9d9d9;
            position: relative;
            .top_icon {
                width:10px;
                height:10px;
                border-radius: 50%;
                border:2px solid #0b87e7;
                position: absolute;
                top:-5px;
                left:-5px;
            }
            .bottom_icon {
                width:10px;
                height:10px;
                border-radius: 50%;
                border:2px solid #0b87e7;
                position: absolute;
                bottom:-5px;
                left:-5px;
            }
            .box {
                width:100%;
                height:70px;
                position: absolute;
                top:-20px;
                left:10px;
                overflow: hidden;
                border:1px solid #c4dfb4;
                border-radius: 5px;
                background: #f6ffee;
                .header {
                    width:100%;
                    height:25px;
                    font-size: 12px;
                    padding: 0 5px;
                    .name{
                        display: inline-block;
                        height:100%;
                        line-height: 25px;
                        vertical-align: top;
                        float: left;
                    }
                    .date {
                        display: inline-block;
                        height:100%;
                        line-height: 25px;
                        vertical-align: top;
                        float: right;
                    }
                }
                .note{
                    width:100%;
                    height:40px;
                    .left_icon{
                        display: inline-block;
                        width:14%;
                        height:100%;
                        text-align: center;
                        line-height: 10px;
                        vertical-align: top;
                    }
                    .right_note {
                        display: inline-block;
                        width:82%;
                        height:100%;
                        vertical-align: top;
                        font-size: 12px;
                        -webkit-line-clamp: 3;
                        line-clamp: 3;
                        line-height: 13px;
                        -webkit-box-orient: vertical;
                        -o-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        word-break: break-word;
                        overflow: hidden;
                    }
                }
            }
            .box_no{
                border: 1px solid #e0aeb7!important;
                background: #fff1ea!important;
            }
        }
        .shenheBox {
            .tongguo{
                width: 55px!important;
                height: 30px!important;
                line-height: 24px;
                text-align: center;
                border: none;
                color: #fff!important;
                font-size: 12px;
                border-radius: 5px;
                background: #54adff!important;
                margin-top: -10px;
            }
            .notongguo{
                width: 55px !important;
                height: 30px!important;
                line-height: 30px!important;
                text-align: center;
                border: none;
                color: #fff!important;
                font-size: 12px;
                border-radius: 5px;
                background: #FF5662!important;
            }
            .iconShenhe:last-child{
                display: none;
            }
        }
        .shenhe_note:last-child{
            border-left:1px dashed #d9d9d9!important;
        }
    }
    .el-message-box__headerbtn {
        z-index: 999;
    }
</style>
