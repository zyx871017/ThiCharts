/**
 * Created by zhaoyuxiang on 2017/3/27.
 */
window.onload = function () {
  var dom = document.getElementById('container');

  var chart = new ThiCharts(dom);
  //情景设定：同时摇两个筛子1W次，A筛子的要中数值为X轴，B筛子要中的数值为Z轴，摇中相应数值的次数为Z轴
  var opt = {
    type: 'bar',
    data: [
      [2, 2, 3, 6, 3, 2],
      [3, 2, 3, 4, 5, 1],
      [6, 2, 3, 3, 3, 0],
      [3, 2, 3, 4, 5, 2],
      [1, 4, 3, 2, 2, 4],
      [6, 2, 3, 2, 5, 2]
    ],
    axisName: {
      x: '一号筛子',
      z: '二号筛子'
    },
    axisUnit: {
      x: '',
      y: '次',
      z: ''
    },
    axisValue: {
      x: ['1', '2', '3', '4', '5', '6'],
      z: ['1', '2', '3', '4', '5', '6']
    }
  };
  chart.setOption(opt);
};
