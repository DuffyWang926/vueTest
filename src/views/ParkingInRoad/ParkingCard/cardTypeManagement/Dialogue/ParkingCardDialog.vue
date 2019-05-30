<template>
    <el-dialog title="添加停车卡类型"  class="sm-dialog" :visible.sync="visible" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
        <ValidationObserver ref="observer">
            <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
                <div style="width: 60%;margin: 0 auto;">
                    <ValidationProvider rules="required" name="停车卡类型">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车卡类型">
                            <el-select v-model="cardTemplateNameWrapper"
                                       @change="getCardDetail"
                                       filterable
                                       allow-create
                                       default-first-option
                                       placeholder="请选择停车卡类型名称">
                                <el-option
                                        v-for="item in OptionsTCKLX"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="约束类型">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="约束类型">
                            <el-select v-model="cardType">
                                <el-option
                                        v-for="item in OptionsYSLX"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="约束开始时段">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="约束开始时段">
                            <el-time-picker
                                    v-model="startTime"
                                    value-format="HH:mm:dd"
                                    size="small"
                                    placeholder="任意时间点">
                            </el-time-picker>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="约束结束时段">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="约束结束时段">
                            <el-time-picker
                                    v-model="endTime"
                                    value-format="HH:mm:dd"
                                    size="small"
                                    placeholder="任意时间点">
                            </el-time-picker>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="车辆类型">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车辆类型">
                            <el-select v-model="vehicleType">
                                <el-option
                                        v-for="item in OptionsCLLX"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="停车卡时长">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车卡时长">
                            <el-input v-model="cardDuration" placeholder="请输入停车卡时长"></el-input>
                            <span>天</span>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="卡面金额">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="卡面金额">
                            <el-input v-model="priceTag" placeholder="请输入卡面金额"></el-input>
                            <span>元</span>
                        </el-form-item>
                    </ValidationProvider>
                </div>
                <div class="" style="text-align: center;padding: 30px 0;">
                    <el-button @click="cancelModal">取消</el-button>
                    <el-button class="btn-second" @click="validate().then(saveData)">确定</el-button>
                </div>
            </el-form>
        </ValidationObserver>
    </el-dialog>
</template>

<script>
    import { newParkingCardPage ,parkingCardTypeList , getParkingCardTemplatePage } from '@/api/ParkingInRoad/ParkingCard/VehicleParkingCard';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';//表单验证
    export default {
        name: "ParkingCardDialog",
        components: {
            ValidationObserver,
            ValidationProvider
        },
        data () {
            return {
                appendToBody:true,
                labelposition:'left',
                cardTemplateNameWrapper:'',
                OptionsTCKLX:[],
                OptionsYSLX:[{
                    value: '1',
                    label: '全天卡'
                }, {
                    value: '2',
                    label: '时段卡'
                }],
                OptionsCLLX:[{
                    value: '255',
                    label: '全部'
                }, {
                    value: '0',
                    label: '小车'
                },{
                    value: '1',
                    label: '中车'
                }, {
                    value: '2',
                    label: '大车'
                }, {
                    value: '3',
                    label: '新能源车'
                }],
                cardType:'',
                startTime:'',
                endTime:'',
                vehicleType:'',
                cardDuration:'',
                priceTag:'',
                listQuery:{
                    parameter:{
                        cardTemplateName:'',
                        cardType:'',
                        startTime:'',
                        endTime:'',
                        vehicleType:'',
                        cardDuration:'',
                        priceTag:'',
                    }
                },
            }
        },
        created(){
            this.handleSelectCard();
        },
        props:{
            visible: {
                type: Boolean,
                default: false
            },
        },
        methods:{
            saveData(){
                //要判断名字不能相同 就是不能再次添加一样的名字的 是我判断还是服务端？

                //这里应该要传字符串吧 因为可能是没有的停车卡类型
                this.listQuery.parameter.cardTemplateName = this.cardTemplateNameWrapper;
                this.listQuery.parameter.cardType = this.cardType;
                this.listQuery.parameter.vehicleType = this.vehicleType;
                //这里注意单位 是要 小时 还是天
                this.listQuery.parameter.cardDuration = this.cardDuration;
                //这里注意单位 是要 分 还是元啊
                this.listQuery.parameter.priceTag = this.priceTag;
                //传接口秒值 但我这依然是时间戳 就是今天的时间在有年月日的前提下转化的 这里要传什么？
                // this.listQuery.parameter.startTime = this.startTime/1000;
                // this.listQuery.parameter.endTime = this.endTime/1000;
                this.listQuery.parameter.startTime = this.startTime;
                this.listQuery.parameter.endTime = this.endTime;
                //
                newParkingCardPage(this.listQuery).then(response => {
                    if(response.code === 0 ){
                        //这是elementui的成功提示
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        //这是子组件 完成添加之后 刷新父组件列表
                        this.$parent.getList();
                        this.cancelModal();
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            //关闭弹窗
            cancelModal(){
                this.$emit('update:visible', false);
            },
            //停车卡类型下拉框
            handleSelectCard(){
                // let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                parkingCardTypeList().then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsTCKLX.push({
                            // label: response.result[i].label,//此处是展示内容
                            // value: Number(response.result[i].key), //此处是后台需要的值
                            label: response.result[i].cardTemplateName,//此处是展示内容
                            value: response.result[i].cardTemplateName //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            getCardDetail(value) {
                //停车卡类型显示详细回填数据
                getParkingCardTemplatePage(value).then(response => {
                    if (response.result.records[0].cardType == 1) {
                        this.cardType = '全天卡';
                    } else if (response.result.records[0].cardType == 2) {
                        this.cardType = '时段卡';
                    }
                    if (response.result.records[0].vehicleType == 255) {
                        this.vehicleType = '全部';
                    } else if (response.result.records[0].vehicleType == 0) {
                        this.vehicleType = '小车';
                    } else if (response.result.records[0].vehicleType == 1) {
                        this.vehicleType = '中车';
                    } else if (response.result.records[0].vehicleType == 2) {
                        this.vehicleType = '大车';
                    } else if (response.result.records[0].vehicleType == 3) {
                        this.vehicleType = '新能源车';
                    }
                    this.startTime = response.result.records[0].startTime;
                    this.endTime = response.result.records[0].endTime;
                    this.cardDuration = response.result.records[0].cardDuration;
                    this.priceTag = response.result.records[0].priceTag;
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>