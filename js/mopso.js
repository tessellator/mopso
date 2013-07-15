/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var MOPSO = function(problems, maxGens, particleCount) {
  var self = this;
  var callbacks = [];

  function callback() {
    callbacks.forEach(function(x) { x(); });
  }

  this.onUpdate = function(callback) {
    callbacks.push(callback);
  };


  var tuning = {
    w: 0.5, // inertia
    c1: 1.49, // coefficient of self-recognition component
    c2: 1.49, // coefficient of social component
    r1: Math.random(),
    r2: Math.random()
  };
  var currentGen = 0;

  var psos = [];
  var paretoFront = [];
  var paretoInputs = [];
  var currentLeaderIdx;

  function dominates(x, y) {
    return x[0] < y[0] && x[1] < y[1];
  }

  function updateParetoFront() {
    var pos1 = getRows(psos[0].getPositions());
    var pos2 = getRows(psos[1].getPositions());
    var pos = zip(pos1, pos2);
    var zs = zip(pos1.map(problems[0].fn), pos2.map(problems[1].fn));

    var newFront = [];
    var newFrontInputs = [];

    var f = function(x, y, inputs, oldInputs) {
      for(var i = 0; i < x.length; i++) {
        var dominated = false;
        for(var j = 0; j < y.length; j++) {
          if(!(x[i] && y[j])) continue;

          if(dominates(y[j], x[i])) {
            dominated = true;
            break;
          }
          else if(dominates(x[i], y[j])) {
            delete y[j];
            delete oldInputs[j];
          }
        }

        if(!dominated) {
          newFront.push(x[i]);
          newFrontInputs.push(inputs[i]);
        }
      }
    };

    f(zs, paretoFront, pos, paretoInputs);
    f(paretoFront, newFront, paretoInputs, newFrontInputs);

    paretoFront = newFront.filter(function(x) { return x; });
    paretoInputs = newFrontInputs.filter(function(x) { return x; });
  }

  var updater = function(idx) {
    var fn = problems[idx].fn;

    this.getGBest = function() {
      return paretoInputs[currentLeaderIdx][idx];
    };

    this.getPBest = function() {
      var bests = psos[idx].getParticleBests().elements;
      var current = psos[idx].getPositions().elements;

      var bestzs = bests.map(fn);
      var zs = current.map(fn);

      var rows = [];

      for(var i = 0; i < zs.length; i++) {
        if(zs[i] < bestzs[i]) {
          rows.push(current[i]);
        }
        else {
          rows.push(bests[i]);
        }
      }

      return Matrix.create(rows);
    };
  };

  this.step = function() {
    if(currentGen < maxGens) {
      currentLeaderIdx = Math.floor(Math.random() * paretoFront.length);
      psos.forEach(function(x) { x.step(); });
      updateParetoFront();

      callback();
      currentGen += 1;
    }
  };

  this.run = function() {
    if(currentGen < maxGens) {
      self.step();
      setTimeout(self.run, 100);
    }
  };

  this.getPSOs = function() {
    return psos;
  };

  this.getParetoFront = function() {
    return paretoFront;
  };


  (function initialize() {
    var i;
    for(i = 0; i < problems.length; i++) {
      psos.push(new PSO(problems[i], maxGens, particleCount, tuning));
    }
    updateParetoFront();
    for(i = 0; i < problems.length; i++) {
      psos[i].setUpdater(new updater(i));
    }
  })();
};
