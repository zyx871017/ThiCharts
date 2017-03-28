/**
 * Created by zhaoyuxiang on 2017/3/27.
 */
window.onload = function () {
  var dom = document.getElementById('thiCharts');

  var chart = new ThiCharts(dom);
  //情景设定：同时摇两个筛子1W次，A筛子的要中数值为X轴，B筛子要中的数值为Z轴，摇中相应数值的次数为Z轴
  var opt = {
    type: 'bar',
    data: [
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6]
    ],
    axisUnit: {
      x: '',
      y: '次',
      z: ''
    },
    axisValue:{
      x: ['1', '2', '3' ,'4', '5', '6'],
      z: ['1', '2', '3' ,'4', '5', '6']
    }
  };
  chart.setOption(opt);
};
