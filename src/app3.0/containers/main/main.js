import React ,{Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Cell from '../../components/cell';
import * as Actions from '../../redux/actions/'

//明细主页
class Main extends React.Component{
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.props.actions.getTopInfo(this.props.topInfo.y, this.props.topInfo.m)
    this.props.actions.getDetailData()
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
      this.props.actions.getDetailData()
    }
    // if(el.scrollTop == 0){
    //   this.props.actions.getLastId(0)
    //   this.props.actions.getDetailData()
    // }
  }
  render(){
    let {detailData} = this.props
    return(
      <div>
          <div className="page slideIn cell">
            <div className="top_115"></div>
            <div className="bd">
                <Cell.ConList data={detailData.data} urlPath='/edit/'/>
            </div>
          </div>
          <Cell.Btn_extra name='+记一笔' url='/edit' />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    detailData: state.detailData.toJS(),
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
)(Main)
