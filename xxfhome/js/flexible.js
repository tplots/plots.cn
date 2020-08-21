(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=720){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//(function () {
//    var winW = document.documentElement.clientWidth, desW = 640, htmlFont = winW / desW * 100;
//    if (winW >= 640) {//当屏幕的宽度大于设计稿的宽度是，整个区域最宽640
//        $('.musicBox').css({//可在css中写
//            width: desW,
//            margin: "0 auto"
//        });
//        window.htmlFont = 100;
//        return;
//    }
//    window.htmlFont = htmlFont;//将变量转为全局变量传递出函数作用域
//    document.documentElement.style.fontSize = htmlFont + "px";//设置html根元素的字体大小
//})();