<template>
    <el-col :span="20"  style="width: 100%;height:300px;">
        <el-col :span="24" style="height:200px;" id="line"></el-col>
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
                line:function(date,maxcost,ave,cost,xufei){
                    var myChart1 = echarts.init(document.getElementById('line'));
                    let option = {

                        "tooltip": {
                            trigger: 'axis',
                            axisPointer: {type: 'cross'}
                        },
                        "legend": {
                            "data": ['充值','消耗','最高消耗','平均消耗']

                        },
                        "grid": {
                            "top": '13%',
                            "bottom": "30%",
                            "left":'8%',
                            "right":'8%',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        "dataZoom": [
                            {
                                "show": true,
                                "height": 30,
                                "xAxisIndex": [
                                    0
                                ],
                                bottom:0,
                                "start": 0,
                                "end": 100
                            },
                            {
                                "type": "inside",
                                "show": true,
                                "height": 15,
                                "xAxisIndex": [
                                    0
                                ],
                                "start": 1,
                                "end": 35
                            }
                        ],
                        xAxis: [
                    {
                        "type": "category",
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
                            rotate:45,//倾斜度 -90 至 90 默认为0
                            interval:0,
                            "show": true,
                            "splitNumber": 15,
                            "textStyle": {
                            "fontFamily": "微软雅黑",
                                "fontSize": 12
                        }
                    },
                        "data": date,
                    }
                        ],
                        "yAxis": [
                            {
                                "type": "value",
                                "splitLine": {
                                    "show": false
                                },
                                "axisLine": {
                                    "show": true
                                },
                                "axisTick": {
                                    "show": false
                                },
                                "splitArea": {
                                    "show": false
                                }
                            }
                        ],
                        color:['#f2b0ef','#5981f4','#ff0655','#ff8f03'],
                        series: [
                            {
                                name: '充值',
                                type: 'bar',
                                smooth: true,
                                barWidth: 20,
                                data:xufei
                            },
                            {
                                name: '消耗',
                                type: 'line',
                                smooth: false,

                                data:cost
                            },
                            {
                                name: '最高消耗',
                                type: 'line',
                                symbol:'none',
                                smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                                itemStyle:{
                                    normal:{
                                        lineStyle:{
                                            width:2,
                                            type:'dotted'  //'dotted'虚线 'solid'实线
                                        }
                                    }
                                },
//                                data: maxcost
                                data:maxcost
                            }, {
                                name: '平均消耗',
                                type: 'line',
                                symbol:'none',
                                itemStyle:{
                                    normal:{
                                        lineStyle:{
                                            width:2,
                                            type:'dotted'  //'dotted'虚线 'solid'实线
                                        }
                                    }
                                },
//                                data:cost
                                data:ave
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
            item(dataList) {
                let date = [];
                let ave = [];
                let cost = [];
                let maxcost = [];
                let xufei = [];
                let allcost = 0;
                for(let a = 0;a<dataList.data.length;a++){
                    allcost += Number(dataList.data[a].cost);
                }
                for(let a = 0;a<dataList.data.length;a++){
                    date.push(
                        dataList.data[a].date);
                    maxcost.push(Number(dataList.max).toFixed(2));
                    ave.push(Number(allcost/dataList.data.length).toFixed(2));
                    cost.push(Number(dataList.data[a].cost).toFixed(2));
                    xufei.push(Number(dataList.data[a].xufei).toFixed(2));
                }
                this.line(date,maxcost,ave,cost,xufei);
            },

        },
        mounted() {


        },

        props: ['item']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
        opacity: 0.9;
    }
</style>
