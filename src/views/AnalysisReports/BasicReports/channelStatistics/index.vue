<template>
    <div class="channel">
        <div class="content-card search">
            <el-tabs v-model="activeName" type="card" @tab-click='handleClick'>
                <el-tab-pane label="微信" name="first">
                    <common-channel v-if='activeName == "first"' :tab-type='1'></common-channel>
                </el-tab-pane>
                <el-tab-pane label="支付宝" name="second">
                    <common-channel v-if='activeName == "second"' :tab-type='2'></common-channel>
                </el-tab-pane>
                <!-- <el-tab-pane label="银联" name="third">
                    <common-channel v-if='activeName == "third"' tab-type='unionPay'></common-channel>
                </el-tab-pane>
                <el-tab-pane label="PDA现金" name="fourth">
                    <common-channel v-if='activeName == "fourth"' tab-type='PDA'></common-channel>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>
<script>
import commonChannel from '../commonChannel'

export default {
    name: "channelStatistics",
    components: { commonChannel },
    data() {
        return {
            activeName: 'first',
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        handleClick(tab, event) {
            console.log('点击')
            console.log(tab, event);
        } 
    }
}
</script>

<style lang='less' scoped>
.channel {
    .content-card {
        padding: 15px 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        .el-table {
            padding: 0;
        }
    }
}
</style>
