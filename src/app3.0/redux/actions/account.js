import { push } from 'react-router-redux'
import 'babel-polyfill'
import {saveCookie,getCookie,signOut, isLogin} from '../../utils/authService'
import Vizn, {Toast, Dialog} from '../../utils/vizn';
import {
    REQUESTSTART,
    FAILUREMSG,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    USERINFO_SUCCESS,
    UPDATE_USER_SUCCESS,
    SNSLOGINS_SUCCESS,
    NICKNAME,
    MOBILE,
    MOBILE_CAPTCHA
  }from '../constants'

const SN = new Dialog();
const Toa = new Toast();

/*数据请求公共方法*/
//发送请求
function requestStart(){
  return {type: REQUESTSTART}
}
//接口通信失败
function failureMsg(err) {
  return {
    type: FAILUREMSG,
    errMsg: err
  }
}
//验证码发送结果
function MobileCaptcha(status, time) {
	return {
		type: MOBILE_CAPTCHA,
		status: status,
    time: time
	}
}
//验证码倒计时
export function countDown(status, time){
  return (dispatch, getState)=>{
    return dispatch(MobileCaptcha(status, time))
  }
}

//获取手机验证码
export function setMobileCaptcha(mobile){
  return (dispatch, getState) => {
    return fetch(Vizn.prototype.apiPath('auth/mobileCaptcha'),{
			method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "mobile="+mobile
		})
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) =>{
      if(!response.ok){
        SN.snalert('验证码发送失败！')
				return dispatch(failureMsg(json))
      }else{
        if(json.status == 1){
          SN.snalert('验证码发送成功！')
        }
        else {
          SN.snalert('验证码发送失败！')
        }
        return dispatch(MobileCaptcha(json.status, getState().captchaData.toJS().time))
      }
    }).catch(e=>{
			SN.snalert('网络错误')
		})
  }
}

/*Local登陆请求*/
export function localLogin(mobile, mobileCaptcha) {
  let userInfo = {mobile:mobile,mobileCaptcha:mobileCaptcha}
  Toa.loadPage('ture', '正在登陆')
	return (dispatch,getState)=>{
		return fetch(Vizn.prototype.apiPath('auth/local'),{
			method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "mobile="+mobile+"&mobileCaptcha="+mobileCaptcha
		})
    .then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
      Toa.loadPage('', '正在登陆')
			if(response.ok){
        if(json.error_msg){
          SN.snalert(json.error_msg)
        }else{
          saveCookie('token',json.token)
          dispatch(push('/'))
        }
			}else{
        dispatch(failureMsg(json))
      }
		}).catch(e=>{
      Toa.loadPage('', '正在登陆')
			dispatch(failureMsg(e))
		})
	}
}
//退出登录
export function logout() {
  return dispatch => {
  	signOut()
    dispatch({type: LOGOUT_USER})
    dispatch(push('/'))
  }
}
/*获取用户信息*/
function receiveUserInfo(userInfo) {
	return {
		type: USERINFO_SUCCESS,
		userInfo: userInfo
	}
}
export function getUserInfo() {
  return (dispatch, getState) => {
    return fetch(Vizn.prototype.apiPath('users/info'), {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
				  	if(!response.ok){
				  		dispatch(failureMsg())
              dispatch(push('/login'))
				  	}else{
              dispatch(receiveUserInfo(json))
            }
				  }).catch( err =>{
				  	//登录异常
				    dispatch(failureMsg())
            dispatch(push('/login'))
				  })
   }
}
//初始化用户数据
export function getUserInit(){
  return (dispatch, getState) => {
    return fetch(Vizn.prototype.apiPath('users/info'), {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
				  	if(!response.ok){
				  		dispatch(failureMsg())
				  	}else{
              if(json.status == 0){
                Toa.loadPage('true', '初始化数据')
                return fetch(Vizn.prototype.apiPath('init'), {
                  credentials: 'include',
                  headers: {
                      'Authorization': `Bearer ${getCookie('token')}`
                  }
                }).then(response => response.json().then(json => ({ json, response })))
                  .then(({json,response}) =>{
                    Toa.loadPage('', '初始化数据')
                    if(!json.success){
                      SN.snalert('初始化失败')
                    }
                  }).catch( err =>{
                    dispatch(failureMsg(err))
                    Toa.loadPage('', '初始化数据')
                  })
              }
            }
				  }).catch( err =>{
				  	//登录异常
				    dispatch(failureMsg())
				  })
  }
}
//修改用户资料
function successUpdateUser(user) {
	return {
		type: UPDATE_USER_SUCCESS,
		user:user
	}
}
export function updateUser(userInfo) {
	return (dispatch,getState)=>{
		return fetch(Vizn.prototype.apiPath('users/update'),{
			method: 'put',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  'Authorization': `Bearer ${getCookie('token')}`
			},
			body: JSON.stringify(userInfo)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureMsg(json.error_msg))
			}
			return dispatch(successUpdateUser(json.data))
		}).catch(err=>{
			return dispatch(failureMsg(err))
		})
	}
}


//获取sns
function receiveSnsLogins(logins) {
	return {
		type: SNSLOGINS_SUCCESS,
		logins:logins
	}
}
export function getSnsLogins() {
	return (dispatch,getState)=>{
		return fetch(Vizn.prototype.apiPath('auth/snsLogins'))
		.then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureMsg(json.error_msg))
			}
			return dispatch(receiveSnsLogins(json.data))
		}).catch(e=>{
			return dispatch(failureMsg(e))
		})
	}
}
