<template>
    <el-col :span="24" style="height:400px;" id="pie_caiwu_a"></el-col>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import echarts from 'echarts';

    export default {
        name: 'lineChart',
        data() {
            return {
                chart: null,
                isShowDialog:false,
                pie:function(nameData,cost,money){
                    var myChart1 = echarts.init(document.getElementById('pie_caiwu_a'));
                    let option = {
                        legend: {
                            left: 'center',
                            top:'10',
                            data: nameData,
                            textStyle: {
                                color: ['#777']
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        title: [{
                            // left: 'center',
                            left: '80%',
                            top: '80%',
                            textAlign: 'center',
                            text: '现金',
                            textStyle: {
                                fontSize: 13,
                            },
//                            subtext: '2,485,037',
                            subtextStyle: {
                                fontSize: 13,
                                color: ['#ff9d19']
                            },
                        }, {
                            left: '20%',
                            top: '80%',
                            textAlign: 'center',
                            text: '账户币',
                            textStyle: {
                                fontSize: 13,
                            },
//                            subtext: '2,485,037',
                            subtextStyle: {
                                fontSize: 13,
                                color: ['#ff9d19']
                            },
                        }],
                        series: [{
                            name: '账户币',
                            type: 'pie',
                            radius: "40%",
                            center: ['20%', '60%'],
                            data: cost,
                        },
                            {
                                name: '现金',
                                type: 'pie',
                                radius: "40%",
                                center: ['80%', '60%'],
                                data: money,
                            },

                        ],
                        color: [
                            '#ffc860',
                            '#d2da61',
                            '#8dcff5',
                            '#ff9274'
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
            pieData(dataList) {
                let nameData = [];
                let cost = [];
                let money = [];
                for(let a = 0;a<dataList.length;a++){
                    nameData.push(dataList[a].name);
                    cost.push(
                        {
                            value: dataList[a].cost,
                            name: dataList[a].name
                        },
                    );
                    money.push({
                        value:  dataList[a].money,
                        name: dataList[a].name

                    });
                }
                this.pie(nameData,cost,money);
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
        props: ['pieData']
    }
</script>
<style rel="stylesheet/scss"  lang="scss">
    .backImg {
        z-index: 99;
        background: black;
    }
</style>
