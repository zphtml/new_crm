<template>
    <div  id="lineMarker1" style="height: 300px;"></div>
</template>
<script>
  import echarts from 'echarts';

  export default {
    data() {
      return {
        chart: null,
          line:function(monthData){
              var myChart1 = echarts.init(document.getElementById('lineMarker1'));
             let option =  {
                  title: {
                      text: '',
                          textStyle: {
                          fontWeight: 'normal',
                              fontSize: 16,
                              color: '#64676c'
                      },
                      left: '6%'
                  },
                  tooltip: {
                      trigger: 'axis',
                          axisPointer: {
                          lineStyle: {
                              color: '#64676c'
                          }
                      }
                  },
                  legend: {
                      icon: 'rect',
                          itemWidth: 14,
                          itemHeight: 5,
                          itemGap: 13,
                          data: ['利润'],
                          x : 'center',
                          textStyle: {
                          fontSize: 12,
                              color: '#64676c'
                      }
                  },
                  xAxis: [{
                      type: 'category',
                      boundaryGap: false,
                      axisLine: {
                          lineStyle: {
                              color: '#57617B'
                          }
                      },
                      axisLabel: {
                          margin: 10,
                          textStyle: {
                              fontSize: 14
                          }
                      },
                      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                  }],
                      yAxis: [{
                      type: 'value',
                      name: '单位（元）',
                      axisTick: {
                          show: true
                      },
                      axisLine: {
                          lineStyle: {
                              color: '#57617B'
                          }
                      },
                          splitLine: {
                              "show": false
                          },
                      axisLabel: {
                          margin: 10,
                          textStyle: {
                              fontSize: 14
                          }
                      },
                  }],
                      series: [{
                      name: '利润',
                      type: 'line',
                      smooth: true,
                      symbol: 'circle',
                      symbolSize: 5,
                      lineStyle: {
                          normal: {
                              width: 1
                          }
                      },
                          areaStyle: {
                              normal: {

                                  shadowColor: '#22adff',
                                  shadowBlur: 10
                              }
                          },
                      itemStyle: {
                          normal: {
                              color: '#5ab7fc',
                              borderColor: '#5ab7fc',
                              borderWidth: 12

                          }
                      },
                      data: monthData
                  }]
              };
              myChart1.setOption(option);
              window.addEventListener("resize", function () {
                  myChart1.resize();
              },false);
          },

      };
    },
      watch: {
          monthData(val) {
              this.line(val);
          }
      },
      props: ['monthData']
}

</script>
