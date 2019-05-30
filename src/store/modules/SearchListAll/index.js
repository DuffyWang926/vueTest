import Vue from 'vue'
import Vuex from 'vuex'

import searchList from './searchList'

Vue.use(Vuex);

const searchListAll ={
    namespaced:true,
    
    modules: {
        searchList,
    }

}

export default searchListAll