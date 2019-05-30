<template>
    <el-select v-model="selectValue" filterable  :placeholder="paramsSelect.selectPlaceholder" @change="handleChange" :style="paramsSelect.style">
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
</template>

<script>
/**
 * 当使用此组件时
 * ①import CommonSelect from "../../components/CommonSelect"
 * ②components: {CommonSelect},
 * <CommonSelect :paramsSelect="paramsSelect"  @handleChange="commonSelectChange"></CommonSelect>
 * 页面中需要定义数据
 * paramsSelect:{
    "urlSelect": "/sysOrg/findSysOrgSelect",//后台接口
    "params": { //请求后台参数
      "gsid":"1",
    },
    "selectPlaceholder": "1111111",// 默认值
    "style": {
      "width": "390px",
    }
   }
 */
import request from "@/utils/request";

export default {
  name: "CommonSelect",
  data() {
    return {
      selectOptions: [],
      selectValue: '',
    };
  },
  props: {
    paramsSelect: {
      //选择框参数
      type: Object,
      required: true
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleChange(val) {
      this.$emit("handleChange", val);
    },
    getData() {
      request({
        url: this.paramsSelect.urlSelect, //接口地址
        method: "post",
        data: {
          parameter: this.paramsSelect.params //请求参数
        }
      })
      .then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.selectOptions.push({
            label: response.result[i].label,//此处是展示内容
            value: response.result[i].key //此处是后台需要的值
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>

</style>
