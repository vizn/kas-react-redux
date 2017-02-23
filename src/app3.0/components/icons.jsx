import React from 'react'
import * as FaIconPack from 'react-icons/lib/fa'
import * as GoIconPack from 'react-icons/lib/go'
import * as MdIconPack from 'react-icons/lib/md'

export default class Icons extends React.Component {
    render() {
      switch (this.props.name) {
        /*支出icon*/
        case 'de-pay'://其他支出
        return (
            <FaIconPack.FaAdjust size={this.props.size} color={this.props.color}/>
        )
        break;
        case 'cutlery'://餐饮
        return (
            <FaIconPack.FaCutlery size={this.props.size} color={this.props.color}/>
        )
        break;
        case '餐饮'://餐饮
        return (
            <FaIconPack.FaCutlery size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'bus': //交通
        return (
            <FaIconPack.FaBus size={this.props.size} color={this.props.color}/>
        )
        break;
        case '交通'://餐饮
        return (
            <FaIconPack.FaBus size={this.props.size} color={this.props.color}/>
        )
        break;
        case 'child': //孩子
        return (
            <FaIconPack.FaChild size={this.props.size} color={this.props.color}/>
        )
        break;
        case 'github-alt': //宠物
        return (
            <FaIconPack.FaGithubAlt size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'group': //社交
        return (
            <FaIconPack.FaGroup size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'paperclip': //办公
        return (
            <FaIconPack.FaPaperclip size={this.props.size} color={this.props.color}/>
        )
        break;
        case '办公': //办公
        return (
            <FaIconPack.FaPaperclip size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'pencil': //学习
        return (
            <FaIconPack.FaPencil size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'phone': //通讯
        return (
            <FaIconPack.FaPhone size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'plane': //旅游
        return (
            <FaIconPack.FaPlane size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'medkit': //医疗
        return (
            <FaIconPack.FaMedkit size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'wrench': //维修
        return (
            <FaIconPack.FaWrench size={this.props.size} color={this.props.color}/>
        )
          break;
        case 'futbol-o': //运动
          return (
              <FaIconPack.FaFutbolO size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'microphone': //娱乐
          return (
              <FaIconPack.FaMicrophone size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'neuter': //美容
          return (
              <FaIconPack.FaNeuter size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'yelp': //零食
          return (
              <FaIconPack.FaYelp size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'book': //书籍
          return (
              <FaIconPack.FaBook size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'plug': //居家
          return (
              <FaIconPack.FaPlug size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'jersey': //服饰
          return (
              <GoIconPack.GoJersey size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'camera': //数码
          return (
              <GoIconPack.GoDeviceCamera size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'auto': //汽车
          return (
              <FaIconPack.FaAutomobile size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'home': //住房
          return (
              <FaIconPack.FaHome size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'elder': //长辈
          return (
              <FaIconPack.FaUserSecret size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'gift': //礼物
          return (
              <FaIconPack.FaGift size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'cash-gift': //礼金
          return (
              <FaIconPack.FaMoney size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'repay': //还钱
          return (
              <FaIconPack.FaCreditCardAlt size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'donate': //捐赠
          return (
              <FaIconPack.FaHeartO size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'manage-money': //理财
          return (
              <FaIconPack.FaLineChart size={this.props.size} color={this.props.color}/>
          )
        break;

        /* 收入icon*/
        case 'avtimer': //兼职
          return (
              <MdIconPack.MdAvTimer size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'salary': //工资
          return (
              <MdIconPack.MdMore size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'earnings': //理财收益
          return (
              <FaIconPack.FaIndustry size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'indent': //礼金
          return (
              <FaIconPack.FaIndent size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'income': //其他收入
          return (
              <FaIconPack.FaDollar size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'de-income': //默认
          return (
              <FaIconPack.FaDollar size={this.props.size} color={this.props.color}/>
          )
        break;
        /*账户icon*/
        case 'credit-card': //信用卡账户
          return (
              <FaIconPack.FaCcVisa size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'debit-card': //借记卡
          return (
              <FaIconPack.FaCreditCard size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'account': //现金账户
          return (
              <FaIconPack.FaListAlt size={this.props.size} color={this.props.color}/>
          )
        break;
        case 'other-account': //其他账户
          return (
              <FaIconPack.FaListAlt size={this.props.size} color={this.props.color}/>
          )
        break;
        default:
        return (
            <FaIconPack.FaAdjust size={this.props.size} color={this.props.color}/>
        )
      }
    }
}
