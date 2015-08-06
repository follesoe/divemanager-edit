var dbpath      = require('./services/dbpath');
var dbaccess    = require('./services/dbaccess');
var immstruct   = require('immstruct');
var immutable   = require('immutable');
var omniscient  = require('../node_modules/omniscient/dist/omniscient');
var React       = window.React;
var document    = window.document;
var component = omniscient.withDefaults({jsx: true});

var nullDive = {
  StartTime: 'TODO',
  MaxDepth: 0,
  BottomTemperature: 0,
  Duration: 0,
  DiveNumberInSerie: 0,
  Source: 0
};

var structure = immstruct({
  selectedDiveId: -1,
  nullDive: nullDive,
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

function updateSelected (selectedDiveId, newSelectionId) {
  return selectedDiveId.update(function () {
    return newSelectionId;
  });
}

var DiveListItem = component('DiveListItem', function (props) {
  var dive = props.dive;
  var selection = props.onChange.bind(null, dive.get('DiveId'));
  return (
    <li onClick={selection}>
      <img src={'images/modes/' + dive.get('Mode') + '.png'} className="mode" />
      <span>{dive.get('StartDate')}</span>
      <span className="light">{dive.get('Duration')} H</span>
      <span className="light">{dive.get('MaxDepth')} M</span>
    </li>
  );
});

var DiveList = component('DiveList', function (props) {
  function onSelectionChange (newSelectionId) {
    return updateSelected(props.selectedDiveId, newSelectionId);
  }
  return (
    <nav>
      <h1>Your Dives</h1>
      <small>{props.dbpath.valueOf()}</small>
      <ul>
        {
          props.dives.toArray().map(function (dive) {
            return <DiveListItem key={dive.get('DiveId')} dive={dive} onChange={onSelectionChange} />
          })
        }
      </ul>
    </nav>
  );
});

var DiveDetails = component('DiveDetails', function (props) {
  var dive = props.dive;
  function onClick() {
    return dive.set('Mode', 3);
  }
  return (
    <h1 onClick={onClick}>{dive.get('MaxDepth')}</h1>
  );
});

var DiveApp = component('DiveApp', function (props) {
  var appState = props.cursor;
  var selectedDiveId = appState.get('selectedDiveId');
  var selectedDive = appState.cursor('dives').find(function (dive) {
    return dive.get('DiveId') === selectedDiveId;
  }) || appState.cursor('nullDive');

  return (
    <section>
      <DiveList
        dives={appState.cursor('dives')}
        dbpath={appState.cursor('dbpath')}
        selectedDiveId={appState.cursor('selectedDiveId')} />

      <DiveDetails dive={selectedDive} />
    </section>
  );
});

function render () {
  React.render(
    <DiveApp cursor={structure.cursor()} />,
    document.body
  );
}

render();
structure.on('swap', render);
