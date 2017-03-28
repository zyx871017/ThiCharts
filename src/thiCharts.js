/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
var three = require('three');
(function (window) {
  function ThiCharts(dom, opt) {
    this._dom = dom;
    this._opt = opt;
  }

  var thiChartsProto = ThiCharts.prototype;
  thiChartsProto.init = function (dom, opt) {
    if(dom.nodeName.toUpperCase() !== 'CANVAS') {
      throw new Error('Dom is invalid!');
    }
    var chart = new ThiCharts(dom,opt);
    chart.id = 'thichart_' + new Date().getDate();
    return chart;
  };

  thiChartsProto.setOption = function (opt) {
    var option = this._opt = Object.assign({}, this._opt, opt);
    if(!option.data){
      throw new Error('Option must have data attribution!');
      return;
    }
    console.log(option.data);
  }


  window.ThiCharts = window.ThiCharts || ThiCharts;
})(window);
