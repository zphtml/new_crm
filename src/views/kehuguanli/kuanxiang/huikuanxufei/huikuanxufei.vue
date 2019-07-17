<template>
    <div class="huikuanxufei" >
        <el-row class="huikuanxufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >已回款充值</span>
            </p>
            <el-col :span="24" class="compactListTabs">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsList" >
                    <el-tab-pane label="充值列表" name="xufei" >
                        <renew ref="renew"></renew>
                    </el-tab-pane>
                    <el-tab-pane label="退款列表" name="tuikuan">
                        <tuikuan ref="tuikuan"  ></tuikuan>
                    </el-tab-pane>
                    <el-tab-pane label="公司补款" name="gs_bukuan">
                        <gs_bukuan ref="gs_bukuan" ></gs_bukuan>
                    </el-tab-pane>
                    <el-tab-pane label="客户补款" name="kh_bukuan">
                        <kh_bukuan ref="kh_bukuan" ></kh_bukuan>
                    </el-tab-pane>
                </el-tabs>
            </el-col>


        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapActions,mapGetters} from 'vuex';
    import { yihuikuanxufei_list } from '@/api/kehu';
    import renew from './xufei/xufei';
    import tuikuan from './tuikuan/tuikuan';
    import gs_bukuan from './gongsibukuan/gs_bukuan';
    import kh_bukuan from './kehubukuan/kh_bukuan';



    export default {
        data() {
            return {
                activeName:'xufei',
                is_xufei:true,
                is_tuikuan:false,
                is_gs_bukuan:false,
                is_kh_bukuan:false,
            }
        },
        components: {
            renew,
            tuikuan,
            gs_bukuan,
            kh_bukuan
        },
        mounted(){
            this.$refs.renew.renewList(this.is_xufei);
        },
        methods: {
            handleClick(){
                this.activeName == 'xufei'? this.is_xufei =true:this.is_xufei =false;
                this.activeName == 'tuikuan'? this.is_tuikuan =true:this.is_tuikuan =false;
                this.activeName == 'gs_bukuan'? this.is_gs_bukuan =true:this.is_gs_bukuan =false;
                this.activeName == 'kh_bukuan'? this.is_kh_bukuan =true:this.is_kh_bukuan =false;
                if(this.activeName == 'xufei'){
                    this.$refs.renew.renewList(this.is_xufei);
                }else if(this.activeName == 'tuikuan'){
                    this.$refs.tuikuan.tuikuanList(this.is_tuikuan);
                }else if(this.activeName == 'gs_bukuan'){
                    this.$refs.gs_bukuan.gs_bukuanList(this.is_gs_bukuan);
                }else if(this.activeName == 'kh_bukuan'){
                    this.$refs.kh_bukuan.kh_bukuanList(this.is_kh_bukuan);
                }

            },
        },
        created() {
            let _this = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    if(_this.activeName == 'xufei'){
                        _this.$refs.renew.searchInput();
                    }else  if(_this.activeName == 'tuikuan'){
                        _this.$refs.tuikuan.searchInput();
                    }else  if(_this.activeName == 'gs_bukuan'){
                        _this.$refs.gs_bukuan.searchInput();
                    }else  if(_this.activeName == 'kh_bukuan'){
                        _this.$refs.kh_bukuan.searchInput();
                    }
                }
            }
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/search.scss";
</style>
