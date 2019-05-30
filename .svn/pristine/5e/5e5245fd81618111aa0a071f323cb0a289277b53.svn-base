import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import getters from './getters'
import vipMaintain from './modules/VipMaintain'
import searchListAll from './modules/SearchListAll'
import detailsDataAll from './modules/DetailsDataAll'
import enumerationAll from './modules/EnumerationAll'
import specialCars from './modules/SpecialCars'
import publicApi from './modules/PublicApi'
import invoiceManage from './modules/InvoiceManage'
import parkingRecord from './modules/ParkingRecord'
import conditionMonitoring from './modules/conditionMonitoring'


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    vipMaintain,
    searchListAll,
    detailsDataAll,
    enumerationAll,
    specialCars,
    publicApi,
    invoiceManage,
    parkingRecord,
    conditionMonitoring
  },
  getters
})

export default store
