var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function Star(radius, lineWidth, fillStyle, strokeStyle) {
    this.lineWidth = lineWidth || 1;
    this.fillStyle = fillStyle || "#fb3";
    this.strokeStyle = strokeStyle || "#fd5";
    // 旋转角度
    this.rot = 0;
    // 大圆是小圆的几倍
    this.scale = 3;
    // 小圆大小
    this.radius = radius || 10;
    // 半径累加还是减
    this.factor = 0.1;
}
Star.prototype = {
    //r：小圆半径，R：大圆半径，x：圆心x左边，y：圆心y坐标,rot: 旋转角度
    draw: function (r, rot, x, y) {
        ctx.clearRect(0, 0, 600, 600);
        const R = r * this.scale;
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos(((18 + 72 * i - rot) / 180) * Math.PI) * R + x, -Math.sin(((18 + 72 * i - rot) / 180) * Math.PI) * R + y);
            ctx.lineTo(Math.cos(((54 + 72 * i - rot) / 180) * Math.PI) * r + x, -Math.sin(((54 + 72 * i - rot) / 180) * Math.PI) * r + y);
        }
        ctx.closePath();

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.fill();
        ctx.stroke();
    },
    update: function () {
        if (this.radius > 13 || this.radius < 10) {
            this.factor = -this.factor;
        }
        this.radius += this.factor;
        this.draw(this.radius, 0, 500, 500);
    },
};

const star = new Star();
console.log(star);
function animate() {
    star.update();
    window.requestAnimationFrame(animate);
}
animate();
