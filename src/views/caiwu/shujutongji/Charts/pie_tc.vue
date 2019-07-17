<template>
    <el-col :span="24">
        <el-col :span="12" style="height: 270px;width: 100%;" id="pie_caiwu_b"></el-col>
    </el-col>

</template>
<script>
    import echarts from 'echarts';
    export default {
        name: 'lineChart',
        data() {
            return {
                chart: null,
                isShowDialog:false,
                pie:function(NumData,colorData){
                    var myChart1 = echarts.init(document.getElementById('pie_caiwu_b'));
                    let option = {
                        title : {
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            position: [10, 10],
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name: '销售利润',
                                type:'pie',
                                selectedMode: 'single',
                                radius: [0, '90%'],
                             color:colorData,
                                label:{            //饼图图形上的文本标签
                                    normal:{
                                        show:true,
                                        position:'inner', //标签的位置
                                        textStyle : {
                                            fontWeight : 100 ,
                                            fontSize : 12    //文字的字体大小
                                        },
                                        formatter:'{d}%'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:NumData
                            },
                        ]
                    };
                    myChart1.setOption(option);
                    window.addEventListener("resize", function () {
                        myChart1.resize();
                    },false);
                },
            };
        },
        watch: {
            PieData(dataList) {
                let NumData = [];
                let Echartscolor  = ['#11b2f7','#89DBF9','#F9B3D1','#FF6969'];
                let colorData = [];
                for(let i = 0;i<dataList.length;i++){
                    NumData.push({
                        value:Number(dataList[i].lirun).toFixed(2), name:dataList[i].adstatename
                    })
                    colorData.push(Echartscolor[Number(dataList[i].ht_state)-1])
                }

                this.pie(NumData,colorData);
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
        props: ['PieData']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
    }
</style>
