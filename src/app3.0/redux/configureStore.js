import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import createLogger from 'redux-logger';
import { routerMiddleware} from 'react-router-redux'
import { browserHistory} from 'react-router'

const middleware = routerMiddleware(browserHistory)
const logger = createLogger({
  level: 'info',
  logger: console,
  collapsed: true
})
const createStoreWithMiddleware = process.env.NODE_ENV === 'development' ? applyMiddleware(
  middleware, thunk, logger
)(createStore) : applyMiddleware(
  middleware, thunk
)(createStore)

module.exports = function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
