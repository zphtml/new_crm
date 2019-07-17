<template>
    <el-col :span="24" style="width: 100%;height:100%"  >
        <div style="width:100%; height:100%;" id="pie_xh" @click="jumpBackmoney"></div>
    </el-col>

</template>
<script>
    import echarts from 'echarts';
    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            line:function(val){
              let cha =   val.money-val.huikuan>=0?(val.money-val.huikuan).toFixed(2):0

                var myChart1 = echarts.init(document.getElementById('pie_xh'));
                let lastDate = '';
                if(val.huikuan_date == 0){
                    lastDate='近期无回款'
                }else{
                    lastDate='最后回款日期：'+val.huikuan_date
                }

                let option = {
                    title : {
                        text: lastDate,
                        left: 'right',
                        bottom: 0,
                        textStyle: {
                            color: '#b5b9bd',
                            fontSize:'12px',
                        }
                    },
                    series : [
                        {
                            name: '款项',
                            type: 'pie',
                            radius : '45%',
                            center: ['50%', '50%'],
                            color: [ '#FF602A','#86D560'],
                            data:[
                                {value:cha, name:'未回款'+'\n'+ cha.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')  },
                                {value:(val.huikuan).toFixed(2), name:'已回款'+'\n'+(val.huikuan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')},

                            ],
                            labelLine: {
                                normal: {
                                    smooth: 0.2,
                                    length: 5,
                                    length2: 5
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart1.setOption(option);
                window.addEventListener("resize", function () {
                    myChart1.resize();
                },false);
            },
        };
      },
      mounted() {


      },
        methods: {
            backmoney_pie_infor(val){
                this.line(val)
            },
            //回款跳转
            jumpBackmoney(){
                this.$router.push({ name: 'backMoneyPlan' });
            },
        },
    }
</script>
<style rel="stylesheet/scss"  lang="scss">

</style>
