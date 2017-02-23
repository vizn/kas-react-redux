import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../../components/cell';
import * as Actions from '../../redux/actions/'


//类别报表
class Category extends React.Component{
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.props.actions.clearDetailData()
    this.props.actions.getCategoryDataChart()
  }
  //报表类别选择回调方法
  handleSelect(label){
    this.props.actions.getLastId(0)
    this.props.actions.getDetailData(label)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  //滑动加载下一页
  handleScroll(e){
    let el = e.srcElement.body
    let gap = el.scrollHeight - el.scrollTop - $(window).height()   // 为0 即滚动到最下
    if(gap == 0){
      this.props.actions.getDetailData(this.props.categoryData.selectLabel)
    }
  }
  render(){
    let {detailData, categoryData, topInfo, actions} = this.props
    if(categoryData.chart){
      return(
        <div>
            <div className="page slideIn cell">
                <div className="top_115"></div>
                <div className="bd">
                      <Cell.Canvas data={categoryData.chart} actions={actions} setInit={actions.getChartInit} init={categoryData.init} handleSelect={this.handleSelect}/>
                      <Cell.ConList data={detailData.data} urlPath='/edit/'/>
                </div>
            </div>
            <Cell.Btn_extra name='+添加类别' url='/category/edit' />
        </div>
      )
    }else{
      return(
        <div>
            <div className="page slideIn cell">
                <div className="top_115"></div>
                <div className="bd" style={{color: '#888', fontSize: '14px', padding:'10px'}}>
                      暂无数据
                </div>
            </div>
            <Cell.Btn_extra name='+添加类别' url='/category/edit' />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    detailData: state.detailData.toJS(),
    categoryData: state.categoryData.toJS(),
    topInfo: state.topInfo.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Category)
