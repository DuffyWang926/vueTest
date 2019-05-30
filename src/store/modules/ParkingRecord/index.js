import Vue from 'vue'
import Vuex from 'vuex'

import parkingCars from './parkingCars'
import longParking from './longParking'
import leaveParking from './leaveParking'

Vue.use(Vuex);

const parkingRecord ={
    namespaced:true,
    
    modules: {
        parkingCars,
        longParking,
        leaveParking

    }

}

export default parkingRecord