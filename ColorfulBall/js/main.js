function ColorfulBall() {
    var canvas = document.createElement("canvas");
    canvas.className = "colorful-ball";
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");

    var style = document.createElement("style");
    style.innerHTML = ".colorful-ball{position: fixed; z-index:9999; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none;}";
    document.body.appendChild(style);

    // 尺寸改变设置大小
    function handleWindowResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize, false);

    const _this = this;
    this.circleArray = [];
    window.addEventListener("click", function (event) {
        event.preventDefault();
        const ballSize = 20 + Math.floor(Math.random() * 20);
        for (let i = 0; i < ballSize; i++) {
            _this.circleArray.push(new Circle(event.clientX, event.clientY, _this.ctx));
        }
    });

    this.loop();
}

ColorfulBall.prototype = {
    loop() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (this.circleArray) {
            this.circleArray.forEach((item) => {
                item.upgrade();
            });
            this.circleArray = this.circleArray.filter((item) => !item.done);
        }
        requestAnimationFrame(this.loop.bind(this));
    },
};

function Circle(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 20 - 10;
    this.dy = Math.random() * 20 - 10;
    this.maxRadius = Math.random() * 5 + 5;
    this.radius = this.maxRadius;
    // 移动次数(移动到time次则停止移动)
    this.time = 30;
    this.curTime = 0;
    this.ctx = ctx;
    // 代表是否执行完毕
    this.done = false;

    // const colorArray = ["rgb(88,214,141)", "rgb(230,127,34)", "rgb(53,152,219)", "rgb(53,152,219)", "rgb(154,89,181)", "rgb(39,174,97)", "rgb(210,84,0)", "rgb(190,195,199)", "#297FB8", "#FFFFCC", "#CCFFFF", "#CC3333", "#FFFF00", "#663366", "#CC0033", "#009966", "#CCFF66", "#336666", "#0099CC"];
    var colorArray = ["#58D68D", "#E67F22", "#3598DB", "#E84C3D", "#9A59B5", "#27AE61", "#D25400", "#BEC3C7", "#297FB8", "#FFFFCC", "#CCFFFF", "#CC3333", "#FFFF00", "#663366", "#CC0033", "#009966", "#CCFF66", "#336666", "#0099CC"];
    this.bg = colorArray[Math.floor(Math.random() * colorArray.length)];
}

Circle.prototype = {
    upgrade() {
        if (this.curTime < this.time) {
            this.curTime++;
            this.x += this.dx;
            this.y += this.dy;
            if (this.curTime > this.time / 2) {
                this.radius = (this.maxRadius * (this.time - this.curTime)) / (this.time / 2);
            }
        } else {
            this.done = true;
        }
        this.draw();
    },
    draw() {
        this.ctx.beginPath();
        // this.ctx.strokeStyle = "#777";

        this.ctx.fillStyle = this.bg;
        this.ctx.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        this.ctx.fill();
    },
};
