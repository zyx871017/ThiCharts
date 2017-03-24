/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
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