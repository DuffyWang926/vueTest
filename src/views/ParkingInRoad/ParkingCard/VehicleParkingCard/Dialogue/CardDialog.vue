<template>
    <el-dialog title="新增停车卡"  class="sm-dialog" :visible.sync="visible" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
        <ValidationObserver ref="observer">
            <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
                <div>
                    <div style="width:52%;height: 340px;">
                        <ValidationProvider rules="required" name="停车卡类型">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车卡类型">
                                <el-select v-model="cardTemplateIdWrapper" filterable @change="getCardDetail">
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
                                <el-select v-model="cardType" disabled >
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
<!--                                <el-time-picker-->
<!--                                        v-model="startTime"-->
<!--                                        value-format="timestamp"-->
<!--                                        disabled-->
<!--                                        size="small"-->
<!--                                        placeholder="任意时间点">-->
<!--                                </el-time-picker>-->
                                <el-input v-model="startTime" placeholder="任意时间点" disabled></el-input>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="约束结束时段">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="约束结束时段">
<!--                                <el-time-picker-->
<!--                                        v-model="endTime"-->
<!--                                        value-format="timestamp"-->
<!--                                        disabled-->
<!--                                        size="small"-->
<!--                                        placeholder="任意时间点">-->
<!--                                </el-time-picker>-->
                                <el-input v-model="endTime" placeholder="任意时间点" disabled></el-input>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="车辆类型">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车辆类型">
                                <el-select v-model="vehicleType" disabled >
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
                                <el-input v-model="cardDuration" placeholder="请输入停车卡时长" disabled></el-input>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="卡面金额">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="卡面金额">
                                <el-input v-model="priceTag" placeholder="请输入卡面金额" disabled></el-input>
                            </el-form-item>
                        </ValidationProvider>
                    </div>
                    <div class="dialog-right" style="width:48%; position: absolute; right:0; top:84px;">
                        <ValidationProvider rules="required" name="停车卡名称">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车卡名称">
                                <el-input v-model="listQuery.parameter.cardName" placeholder="请输入停车卡名称"></el-input>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="required" name="发卡公司">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="发卡公司">
                                <el-select v-model="companyIdName" filterable>
                                    <el-option
                                            v-for="item in OptionsFKGS"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="{'label':item.label,'value':item.value}">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="" name="适用停车场">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="适用停车场">
                                <el-select
                                        v-model="sytch"
                                        filterable
                                        disabled
                                        placeholder="请选择适用停车场">
                                    <el-option
                                            v-for="item in OptionsSYTCC"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </ValidationProvider>
                        <ValidationProvider rules="" name="预售卡">
                            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="">
                                <el-checkbox v-model="checked" @change="showCloseYSK">预售卡</el-checkbox>
                                <el-button size="small" @click="linkParkPlace">...</el-button>
                            </el-form-item>
                        </ValidationProvider>
                        <div v-show="showYSK">
                            <ValidationProvider rules="" name="起始时间">
                                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="起始时间">
                                    <el-date-picker
                                            v-model="presellStartDateHm"
                                            type="date"
                                            placeholder="请选择日期"
                                            value-format="timestamp">
                                    </el-date-picker>
                                </el-form-item>
                            </ValidationProvider>
                            <ValidationProvider rules="" name="到期时间">
                                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="到期时间">
                                    <el-date-picker
                                            v-model="presellEndDateHm"
                                            type="date"
                                            placeholder="请选择日期"
                                            value-format="timestamp">
                                    </el-date-picker>
                                </el-form-item>
                            </ValidationProvider>
                            <ValidationProvider rules="" name="激活方式">
                                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="激活方式">
                                    <el-radio v-model="listQuery.parameter.activateWay" label="1">续费激活</el-radio>
                                    <el-radio v-model="listQuery.parameter.activateWay" label="2">定时激活</el-radio>
                                </el-form-item>
                            </ValidationProvider>
                        </div>
                    </div>
                </div>
                <div style="border-top: 1px solid #dedede;padding-top: 15px;">
                    <ValidationProvider rules="required" name="售卡金额">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="售卡金额">
                            <el-input v-model="actualPriceY" placeholder="请输入售卡金额"></el-input>
                            <span>元</span>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="支付渠道">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="支付渠道">
                            <el-select v-model="listQuery.parameter.paymentChannel">
                                <el-option
                                        v-for="item in OptionsZFQD"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="车牌号">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车牌号">
                            <el-input v-model="listQuery.parameter.plateNamber" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required" name="车牌颜色">
                        <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车牌颜色">
                            <el-select v-model="listQuery.parameter.carColor">
                                <el-option
                                        v-for="item in OptionsCPYS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </ValidationProvider>
                </div>
                <div class="" style="text-align: center;padding: 30px 0;">
                    <el-button @click="cancelModal">取消</el-button>
                    <el-button class="btn-second" @click="validate().then(saveData)">确定</el-button>
                </div>
            </el-form>
        </ValidationObserver>
        <LinkParkPlace v-if="linkDialogueVisible" :msg="linkData" :transferData='transferData' :visible="linkDialogueVisible" @cancelModal='cancelLinkModal' @confirmModal='confirmLinkModal' ></LinkParkPlace>
    </el-dialog>
</template>

<script>
    import { fetchSSGSList , fetchParkingGarageNamelist } from '@/api/CommonSelectApi'
    import { newParkingCardPage , getParkingCardTemplatePage ,getParkingCardinfo } from '@/api/ParkingInRoad/ParkingCard/VehicleParkingCard';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';//表单验证
    import LinkParkPlace from '@/views/ParkingInRoad/SpecailCars/WhiteListCars/Dialogue/LinkParkPlace';
    import  EnumberateSelect  from '@/filters/index';
    export default {
        name: "CardDialog",
        components: {
            ValidationObserver,
            ValidationProvider,
            LinkParkPlace
        },
        data () {
            return {
                appendToBody:true,
                linkDialogueVisible:false,
                labelposition:'left',
                OptionsTCKLX:[],
                OptionsYSLX:[],
                OptionsCLLX:[],
                OptionsFKGS:[],
                OptionsSYTCC:[],
                OptionsZFQD:[{
                    value: '1',
                    label: '现金'
                }, {
                    value: '2',
                    label: '微信'
                },{
                    value: '3',
                    label: '支付宝'
                }],
                OptionsCPYS:EnumberateSelect.CPYS,
                checked:false,
                showYSK:false,
                sytch:'',
                sytchArray:[],
                companyIdName:{},
                startTime:'',
                endTime:'',
                cardTemplateIdWrapper:'',
                cardType:'',
                vehicleType:'',
                cardDuration:'',
                priceTag:'',
                actualPriceY:'',
                presellEndDateHm:'',
                presellStartDateHm:'',
                listQuery:{
                    parameter:{
                        presellEndDate:'',
                        presellStartDate:'',
                        activateWay:'1',
                        companyId:'',
                        company:'',
                        cardName:'',
                        area:[],
                        cardVariety:'',
                        actualPrice:'',
                        plateNamber:'',
                        paymentChannel:'',
                        carColor:'',
                        templateId:'',
                        areaType:''
                    }
                },
                listQueryMb:{
                    parameter:{},
                    current:1,
                    size:9999999
                },
                linkData:{
                    title:"关联车场和泊位",
                    visible:false
                },
            }
        },
        computed:{
            transferData(){
                let data = this.$store.state.specialCars.whiteList.linkData ;
                return data;
            }
        },
        props:{
            visible: {
                type: Boolean,
                default: false
            },
        },
        created(){
            this.handleSelectCard();
            this.handleSelectCompany();
            this.handleSelectCar();
        },
        methods:{
            saveData(){
                this.listQuery.parameter.templateId = this.cardTemplateIdWrapper;
                // this.listQuery.parameter.area = this.sytch;
                this.listQuery.parameter.companyId = this.companyIdName.value;
                this.listQuery.parameter.company = this.companyIdName.label;
                //换成分 接口文档是分
                this.listQuery.parameter.actualPrice = Number.parseFloat(this.actualPriceY)*100;
                //换成秒 接口文档是秒
                this.listQuery.parameter.presellStartDate = Number.parseInt(this.presellStartDateHm)/1000;
                this.listQuery.parameter.presellEndDate = Number.parseInt(this.presellEndDateHm)/1000;
                if (this.checked) {
                    //预售卡
                    this.listQuery.parameter.cardVariety = 2;
                } else {
                    this.listQuery.parameter.cardVariety = 1;
                }
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
                getParkingCardTemplatePage(this.listQueryMb).then(response => {
                    for (let i = 0; i < response.result.records.length; i++) {
                        this.OptionsTCKLX.push({
                            // label: response.result[i].label,//此处是展示内容
                            // value: Number(response.result[i].key), //此处是后台需要的值
                            label: response.result.records[i].cardTemplateName,//此处是展示内容
                            value: response.result.records[i].id //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //发卡公司下拉框
            handleSelectCompany(){
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                fetchSSGSList(sysUser.gsid).then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsFKGS.push({
                            label: response.result[i].label,//此处是展示内容
                            value: Number(response.result[i].key) //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //适用停车下拉框
            handleSelectCar(){
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                fetchParkingGarageNamelist(sysUser.gsid,'').then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsSYTCC.push({
                            label: response.result[i].label,//此处是展示内容
                            value: Number(response.result[i].key) //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            showCloseYSK(){
                if (this.checked) {
                    this.showYSK = true;
                } else {
                    this.showYSK = false;
                }
            },
            getCardDetail(value) {
                //停车卡类型显示详细回填数据
                getParkingCardinfo(value).then(response => {
                    if (response.result.cardType == 1) {
                        this.cardType = '全天卡';
                    } else if (response.result.cardType == 2) {
                        this.cardType = '时段卡';
                    }
                    if (response.result.vehicleType == 255) {
                        this.vehicleType = '全部';
                    } else if (response.result.vehicleType == 0) {
                        this.vehicleType = '小车';
                    } else if (response.result.vehicleType == 1) {
                        this.vehicleType = '中车';
                    } else if (response.result.vehicleType == 2) {
                        this.vehicleType = '大车';
                    } else if (response.result.vehicleType == 3) {
                        this.vehicleType = '新能源车';
                    }
                    this.startTime = response.result.startTime;
                    this.endTime = response.result.endTime;
                    this.cardDuration = response.result.cardDuration;
                    //分转为元
                    this.priceTag = response.result.priceTag/100;
                }).catch((err) => {
                    console.log(err)
                })
            },
            //关联泊位
            linkParkPlace(){
                this.linkDialogueVisible = true;
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                let data = {
                    id:sysUser.gsid
                }
                this.$store.dispatch("specialCars/getParkingGarageNameSelectList",data)
            },
            cancelLinkModal(){
                this.linkDialogueVisible = false;
            },
            confirmLinkModal(data){
                this.linkDialogueVisible = false;
                this.listQuery.parameter.area = [];
                this.sytchArray = [];
                if (data.cardData.areaType == 2) {
                    //部分
                    for (let i = 0; i < data.cardData.area.length; i++) {
                        this.listQuery.parameter.area.push({
                            parkingSpaceId: 0,//泊位
                            parkingLotId: Number(data.cardData.area[i].id) //停车场
                        });
                        this.sytchArray.push(data.cardData.area[i].ccmc);
                    }
                    this.sytch = this.sytchArray.join();
                } else {
                    //全部
                    this.sytch = '...';
                }
                this.listQuery.parameter.areaType = data.cardData.areaType;
                // this.$store.dispatch("specialCars/postUpdateWhiteListCarSpace",data)
            }
        }
    }
</script>

<style scoped>

</style>