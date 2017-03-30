/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
var THREE = require('three');
(function (window) {
  function ThiCharts(dom, opt) {
    this._dom = dom;
    this._opt = opt;
    this._renderer = null;
    this._camera = null;
    this._graph = null;
    this._scene = null;
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
    this._renderer = new THREE.WebGLRenderer({canvas: this._dom, antialias: true});
    this._renderer.setSize(this._dom.width, this._dom.height);

    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera(90, this._dom.width / this._dom.height, 1, 5000);
    this._scene.add(this._camera);
    this._graph = new THREE.BoxGeometry(1, 2, 1);
    var material= new THREE.MeshPhongMaterial({color: 0x00ff00});
    this._cube = new THREE.Mesh(this._graph, material);
    var light = new THREE.SpotLight( 0xffffff );
    light.castShadow = true;
    light.position.x = 0;
    light.position.y = 0;
    light.position.z = 15;
    this._scene.add( light );
    this._scene.add(this._cube);
    this._camera.position.z = 5;
    // this._cube.rotation.x = Math.PI/6;

    this.render = function () {
      requestAnimationFrame(this.render.bind(this));
      // this._cube.rotation.x += 0.01;
      this._cube.rotation.y += 0.01;
      this._renderer.render(this._scene, this._camera);
    };
    this.render();
  };


  window.ThiCharts = window.ThiCharts || ThiCharts;
})(window);
