<template>
    <div>
        <div class="searchInput"
             v-if="this.$route.path == '/MediaManagement/AccountManagement/AccountManagementlist'|| this.$route.path == '/customer/cusList/kehuliebiao/accountList'">
            <input type="text" class="search" placeholder="请输入公司名" v-model='accountText' @keyup='show($event)' >
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
        <div class="searchInput">
            <input type="text" class="search" placeholder="请输入关键字" v-model='inputText' @keyup='show($event)'>
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
        <div class="searchInput">
            <input type="text" class="search" placeholder="请输入二级域名" v-model='yumingText' @keyup='show($event)'>
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
        <div class="dataInput">
            <el-date-picker
                    v-model="dataInput"
                    type="daterange"
                    @change="changedate"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"

    let text = '';
    let start = '';
    let end = '';
    export default {

        data() {
            return {
                accountText:'',
                screenInfor:'',
                inputText:'',
                yumingText:'',
                Search_type:'',
                Search_start:'',
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                value_a:'',
                options_a:[],

            }
        },

        methods:{
            changedate(){
                if(this.dataInput){
                        start = this.dataInput[0];
                        end = this.dataInput[1];
                        let data = {
                            Search_str:this.inputText,
                            serach_yuming:this.yumingText,
                            start_date:start,
                            end_date:end,
                            shenhe:this.Search_start,
                        };
                        this.$emit('search', {search: data});
                }else{
                    let data = {
                        search_adname:this.accountText,
                        Search_str:this.inputText,
                        serach_yuming:this.yumingText,
                        start_date:'',
                        end_date:'',
                        shenhe:this.Search_start,
                    };
                    this.$emit('search', {search: data});
                    start = '';
                    end = '';
                }

            },
            show: function(ev) {
                if(ev.keyCode == '13'){
                    let data = {
                        search_adname:this.accountText,
                        Search_str:this.inputText,
                        serach_yuming:this.yumingText,
                        start_date:start,
                        end_date:end,
                        shenhe:this.Search_start,
                    };
                    this.$emit('search', {search: data});
                }

            },
            searchClear(){
                let data = {
                    search_adname:'',
                    Search_str:'',
                    serach_yuming:'',
                    start_date:'',
                    end_date:'',
                    shenhe:'',
                };
                start = '';
                end = '';
                this.inputText = '';
                this.yumingText = '';
                this.Search_start = '';
                this.value_a = '审核状态';
                this.  dataInput = [];
                this.$emit('searchClear', {searchClear: data});
            },
        },
        mounted:function(){

        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            screen:function(newValue){
                this.inputText =  newValue[0].data;
                this.accountText =  newValue[0].data_account;
                this.serach_yuming =  newValue[0].data_yuming;

            },
        },
        props: ['screen']
    }

</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/search.scss";
</style>
