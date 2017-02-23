import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/'
import * as CategoryActions from '../redux/actions/category'

//添加类别
class Edit extends React.Component{
  constructor(props) {
   super(props)
   const acid = this.props.params.acid?this.props.params.acid:""
   const {actions, categoryActions, detail} = this.props
   if(acid !== ""){
     actions.getDetail(acid) //获取详情
   }
   categoryActions.getCategoryData(detail.type) //绑定分类
   categoryActions.getCategoryData(0) //绑定账户
  }
  handlePayOrIncome(e){
    const value = e.target.value;
    const {actions, categoryActions} = this.props
    actions.getType(value)
    categoryActions.getCategoryData(value) //绑定分类
  }
  handleClassName(e){
    const value = e.target.value;
    this.props.actions.getClassId(value)
  }
  handleAccountName(e){
    const value = e.target.value;
    this.props.actions.getAccountId(value)
  }
  handleContent(e){
    const value = e.target.value;
    this.props.actions.getContent(value)
  }
  handleDateTime(value){
    this.props.actions.getCreateDate(value)
  }
  handleMoney(e){
    const value = e.target.value;
    this.props.actions.getMoney(value)
  }
  render(){
    const {actions, categoryActions, detail, categoryList} = this.props
    const className = categoryList.classList.map(function(data, index){
      return(
        <option key={index} value={data._id}>{data.name}</option>
      )
    })
    const accountName = categoryList.accountList.map(function(data, index){
      return(
        <option key={index} value={data._id}>{data.name}</option>
      )
    })
    return (
      <div className="page">
        <div className="weui_cells_title">记一笔</div>
        <div className="weui_cells weui_cells_form">
        <div className="weui_cell weui_cell_select weui_select_after">
                <div className="weui_cell_hd">
                    收支
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={detail.type} className="weui_select txtcolor" onChange={this.handlePayOrIncome.bind(this)}>
                        <option value="2">支出</option>
                        <option value="1">收入</option>
                    </select>
                </div>
        </div>
        <div className="weui_cell weui_cell_select weui_select_after">
                <div className="weui_cell_hd">
                    分类
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={detail.classId} className="weui_select" onChange={this.handleClassName.bind(this)}>
                    <option>请选择分类</option>
                    {className}
                    </select>
                </div>
        </div>
        <div className="weui_cell weui_cell_select weui_select_after">
                <div className="weui_cell_hd">
                    账户
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={detail.accountId} className="weui_select" onChange={this.handleAccountName.bind(this)}>
                    <option>请选择账户</option>
                      {accountName}
                    </select>
                </div>
        </div>
        <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">备注</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input value={detail.content} onChange={this.handleContent.bind(this)} className="weui_input" type="text" placeholder="请输入备注" />
            </div>
        </div>
        <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">日期</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <Cell.SelectTimeInput className="weui_input" val={detail.updated} callback={this.handleDateTime.bind(this)} format="yy-mm-dd"/>
            </div>
        </div>
        <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">金额</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input value={detail.money} onChange={this.handleMoney.bind(this)} className="weui_input" type="number" placeholder="请输入金额" />
            </div>
        </div>
        </div>
        <Cell.Btn name="提交" onClick={this.props.actions.updateDetail} style="weui_btn weui_btn_warn"/>
        <Cell.Btn_extra goback="ture" name="返回"/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    detail: state.detail.toJS(),
    categoryList: state.categoryList.toJS()
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
)(Edit)
