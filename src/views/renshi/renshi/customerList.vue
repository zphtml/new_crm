<template>
    <div>
        <div class="searchInput">
            <input type="text" class="search" :placeholder="'请输入公司名/' + $t('titles.nick')" v-model='inputText' @keyup='show($event)'>
            <svg class="icon iconSearch" aria-hidden="true" style="width:18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
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
        <div class="startInput"  >
            <el-select v-model="value_a" placeholder="请选择" @change="searchstart">
                <el-option
                        v-for="(item, index) in options_a"
                        :key="index"
                        :label="item.label"
                        :value="index"
                        :other="item.label">
                </el-option>
            </el-select>
        </div>
        <div class="startInput"  >
            <el-select v-model="value_b" placeholder="请选择" @change="searchstart_b">
                <el-option
                        v-for="(item, index) in options_b"
                        :key="index"
                        :label="item.label"
                        :value="index"
                        :other="item.label">
                </el-option>
            </el-select>
        </div>
        <el-button type="text" class="ClickText" @click="searchClear">清除搜索条件</el-button>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"
    let date ='';
    let text = '';
    let start = '';
    let end = '';
    export default {

        data() {
            return {
                screenInfor:'',
                inputText:'',
                Search_type:'',
                Search_start:'',
                is_delete:'',
                dataInput: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    }
                },
                value_a:'',
                value_b:'',
                options_a:[],
                options_b:[],

            }
        },
        methods:{
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
                        let data = {
                            Search_str:this.inputText,
                            start_date:start,
                            end_date:end,
                            shenhe:this.Search_start,
                            is_delete: this.is_delete,
                        };
                        this.$emit('search', {search: data});
                    }
                }else{
                    start = '';
                    end = '';
                    let data = {
                        Search_str:this.inputText,
                        start_date:'',
                        end_date:'',
                        shenhe:this.Search_start,
                        is_delete: this.is_delete,
                    };
                    this.$emit('search', {search: data});
                }

            },
            searchstart(index){
                if(this.value_a != '审核状态'){
                    let reg = /^[\u4E00-\u9FA5]+$/;
                    if(!reg.test(index)) {
                        this.Search_start = this.options_a[index].value;
                    }
                    let data = {
                        Search_str:this.inputText,
                        start_date:start,
                        end_date:end,
                        shenhe:this.Search_start,
                        is_delete: this.is_delete,
                    };
                    this.$emit('search', {search: data});
                }

            },
            searchstart_b(index){

                if(this.value_b != '职位状态'){
                    let reg = /^[\u4E00-\u9FA5]+$/;
                    if(!reg.test(index)) {
                        this.is_delete = this.options_b[index].value;
                    }
                    let data = {
                        Search_str:this.inputText,
                        start_date:start,
                        end_date:end,
                        shenhe:this.Search_start,
                        is_delete: this.is_delete,
                    };
                    this.$emit('search', {search: data});
                }
            },
            show: function(ev) {

                if(this.inputText != ""){
                    if(this.inputText != text){
                        if (ev.keyCode == 38 || ev.keyCode == 40) {
                            if (this.nowIndex < -1){
                                return;
                            }
                            if (this.nowIndex != this.result.length && this.nowIndex != -1) {
                                this.inputText = this.result[this.nowIndex];
                            }
                            return;
                        }
                         start = '';
                         end = '';
                        if(date != []){
                            start = date[0];
                            end = date[1];
                        }
                        let data = {
                            Search_str:this.inputText,
                            start_date:start,
                            end_date:end,
                            shenhe:this.Search_start,
                            is_delete: this.is_delete,
                        };
                        this.$emit('search', {search: data});
                        if (ev.keyCode == 13) {
                            this.$emit('search', {search: data});
                        }
                        text = this.inputText;
                    }
                }else{
                    let data = {
                        Search_str:this.inputText,
                        start_date:start,
                        end_date:end,
                        shenhe:this.Search_start,
                        is_delete: this.is_delete,
                    };
                    this.$emit('search', {search: data});
                }
            },
            searchClear(){
                let data = {
                    Search_str:'',
                    start_date:'',
                    end_date:'',
                    shenhe:'',
                    is_delete: '',
                };
                start = '';
                end = '';
                this.is_delete = '';
                this.inputText = '';
                this.value_a = '审核状态';
                this.value_b = '职位状态';
                this.dataInput = [];
                this.Search_start = '';
                this.$emit('searchClear', {searchClear: data});
            },
        },
        mounted:function(){
            let that=this

            setTimeout(function () {
                that.dataInput=[that.$route.query.start,that.$route.query.end]
            },1000)
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        watch:{
            screen:function(newValue){
                this.value_a = newValue[0].name;
                this.options_a = newValue[0].data;
                this.value_b = newValue[1].name;
                this.options_b = newValue[1].data;
            },
        },
        props: ['screen']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .screen {
        width:100%;
        margin-top: 20px;
        .searchInput,.dataInput,.startInput,.searchButton {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            border:1px solid #b3b3b3;
            box-sizing: border-box;
            position: relative;
            .iconSearch {
                position: absolute;
                right: 5px;
                top: 0;
                bottom: 0;
                margin: auto;
                font-size: 18px;
                color: #bfcbd9;
            }
        }
        .searchInput {
            height:33px;
            width:170px;
            padding:0 3px;
            .el-select {
                width:215px;
                float: left;
                input{
                    width:130px;
                    height:29px!important;
                    line-height: 29px!important;
                    font-size: 12px;
                }
                .el-input__inner {
                    border-radius: 0;
                    border:none;
                }
            }
            .line {
                float: left;
                width: 1px;
                height:20px;
                background: #c0c0c0;
                margin-top: 5px;
            }
            .search {
                width:160px;
                float: left;
                height:30px!important;
                font-size: 12px;
                border:none;
                outline: none;
            }
        }
        .dataInput {
            height:33px;
            width:200px;

            .el-date-editor {
                width:100%;
                .el-input__inner {
                    border-radius: 0;
                    border:none;
                }
                input{
                    height:29px!important;
                    line-height: 29px!important;
                    font-size: 12px;
                }
            }


        }
        .startInput {
            width:115px!important;
            height: 32px;
            .el-select {
                width:100px;
                float: left;
                input{
                    height:29px!important;
                    line-height: 29px!important;
                    font-size: 12px;
                }
                .el-input__inner {
                    border-radius: 0;
                    border:none;
                }
            }
        }
        .ClickBtn {
            width:80px;
            height:32px;
            font-size: 12px;
        }
        .ClickText{
            color: #000;
            font-size: 12px;
        }
        .ClickText:focus, .ClickText:hover{
            color: #000;
        }
    }
</style>
