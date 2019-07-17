<template>
    <div class="bondList" >
        <el-row class="bondBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span >保证金列表</span>
            </p>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="保证金" name="first">
                    <bond  ref="bond" ></bond>
                </el-tab-pane>
                <el-tab-pane label="保证金退款" name="second">
                    <refund_list ref="refund_list" :refund_list="refund_list"></refund_list>
                </el-tab-pane>
              </el-tabs>

        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import { margin_m_list,ktuimargin } from '@/api/kehu';
    import bond from './components/bond';
    import refund_list from './components/refund_list';
    import moment from "moment"

    export default {
        data() {
            return {
                activeName:"first",
                bondClick:"",
                refund_list:"",
                dataNum:0,
            }
        },
        components: {
            refund_list,
            bond
        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list',
            ])
        },
        watch:{
            user:function(newValue){
            },
        },
        created(){
            let _this = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    if(_this.activeName == 'first'){
                        _this.$refs.bond.searchInput();

                    }else{
                        _this.$refs.refund_list.searchInput();
                    }
                }
            }
        },
        mounted(){
            this.$refs.bond.bondClick();
        },
        methods: {
            handleClick(){
                if(this.activeName == "first"){
                    this.$refs.bond.bondClick();
                }else{
                    this.$refs.refund_list.refund_list();
                }

            },
        },

        filters:{
            ctimeData(val){

                var time=new Date(parseInt(val) * 1000);
                return   moment(time).format('YYYY-MM-DD')
            },
            start(val){
                if(val == 1){
                    return "已审核"
                }else{
                    return "未通过"
                }
            },
            fileFun(val){
                if(val){
                    return val
                }else{
                    return '---'
                }
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
    .bondList {
        width:100%;
        .bondBox {
            .el-tabs__item{
                padding: 0 50px!important;
                text-align: center;
            }

        }

    }
</style>
