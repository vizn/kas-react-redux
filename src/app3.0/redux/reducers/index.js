import { combineReducers } from 'redux'
import { createReducer } from 'redux-immutablejs'
import { fromJS,Map,List} from 'immutable'
import { routerReducer } from 'react-router-redux'
import Vizn from '../../utils/vizn';
import {
  NIKENAME,
  MOBILE,
  MOBILE_CAPTCHA,
  USERINFO_SUCCESS,
  TIME_CHANGE,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_LIST_SUCCESS,
  CATEGORY_DATA_CHART_SUCCESS,
  CATEGORY_NAME,
  CATEGORY_ID,
  CATEGORY_PAYORINCOME,
  CATEGORY_SELECTLABEL,
  CATEGORY_INIT,
  CATEGORY_TYPE,
  CATEGORY_MONEY,
  DETAIL_ID,
  DETAIL_CLASSID,
  DETAIL_ACCOUNTID,
  DETAIL_TYPE,
  DETAIL_CONTENT,
  DETAIL_MONEY,
  DETAIL_CREATEDATE,
  DETAIL_SUM_SUCCESS,
  DETAIL_LIST_SUCCESS,
  DETAIL_SUCCESS,
  ACCOUNT_LIST_SUCCESS,
  DETAIL_LAST_ID,
  NAVITEMS_INIT,
  EXCHANGE_ID,
  EXCHANGE_FROMACID,
  EXCHANGE_TOACID,
  EXCHANGE_MONEY,
  EXCHANGE_LISTDATA,
  EXCHANGE_TOACCOUNTDATA,
  EXCHANGE_FROMACCOUNTDATA
} from '../constants'

//手机验证码状态数据
const captchaData = createReducer(fromJS({
  status: 0,
  time: 60
}),{
  [MOBILE_CAPTCHA]: (state, action) => {
    return state.merge({
          status: action.status,
          time: action.time
        })
  }
})

//用户基本信息
const userInfo = createReducer(null,{
  [USERINFO_SUCCESS]: (state, action) => {
    return fromJS(action.userInfo)
  }
})

//导航栏数据
const navItems= createReducer( fromJS({
  init: 'main',
  data:
  [
    {text:'明细',link:'main'},
    {text:'类别报表',link:'category'},
    {text:'账户',link:'account'}
  ]
}),{
  [NAVITEMS_INIT]: (state, action) => {
    return state.merge({
      init: action.val
    })
  }
})

//记账明细数据
const detailData = createReducer( fromJS({
  data: [],
  last_id: 0 //0为第一页标识，-1为最后页标识
}),{
  [DETAIL_LIST_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.val,
    })
  },
  [DETAIL_LAST_ID]: (state, action) => {
    return state.merge({
      last_id: action.val
    })
  },
  [TIME_CHANGE]: (state, action) => {
    return state.merge({
      topInfo:{   y:action.y,
                  m:action.m,
                  payName:"支出(元)",
                  pay:action.pay,
                  incomeName:"收入(元)",
                  income:action.income}
    })
  }
})
//记账详情
const detail = createReducer(fromJS({
  _id: '',
  classId: '',
  accountId: '',
  type: 2,
  content:'',
  money:'',
  updated:Vizn.prototype.dateFormat("yyyy-MM-dd")
}),{
  [DETAIL_SUCCESS]: (state, action) => {
    return fromJS(action.data)
  },
  [DETAIL_ID]: (state, action) => {
    return state.merge({
      _id: action.val
    })
  },
  [DETAIL_CLASSID]: (state, action) => {
    return state.merge({
      classId: action.val
    })
  },
  [DETAIL_ACCOUNTID]: (state, action) => {
    return state.merge({
      accountId: action.val
    })
  },
  [DETAIL_TYPE]: (state, action) => {
    return state.merge({
      type: action.val
    })
  },
  [DETAIL_CONTENT]: (state, action) => {
    return state.merge({
      content: action.val
    })
  },
  [DETAIL_MONEY]: (state, action) => {
    return state.merge({
      money: action.val
    })
  },
  [DETAIL_CREATEDATE]: (state, action) => {
    return state.merge({
      updated: action.val
    })
  }
})
const categoryList = createReducer(fromJS({
  classList: [],
  accountList: []
}),{
  [CATEGORY_DATA_SUCCESS]: (state, action) => {
    return state.merge({
      classList: action.data
    })
  },
  [ACCOUNT_LIST_SUCCESS]: (state, action) => {
    return state.merge({
      accountList: action.data
    })
  }
})
const topInfo = createReducer(fromJS({
  y:Vizn.prototype.dateFormat('yyyy'),
  m:Vizn.prototype.dateFormat('MM'),
  payName:"支出(元)",
  pay:"0.00",
  incomeName:"收入(元)",
  income:"0.00",
  sum: "0.00",
  sumTitle: "总余额"
}),{
  [TIME_CHANGE]: (state, actions) => {
    return state.merge({
      y:actions.y,
      m:actions.m,
      payName:actions.payName,
      pay:actions.pay,
      incomeName:actions.incomeName,
      income:actions.income,
      sum: actions.sum
    })
  }
})
//类别报表数据
const categoryData = createReducer( fromJS({
  type: '2',
  init: 0, //初始化1后执行一次值为0
  selectLabel: null,
  chart: null
}),{
  [CATEGORY_DATA_CHART_SUCCESS]: (state, action) => {
    return state.merge({
      chart: action.data
    })
  },
  [CATEGORY_SELECTLABEL]: (state, action) => {
    return state.merge({
      selectLabel: action.val
    })
  },
  [CATEGORY_INIT]: (state, action) => {
    return state.merge({
      init: action.val
    })
  },
  [CATEGORY_TYPE]: (state, action) => {
    return state.merge({
      type: action.val
    })
  }
})

//类别数据
const categoryDetail = createReducer( fromJS({
  data:[],
  detail: {
    type:2, //1收入，2支出
    id: '',
    name: '',
    money: 0,
    icon: ''
  }
}),{
  [CATEGORY_DATA_SUCCESS]: (state, action) => {
    return state.merge({
      data: action.data
    })
  },
  [CATEGORY_ID]: (state, action) => {
    return state.merge({
      detail:{
        type: state.toJS().detail.type,
        id: action.id,
        name: state.toJS().detail.name,
        money: state.toJS().detail.money,
        icon: state.toJS().detail.name
      }
    })
  },
  [CATEGORY_NAME]: (state, action) => {
    return state.merge({
      detail: {
        type: state.toJS().detail.type,
        id: state.toJS().detail.id,
        name: action.name,
        money: state.toJS().detail.money,
        icon: state.toJS().detail.name
      }
    })
  },
  [CATEGORY_PAYORINCOME]: (state, action) => {
    return state.merge({
      detail:{
        type: action.payOrIncome,
        id: state.toJS().detail.id,
        name: state.toJS().detail.name,
        money: state.toJS().detail.money,
        icon: state.toJS().detail.name
      }
    })
  },
  [CATEGORY_MONEY]: (state, action) => {
    return state.merge({
      detail:{
        type: state.toJS().detail.type,
        id: state.toJS().detail.id,
        name: state.toJS().detail.name,
        money: action.val,
        icon: state.toJS().detail.name
      }
    })
  }
})
//账户互转数据
const exchangeDate = createReducer(fromJS({
  exchange:{
    _id:'',
    fromacid:'',
    toacid:'',
    money:'',
  },
  fromaccountData:[],
  toaccountData:[],
  listData:[]
}),{
  [EXCHANGE_ID]:(state, action) =>{
    return state.merge({
      exchange: fromJS(state.toJS().exchange).merge({
        _id: action.val
      })
    })
  },
  [EXCHANGE_FROMACID]: (state, action) => {
    return state.merge({
      exchange: fromJS(state.toJS().exchange).merge({
        fromacid: action.val
      })
    })
  },
  [EXCHANGE_TOACID]: (state, action) => {
    return state.merge({
      exchange: fromJS(state.toJS().exchange).merge({
        toacid: action.val
      })
    })
  },
  [EXCHANGE_MONEY]: (state, action) => {
    return state.merge({
      exchange: fromJS(state.toJS().exchange).merge({
        money: action.val
      })
    })
  },
  [EXCHANGE_FROMACCOUNTDATA]: (state, action) => {
    return state.merge({
      fromaccountData: action.data,
    })
  },
  [EXCHANGE_TOACCOUNTDATA]: (state, action) => {
    return state.merge({
      toaccountData: action.data
    })
  },
  [EXCHANGE_LISTDATA]: (state, action) => {
    return state.merge({
      listData: action.data
    })
  }
})

const rootReducer = combineReducers({
  captchaData,
  navItems,
  topInfo,
  userInfo,
  detailData,
  categoryData,
  categoryDetail,
  detail,
  categoryList,
  exchangeDate,
  routing: routerReducer
})

export default rootReducer
