<template>
    <el-col :span="24">
        <el-col :span="24" style="height:300px;" id="line_b"></el-col>
    </el-col>

</template>
<script>
    import echarts from 'echarts';
    export default {
        name: 'lineChart',
        data() {
            return {
                chart: null,
                line:function(dataNum){
                    var myChart1 = echarts.init(document.getElementById('line_b'));
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
                            "data": ['新客数量']
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
                            "data": xData,
                        }],
                        "yAxis": [
                            {
                                type: 'value',
                                name: '新客数量',
                                "splitLine": {
                                    "show": false
                                },

                            },
                        ],
                        "legend": {
                            "data": ['新客数量']
                        },
                        "series": [
                            {
                                "name": "新客数量",
                                "type": "line",
                                "stack": "总量",
                                symbolSize:10,
                                symbol:'circle',
                                "itemStyle": {
                                    "normal": {
                                        "color": "#63def9  ",
                                        "barBorderRadius": 0,
                                    }
                                },
                                "data":dataNum,
                            },
                        ]
                    }
                    myChart1.setOption(option);
                    let _this = this;
                    window.addEventListener("resize", function () {
                        myChart1.resize();
                    },false);
                },
            };
        },
        watch: {
            line_b(dataList) {
                let count = [];
                for(let i = 0;i<dataList.length;i++){
                    count.push(dataList[i].count)
                }
                this.line(count);
            },

        },
        mounted() {


        },
        created() {
        },
        props: ['line_b']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
        opacity: 0.9;
    }
</style>
