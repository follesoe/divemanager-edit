var dbpath      = require('./services/dbpath');
var dbaccess    = require('./services/dbaccess');
var immstruct   = require('immstruct');
var immutable   = require('immutable');
var omniscient  = require('../node_modules/omniscient/dist/omniscient');
var React       = window.React;
var document    = window.document;
var component   = omniscient.withDefaults({jsx: true});

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

var DiveModeRadioButton = component('DiveModeRadioButton', function (props) {
  var classes = 'divemode';
  if (props.selected) {
    classes += ' selectedmode';
  }

  return (
    <label className={classes}>
      <img src={'images/modes/' + props.value + '.png'} />
      <input type="radio" value="{props.value}" />
      <h3>{props.label}</h3>
    </label>
  )
});

var DiveMode = component('DiveMode', function (props) {
  var dive = props.dive;
  return (
    <div className="divemodes">
      <DiveModeRadioButton value="0" label="air" selected={dive.get('Mode') == 0} />
      <DiveModeRadioButton value="1" label="ean" selected={dive.get('Mode') == 1} />
      <DiveModeRadioButton value="2" label="gauge" selected={dive.get('Mode') == 2} />
      <DiveModeRadioButton value="3" label="free" selected={dive.get('Mode') == 3} />
    </div>
  );
});

var DiveValue = component('DiveValue', function (props) {
  return (
    <div className="dive-data">
      <h2>{this.props.label}</h2>
      <div>
        <img src={'images/' + this.props.icon + '.png'} />
        <h3>{this.props.value.valueOf()}</h3>
        <h4>{this.props.unit}</h4>
      </div>
    </div>
  );
});


var DiveDetails = component('DiveDetails', function (props) {
  var dive = props.dive;
  return (
    <section>
      <h1>Selected Dive</h1>
      <h2>Dive Mode</h2>
      <DiveMode dive={dive} />
      <div className="dive-data-fields">
        <DiveValue label="Time In" unit="h" icon="timeicon" value={dive.get('StartTime')} />
        <DiveValue label="Max Depth" unit="m" icon="depthicon" value={dive.get('MaxDepth')} />
        <DiveValue label="Max Depth Temp" unit="C" icon="tempicon" value={dive.get('BottomTemperature')} />
        <DiveValue label="Duration" unit="h" icon="timeicon" value={dive.get('Duration')} />
        <DiveValue label="Dive In Series" unit="" icon="numbericon" value={dive.get('DiveNumberInSerie')} />
        <DiveValue label="Computer" unit="" icon="computericon" value={dive.get('Source')} />
        <button className="action">Save Changes</button>
      </div>
    </section>
  );
});

var DiveApp = component('DiveApp', function (props) {
  var appState = props.cursor;
  var selectedDiveId = appState.get('selectedDiveId');
  var selectedDive = appState.cursor('dives').find(function (dive) {
    return dive.get('DiveId') === selectedDiveId;
  }) || appState.cursor('nullDive');

  return (
    <div>
      <DiveList
        dives={appState.cursor('dives')}
        dbpath={appState.cursor('dbpath')}
        selectedDiveId={appState.cursor('selectedDiveId')} />

      <DiveDetails dive={selectedDive} />
    </div>
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
