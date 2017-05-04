/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
(function (window) {
  function ThiCharts(dom) {
    this._dom = dom;
    this._opt = null;
    this._renderer = null;
    this._camera = null;
    this._graph = null;
    this._scene = null;
    this._controls = null;
    this._light = null;
    this._raycaster = null;
    this._mouse = new THREE.Vector2();
    this.INTERSECTED = null;
  }

  var thiChartsProto = ThiCharts.prototype;
  thiChartsProto.constructor = ThiCharts;

  thiChartsProto.init = function (dom, opt) {
    if (dom.nodeName.toUpperCase() !== 'CANVAS') {
      throw new Error('Dom is invalid!');
    }
    var chart = new ThiCharts(dom, opt);
    chart.id = 'thichart_' + new Date().getDate();
    chart._camera = new THREE.PerspectiveCamera(45, chart._dom.width, chart._dom.height, 1, 10000);
    chart._camera.position.set(0, 0, 600);
    chart._controls = new THREE.OrbitControls(chart._camera);
    chart._controls.target.set(0, 0, 0);
    chart._scene = new THREE.Scene();
    chart._light = new THREE.AmbientLight(0xffffff);
    chart._scene.add(chart._light);
    chart._raycaster = null;
    console.log(chart);
    var data = chart._opt.data;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        var geometry = new THREE.BoxBufferGeometry(1, data[i][j], 1);
        var object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x2fb3ff}));
        chart._scene.add(object);
      }
    }
    chart._raycaster = new THREE.Raycaster();
    chart._renderer = new THREE.WebGLRenderer({canvas: chart._dom});
    chart._renderer.setClearColor(0x000000);
    chart._renderer.setPixelRatio(window.devicePixelRatio);
    chart._renderer.setSize(chart._dom.width, chart._dom.height);

    return chart;
  };

  thiChartsProto.setOption = function (opt) {
    var option = this._opt = Object.assign({}, this._opt, opt);
    if (!option.data) {
      throw new Error('Option must have data attribution!');
      return;
    }
    console.log(option.data);
    this._dom.style.backgroundColor = '#000';
    this._canvas = document.createElement('canvas');
    this._canvas.width = parseInt(this._dom.style.width);
    this._canvas.height = parseInt(this._dom.style.height);
    this._canvas.style.position = 'absolute';
    this._canvas.style.zIndex = 10;
    this._dom.appendChild(this._canvas);
    this.init = function () {
      this._camera = new THREE.PerspectiveCamera(45, this._canvas.width / this._canvas.height, 1, 10000);
      this._camera.position.set(0, 300, 600);
      this._controls = new THREE.OrbitControls(this._camera);
      this._controls.target.set(0, 0, 0);
      this._scene = new THREE.Scene();
      this._light = new THREE.AmbientLight(0x2fb3ff);
      this._scene.add(this._light);
      var light1 = new THREE.SpotLight(0xffffff, 1);
      var light2 = new THREE.SpotLight(0xffffff, 1);
      var light3 = new THREE.SpotLight(0xffffff, 1);
      var light4 = new THREE.SpotLight(0xffffff, 1);
      light1.position.set(300, 200, 300);
      // this._scene.add(light1);
      light2.position.set(-300, 200, 300);
      //this._scene.add(light2);
      light3.position.set(-300, 200, -300);
      //this._scene.add(light3);
      light4.castShadow = true;
      light4.position.set(100, 100, -150);
      light4.shadow.camera.near = 2;
      light4.shadow.camera.far = 400;
      light4.shadow.camera.fov = 30;
      var data = this._opt.data;
      // 添加柱形
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          var geometry = new THREE.BoxBufferGeometry(20, data[i][j] * 10, 20);
          var object = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x2fb3ff}));
          geometry.receiveShadow = true;
          geometry.castShadow = true;
          object.position.x = (data.length / 2 - data.length + i + 0.5) * 30;
          object.position.y = data[i][j] / 2 * 10;
          object.position.z = (data[i].length / 2 - data[i].length + j + 0.5) * 30;
          light4.target = object;
          this._scene.add(object);
        }
      }

      // 添加坐标轴
      var axisBottom = new THREE.Geometry();
      var axisVertical1 = new THREE.Geometry();
      var axisVertical2 = new THREE.Geometry();
      var axisVertical3 = new THREE.Geometry();
      var axisVertical4 = new THREE.Geometry();
      var material = new THREE.LineBasicMaterial({vertexColors: true});
      var color = new THREE.Color(0xfdb12a);
      var p1 = new THREE.Vector3();
      var p2 = new THREE.Vector3();
      var p3 = new THREE.Vector3();
      var p4 = new THREE.Vector3();
      var p5 = new THREE.Vector3();
      var p6 = new THREE.Vector3();
      var p7 = new THREE.Vector3();
      var p8 = new THREE.Vector3();
      p1.set(100, 0, 100);
      p2.set(100, 0, -100);
      p3.set(-100, 0, -100);
      p4.set(-100, 0, 100);
      p5.set(100, 100, 100);
      p6.set(100, 100, -100);
      p7.set(-100, 100, -100);
      p8.set(-100, 100, 100);
      axisBottom.vertices.push(p1);
      axisBottom.vertices.push(p2);
      axisBottom.vertices.push(p3);
      axisBottom.vertices.push(p4);
      axisBottom.vertices.push(p1);
      axisBottom.colors.push(color, color, color, color, color);
      axisVertical1.vertices.push(p1);
      axisVertical1.vertices.push(p5);
      axisVertical1.colors.push(color, color);
      axisVertical2.vertices.push(p2);
      axisVertical2.vertices.push(p6);
      axisVertical2.colors.push(color, color);
      axisVertical3.vertices.push(p3);
      axisVertical3.vertices.push(p7);
      axisVertical3.colors.push(color, color);
      axisVertical4.vertices.push(p4);
      axisVertical4.vertices.push(p8);
      axisVertical4.colors.push(color, color);
      var line = new THREE.Line(axisBottom, material, THREE.LineSegments);
      var line1 = new THREE.Line(axisVertical1, material, THREE.LineSegments);
      var line2 = new THREE.Line(axisVertical2, material, THREE.LineSegments);
      var line3 = new THREE.Line(axisVertical3, material, THREE.LineSegments);
      var line4 = new THREE.Line(axisVertical4, material, THREE.LineSegments);
      this._scene.add(line);
      this._scene.add(line1);
      this._scene.add(line2);
      this._scene.add(line3);
      this._scene.add(line4);

      this._scene.add(light4);
      this._raycaster = new THREE.Raycaster();
      this._renderer = new THREE.WebGLRenderer({canvas: this._canvas, alpha: true});
      this._renderer.shadowMap.enabled = true;
      this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // this._renderer.setClearColor(0x000000);
      this._renderer.setPixelRatio(window.devicePixelRatio);
      this._renderer.setSize(this._canvas.width, this._canvas.height);

      var axisText = this._opt.axisValue;
      // 添加文字
      for (var i = 0; i < axisText.x.length; i++) {
        var textEleFront = document.createElement('div');
        var textEleBack = document.createElement('div');
        textEleFront.className = 'axisText';
        textEleBack.className = 'axisText';
        textEleFront.textContent = axisText.x[i];
        textEleBack.textContent = axisText.x[i];
        var textObjectFront = new THREE.CSS3DObject(textEleFront);
        var textObjectBack = new THREE.CSS3DObject(textEleBack);
        textObjectFront.position.x = (axisText.x.length / 2 - axisText.x.length + i + 0.5) * 30;
        textObjectFront.position.y = 0;
        textObjectFront.position.z = 120;
        textObjectFront.rotation.x = -Math.PI / 2;
        this._scene.add(textObjectFront);
        textObjectBack.position.x = (axisText.x.length / 2 - axisText.x.length + i + 0.5) * 30;
        textObjectBack.position.y = 0;
        textObjectBack.position.z = -120;
        textObjectBack.rotation.x = -Math.PI / 2;
        this._scene.add(textObjectBack);
      }
      for (var j = 0; j < axisText.z.length; j++) {
        var textEleLeft = document.createElement('div');
        var textEleRight = document.createElement('div');
        textEleLeft.className = 'axisText';
        textEleRight.className = 'axisText';
        textEleLeft.textContent = axisText.z[j];
        textEleRight.textContent = axisText.z[j];
        var textObjectLeft = new THREE.CSS3DObject(textEleLeft);
        var textObjectRight = new THREE.CSS3DObject(textEleRight);
        textObjectLeft.position.x = 120;
        textObjectLeft.position.y = 0;
        textObjectLeft.position.z = (axisText.z.length / 2 - axisText.z.length + j + 0.5) * 30 + 5;
        textObjectLeft.rotation.x = -Math.PI / 2;
        this._scene.add(textObjectLeft);
        textObjectRight.position.x = -120;
        textObjectRight.position.y = 0;
        textObjectRight.position.z = (axisText.z.length / 2 - axisText.z.length + j + 0.5) * 30 + 5;
        textObjectRight.rotation.x = -Math.PI / 2;
        this._scene.add(textObjectRight);
      }
      this._CSS3DRenderer = new THREE.CSS3DRenderer();
      this._CSS3DRenderer.setSize(this._canvas.width, this._canvas.height);
      this._CSS3DRenderer.domElement.style.position = 'absolute';
      this._CSS3DRenderer.domElement.style.top = '0';
      this._CSS3DRenderer.domElement.style.left = '0';
      this._dom.appendChild(this._CSS3DRenderer.domElement);

      this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      // this._dom.addEventListener('resize', this.onWindowResize, false);
    };

    this.onMouseMove = function (event) {
      event.preventDefault();
      this._mouse.x = (event.clientX / this._canvas.width) * 2 - 1;
      this._mouse.y = -(event.clientY / this._canvas.height) * 2 + 1;
    };

    this.onWindowResize = function () {
      this._camera.aspect = this._dom.width / this._dom.height;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(this._dom.width, this._dom.height);
    };

    this.animate = function () {
      requestAnimationFrame(this.animate.bind(this));
      this.render();
    };

    this.render = function () {
      this._raycaster.setFromCamera(this._mouse, this._camera);
      var intersects = this._raycaster.intersectObjects(this._scene.children);
      if (intersects.length > 0) {
        if (this.INTERSECTED != intersects[0].object) {
          if (this.INTERSECTED && this.INTERSECTED.material.emissive)
            this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
          this.INTERSECTED = intersects[0].object;
          if (this.INTERSECTED.material.emissive) {
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex(0xff0000);
          }
        }
      } else {
        if (this.INTERSECTED && this.INTERSECTED.material.emissive)
          this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
        this.INTERSECTED = null;
      }
      this._renderer.render(this._scene, this._camera);
      this._CSS3DRenderer.render(this._scene, this._camera);
    };


    this.init();
    this.animate();
  };


  window.ThiCharts = window.ThiCharts || ThiCharts;
})(window);
