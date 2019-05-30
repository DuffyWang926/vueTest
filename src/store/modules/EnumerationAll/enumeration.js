import { asyncRouterMap, constantRouterMap } from '@/router'


import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');

const enumeration = {
  state: {
    colorList: [
      {
      value: '1',
      label: '白色'
      }, 
      {
      value: '2',
      label: '灰色'
      }, 
      {
      value: '3',
      label: '黄色'
      },
      {
      value: '4',
      label: '粉色'
      }, 
      {
      value: '5',
      label: '红色'
      }, 
      {
      value: '6',
      label: '紫色'
      }, 
      {
      value: '7',
      label: '绿色'
      },
      {
      value: '8',
      label: '蓝色'
      }, 
      {
      value: '9',
      label: '棕色'
      }, 
      {
      value: '10',
      label: '黑色'
      }, 
    ], 
    whiteList:[
      {
      value: '1',
      label: '未认证'
      }, 
      {
      value: '2',
      label: '审核中'
      }, 
      {
      value: '3',
      label: '已认证'
      },
      {
      value: '4',
      label: '认证失败'
      }, 
    ],
    examinationList:[  //审核状态
      {
      value: '0',
      label: '未审核'
      }, 
      {
      value: '1',
      label: '审核通过'
      }, 
      {
      value: '2',
      label: '已审核失败认证'
      },
        
    ],
    invoiceType:[ //发票类型
      {
        value: '1',
        label: '企业'
        }, 
        {
        value: '2',
        label: '个人'
        }, 
    ],
    invoiceState:[ //发票状态
      {
      value: '1',
      label: '开票中'
      }, 
      {
      value: '2',
      label: '开票失败'
      }, 
      {
      value: '3',
      label: '开票成功'
      },

    ],
    sendMethod:[
      {
      value: '1',
      label: '手机'
      }, 
      {
      value: '2',
      label: '邮箱'
      }, 
      
    ]
   
  },
  mutations: {



  },

  actions: {
    

    
  }
}

export default enumeration

