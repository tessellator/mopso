/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var PSO = function (problem, maxGens, particleCount, tuningParams) {
  var tuning = tuningParams || {};
  var w = tuning.w || 0.65; // inertia
  var c1 = tuning.c1 || 1.49; // coefficient of self-recognition component
  var c2 = tuning.c2 || 1.49; // coefficient of social component
  var r1 = tuning.r1 || Math.random();
  var r2 = tuning.r2 || Math.random();

  var self = this;
  var callbacks = [];

  function callback() {
    callbacks.forEach(function (x) {
      x();
    });
  }

  this.onUpdate = function (callback) {
    callbacks.push(callback);
  };

  var updater;
  var X = createRand2DMatrix(problem.bounds.position, particleCount);
  var V = createRand2DMatrix(problem.bounds.velocity, particleCount);

  var pbest = X.dup();
  updateGBest();

  var currentGen = 0;

  function updateVelocities() {
    V = V.x(w).
      add(pbest.subtract(X).x(c1 * r1)).
      add(arrayToMatrix(gbest, particleCount).subtract(X).x(c2 * r2));
  }

  function updatePositions() {
    X = X.add(V);
  }

  function updateGBest() {
    if (updater) {
      gbest = updater.getGBest();
    }
    else {
      var rows = getRows(pbest);
      var results = rows.map(problem.fn);
      var idx = results.indexOf(results.reduce(rmin));

      gbest = rows[idx];
    }
  }

  function updatePBest() {
    if (updater) {
      pbest = updater.getPBest();
    }
    else {
      pbest = Matrix.create(zip(getRows(X), getRows(pbest)).map(function (row) {
        var results = row.map(problem.fn);
        var idx = results.indexOf(results.reduce(rmin));

        return row[idx];
      }));
    }
  }

  this.step = function () {
    if (currentGen < maxGens) {
      updateVelocities();
      updatePositions();
      updatePBest();
      updateGBest();

      callback();
      currentGen += 1;
    }
  };

  this.run = function () {
    if (currentGen < maxGens) {
      self.step();
      setTimeout(self.run, 100);
    }
  };

  this.getProblem = function () {
    return problem;
  };

  this.getPositions = function () {
    return X;
  };

  this.getVelocities = function () {
    return V;
  };

  this.getParticleBests = function () {
    return pbest;
  };

  this.getBestSolution = function () {
    return gbest;
  };

  this.setUpdater = function(updateFns) {
    updater = updateFns;
  };

};
