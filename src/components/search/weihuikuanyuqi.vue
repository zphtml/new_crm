<template>
    <div style="text-align: center">
        <div class="searchInput_yuqi">
            <input type="text" class="search" :placeholder="'请输入公司名/' + $t('titles.nick')" v-model='inputText' @keyup='show($event)'>
            <svg class="icon iconSearch" aria-hidden="true" style="width: 18px;height: 18px;">
                <use xlink:href="#icon-11"></use>
            </svg>
        </div>
        <span style="font-size: 12px;display: inline-block;margin: 0 auto;">未回款逾期总额:{{ weihuikuan_num | currency('') }}</span>
        <div class="dataInput" style="float: right;">
            <el-date-picker
                    v-model="dataInput"
                    type="date"
                    @change="changedate"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions0">
            </el-date-picker>
        </div>
        <span style="float: right;font-size: 12px;    margin-top: 8px;"> 截止日期：</span>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import moment from "moment"
    let date = moment().format('YYYY-MM-DD');
    export default {

        data() {
            return {
                screenInfor:'',
                inputText:'',
                Search_type:'',
                Search_start:'',
                weihuikuan_num:'',
                dataInput: moment().format('YYYY-MM-DD'),
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },

            }
        },
        methods:{
            changedate(){

          if(this.dataInput){
              date = moment(this.dataInput).format('YYYY-MM-DD');
              let data = {
                  adname:this.inputText,
                  date:date,
              };
              this.$emit('search', {search: data});
          }else{
              let data = {
                  adname:this.inputText,
                  date:'',
              };
              this.$emit('search', {search: data});
          }

            },
            show: function(ev) {
                if(ev.keyCode == '13'){
                    let data = {
                        adname:this.inputText,
                        date:date,
                    };
                    this.$emit('search', {search: data});
                }
            },
            searchClear(){
                let data = {
                    adname:'',
                    date:'',
                };
                this.inputText = '';
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
               this.weihuikuan_num = newValue;
            },
        },
        props: ['screen']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .screen {
        width:100%;
        margin-top: 20px;
        .searchInput_yuqi,.dataInput,.startInput,.searchButton {
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
        .searchInput_yuqi {
            height:32px;
            width:220px;
            padding:0 3px;
            float: left;
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
                width:210px;
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
                .el-input__icon {
                    vertical-align: top;
                    line-height: 20px;
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
