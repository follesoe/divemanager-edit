var dbpath      = require('./services/dbpath');
var dbaccess    = require('./services/dbaccess');
var immstruct   = require('immstruct');
var immutable   = require('immutable');
var document    = window.document;
var React       = window.React || require('react');
var omniscient  = require('omniscient/component')(React);
var component   = omniscient.withDefaults({jsx: true});
var DiveApp     = require('./components/DiveApp');

var ipc = require('ipc');

var structure = immstruct({
  selectedDiveId: -1,
  nullDive: {
    StartTime: 'TODO',
    MaxDepth: 0,
    BottomTemperature: 0,
    Duration: 0,
    DiveNumberInSerie: 0,
    Source: 0
  },
  dives: [],
  dbpath: ''
});

var pathResult = dbpath.getPath();

dbaccess.getDives(pathResult.path).then(function (dives) {
  structure.cursor().merge({
    dives: dives,
    dbpath: pathResult,
    selectedDiveId: dives.length > 0 ? dives[0].DiveId : -1
  });
});

function save(dive) {
  ipc.send('dive-saved');
  return dbaccess.saveDive(pathResult.path, dive.toJS());
}

function render () {
  React.render(
    <DiveApp cursor={structure.cursor()} onSave={save} />,
    document.getElementById('main')
  );
}

render();

structure.on('swap', function(oldStruct, newStruct, path) {
  // Dive mode changed
  if (path && path.length === 3 && path[2] == 'Mode') {
    ipc.send('dive-changed');
  }

  render();
});
