<template>
    <div  id="line" style="height: 300px;"></div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                chart: null,
                line:function(seriesData){
                    var myChart1 = echarts.init(document.getElementById('line'));
                    let option = {
                        title: {
                            text: '',
                                textStyle: {
                                fontWeight: 'normal',
                                    fontSize: 16,
                                    color: '#64676c'
                            },
                            left: '6%'
                        },
                        legend: {
                            icon: 'rect',
                                itemWidth: 14,
                                itemHeight: 5,
                                itemGap: 13,
                                data: ['充值'],
                                x : 'center',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: '#64676c'
                                }
                            }
                        },
                        grid: {
                            left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
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
                        yAxis: [
                         {
                            type: 'value',
                            name: '单位（元）',
                            axisTick: {
                                show: true
                            },
                             splitLine: {
                                 "show": false
                             },
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
                    }],
                        series: [
                            {
                        name: '充值',
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
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                                    offset: 1,
                                    color: 'white'
                                },{
                                    offset: 0.5,
                                    color: '#22adff'
                                }], false),
                                shadowColor: '#22adff',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#22adff',
                                borderColor: '#22adff',
                            }
                        },
                        data: seriesData
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
