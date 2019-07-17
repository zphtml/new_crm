<template>
    <el-col :span="24"  style="width: 100%;height:300px;">
        <el-col :span="24" style="height:300px;position: absolute;z-index: 1" id="line"></el-col>
    </el-col>

</template>
<script>
    import echarts from 'echarts';

    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            line:function(legendName,date,ave){
                var myChart1 = echarts.init(document.getElementById('line'));
                let option = {

                    tooltip: {
                        trigger: 'axis'
                    },
                    "legend": {
                        top: 50,
                        left:"20%",

                        "data": legendName
                    },
                    "grid": {
                        "top": '40%',
                        "bottom": "20%",
                        "left":'8%',
                        "right":'15%',
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: ave
                };
                myChart1.setOption(option);
                window.addEventListener("resize", function () {
                    myChart1.resize();
                },false);
            },
        };
      },
      watch: {
          screen_line(dataList) {
              let date = [];
              let ave = [];
              let legendName = [];
                for(let i in dataList.data){
                    let n = [];
                    date = [];
                    dataList.data[i].map(item=>{
                        date.push(item.date);
                        n.push(item.cost);
                    })
                    legendName.push(i)
                    ave.push( {
                        name: i,
                        type: 'line',
                        smooth: true,
                        data:n
                    });
                }
              this.line(legendName,date,ave);
        },

      },
      mounted() {


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
