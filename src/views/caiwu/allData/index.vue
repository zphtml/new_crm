<template>
    <div>
        <el-row class="huikuanxufeiBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >财务统计</span>
            </p>
            <el-col :span="24" class="compactListTabs">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsList" >
                    <el-tab-pane label="充值列表" name="xufei" >
                        <renew ref="renew"></renew>
                    </el-tab-pane>
                    <el-tab-pane label="备款列表" name="beikuan">
                        <beikuan ref="beikuan"  ></beikuan>
                    </el-tab-pane>
                    <el-tab-pane label="数据检察" name="check_kehu_data">
                        <check_kehu_data ref="check_kehu_data" ></check_kehu_data>
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
    import beikuan from './beikuan/beikuan';
    import check_kehu_data from './check_kehu_data/check_kehu_data';
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
            beikuan,
            check_kehu_data,
        },
        mounted(){
            this.$refs.renew.renewList(this.is_xufei);
        },
        methods: {
            handleClick(){
                if(this.activeName == 'xufei'){
                    this.$refs.renew.renewList(this.is_xufei);
                }else if(this.activeName == 'beikuan'){
                    this.$refs.beikuan.beikuanList(this.is_tuikuan);
                }else if(this.activeName == 'check_kehu_data'){
                    this.$refs.check_kehu_data .check_kehu_click();
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/search.scss";
</style>
