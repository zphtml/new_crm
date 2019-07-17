<template>
    <div class="compactList" >
        <el-row class="compactBox">
            <p class="crm_title">
                <i class="crm_line"></i>
                <span>执行框架列表</span>
            </p>
            <el-col :span="24" class="compactListTabs">
                <el-button type="success" plain  size="small"  style="   position: absolute; right: 0; top: 20px;z-index: 99;" @click="outExcel">导出Excel</el-button>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsList" >
                    <el-tab-pane label="正常合同" name="first">
                        <normal ref="normal"></normal>
                    </el-tab-pane>
                    <el-tab-pane label="作废合同" name="second">
                        <abrogate ref="abrogate"></abrogate>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /*eslint-disable */
    import {mapGetters,mapActions} from 'vuex';
    import criteria from '@/components/search/criteria';  //获取条件
    import normal from './xieyi/normal';
    import abrogate from './xieyi/abrogate';
    import moment from "moment"
    export default {

        data() {
            return {
                activeName:"first",
                //产品线
                selectLineData:[],
            }
        },

        components: {
            normal,
            abrogate,

        },
        computed: {
            ...mapGetters([
                'user',
                'audit_action',
                'search_list'
            ])
        },

        created(){
            let _this = this;
            document.onkeydown = function(e){
                if(e.which == '13'){
                    if(_this.activeName == 'first'){
                        _this.$refs.normal.searchInput();
                    }else{
                        _this.$refs.abrogate.searchInput();
                    }
                }
            }
        },
        mounted(){
            // 产品线
            criteria.productline().then(response => {
                this.selectLineData = response;
                this.$refs.normal.lineData(  this.selectLineData );
            });
            this.$refs.normal.normalClick();

        },
        methods: {
            ...mapActions([
                'searchData',
                'Account',
            ]),

            handleClick() {
                if(this.activeName == 'first'){
                    this.$refs.normal.normalClick(this.selectLineData);
                    this.$refs.abrogate.lineData(  this.selectLineData );
                }else{
                    this.$refs.abrogate.abrogateClick(this.selectLineData);
                    this.$refs.abrogate.lineData(  this.selectLineData );
                }
            },
            //导出
            outExcel(){
                if(this.activeName == "first"){
                    this.$refs.normal.outExcel();

                }else {
                    this.$refs.abrogate.outExcel();
                }
            },
        },

    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/table.scss";
    @import "src/styles/crmStyle/title.scss";
</style>
