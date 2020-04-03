// JavaScript source code


// 获取地址参数
function getData(value){
    var href = window.location.href;
    var h = href.indexOf("?");
    var Sux = href.substr(h + 1);
    var SuxArr = Sux.split("&");
    var Result = "";

    for(var i = 0; i < SuxArr.length; i++){
        var art = SuxArr[i];
        var arr = art.split("=");
        if(arr[0] == value){
            if(arr[1].indexOf("#")!=-1){
                Result=arr[1].substr(0,arr[1].indexOf("#"));
            }else{
                Result =arr[1];
            }
        }
    }
    return Result;
}

// 获取计算后的样式
function getStyle(obj,attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return element.currentStyle[attr];
    }
}

// 获取class
function getByClass(cls) {
    var obj = document.getElementsByTagName("*");
    var arr = [];

    for (var i = 0; i < obj.length; i++) {
        var Cls = obj[i].className.split(" ");
        for (var j = 0; j < Cls.length; j++) {
            if (Cls[0].className == cls) {
                arr.push(Cls[0]);
            }
        }
    }
    return arr;
}

// ajax
function ajax(url, fnSucc, fnFaild) {
    var oAjax = null;
    if (window.XMLHttpRequest) {
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //连接服务器
    oAjax.open("GET", url, true);
    //发送请求
    oAjax.send();
    //接收服务器返回的数据
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {   //连接完成
            if (oAjax.status == 200) {   //请求成功
                fnSucc(oAjax.responseText);
            } else {
                if (fnFaild) {
                    fnFaild(oAjax.status)
                }
            }
        }
    }
}

// 事件绑定
function addEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
    } else {
        obj.addEventListener(ev, fn, false);
    }
}

// 设置cookie
function setCookie(name, value, time) {

    var oDate = new Date();

    oDate.setDate(oDate.getDate() + time);
    document.cookie = name + "=" + value + "; expires=" + oDate;
}

// 获取cookie
function getCookie(name) {
    var oCookie = document.cookie;
    var oCache = oCookie.split("; ");

    for (var i = 0; i < oCache.length; i++) {
        var oCha = oCache[i].split("=");

        if (oCha[0] == name) {
            return oCha[1];
        }
    }
}

// 删除cookie
function removeCookie(name, value) {
    setCookie(name, value, -1);
}

// 不限制范围拖拽
function Drag(obj) {
    obj.onmousedown = function (ev) {

        var oEvent = ev || event;

        var X = oEvent.clientX - obj.offsetLeft;
        var Y = oEvent.clientY - obj.offsetTop;

        document.onmousemove = function (ev) {

            var oEvent = ev || event;

            obj.style.left = oEvent.clientX - X + "px";
            obj.style.top = oEvent.clientY - Y + "px";

            return false;

            oEvent.preventDefault();

            return false;
        }

        document.onmouseup = function (ev) {
            var oEvent = ev || event;

            document.onmousemove = null;
            document.onmouseup = null;

            oEvent.preventDefault();
            return false;
        }

        oEvent.preventDefault();
        return false;
    }
}

// 限制范围拖拽
function limitDrag(obj) {
    obj.onmousedown = function (ev) {

        var oEvent = ev || event;

        var X = oEvent.clientX - obj.offsetLeft;
        var Y = oEvent.clientY - obj.offsetTop;

        document.onmousemove = function (ev) {

            var oEvent = ev || event;

            var l = oEvent.clientX - X;
            var t = oEvent.clientY - Y;

            if (l <= 0) {
                l = 0;
            } else if (l > document.documentElement.clientWidth - obj.offsetWidth) {
                l = document.documentElement.clientWidth - obj.offsetWidth;
            }

            if (t <= 0) {
                t = 0;
            } else if (t > document.documentElement.clientHeight - obj.offsetHeight) {
                t = document.documentElement.clientHeight - obj.offsetHeight;
            }



            obj.style.left = l + "px";
            obj.style.top = t + "px";

            oEvent.preventDefault();
            return false;
        }

        document.onmouseup = function (ev) {
            var oEvent = ev || event;

            document.onmousemove = null;
            document.onmouseup = null;

            oEvent.preventDefault();
            return false;
        }

        oEvent.preventDefault();
        return false;
    }
}

// 运动框架
function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;		//这一次运动就结束了——所有的值都到达了
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;

            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                iCur = parseInt(getStyle(obj, attr));
            }

            //2.算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            //3.检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            }
            else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if (bStop) {
            clearInterval(obj.timer);

            if (fn) {
                fn();
            }
        }
    }, 30)
}

// 获取上传图片的浏览地址
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


//======================================================================================//

// 时间
function getTime() {

    var oDate = new Date();

    this.N = oDate.getFullYear();       // 年
    this.Y = oDate.getMonth() + 1;     // 月
    this.R = oDate.getDate();         // 日
    this.S = oDate.getHours();       // 时
    this.F = oDate.getMinutes();    // 分
    this.M = oDate.getSeconds();   // 秒

    this.Zero = function (z) {
        if (z < 10) {
            return "0" + z;
        } else {
            return z;
        }
    }

}

// 获取年月日
getTime.prototype.getNyr = function () {

    var time = this.N + "-" + this.Zero(this.Y) + "-" + this.Zero(this.R);
    return time

}

// 获取时分秒
getTime.prototype.getSfm = function () {

    var time = this.Zero(this.S) + ":" + this.Zero(this.F) + ":" + this.Zero(this.M);
    return time
}

// 获取年月日时分秒
getTime.prototype.getNyrsfm = function () {

    var time = this.N + "-" + this.Zero(this.Y) + "-" + this.Zero(this.R) + " " + this.Zero(this.S) + ":" + this.Zero(this.F) + ":" + this.Zero(this.M);
    return time
}

//======================================================================================//



//======================================================================================//

// 身份证
function Carded(id) {
    this.number = id;
    this.pass = true;   //  判断身份证的正确性

    this.CityArray = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }

    this.Zero = function (z) {
        if (z < 10) {
            return "0" + z;
        } else {
            return z;
        }
    }
}

// 判断身份证是否正确
Carded.prototype.Correct = function () {

    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i

    if (!reg.test(this.number)) {
        this.pass = false;
    }

    if (this.number.length == 18) {

        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];

        var sum = 0;

        for (var i = 0; i < 17; i++) {
            ai = this.number[i];
            wi = factor[i];
            sum += ai * wi;
        }
        console.log(parity[sum % 11]);
        if (this.number.substr(17) != parity[sum % 11]) {
            this.pass = false;
        }
    }

    return this.pass;
}

// 识别年龄
Carded.prototype.getAge = function () {

    var oDate = new Date();

    var Year = this.number.substring(6, 10)
    var Data = this.number.substring(9,13)

    var Y = (oDate.getFullYear() - Year) - 1;
    var D = this.Zero(oDate.getMonth() + 1) + "" + this.Zero(oDate.getDate());

    if (D >= Data) {
        Y++;
    }

    return Y;
}

// 识别性别
Carded.prototype.getGender = function () {

    if (this.pass) {
        var Gender = "";
        if (this.number.substring(16, 17) % 2 == 0) {
            Gender = "女";
        } else {
            Gender = "男";
        }
        return Gender
    }
}

// 识别地区
Carded.prototype.getRegion = function () {
    if (this.pass) {
        return this.CityArray[this.number.substring(0, 2)]
    }
}

//======================================================================================//




// 自定义提示框;
function alert(value) {

    var oStyle = document.createElement("style");
    oStyle.type = "text/css";
    oStyle.innerHTML = "p,h4{margin:0;}.PromptBg{display:none;position:fixed;height:100%;width:100%;font-size:14px;background:rgba(0,0,0,.5);top:0;left:0;z-index:9;}.PromptBg>div{width:200px;background:#fff;position:absolute;border-radius:3px;}.PromptBg>div h4{line-height:35px;padding:0 15px;background:#65cd32;color:#fff;}.PromptBg>div p{padding:10px 15px;}.PromptBg>div div{background:#65cd32;width:60px;color:#fff;padding:5px 0;border-radius:3px;text-align:center;margin:0 auto;margin-bottom:10px;font-size:12px;}.PromptBg>div div:hover{cursor: pointer;}";

    // 创建最外层的div
    var oDiv = document.createElement("div");
    oDiv.className = "PromptBg";
    oDiv.style.display = "block";

    // 创建提示窗
    var Prompt = document.createElement("div");
    // 标题
    var oH4 = document.createElement("h4");
    oH4.innerHTML = "网页提示";
    // 内容
    var oP = document.createElement("p");
    oP.innerHTML = value;
    //按钮
    var oDiv1 = document.createElement("div");
    oDiv1.innerHTML = "确定";

    // 在提示窗里插入节点
    Prompt.appendChild(oH4);
    Prompt.appendChild(oP);
    Prompt.appendChild(oDiv1);

    oDiv.appendChild(oStyle);
    oDiv.appendChild(Prompt);

    // 把整个提示框插入到网页中
    document.body.appendChild(oDiv);

    Prompt.style.left = (window.innerWidth - Prompt.offsetWidth) / 2 + "px";
    Prompt.style.top = (window.innerHeight - Prompt.offsetHeight) / 2 + "px";

    oDiv1.onclick = function () {
        oDiv.parentNode.removeChild(oDiv);
    }
    document.onkeydown = function (ev) {
        var oEvent = ev || event;
        if (oEvent.keyCode == 13) {
            oDiv.parentNode.removeChild(oDiv);
            return false
        }
    }
};


//======================================================================================//

//简单日期插件   设置要选择的input框的class为==》oDateTime
function setTime(Yar, Mon, Data) {

    var _this = this;

    this.Y = Yar;
    this.M = Mon;

    this.oY = Yar;
    this.oM = Mon;
    this.R = Data;

    this.arrobj = "";

    this.aWeek = ["日", "一", "二", "三", "四", "五", "六"];
    this.clickTime = "";

    this.timeBg = document.createElement("div");
    this.timeBg.className = "timeBg";

    this.time = document.createElement("div");
    this.time.className = "time";

    this.timeTitle = document.createElement("div");
    this.timeTitle.className = "timeTitle";

    this.timeLeft = document.createElement("a");     //  左箭头
    this.timeLeft.className = "leftArrow timeLeft";

    this.timeNY = document.createElement("p");       //  年月

    this.timeRight = document.createElement("a");    // 右箭头
    this.timeRight.className = "rightArrow timeRight";

    this.timeTitle.appendChild(this.timeLeft);
    this.timeTitle.appendChild(this.timeRight);
    this.time.appendChild(this.timeTitle);

    this.timeCont = document.createElement("div");
    this.timeCont.className = "timeCont";

    this.week = document.createElement("ul");
    this.week.className = "week";

    for (var i = 0; i < this.aWeek.length; i++) {
        this.weekLi = document.createElement("li");
        this.weekLi.innerHTML = this.aWeek[i]
        this.week.appendChild(this.weekLi);
    }

    this.timeCont.appendChild(this.week);

    this.time.appendChild(this.timeCont);
    this.timeBg.appendChild(this.time);
    document.body.appendChild(this.timeBg);

    this.TimeT();
    this.TimeContent();

    this.time.style.left = (window.innerWidth - this.time.offsetWidth) / 2 + "px";
    this.time.style.top = (window.innerHeight - this.time.offsetHeight) / 2 + "px";
    this.timeBg.style.display = "none";

    var obj = document.getElementsByClassName("oDateTime");

    var arr = [];
    for (var i = 0; i < obj.length; i++) {
        obj[i].onclick = function () {
            _this.timeBg.style.display = "block";
            console.log(isNaN(this.value.substring(0, 4)));
            if (this.value.substring(0, 4) != "" && isNaN(this.value.substring(0, 4)) == false) {
                var val = this.value.split("/");
                _this.Y = val[0];
                _this.oY = val[0];
                _this.M = val[1];
                _this.oM = val[1];
                _this.R = val[2];
            } else {
                _this.Y = _this.oY
                _this.M = _this.oM;
            }
            _this.TimeT();
            _this.TimeContent();
            _this.arrobj = this;
        }
    }

    this.timeLeft.onclick = function () {
        _this.timeRed()
    }

    this.timeRight.onclick = function () {
        _this.timeAdd()
    }

    this.Add = function (m) {
        if (m.length < 2) {
            return "0" + m;
        } else {
            return m;
        }
    }
}
setTime.prototype = {
    // 增加月份
    timeAdd: function () {
        if (this.M == 12) {
            this.Y++;
            this.M = 0;
        }
        this.M++;
        //console.log(_this.M);
        this.TimeT();
        this.TimeContent();
    },
    // 减少月份
    timeRed: function () {
        this.M--;
        if (this.M == 0) {
            this.Y--;
            this.M = 12;
        }
        //console.log(_this.M);
        this.TimeT();
        this.TimeContent();
    },
    // 日期插件头部
    TimeT: function () {
        this.timeNY.innerHTML = this.Y + "年" + " " + this.M + "月";
        this.timeTitle.appendChild(this.timeNY);
    },
    // 日期插件内容部分
    TimeContent: function () {
        var _this = this;

        this.data = document.createElement("ul");
        this.data.className = "data";
        this.timeCont.appendChild(this.data);

        var arrHtml = "";
        var oDa = new Date(this.Y, this.M, 1);
        var dateLe = (new Date(oDa.getTime() - 1000 * 60 * 60 * 24)).getDate();

        var D = new Date(this.Y, this.M - 1, 1);
        var Day = D.getDay();
        console.log(Day);

        for (var k = 0; k < Day; k++) {
            this.occupyLi = document.createElement("li");
            this.occupyDiv = document.createElement("div");
            this.occupyLi.appendChild(this.occupyDiv);
            this.data.appendChild(this.occupyLi);
        }

        for (var i = 0; i < dateLe; i++) {
            this.dataLi = document.createElement("li");
            this.dataDiv = document.createElement("div");
            this.dataDiv.innerHTML = i + 1;
            this.dataLi.appendChild(this.dataDiv);

            // 选中当前日期
            if (this.Y == this.oY && this.M == this.oM && i + 1 == this.R) {
                this.dataDiv.className = "on";
            }

            this.dataDiv.onclick = function () {
                _this.clickTime = _this.Y + "/" + _this.M + "/" + this.innerHTML;
                _this.arrobj.value = _this.clickTime;
                _this.timeBg.style.display = "none";
                console.log(_this.clickTime);
            }

            this.data.appendChild(this.dataLi);
        }
        var oUl = this.timeCont.getElementsByClassName("data");
        for (var i = 0; i < oUl.length - 1; i++) {
            oUl[i].parentNode.removeChild(oUl[i]);
        }
    },
    //  返回日期
    timeReturn: function () {
        return this.clickTime;
    },
    // 删除日期
    remove: function () {
        this.timeBg.parentNode.removeChild(this.timeBg);
    }
}



//  在本页面打开一个窗口
function windowOpen(url, titleNmae, width, height) {
    var win = document.createElement("div");
    win.className = "win";

    var winDiv = document.createElement("div");
    winDiv.className = "winDiv";
    winDiv.style.width = width + "px";
    winDiv.style.left = (window.innerWidth - width) / 2 + "px";
    winDiv.style.top = (window.innerHeight - height) / 2 + "px";

    var winHead = document.createElement("div");
    winHead.className = "winHead";
    var winTitle = document.createElement("div");
    winTitle.className = "winTitle";
    winTitle.innerHTML = titleNmae;
    var winEitx = document.createElement("div");
    winEitx.className = "winEitx";
    winEitx.innerHTML = "关闭";

    winHead.appendChild(winTitle)
    winHead.appendChild(winEitx)
    winDiv.appendChild(winHead);

    var winConent = document.createElement("div");
    winConent.className = "winConent";
    winConent.id = "Conent";
    winDiv.appendChild(winConent);

    var frame = document.createElement("iframe");
    frame.src = url;
    frame.width = width;
    frame.height = height;
    winConent.appendChild(frame);

    // 创建scc样式表
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = 'div{overflow:hidden;}.win{position:fixed;height:100%;width:100%;top:0;left:0;}.winDiv{position: absolute;box-shadow: 0px 0px 5px #b1b1b1;}.winHead {padding: 7px 10px;background: #f00;border-top-left-radius: 5px;border-top-right-radius: 5px;color: #fff;font-size: 12px;}.winHead:hover{cursor:all-scroll;}.winTitle{float:left;font-size:14px;}.winEitx{float:right;}.winEitx:hover{cursor:pointer;}.winConent{border:1px solid #f00;background:#fff;}.winConent > iframe{border:none;}.cover{border:1px dashed #999;position:absolute;}';
    win.appendChild(style);

    win.appendChild(winDiv);
    document.body.appendChild(win);

    // 关闭窗口
    winEitx.onmousedown = function (ev) {
        var oEvent = ev || event;
        oEvent.stopPropagation();
    }
    winEitx.onclick = function () {
        win.parentNode.removeChild(win);
    }

    //窗口拖拽
    winDiv.onmousedown = function (ev) {
        var oEvent = ev || event;

        var cover = document.createElement("div");
        cover.className = "cover";

        var l = this.offsetLeft;
        var t = this.offsetTop
        var x = oEvent.clientX - l;
        var y = oEvent.clientY - t;
        var _this = this;

        var oX = l;
        var oY = t;

        cover.style.width = this.offsetWidth + "px";
        cover.style.height = this.offsetHeight + "px";
        cover.style.left = l + "px";
        cover.style.top = t + "px";;
        win.appendChild(cover);

        document.onmousemove = function (ev) {
            var oEvent = ev || event;

            oX = oEvent.clientX - x;
            oY = oEvent.clientY - y;

            if (oX < 50) {
                oX = 0;
            } else if (oX > window.innerWidth - _this.offsetWidth - 50) {
                oX = window.innerWidth - _this.offsetWidth;
            }

            if (oY < 50) {
                oY = 0;
            } else if (oY > window.innerHeight - _this.offsetHeight - 50) {
                oY = window.innerHeight - _this.offsetHeight;
            }

            cover.style.left = oX + "px";
            cover.style.top = oY + "px";

            return false;
        }

        document.onmouseup = function () {

            _this.style.left = oX + "px";
            _this.style.top = oY + "px";

            cover.parentNode.removeChild(cover);

            document.onmousemove = null;
            document.onmouseup = null;

            return false;
        }
        event.stopPropagation();
        return false;
    }
}
