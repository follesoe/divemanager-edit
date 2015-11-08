var React       = window.React || require('react'),
    omniscient  = require('omniscient/component')(React),
    component   = omniscient.withDefaults({jsx: true});

var DiveListItem = component('DiveListItem', function (props) {
  var dive = props.dive;
  var selection = props.onChange.bind(null, dive.get('DiveId'));
  return (
    <li onClick={selection}>
      <img src={'./node_modules/SuuntoDMEditorShared/images/modes/' + dive.get('Mode') + '.png'} className="mode" />
      <span>{dive.get('StartDate')}</span>
      <span className="light">{dive.get('Duration')} H</span>
      <span className="light">{dive.get('MaxDepth')} M</span>
    </li>
  );
});

module.exports = DiveListItem;
