import '../css/sntouch.css';
import './mobiscroll/mobiscroll.custom-2.6.2.min.css';
import Mobiscroll from './mobiscroll/mobiscroll.custom-2.6.2.min';

export default class Vizn {
  isBrowser(){
	   var Sys={};
	    var ua=navigator.userAgent.toLowerCase();
	    var s;
	      (s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
	      (s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
	      (s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
	      (s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
	      (s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
	    if(Sys.ie){//Js判断为IE浏览器
		      alert(Sys.ie);
		  if(Sys.ie=='9.0'){//Js判断为IE 9
		  }else if(Sys.ie=='8.0'){//Js判断为IE 8
		  }else{
		  }
	}
	if(Sys.firefox){//Js判断为火狐(firefox)浏览器
		alert(Sys.firefox);
	}
	if(Sys.chrome){//Js判断为谷歌chrome浏览器
		alert(Sys.chrome);
	}
	if(Sys.opera){//Js判断为opera浏览器
		alert(Sys.opera);
	}
	if(Sys.safari){//Js判断为苹果safari浏览器
		alert(Sys.safari);
	 }
  }
  //API接口完整地址
  apiPath(action){
    var path="http://192.168.31.182:3000/";//路径

    return path + action;
  }

  //获取url参数值
  getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return decodeURI(r[2]); return null; //返回参数值
  }

  setContent(str) {
      str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
      str.value = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      return str;
  }
  //将PHP时间戳转化成时间格式
  getYmdTime(time,type='y-m-d'){
		if(parseInt(time) > 0){
			var dateStr = new Date(parseInt(time) * 1000);
      if(type == 'y-m-d')
			return dateStr.getFullYear()+'-'+(dateStr.getMonth()+1)+'-'+dateStr.getDate();
      if(type == 'y-m-d h:m:s')
      return dateStr.getFullYear() + '-' + (dateStr.getMonth()+1) +'-' + dateStr.getDate() + ' ' + dateStr.getHours() + ':' + dateStr.getMinutes() + ':' + dateStr.getSeconds();
    }else{
			return '末知时间';
		}
	}
  //将时间格式转换成unix时间戳
  getUnixTime(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
  }
  //时间格式化
  dateFormat(date, format) {
    if(format === undefined){
        format = date;
        date = new Date();
    }else{
      date = new Date(date)
    }
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
  }
  //时间选择器扩展
  selectTime(selectTime, callback, format){
      if(!format){
        format = 'yyyy-mm-dd'
      }
      const dateOrder = format.replace(/-/g, '')
      let opt = {
            theme: "android-ics light",
            display: 'modal', //显示方式
            lang: "zh",
            setText: '确定', //确认按钮名称
            cancelText: "取消",
            dateFormat: format, //返回结果格式化为年月格式
            dateOrder: dateOrder, //面板中日期排列格式
            onBeforeShow: function (inst) {
    			       //console.info( inst.settings.wheels);
            },
            headerText: function (valueText) { //自定义弹出框头部格式
              let array = valueText.split('-');
              switch (array.length) {
                case 1:
                  return array[0] + "年";
                  break;
                case 2:
                  return array[0] + "年" + array[1] + "月";
                  break;
                case 3:
                    return array[0] + "年" + array[1] + "月" + array[2] + "日";
                    break;
                default:
                  return valueText;
              }
            },
            onSelect: function(value){
              callback(value);
              // selectTime.val("");
            },
        };
        selectTime.mobiscroll().date(opt);
  }
}
class Sntouch{
  rBlur () {
      if (this.checkDetect().system == "android") {
          var b = document.createElement("style");
          b.type = "text/css";
          b.id = "rBlur";
          b.innerHTML = "*{-webkit-tap-highlight-color:rgba(0,0,0,0)}";
          document.body.appendChild(b)
      }
  }
  checkDetect () {
      var h = {
          webkit: /(AppleWebKit)[ \/]([\w.]+)/,
          ipad: /(ipad).+\sos\s([\d+\_]+)/i,
          windows: /(windows\d*)\snt\s([\d+\.]+)/i,
          iphone: /(iphone)\sos\s([\d+\_]+)/i,
          ipod: /(ipod).+\sos\s([\d+\_]+)/i,
          android: /(android)\s([\d+\.]+)/i
      };
      var e = window.navigator.userAgent,
          c = h.webkit.exec(e),
          f = /\((iPhone|iPad|iPod)/i.test(e),
          d = [],
          g = {},
          b = [];
      for (var i in h) {
          b = h[i].exec(e);
          if (b) {
              d = h[i].exec(e)
          }
      }
      g = {
          system: d[1].toLowerCase(),
          version: d[2].replace(/(\_|\.)/ig, ".").toLowerCase(),
          browser: c ? c[1].toLowerCase() : "apple/webkit",
          ios: f
      };
      return g
  }
  HTMLTemplate (b, f) {
      var f = f || {};
      var d = [b].join("");
      if (f) {
          for (var c in f) {
              var e = new RegExp("\\$\\{" + c + "\\}", "g");
              d = d.replace(e, f[c])
          }
          return d
      }
      return d
  }
  htmlRemove () {
      if ($("#Touch_Popbox").length > 0)
          $("#Touch_Popbox").remove();
  }
}
class Popbox extends Sntouch{
  constructor(b){
    super();
    this.settings = b || {};
    this.html = this.settings.html || "";
    this.contentId = this.settings.contentId || "";
    this.effect = this.settings.effect || "pop";
    this.title = this.settings.title || "提示框";
    this.type = this.settings.type || "fullscreen";
    this.callback = this.settings.callback ||
        function () {
        };
    this.submitCallback = this.settings.submitCallback ||
        function () {
        };
    this.cancel = this.settings.cancel ||
        function () {
        };
    this.cls = this.settings.cls || "";
    this.system = this.settings.system || false;
    this.systemSettings = this.settings.systemSettings || {};
    this.loadTime = this.settings.loadTime || 800;
    this.initializer();
  }
  initializer () {
      var b = this;
      b.winH = document.documentElement.offsetHeight;
      var c = b.type == "fullscreen" ? '<div id="Touch_Popbox" class="touch-popbox touch-popbox-mask000"><div id="Pop_Cotent"></div></div>' : '<div id="Touch_Popbox" class="touch-inner-popbox hide"><div id="Pop_Cotent">${title}</div></div>';
      if (b.type == "confirm") {
          c = '<div id="Touch_Popbox" class="touch-popbox"><div id="popinner"><div class="msg">${title}</div><div class="btn btn-sn-d"><a href="javascript:void()">取消</a></div><div class="btn btn-sn-b"><a id="popsubmit" href="javascript:void()">确定</a></div></div></div>'
      }
      if (b.type == "isok")
          c = '<div id="Touch_Popbox" class="touch-popbox"><div id="popinner"><div class="msg">${title}</div><div class="btn-sn-d"><a id="popsubmit" href="javascript:void()">确定</a></div></div></div>'
      b.html = this.HTMLTemplate(c, {
          title: b.title
      });
      this.systemComfirm();
      if (this.system) {
          return
      }
      if ($("#Touch_Popbox").length < 1) {
          $("body").append(b.html);
          this.rBlur()
      }
      if (b.type != "fullscreen" && b.type != "confirm" && b.type != "isok") {
          b.mini()
      } else {
          b.start();
          $("#Touch_Popbox").find(".btn-sn-d").unbind("click");
          $("#Touch_Popbox").find(".btn-sn-d").click(function () {
              b.end()
          });
          if (b.callback) {
              b.callback()
          }
          b.submit()
      }
  }
  start () {
      var b = this;
      var c = $("#Touch_Popbox");
      c.css("-webkit-transform-origin", "50% " + ($(window).height() / 2) + "px");
      if (this.checkDetect().ios || this.checkDetect().browser == "applewebkit") {
          c.show()
      } else {
          c.show()
      }
      $("#Pop_Cotent").html($(b.contentId).show());
      if ($(b.contentId).length > 0) {
          $(b.contentId).css({
              position: "fixed",
              width: "100%",
              left: document.body.offsetWidth / 2 - $(b.contentId)[0].offsetWidth / 2,
              top: document.body.scrollTop + $(window).height() / 2 - $(b.contentId).height() / 2
          })
      }
      document.querySelector("#Touch_Popbox").style.minHeight = b.winH + "px";
      if ($("#popinner").length > 0) {
          $("#popinner").css({
              left: document.body.offsetWidth / 2 - $("#popinner")[0].offsetWidth / 2,
              top: document.body.scrollTop + $(window).height() / 2 - $("#popinner").height() / 2
          })
      }
  }
  end () {
      var b = this;
      if (this.checkDetect().ios || this.checkDetect().browser == "applewebkit") {
          $("#Touch_Popbox").hide()
      } else {
          $("#Touch_Popbox").hide()
      }
      b.cancel();
      $("#for-android").remove()
  }
  submit () {
      var b = this;
      $("#popsubmit").unbind("click");
      $("#popsubmit").click(function () {
          $("#Touch_Popbox").hide();
          if (b.submitCallback) {
              b.submitCallback()
          }
      })
  }
  mini () {
      var b = this;
      var c = $("#Touch_Popbox");
      if (b.cls) {
          c.addClass(b.cls)
      }
      c.css({
          left: document.body.offsetWidth / 2 - c.width() / 2,
          top: document.body.scrollTop + $(window).height() / 2 - c.height() / 2
      });
      c.fadeIn(500).delay(1000).fadeOut(b.loadTime,
          function () {
              c.remove()
          })
  }
  systemComfirm () {
      var c = this.systemSettings;
      if (!this.system) {
          return
      }
      var b = {
          str: "",
          ok: function () {
          },
          cancel: function () {
          }
      };
      $.extend(b, c);
      if (confirm(b.str)) {
          b.ok()
      } else {
          b.cancel()
      }
  }
}
export class Dialog extends Sntouch{
  constructor(){
    super();
  }
  //提示框输出
  snalert (tit) {
      this.htmlRemove();
      new Popbox({title: tit, type: "inner"});
  }
  //对话框输出
  snconfirm(tit, fun) {
      this.htmlRemove();
      new Popbox({title: tit, type: "confirm", submitCallback: fun});
  }
  //对话框输出
  snisok(tit, fun) {
      this.htmlRemove();
      new Popbox({title: tit, type: "isok", submitCallback: fun});
  }
}
//加载动画
export class Toast extends Sntouch{
  constructor(){
    super();
  }
  loadMsgWin(T, url, title=''){
    if ($("#msgwin").length < 1) {
        $('body').append('<div id="msgwin"  style="z-index:10001; width: 615px; height: 480px;" class="lpn_iframe_bg">'+
        '<div class="hd">'+title+'<a class="lpn_close" style="margin-left: 3px;">关闭</a></div>'+
        '<div class="lpn_canvas" style="height: 437px;"><iframe scrolling="no" src="'+url+'" frameborder="0" style="border: 0; padding: 0; margin: 0; width: 100%; height: 100%;"></iframe></div></div>');
        $("#msgwin").css({
            left: document.body.offsetWidth / 2 - $("#msgwin")[0].offsetWidth / 2,
            top: $(window).height() / 2 - $("#msgwin").height() / 2
        });
        $(".lpn_close").click(function(){
          Toast.prototype.loadMsgWin('', '')
        })
    }
    var c = $("#msgwin");
    if (T) {
        this.htmlRemove();
        new Popbox({type: "fullscreen"});
        c.show();
    } else {
        this.htmlRemove();
        c.hide();
    }
  }
  //数据加载进度指示
  loadPage(T, txt) {
      if ($("#progress").length < 1) {
          $('body').append('<div id="progress" style="z-index:10001;">' + txt + '</div>');

          $("#progress").css({
              left: document.body.offsetWidth / 2 - $("#progress")[0].offsetWidth / 2,
              top: $(window).height() / 2 - $("#progress").height() / 2
          });
      }
      var c = $("#progress");
      if (T) {
          this.htmlRemove();
          new Popbox({type: "fullscreen"});
      } else {
          this.htmlRemove();
          c.remove();
      }

  }
  //地址加载动画
  loadUrl(url, txt) {
      $('body').append('<div id="progress" style="z-index:10001;">'+ txt +'</div>');
      this.rBlur();
      $("#progress").css({
          left: document.body.offsetWidth / 2 - $("#progress")[0].offsetWidth / 2,
          top: $(window).height() / 2 - $("#progress").height() / 2
      });
      this.htmlRemove();
      new Popbox({type: "fullscreen"});
      if (document.layers)
          document.write('<Layer src="' + url + ' " VISIBILITY="hide" > </Layer>');
      else if (document.all)
          document.write('<iframe src="' + url + '" style="visibility: hidden;"></iframe>');
      else window.location.href = url;
  }
}
