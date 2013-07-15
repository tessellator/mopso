/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var PSORenderer = function(context, pso) {

  var scene = context.scene();
  var individuals = [];
  var fn = pso.getProblem().fn;
  var material = new THREE.MeshBasicMaterial({ color: 'red' });

  function normalize(x) {
    return minmax_normalize(x, -Math.PI, Math.PI, -1000, 1000);
  }

  function setPosition(individual, row) {
    individual.position.x = normalize(row.elements[0]);
    individual.position.y = normalize(row.elements[1]);
    individual.position.z = fn(row.elements) * 1000;
  }

  function createIndividual(row) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), material);
    setPosition(cube, row);
    scene.add(cube);
    individuals.push(cube);
  }

  function createPopulation() {
    var pop = pso.getPositions();

    for(var i = 0; i < pop.rows(); i++) {
      createIndividual(pop.row(i + 1));
    }
  }

  function updatePopulation() {
    var pop = pso.getPositions();

    for(var i = 0; i < pop.rows(); i++) {
      setPosition(individuals[i], pop.row(i + 1));
    }
  }

  createPopulation();
  pso.onUpdate(updatePopulation);
};
