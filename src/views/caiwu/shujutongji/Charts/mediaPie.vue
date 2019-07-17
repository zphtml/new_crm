<template>
    <el-col :span="24">
        <div  id="pie" style=" height: 320px;width:100%;"></div>
        <div  id="line" style=" height: 300px;width:100%;margin-top: 20px"></div>
    </el-col>
</template>
<script>
    import echarts from 'echarts';
    import { mediaRunning } from '@/api/customer1';
    export default {
        data() {
            return {
                chart: null,
                date:'',
                mediaRunning:function (prlinid,name) {
                    mediaRunning({
                        prlinid:prlinid,
                        date:this.date,
                    }).then(response => {
                        let data= [];
                        for(let a = 0;a<response.data.length;a++){
                            data.push(response.data[a].money)
                        }
                        this.lineEcharts(name,data);
                    }).catch(error => {
                        this.$message.error("error");
                    });
                },
                pieEcharts:function(seriesData,legendAll){
                    var myChart = echarts.init(document.getElementById('pie'));
                    let option =  {
                        tooltip : {
                            show: true,
                        },
                        legend: {
                            orient : 'vertical',
                                x : 'right',
                                data:legendAll,
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: true,
                                    textStyle: {
                                    color:'#fff',
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                }
                            }
                        },
                        color:['#4bc5b0','#46a0ba','#3e7ebe','#8a50f4','#ae4bb5','#f5458e','#f64d60'],
                        calculable : true,
                            series : [
                            {
                                name:'访问来源',
                                type:'pie',
                                center : ['30%', 180],
                                radius : [100, 120],
                                data:seriesData
                            }
                        ]
                    };
                    let _this = this;
                    myChart.setOption(option);
                    myChart.on('click', function (params) {
                        _this.mediaRunning(params.data.id,params.data.name)
                    });
                    window.addEventListener("resize", function () {
                        myChart.resize();
                    },false);
                },
                lineEcharts:function(lendName,seriesData){
                    var myChart1 = echarts.init(document.getElementById('line'));
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
                            "data": ['销售利润"']
                        },
                        "calculable": true,
                        "xAxis": [{
                            "type": "category",
                            boundaryGap: false,
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
                            data: xData
                        }],
                        "yAxis": [
                            {
                                type: 'value',
                                name: '媒体金额流水趋势（元）',
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
                        "legend": {
                            "data": [lendName]
                        },
                        "series": [
                            {
                                "name": lendName,
                                "type": "line",
                                "stack": "总量",
                                symbolSize:10,
                                symbol:'circle',
                                "itemStyle": {
                                    "normal": {
                                        "color": "#f2b0ef",
                                        "barBorderRadius": 0,
                                    }
                                },
                                "data":seriesData,
                            },
                        ]
                    };
                    myChart1.setOption(option);
                    let _this = this;
                    window.addEventListener("resize", function () {
                        myChart1.resize();
                    },false);
                },
            }
        },
        watch: {
            monthData(val) {
                let all = [];
                for(var i in val.data) {
                    all.push(val.data[i].name);
                }
                this.date = val.date;
                this.mediaRunning('','全部产品线');
                this.pieEcharts(val.data,all);
                this.lineEcharts();
            }
        },
        props: ['monthData']

    }
</script>



