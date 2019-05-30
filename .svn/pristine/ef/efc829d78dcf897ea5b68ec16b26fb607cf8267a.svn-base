
//字典过滤方法
const getEnumberate = function(val){
  let sysDicts = JSON.parse(localStorage.getItem('sysDicts'));
  let filterDicts = '';
  for(let i = 0; i < sysDicts.length; i++){
    if(val == sysDicts[i].key){
      filterDicts = sysDicts[i].label
    }
  }
  return filterDicts
};

export default getEnumberate
