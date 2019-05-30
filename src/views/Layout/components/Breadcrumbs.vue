<template>
    <span class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right" v-for="(item,i) in levelList" :key="i">
        <el-breadcrumb-item >{{item.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </span>
</template>
<script>
  export default {
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      //面包屑导航方法
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        this.levelList = matched
      }
    },

    name: "Breadcrumbs",
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    padding-bottom:16px;
  }
</style>
