import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/category'

//添加类别
class CategoryEdit extends React.Component{
  constructor(props) {
   super(props)
   this.props.actions.getCategoryData(this.props.category.detail.type)
  }
  handlePayOrIncome(e){
    this.props.actions.getCategoryData(e.target.value)
    this.props.actions.pushPayOrIncome(e.target.value)
  }
  handleClassName(e){
    this.props.actions.pushName(e.target.value)
  }
  render(){
    const {category, actions} =this.props
    return (
      <div className="page">
        <div className="weui_cells_title">类别表单</div>
        <div className="weui_cells weui_cells_form">
        <div className="weui_cell weui_cell_select weui_select_after">
                <div className="weui_cell_hd">
                    收支
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={category.detail.type} className="weui_select txtcolor" onChange={this.handlePayOrIncome.bind(this)}>
                        <option value="2">支出</option>
                        <option value="1">收入</option>
                    </select>
                </div>
        </div>

        <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">名称</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input value={category.detail.name} onChange={this.handleClassName.bind(this)} className="weui_input" type="text" placeholder="请输入类别名称" />
            </div>
        </div>
        </div>
        <Cell.Btn name="提交" onClick={actions.updateCategoryDetail} style="weui_btn weui_btn_warn"/>
        <Cell.ImgList title="类别列表" data={category.data} actions={actions}/>
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
)(CategoryEdit)
