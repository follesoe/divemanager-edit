  var React       = window.React,
    omniscient  = require('omniscient/component')(React),
    component   = omniscient.withDefaults({jsx: true}),
    DiveList    = require('./DiveList'),
    DbMissing   = require('./DbMissing'),
    DiveDetails    = require('./DiveDetails');

var DiveApp = component('DiveApp', function (props) {
  var appState = props.cursor;
  var selectedDiveId = appState.get('selectedDiveId');

  var selectedDive = appState.cursor('dives').find(function (dive) {
    return dive.get('DiveId') === selectedDiveId;
  }) || appState.cursor('nullDive');

  var saveAction = props.onSave.bind(null, selectedDive);

  if (appState.getIn(['dbpath', 'exists'], false)) {
    return (
      <div>
        <DiveList
          dives={appState.cursor('dives')}
          dbpath={appState.cursor('dbpath')}
          selectedDiveId={appState.cursor('selectedDiveId')} />

        <DiveDetails dive={selectedDive} onSave={saveAction} />
      </div>
    );
  }

  return <DbMissing />;
});

module.exports = DiveApp;
