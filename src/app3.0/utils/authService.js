import cookie from 'react-cookie'
let cookieConfig = {}
if(process.env.NODE_ENV === 'production'){
  cookieConfig = {domain:''}
}

export function saveCookie(name,value) {
  cookie.save(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig);
}

export function signOut() {
  cookie.remove('token', cookieConfig);
}

export function isLogin() {
  return !!cookie.load('token')
}

export function redirectToBack(nextState, replace) {
	//已经登录则不进入
  if (isLogin()) {
    replace('/')
  }
}
export function redirectToLogin(nextState,replace) {
	if (!isLogin()) {
    replace('/login')
  }
}
export function redirectNextState(prevState) {
  console.log(prevState)
}
export function initData(apiPath, token){
  return fetch(apiPath, {
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then(response => response.json().then(json => ({ json, response })))
        .then(({json,response}) => {
          if(!response.ok){
            console.log(json)
          }else{

          }
        }).catch( err =>{

        })
}
