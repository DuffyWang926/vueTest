<template>
    <el-dialog :title="分配车场" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal">
        <div style="padding-left: 200px;" >
            <el-row :gutter="2">
                <el-col :span="3" ><div>停车场名称</div></el-col>
                <el-col :span="12" style="margin-left:-25px;">
                    <el-select v-model="listQuery.parameter.gsdz">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-transfer v-model="equiptmentTransfer" :data="equiptmentData"></el-transfer>
                </el-col>
            </el-row>
            <div class="footer-btn">
                <el-button class="btn-second" @click="saveUpdate">确定</el-button>
            </div>
        </div>

    </el-dialog>
</template>

<script>
    export default {
        name: "OwnedParkingLotsDialog",
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            idVal: {
                type: Number,
                default: -1
            },
            dialogType: {
                type: Number,
                default:1
            }
        },
        data () {
            return {
                appendToBody:true,
                imageUrl: '',
                listQuery:{
                    parameter:{
                        shid:'',
                        shbh:'',
                        shmc:'',
                        shyymc:'',
                        lxr:'',
                        sjh:'',
                        yxdz:'',
                        gsdz:'',
                        sfqy:'',
                        dlmm:'',
                        dlmmdlmm:'',
                    }
                }
            }
        },
        computed: {

        },

        methods: {
            //关闭弹窗
            cancelModal(){
                this.$emit('update:visible', false);
            },
            saveUpdate() {
                this.$emit('update:visible', false);
            }
        }
    }
</script>

<style scoped>

</style>
