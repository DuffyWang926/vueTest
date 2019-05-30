<template>
    <el-dialog title="停车卡详情" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
        <div style="width: 50%;">
            <el-row :gutter="2" >
                <el-col :span="8">发卡公司：</el-col>
                <el-col :span="9">
                    <span>{{company}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">停车卡名称：</el-col>
                <el-col :span="9">
                    <span>{{cardName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">适用停车场：</el-col>
                <el-col :span="9">
                    <span>{{areaName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">车牌号：</el-col>
                <el-col :span="9">
                    <span>{{plateNamber}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">车牌颜色：</el-col>
                <el-col :span="9">
                    <span>{{carColor|cpys}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">车辆类型：</el-col>
                <el-col :span="9">
                    <span>{{vehicleType|cardcllx}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">停车卡类型：</el-col>
                <el-col :span="9">
                    <span>{{cardTemplateName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">卡总时长：</el-col>
                <el-col :span="9">
                    <span>{{cardDuration}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">卡面金额：</el-col>
                <el-col :span="9">
                    <span>{{priceTag|fenmoney}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">支付金额：</el-col>
                <el-col :span="9">
                    <span>{{actualPrice|fenmoney}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">约束类型：</el-col>
                <el-col :span="9">
                    <span>{{cardType|cardlx}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">约束时段：</el-col>
                <el-col :span="9">
                    <span>{{startTime}}</span><span>-</span><span>{{endTime}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8"></el-col>
                <el-col :span="9">
                    <span></span>
                </el-col>
            </el-row>
        </div>
        <div style="width: 50%;position: absolute; right:0; top:84px;">
            <el-row :gutter="2" >
                <el-col :span="8">发卡渠道：</el-col>
                <el-col :span="9">
                    <span>{{cardChannel|skChannel}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">是否预售卡：</el-col>
                <el-col :span="9">
                    <span>{{cardVariety|cardys}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">预售卡起始时间：</el-col>
                <el-col :span="9">
                    <span>{{presellStartDate|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">预售卡到期时间：</el-col>
                <el-col :span="9">
                    <span>{{presellEndDate|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">激活方式：</el-col>
                <el-col :span="9">
                    <span>{{activateWay|jhpath}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">起始时间：</el-col>
                <el-col :span="9">
                    <span>{{cardStartDate|sstime|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">生效时间：</el-col>
                <el-col :span="9">
                    <span>{{effectiveDate|sstime|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">到期时间：</el-col>
                <el-col :span="9">
                    <span>{{cardEndDate|sstime|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">期卡状态：</el-col>
                <el-col :span="9">
                    <span>{{cardStatus|qkStatus}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">禁用状态：</el-col>
                <el-col :span="9">
                    <span>{{forbiddenStatus|sfqy}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">支付方式：</el-col>
                <el-col :span="9">
                    <span>{{paymentChannel|cardzffs}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">售出时间：</el-col>
                <el-col :span="9">
                    <span>{{createTime|time}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="2" >
                <el-col :span="8">销售人员：</el-col>
                <el-col :span="9">
                    <span>{{salesStaffName}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="" style="text-align: center;padding: 30px 0;">
            <el-button @click="cancelModal">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { checkParkingCardRecord } from '@/api/ParkingInRoad/ParkingCard/VehicleParkingCard';
    export default {
        name: "SeeCardDialog",
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            msg: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data(){
            return{
                appendToBody:true,
                company:'',
                cardName:'',
                areaName:'',
                plateNamber:'',
                carColor:'',
                vehicleType:'',
                cardType:'',
                cardDuration:'',
                priceTag:'',
                actualPrice:'',
                startTime:'',
                endTime:'',
                cardChannel:'',
                presellStartDate:'',
                presellEndDate:'',
                activateWay:'',
                cardStartDate:'',
                effectiveDate:'',
                cardEndDate:'',
                cardStatus:'',
                forbiddenStatus:'',
                paymentChannel:'',
                createTime:'',
                salesStaffName:'',
                cardVariety:'',
                cardTemplateName:'',
            };
        },
        created(){
            this.getCardInfo(this.msg.id)
        },
        methods:{
            getCardInfo(id){
                checkParkingCardRecord(id).then(response => {
                    this.company = response.result.company;
                    this.cardName = response.result.cardName;
                    this.areaName = response.result.areaName;
                    this.plateNamber = response.result.plateNamber;
                    this.carColor = response.result.carColor;
                    this.vehicleType = response.result.vehicleType;
                    this.cardType = response.result.cardType;
                    this.cardDuration = response.result.cardDuration;
                    this.priceTag = response.result.priceTag;
                    this.actualPrice = response.result.actualPrice;
                    this.startTime = response.result.startTime;
                    this.endTime = response.result.endTime;
                    this.cardChannel = response.result.cardChannel;
                    this.presellStartDate = response.result.presellStartDate;
                    this.presellEndDate = response.result.presellEndDate;
                    this.activateWay = response.result.activateWay;
                    this.cardStartDate = response.result.cardStartDate;
                    this.effectiveDate = response.result.effectiveDate;
                    this.cardEndDate = response.result.cardEndDate;
                    this.cardStatus = response.result.cardStatus;
                    this.forbiddenStatus = response.result.forbiddenStatus;
                    this.paymentChannel = response.result.paymentChannel;
                    this.createTime = response.result.createTime;
                    this.salesStaffName = response.result.salesStaffName;
                    this.cardVariety = response.result.cardVariety;
                    this.cardTemplateName = response.result.cardTemplateName;
                }).catch((err) => {
                    console.log(err)
                })
            },
            //关闭弹窗
            cancelModal(){
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>