import Vue from 'vue'
import Vuex from 'vuex'

import whiteList from './whiteList'
import blackList from './blackList'
import disabledList from './disabledList'
import discountList from './discountList'

Vue.use(Vuex);

const specialCars ={
    namespaced:true,
    
    modules: {
        whiteList,
        blackList,
        disabledList,
        discountList
    }

}

export default specialCars