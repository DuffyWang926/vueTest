
<template>
  <el-row>
    <div v-for='(v,i) in msg' :key='i' class='divPadding'>
      <span>{{v.name}}</span>: <span>{{v.data}}</span>
    </div>
  </el-row>
   
</template>
<script>
  export default {
    name: 'TitleShowList',
    components:{ },
    props:['msg','visible'],
    data() {
      return {
      };
    },
    methods: {
      
    },
    watch:{
      
    }
  }
</script>
<style lang='less'>
  .divPadding{
    padding:5px 0;
  }

</style>