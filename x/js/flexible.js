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
//    if (winW >= 640) {//����Ļ�Ŀ�ȴ�����Ƹ�Ŀ���ǣ������������640
//        $('.musicBox').css({//����css��д
//            width: desW,
//            margin: "0 auto"
//        });
//        window.htmlFont = 100;
//        return;
//    }
//    window.htmlFont = htmlFont;//������תΪȫ�ֱ������ݳ�����������
//    document.documentElement.style.fontSize = htmlFont + "px";//����html��Ԫ�ص������С
//})();