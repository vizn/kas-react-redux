import React from 'react';
import ReactDOM from 'react-dom';
import Vizn from '../utils/vizn';
import Icon from './icons'
import Chart from 'chart.js/src/chart.js'




export class Input extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.props.onChange(e.target.value)
  }
  render(){
    return(
      <div className="weui_cell">
          <div className="weui_cell_hd"><label className="weui_label">{this.props.name}</label></div>
          <div className="weui_cell_bd weui_cell_primary">
              <input value={this.props.value} onChange={this.handleChange} className="weui_input" type={this.props.type} placeholder={this.props.placeholder} />
          </div>
      </div>
    )
  }
}

export class Btn extends React.Component{
  constructor(props) {
    super(props);
  }
    render() {
        return (
          <div className="weui_btn_area">
              <a className={this.props.style} href="javascript:;" onClick={this.props.onClick}>{this.props.name}</a>
          </div>
        )
    }
};
export class Btn_extra extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e){
    e.preventDefault()
    if(window.postMessage){
      if(this.props.goback){
        window.postMessage("goback")
      }else{
        window.postMessage("http://"+window.location.host+this.props.url+"^"+this.props.name)
      }
    }else{
      if(this.props.goback)
        history.go(-1)
      else {
        location.href = this.props.url
      }
    }
  }
    render() {
        return (
          <div>
          <div className="white"></div>
          <div className="weui_extra_area white" onClick={this.handleClick}>
              {this.props.name}
          </div>
          </div>
        )
    }
}

export class SelectOption extends React.Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(e){
    e.preventDefault()
    this.props.onChange(e.target.value)
  }
  render(){
    if(this.props.data==undefined||this.props.data==""){
      return(<div></div>)
    }else{
      let option = this.props.data.map(function(data){
        return(
            <option value={data.classid}>{data.classname}</option>
        )
      })
      if(this.props.display == "ture"){
        return(<div></div>)
      }else{
        return(
          <div className="weui_cell weui_cell_select weui_select_after">
                  <div className="weui_cell_hd">
                      {this.props.name}
                  </div>
                  <div className="weui_cell_bd weui_cell_primary">
                      <select value={this.props.value} onChange={this.handleClick} className="weui_select txtcolor">
                      <option>请选择{this.props.name}</option>
                      {option}
                      </select>
                  </div>
          </div>
        )
      }
    }
  }
}

//时间选择器表单
export class SelectTimeInput extends React.Component{
  handleClick(){
    Vizn.prototype.selectTime($("#selectTime"), this.props.callback, this.props.format); //调用回调函数
  }
  render(){
    return(
      <input readOnly className={this.props.className} value={Vizn.prototype.dateFormat(this.props.val, 'yyyy-MM-dd')} type="text" id="selectTime" onSelect={this.handleClick.bind(this)}/>
    )
  }
}

export class Top extends React.Component{
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.inputOnChange = this.inputOnChange.bind(this);
      this.handlePay = this.handlePay.bind(this)
      this.handleIncome = this.handleIncome.bind(this)
  }
  handleClick(e){
    //调用回调函数
    e.preventDefault();
    if(this.props.onSelectDate){
      Vizn.prototype.selectTime($("#selectTime"), this.inputOnChange, 'yy-mm');
    }
  }
  //时间选择器回调方法
  inputOnChange(value){
    var array = value.split('-');
    this.props.onSelectDate(array[0],array[1],this.props.linkType);//时间更新回调
  }
  handlePay(e){
    e.preventDefault()
    if(this.props.onClick && this.props.type !== "2"){
      this.props.actions.getCategoryType('2')
      this.props.onClick('2')
    }
  }
  handleIncome(e){
    e.preventDefault()
    if(this.props.onClick && this.props.type !== "1"){
      this.props.actions.getCategoryType('1')
      this.props.onClick('1')
    }
  }
  render(){
      let info = this.props.topInfo;
      let top_life, top_life_title
      if(this.props.dlink == 'account'){
        top_life= Number(info.sum).toFixed(2)
        top_life_title= info.sumTitle
      }else{
        top_life = info.m + '月'
        top_life_title = info.y
      }
      return(
        <div className="top fix">
            <div className="top_life" onSelect={this.handleClick}>
                <input readOnly className="top_life_input" type="text" id="selectTime"/>
                <p className="top_name">{top_life_title}</p>
                <p className="top_msg">{top_life}</p>
            </div>
            <div className="top_middle" onClick={this.handlePay}>
                <p className="top_name">{info.payName} </p>
                <p className="top_msg">{Number(info.pay).toFixed(2)}</p>
            </div>
            <div className="top_right" onClick={this.handleIncome}>
                <p className="top_name">{info.incomeName}</p>
                <p className="top_msg">{Number(info.income).toFixed(2)}</p>
            </div>
        </div>
      )
  }
};

class Menu extends React.Component{
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    //调用回调函数
    e.preventDefault();
    this.props.onSelect(this.props.link);
  }
  render(){
    return (
      <li key={this.props.key} className={this.props.active}>
        <a onClick={this.handleClick}>{this.props.children}</a>
      </li>
    )
  }
};

export class Menus extends React.Component{
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  //菜单加载回调方法
  handleClick(link){
    // this.setState({link: link})//更新菜单样式
    if(this.props.dlink !== link){
      // location.href = '/'+link;
      this.props.onSelect(link);//切换页面
    }
  }
  render(){
    if(this.props.items==undefined||this.props.data==""){
      return(<div></div>)
    }else{
      var menus = this.props.items.map(function(item, index){
        // 将Menus的handleClick方法作为回调函数，用以触发Menus的重绘
        return (
          <Menu key={index} link={item.link} active={this.props.dlink == item.link ? "hover": "default"} onSelect={this.handleClick}>{item.text}</Menu>
        )
      }.bind(this));
      return (
        <div className="menus">
          <div className="top_80"></div>
          <ul>{menus}</ul>
        </div>
      )
    }
  }
}
//验证码
export class Vcode extends React.Component{
  constructor(props) {
    super(props);
  }
  handleChange(e){
    this.props.onChange(e.target.value);
  }
  handleClick(e){
    e.target.src = this.props.verify+"?"+Math.random();
  }
  render(){
    return(
      <div className="weui_cell weui_vcode">
            <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" type="text" onChange={this.handleChange.bind(this)} placeholder="请输入验证码" />
            </div>
            <div className="weui_cell_ft">
                <img src={this.props.verify} onClick={this.handleClick.bind(this)} />
            </div>
      </div>
    )
  }
}
//验证码
export class MobileCaptcha extends React.Component{
  constructor(props) {
    super(props)
  }
  handleChange(e){
    this.props.onChange(e.target.value);
  }
  render(){
    if(this.props.data.status == 0){
      return(
        <div className="weui_cell">
              <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
              <div className="weui_cell_bd weui_cell_primary">
                  <input className="weui_input" type="text" onChange={this.handleChange.bind(this)} placeholder="请输入验证码" />
              </div>
              <div className="weui_cell_hd">
                  <span onClick={this.props.onClick} >发送验证码</span>
              </div>
        </div>
      )
    }else if(this.props.data.status == 1){
      return(
        <div className="weui_cell">
              <div className="weui_cell_hd"><label className="weui_label">验证码</label></div>
              <div className="weui_cell_bd weui_cell_primary">
                  <input className="weui_input" type="text" onChange={this.handleChange.bind(this)} placeholder="请输入验证码" />
              </div>
              <div className="weui_cell_hd">
                    <span className="weui_cell_hd_color">{'剩余时间'+this.props.data.time+'s'}</span>
              </div>
        </div>
      )
    }
  }
}

class Content extends React.Component{
  constructor(props) {
    super(props);
  }
  handleClick(e){
    e.preventDefault();
    this.props.onClick(this.props.value);
  }
  render(){
    let colorNum =  Math.floor(Math.random()*16777215).toString(16)
      for(let i=0; i<6-colorNum.length; i++){
        colorNum += '0'
      }
    const  iconColor = '#'+ colorNum
    if(this.props.img){
      return(
          <div className="weui_cell" onClick={this.handleClick.bind(this)}>
              <div className="weui_cell_hd" style={{position: 'relative', marginRight: '10px'}}>
                <Icon size={15} color={this.props.img.iconcolor||iconColor}  name={this.props.img.icon}/>
              </div>
              <div className="weui_cell_bd weui_cell_primary">
                  <p>{this.props.title}</p>
              </div>
              <div className="weui_cell_ft">{this.props.content}</div>
          </div>
      )
    }else {
      return (<div></div>)
    }
  }
}


class Contime extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="weui_cells_title">{this.props.updated}</div>
    )
  }
}
class TopStyle extends React.Component{
  render(){
    if(this.props.topStyle == "ture"){
      return (
        <div className="top_115"></div>
      )
    }else{
      return(
        <div></div>
      )
    }
  }
}

export class Canvas extends React.Component{
  constructor(props) {
    super(props);
    this.doughnutChart = this.doughnutChart.bind(this)
  }
  componentDidUpdate(){
    if(this.props.init == 1 && this.props.data){
      this.props.handleSelect(this.props.data.labels[0]) //执行详情数据列表初始化加载
      this.doughnutChart(this.props.data)
    }
  }
  //初始化图表
  doughnutChart(data){
    this.myChart = new Chart("myChart",{
      type: 'doughnut',
      data: data,
      options: {
        legend:  {
          position: 'bottom',
          onClick: (click, legendItem) =>{
            this.props.handleSelect(legendItem.text)
          }
        }
      }
    })
    this.props.setInit(0)
  }
  render(){
    if(this.props.data){
      return(
        <canvas  className='white' id="myChart" width="400" height="400"></canvas>
      )
    }else{
      return(
        <div></div>
      )
    }
  }
}

export class ConList extends React.Component{
  constructor(props) {
    super(props);
  }
  handleClick(value){
    if(window.postMessage){
      window.postMessage("http://"+location.host+this.props.urlPath+value+"^编辑详情")
    }else{
      location.href= this.props.urlPath+value
    }
  }
  render(){
    const {data} = this.props
    let updated = "";
    let sign = "";
    let linktype = this.props.linkType;//获取菜单连接
    let conNodes = this.props.data.map(function(con, index){
      //类别详情列表样式
      con.updated = Vizn.prototype.dateFormat(con.updated, 'yyyy-MM-dd');
      if(con.type == 1)
        sign = "+";
      else if(con.type == 2){
        sign = '-'
      }
      if(updated == ""|| updated != con.updated){
        updated = con.updated;
        return(
          <div key={index}>
            <Contime updated={con.updated}/>
            <Content onClick={this.handleClick.bind(this)} value={con._id} img={con.classId} title={con.classId.name+'-'+con.content} content={sign+con.money.toFixed(2)}/>
          </div>
        )
      }else {
        return(
            <Content key={index} onClick={this.handleClick.bind(this)} value={con._id} img={con.classId} title={con.classId.name+'-'+con.content} content={sign+con.money.toFixed(2)}/>
        )
      }
    }.bind(this));
    if(data.length > 0){
      return(
        <div>
              {conNodes}
              <Content title="" content=""/>
        </div>
      )
    }else{
      return(
        <div className="weui_cells_title">暂无数据</div>
      )
    }
  }
}
//图片列表组件
export class ImgList extends React.Component{
  constructor(props) {
    super(props)
  }
  setInfo(val){
    this.props.actions.setInfo(val)
  }
  clearInfo(){
    this.props.actions.clearInfo()
  }
  render(){
    var listInfo = this.props.data.map(function(val, index){
      return(
        <li onClick={this.setInfo.bind(this, val)} className="weui_uploader_file imglist" key={index}>
          <Icon size={30} name={val.icon}/>
          <br/>
          {val.name}
        </li>
      )
    }.bind(this))
    return(
          <div className="weui_cell">
                <div className="weui_cell_bd weui_cell_primary">
                    <div className="weui_uploader">
                        <div className="weui_uploader_hd weui_cell">
                            <div className="weui_cell_bd weui_cell_primary">{this.props.title}</div>
                        </div>
                        <div className="weui_uploader_bd">
                            <ul className="weui_uploader_files">
                            <li onClick={this.clearInfo.bind(this)} className="weui_uploader_input_wrp imgadd">
                            </li>
                            {listInfo}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

class Account extends React.Component{
  constructor(props) {
    super(props);
  }
  handleClick(e){
    e.preventDefault();
    this.props.onClick(this.props.value);
  }
  render(){
    if(this.props.img){
      return(
          <div className="weui_cell" onClick={this.handleClick.bind(this)}>
              <div className="weui_cell_hd" style={{position: 'relative', marginRight: '10px'}}><Icon size={30} name={this.props.img}/></div>
              <div className="weui_cell_bd" style={{width:'45%'}}>
                  <p>{this.props.title}</p>
                  <p style={{fontSize: '13px', color: 'rgb(136, 136, 136)'}}>{this.props.initMoney}</p>
              </div>
              <div className="weui_cell_ft" style={{textAlign:'left', color:'#333333'}}>{this.props.balance}</div>
          </div>
      )
    }else {
      return (<div></div>)
    }
  }
}
export class AccountList extends React.Component{
  constructor(props) {
    super(props);
  }
  handleClick(value){
    if(window.postMessage){
      window.postMessage("http://"+location.host+this.props.urlPath+"/"+value+"^编辑账户")
    }else{
      location.href= this.props.urlPath+"/"+value;
    }
  }
  addInfo(){
    if(window.postMessage){
      window.postMessage("http://"+location.host+this.props.urlPath+"^添加账户")
    }else{
      location.href= this.props.urlPath
    }
  }
  render(){
    let conNodes = this.props.data.map(function(con, index){
      return(
          <Account key={index} onClick={this.handleClick.bind(this)} value={con._id} img={con.icon} iconColor='white' title={con.name} initMoney={'初始预算：'+Number(con.money?con.money:0).toFixed(2)} balance={'余额：'+Number(con.balance?con.balance:0).toFixed(2)}/>
      )
    }.bind(this));
    if(this.props.data.length > 0){
      return(
        <div>
              {conNodes}
              <div className="weui_cell"  onClick={this.addInfo.bind(this)}>
                  <div className="weui_cell_hd" style={{position: 'relative', marginRight: '10px'}}>
                      <p className="weui_uploader_input_wrp imgadd"></p>
                  </div>
              </div>
              <Account title="" content=""/>
        </div>
      )
    }else{
      return(
        <div className="weui_cells_title">暂无数据</div>
      )
    }
  }
}
