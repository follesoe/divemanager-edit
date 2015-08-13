var React                = window.React,
    omniscient           = require('omniscient/component')(React),
    component            = omniscient.withDefaults({jsx: true}),
    DiveModeRadioButton  = require('./DiveModeRadioButton');

var DiveMode = component('DiveMode', function (props) {
  var dive = props.dive;
  function onClick(selectedValue) {
    dive.set('Mode', selectedValue);
  }

  return (
    <div className="divemodes">
      <DiveModeRadioButton value={0} label="air" selected={dive.get('Mode') == 0} onClick={onClick} />
      <DiveModeRadioButton value={1} label="ean" selected={dive.get('Mode') == 1} onClick={onClick} />
      <DiveModeRadioButton value={2} label="gauge" selected={dive.get('Mode') == 2} onClick={onClick} />
      <DiveModeRadioButton value={3} label="free" selected={dive.get('Mode') == 3} onClick={onClick} />
    </div>
  );
});

module.exports = DiveMode;
