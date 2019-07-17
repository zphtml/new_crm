<template>
    <el-col :span="24">
        <el-col :span="24" style="margin-top: 10px;padding-bottom: 30px;height:300px;position: absolute;z-index: 1" id="line"></el-col>
       <div style="position: absolute;width: 100%;height: 300px;top: 55px"   v-bind:class="{ backImg:isShowDialog }" >
           <div style="width: 100%;height: 300px;" id="bing"></div>
       </div>
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
            isShowDialog:false,
            xiaohaotjprlin:function(date,name){
                xiaohaotjprlin({
                    id:date
                }).then(response => {
                    let nameData = [];
                    let cost = [];
                    let money = [];
                    for(var i = 0;i<response.length;i++){
                        nameData.push(response[i].name);
                        cost.push({
                         name:response[i].name,
                         value:response[i].cost,
                        });
                        money.push({
                            name:response[i].name,
                            value:response[i].money,
                        });
                    }
                    if(name == "账户币"){
                        this.bing('账户币',nameData,cost)
                    }else{
                        this.bing('现金',nameData,money)
                    }

                }).catch(error => {

                });
            },
            line:function(zh_money,money,date){
                var myChart1 = echarts.init(document.getElementById('line'));
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
                        "bottom": "24%",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    "legend": {
                        top: '0%',
                        textStyle: {
                            color: '#90979c',
                        },
                        "data": ['账户币','现金']
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
                            rotate:45,//倾斜度 -90 至 90 默认为0
                            interval:0,

                        },
                        "data": date,
                    }],
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
                    "series": [
                        {
                            "name": "账户币",
                            "type": "line",
                            symbolSize:10,
                            symbol:'circle',
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#dbeeff'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": "#6ee0fa",
                                    "barBorderRadius": 0,
                                }
                            },
                            "data":zh_money
                        },
                        {
                            "name": "现金",
                            "type": "line",
                            smooth:true,
                            symbolSize:10,
                            symbol:'circle',
                            areaStyle: {
                                normal: {
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            "itemStyle": {
                                "normal": {
                                    "color": "#ff6662",
                                    "barBorderRadius": 0,
                                }
                            },
                            "data": money
                        },
                    ]
                }
                myChart1.setOption(option);
                let _this = this;
                myChart1.on('click', function (params) {
                    _this.xiaohaotjprlin(params.name,params.seriesName);
                    _this.isShowDialog = true;
                });
                window.addEventListener("resize", function () {
                    myChart1.resize();
                },false);
            },
            bing:function(name,nameData,money){
                var myChart2 = echarts.init(document.getElementById('bing'));
                let option = {
                    title : {
                        text: '产品线（'+name+')',
                        textStyle: {
                            color: '#fff',
                            fontSize: 18,
                        },
                        x:'center'
                    },
                    color:['#8fc31f','#f35833','#00ccff','#ffcc00'],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top: '5%',
                        textStyle: {
                            color: 'white',
                        },
                        orient: 'vertical',
                        x: 'right',
                        data: nameData,
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '45%',
                            center: ['30%', '50%'],
                            data:money,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart2.setOption(option);
                window.addEventListener("resize", function () {
                    myChart2.resize();
                },false);
            }
        };
      },
      watch: {
          screen_line(dataList) {
              let zh_money = [];
              let money = [];
              let date = [];
              for(var a = 0;a<dataList.length;a++){
                  zh_money.push(dataList[a].cost);
                  money.push(dataList[a].money);
                  date.push(dataList[a].date);
              }
              this.line(zh_money,money,date);
        },

      },
      mounted() {


      },
        created() {
            // 点击其他不在的区域触发事件
            document.addEventListener('click', (e) => {
                if (!this.$el.contains(e.target)){
                    this.isShowDialog = false;
                }
            })
        },
        props: ['screen_line']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
        opacity: 0.9;
    }
</style>
