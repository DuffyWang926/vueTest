<template>
    <el-dialog :title="dialogTitle()" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal">
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <div class="footer-btn">
            <el-button v-if="this.dialogType != 1" @click="cancelModal">取消</el-button>
            <el-button v-if="this.dialogType === 0" class="btn-second" @click="addSaveData">确定</el-button>
            <el-button v-if="this.dialogType === 2" class="btn-second" @click="updateSaveData">确定</el-button>
            <el-button v-if="this.dialogType === 1" class="btn-second" @click="saveData">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "CommonUnapprovedDialog",
        data(){
            return{
                active: 0
            }
        },
        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            }
        }
    }
</script>

<style scoped>

</style>
