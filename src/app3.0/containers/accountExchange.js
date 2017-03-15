import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/'

//添加类别
class AccountExchange extends React.Component{
  constructor(props){
    super(props)
  }
  async componentWillMount(){
    this.props.actions.getExchangeList()
    await this.props.actions.getFromaccountData()
    this.props.actions.getToaccountData(0)
  }
  async handleClick(value){
    await this.props.actions.getExid(value._id)
    await this.props.actions.getFromacid(value.fromacid._id)
    await this.props.actions.getToaccountData(value.fromacid._id)
    await this.props.actions.getToacid(value.toacid._id)
    await this.props.actions.getExMoney(value.money)
  }
  handleFromAccountChange(e){
    this.props.actions.getFromacid(e.target.value)
    this.props.actions.getToaccountData(e.target.value)
  }
  handleToAccountChange(e){
    this.props.actions.getToacid(e.target.value)
  }
  handleMoney(value){
    this.props.actions.getExMoney(value)
  }
  render(){
    const {exchangeDate, actions} = this.props
    let option = (data)=>data.map(function(data, index){
      return(
          <option key={index} value={data._id}>{data.name}</option>
      )
    })
    return(
      <div className="page">
        <div style={{background: '#FFFFFF', width: "100%"}}  className="fix">
        <div className="weui_cells_title">账户互转</div>
        <div className="weui_cells weui_cells_form">
          <div className="weui_cell weui_cell_select weui_select_after">
                <div className="weui_cell_hd">
                    账户
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={exchangeDate.exchange.fromacid} onChange={this.handleFromAccountChange.bind(this)} className="weui_select txtcolor">
                    <option>请选择账户</option>
                    {option(exchangeDate.fromaccountData)}
                    </select>
                </div>
                <label className="weui_label">=></label>
                <div className="weui_cell_bd weui_cell_primary">
                    <select value={exchangeDate.exchange.toacid} onChange={this.handleToAccountChange.bind(this)} className="weui_select txtcolor">
                    <option>请选择账户</option>
                    {option(exchangeDate.toaccountData)}
                    </select>
                </div>
          </div>
          <Cell.Input name="金额" value={exchangeDate.exchange.money} onChange={this.handleMoney.bind(this)} type="number" placeholder="请输入金额" />
          <Cell.Btn name="提交" onClick={actions.updateExchange} style="weui_btn weui_btn_warn"/>
          <div className="weui_cell weui_cell_hd">[互转明细]</div>
        </div>
        </div>
        <div style={{height:'230px'}}> </div>
        <Cell.ExchangeList data={exchangeDate.listData} onClick={this.handleClick.bind(this)}/>
        <Cell.Btn_extra goback="ture" name="返回"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchangeDate: state.exchangeDate.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(AccountExchange)
