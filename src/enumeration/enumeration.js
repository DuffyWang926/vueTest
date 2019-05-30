import { asyncRouterMap, constantRouterMap } from '@/router'


import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');

const enumeration = {
    colorList:[{ label: '其它', value: "0" }, { label: '蓝色', value: "1" }, { label: '黄色', value: "2" }, { label: '绿色', value: "3" }, { label: '黑色', value: "4" }, { label: '白色', value: "5" }],
    colorListRGB:[
      { label: '其它',
       value: "0",
       data:'#020202',
      }, 
      { label: '蓝色', 
        value: "1" ,
        data:"#219cf4"
      }, 
      { label: '黄色',
       value: "2" ,
       data:"#fcbe2d"
      }, 
      { label: '绿色', 
        value: "3",
        data:'#0dce8c'
      }, { label: '黑色',
       value: "4" ,
       data:'#020202'
       }, { label: '白色', 
        value: "5" ,
        data:"#999999"
      }],

    
     
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
      
    ],
    orderType:[ //订单类型
      {
      value: '1',
      label: '停车场'
      }, 
      {
      value: '2',
      label: '钱包充值'
      }, 
      {
      value: '3',
      label: '月卡购买'
      },

    ],
    parkDevice:[  //入位设备 
      {
      value: '11',
      label: '主机入位'
      }, 
      {
      value: '12',
      label: '主机修改'
      }, 
      {
      value: '13',
      label: '主机离位'
      },
      {
      value: '21',
      label: 'PDA入位'
      }, 
      {
      value: '22',
      label: 'PDA修改'
      }, 
      {
      value: '23',
      label: 'PDA离位'
      }, 
      {
      value: '24',
      label: 'PDA快速离位'
      },
      {
      value: '31',
      label: '云平台入场'
      }, 
      {
      value: '32',
      label: '云平台修改'
      }, 
      {
      value: '33',
      label: '云平台离场'
      },
      {
        value: '41',
        label: '违法数据入位'
        }, 
        {
        value: '42',
        label: '违法数据入位修改'
        }, 
        {
        value: '43',
        label: '违法数据离位'
        },  
    ], 
    //入位情况
    enterState:[
      {
      value: '1',
      label: '正常位停车'
      }, 
      {
      value: '2',
      label: '斜位停车'
      }, 
      {
      value: '3',
      label: '跨位停车'
      }, 
      {
      value: '4',
      label: '半侧位停车'
      },
      {
      value: '5',
      label: '逆向停车'
      },
      {
        value: '6',
        label: '反复入位'
      },
      {
        value: '7',
        label: '压线停车'
      },
      {
        value: '8',
        label: '遮挡号牌'
      },
    ],
    //报警信息
    warningInfo:[
      {
      value: '0',
      label: '无报警'
      }, 
      {
      value: '1',
      label: '车牌不完整'
      }, 
      {
      value: '2',
      label: '车牌遮挡'
      }, 
      {
      value: '3',
      label: '无车牌'
      },
      {
      value: '4',
      label: '其他'
      },
    ],
    //日期list
    dayList:[{
      value: '0',
      label: '最后一天'
    }, 
    {
      value: '1',
      label: '1'
    }, 
    {
      value: '2',
      label: '2'
    },
    {
      value: '3',
      label: '3'
    },
    {
      value: '4',
      label: '4'
    },
    {
      value: '5',
      label: '5'
    },
    {
      value: '6',
      label: '6'
    },
    {
      value: '7',
      label: '7'
    },
    {
      value: '8',
      label: '8'
    }, 
    {
      value: '9',
      label: '9'
    },
    {
      value: '10',
      label: '10'
    },
    {
      value: '11',
      label: '11'
    }, 
    {
      value: '12',
      label: '12'
    },
    {
      value: '13',
      label: '13'
    },
    {
      value: '14',
      label: '14'
    },
    {
      value: '15',
      label: '15'
    },
    {
      value: '16',
      label: '16'
    },
    {
      value: '17',
      label: '17'
    },
    {
      value: '18',
      label: '18'
    }, 
    {
      value: '19',
      label: '19'
    },
    {
      value: '20',
      label: '20'
    },
    {
      value: '21',
      label: '21'
    }, 
    {
      value: '22',
      label: '22'
    },
    {
      value: '23',
      label: '23'
    },
    {
      value: '24',
      label: '24'
    },
    {
      value: '25',
      label: '25'
    },
    {
      value: '26',
      label: '26'
    },
    {
      value: '27',
      label: '27'
    },
    {
      value: '28',
      label: '28'
    }, 
    {
      value: '29',
      label: '29'
    },
    // {
    //   value: '30',
    //   label: '30'
    // },
    // {
    //   value: '31',
    //   label: '31'
    // }, 
  ],
  carTypeList:[     //车辆类型
    {
      value: '1',
      label: '小车'
    },
    {
      value: '2',
      label: '中车'
    },
    {
      value: '3',
      label: '大车'
    },
    {
      value: '4',
      label: '新能源车'
    },
  ],
  companyPayList:[     //会员结账方式
    {
      value: '1',
      label: '普通'
    },
    {
      value: '2',
      label: '月结'
    },
    
  ]
}

export default enumeration

