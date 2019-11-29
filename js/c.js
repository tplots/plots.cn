var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

// ctx.strokeStyle = "#777";
// ctx.arc(100,100,50,Math.PI/180*0,Math.PI/180*360,false);
// ctx.stroke();

// for (var i = 0; i < 100; i++) {
// 	ctx.strokeStyle = "#777";
// 	ctx.arc(x,y,50,Math.PI/180*0,Math.PI/180*360,false);
// 	ctx.stroke();
// 	x += 1;
// 	y += 1;
// }
var mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
});
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});
// var minRadius = 2;
var colorArray = ["#58D68D", "#E67F22", "#3598DB", "#E84C3D", "#9A59B5", "#27AE61", "#D25400", "#BEC3C7", "#297FB8"];
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = radius * 200;
    this.minRadius = radius;
    this.bg = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.strokeStyle = "#777";
        // var color = Math.floor(Math.random()*100000);
        // ctx.fillStyle = "#"+color;
        // ctx.fillStyle = "#777";
        ctx.fillStyle = this.bg;
        ctx.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        // ctx.stroke();
        ctx.fill();
    };
    this.update = function() {
        // 碰壁反方向移动
        if (this.x + this.minRadius > innerWidth || this.x - this.minRadius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.minRadius > innerHeight || this.y - this.minRadius < 0) {
            this.dy = -this.dy;
        }
        // 移动
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };
}
// var c = new Circle(x, y, dx, dy, radius);

var circleArray = [];
function init() {
    circleArray = [];
    for (var i = 0; i < 500; i++) {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var dx = Math.random() - 0.5;
        var dy = Math.random() - 0.5;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
init();
function animate() {
    // ctx.clearRect(0, 0, 100, 100);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    requestAnimationFrame(animate);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();
