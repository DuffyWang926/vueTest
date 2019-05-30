<template>
  <el-autocomplete
    class="inline-input"
    v-model="state1"
    :fetch-suggestions="querySearch"
    :placeholder='holderCon'
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
// 模糊搜索Input，变量如下
// <InputSearch :content='nameCon' :list='nameData' @inputDataSend='inputDataCountGet' ref='countChild'></InputSearch>

  export default {
    name: 'InputSearch',
    props:['content','list'],
    data() {
      return {
        restaurants: [],
        state1: '',
        holderCon: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      filterData(data){

      },
      createFilter(queryString) {
        return (restaurant) => {
          let data = restaurant.value.toLowerCase()
          let list = queryString.toLowerCase()
          let res = data.indexOf(list)
          let flag = !!~res ;
          return flag;
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      resetCon(){
        this.state1 = ''
      }
    },
    mounted() {
      console.log(this)
      this.holderCon = this._props.content || '请输入内容';
    },
    watch:{
      state1(val){
        let regNomal = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）\-+={}|《》？：“”【】、；‘’，。、]/img;
        this.state1 = this.state1.replace(regNomal,'')
        // if(this.state1.length >= 10){
        //   this.$message.error('输入长度不得超过10位')
        //   this.state1 = this.state1.slice(0,9)

        // }
        this.$emit('inputDataSend',this.state1)
        
      },
      list(val){
        this.restaurants = val
      }
    }
  }
</script>
