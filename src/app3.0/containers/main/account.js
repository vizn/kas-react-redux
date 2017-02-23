import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../../components/cell';
import * as Actions from '../../redux/actions/'
import * as CategoryActions from '../../redux/actions/category'


//账户列表
class Account extends React.Component{
  constructor(props) {
    super(props)
    this.props.actions.getTopInfo()
    this.props.categoryActions.getCategoryData('0')
  }
  render(){
    let {categoryList} = this.props
    return(
      <div>
          <div className="page slideIn cell">
            <div className="top_115"></div>
            <div className="bd">
                <Cell.AccountList data={categoryList.accountList} urlPath='/account/edit'/>
            </div>
          </div>

      </div>
    )
  }
}
// <Cell.Btn_extra name='<=>账户互转' url='/account/exchange' />
function mapStateToProps(state) {
  return {
    categoryList: state.categoryList.toJS(),
    topInfo: state.topInfo.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    categoryActions: bindActionCreators(CategoryActions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Account)
