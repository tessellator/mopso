/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var ParetoRenderer = function(context, mopso) {

  var points = [];
  var scene = context.scene();
  var material = new THREE.MeshBasicMaterial({ color: 'red' });

  function normalizeX(x) {
    return minmax_normalize(x, 0, 4, -1000, 1000);
  }

  function normalizeY(y) {
    return minmax_normalize(y, 0, 2, -500, 500);
  }

  function createPoint(point) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), material);
    cube.position.x = normalizeX(point[0]);
    cube.position.y = normalizeY(point[1]);

    console.log([point[0], point[1], cube.position.x, cube.position.y].join(','));
    scene.add(cube);
    points.push(cube);
  }

  mopso.onUpdate(function() {
    for(var i = 0; i < points.length; i++) {
      scene.remove(points[i]);
    }
    mopso.getParetoFront().forEach(createPoint);
  });

};
