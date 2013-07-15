/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var RenderContext = function (elementId, fixedView) {

  var self = this;
  var scene, camera, renderer, controls;

  function setupControls(camera) {
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;

    controls.addEventListener('change', self.render);
  }

  this.animate = function () {
    self.render();
    if(controls) { controls.update(); }
    requestAnimationFrame(self.animate);
  };

  this.render = function () {
    renderer.render(scene, camera);
  };

  this.add = function (item) {
    scene.add(item);
  };

  this.remove = function (item) {
    scene.remove(item);
  };

  this.scene = function () {
    return scene;
  };

  this.camera = function () {
    return camera;
  };

  var WIDTH = 480, HEIGHT = 360;
  var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);

  camera.position.z = 2000;
  camera.position.y = -1500;
  renderer.setSize(WIDTH, HEIGHT);

  if (!fixedView) {
    setupControls(camera);
  }

  $(elementId).append(renderer.domElement);
};
