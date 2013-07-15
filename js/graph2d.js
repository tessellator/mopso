/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var Graph2D = function (context) {

  var scene = context.scene();
  var camera = context.camera();

  var GRID_WIDTH_SEGMENTS = 20, GRID_HEIGHT_SEGMENTS = 10;

  var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 1000, GRID_WIDTH_SEGMENTS, GRID_HEIGHT_SEGMENTS),
    new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true }));
  scene.add(plane);

  camera.position.y = 0;
  camera.position.z = 1850;

};