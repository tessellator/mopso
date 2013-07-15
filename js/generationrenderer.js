/*
 Copyright (c) 2013 Chad Taylor

 See the file LICENSE for copying permission.
 */

var GenerationRenderer = function(elementId, pso) {

  var fn = pso.getProblem().fn;
  var bodySelector = elementId + ' tbody';
  var rowsSelector = bodySelector + ' > tr';

  function startRow() {
    return '<tr>';
  }

  function endRow() {
    return '</tr>';
  }

  function createEntry(x) {
    return '<td>' + x + '</td>';
  }

  function createPositionEntries(entry, row) {
    return createEntry(entry) +
      createEntry(row.elements[0]) +
      createEntry(row.elements[1]) +
      createEntry(fn(row.elements));
  }

  function createBestEntry() {
    var best = pso.getBestSolution();

    return createEntry('Globally best') +
      createEntry(best[0]) +
      createEntry(best[1]) +
      createEntry(fn(best));
  }

  function update() {
    $(rowsSelector).remove();

    var pop = pso.getPositions();
    var elements = '';

    for(var i = 0; i < pop.rows(); i++) {
      elements += startRow() +
        createPositionEntries(i + 1, pop.row(i + 1)) +
        endRow();
    }

    elements += startRow() +
      createBestEntry() +
      endRow();

    $(bodySelector).append(elements);
  }

  update();
  pso.onUpdate(update);
};
