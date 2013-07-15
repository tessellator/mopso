/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var Graph = function(context, range, scale, fn) {

  var scene = context.scene();

  function createAxes() {
    var axisMaterial = new THREE.LineBasicMaterial({ color:  0x777777 });

    var xAxis = new THREE.Geometry();
    xAxis.vertices.push(new THREE.Vector3(-range, 0, 0));
    xAxis.vertices.push(new THREE.Vector3(range, 0, 0));
    scene.add(new THREE.Line(xAxis, axisMaterial));

    var yAxis = new THREE.Geometry();
    yAxis.vertices.push(new THREE.Vector3(0, -range, 0));
    yAxis.vertices.push(new THREE.Vector3(0, range, 0));
    scene.add(new THREE.Line(yAxis, axisMaterial));

    var zAxis = new THREE.Geometry();
    zAxis.vertices.push(new THREE.Vector3(0, 0, -range));
    zAxis.vertices.push(new THREE.Vector3(0, 0, range));
    scene.add(new THREE.Line(zAxis, axisMaterial));
  }

  function createSurface() {
    var GRID_WIDTH_SEGMENTS = 50, GRID_HEIGHT_SEGMENTS = 50;

    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000, GRID_WIDTH_SEGMENTS, GRID_HEIGHT_SEGMENTS),
      new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true }));
      plane.dynamic = true;

      for(var i = 0; i <= GRID_HEIGHT_SEGMENTS + 1; i++) {
        for(var j = 0; j <= GRID_WIDTH_SEGMENTS; j++) {
          var index = i * (GRID_WIDTH_SEGMENTS + 1) + j;
          var x = minmax_normalize(j, 0, GRID_WIDTH_SEGMENTS, -Math.PI, Math.PI);
          var y = minmax_normalize(i, 0, GRID_HEIGHT_SEGMENTS + 1, -Math.PI, Math.PI);

          if(!plane.geometry.vertices[index]) break;
          plane.geometry.vertices[index].z = fn([x, y]) * scale;
        }
      }

      plane.geometry.computeFaceNormals();
      plane.geometry.computeVertexNormals();
      scene.add(plane);
  }

  createAxes();
  createSurface();
};
