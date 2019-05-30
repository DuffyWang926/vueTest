<template>
    <div class="todayData">
        <div class="content-card">
            <el-row>
                <el-col :span='5' class="topStyle">
                    <div>
                        <span>今日营收</span>
                        <span>{{parkRateData.income}}</span>
                    </div>
                    <div id="usersPayRate" class="rateChart" :data ='parkRateData'>

                    </div>
                    <div class="topText">
                        用户缴费率
                    </div>
                </el-col>
                <el-col :span='5' class="topStyle topSecond">
                    <div>今日停车总次数</div>
                    <p>{{parkCount.sum}}</p>
                    <div>路内停车次数</div>
                    <p>{{parkCount.lntccs}}</p>
                    <div>路外停车次数</div>
                    <p>{{parkCount.lwtccs}}</p> 
                </el-col>
                <el-col :span='5' class="topStyle topSecond">
                    <div>今日停车总时长（小时）</div>
                    <p>{{parkDuration.sum}}</p>
                    <div>路内停车总时长（小时）</div>
                    <p>{{parkDuration.lntcsc}}</p>
                    <div>路外停车总时长（小时）</div>
                    <p>{{parkDuration.lwtcsc}}</p>
                </el-col>
                <el-col :span='7' class="topStyle topLast">
                    <div>员工在岗情况</div>
                    <div>
                        <el-col :span='12'>
                            <div>
                                <span>
                                    员工总数
                                </span>  
                                 <span>
                                    {{userCount.ygzs}}
                                </span> 
                            </div>
                            <div>
                                <span>
                                    在岗员工数
                                </span>  
                                 <span>
                                    {{userCount.zgygs}}
                                </span> 
                            </div>
                        </el-col>
                        <el-col :span='12'>
                            <div id="workersState"  class="workersChart" :data='userStateData'>

                            </div>
                            
                        </el-col>
                    </div>
                </el-col>
                
            </el-row>
            <el-row class="footStyle">
                <el-col :span='12' class="topStyle footLeft">
                    <div>
                        路内泊位实时占用率
                    </div>
                    <div>
                        <div><span>1989</span><span>892</span><span>87%</span></div>
                        <p><span>总泊位数</span><span>占用泊位数</span><span>泊位占用率</span></p>
                    </div>
                    <div>
                        <div id="parkRate" class="parkRateChart" >

                        </div>
                    </div>

                </el-col>
                <el-col :span='11' class="topStyle footRight">
                    <div>
                        当日按小时收益数据
                    </div>
                    
                    <div class="footRightCanvas">
                        <div id="profitData" class="profitDataChart">

                        </div>
                    </div>

                </el-col>
            </el-row>

        </div>
        
        
    </div>

</template>

<script>
    export default {
        name: "TodayData",
        data(){
            return{
                canvasRef:'usersPayRate'

            }
        },
        created(){
            //  this.$store.dispatch("conditionMonitoring/getParkingOrderCountData")
            //  this.$store.dispatch("conditionMonitoring/getParkingCountData")
            //  this.$store.dispatch("conditionMonitoring/getParkingDurationData")
            //  this.$store.dispatch("conditionMonitoring/getPdaUserCountData")
            //今日数据
             this.$store.dispatch("conditionMonitoring/getTodayDataObject")
             
             
        },
        mounted(){
            this.initPayRateChart();
            this.initWorkersStateChart();
            this.initParkRateChart();
            this.initProfitDataChart();
            
        },
        methods:{
            initPayRateChart(){
                let rateCharts = this.$echarts.init(document.getElementById('usersPayRate'))
                let options={
                   
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    color: '#f00',
                                    fontSize:'20',
                                    formatter: this.parkRateCon
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.parkRateData
                        }
                    ]
                }
                rateCharts.setOption(options)

            },
            initWorkersStateChart(){
                let rateCharts = this.$echarts.init(document.getElementById('workersState'))
                let options={
                   
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    color: '#f00',
                                    fontSize:'20',
                                    formatter: this.userStateCon
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.userStateData
                        }
                    ]
                }
                rateCharts.setOption(options)

            },
            initParkRateChart(){
                let rateCharts = this.$echarts.init(document.getElementById('parkRate'))
                let options= {
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data:this.parkDataX
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'邮件营销',
                                type:'line',
                                stack: '总量',
                                areaStyle: {},
                                data:this.parkDataSeries[0]
                            },
                            {
                                name:'联盟广告',
                                type:'line',
                                stack: '总量',
                                areaStyle: {},
                                data:this.parkDataSeries[1]
                            },
                            {
                                name:'视频广告',
                                type:'line',
                                stack: '总量',
                                areaStyle: {},
                                data:this.parkDataSeries[2]
                            },
                            {
                                name:'直接访问',
                                type:'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:this.parkDataSeries[3]
                            },
                            {
                                name:'搜索引擎',
                                type:'line',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {normal: {}},
                                data:this.parkDataSeries[4]
                            }
                        ]
                    };
                rateCharts.setOption(options)

            },
            initProfitDataChart(){
                let rateCharts = this.$echarts.init(document.getElementById('profitData'))
                let options= {
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },

                        xAxis: {
                            type: 'category',
                            data: this.profitDataX
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.profitDataSeries,
                            type: 'bar'
                        }]
                    };

                rateCharts.setOption(options)

            },
            
            
        },
        updated(){
            console.log(this.$store.state.conditionMonitoring)
            this.initPayRateChart();
            this.initWorkersStateChart();
  
        },
        computed:{
            parkRateData(){
                let data = this.$store.state.conditionMonitoring.todayData.parkRateData;
                return data;
            },
            parkRateCon(){
                return this.$store.state.conditionMonitoring.todayData.parkRateCon;
            },
            parkCount(){
                let data = this.$store.state.conditionMonitoring.todayData.parkCount;
                return data;
            },
            parkDuration(){
                let data = this.$store.state.conditionMonitoring.todayData.parkDuration;
                return data;
            },
            userCount(){
                let data = this.$store.state.conditionMonitoring.todayData.userCount;
                return data;
            },
            userStateData(){
                let data = this.$store.state.conditionMonitoring.todayData.userStateData;
                return data;
            },
            userStateCon(){
                let data = this.$store.state.conditionMonitoring.todayData.userStateCon;
                return data;
            },
            //泊位占有率
            parkDataX(){
                let data = this.$store.state.conditionMonitoring.todayData.parkDataX;
                return data;
            },
            parkDataSeries(){
                let data = this.$store.state.conditionMonitoring.todayData.parkDataSeries;
                return data;
            },
            //收益数据
            profitDataX(){
                let data = this.$store.state.conditionMonitoring.todayData.profitDataX;
                return data;
            },
            profitDataSeries(){
                let data = this.$store.state.conditionMonitoring.todayData.profitDataSeries;
                return data;
            }

            

            
        }
    }
</script>

<style lang='less' scoped>
.todayData{
    .el-col{
        padding-bottom: 10px;        
    }
    .topStyle{
        background: #cdffff;
        margin:0 10px ;
        min-height: 350px;
        .rateChart{
            width:300px;
            height:300px;
            margin:auto;
        }
        div:first-child{
            text-align: center;
            padding-top:10px;
            span:first-child{
                padding-right:20px;
            }
        }
        .topText{
            text-align: center;
        }

    }
    .topSecond{
        text-align: center;
        div{
            padding-top:10px;
        }
        p{
            padding:0 0 10px 0;
        }

    }
    .topLast{
        >div:first-child{
            height:100px;
            text-align: left;
        }
        >div{
            padding-top:10px;

        }
        .workersChart{
            width:200px;
            height:200px;
        }
    }
    .footStyle{
        .topStyle{
            background: #cdffff;
            margin:0 10px ;
            min-height: 350px;
            .parkRateChart{
                width:400px;
                height:400px;

            }
        }
        .footRight{
            margin-left:10px;
            min-height: 525px;
            position: relative;
            .footRightCanvas{
                position:absolute;
                left:0;
                bottom:0;

            }
            .profitDataChart{
                width:400px;
                height:400px;
            }
            

        }
        .footLeft{
            div:nth-child(2){
                div{
                    span{
                        display:inline-block;
                        width:90px;
                        padding-right: 10px;
                    }

                }
                p{
                    text-align: center;
                    span{
                        padding-right: 20px;
                    }
                }
                
            }
            

        }
        
    }
   
}


</style>

