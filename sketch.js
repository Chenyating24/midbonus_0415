let rocketX;
let rocketY;
let backgroundPoints = [];
let bullets = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用windowWidth和windowHeight
  rocketX = width / 2;
  rocketY = height - 100; // 調整火箭位置在畫面中下方
  // 初始化背景點的位置
  for (let i = 0; i < 100; i++) {
    backgroundPoints.push({
      x: random(width),
      y: random(height)
    });
  }
}

function draw() {
  background(0); // 設定背景為黑色

  // 更新背景點的位置，模擬向下捲動
  for (let i = 0; i < backgroundPoints.length; i++) {
    let point = backgroundPoints[i];
    point.y += 2;
    if (point.y > height) {
      point.y = 0;
    }
    fill(255, 255, 0);
    ellipse(point.x, point.y, 2, 2);
  }

  // 控制火箭的左右移動
  rocketX = mouseX;

  // 更新並繪製子彈
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].show();
  }

  // 火箭位置不動
  drawRocket(rocketX, rocketY);
}

function drawRocket(x, y) {
  //---Rocket---//
  //flames
  noStroke()
  fill(255,185,0)
  ellipse(x,y+random(35,50),20,60)
  fill(255,255,0)
  ellipse(x,y+random(35,50),15,40)

  //sidfins
  fill(30,144,255)
  arc(x,y+36,50,40,PI,0,CHORD)

  //body
  fill(255,0,0)
  ellipse(x,y,30,80)

  //windows
  fill(255)
  ellipse(x,y-12,15,15)
  fill(255)
  ellipse(x,y+6,15,15)

  //front fin
  fill(30,144,255)
  ellipse(x,y+35,5,30)
}

function mousePressed() {
  // 在火箭頭部位置發射子彈
  bullets.push(new Bullet(rocketX, rocketY - 40));
}

// 定義子彈類別
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4; // 子彈半徑
    this.speed = 5; // 子彈速度
  }

  update() {
    this.y -= this.speed; // 更新子彈位置
  }

  show() {
    fill(255); // 白色
    ellipse(this.x, this.y, this.r * 2, this.r * 2); // 繪製子彈
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 視窗大小改變時，重新調整畫布大小
}
