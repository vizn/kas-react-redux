import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/category'

//添加类别
class AccountEdit extends React.Component{
  constructor(props) {
   super(props)
   if(this.props.params.id){
     this.props.actions.getCategoryDetail(this.props.params.id)
   }else{
     this.props.actions.pushPayOrIncome('0')
   }
  }
  handleClassName(e){
    this.props.actions.pushName(e.target.value)
  }
  handleMoney(e){
    this.props.actions.pushMoney(e.target.value)
  }
  render(){
    const {category, actions} =this.props
    return (
      <div className="page">
        <div className="weui_cells_title">账户表单</div>
        <div className="weui_cells weui_cells_form">
        <div className="weui_cell">
            <div className="weui_cell_hd"><label style={{width:'80px'}} className="weui_label">账户名称</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input value={category.detail.name} onChange={this.handleClassName.bind(this)} className="weui_input" type="text" placeholder="请输入账户类型名称" />
            </div>
        </div>
        <div className="weui_cell">
            <div className="weui_cell_hd"><label style={{width:'80px'}} className="weui_label">初始预算</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input value={category.detail.money} onChange={this.handleMoney.bind(this)} className="weui_input" type="Number" placeholder="请输入预算金额" />
            </div>
        </div>
        </div>
        <Cell.Btn name="提交" onClick={actions.updateCategoryDetail} style="weui_btn weui_btn_warn"/>
        <Cell.Btn_extra goback="ture" name="返回"/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    category: state.categoryDetail.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(AccountEdit)
