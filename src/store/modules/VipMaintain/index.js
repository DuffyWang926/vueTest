import Vue from 'vue'
import Vuex from 'vuex'

import companyVip from './companyVip'
import personalVip from './personalVip'
import retrieveCar from './retrieveCar'
import vipSuggest from './vipSuggest'


Vue.use(Vuex);

const vipMaintain ={
    namespaced:true,
    modules: {
        companyVip,
        personalVip,
        retrieveCar,
        vipSuggest,
    }

}

export default vipMaintain