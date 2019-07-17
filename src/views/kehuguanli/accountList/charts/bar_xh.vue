<template>
    <el-col :span="24" style="width: 100%;height:300px;">
        <el-col :span="24" style="height:300px;position: absolute;z-index: 1" id="bar_xh"></el-col>
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
            line:function(leandName,dataInfor){
                var myChart1 = echarts.init(document.getElementById('bar_xh'));
                var xData = function() {
                    var data = [];
                    for (var i = 1; i < 13; i++) {
                        data.push(i + "月份");
                    }
                    return data;
                }();

               let option = {
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
                        "borderWidth": 0,
                        "top": 70,
                        "bottom": 20,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    "legend": {
                        x: '250',
                        top: '22',
                        textStyle: {
                            color: '#90979c',
                        },
                        "data": leandName
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
                    "yAxis": [{
                        "type": "value",
                        "splitLine": {
                            "show": false
                        },
                        "axisLine": {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        "axisTick": {
                            "show": false
                        },
                        "axisLabel": {
                            "interval": 0,

                        },
                        "splitArea": {
                            "show": false
                        },

                    }],
                    "series":dataInfor
                };
                myChart1.setOption(option);
                window.addEventListener("resize", function () {
                    myChart1.resize();
                },false);
            },
        };
      },
      watch: {
          bar_xh(dataList) {
              let name = [];
              for(let a in dataList[0].data){
                  name.push({
                      name:dataList[0].data[a].prlin,
                      data:[],
                  });
              }
              let data = [
              ];
              for(let i = 0;i<name.length;i++){
                  for(let n = 0;n<dataList.length;n++){
                      name[i].data.push(dataList[n].data[name[i].name].gs_lirun)
                  }
              }
              let nameInfor = [];
              for(let b = 0;b<name.length;b++){
                  nameInfor.push(name[b].name);
                  data.push({
                      "name": name[b].name,
                      "type": "bar",
                      "stack": "总量",
                      "barMaxWidth": 40,
                      "barGap": "10%",
                      "itemStyle": {
                          "normal": {
                              "label": {
                                  "show": false,
                                  "textStyle": {
                                      "color": "#fff"
                                  },
                                  "position": "insideTop",
                                  formatter: function(p) {
                                      return p.value > 0 ? (p.value) : '';
                                  }
                              }
                          }
                      },
                      "data": name[b].data,
                  })
              }
              this.line(nameInfor,data);
        },

      },
      mounted() {


      },

        props: ['bar_xh']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
        opacity: 0.9;
    }
</style>
