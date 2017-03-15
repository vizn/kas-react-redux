import React,{Component} from 'react'
import {Provider} from 'react-redux'
import { Router, Route, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import {redirectToLogin, redirectToBack} from '../utils/authService'
import Login from './login'
import Main from './main/'
import Edit from './edit'
import CategoryEdit from './categoryEdit'
import AccountEdit from './accountEdit'
import AccountExchange from './accountExchange'
import Download from './download'
export default class Root extends Component{
	render(){
		const {store} = this.props
		const history = syncHistoryWithStore(browserHistory, store)
		return (
			<Provider store={store}>
			  <div>
			    <Router history={browserHistory}>
						<Route path="/" component={Main} onEnter={redirectToLogin} />
						<Route path="/edit(/:acid)" component={Edit} onEnter={redirectToLogin}/>
						<Route path="/category/edit" component={CategoryEdit} onEnter={redirectToLogin}/>
						<Route path="/account/edit(/:id)" component={AccountEdit} onEnter={redirectToLogin} />
						<Route path="/account/exchange" component={AccountExchange} onEnter={redirectToLogin} />
						<Route path="/login" component={Login} onEnter={redirectToBack}/>
						<Route path="/download" component={Download}/>
						<Route path="/:type" component={Main} onEnter={redirectToLogin}/>
			    </Router>
			  </div>
			</Provider>
		)
	}
}
