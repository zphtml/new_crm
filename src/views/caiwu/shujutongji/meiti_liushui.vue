<template>
    <div class=" liushui" >
        <el-col :span="24">
            <el-row class="caiwu_line">
                <p class="crm_title">
                    <i class="crm_line"></i>
                    <span >媒体流水</span>
                </p>
            </el-row>
        </el-col>
        <el-col :span="24" class="top_year" style="margin-top: 10px">
            <el-date-picker
                    v-model="yearData"
                    align="right"
                    type="year"
                    @change="yearChange"
                    :clearable="false"
                    placeholder="选择年">
            </el-date-picker>
            <div class="allMoney">
                全年总流水：{{ consumption | currency('') }}
            </div>
        </el-col>
        <el-col :span="24">
            <mediaPie :monthData="monthData"  width='100%'></mediaPie>
        </el-col>
    </div>
</template>

<script>
    import mediaPie from './Charts/mediaPie';
    import { getmedia,getmedialine } from '@/api/customer1';
    import moment from "moment"
    let month = '';
    let year = '';
    export default {
        data(){
            return {
                yearData:moment().format('YYYY'),
                consumption:0,
                monthData:[],
                getmedia:function(){
                    getmedia({
                        data:moment(this.yearData).format('YYYY-01-01')+"/"+moment(this.yearData).format('YYYY-12-31'),
                    }).then(response => {
                        let allpie = [];
                        let Num = 0;
                        for(var i = 0;i<response.data.length;i++){
                            allpie.push({
                                value:response.data[i].money,
                                name:response.data[i].name,
                                id:response.data[i].id,
                            })
                            Num += Number(response.data[i].money)
                        }
                        this.consumption = Num;
                        this.monthData ={
                            data:allpie,
                            date:moment(this.yearData).format('YYYY'),
                        };
                    }).catch(error => {
                        this.$message.error("error");
                    });
                },
//====================================================================
            }
        },
        components: {
            mediaPie,
        },
        mounted() {
            this.getmedia();
        },
        methods: {
            yearChange(){
                this.getmedia();
            },
//=============================================================================
        },


    };
</script>
<style rel="stylesheet/scss"  lang="scss">
    @import "src/styles/crmStyle/title.scss";
    @import "src/styles/crmStyle/table.scss";
    .liushui {
        .top_year{
            .el-date-editor {
                width:160px;
                input{
                    height:30px!important;
                    line-height: 30px!important;
                }
                .el-input__icon {
                    line-height: 21px;
                }
            }
            .allMoney {
                height:30px;
                line-height: 30px;
                display: inline-block;
                background: #e3f3ff;
                color: #22adff;
                font-size: 14px;
                font-weight: bold;
                padding:0 10px;
                margin-left: 20px;
            }
        }
    }

</style>
