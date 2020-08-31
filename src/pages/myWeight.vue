<template>
    <div id="wrapper">
       <div id="input-wrapper">
           <input id="input-weight" type="text" placeholder="KG">
           <input id="submit-weight" type="button" value="提交" @click="addData">
       </div>
       <div id="graph-wrapper" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>
    </div>
</template>

<script>
const Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
const timezoneOffset = new Date().getTimezoneOffset();
Highcharts.setOptions({global: {timezoneOffset}});
export default {
    name: 'myWeight',
    data(){
        return {
            weightList: [],
            chart: null
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){//获取数据
            this.axios.get('getWeightList').then(res=>{
                this.convertWeightData(res);
            }).catch(err=>{
                console.log(err);
            });
        },
        addData(){//增加体重
            let inputDom = document.querySelector('#input-weight');
            let num = inputDom.value;
            if(!num){alert('请输入体重'); return;}
            let firm = confirm(`确定上传体重${num}?`);
            if(!firm) return ;
            this.axios.post('addWeight',{num,cr_time: Date.parse(new Date())}).then(res=>{
                if(res.data.status === 200){
                    inputDom.value = '';
                    alert('上传成功');
                }else{
                    alert('上传失败');
                }
                this.convertWeightData(res);
            }).catch(err=>{
                console.log(err);
            });
        },
        convertWeightData(dataList){
            let data = dataList.data.message;
            this.drawCharts(data.map(item=>{
                item = Object.values(item);
                item[0] = Number(item[0]);
                return item;
            }));
        },

        drawCharts(dataList){//绘制图
            this.chart = Highcharts.chart('graph-wrapper',{
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: '体重走势图'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    }
                },
                tooltip: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%Y-%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    }
                },
                yAxis: {
                    title: {
                        text: '体重'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, new Highcharts.getOptions().colors[0]],
                                [1, new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: '体重',
                    data: dataList
                }]
            });
        }
    }
}
</script>

<style lang="stylus">
    html,body{
        width 100%
        height 100%
        font-size 10px
    }

    #wrapper{
        width 100%

        #input-wrapper{
            width 100%
            text-align center
            padding 20px 0

            #input-weight{
                height 2.5rem
                padding 0.5rem
                margin 0
                border 1px solid #999999
                font-size 1.4rem
                color #666666

                &:focus{
                    outline none
                }
            }

            #submit-weight{
                padding 0.5rem 
                height 2.5rem
                border none 
                border-radius none 
                background-color #666666
                color #ffffff
                margin 0 0 0 1rem
                width 10rem
                box-sizing content-box

                &:focus{
                    outline none 
                }
            }
        }
    }
</style>