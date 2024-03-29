
  var ball_count = 4;//小球的个数
  var circle_x = 0;//圆心的X坐标
  var circle_y = 0;//圆心的Y坐标
  var circle_a = 670;//椭圆长轴  
  var circle_b = 150;//椭圆短轴  
  var now_count = 0;//当前显示小球的个数
  var balls_array;//用来存储小球信息
  var angle_change = 1;//角度变化
  var iID;
  var canvas;//画布
  var context;//画布环境
  $(function () {
      var $canvas = $('#myCanvas');
      canvas = $canvas[0];
      canvas.addEventListener('mouseover', mouseOverCanvas, false);//鼠标移到Canvas
      canvas.addEventListener('mouseout', mouseOutCanvas, false);//鼠标移出Canvas
      canvas.addEventListener('click', clickCanvas, false);//鼠标单击Canvas
      context = canvas.getContext('2d');
      balls_array = new Array(ball_count);
      circle_x = $canvas.width() / 2;
      circle_y = $canvas.height() / 2;
      loadBall();

  });
  //小球移动
  function ballMove() {
      context.clearRect(0, 0, canvas.width, canvas.height);//清空画布内容
      // loadmap()

      for (var i = 0; i < balls_array.length; i++) {
          var ball = balls_array[i];
          if (ball.angle == 360) {
              ball.angle = 0;
          }
          ball.angle = ball.angle + angle_change;//角度
          var radian = ball.angle * (Math.PI / 180);//弧度
          ball.x = (circle_x + circle_a * Math.cos(radian)) - ball.w / 2;
          ball.y = (circle_y + circle_b * Math.sin(radian)) - ball.h / 2;
          var num = setProp(ball, 0.5, 1);
          context.globalAlpha = num;
          context.drawImage(ball.image, ball.x, ball.y, ball.w * num, ball.h * num);
          context.globalAlpha = 1;
      }
  }
 
  //加载小球
  function loadBall() {
      for (var i = 0; i < ball_count; i++) {
          var angle = (i + 1) * (360 / ball_count);//角度
          var radian = angle * (Math.PI / 180);//弧度
          //初始化图片
          // var arr_img = [img.src = './rwgl.png', img.src = './tjtzgl.png', img.src = './wdgz.png', img.src = './'];
          var img = new Image()
          img.id = i + 1;
          img.src = './'+img.id+''+img.id+'.png';
          //存放小球信息
          var ball = {};
          ball.id = img.id;
          ball.w = 205;
          ball.h = 205;
          ball.x = (circle_x + circle_a * Math.cos(radian)) - ball.w / 2;
          ball.y = (circle_y + circle_b * Math.sin(radian)) - ball.h / 2;
          ball.angle = angle;
          ball.image = img;
          balls_array[i] = ball;
          img.onload = function () {
              for (var j = 0; j < balls_array.length; j++) {
                  if (this.id == balls_array[j].id) {
                      var item = balls_array[j];
                      var num = setProp(item, 0.5, 1);
                      context.globalAlpha = num;//设置图片的透明度
                      context.drawImage(img, item.x, item.y, item.w * num, item.h * num);
                      context.globalAlpha = 1;
                      break;
                  }
              }
              now_count++;
              if (now_count == ball_count) {//当小球全部加载完成
                  iID = setInterval(ballMove, 400);//40ms移动小球
              }
          }
          img.onerror = function () {
              alert('加载失败！');
          }
      }
  }
  // 鼠标单击canvas
  function clickCanvas(e) {
      p = getEventPosition(e);
      for (var i = 0; i < balls_array.length; i++) {
          var ball = balls_array[i];
          if (p.x >= ball.x && p.x <= (ball.x + ball.w) && p.y >= ball.y && p.y <= (ball.y + ball.h)) {
              alert(ball.id);
              // window.location.href = 'http://www.baidu.com?id=' + ball.id;
              break;
          }

          // if(ball.id == 1){
          //     window.location.href = 'http://www.baidu.com'
          // } 
      }
  }


  //鼠标移到Canvas,小球停止移动
  function mouseOverCanvas() {
      clearInterval(iID);
  }
  //鼠标移出Canvas,小球移动
  function mouseOutCanvas() {
      iID = setInterval(ballMove, 40);
  }
  //获取事件对象发生的位置
  function getEventPosition(ev) {
      var x, y;
      if (ev.layerX || ev.layerX == 0) {
          x = ev.layerX;
          y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera   
          x = ev.offsetX;
          y = ev.offsetY;
      }
      return { x: x, y: y };
  }
  //把Y坐标转化为透明度和尺寸属性，范围在n1到n2之间;  
  function setProp(ball, n1, n2) {
      return (((ball.y + ball.h / 1 - circle_y) + 2 * circle_b) / circle_b - 1) / 2 * (n2 - n1) + n1;
  }
