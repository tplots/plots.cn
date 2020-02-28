$(function() {
    $("#register").click(function() {
        //此处用于演示
        layer.open({
            type: 2,
            shadeClose: true,
            title: "注册",
            area: ["650px", "410px"],
            content: "./register.html"
        });
    });
    $("#login").click(function() {
        //此处用于演示
        layer.open({
            type: 2,
            shadeClose: true,
            title: "登录",
            area: ["400px", "300px"],
            content: "./login.html"
        });
    });
});
