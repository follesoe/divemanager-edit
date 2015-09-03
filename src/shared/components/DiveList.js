var React         = window.React || require('react'),
    omniscient    = require('omniscient/component')(React),
    component     = omniscient.withDefaults({jsx: true}),
    DiveListItem  = require('./DiveListItem');

var DiveList = component('DiveList', function (props) {
  function updateSelected (selectedDiveId, newSelectionId) {
    return selectedDiveId.update(function () {
      return newSelectionId;
    });
  }

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

module.exports = DiveList;
