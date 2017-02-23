import { push } from 'react-router-redux'
import {saveCookie,getCookie,signOut, isLogin, initData} from '../../utils/authService'
import Vizn, {Toast, Dialog} from '../../utils/vizn';
import {
    CATEGORY_DATA_SUCCESS,
    CATEGORY_PAYORINCOME,
    CATEGORY_NAME,
    CATEGORY_ID,
    CATEGORY_MONEY,
    ACCOUNT_LIST_SUCCESS
  }from '../constants'

const SN = new Dialog();
const Toa = new Toast();

//接收类别数据集
function receiveCategoryList(data){
  return {
    type: CATEGORY_DATA_SUCCESS,
    data: data
  }
}
//账户数据
function receiveAccountList(data){
  return {
    type: ACCOUNT_LIST_SUCCESS,
    data: data
  }
}
function receivePayOrIncome(value){
  return{
    type: CATEGORY_PAYORINCOME,
    payOrIncome: value
  }
}
//类别详情
export function pushPayOrIncome(value){
  return (dispatch) => {
    dispatch(receivePayOrIncome(value))
  }
}

function receiveMoney(value){
  return{
    type: CATEGORY_MONEY,
    val: value
  }
}
export function pushMoney(value){
  return (dispatch) => {
    dispatch(receiveMoney(value))
  }
}
function receiveName(value){
  return{
    type: CATEGORY_NAME,
    name: value
  }
}
export function pushName(value){
  return (dispatch) => {
    dispatch(receiveName(value))
  }
}
function receiveId(value){
  return {
    type: CATEGORY_ID,
    id: value
  }
}
export function pushId(value){
  return (dispatch) => {
    dispatch(receiveId(value))
  }
}

//根据ID获取详情数据
export function getCategoryDetail(id){
  return (dispatch, getState) => {
    if(id){
      Toa.loadPage('ture', '加载数据')
      return fetch(Vizn.prototype.apiPath('category/info'), {
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
              dispatch(receiveId(json._id))
              dispatch(receiveName(json.name))
              dispatch(receivePayOrIncome(json.type))
              dispatch(receiveMoney(json.money))
            }
				  }).catch( err =>{
            Toa.loadPage('', '加载数据')
				  	//数据异常
				    console.log('异常错误：'+err.message)
				  })
    }
  }
}

function categoryData(type, dispatch){
  // initData(Vizn.prototype.apiPath('init/'),getCookie('token'))
  Toa.loadPage('ture', '加载数据')
  return fetch(Vizn.prototype.apiPath('category/list'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${getCookie('token')}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'type='+type
    }).then(response => response.json().then(json => ({ json, response })))
      .then(({json,response}) => {
        Toa.loadPage('', '加载数据')
        if(!response.ok){
          SN.snalert('暂无分类')
        }else{
          if(type == 0){
            dispatch(receiveAccountList(json))
          }else{
            dispatch(receiveCategoryList(json))
          }
        }
      }).catch( err =>{
        Toa.loadPage('', '加载数据')
        // categoryData(type, dispatch)
        SN.snalert('网络异常')
        //数据异常
        console.log('异常错误：'+err.message)
      })
}
//获取类别列表数据
export function getCategoryData(type){
  return (dispatch, getState) => {
    categoryData(type, dispatch)
  }
}

//获取类别详情
export function setInfo(val){
  return (dispatch) => {
    dispatch(receiveId(val._id))
    dispatch(receiveName(val.name))
    dispatch(receivePayOrIncome(val.type))
    dispatch(receiveMoney(val.money))
  }
}
export function clearInfo(){
  return (dispatch) => {
    dispatch(receiveId(''))
    dispatch(receiveName(''))
    dispatch(receiveMoney(0))
  }
}
//添加、更新类别详情
export function updateCategoryDetail(){
  return (dispatch, getState) => {
    const detail = getState().categoryDetail.toJS().detail
    return fetch(Vizn.prototype.apiPath('category/update'), {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
				      'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie('token')}`
          },
          body: JSON.stringify(detail)
      }).then(response => response.json().then(json => ({json, response })))
        .then(({json,response}) => {
          if(response.ok){
            if(json.error_msg){
              SN.snalert(json.error_msg)
            }else {
              SN.snalert('提交成功')
              dispatch(receiveId(''))
              dispatch(receiveName(''))
              dispatch(receiveMoney(''))
              if(detail.type != '0'){
                categoryData(getState().categoryDetail.toJS().detail.type, dispatch)
              }
            }
          }
        }).catch( err =>{
          Toa.loadPage('', '正在提交')
          SN.snalert(err.message)
          //数据异常
          console.log('异常错误：'+err.message)
        })
  }
}
