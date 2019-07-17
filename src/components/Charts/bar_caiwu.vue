<template>
    <el-col :span="24" style="margin-top: 30px;padding-bottom: 30px;height:300px;" id="bar"></el-col>
</template>
<script>
    import echarts from "echarts";
    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            line:function(yAxisName,namedata,seriesData){
                var myChart1 = echarts.init(document.getElementById('bar'));
                var xData = function() {
                    var data = [];
                    for (var i = 1; i < 13; i++) {
                        data.push(i + "月份");
                    }
                    return data;
                }();
                let option = {
                    backgroundColor: "#fff",
                    "title": {
                        x: "4%",
                        textStyle: {
                            color: '#fff',
                            fontSize: '22'
                        },
                        subtextStyle: {
                            color: '#90979c',
                            fontSize: '16',

                        },
                    },
                    "tooltip": {
                        "trigger": "axis",
                        "axisPointer": {
                            "type": "shadow",
                            textStyle: {
                                color: "#fff"
                            }

                        },
                    },
                    "grid": {
                        "top": '20%',
                        "left":'6%',
                        "right":'6%',
                        "bottom": "20%",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    "legend": {
                        top: '0%',
                        textStyle: {
                            color: '#90979c',
                        },
                        "data": namedata
                    },
                    "calculable": true,
                    "xAxis": [{
                        "type": "category",
                        "axisLine": {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        "splitLine": {
                            "show": false
                        },
                        "axisTick": {
                            "show": false
                        },
                        "splitArea": {
                            "show": false
                        },
                        "axisLabel": {
                            "interval": 0,

                        },
                        "data": xData,
                    }],
                    "yAxis": [
                        {
                            name: yAxisName,
                            type : 'value',
                            axisLabel: {
                                formatter: function (value, index) {
                                return value/10000+'万';
                                }
                            },
                            "splitLine": {
                                "show": false
                            },

                        },
                        {
                            type: 'value',
                            name: '元',
                            axisLabel: {
                                formatter: function (value, index) {
                                    return value/10000+'万';
                                }
                            },
                            "splitLine": {
                                "show": false
                            },
                        }
                    ],
//                    "dataZoom": [
//                        {
//                            "show": true,
//                            "height": 30,
//                            "xAxisIndex": [
//                                0
//                            ],
//                            bottom: 0,
//                            "start": 0,
//                            "end": 100,
//                            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
//                            handleSize: '110%',
//                            handleStyle:{
//                                color:"#ddd",
//
//                            },
//                            textStyle:{
//                                color:"#fff"},
//                            borderColor:"#eee"
//
//
//                        }, {
//                            "type": "inside",
//                            "show": true,
//                            "height": 15,
//                            "start": 1,
//                            "end": 35
//                        }],
                    "series": seriesData
                }
                myChart1.setOption(option);
                window.addEventListener("resize", function () {
                    myChart1.resize();
                },false);
            }
        };
      },
      watch: {
          screen_bar(dataList) {
              let dk_bar = [];
              let dk_line = [];
              let hk_bar = [];
              let hk_line = [];
              let seriesData = [];
          if(this.$route.path == "/customer/cusList/kehuliebiao/dataStatistics"){
              let namedata = ['回款', '充值','总回款','总充值'];
              for(let a = 0;a<dataList.huikuan.length;a++){
                  dk_bar.push(dataList.huikuan[a].money);
                  dk_line.push(dataList.huikuan[a].zong);
              }
              for(let n = 0;n<dataList.renew.length;n++){
                  hk_bar.push(dataList.renew[n].money);
                  hk_line.push(dataList.renew[n].zong);
              }
              seriesData = [
                  {
                      name:'回款',
                      type:'bar',
                      "itemStyle": {
                          "normal": {
                              "color": "#7681ff",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": dk_bar
                  },
                  {
                      name:'充值',
                      type:'bar',
                      "itemStyle": {
                          "normal": {
                              "color": "#f3b0ef",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": hk_bar
                  },
                  {
                      "name": "总回款",
                      "type": "line",
                      symbolSize:10,
                      symbol:'circle',
                      yAxisIndex: 1,
                      "itemStyle": {
                          "normal": {
                              "color": "#6ee0fa",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": dk_line
                  },
                  {
                      "name": "总充值",
                      "type": "line",
                      smooth:true,
                      symbolSize:10,
                      yAxisIndex: 1,
                      symbol:'circle',
                      "itemStyle": {
                          "normal": {
                              "color": "#ff6662",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": hk_line
                  }];
              this.line('',namedata,seriesData)
          }else{
              let namedata = ['打款', '回款','总打款','总回款'];
              for(let a = 0;a<dataList.dakuan.length;a++){
                  dk_bar.push(dataList.dakuan[a].money);
                  dk_line.push(dataList.dakuan[a].zong);
              }
              for(let n = 0;n<dataList.huikuan.length;n++){
                  hk_bar.push(dataList.huikuan[n].money);
                  hk_line.push(dataList.huikuan[n].zong);
              }
              seriesData = [
                  {
                  name:'打款',
                  type:'bar',
                  "itemStyle": {
                      "normal": {
                          "color": "#7681ff",
                          "barBorderRadius": 0,
                      }
                  },
                  "data": dk_bar
              },
                  {
                      name:'回款',
                      type:'bar',
                      "itemStyle": {
                          "normal": {
                              "color": "#f3b0ef",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": hk_bar
                  },
                  {
                      "name": "总打款",
                      "type": "line",
                      symbolSize:10,
                      symbol:'circle',
                      yAxisIndex: 1,
                      "itemStyle": {
                          "normal": {
                              "color": "#6ee0fa",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": dk_line
                  },
                  {
                      "name": "总回款",
                      "type": "line",
                      smooth:true,
                      symbolSize:10,
                      yAxisIndex: 1,
                      symbol:'circle',
                      "itemStyle": {
                          "normal": {
                              "color": "#ff6662",
                              "barBorderRadius": 0,
                          }
                      },
                      "data": hk_line
                  }];
              this.line('元',namedata,seriesData)
          }

        }
      },
      mounted() {


      },
        props: ['screen_bar']
    }
</script>
