import Vue from 'vue'
import Vuex from 'vuex'

import appInvoice from './appInvoice'

Vue.use(Vuex);

const invoiceManage ={
    namespaced:true,
    
    modules: {
        appInvoice,
    }

}

export default invoiceManage