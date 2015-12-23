var dbpath       = require('./services/dbpath');
var dbaccess     = require('./services/dbaccess');
var immstruct    = require('immstruct');
var immutable    = require('immutable');
var document     = window.document;
var React        = window.React || require('react');
var reactRender  = require('react-dom').render;
var omniscient   = require('omniscient');
var ipc          = require('electron').ipcRenderer;
var component    = omniscient;
var DiveApp      = require('./components/DiveApp');

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
  reactRender(
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
