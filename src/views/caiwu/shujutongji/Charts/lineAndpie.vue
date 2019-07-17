<template>
    <el-col :span="24" style="margin-top: 30px;padding-bottom: 30px;height:300px;" id="bar"></el-col>
</template>
<script>
    import echarts from 'echarts';
    export default {
        name: 'lineChart',
        data() {
            return {
                chart: null,
                line(dateInfor,cost,money,costAll,moneyAll){
                    var myChart = echarts.init(document.getElementById('bar'));
                    var xData = function() {
                        var data = [];
                        for (var i = 1; i < 13; i++) {
                            data.push(i + "月份");
                        }
                        return data;
                    }();
                    let   option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        grid: {
                            "left":'6%',
                            "top":"15%",
                            "right":'3%',
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
                                bottom: 0,
                                "start": 0,
                                "end": 100,
                                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                                handleSize: '110%',
                                handleStyle:{
                                    color:"#ddd",

                                },
                                textStyle:{
                                    color:"#fff"},
                                borderColor:"#eee"


                            }, {
                                "type": "inside",
                                "show": true,
                                "height": 15,
                                "start": 1,
                                "end": 35
                            }],
                        calculable : true,
                        legend: {
                            "top":'0%',
                            data:['账户币','现金',]
                        },
                        xAxis : [
                            {
                                type : 'category',
                                splitLine : {show : false},
                                data : dateInfor
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                position: 'left',
                                splitLine: {
                                    "show": false
                                },
                            }
                        ],
                        color:["#ff5c58",'#dbeeff'],
                        series : [
                            {
                                name:'账户币',
                                type:'line',
                                data:cost
                            },
                            {
                                name:'现金',
                                type:'line',
                                data:money
                            },
//                            {
//                                type:'pie',
//                                tooltip : {
//                                    trigger: 'item',
//                                    formatter: '{a} <br/>{b} : {c} ({d}%)'
//                                },
//                                center: ["14%",130],
//                                radius : [0, "60%"],
//                                label: {
//                                    normal: {
//                                        "formatter": "{d}%",
//                                        position: 'inner'
//                                    }
//                                },
//                                labelLine: {
//                                    normal: {
//                                        show: false
//                                    }
//                                },
//                                itemStyle :　{
//                                    normal : {
//                                        labelLine : {
//                                            length : 20
//                                        }
//                                    }
//                                },
//                                data:[
//                                    {value:costAll, name:'账户币'},
//                                    {value:moneyAll, name:'现金'},
//                                ]
//                            },
                        ]
                    };
                    myChart.setOption(option);
                    window.addEventListener("resize", function () {
                        myChart.resize();
                    },false);
                }
            };
        },
        watch: {
            item(dataList) {
                let dateInfor = [];
                let cost = [];
                let costAll = 0;
                let moneyAll = 0;
                let money = [];
                for(let a = 0;a<dataList.hk_sm.length;a++){
                    dateInfor.push(dataList.hk_sm[a].date);
                    cost.push(dataList.hk_sm[a].cost);
                    money.push(dataList.hk_sm[a].money);
                    costAll += Number(dataList.hk_sm[a].cost);
                    moneyAll += Number(dataList.hk_sm[a].money);
                }
                this.line(dateInfor,cost,money,costAll,moneyAll)
            }
        },
        mounted() {


        },
        props: ['item']
    }
</script>
