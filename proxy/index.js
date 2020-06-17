var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    res.write('<head><meta charset="utf-8" /></head>');
    let fileUri = [];
    const files = fs.readdirSync("./images");
    files.forEach(function (item, index) {
        fileUri.push("www.plots.cn/proxy/" + item);
    });
    res.write(JSON.stringify(fileUri));

    res.end();
}).listen(3000);
