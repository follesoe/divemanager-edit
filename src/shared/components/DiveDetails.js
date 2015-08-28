var React       = window.React,
    omniscient  = require('omniscient/component')(React),
    component   = omniscient.withDefaults({jsx: true}),
    DiveMode    = require('./DiveMode'),
    DiveValue   = require('./DiveValue');

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
        <button className="action" onClick={props.onSave}>Save Changes</button>
      </div>
    </section>
  );
});

module.exports = DiveDetails;
