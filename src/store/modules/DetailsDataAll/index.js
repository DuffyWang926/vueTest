import Vue from 'vue'
import Vuex from 'vuex'

import detailsData from './detailsData'
import parkingDetails from './parkingDetails'

Vue.use(Vuex);

const detailsDataAll ={
    namespaced:true,
    
    modules: {
        detailsData,
        parkingDetails,
    }

}

export default detailsDataAll