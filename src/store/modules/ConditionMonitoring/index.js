import Vue from 'vue'
import Vuex from 'vuex'

import todayData from './todayData'
import searchMap from './searchMap'
import lawbreakingPark from './lawbreakingPark'

Vue.use(Vuex);

const conditionMonitoring ={
    namespaced:true,
    
    modules: {
        todayData,
        searchMap,
        lawbreakingPark
    }

}

export default conditionMonitoring