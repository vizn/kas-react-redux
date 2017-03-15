import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/'

//添加类别
class AccountEdit extends React.Component{
  constructor(props) {
   super(props)
   if(this.props.params.id){
     this.props.actions.getCategoryDetail(this.props.params.id)
     this.props.actions.getDetailData(null,null,null,this.props.params.id)
   }else{
     this.props.actions.pushPayOrIncome('0')
   }
   this.componentDidMount = this.componentDidMount.bind(this)
   this.componentWillUnmount = this.componentWillUnmount.bind(this)
   this.handleScroll = this.handleScroll.bind(this)
  }
  handleClassName(e){
    this.props.actions.pushName(e.target.value)
  }
  handleMoney(e){
    this.props.actions.pushMoney(e.target.value)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(e){
    let el = e.srcElement.body
    let gap = el.scrollHeight - el.scrollTop - $(window).height()   // 为0 即滚动到最下
    if(gap == 0){
      this.props.actions.getDetailData(null,null,null,this.props.params.id)
    }
  }
  render(){
    const {detailData, category, actions} =this.props
    return (
      <div className="page">
        <div style={{background: '#FFFFFF', width: "100%"}}  className="fix">
        <div className="weui_cells_title">编辑账户</div>
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
        <div className="weui_cell weui_cell_hd">[消费明细]</div>
        </div>
        <div style={{height:'230px'}}> </div>
        <Cell.ConList data={detailData.data} urlPath='/edit/'/>
        <Cell.Btn_extra goback="ture" name="返回"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    category: state.categoryDetail.toJS(),
    detailData: state.detailData.toJS()
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
