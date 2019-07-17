<template>
    <div >
        <div  id="lie_pie" style="height:66px;width: 30px;  background: white"></div>
    </div>

</template>
<script>
    import echarts from "echarts"
    export default {
        data() {
            return {
                pie:function(dataName,seriesData){
                    var myChart1 = echarts.init(document.getElementById('lie_pie'));
                    let option = {
                        backgroundColor:'#b4e39f',
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },

                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        series : [
                            {
                                name:'还款计划',
                                type:'pie',
                                radius : '75%',
                                center: ['65%', '50%'],
                                color: ['#9BD16F', '#D07070'],
                                data:[
                                    {value:335, name:'已还款'},
                                    {value:310, name:'未还款'},
                                ],
                                roseType: 'radius',
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#b4e39f'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },

                            }
                        ]
                    };
                    myChart1.setOption(option);
                    // window.addEventListener("resize", function () {
                    //     myChart1.resize();
                    // },false);
                },
            };
        },
        watch: {

        },
        mounted(){
            this.pie()
        },
        methods: {

        },
        props: ['keyword_data']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">


</style>
