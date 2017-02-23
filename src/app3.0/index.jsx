import 'weui/dist/style/weui.min.css';
import './css/webstyle.css';

import React, { Component } from 'react'
import { render } from 'react-dom'

import configureStore from './redux/configureStore'
import Root from './containers/rootRoutes'

const store = configureStore()
const app = document.createElement('div')
document.body.appendChild(app)
window.postMessage = null // 初始化清空postMessage
render( <Root store={store}/>, app)
