
echarts.registerMap('world', World);
    // 基于准备好的dom，初始化echarts实例
var chart = echarts.init(document.getElementById('main'));


// 定义中国地图json文件
var world = {
  'China': './json/china.json'
}

// 中国地图数据
var ChinaData = [{
  name: 'China'
}]


// loadMap('./json/china.json', 'China');//初始化全国地图
var timeFn = null;

//单击切换到中国地图，当mapCode有值,说明可以切换到下级地图
var change1 = document.getElementById("main")
var change = document.getElementById("china")
chart.on('click', function(params) {
  change1.style.display = "none";
  change.style.display = "block";
    // window.location.href="./China.html"
});

// 绑定双击事件，返回世界地图
chart.on('dblclick', function(params) {
    //当双击事件发生时，清除单击事件，仅响应双击事件
    clearTimeout(timeFn);
    
    //返回全国地图
    loadMap('./json/china.json', 'China');
});

    var option={
        tooltip:{
          trigger: 'item',
          formatter: function(params) {
            // var res=params.data.name+"<br/>"+"最大负荷："+params.data.power+"<br/>"+"同比增长："+params.data.increase+"<br/>"+"发生日期："+ params.data.time;
                // return res
          }
         },
        series: [
           {
             type: 'map', 
             map: 'world',         
             label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
                itemStyle: {
                  normal: {
                      areaColor: '#00196d',    // 市级区域背景颜色
                      borderColor: '#0a53e9',   // 边框颜色
                      borderWidth: 1,    // 边框宽度
                      shadowColor: 'rgba(63, 218, 255, 0.5)',  // 阴影颜色
                      shadowBlur: 0   // 阴影模糊程度
                    },
                  emphasis: {
                      areaColor: 'darkorange'
                    }
                },
             data:[]
            }
        ]
    };
chart.setOption(option);
  
  
  
chart.on('click', function(params,that){
    console.log(params,that)
  })
