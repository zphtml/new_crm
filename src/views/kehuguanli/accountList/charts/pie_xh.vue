<template>
    <el-col :span="8" style="width: 100%;height:300px;">
        <el-col :span="8" style="height:300px;position: absolute;z-index: 1" id="pie_xh"></el-col>
    </el-col>

</template>
<script>
    import { xiaohaotjprlin } from '@/api/money';
    import echarts from 'echarts';
    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            line:function(series_data,nameData){
                var myChart1 = echarts.init(document.getElementById('pie_xh'));
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:['#8fc31f','#f35833','#00ccff','#ffcc00'],
                    legend: {
                        orient: 'vertical',
                        left:"65%",
                        top: 60,
                        data: nameData,

                    },
                    series : [
                        {
                            name: '签到比例分析',
                            type: 'pie',
                            radius : '45%',
                            center: ['20%', '45%'],
                            data:series_data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    label:{
                                        show: false,
//	                            position:'inside',
                                        formatter: '{b} : {c} ({d}%)'
                                    }
                                },
                                labelLine :{show:true}
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
      watch: {
          pie_xh(dataList) {
          let series_data = [];
          let nameData = [];
          for(let a = 0;a<dataList[0].allrenew.length;a++){
              nameData.push(dataList[0].name[a]);
              series_data.push({
                  value:dataList[0].allrenew[a],
                  name:dataList[0].name[a],
              })
          }
              this.line(series_data,nameData);
        },

      },
      mounted() {


      },

        props: ['pie_xh']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
        opacity: 0.9;
    }
</style>
