<template>
    <el-col :span="24" style="margin-top: 30px;padding-bottom: 30px;height:350px;" :id="chartId"></el-col>
</template>
<script>
  import echarts from 'echarts';

  export default {
    name: 'barstack',
    props: {
      datas:{
        type: Array,
        default: [],
      },
      nameProperty:{
        type: String,
        default: 'name',
      },
      valueProperty:{
        type: String,
        default: 'value'
      },
      x_valueProperty:{
        type: String,
        default: 'date',
      },
      chartId: {
        type: String,
        default: 'bar-stack'
      }
    },
    data() {
      return {
        x_values: [],
        legend_data: [],
      }
    },
    methods: {
      formatDatas(newDatas) {
        const datasObj = {};
        const x_datas = new Set();
        for (const item of newDatas){
          const name = item[this.nameProperty];
          const value = item[this.valueProperty];
          const x_data = item[this.x_valueProperty];
          if (!datasObj[name]) {
            datasObj[name] = {};
          }
          datasObj[name][x_data] = value;
          x_datas.add(x_data);
        }

        this.x_values = Array.from(x_datas);

        const seriesDatas = [];
        this.legend_data = [];
        for (const name in datasObj){
          const itemObj = datasObj[name];
          this.legend_data.push(name);

          const arr = [];
          for (const x of x_datas.keys()) {
            if (!itemObj[x]) {
              arr.push('--');
            } else {
              arr.push(itemObj[x])
            }
          }
          const serieData = {
            name,
            type: 'bar',
            stack: 'total',
            data: arr,
          };
          seriesDatas.push(serieData);
        }
        return seriesDatas;
      },
      initChart(seriesDatas) {
        const myChart = echarts.init(document.getElementById(this.chartId));
        const options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:this.legend_data,
            type: 'scroll',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.x_values
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: seriesDatas,
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              magicType: {
                type: ['line', 'bar'],
                show: true
              },
            }
          }
        };

        myChart.setOption(options,true);
        window.addEventListener("resize", function () {
          myChart.resize();
        },false);
      }
    },
    watch: {
      datas(newDatas) {
        const seriesDatas = this.formatDatas(newDatas);
        this.initChart(seriesDatas);
      }
    }
  }
</script>
