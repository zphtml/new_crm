<template>
    <div>
        <div class="searchInput">
            <input type="text" class="search" placeholder="请输入搜索内容"   @keydown.13="show" v-model='inputText' @change="input">
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
        <div class="dateType">
            <el-select  v-model="date_type" placeholder="请选择" @change="dateTypeChange">
                <el-option
                        v-for="(item, index) in options_type"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        :other="item.name">
                </el-option>
            </el-select>
        </div>
        <div class="dataInput">
            <el-date-picker
                    v-model="dataInput"
                    type="daterange"
                    @change="changedate"
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
    let date ='';
    let start = '';
    let end = '';
    export default {

        data() {
            return {
 // 搜索时间
                date_type:1,
                options_type:[{
                    name:'创建时间',
                    id:1,
                },{
                    name:'完成时间',
                    id:2
                }],
                screenInfor:'',
                inputText:'',
                Search_type:'',
                Search_start:'',
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },

            }
        },


        methods:{
//搜索日期条件选择
            dateTypeChange(){
                let data = {
                    Search_str:this.inputText,
                    start_date:start,
                    end_date:end,
                    shenhe:this.Search_start,
                    date_type:this.date_type,
                };
                this.$emit('search', {search: data});
            },
            changedate(){

                if(this.dataInput){
                    if(this.dataInput.length != 0){
                        if(this.dataInput){
                            date = [];
                            for(var i = 0;i<this.dataInput.length;i++){
                                date.push(moment(this.dataInput[i]).format('YYYY-MM-DD'));
                            }
                        }
                        start = '';
                        end = '';
                        if(date != []){
                            start = date[0];
                            end = date[1];
                        }
                    }
                }else{
                    start = '';
                    end = '';
                }
                let data = {
                    Search_str:this.inputText,
                    start_date:start,
                    end_date:end,
                    shenhe:this.Search_start,
                    date_type:this.date_type,
                };
                this.$emit('search', {search: data});
            },
            input(){
                if(this.inputText == ''){
                    let data = {
                        Search_str:this.inputText,
                        start_date:start,
                        end_date:end,
                        shenhe:this.Search_start,
                        date_type:this.date_type,
                    };
                    this.$emit('search', {search: data});
                }
            },
            show: function(ev) {
                let data = {
                    Search_str:this.inputText,
                    start_date:start,
                    end_date:end,
                    shenhe:this.Search_start,
                    date_type:this.date_type,
                };
                this.$emit('search', {search: data});
            },
            searchClear(){
                let data = {
                    Search_str:'',
                    start_date:'',
                    end_date:'',
                    shenhe:'',
                    date_type:1,
                };
                this.date_type = 1;
                start = '';
                end = '';
                this.inputText = '';
                this.  dataInput = [];
                this.$emit('searchClear', {searchClear: data});
            },
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            screen:function(newValue){
                if(newValue[0]){
                    this.inputText = newValue[0].infor
                }
            },
        },
        props: ['screen']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/search.scss";
</style>
