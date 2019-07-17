<template>
        <el-col :span="24" style="height:300px;" id="pie_caiwu_a"></el-col>
</template>
<script>
    import echarts from "echarts"
    export default {
      name: 'lineChart',
      data() {
        return {
          chart: null,
            isShowDialog:false,
            pie:function(name,infor){
                var myChart1 = echarts.init(document.getElementById('pie_caiwu_a'));
                let option = {
                    "title": {
                        "text": "产品线",
                        "x": "center",
                        "y": "center",
                        "top": "38%",
                        "left": "34%",
                        "subtext": "",
                        "textAlign": "center",
                        "textStyle": {
                            "color": "#999",
                            "fontSize": "24",
                        }
                    },
                    "tooltip": {
                        "show": true,
                        "trigger": "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:["#64ddf9","#f3b0ef","#8c8e9b","#dbeeff"],
                    "legend": {
                        "orient": "vertical",
                        "align": "auto",
                        "z": "103",
                        "itemGap": 16,
                        "itemWidth": 15,
                        "top": 70,
                        "right": 10,
                        "width": "350px",
                        "data": name,
                        "selectedMode": true,
                        "textStyle": {
                            "color": "#666"
                        }
                    },
                    "series": [{
                        "legendHoverLink": false,
                        "name": "收入达成",
                        "type": "pie",
                        "startAngle": "50",
                        "radius": ["40%", "60%"],
                        "center": ["35%", "43%"],
                        "data": infor,
                        "label": {
                            "normal": {
                                "formatter": "{d}%",
                                "color": "#666"
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "lineStyle": {
                                    "width": 1,
                                    "color": "#bababa"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "borderColor": "#f2f4f5",
                                "borderWidth": 3
                            }
                        }
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
          pie_caiwu_a(dataList) {
              let name = [];
              let infor = [];
              for(var a = 0;a<dataList.length;a++){
                  name.push(dataList[a].name);
                  infor.push(
                      {
                          "value": dataList[a].money,
                          "name": dataList[a].name,
                          "areaStyle": {
                              "normal": {
                                  "opacity": 0.3
                              }
                          }
                      }
                  );
              }
              this.pie(name,infor);
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
        props: ['pie_caiwu_a']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
    }
</style>
