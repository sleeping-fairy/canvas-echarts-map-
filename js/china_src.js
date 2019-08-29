
  // 随机数据
  // var data = [
  //             {"name":"湖南省","power":"12306","increase":"0.6%","time":"2019-07-23"},
  //             {"name":"湖北省","power":"10025","increase":"0.7%","time":"2019-07-24"},
  //             {"name":"河南省","power":"9700","increase":"0.8%","time":"2019-07-25"},
  //             {"name":"江西省","power":"11200","increase":"0.9%","time":"2019-07-26"}
  //            ];


    echarts.registerMap('e-power', China);
        // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('china'));
    // var option={
    //     tooltip:{
    //       trigger: 'item',
    //       formatter: function(params) {
    //         // var res=params.data.name+"<br/>"+"最大负荷："+params.data.power+"<br/>"+"同比增长："+params.data.increase+"<br/>"+"发生日期："+ params.data.time;
    //             // return res
    //       }
    //      },
    //     series: [
    //        {
    //          type: 'map', 
    //          map: 'e-power',
    //          name:'同比增长',
    //          label: {
    //             normal: {
    //               show: false
    //             },
    //             emphasis: {
    //               show: true
    //             }
    //           },
    //          data:[]
    //         }
    //     ]
    // }

      //各省份的地图json文件
var provinces = {
    '上海': './json/province/shanghai.json',
    '河北': './json/province/hebei.json',
    '山西': './json/province/shanxi.json',
    '内蒙古': './json/province/neimenggu.json',
    '辽宁': './json/province/liaoning.json',
    '吉林': './json/province/jilin.json',
    '黑龙江': './json/province/heilongjiang.json',
    '江苏': './json/province/jiangsu.json',
    '浙江': './json/province/zhejiang.json',
    '安徽': './json/province/anhui.json',
    '福建': './json/province/fujian.json',
    '江西': './json/province/jiangxi.json',
    '山东': './json/province/shandong.json',
    '河南': './json/province/henan.json',
    '湖北': './json/province/hubei.json',
    '湖南': './json/province/hunan.json',
    '广东': './json/province/guangdong.json',
    '广西': './json/province/guangxi.json',
    '海南': './json/province/hainan.json',
    '四川': './json/province/sichuan.json',
    '贵州': './json/province/guizhou.json',
    '云南': './json/province/yunnan.json',
    '西藏': './json/province/xizang.json',
    '陕西': './json/province/shanxi1.json',
    '甘肃': './json/province/gansu.json',
    '青海': './json/province/qinghai.json',
    '宁夏': './json/province/ningxia.json',
    '新疆': './json/province/xinjiang.json',
    '北京': './json/province/beijing.json',
    '天津': './json/province/tianjin.json',
    '重庆': './json/province/chongqing.json',
    '香港': './json/province/xianggang.json',
    '澳门': './json/province/aomen.json'
};

//各省份的数据
var allData = [{
    name: '北京'
}, {
    name: '天津'
}, {
    name: '上海'
}, {
    name: '重庆'
}, {
    name: '河北'
}, {
    name: '河南'
}, {
    name: '云南'
}, {
    name: '辽宁'
}, {
    name: '黑龙江'
}, {
    name: '湖南'
}, {
    name: '安徽'
}, {
    name: '山东'
}, {
    name: '新疆'
}, {
    name: '江苏'
}, {
    name: '浙江'
}, {
    name: '江西'
}, {
    name: '湖北'
}, {
    name: '广西'
}, {
    name: '甘肃'
}, {
    name: '山西'
}, {
    name: '内蒙古'
}, {
    name: '陕西'
}, {
    name: '吉林'
}, {
    name: '福建'
}, {
    name: '贵州'
}, {
    name: '广东'
}, {
    name: '青海'
}, {
    name: '西藏'
}, {
    name: '四川'
}, {
    name: '宁夏'
}, {
    name: '海南'
}, {
    name: '台湾'
}, {
    name: '香港'
}, {
    name: '澳门'
}];
for (var i = 0; i < allData.length; i++) {
    allData[i].value = Math.round(Math.random() * 100);
}


loadMap('./json/china.json', 'China');//初始化全国地图

var timeFn = null;

//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
myChart.on('click', function(params) {
    clearTimeout(timeFn);
    //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
    timeFn = setTimeout(function() {
        var name = params.name; //地区name
        var mapCode = provinces[name]; //地区的json数据
        if (!mapCode) {
            alert('无此区域地图显示');
            return;
        }

        loadMap(mapCode, name);
        
    }, 250);
});


// 绑定双击事件，返回全国地图
myChart.on('dblclick', function(params) {
    //当双击事件发生时，清除单击事件，仅响应双击事件
    clearTimeout(timeFn);
    
    //返回全国地图
    loadMap('./json/china.json', 'China');
});

/**
 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
 @params {String} mapCode:json数据的地址
 @params {String} name: 地图名称
 */
function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                tooltip: {
                    show: true,
                    formatter: function(params) {
                        if (params.data) return params.name + '：' + params.data['value']
                    },
                },
                visualMap: {
                    type: 'continuous',
                    text: ['', ''],
                    showLabel: true,
                    left: '50',
                    min: 0,
                    max: 100,
                    inRange: {
                        color: ['#00196d' ]
                    },
                    splitNumber: 0
                },
                series: [{
                    name: 'MAP',
                    type: 'map',
                    mapType: name,
                    selectedMode: 'false',//是否允许选中多个区域
                    label: {
                        normal: {
                            show: true  // 页面是否显示省份名称
                        },
                        emphasis: {
                            show: true  // 鼠标悬停是否显示省份名称
                        }
                    },
                    
                    // 控制地图背景颜色、边框、透明度等等
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

                    data: allData
                }]
            };
            myChart.setOption(option);
            // curMap = {
            //     mapCode: mapCode,
            //     mapName: name
            // };
        } else {
            alert('无法加载该地图');
        }
    });
}



// chart.setOption(option);
// chart.on('click', function(params,that){
// 		console.log(params,that)
// 	})
// 
