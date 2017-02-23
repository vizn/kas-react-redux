import React ,{Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Vizn, {Toast, Dialog} from '../utils/vizn';
import * as Cell from '../components/cell';
import * as Actions from '../redux/actions/account'
const SN = new Dialog();
const Toa = new Toast();

//登陆组件
class Login extends Component{
  constructor(props){
    super(props)
    this.state={captcha:''}
  }
  handleChange(value){
    this.setState({captcha:value})
  }

  check(){
    var mobile = ReactDOM.findDOMNode(this.refs.mobile).value.trim();
    const MOBILE_REGEXP = /^1\d{10}$/;
    if (mobile=="") {
       SN.snalert("手机号不能为空")
       return false
    }
    if(!MOBILE_REGEXP.test(mobile)){
        SN.snalert("手机号不合法")
        return false
    }
    return true
  }
  postLogin(e) {
    const {actions} = this.props
    e.preventDefault();
    var mobile = ReactDOM.findDOMNode(this.refs.mobile).value.trim();
    if(this.state.captcha == ''){
      SN.snalert("验证码不能为空")
      return false
    }
    if(this.check()){
      actions.localLogin(mobile, this.state.captcha)
    }
  }
  handleClick(){
    const {actions, captchaData} = this.props
    if(this.check()){
      if(captchaData.status == 1){
        if(captchaData.time > 0){
          actions.countDown(1, captchaData.time-1)
          setTimeout(this.handleClick.bind(this),1000)
        }else {
          actions.countDown(0, 60)
        }
      }else{
        actions.setMobileCaptcha()
        setTimeout(this.handleClick.bind(this),1000)
      }
    }
  }
  render(){
    return (
      <div>
        <div className="weui_cells weui_cells_form">
        <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">账号</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input  ref="mobile" className="weui_input" type="text" placeholder="请输入手机号" />
            </div>
        </div>
        <Cell.MobileCaptcha data={this.props.captchaData} onClick={this.handleClick.bind(this)} onChange={this.handleChange.bind(this)}/>
        </div>
        <Cell.Btn name="登陆" onClick={this.postLogin.bind(this)} style="weui_btn weui_btn_primary"/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    captchaData: state.captchaData.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Login)
