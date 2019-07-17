<template>
    <el-col :span="24" style="margin-top: 30px;padding-bottom: 30px;height:250px;" id="bar"></el-col>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import echarts from 'echarts';
    let all_lirun = ['总利润占比'];
    let Num_data = 0;
    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            line:function(all_lirun,lirun,pm,name){
                var myChart = echarts.init(document.getElementById('bar'));
                var xData = function() {
                    var data = [];
                    for (var i = 1; i < 13; i++) {
                        data.push(i + "月份");
                    }
                    return data;
                }();
                let  option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showDelay : 0,
                        axisPointer: {
                            type: 'shadow',

                            crossStyle: {
                                color: '#999'
                            }
                        },
                        formatter: function(data)
                        {
                         return name[Number([data[0].name])-1]+ '<br/>'+'利润:   '+data[0].value[1]

                        },
                    },

                    dataset: {
                        source: [
                            pm,
                            lirun,
                            all_lirun,
                        ]

                    },
                    xAxis: {
                        type: 'category',
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
                    },
                    "yAxis": [
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

                        },
                    ],
                    "grid": {
                        "top": '20%',
                        "left":'5%',
                        "right":'4%',
                        "bottom": "20%",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    color:['#f2b0ef','#63def9'],
                    series: [
                        {type: 'bar',
                            barWidth : 17,
                            smooth: true,
                            seriesLayoutBy: 'row',
                            itemStyle:{
                                normal:{
                                    color:'#f2b0ef'
                                }
                            },
                        },
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '35%',
                            center: ['80%', '25%'],
                            encode: {
                                itemName: 'product',
                            },
                            labelLine:{
                                normal:{
                                    length:5
                                }
                            },
                        }
                    ]
                };
                myChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1;
                        let numData = Num_data - dimension;
                        let data =  ['总利润占比('+Num_data+')'];
                        for(var a = 0;a<(all_lirun.length)-1;a++){
                            data.push(numData)
                        }
                        all_lirun = data;
                        myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                                showDelay : 0,
                                axisPointer: {
                                type: 'shadow',

                                    crossStyle: {
                                    color: '#999'
                                }
                            },
                        formatter: function(data)
                        {
                            return name[Number([data[0].name])-1]+ '<br/>'+'利润:   '+data[0].value[1]

                        },
                    },
                            dataset: {
                                source: [
                                    pm,
                                    lirun,
                                    data,
                                ]
                            },
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{d}%'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        });
                    }
                });
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                },false);
            }
        };
      },
      watch: {
          screen_lineAndbar(dataList) {
               Num_data = 0;
              let pm = ['product'];
              let lirun = ['利润'];
              let name = [];
              for(let a = 0;a<dataList.length;a++){
                  Num_data += Number(dataList[a].xiaoshou_lirun);
              };
              Num_data = Num_data.toFixed(2);
              all_lirun = ['总利润占比('+Num_data+')'];
              Num_data = Num_data.toString();
              let NewData = [];
              if(dataList.length>=20){
                  NewData =  dataList.slice(0,20);
              }else{
                  NewData = dataList;
              }
              for(let i = 0;i<NewData.length;i++){
                  all_lirun.push(Num_data);
                  pm.push((i+1).toString());
                  name.push(dataList[i].advertiser);
                  lirun.push(dataList[i].xiaoshou_lirun)
              };
              let dataInfor = [pm,all_lirun,];
              this.line(all_lirun,lirun,pm,name)
        }
      },
      mounted() {


      },
        props: ['screen_lineAndbar']
    }
</script>
