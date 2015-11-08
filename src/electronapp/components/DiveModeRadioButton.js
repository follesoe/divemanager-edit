var React         = window.React || require('react'),
    omniscient    = require('omniscient/component')(React),
    component     = omniscient.withDefaults({jsx: true});

var DiveModeRadioButton = component('DiveModeRadioButton', function (props) {
  var classes = props.selected ? 'divemode selectedmode' : 'divemode';

  var onClick = props.onClick.bind(null, props.value);

  return (
    <label className={classes} onClick={onClick}>
      <img src={'./images/modes/' + props.value + '.png'} />
      <h3>{props.label}</h3>
    </label>
  )
});

module.exports = DiveModeRadioButton;
