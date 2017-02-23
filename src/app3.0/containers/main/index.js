import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../../components/cell';
import * as Actions from '../../redux/actions/'
import * as AccountActions from '../../redux/actions/account'
import Main from './main'
import Category from './category'
import Account from './account'

//类别报表
class Index extends React.Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handlePayOrIncome = this.handlePayOrIncome.bind(this)
  }
  componentDidMount(){
    if(this.props.params.type){
      this.props.actions.getNavInit(this.props.params.type)
    }
    //初始化用户数据
    this.props.accountActions.getUserInit()
  }
  //日期选择回调方法
  handleClick(year, month){
    if(year == this.props.topInfo.y && month == this.props.topInfo.m){
      return
    }
    this.props.actions.getTopInfo(year, month)
    if(this.props.navItems.init == "main"){
      this.props.actions.getLastId(0)
      this.props.actions.getDetailData('', year, month)
    }else if(this.props.navItems.init == "category"){
      this.props.actions.getCategoryDataChart(year, month)
    }
  }
  //支出收入切换事件
  handlePayOrIncome(val){
    if(this.props.navItems.init == "main"){
      // this.props.actions.getLastId(0)
      // this.props.actions.getDetailData('','','',val)
    }else if(this.props.navItems.init == "category"){
      this.props.actions.getCategoryDataChart()
    }
  }
  render(){
    let {categoryData, navItems, topInfo, actions} = this.props
    if(navItems.init == "main"){
      return(
        <div>
            <Cell.Top actions={actions} type={categoryData.type} onSelectDate={this.handleClick} topInfo={topInfo} onClick={this.handlePayOrIncome}/>
            <Cell.Menus dlink='main' items={navItems.data} onSelect={actions.getNavInit}/>
            <Main />
        </div>
      )
    }else if(navItems.init == "category"){
      return(
        <div>
            <Cell.Top actions={actions} type={categoryData.type} onSelectDate={this.handleClick} topInfo={topInfo} onClick={this.handlePayOrIncome}/>
            <Cell.Menus dlink='category' items={navItems.data} onSelect={actions.getNavInit}/>
            <Category />
        </div>
      )
    }else if(navItems.init == "account"){
      return(
        <div>
            <Cell.Top actions={actions} dlink='account' type={categoryData.type} topInfo={topInfo} onClick={this.handlePayOrIncome}/>
            <Cell.Menus dlink='account' items={navItems.data} onSelect={actions.getNavInit}/>
            <Account />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    categoryData: state.categoryData.toJS(),
    navItems: state.navItems.toJS(),
    topInfo: state.topInfo.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    accountActions: bindActionCreators(AccountActions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Index)
