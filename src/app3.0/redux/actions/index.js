import { push } from 'react-router-redux'
import {saveCookie,getCookie,signOut, isLogin} from '../../utils/authService'
import Vizn, {Toast, Dialog} from '../../utils/vizn';
import {
    DETAIL_SUCCESS,
    DETAIL_SUM_SUCCESS,
    DETAIL_LIST_SUCCESS,
    TIME_CHANGE,
    DETAIL_ID,
    DETAIL_CLASSID,
    DETAIL_ACCOUNTID,
    DETAIL_TYPE,
    DETAIL_CONTENT,
    DETAIL_MONEY,
    DETAIL_CREATEDATE,
    DETAIL_LAST_ID,
    CATEGORY_DATA_CHART_SUCCESS,
    CATEGORY_SELECTLABEL,
    CATEGORY_INIT,
    CATEGORY_TYPE,
    NAVITEMS_INIT
  }from '../constants'

const SN = new Dialog();
const Toa = new Toast();

//切换菜单获取初始化值
export function getNavInit(val){
  return dispatch => {
    dispatch({type: NAVITEMS_INIT, val: val})
    dispatch({type: CATEGORY_SELECTLABEL, val: null}) //清空类型label
    dispatch({type: DETAIL_LAST_ID, val: 0}) //初始化首页
  }
}
//详情列表页合计
function receiveDetailData(val){
  return{
    type: DETAIL_LIST_SUCCESS,
    val: val
  }
}
function receiveLastId(val){
  return{
    type: DETAIL_LAST_ID,
    val: val
  }
}
export function getLastId(val){
  return (dispatch) => {
    dispatch(receiveLastId(val))
  }
}
//详情信息数据
function receiveDetail(data){
  return{
    type: DETAIL_SUCCESS,
    data: data
  }
}
//头部时间更新数据
function timeChange(y, m, pay='0.00', payName, income='0.00', incomeName, sum='0.00'){
  return{
    type: TIME_CHANGE,
    y: y,
    m: m,
    pay: pay,
    payName: payName,
    income: income,
    incomeName: incomeName,
    sum: sum
  }
}
//更新头部数据
export function getTopInfo(y, m){
  return (dispatch, getState) => {
    return fetch(Vizn.prototype.apiPath('detail/monthSum'), {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: 'year='+y +'&month='+m
      }).then(response => response.json().then(json => ({ json, response })))
        .then(({json,response}) => {
          if(!response.ok){
            SN.snalert('暂无数据')
            dispatch(timeChange(y, m))
          }else{
            if(y && m){
              dispatch(timeChange(y, m, json.pay, '支出(元)', json.income, '收入(元)'))
            }else{
              dispatch(timeChange(getState().topInfo.toJS().y, getState().topInfo.toJS().m, json.pay, '总支出(元)', json.income, '总收入(元)', json.sum))
            }
          }
        }).catch( err =>{
          SN.snalert('网络异常')
          //数据异常
          console.log('异常错误：'+err.message)
        })
  }
}
//根据ID获取详情信息数据
export function getDetail(id){
  return (dispatch, getState) => {
    if(id){
      Toa.loadPage('ture', '加载数据')
      return fetch(Vizn.prototype.apiPath('detail/info'), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'id='+id
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
            Toa.loadPage('', '加载数据')
				  	if(!response.ok){
              SN.snalert('参数错误')
				  	}else{
              dispatch(receiveDetail(json))
            }
				  }).catch( err =>{
            Toa.loadPage('', '加载数据')
				  	//数据异常
				    console.log('异常错误：'+err.message)
				  })
    }
  }
}
export function getChartInit(val){
  return (dispatch) => {
    dispatch({type:CATEGORY_INIT, val: val})
  }
}
export function getCategoryType(val){
  return dispatch => {
    dispatch({type:CATEGORY_TYPE, val: val})
  }
}
//获取记账详情
export function getDetailData(className, year, month){
  return (dispatch, getState) => {
    dispatch({type:CATEGORY_SELECTLABEL, val: className}) //获取所选类别名称
    if(className){
      className = '&className=' + className
    }else{
      className = ''
    }
    if(!year){
      year = getState().topInfo.toJS().y
    }
    if(!month){
      month = getState().topInfo.toJS().m
    }
      if(getState().detailData.toJS().last_id == -1){
        SN.snalert('没有更多数据了')
        return
      }
      let size = 15 //每页显示记录数
      let last_id = getState().detailData.toJS().last_id
      let token = getCookie('token')
      return fetch(Vizn.prototype.apiPath('detail/List'), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'year='+ year+'&month='+month + '&size='+size+'&last_id=' + last_id + className
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
				  	if(!response.ok){
              SN.snalert('暂无数据')
              dispatch(timeChange(y, m))
				  	}else{
              if(last_id == 0){//首页是否判断
                dispatch(receiveDetailData(json.data))
              }else{
                let data = json.data
                let newdata = getState().detailData.toJS().data
                for(let key in data){
                  newdata.push(data[key])
                }
                SN.snalert('加载更多')
                dispatch(receiveDetailData(newdata))
              }
              if(json.data.length == size){
                last_id = json.data[size-1]._id
              }else{
                last_id = -1 //数据加载完毕
              }
              dispatch(receiveLastId(last_id))
            }
				  }).catch( err =>{
            SN.snalert(err.message)
				  	//数据异常
				    console.log('异常错误：'+err.message)
				  })
   }
}
//清空类别列表数据
export function clearDetailData(){
  return (dispatch) => {
    dispatch(receiveDetailData([]))
  }
}
//获取图表数据
export function getCategoryDataChart(year, month){
  return (dispatch, getState) => {
    dispatch({type:CATEGORY_DATA_CHART_SUCCESS, data: null}) //清除旧的图表数据
    if(!year){
      year = getState().topInfo.toJS().y
    }
    if(!month){
      month = getState().topInfo.toJS().m
    }
    Toa.loadPage('ture', '加载数据')
    return fetch(Vizn.prototype.apiPath('category/chart'), {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: 'year='+year +'&month='+ month + '&type=' + getState().categoryData.toJS().type
      }).then(response => response.json().then(json => ({ json, response })))
        .then(({json,response}) => {
          dispatch({type:CATEGORY_DATA_CHART_SUCCESS, data: json})
          dispatch({type:CATEGORY_INIT, val: 1}) //初始化图表加载状态
          Toa.loadPage('', '加载数据')
        }).catch( err =>{
          dispatch({type:CATEGORY_DATA_CHART_SUCCESS, data: null})
          dispatch({type:CATEGORY_SELECTLABEL, val: null})
          dispatch(receiveDetailData([]))
          Toa.loadPage('', '加载数据')
          //数据异常
          console.log('异常错误：'+err.message)
        })
  }
}

function receiveId(val){
  return {
    type: DETAIL_ID,
    val: val
  }
}
function receiveClassId(val){
  return {
    type: DETAIL_CLASSID,
    val:val
  }
}
function receiveAccountId(val){
  return {
    type: DETAIL_ACCOUNTID,
    val:val
  }
}
function receiveType(val){
  return {
    type: DETAIL_TYPE,
    val: val
  }
}
function receiveContent(val){
  return{
    type: DETAIL_CONTENT,
    val: val
  }
}
function receiveMoney(val){
  return{
    type: DETAIL_MONEY,
    val: val
  }
}
function receiveCreateDate(val){
  return{
    type: DETAIL_CREATEDATE,
    val: val
  }
}

export function getId(val){
  return (dispatch) => {
    dispatch(receiveId(val))
  }
}
export function getClassId(val){
  return (dispatch) => {
    dispatch(receiveClassId(val))
  }
}
export function getAccountId(val){
  return (dispatch) => {
    dispatch(receiveAccountId(val))
  }
}
export function getType(val){
  return (dispatch) => {
    dispatch(receiveType(val))
  }
}
export function getContent(val){
  return (dispatch) => {
    dispatch(receiveContent(val))
  }
}
export function getMoney(val){
  return (dispatch) => {
    dispatch(receiveMoney(val))
  }
}
export function getCreateDate(val){
  return (dispatch) => {
    dispatch(receiveCreateDate(val))
  }
}
export function updateDetail(){
  return (dispatch, getState) => {
    let token = getCookie('token')
    Toa.loadPage('ture', '正在提交')
    return fetch(Vizn.prototype.apiPath('detail/update'), {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
				      'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(getState().detail.toJS())
      }).then(response => response.json().then(json => ({json, response })))
        .then(({json,response}) => {
          if(response.ok){
            Toa.loadPage('', '正在提交')
            if(json.error_msg){
              SN.snalert(json.error_msg)
            }else {
              if(json.update){
                SN.snisok(
                  '修改成功',
                  ()=>{
                    if(window.postMessage){
                      window.postMessage("http://"+window.location.host+"/^KAS记账")
                    }else{
                      dispatch(push('/'))
                    }
                  }
                )
              }else{
                SN.snconfirm('添加成功',
                '返回列表', ()=>{
                  if(window.postMessage){
                    window.postMessage("http://"+window.location.host+"/^KAS记账")
                  }else{
                    dispatch(push('/'))
                  }
                },
                '记一笔', ()=>{
                    dispatch(receiveContent(''))
                    dispatch(receiveMoney(''))
                })
              }
            }
          }
        }).catch( err =>{
          Toa.loadPage('', '正在提交')
          //数据异常
          console.log('异常错误：'+err.message)
        })
  }
}
